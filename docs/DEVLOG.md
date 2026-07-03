# Regiment — Dev Log

> Running record of all significant changes. Newest first.
> For architecture and context, see `REGIMENT-CONTEXT.md`.

---

## Session — 2–3 July 2026

### Visual Overhaul Pass (commit `e9ea14b`)
- Structure glow rings — `_glowRingMeshes[]`, `_addStructureGlowRing()`, pulsing emissive torus per structure; colour-coded by type
- Tap-to-info card — `showStructureCard()` in `handleTileClick()` when no unit selected; shows bonuses in plain English, occupancy, close button
- Fire arc flash — `triggerFireArc()` overlays semi-transparent hex discs in range, 1.5s fade animation
- Structure legend HUD — `⬡ Structures` button in `#quick-actions`, toggles `#structure-legend-panel` with colour-coded rows
- Rifle shot: bright `THREE.Line` streak fading over 120ms
- Tank shell: 0.35s camera shake on impact
- Death toast: single persistent `#death-toast` element, clean fade in/out (removed old multi-element flash)
- 3D unit meshes: SKIPPED — existing `createUnitMesh()` already has battle-specific visuals, pagri/helmet/balaclava variants, weapon meshes; replacement would be a regression

### First-Timer UX Pass (commit `1fe0773`)
- Story mode toggle — "WATCH STORY MODE" button + hint text on regiment intro screen; sets autoPlay=true before battle starts
- Campaign next-battle debrief — gold "NEXT: [BATTLE NAME] →" button appears in debrief when Vijay Diwas Campaign is active
- Mobile layout — histCard full-width on <600px; existing media block already covered era-grid, battle cards, debrief
- Death flash — `showDeathFlash()` toast when Indian unit falls, hooked into `_doAttack` completion
- End Turn idle nudge — pulsing "Press END TURN to continue →" after 4s when all units have moved and attacked
- Rank legend — collapsible RANKS ▾ panel fixed to bottom-right, visible only during battle
- Mission brief button — `ℹ` HUD button reopens introText/introMeta overlay any time during battle
- histCard label — "HISTORICAL MOMENT" eyebrow added above every histCard overlay
- Battle card stakes — one-line emotional hook per battle on every card (e.g. "21 soldiers. 10,000 tribesmen. Not one retreated.")

### Vijay Diwas Landing Page — Battle Maps (commit `24f8fc1`)
- Map 1: India/subcontinent overview canvas (860×480) — 12 battle dots colour-coded by era, LOC dashed red, Kargil cluster zoom box, mousemove tooltips, Haifa as off-map arrow
- Map 2: Kargil sector zoom canvas (860×360) — layered mountain ridges, LOC split, dashed gold path Siachen→Tiger Hill→Tololing→Pt5140→Khalubar, altitude labels, "OPERATION VIJAY · 1999"

### URL Battle Auto-Launch (commit `a0e7423`)
- `index.html?battle=Tololing` (case-insensitive) now auto-selects and starts any battle after 800ms init delay
- Fixed campaign-map.html: `Pt 5140` → `Point 5140` to match BATTLES[].name exactly
- Campaign map battle links now correctly route into the hex game

### Autoplay Stuck States (commit `7012ff2`)
- Kohima: `winCondition: {rounds:7}` → `{n:7}` — code reads `.n`, not `.rounds`; was a permanent freeze
- `spawnWave()`: hardcoded `row=1` → `row = s.row ?? 1` — 6 battles had enemies spawning at wrong position
- `nextRound()`: rounds-type battles with exhausted waves no longer freeze in enemy_turn phase permanently

### Kargil Campaign Map (commit `f5ac8ff`)
- `game/campaign-map.html` — Canvas 880×520 tower-defense meta layer
- 5 battle nodes: Siachen, Tololing, Pt5140, Khalubar, Tiger Hill
- Regiment dock: SIA/RAJ/JAK/GOR/SIK tokens, click-to-select + click-node-to-assign
- 3 NLI wave sequences (animated red chevrons)
- Wave resolution: Wave1→Tololing+Tiger Hill, Wave2→Siachen+Pt5140, Wave3→Khalubar
- Operation log panel, ADVANCE NLI WAVE button

### Vijay Diwas Landing Page (commit `6ed065b`)
- `game/vijay-diwas.html` — standalone tribute page, dark terminal aesthetic
- Hero section, What Is Vijay Diwas, 13 battle cards grid, campaign CTA panel
- Memorial wall: 10 named heroes + "527 more"
- All CTAs link to `./index.html`

---

## Session — Late June 2026

### Indian Unit Markers + Flagpole Fix (commit `ca77498`)
- Removed flagpoles from `buildStructureProps()` — were incorrectly appearing on Pakistani bunkers
- Added saffron disc marker (`CylinderGeometry(0.18,0.18,0.03,16)`, `0xe8a020`) above all Indian units
- Marker stored as `unit._marker`, hidden in `removeUnitGroup`

### Mobile UX + Era Nav (commit `542dbff`)
- Mobile map-first layout with swipe/tap controls
- Shared `debrief-data.js` — all 13 battles' debrief copy + infographic config
- Era home navigation — 6 era tiles (PRE-1947, 1962, 1965, 1971, KARGIL, MODERN) drill into filtered battle list

### Enhanced Structure Visuals (commit `316f709`)
- Sangar: 6-box sandbag hex ring, colour `0x8a7a60`
- Mortar pit: tapered cylinder + mortar tube
- LMG post: gun barrel mesh
- Enemy bunkers: concrete `0x505060`, firing slit, snow cap `0xd0e0f0`
- Fort: stone parapets + crenellations

### Kargil Three Battles (commits `81b9254`, `ee64f53`)
- `game/battles/point-5140.js` — 13 JAK RIF, Vikram Batra, "Yeh Dil Maange More"
- `game/battles/khalubar.js` — 1/11 Gorkha Rifles, Manoj Pandey, "Na Chodnu"
- `game/battles/tiger-hill.js` — 8 Sikh + 18 Grenadiers, Yogendra Yadav, Bofors airstrike round 3
- Longewala plaWaves fix: added `row:0` to all wave units (were spawning at row 1)

### Tololing Attribution Fix (commit `82917a6`)
- histCard #1 in Tololing replaced Capt Manoj Pandey (wrong — he's at Khalubar) with Maj Vivek Gupta MVC (2 RAJ RIF)
- Regiment attributions locked: Tololing=2 RAJ RIF, Vikram Batra=13 JAK RIF, Manoj Pandey=1/11 GR

### Four New Battles (commit `f072c7a`)
- `game/battles/haifa.js` — Jodhpur/Mysore Lancers, cavalry charge, 3 waves, offensive
- `game/battles/kohima.js` — Assam Regt + Rajput Regt, survive 7 rounds, defensive
- `game/battles/asal-uttar.js` — Poona Horse, 97 Patton tanks, 3 waves, defensive
- `game/battles/dograi.js` — 3 Jat Regiment, night assault bayonets, 3 waves, offensive
- Filter chips simplified to single row

### Vijay Diwas Campaign (commit `cb8ed14`)
- 5 Kargil battles in sequence: Siachen → Tololing → Point 5140 → Khalubar → Tiger Hill
- Bridge cards between battles (field diary format)
- Campaign completion screen: all 5 insignia, the 527, Vijay Diwas tribute
- `campaignState {active, currentIndex, completed[]}`

### Context Handoff Doc (commit `6b21f6f`)
- `docs/REGIMENT-CONTEXT.md` — full architecture, data model, battle roster, screen flow, design principles

### Weapon Effects + Terrain Props (commit `d930f02`)
- `buildTerrainProps()`: sand dunes, ice spikes, rock clusters, sandbags per tile type
- `spawnWeaponEffect()`: LMG burst (3 tracers), mortar arc, tank shell, drone dive, missile streak
- `_activeEffects[]` array processed each frame in `gameLoop()`

---

### Boundary-Geometry Structures (commit `fe29d7f`)
- Hex radius confirmed: `HEX_R = 1.0`; edge midpoint distance = `√3/2 ≈ 0.866` world units
- Sangar: 2-layer sandbag walls at all 6 hex edge midpoints; edge 3 open as entrance on friendly sangars; enemy sangars fully enclosed with concrete roof overhang on edge 3
- LMG post: sandbag arc on edges 0/1/5 (back + sides); LMG barrel (`THREE.Group`) on edge 3 pointing outward; gun mount block at base
- Mortar pit: full 6-edge sandbag ring + dug pit floor + base plate + tube angled 54° from horizontal
- Fort parapets: stone walls on all 6 edges, corner posts at 4 vertices (wired for future fort battles)
- Removed `TorusGeometry(0.18, 0.06, 4, 8)` sand-dune coil props from open sand tiles — were producing confusing golden ring symbols on empty terrain

### Sandbag Geometry Fixes (commits `4c585e3`, `79b92fa`, `efc86ad`)
- Edge radius pulled from 0.866 (outside tile boundary) to 0.78 (inside) — sandbags now sit on the tile surface, not over the cliff
- Y offsets corrected: layer 1 at `ty+0.05` (box h=0.10), bottom flush with tile top
- **Rotation bug fixed**: `rotation.y = em.angle + PI/2` was only correct for the a=0 edge; for all other 5 edges the box was at the wrong angle. Correct formula: `rotation.y = -(em.angle + PI/2)` — mathematically derived from Three.js rotation matrix
- Colour: `0xb09060` (sandy tan, blended with desert) → `0x6a7840` (olive drab) — readable on all map themes
- Removed concrete bunker block from `'b'` terrain tiles (was wrongly stamping bunker on all rocky-approach hexes; bunkers are handled by `buildStructures()` only)
- Reduced rock clusters on `'r'` and `'t'` tiles from 2+ meshes to 1 small stone

### Asal Uttar Historical Fix (commit `bb503bd`)
- Removed Lt Arun Khetrapal — he belongs to the 1971 Battle of Basantar, NOT Asal Uttar 1965
- Added CQMH Abdul Hamid PVC correctly — jeep-mounted RCL gun, destroyed 7 Pattons, killed on 8th engagement; age 32
- Added Maj Ranjit Singh Dayal MVC (3 Cavalry)
- Updated all unit bios to reflect Centurion tank crew context
- Added new histCard #2 dedicated to Abdul Hamid's story
- Renamed histCard #3→#4 (Patton Nagar)

## Queued / Planned
- **Content enrichment** — richer unit bios (ages, hometowns), real battlefield quotes as dispatch messages, post-debrief legacy card, memorial heroes scroll screen
- **Unit death ceremony** — named soldiers who die mid-battle get a brief ceremony at battle end (name + medal if posthumous)
- **Audio** — war cries on battle start, ambient terrain sound (glacier wind, desert silence, monsoon rain)
- **Mini Metro meta layer** — draw regiment lines across India map connecting battles; regimental heritage through play
