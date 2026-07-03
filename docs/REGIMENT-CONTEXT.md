# Regiment — Full Context Document
> Handoff doc for agents, collaborators, and ideation. Written 2 July 2026.

---

## 1. What Is Regiment?

**Regiment** is a 2D tactical hex-grid browser game built as a living memorial to the Indian Army. Each battle is a real historical engagement. Each unit is a real soldier. The game exists not to entertain first — but to make people *feel* the battles, remember the names, and understand what was at stake.

It is a tribute game. The gameplay is the vehicle. The history is the point.

**Public repo:** `git@github.com:aaghran/military-game.git`
**Game file:** `game/index.html` (single-file, no build step, Three.js r160 ES modules)
**Battle files:** `game/battles/*.js` (one file per battle, imported via `game/battles/index.js`)

---

## 2. The Vision

### Why Regiment Exists

India has 527 soldiers who died in the Kargil War alone. Most Indians under 30 cannot name three of them. Regiment is an attempt to change that — not through lectures, but through play.

Every 26th of July is **Kargil Vijay Diwas** — the day India recaptured the last Kargil peak in 1999. Regiment is designed to be played on that day, every year, as a ritual act of remembrance. The **Vijay Diwas Campaign** mode (5 Kargil battles in sequence) is the annual anchor.

### What Makes It Different

Most war games abstract soldiers into units. Regiment inverts this: each hex on the grid is a named person with a biography, a regiment, a medal, and often a death. The gameplay — move, attack, hold the line — is designed to make you feel what those soldiers faced, not just simulate it.

### The Tone

- Reverent but not preachy
- Dark terminal aesthetic (not jingoistic red-white-blue)
- No glorification of violence — the enemy units are also human, the casualty counts are real
- "When you go home, tell them of us and say — for your tomorrow, we gave our today." (Kohima Epitaph)

---

## 3. The Game — Design & Gameplay

### Tech Stack
- **Three.js r160** (ES modules, no build step)
- **Single HTML file** (`game/index.html`, ~3500+ lines)
- **Hex grid** (pointy-top, odd-r offset coordinate system)
- **Browser only** — no server, no accounts, no backend
- **Vercel** deployment (see `vercel.json` at repo root)

### Core Mechanics

**Hex Grid**
- 11×10 hex grid, pointy-top orientation
- Coordinates: `(col, row)` in offset space; `toAxial()` converts for distance calc
- Each cell has a terrain type (letter code), height, defense multiplier, movement cost

**Turn Structure**
1. Indian side moves/attacks (player or auto-play)
2. Enemy side moves/attacks
3. Round events trigger (airstrikes, reinforcements)
4. Next round

**Combat**
- `doCombat(atk, def)`: `effAtk = atk.atk - moralePenalty + atkBonus`; damage = `effAtk / def.def`
- Morale system: 0–100, shown as arc ring on unit. Below 40 = 30% chance to skip action
- Unit abilities: `rally`, `covering_fire`, `dig_in`, `coordinated_assault`, `suppress`, `swarm`

**Auto-Play**
- `autoPlayIndianTurn()` — BFS movement scoring, structure-aware, weakest-target selection
- `autoPlayStyle: 'defensive'` — units hold fortified positions, skip move if already on structure
- `autoPlayStyle: 'offensive'` — units advance toward enemy
- `autoPlayForceWin: true` — +1 atk bonus, used on all battles except Rezang La
- All battles can be watched in auto-play; Rezang La is the only winnable-only-by-player battle

**Win Conditions**
- `{type:'waves'}` — clear all enemy wave spawns
- `{type:'rounds', n:X}` — survive X rounds (defensive battles: Kohima, Longewala)

**Weapon Effects**
- `spawnWeaponEffect(atk, def)` — 7 types: rifle flash, LMG burst (3 tracers), mortar arc, tank shell, drone dive, missile streak, aircraft cannon
- All effects use `_activeEffects[]` array processed each frame in `gameLoop()`

**Structure System**
- `getStructure(col, row)` — returns `{type, label, atkMul, defMul, rngBonus}`
- Types: `sangar` (bunker), `lmg` (heavy machine gun post), `mortar` (mortar pit), `fort` (Saragarhi walls)
- Holding a structure gives combat multipliers; `noRetaliate:true` means mortar can't be attacked back

**Terrain Props**
- `buildTerrainProps()` — per-tile-type decorative 3D meshes (sand dunes, ice spikes, rocks, sandbags)
- `buildStructureProps()` — enhanced 3D visuals: sandbag rings, fort parapets/crenellations/flagpole, mortar pits, enemy bunkers with snow caps

---

## 4. The Data Architecture

### Two-Layer System

**Layer 1: BATTLES array** (regiment identity)
```javascript
{
  name, year, regiment, regimentFull,
  color, regimentColor, colorName,
  motto, mottoEng, warCry,
  insignia, insigniaSvg, insigniaFile,
  regimentBio, debriefLegacy,
}
```
This is the *who* and *why* — narrative, identity, heritage.

**Layer 2: BATTLE_DATA object** (gameplay)
```javascript
{
  terrain, map, structures,
  indStarts, plaWaves, initialEnemies,
  roundEvents, narratives, histCards,
  winCondition, autoPlayStyle, autoPlayForceWin,
  enemyLabels, enemyBio,
  introMeta, introText, debriefWin, debriefLoss, debriefHistory,
}
```
This is the *how* — map layout, enemy waves, unit placement.

If BATTLE_DATA contradicts BATTLES, BATTLE_DATA wins for gameplay; BATTLES wins for narrative.

---

## 5. The Battles (13 Total)

| # | Battle | Year | Regiment | Type | Notes |
|---|--------|------|----------|------|-------|
| 1 | Saragarhi | 1897 | 36th Sikh Regiment | Defensive | 21 vs 10,000. Last stand. |
| 2 | Haifa | 1918 | Jodhpur & Mysore Lancers | Offensive | Last great cavalry charge |
| 3 | Kohima | 1944 | Assam Regt + Rajput Regt | Defensive | "Battle of the Tennis Court" |
| 4 | Rezang La | 1962 | 13 Kumaon Regiment | Defensive | Only battle with autoPlayForceWin:false |
| 5 | Asal Uttar | 1965 | Poona Horse & 3 Cavalry | Defensive | 97 Patton tanks destroyed |
| 6 | Dograi | 1965 | 3 Jat Regiment | Offensive | Night assault, bayonets |
| 7 | Longewala | 1971 | 23 Punjab Regiment | Defensive | 120 vs 2,000 + 45 tanks |
| 8 | Siachen | 1987 | Siachen Pioneers / JAK LI | Mixed | Glacier warfare |
| 9 | Tololing | 1999 | 2 Rajputana Rifles | Offensive | First Kargil peak retaken |
| 10 | Point 5140 | 1999 | 13 JAK RIF | Offensive | Vikram Batra. "Yeh Dil Maange More." |
| 11 | Khalubar | 1999 | 1/11 Gorkha Rifles | Offensive | Manoj Pandey. "Na Chodnu." |
| 12 | Tiger Hill | 1999 | 8 Sikh + 18 Grenadiers | Offensive | Highest point. Bofors decisive. |
| 13 | Operation Sindoor | 2025 | AAD Corps | Mixed | India's drone/missile defence |

**Filter chips (battle select screen):** ALL · PRE-1947 · 1962 · 1965 · 1971 · KARGIL · MODERN

---

## 6. The Vijay Diwas Campaign

A dedicated campaign mode that sequences all 5 Kargil battles:
`Siachen → Tololing → Point 5140 → Khalubar → Tiger Hill`

- Accessible from a saffron/gold banner on the battle select screen
- **Bridge cards** between each battle: field-diary-style narrative connecting the battles as one continuous story
- **Completion screen**: all 5 regiment insignia displayed, the 527, Vijay Diwas tribute text
- Timeless language: no specific year, works as an annual tribute on 26 July every year
- Campaign state tracked in `campaignState { active, currentIndex, completed[] }`

---

## 7. Screens & Flow

```
[Cinematic Intro] (once per session)
    ↓
[Battle Select] ← back from anywhere
    ↓ click battle card       ↓ click campaign banner
[Regiment Intro]          [Campaign Screen]
    ↓                          ↓
[Game Screen]          [Bridge Card] → [Game Screen] → [Debrief] → next bridge / tribute
    ↓
[Debrief]
    ↓
[Battle Select]
```

`showScreen(name)` — hides all named screens, shows the target one.

---

## 8. What's Been Built (Commit Trail)

| Commit | What Landed |
|--------|-------------|
| `d930f02` | Terrain props + weapon effect animations |
| `dcf8fad` | Defensive auto-play (Saragarhi, Rezang La) |
| `4e1570b` | Battle filter chips, structure-aware auto-play, auto-win |
| `f072c7a` | Haifa, Kohima, Asal Uttar, Dograi + simplified filter chips |
| `ee64f53` | Point 5140, Khalubar, Tiger Hill; Longewala plaWaves fix |
| `82917a6` | Tololing histCard fix (removed wrong Gorkha attribution) |
| `cb8ed14` | Vijay Diwas Campaign — bridge cards, completion screen, tribute |
| `[pending]` | Enhanced structure visuals (sangar, fort, mortar, bunkers) |

---

## 9. Content Philosophy

### What Every Battle Has
- **6 named Indian units** with individual bios (hero, 2 section commanders, 3 riflemen)
- **Regiment biography** — full history, not just this battle
- **histCards** — 2-3 historical cards shown during play (soldier profiles, context, legacy)
- **Narratives** — round-by-round text telling the story as it unfolds
- **debriefHistory** — what happened historically, after the game ends
- **War cry** — the regiment's actual battle cry, displayed on battle entry

### What We Want to Add (Content Enrichment — In Design)
1. **The human story** — ages, hometowns, families, personal moments before the battle
2. **Real documented quotes** — actual words from the battlefield, styled as dispatch messages
3. **"What happened next" legacy card** — post-debrief, what's named after them, where the regiment serves today
4. **Memorial / Heroes Scroll screen** — all named soldiers, their medals, ages, one line each. The 527.
5. **Richer campaign bridges** — commanding officer's field diary format
6. **Audio** — war cries on battle start, ambient sound (glacier wind, desert night silence)

---

## 10. New Mechanic Concept — Mini Metro Layer

**Idea (from Aaghran, 2 July 2026):**
A meta-game layer inspired by Mini Metro — where players draw "regiment lines" connecting battles across a map of India/South Asia, building regiment histories and maintaining streaks/scores.

- Map of India with battle locations as nodes
- Players draw lines connecting battles (like metro routes)
- Each line represents a regiment's service history
- Connecting battles of the same regiment unlocks deeper content
- Streak mechanic: consecutive wins on a line maintain the streak
- Score persists across sessions
- Social: compare streaks/routes with other players

**Why this is interesting:** It turns Regiment from a collection of isolated battles into a *connected* narrative of the Indian Army — you see that the same regiment fought at Rezang La and later at Kargil, that the Gorkhas were at Kohima and Khalubar. The meta-game teaches regimental heritage through play.

**Open design questions:**
- Is the map layer a separate screen or overlaid on battle select?
- Does "drawing a line" unlock or does winning battles unlock?
- Multiplayer/social: is this per-user or collaborative?
- Mobile-first or desktop?

---

## 11. Key Code Locations

| What | Where |
|------|-------|
| Game entry point | `game/index.html` (single file, ~3500+ lines) |
| Battle data | `game/battles/index.js` (imports all, exports BATTLES + BATTLE_DATA) |
| Individual battles | `game/battles/saragarhi.js`, `haifa.js`, `kohima.js`, etc. |
| Regiment insignia | `game/assets/insignia/*.svg` |
| Auto-play logic | `autoPlayIndianTurn()` in `index.html` |
| Campaign state | `campaignState`, `CAMPAIGN_BATTLES`, `startCampaign()` in `index.html` |
| Terrain props | `buildTerrainProps()` in `index.html` |
| Weapon effects | `spawnWeaponEffect(atk, def)` in `index.html` |
| Combat resolution | `doCombat(atk, def)` in `index.html` |
| Morale system | `applyMoraleDamage()`, `unit.morale`, ring visual in `index.html` |

---

## 12. Design Principles (Non-Negotiable)

1. **No build step** — pure browser JS, always
2. **Historical accuracy** — regiment attributions must be verified. Source: Wikipedia + official regimental histories
3. **No credential leaks** — `.env.local` is gitignored, never committed
4. **Reverent tone** — this is a memorial, not a war simulator
5. **Single file for the game** — `game/index.html` is the game. Battle data splits into `battles/*.js` only.
6. **Auto-play always wins** (except Rezang La) — the tribute must be watchable, not stuck

---

*For questions, context, or to resume work: read this file + `game/battles/index.js` for current battle roster + `git log --oneline -15` for recent changes.*
