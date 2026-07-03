// Shared Kargil sector map — peaks, ridges, hit testing.
// Used by campaign screen in index.html.

export const KARGIL_PEAKS = [
  { battle: 'Siachen',    cx: 160, cy: 100, alt: '6,400m', ly: -22 },
  { battle: 'Tiger Hill', cx: 320, cy: 120, alt: '5,062m', ly: -22 },
  { battle: 'Tololing',   cx: 400, cy: 150, alt: '4,590m', ly: -22 },
  { battle: 'Point 5140', cx: 490, cy: 110, alt: '5,140m', ly: -22 },
  { battle: 'Khalubar',   cx: 590, cy: 140, alt: '5,000m', ly: -22 },
];

export const CAMPAIGN_BATTLE_ORDER = KARGIL_PEAKS.map(p => p.battle);

function drawRidge(ctx, pts, W, H, fillColor, strokeColor) {
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.lineTo(W, H);
  ctx.lineTo(0, H);
  ctx.closePath();
  ctx.fillStyle = fillColor;
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {typeof KARGIL_PEAKS} peaks
 * @param {{ currentIndex: number, completed: number[], pulse?: number }} state
 * @param {number} W
 * @param {number} H
 */
export function drawKargilMap(ctx, peaks, state, W = 860, H = 360) {
  ctx.fillStyle = '#0a0c08';
  ctx.fillRect(0, 0, W, H);

  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, '#080c06');
  grad.addColorStop(0.5, '#0e1209');
  grad.addColorStop(1, '#12170c');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = 'rgba(30,34,22,0.6)';
  ctx.lineWidth = 0.5;
  for (let x = 0; x < W; x += 80) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += 60) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  drawRidge(ctx, [
    [0, 95], [50, 72], [110, 55], [180, 48], [240, 62], [310, 42], [370, 50], [440, 35],
    [510, 48], [580, 38], [650, 55], [720, 45], [790, 60], [860, 50],
  ], W, H, '#0c100a', '#161c12');
  drawRidge(ctx, [
    [0, 130], [60, 110], [130, 95], [200, 88], [270, 100], [340, 82], [400, 90], [470, 75],
    [540, 88], [610, 78], [680, 92], [750, 82], [830, 95], [860, 90],
  ], W, H, '#0f1410', '#1a2015');
  drawRidge(ctx, [
    [0, 175], [80, 155], [160, 142], [240, 158], [320, 140], [400, 148], [480, 132],
    [560, 145], [640, 138], [720, 155], [800, 145], [860, 160],
  ], W, H, '#121810', '#1e2418');

  ctx.save();
  ctx.setLineDash([6, 5]);
  ctx.strokeStyle = '#8a2020';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(215, 0);
  ctx.bezierCurveTo(220, 90, 210, 180, 218, 360);
  ctx.stroke();
  ctx.restore();

  ctx.fillStyle = '#6a2020';
  ctx.font = 'bold 10px Courier New';
  ctx.save();
  ctx.translate(198, 80);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText('LOC', 0, 0);
  ctx.restore();

  ctx.fillStyle = '#2e2820';
  ctx.font = 'bold 13px Courier New';
  ctx.fillText('PAKISTAN', 24, 260);
  ctx.fillStyle = '#1e2e1e';
  ctx.fillText('INDIA', 680, 260);

  ctx.save();
  ctx.setLineDash([6, 4]);
  ctx.strokeStyle = '#8a7030';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  peaks.forEach((n, i) => {
    if (i === 0) ctx.moveTo(n.cx, n.cy);
    else ctx.lineTo(n.cx, n.cy);
  });
  ctx.stroke();
  ctx.restore();

  const pulse = state.pulse ?? 0;
  peaks.forEach((n, i) => {
    const done = state.completed.includes(i);
    const unlocked = done || i === state.currentIndex;
    const ready = unlocked && !done && i === state.currentIndex;

    if (ready) {
      const r = 22 + Math.sin(pulse) * 4;
      ctx.beginPath();
      ctx.arc(n.cx, n.cy, r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(200,160,48,0.12)';
      ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(n.cx, n.cy, 10, 0, Math.PI * 2);
    if (done) {
      ctx.fillStyle = '#3a6030';
      ctx.strokeStyle = '#6a9040';
    } else if (ready) {
      ctx.fillStyle = '#2a2010';
      ctx.strokeStyle = '#c8a030';
    } else if (unlocked) {
      ctx.fillStyle = '#1a1810';
      ctx.strokeStyle = '#806830';
    } else {
      ctx.fillStyle = '#121210';
      ctx.strokeStyle = '#3a3530';
    }
    ctx.lineWidth = ready ? 2.5 : 1.5;
    ctx.fill();
    ctx.stroke();

    if (done) {
      ctx.strokeStyle = '#8aba50';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(n.cx - 4, n.cy);
      ctx.lineTo(n.cx - 1, n.cy + 4);
      ctx.lineTo(n.cx + 5, n.cy - 4);
      ctx.stroke();
    }

    ctx.fillStyle = done ? '#8aba50' : ready ? '#c8a030' : unlocked ? '#806830' : '#504030';
    ctx.font = 'bold 11px Courier New';
    ctx.textAlign = 'center';
    const label = n.battle === 'Point 5140' ? 'Pt 5140' : n.battle.toUpperCase();
    ctx.fillText(label, n.cx, n.cy + n.ly - 8);
    ctx.font = '9px Courier New';
    ctx.fillStyle = '#605840';
    ctx.fillText(n.alt, n.cx, n.cy + n.ly + 6);
    ctx.textAlign = 'left';
  });

  ctx.fillStyle = '#504030';
  ctx.font = '9px Courier New';
  ctx.textAlign = 'center';
  ctx.fillText('Click a ready peak to deploy', W / 2, H - 12);
  ctx.textAlign = 'left';
}

/**
 * @returns {number|null} peak index
 */
export function hitTestPeak(x, y, peaks, scaleX = 1, scaleY = 1) {
  const hx = x / scaleX;
  const hy = y / scaleY;
  for (let i = peaks.length - 1; i >= 0; i--) {
    const n = peaks[i];
    const dx = hx - n.cx;
    const dy = hy - n.cy;
    if (dx * dx + dy * dy <= 18 * 18) return i;
  }
  return null;
}

export const CAMPAIGN_BRIDGE_COPY = [
  { meta: '1999 · KARGIL WAR · INDIA', title: 'OPERATION VIJAY BEGINS', body: 'May 1999. Pakistani forces had secretly occupied Indian peaks along the Line of Control in Kargil. Operation Vijay was launched — every peak was to be recaptured. The first battle begins in the glaciers of Siachen.' },
  { meta: '1999 · KARGIL · SIACHEN', title: 'THE RIDGE ABOVE SIACHEN', body: 'The Siachen sector has been contested since 1984. In 1999, Pakistani forces again probed the ridgelines. Indian defenders held. Now, Tololing — a near-vertical ridgeline at 16,962 ft — is the next objective.' },
  { meta: '1999 · KARGIL · TOLOLING TAKEN', title: 'THE FIRST PEAK FALLS', body: 'Tololing was captured on 13 June 1999 by 2 Rajputana Rifles. The Tricolour was raised at 16,962 ft. Point 5140 in the Drass sector is held by the enemy.' },
  { meta: '1999 · KARGIL · DRASS', title: 'POINT 5140 TAKEN', body: '"Yeh Dil Maange More." Point 5140 fell on 20 June. Capt Vikram Batra became the face of Operation Vijay. The Batalik sector now demands attention — 1/11 Gorkha Rifles moves toward Khalubar.' },
  { meta: '1999 · KARGIL · BATALIK', title: 'KHALUBAR CLEARED', body: '"Na Chodnu." Capt Manoj Pandey cleared four bunkers before falling at the fifth. Khalubar was captured on 4 July 1999. One battle remains — Tiger Hill, the highest fortified position in the war.' },
];
