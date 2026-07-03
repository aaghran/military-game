# Plan 1 — Mobile Playability Audit + Blocker Fixes

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A first-time visitor on a phone (390×844 portrait) can complete the Saragarhi battle start-to-finish with zero "can't tap it / stuck / can't read it" moments.

**Architecture:** This is an audit-and-fix plan, not a feature plan. Each task audits one screen of the flow against a concrete probe list, fixes every defect found directly in `game/index.html`, and re-verifies with before/after screenshots. The final task is a full end-to-end regression run plus a written audit report.

**Tech Stack:** Single-file Three.js r160 game (`game/index.html`, ~5,200 lines, ES modules, no build step). Verification via a phone-viewport browser session (use the `browse` skill / available headless-browser tooling at 390×844; Chrome DevTools device emulation is the manual fallback).

**Spec:** `docs/superpowers/specs/2026-07-03-pre-share-mobile-polish-design.md`

## Global Constraints

- No build step — pure browser JS, ES modules only.
- Game logic stays in `game/index.html`; battle data in `game/battles/*.js`.
- Historical content (names, regiments, medals, attributions) is untouched.
- Reverent tone preserved.
- Touch targets ≥44px on every interactive element.
- Baseline viewport: 390×844 portrait (iPhone 14). Desktop spot-check at 1280px before finishing.
- Line numbers below are as of commit `d7a1722` — always locate anchors by `grep`, not by line number.

## Working method (applies to every task)

1. Serve the game: `cd game && python3 -m http.server 8321` (leave running in background).
2. Open `http://localhost:8321/index.html` in a browser session sized **390×844**.
3. For each probe in the task: screenshot → if defective, fix in source → reload → screenshot again.
4. A "defect" is anything on the probe list OR anything that would visibly confuse a first-timer.
5. Fixes go in the existing mobile media block (`@media (max-width: 700px)` — grep `max-width: 700px` in index.html, blocks near lines 856 and 945) or in the relevant JS function. Follow the file's existing style: compact, no comments unless stating a constraint.
6. Commit after each task with the message given in the task. Include screenshots in `docs/audit-shots/` (create the directory; PNG, named `NN-description-before.png` / `-after.png`).

---

### Task 1: Environment + baseline capture

**Files:**
- Create: `docs/audit-shots/` (screenshots directory)
- No source changes in this task.

**Interfaces:**
- Produces: a running local server on port 8321 and baseline screenshots `01-*.png` that later tasks compare against.

- [ ] **Step 1: Start the server**

```bash
cd /Users/aaghran/projects/jarvis/projects/regiment/game && python3 -m http.server 8321
```

Run in background. Expected: `Serving HTTP on :: port 8321`.

- [ ] **Step 2: Open phone-viewport session and capture baselines**

Open `http://localhost:8321/index.html` at 390×844. Capture screenshots, saving to `docs/audit-shots/`:
- `01-opening.png` — the cinematic opening (`#screen-opening`)
- `01-select.png` — battle select after skipping the opening (`#screen-select`)
- Tap the 1897 era tile, then the Saragarhi card → `01-regiment.png` (`#screen-regiment`)
- Tap READ THE MISSION → `01-mission.png` (`#screen-intro`)
- Tap BEGIN BATTLE → `01-battle.png` (in-battle view)

- [ ] **Step 3: Record console state**

Read the browser console. Expected: no uncaught errors. Any uncaught error found here is a Task-2-priority defect — note it in the report notes file `docs/audit-shots/NOTES.md` (create it; one bullet per observation, running log for all tasks).

- [ ] **Step 4: Commit**

```bash
git add docs/audit-shots/
git commit -m "audit: baseline phone-viewport screenshots (390x844)"
```

---

### Task 2: Opening + battle select audit

**Files:**
- Modify: `game/index.html` (CSS mobile blocks; `showOpeningIfNeeded()` — grep `function showOpeningIfNeeded`; select-screen markup near `id="select-home"`)

**Interfaces:**
- Consumes: baseline screenshots from Task 1.
- Produces: a battle-select screen where every card/tile/banner is tappable at ≥44px and nothing overflows at 390px width.

- [ ] **Step 1: Probe the opening screen**

Probes (fix each failure, then re-verify):
- `#opening-skip-btn` appears within 3s and its tap area is ≥44px tall (measure rendered box; if smaller, add `min-height:44px;padding:12px 18px;` to `.opening-skip-btn` in the mobile media block).
- `#opening-begin-btn` is ≥44px tall and not clipped by the bottom edge.
- Text of `#opening-card` does not overflow the viewport width.

- [ ] **Step 2: Probe battle select**

Probes:
- `#campaign-banner` fits 390px width without horizontal scroll; tap area ≥44px.
- Every `.era-tile` in `#era-grid` is ≥44px tall and its full surface is tappable.
- Tapping an era shows `#select-era`; `#era-back-btn` is ≥44px and reachable without scrolling past content.
- Every `.battle-card-btn` is ≥48px tall (the CSS block near `max-width: 700px` already sets `min-height:48px` — verify it actually applies).
- The settings (`#settings-btn`) and theme (`#theme-toggle-btn`) buttons are tappable and don't overlap the title.
- No horizontal scrollbar anywhere on the select screen (`document.documentElement.scrollWidth <= 390`).

- [ ] **Step 3: Safe-area insets**

Check `<meta name="viewport">` in the `<head>`. It must include `viewport-fit=cover`. Then confirm the body or screen shells pad for the notch. If missing, set:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

and add to the mobile media block:

```css
.select-header, .opening-skip-btn { padding-top: env(safe-area-inset-top); }
```

- [ ] **Step 4: Re-capture and commit**

Save `02-select-after.png`. Then:

```bash
git add game/index.html docs/audit-shots/
git commit -m "fix: mobile audit — opening + battle select touch targets, overflow, safe-area"
```

---

### Task 3: Regiment intro + mission brief audit

**Files:**
- Modify: `game/index.html` (`#screen-regiment` markup/CSS near `id="rgt-insignia"`; `#screen-intro` markup/CSS near `id="intro-title"`; `showMissionBrief` — grep `function showMissionBrief`)

**Interfaces:**
- Consumes: working select screen from Task 2.
- Produces: intro screens readable and actionable on 390px without pinching.

- [ ] **Step 1: Probe regiment screen (`#screen-regiment`)**

- `.rgt-layout` stacks vertically at 390px (insignia above text, not side-by-side squeezed). If it doesn't, add `@media (max-width:700px){ .rgt-layout{flex-direction:column;align-items:center;} }` style fix consistent with existing CSS.
- `#rgt-btn` (READ THE MISSION) and `#rgt-btn-auto` (AUTO-PLAY) are both ≥44px tall, full width on mobile, and visible without scrolling more than one screen.
- `#rgt-bio` text is ≥11px rendered and doesn't overflow.

- [ ] **Step 2: Probe mission brief (`#screen-intro`)**

- `.intro-briefing` panels stack vertically at 390px; `#intro-map-grid` fits the width.
- `#begin-btn` (BEGIN BATTLE) is ≥48px tall, full-width on mobile, and reachable.
- `#watch-story-btn` (WATCH STORY MODE) is ≥44px and clearly separated from `#begin-btn` (no fat-finger ambiguity — at least 12px gap).
- All text ≥11px rendered; the facts grid (`#intro-facts`) doesn't clip.

- [ ] **Step 3: Re-capture and commit**

Save `03-regiment-after.png`, `03-mission-after.png`.

```bash
git add game/index.html docs/audit-shots/
git commit -m "fix: mobile audit — regiment + mission brief layout and touch targets"
```

---

### Task 4: In-battle audit (the critical one)

**Files:**
- Modify: `game/index.html` (canvas input: `handleCanvasTap`, `tapThreshold`, `pointerState`, pinch logic — grep each; mobile dock: `updateMobileDock`, `setMobileBattleMode`; panel: `setPanelCollapsed`; modals: `showHistCard`, `closeHistCard`, `showNarrative`, `showWarCry`)

**Interfaces:**
- Consumes: working intro flow from Task 3.
- Produces: a fully playable Saragarhi on the phone viewport.

- [ ] **Step 1: Gesture probes on the 3D canvas**

Play Saragarhi manually in the session. Probes:
- Tap a unit → it selects (blue/red highlights appear). Tap threshold: a slightly-shaky tap (≤14px movement, per `tapThreshold()`) must still select.
- One-finger drag → camera pans, and does NOT accidentally select/deselect on release.
- Two-finger pinch → zooms; after pinch ends, the next single tap still works (a classic bug: stale `activePointers` entries — verify the map is cleared on `pointerup`/`pointercancel`).
- Tap empty terrain with a unit selected → deselects without moving.
- The canvas must not scroll/bounce the page: confirm `touch-action: none` is set on the canvas element; if not, add it.

- [ ] **Step 2: HUD probes**

- End-turn control is always visible and ≥48px during the player turn (check the mobile dock — `updateMobileDock`).
- The unit panel in collapsed mobile mode doesn't cover the bottom rows of the hex grid; expanding/collapsing works by tap.
- Ability button (`.ability-btn`, mobile CSS sets `min-height:44px`) fires on tap.
- Rank key, mission info button, structure legend button: tappable, non-overlapping, and their popups dismiss on tap-outside.

- [ ] **Step 3: Modal probes**

- histCard (appears round 1 in Saragarhi): dismissible by a ≥44px close control AND doesn't block end-turn if left open.
- Narrative banner and war-cry overlay: auto-dismiss and never intercept taps after fading (check `pointer-events:none` once hidden).
- Settings overlay: opens, closes via ✕ and via tap-outside.

- [ ] **Step 4: Stuck-state probes**

- Play until at least wave 2. After every attack/move animation, input must return (`gameState.animating` must reliably reset). If any sequence leaves it `true` (e.g., a unit dies mid-callback), patch the guilty callback to reset it.
- Kill all your units OR survive to round 12 — either way the debrief must appear (no dead-end).
- Tap rapidly during enemy turn — must not corrupt state (input should be ignored during `phase==='enemy_turn'`, verify `handleCanvasTap`'s guard).

- [ ] **Step 5: Re-capture and commit**

Save `04-battle-after.png` plus one screenshot per fixed defect.

```bash
git add game/index.html docs/audit-shots/
git commit -m "fix: mobile audit — in-battle gestures, HUD, modals, stuck states"
```

---

### Task 5: Debrief audit + performance pass

**Files:**
- Modify: `game/index.html` (debrief markup near `id="screen-debrief"`; `showDebrief`; terrain/prop counts in `buildTerrainProps` if perf demands)

**Interfaces:**
- Consumes: completable battle from Task 4.
- Produces: readable debrief on phone + acceptable performance on a throttled profile. (Plan 3 rebuilds the debrief presentation; here we only fix blockers — overflow, unreadable text, unreachable buttons.)

- [ ] **Step 1: Debrief blocker probes**

- All debrief sections visible by scrolling; no horizontal overflow at 390px.
- `#back-btn` ≥48px, reachable.
- Stat numbers and fallen names readable (≥11px rendered).

- [ ] **Step 2: Performance probes**

With 4× CPU throttling (or the tooling's equivalent):
- Time from navigation to interactive battle-select < 5s on localhost. Note the number in `NOTES.md`.
- In-battle frame rate during an attack animation ≥ 24fps. If below: reduce `buildTerrainProps` instance counts and/or glow-ring update frequency (e.g., update `_glowRingMeshes` every 3rd frame) until it passes. Keep visual changes minimal.
- Check `renderer.setPixelRatio` — grep it; on mobile cap it at `Math.min(window.devicePixelRatio, 2)`. Add the cap if missing.

- [ ] **Step 3: Commit**

```bash
git add game/index.html docs/audit-shots/
git commit -m "fix: mobile audit — debrief blockers + perf caps (pixel ratio, prop counts)"
```

---

### Task 6: Full regression run + audit report

**Files:**
- Create: `docs/AUDIT-MOBILE-2026-07.md`

**Interfaces:**
- Consumes: all fixes from Tasks 2–5.
- Produces: the exit-criterion proof + report. Plans 2 and 3 re-run this task's Step 1 as their regression check.

- [ ] **Step 1: The exit-criterion run**

Fresh browser session (cleared storage), 390×844, `http://localhost:8321/index.html`. Complete this without a single blocker:
opening → select → 1897 era → Saragarhi → READ THE MISSION → BEGIN BATTLE → select unit → move → attack → use Ishar Singh's rally → end turn → survive/dismiss histCard → play to debrief → RETURN.
Screenshot each stage as `06-run-N.png`.

- [ ] **Step 2: Desktop spot-check**

Resize to 1280×800, load fresh, click through select → Saragarhi → battle for 2 turns. Expected: no layout regressions from the mobile fixes.

- [ ] **Step 3: Write the report**

`docs/AUDIT-MOBILE-2026-07.md`: table of every defect found (screen, defect, fix, before/after screenshot filenames), the perf numbers from Task 5, and any non-blocker observations left for later (feed from `NOTES.md`).

- [ ] **Step 4: Commit**

```bash
git add docs/AUDIT-MOBILE-2026-07.md docs/audit-shots/
git commit -m "docs: mobile playability audit report — exit criterion met"
```
