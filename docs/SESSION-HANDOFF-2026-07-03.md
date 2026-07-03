# Regiment — Session Handoff
> Written 3 July 2026. Use this to resume work cold.

---

## Repo

- **Public repo:** `git@github.com:aaghran/military-game.git`
- **Local path:** `/Users/aaghran/projects/jarvis/projects/regiment/`
- **Push:** Always `git -C /Users/aaghran/projects/jarvis/projects/regiment push origin main` — never use jarvis subtree
- **Game URL:** https://aaghran.github.io/military-game/game/ (GitHub Pages, auto-deploys on push to main)
- **Tech:** Single HTML file (`game/index.html`, ~3800+ lines), Three.js r160 ES modules, no build step

---

## What Was Done This Session (2 July – 3 July 2026)

### Battles added
| Battle | File | Notes |
|--------|------|-------|
| Haifa 1918 | `game/battles/haifa.js` | Jodhpur/Mysore Lancers cavalry charge, 3 waves, offensive |
| Kohima 1944 | `game/battles/kohima.js` | Assam Regt + Rajput Regt, survive 7 rounds, defensive |
| Asal Uttar 1965 | `game/battles/asal-uttar.js` | Poona Horse Centurions vs Pattons, 3 waves, defensive |
| Dograi 1965 | `game/battles/dograi.js` | 3 Jat Regiment night assault, bayonets, offensive |
| Point 5140 1999 | `game/battles/point-5140.js` | 13 JAK RIF, Vikram Batra, "Yeh Dil Maange More" |
| Khalubar 1999 | `game/battles/khalubar.js` | 1/11 Gorkha Rifles, Manoj Pandey, "Na Chodnu" |
| Tiger Hill 1999 | `game/battles/tiger-hill.js` | 8 Sikh + 18 Grenadiers, Yogendra Yadav, Bofors round 3 |

Total battles: **13** (Saragarhi, Haifa, Kohima, Rezang La, Asal Uttar, Dograi, Longewala, Siachen, Tololing, Point 5140, Khalubar, Tiger Hill, Operation Sindoor)

### Major features shipped
1. **Era navigation** — 6 era tiles home screen drill into filtered battle list
2. **Vijay Diwas Campaign** — 5 Kargil battles in sequence with bridge cards + completion tribute
3. **Campaign map** (`game/campaign-map.html`) — Canvas tower defense meta-layer, regiment tokens, NLI wave mechanics
4. **Vijay Diwas landing page** (`game/vijay-diwas.html`) — tribute page, memorial names, two battle maps
5. **URL battle launch** — `index.html?battle=Tololing` auto-starts any battle
6. **First-timer UX** — story mode toggle, campaign next-battle debrief, mobile layout, death toast, idle nudge, rank legend, mission brief button, histCard "HISTORICAL MOMENT" label, battle card stakes lines
7. **Visual overhaul** — structure glow rings (pulsing torus by type), tap-to-info card on structure tiles, fire arc flash, structure legend HUD, enhanced weapon animations (rifle streak, tank screen shake), clean death toast
8. **Boundary geometry structures** — sandbags along hex edges (not center), LMG barrel protruding outward, mortar tube angled in pit, fort parapets on all 6 edges
9. **Terrain prop cleanup** — removed coil/crenellation noise from open terrain tiles; only ice spikes, glacier sheets, small rocks remain on relevant tile types

### Bug fixes
- Kohima autoplay freeze: `winCondition: {rounds:7}` → `{n:7}`
- `spawnWave()` hardcoded `row=1` → `row = s.row ?? 1` (6 battles affected)
- Tololing attribution: replaced Manoj Pandey/Gorkha histCard with Maj Vivek Gupta MVC (2 RAJ RIF)
- Asal Uttar: removed Lt Arun Khetrapal (belongs to 1971 Basantar), added CQMH Abdul Hamid PVC correctly
- Enemy flagpoles removed from all sangars
- Sandbag rotation formula corrected: `em.angle + PI/2` → `-(em.angle + PI/2)` — was wrong for 5 of 6 hex edges

---

## Current Git State (as of end of session)

```
bb503bd fix: Asal Uttar — correct unit roster (add Abdul Hamid PVC, fix Khetrapal wrong battle)
efc86ad fix: sandbag rotation aligned to hex edges (negate formula); olive drab colour
79b92fa fix: remove crenellation clutter from terrain tiles; bump sandbag contrast colour
4c585e3 fix: structure sandbags flush to tile surface — pull edges inward to 0.78r
926aa76 feat: visual overhaul — structure glow rings, tap info cards, fire arc flash
51fa1bd docs: add DEVLOG.md — running changelog of all Regiment changes
1fe0773 feat: first-timer UX — story mode toggle, campaign next-battle, mobile layout...
24f8fc1 feat: add illustrated battle maps to Vijay Diwas page
a0e7423 feat: wire URL param battle launch
7012ff2 fix: resolve autoplay stuck states across battles
f5ac8ff feat: Kargil campaign map — tower defense meta layer
6ed065b feat: Vijay Diwas landing page
```

---

## Architecture That Matters

### Two-layer battle data system
- `BATTLES[]` — regiment identity (name, regiment, bio, warCry, insignia, mottoEng)
- `BATTLE_DATA{}` — gameplay (map, terrain, structures, units, waves, narratives, histCards, winCondition)
- Source of truth: `BATTLE_DATA` wins for gameplay; `BATTLES` wins for narrative

### Structure system
- `STRUCTURES` object in each battle file: `'col,row': {type, label, atkMul, defMul, rngBonus}`
- Types: `sangar`, `lmg`, `mortar`, `fort`
- `buildStructures()` in `index.html` renders 3D geometry for each
- `_glowRingMeshes[]` — separate from `structureMeshes[]`, pulsed in `gameLoop()`
- Enemy sangars detected by label containing "Pak", "Enemy", or "Bunker" (case-insensitive)

### Hex geometry (CRITICAL)
- `HEX_R = 1.0` (center to vertex)
- `hexWorldPos(col, row)` → `{x, y:0, z}` (Y always 0)
- `tileTopY(col, row)` → `TERRAIN[MAP[row][col]].height`
- `cellCenter(col, row)` → combines both
- Edge midpoints at `HEX_R * 0.78` from center (inside tile boundary of `0.797`)
- Edge midpoint angles (pointy-top): `[0, PI/3, 2PI/3, PI, 4PI/3, 5PI/3]`
- Correct sandbag rotation: `rotation.y = -(em.angle + PI/2)` — NOT `em.angle + PI/2`

### Campaign system
- `CAMPAIGN_BATTLES = ['Siachen','Tololing','Point 5140','Khalubar','Tiger Hill']`
- `campaignState = {active, currentIndex, completed[]}`
- Flow: campaign banner → bridge card → battle → debrief with "NEXT: X →" button → next bridge
- `showScreen()` handles named screens: `'campaign'`, `'campaign-bridge'`, `'campaign-complete'`

### Autoplay
- `autoPlayStyle: 'defensive'` — hold structures, skip move if on structure
- `autoPlayStyle: 'offensive'` — advance toward enemy
- `autoPlayForceWin: true` — +1 atk bonus (all battles except Rezang La)
- `winCondition: {type:'waves'}` OR `{type:'rounds', n:X}` — must use `n`, not `rounds`

### `_propMeshes[]` vs `structureMeshes[]` vs `_glowRingMeshes[]`
- `_propMeshes[]` — terrain decorative props, cleared on battle load
- `structureMeshes[]` — structure geometry (sandbags, barrels, etc.), cleared on `buildStructures()`
- `_glowRingMeshes[]` — pulsing rings, subset of `structureMeshes[]`, animated in `gameLoop()`

---

## What's Still Visually Off (known issues)

1. **Sandbag visual quality** — still small, the perimeter effect isn't as dramatic as it could be. A 0.78r edge position might need to be pushed closer to the actual hex edge. User is actively reviewing this.

2. **Indian unit tank types** — Asal Uttar Indian units use infantry type (hero/section_cdr/rifleman) visually. They should look like Centurion tanks. No `ind_tank` type exists yet. Needs a new unit type in `createUnitMesh()` and game logic.

3. **"Nagarjun K3 Pal"** — user mentioned this name for Asal Uttar; identity unclear. Could be a tank crew member or tank name to verify against regimental histories.

4. **Longewala trench tiles** — `type:'f'` tiles get trench/sandbag props, but the trench visual is still basic. Could be more dramatic.

5. **Arun Khetrapal needs his own battle** — he belongs to the 1971 Battle of Basantar, which could be a future battle to add.

---

## Queued / Planned (Backlog)

### Near-term
- [ ] **Tank unit type for Asal Uttar** — Indian units should visually be Centurion tanks. Add `ind_tank` type to `createUnitMesh()` with a flatter, wider body + turret barrel. Update `autoPlayIndianTurn()` to handle tank movement/attack range.
- [ ] **"Nagarjun K3 Pal" clarification** — confirm identity with user, add to Asal Uttar unit roster if correct
- [ ] **Campaign map → battle URL wire** — `index.html?battle=X` is wired, but campaign-map.html assigns regiments to nodes then launches battles — the regiment assignment isn't passed through to the battle. Could show "playing as [regiment]" overlay.
- [ ] **Content enrichment** — ages, hometowns, families, pre-battle personal moments in unit bios; real documented quotes as dispatch overlays; post-debrief "what happened next" legacy card

### Medium-term
- [ ] **Audio** — war cries on battle start (play the regiment's actual war cry), ambient sound per terrain (glacier wind, desert silence, monsoon rain)
- [ ] **Memorial scroll screen** — all named soldiers, their medals, ages, one line each. The 527.
- [ ] **Vijay Diwas Campaign bridge cards enrichment** — CO field diary format, map sketches, time stamps

### Vision
- [ ] **Mini Metro meta layer** — draw regiment lines across India map; regimental heritage through play
- [ ] **Mobile layout full pass** — hex game itself on mobile (touch drag + pinch zoom for the 3D scene)

---

## Files Reference

| File | Purpose |
|------|---------|
| `game/index.html` | Main game (~3800 lines, no build) |
| `game/battles/index.js` | All 13 battles imported + exported |
| `game/battles/*.js` | Individual battle files |
| `game/battles/debrief-data.js` | All 13 battle debrief copy + infographic config |
| `game/vijay-diwas.html` | Vijay Diwas tribute landing page |
| `game/campaign-map.html` | Tower defense Kargil meta layer |
| `game/assets/insignia/*.svg` | Regiment insignia files |
| `docs/REGIMENT-CONTEXT.md` | Full architecture handoff doc |
| `docs/DEVLOG.md` | Running changelog (newest first) |
| `docs/SESSION-HANDOFF-2026-07-03.md` | This file |

---

## Regiment Attributions (verified, do not change without checking)

| Battle | Regiment | Hero | Medal |
|--------|----------|------|-------|
| Saragarhi | 36th Sikh Regiment | Hav Ishar Singh | IOM |
| Haifa | Jodhpur Lancers + Mysore Lancers | Maj Dalpat Singh | IOM |
| Kohima | Assam Regt + Rajput Regt | The Kohima Epitaph | — |
| Rezang La | 13 Kumaon | Maj Shaitan Singh | PVC (posthumous) |
| Asal Uttar | Poona Horse + 4 Grenadiers | Lt Col Tarapore + CQMH Abdul Hamid | PVC × 2 |
| Dograi | 3 Jat Regiment | Lt Col Desmond Hayde | MVC |
| Longewala | 23 Punjab | Maj Kuldeep Singh Chandpuri | MVC |
| Siachen | 19 JAK RIF (Siachen Pioneers) | NB Subedar Bana Singh | PVC |
| Tololing | **2 Rajputana Rifles** | Maj Vivek Gupta | MVC (posthumous) |
| Point 5140 | **13 JAK RIF** | Capt Vikram Batra | PVC (posthumous) |
| Khalubar | **1/11 Gorkha Rifles** | Capt Manoj Kumar Pandey | PVC (posthumous) |
| Tiger Hill | 8 Sikh + 18 Grenadiers | Hav Yogendra Yadav | PVC (living) |
| Op Sindoor | AAD Corps | S-400 Battery | — |

**Critical:** Tololing = 2 RAJ RIF (not Gorkhas). Vikram Batra = 13 JAK RIF (Point 5140). Manoj Pandey = 1/11 GR (Khalubar, not Tololing). Arun Khetrapal = 1971 Basantar (not 1965 Asal Uttar).
