// terrain-paint.js — procedural aerial/recon terrain painter for Regiment battle maps.
// Reads a battle's tile grid + terrain palette and paints a satellite-photo style
// basemap onto a canvas. Deterministic per battle, so maps are stable across sessions.
// Optional per-battle `paintHints` block: { biome, tracks:[{path:[{col,row}...]}] }.

const TW = 10, TH = 18;          // SVG units per tile — must match renderIntroMap

/* ── deterministic noise ─────────────────────────────────── */
function hash2(x, y, s) {
  let h = (x | 0) * 374761393 + (y | 0) * 668265263 + (s | 0) * 974711;
  h = (h ^ (h >>> 13)) * 1274126177;
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}
function vnoise(x, y, s) {
  const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy;
  const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
  const a = hash2(ix, iy, s),     b = hash2(ix + 1, iy, s);
  const c = hash2(ix, iy + 1, s), d = hash2(ix + 1, iy + 1, s);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function fbm(x, y, s, oct) {
  let f = 0, amp = 0.5, tot = 0;
  for (let i = 0; i < oct; i++) {
    f += amp * vnoise(x, y, s + i * 101);
    tot += amp; x *= 2.03; y *= 1.97; amp *= 0.5;
  }
  return f / tot;
}
function strSeed(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0) % 100000;
}

/* ── biome inference from palette when no hint given ─────── */
function inferBiome(tiles) {
  let r = 0, g = 0, b = 0, n = 0;
  tiles.forEach(t => { r += t.r; g += t.g; b += t.b; n++; });
  r /= n; g /= n; b /= n;
  const bright = (r + g + b) / 3;
  if (bright > 185 && b > r * 0.8) return 'alpine';
  if (g > r * 0.92 && g > b * 1.15) return 'jungle';
  if (r > g * 1.15 && r > 150)      return 'desert';
  return 'generic';
}

const _cache = new WeakMap();

export function paintTerrain(bd, opts = {}) {
  const hit = _cache.get(bd);
  if (hit) return hit;

  const map  = bd.map, rows = map.length, cols = map[0].length;
  const S    = opts.scale || 6;                     // px per SVG unit
  const W    = Math.round(cols * TW * S), H = Math.round(rows * TH * S);
  const seed = strSeed((bd.introMeta || '') + cols + 'x' + rows);
  const hints = bd.paintHints || {};

  /* per-tile channels */
  const N = cols * rows;
  const chH = new Float32Array(N), chDune = new Float32Array(N);
  const chRock = new Float32Array(N), chVeg = new Float32Array(N);
  const chR = new Float32Array(N), chG = new Float32Array(N), chB = new Float32Array(N);
  const tileList = [];
  map.forEach((row, ri) => row.forEach((k, ci) => {
    const t = bd.terrain[k] || { color: 0x333344, height: 1 };
    const i = ri * cols + ci;
    const r = (t.color >> 16) & 255, g = (t.color >> 8) & 255, b = t.color & 255;
    chR[i] = r; chG[i] = g; chB[i] = b;
    chH[i] = t.height || 1;
    chDune[i] = k === 'd' ? 1 : k === 's' ? 0.65 : k === '.' ? 0.3 : 0;
    chRock[i] = k === 'P' ? 1 : k === 'R' ? 0.8 : k === 'r' ? 0.55 : k === 'i' ? 0.4 : 0;
    chVeg[i]  = k === 'f' ? 0.85 : k === 'b' ? 0.3 : (g > r * 1.05 ? 0.5 : 0.06);
    tileList.push({ r, g, b });
  }));
  const biome = hints.biome || inferBiome(tileList);

  /* bilinear sampler over tile centres, clamped */
  const cl = (v, lo, hi) => v < lo ? lo : v > hi ? hi : v;
  function sample(ch, gx, gy) {
    const u = cl(gx - 0.5, 0, cols - 1.001), v = cl(gy - 0.5, 0, rows - 1.001);
    const ix = u | 0, iy = v | 0, fx = u - ix, fy = v - iy;
    const i0 = iy * cols + ix;
    const a = ch[i0], b = ch[i0 + 1], c = ch[i0 + cols], d = ch[i0 + cols + 1];
    return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
  }

  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(W, H);
  const px  = img.data;

  /* pass 1 — height buffer (for hillshading) */
  const hgt = new Float32Array(W * H);
  const isD = biome === 'desert', isA = biome === 'alpine';
  for (let y = 0; y < H; y++) {
    const gy = y / (TH * S);
    for (let x = 0; x < W; x++) {
      const gx = x / (TW * S);
      const wx = gx + (fbm(gx * 1.6 + 7.3, gy * 1.6, seed + 11, 3) - 0.5) * 0.7;
      const wy = gy + (fbm(gx * 1.6, gy * 1.6 + 3.1, seed + 23, 3) - 0.5) * 0.7;
      const rock = sample(chRock, wx, wy);
      const h = sample(chH, wx, wy)
        + (fbm(gx * 2.4, gy * 2.4, seed + 37, 4) - 0.5) * (0.18 + rock * 0.9) * 0.5;
      hgt[y * W + x] = h;
    }
  }

  /* pass 2 — colour, texture, shade */
  for (let y = 0; y < H; y++) {
    const gy = y / (TH * S);
    for (let x = 0; x < W; x++) {
      const gx = x / (TW * S);
      const wx = gx + (fbm(gx * 1.6 + 7.3, gy * 1.6, seed + 11, 3) - 0.5) * 0.7;
      const wy = gy + (fbm(gx * 1.6, gy * 1.6 + 3.1, seed + 23, 3) - 0.5) * 0.7;

      let r = sample(chR, wx, wy), g = sample(chG, wx, wy), b = sample(chB, wx, wy);
      const dune = sample(chDune, wx, wy), rock = sample(chRock, wx, wy), veg = sample(chVeg, wx, wy);

      /* albedo mottle — fine + macro, kept gentle so it reads as ground not static */
      const m1 = fbm(gx * 2.6, gy * 2.6, seed + 41, 4);
      const m2 = fbm(gx * 0.7, gy * 0.7, seed + 53, 3);
      let lum = (0.93 + 0.14 * m1) * (0.95 + 0.1 * m2);

      /* dune banding (desert) — wind-combed ripples with warped phase */
      if (isD && dune > 0.05) {
        const ph = fbm(gx * 0.9, gy * 0.9, seed + 61, 2) * 5;
        lum *= 1 + Math.sin((gx * 1.1 + gy * 0.45) * 4.4 + ph) * 0.035 * dune;
      }

      /* rock crevices — ridged noise darkening */
      if (rock > 0.05) {
        const rn = 1 - Math.abs(2 * fbm(gx * 5, gy * 5, seed + 71, 3) - 1);
        lum *= 1 - rn * rock * 0.24;
      }

      /* hillshade — light from NW */
      const i = y * W + x;
      const dzdx = (hgt[i + (x < W - 1 ? 1 : 0)] - hgt[i - (x > 0 ? 1 : 0)]);
      const dzdy = (hgt[i + (y < H - 1 ? W : 0)] - hgt[i - (y > 0 ? W : 0)]);
      lum *= cl(1 + (-dzdx * 0.6 - dzdy * 0.78) * 9, 0.62, 1.22);

      r *= lum; g *= lum; b *= lum;

      /* atmospheric grade — pull extremes toward a muted recon tone */
      const avg = (r + g + b) / 3;
      r += (avg - r) * 0.16; g += (avg - g) * 0.16; b += (avg - b) * 0.16;

      /* scrub / vegetation speckle */
      const sp = vnoise(gx * 26, gy * 26, seed + 83);
      if (sp > 0.83 - veg * 0.26) {
        const k = cl((sp - (0.83 - veg * 0.26)) * 6, 0, 0.42);
        r += (58 - r) * k; g += (64 - g) * k; b += (38 - b) * k;
      }

      /* alpine sparkle on bright snow */
      if (isA && r + g + b > 600) {
        const sn = (vnoise(gx * 30, gy * 30, seed + 91) - 0.5) * 22;
        r += sn; g += sn; b += sn + 4;
      }

      /* film grain */
      const gr = (hash2(x, y, seed + 97) - 0.5) * 4;

      px[i * 4]     = cl(r + gr, 0, 255);
      px[i * 4 + 1] = cl(g + gr, 0, 255);
      px[i * 4 + 2] = cl(b + gr, 0, 255);
      px[i * 4 + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  /* ── vector passes: tracks, compound footprints, vignette ── */
  const tpx = TW * S, tpy = TH * S;
  const P = (c, r2) => [ (c) * tpx, (r2) * tpy ];

  (hints.tracks || []).forEach((tr, ti) => {
    // wobble the polyline so tracks read as worn, not drafted
    const pts = [];
    const path = tr.path;
    for (let s2 = 0; s2 < path.length - 1; s2++) {
      const a = path[s2], b2 = path[s2 + 1];
      const steps = Math.max(6, Math.round(Math.hypot(b2.col - a.col, (b2.row - a.row) * 1.8) * 7));
      for (let k = 0; k <= steps; k++) {
        const t = k / steps;
        const c = a.col + (b2.col - a.col) * t, r2 = a.row + (b2.row - a.row) * t;
        const off = (fbm(c * 2.2 + ti * 9, r2 * 2.2, seed + 113, 2) - 0.5) * 0.22;
        pts.push(P(c + 0.5 + off, r2 + 0.5 + off * 0.6));
      }
    }
    const trace = (w, style, alpha) => {
      ctx.beginPath();
      pts.forEach(([x2, y2], k) => k ? ctx.lineTo(x2, y2) : ctx.moveTo(x2, y2));
      ctx.lineWidth = w; ctx.strokeStyle = style; ctx.globalAlpha = alpha;
      ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); ctx.globalAlpha = 1;
    };
    trace(tpx * 0.16, 'rgba(40,32,18,1)', 0.16);      // compacted verge
    trace(tpx * 0.085, 'rgba(232,206,140,1)', 0.34);  // worn centre
    trace(tpx * 0.02,  'rgba(70,55,30,1)',  0.35);    // rut
  });

  Object.keys(bd.structures || {}).forEach(pos => {
    const [sc, sr] = pos.split(',').map(Number);
    const [cx, cy] = P(sc + 0.5, sr + 0.5);
    const a = (hash2(sc, sr, seed) - 0.5) * 0.5;
    const sz = tpx * 0.52;
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(a);
    ctx.fillStyle = 'rgba(214,190,138,0.42)';
    ctx.fillRect(-sz / 2, -sz / 2, sz, sz * 0.8);
    ctx.strokeStyle = 'rgba(52,42,24,0.6)'; ctx.lineWidth = S * 0.35;
    ctx.strokeRect(-sz / 2, -sz / 2, sz, sz * 0.8);
    ctx.fillStyle = 'rgba(60,48,28,0.55)';
    ctx.fillRect(-sz * 0.18, -sz * 0.16, sz * 0.36, sz * 0.3);
    ctx.restore();
  });

  const vg = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.42, W / 2, H / 2, Math.max(W, H) * 0.72);
  vg.addColorStop(0, 'rgba(0,0,8,0)');
  vg.addColorStop(1, 'rgba(0,0,10,0.34)');
  ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);

  const heightAt = (gx, gy) => sample(chH, gx, gy);
  const out = { canvas, W: cols * TW, H: rows * TH, cols, rows, heightAt, biome,
                dataUrl: canvas.toDataURL('image/jpeg', 0.85) };
  _cache.set(bd, out);
  return out;
}
