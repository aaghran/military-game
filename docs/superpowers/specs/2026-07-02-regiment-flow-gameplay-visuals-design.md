# Regiment — Flow, Gameplay & Visual Identity Design

**Date:** 2026-07-02  
**Status:** Approved

---

## Goal

Transform Regiment from a battle-selection screen into a cohesive interactive military history experience: cinematic opening → regiment storytelling → optional tactical play or guided auto-watch → legacy debrief. Add gameplay depth (morale + abilities) and real visual identity (Wikipedia regiment insignia + wave-based atmosphere).

## Architecture

Single-file game (`index.html`) + modular battle files (`battles/*.js`). No build step. All additions stay in this pattern. New asset folder: `game/assets/insignia/` for regiment SVG logos.

**Implementation order:** Flow + Opening → Visual Identity → Auto-mode → Gameplay Depth

---

## Section 1: Flow — The Complete Journey

```
Cinematic Opening (18s, skippable after 3s)
  ↓
Battle Select (enhanced cards with real insignia)
  ↓
Regiment Intro Screen (existing — bio, motto, war cry, insignia)
  Two buttons: [READ THE MISSION →] and [▶ AUTO-PLAY]
  ↓
Battle (play mode OR auto/guided mode)
  ↓
Debrief + Legacy
```

### Cinematic Opening

- Shown once per session (sessionStorage flag `_introShown`)
- Screen: `#screen-opening`, same `.screen` pattern, `background:#000`
- Four text cards, each fades in over 0.6s, holds 2.8s, fades out 0.5s
- Cards display sequentially, total ~18 seconds:
  1. *"September 1897. A mud-brick signal post. 10,000 Pashtun warriors."*
  2. *"November 1962. −20°C. No artillery. No retreat."*
  3. *"December 1971. Midnight. Pakistani tanks in the desert."*
  4. *"Six regiments. Six battles. One hundred and twenty-eight years."*
- After card 4 fades out: REGIMENT title card appears with "BEGIN THE JOURNEY" button
- Skip button (`SKIP ›`) appears after 3 seconds in top-right corner
- Music: existing dark-theme ambient music starts at card 1, volume 0.3
- On skip or button click: `showScreen('screen-select')`

### Regiment Screen — New Button

Add `▶ AUTO-PLAY` button alongside existing `READ THE MISSION →`:
```html
<button class="rgt-btn rgt-btn-auto" id="rgt-btn-auto">▶ AUTO-PLAY</button>
```
- Clicking AUTO-PLAY sets `gameSettings.autoPlay = true` then calls `showIntro(_pendingBattle)`
- Clicking READ THE MISSION sets `gameSettings.autoPlay = false` then calls `showIntro(_pendingBattle)`
- `gameSettings.autoPlay` persists to localStorage

---

## Section 2: Auto / Guided Mode

### State

```javascript
// In gameSettings (persisted to localStorage)
gameSettings.autoPlay = false  // default

// Runtime flag reset at battle start
gameState.autoPlaying = false  // mirrors gameSettings.autoPlay at battle start
```

### Behaviour

- At start of Indian phase, if `gameState.autoPlaying`:
  - Iterate Indian units in order
  - For each: find best move (closest enemy reachable) → move → if enemy in range, attack
  - 800ms delay between each unit action
  - Uses same helper functions as PLA AI (`findPath`, `axDist`, etc.), mirrored for Indian side
- **Pause:** panel header shows `⏸ PAUSE` button instead of `END TURN`; clicking sets `gameState.autoPlaying = false`, shows `END TURN` and `▶ RESUME`
- **Take over:** player clicks any Indian unit → exits auto-mode (`gameState.autoPlaying = false`), normal play resumes
- **Narrative overlays:** at each `narratives[round]` key in battle data, show overlay text for 2.5s before proceeding (already defined per battle)
- **Historical cards** fire on schedule as in manual play

### Auto-AI Logic (Indian side)

```javascript
function autoPlayIndianTurn() {
  const units = gameState.units.filter(u => u.side==='ind' && u.alive && !u.moved);
  let i = 0;
  function next() {
    if (!gameState.autoPlaying || i >= units.length) { endTurn(); return; }
    const u = units[i++];
    const enemies = gameState.units.filter(e => e.side==='pla' && e.alive);
    if (!enemies.length) { endTurn(); return; }
    // Find nearest enemy
    const tgt = enemies.reduce((a,b) => axDist(u.q,u.r,b.q,b.r) < axDist(u.q,u.r,a.q,a.r) ? b : a);
    // Move toward target if not already in range
    if (axDist(u.q,u.r,tgt.q,tgt.r) > u.rng) {
      const path = findPath(u, tgt);
      const dest = path[Math.min(u.mov, path.length-1)];
      if (dest) moveUnit(u, dest.q, dest.r);
    }
    // Attack if in range
    if (axDist(u.q,u.r,tgt.q,tgt.r) <= u.rng && !u.attacked) {
      setTimeout(() => { executeAttack(u, tgt); setTimeout(next, 800); }, 400);
    } else {
      setTimeout(next, 800);
    }
  }
  setTimeout(next, 600);
}
```

Called at start of Indian phase when `gameState.autoPlaying` is true.

---

## Section 3: Visual Identity

### Regiment Insignia — Asset Files

Download and save to `game/assets/insignia/`:

| File | Wikipedia source | Regiment |
|---|---|---|
| `sikh.svg` | `Sikh_Regiment,_Indian_Army.svg` | 36th Sikh Infantry |
| `kumaon.svg` | `Kumaon_Regiment.svg` | 13 Kumaon |
| `punjab.svg` | `Punjab_Regiment_(India).svg` | 23 Punjab |
| `rajputana.svg` | `Rajputana_Rifles.svg` | 2 Rajputana Rifles |
| `jak-rif.svg` | `Jammu_and_Kashmir_Rifles.svg` | 19 JAK RIF |
| `aada.svg` | hand-crafted (no Wikipedia source) | Army Air Defence Corps |

Add `insigniaFile` field to each entry in `BATTLES` array:
```javascript
{ name: 'Saragarhi', insigniaFile: 'assets/insignia/sikh.svg', ... }
```

### Display Sizes

| Location | Size | Implementation |
|---|---|---|
| Regiment intro screen | 140×168px | `<img>` replacing current inline SVG |
| Battle cards | 48×48px | `<img>` in `.card-icon` replacing terrain SVG |
| Panel during play | 20×20px | `<img class="panel-insignia">` next to unit name |

Fallback: if image fails to load (`onerror`), fall back to existing `battle.insigniaSvg?.(battle.color)` inline SVG.

### Wave-Based Atmosphere

Three.js scene parameters shift as waves progress. Applied in `spawnWave(waveIndex)`:

| Wave | Fog density | Scene bg (dark) | Directional light | Notes |
|---|---|---|---|---|
| 1–2 | 0.022 | 0x0a0a14 | white, intensity 1.0 | base |
| 3–4 | 0.032 | 0x0d0a10 | warm white, intensity 0.9 | tension building |
| 5+ | 0.045 | 0x100808 | red-orange tint, intensity 0.8 | crisis point |

```javascript
function applyWaveAtmosphere(waveIndex) {
  const phases = [
    { fog: 0.022, bg: 0x0a0a14, lightColor: 0xffffff, lightInt: 1.0 },
    { fog: 0.022, bg: 0x0a0a14, lightColor: 0xffffff, lightInt: 1.0 },
    { fog: 0.032, bg: 0x0d0a10, lightColor: 0xfff4e0, lightInt: 0.9 },
    { fog: 0.032, bg: 0x0d0a10, lightColor: 0xfff4e0, lightInt: 0.9 },
    { fog: 0.045, bg: 0x100808, lightColor: 0xff9966, lightInt: 0.8 },
  ];
  const p = phases[Math.min(waveIndex, phases.length-1)];
  scene.fog.density = p.fog;
  scene.background = new THREE.Color(p.bg);
  dirLight.color.setHex(p.lightColor);
  dirLight.intensity = p.lightInt;
}
```

**Round events** (airstrike, S-400 salvo): white flash overlay (#fff, opacity 0→0.6→0, 300ms) + full-width narrative text for 2.5 seconds.

---

## Section 4: Gameplay Depth — Morale + Abilities

### Morale System

New field on every unit: `morale: 100` (0–100).

**Triggers:**
- Ally within 2 hexes dies: −15 morale to all surviving allies within 2 hexes
- Unit loses >50% maxHp in one hit: −20 morale to that unit
- Rally ability used on unit: +25 morale (capped at 100)

**Effects:**
- 70–100: normal stats
- 40–69: atk −1
- 0–39: atk −2, 30% chance each round to be "pinned" (skip turn, show pin icon)

**Visuals:** small arc indicator on figurine base. Green (70+), amber (40–69), red (0–39). Rendered as a `RingGeometry` segment around the unit base, updated after each attack resolution.

### Unit Abilities

One ability per unit type. Activated via "USE ABILITY" button in unit panel. Once per battle unless noted.

| Unit type | Ability name | Effect | Cooldown |
|---|---|---|---|
| `hero` | **Rally** | +25 morale to all units within 2 hexes | Once per battle |
| `section_cdr` | **Covering Fire** | Until end of round: if any adjacent ally is attacked, this unit fires back immediately | Once per round |
| `rifleman` | **Dig In** | +2 def this round, unit cannot move this round | Once per round |
| `pla_cdr` | **Coordinated Assault** | All adjacent PLA units gain +1 atk until end of round | Once per round |
| `pla_tank` | **Suppress** | Target unit loses its next attack action | Once per round |
| `drone` | **Swarm** | Attacks two different adjacent units in one action | Once per battle |

**Implementation:**
- `unit.abilityUsed = false` — set true when ability fires (for once-per-battle)
- `unit.abilityRoundUsed = -1` — round number when last used (for once-per-round: usable again when `gameState.round > unit.abilityRoundUsed`)
- Panel shows ability button when unit is selected; greyed out if used
- Ability effects are applied immediately, with a brief visual flash on affected units

### New STATS fields

```javascript
// Add to each STATS entry:
hero:        { hp:5, atk:3, mov:3, rng:2, morale:100, ability:'rally' },
section_cdr: { hp:3, atk:2, mov:2, rng:2, morale:100, ability:'covering_fire' },
rifleman:    { hp:2, atk:2, mov:2, rng:1, morale:100, ability:'dig_in' },
pla:         { hp:2, atk:1, mov:2, rng:1, morale:100, ability:null },
pla_cdr:     { hp:3, atk:2, mov:2, rng:2, morale:100, ability:'coordinated_assault' },
pla_tank:    { hp:4, atk:3, mov:1, rng:3, morale:100, ability:'suppress' },
drone:       { hp:1, atk:2, mov:3, rng:1, morale:100, ability:'swarm' },
missile:     { hp:2, atk:4, mov:3, rng:1, morale:100, ability:null },
aircraft:    { hp:3, atk:3, mov:2, rng:3, morale:100, ability:null },
```

---

## Out of Scope

- No persistent cross-session unlocks or save states beyond existing localStorage
- No multiplayer
- No sound effects beyond existing Web Audio generative music
- No external API calls for images (Wikipedia SVGs downloaded and committed locally)
- Light theme atmosphere shifts: only applied in dark mode (skip `applyWaveAtmosphere` if `gameSettings.theme === 'light'`)
