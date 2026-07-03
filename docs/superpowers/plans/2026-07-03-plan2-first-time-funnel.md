# Plan 2 — First-Time-Player Funnel

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A first-time phone visitor goes from opening the link to actively fighting in under 60 seconds, knowing what to do.

**Architecture:** Four additions to `game/index.html`: (1) an instant static loading screen shown before the Three.js module loads, (2) a first-visit "START HERE" card at the top of battle select, (3) a mobile-friendly skippable opening, (4) a guided-first-battle nudge sequence that replaces reading the HOW TO PLAY wall. First-visit state lives in `localStorage` key `regiment_seen`.

**Tech Stack:** Single-file Three.js r160 game (`game/index.html`), ES modules, no build step. Verification via phone-viewport browser session at 390×844 (`browse` skill or equivalent; server: `cd game && python3 -m http.server 8321`).

**Spec:** `docs/superpowers/specs/2026-07-03-pre-share-mobile-polish-design.md`

## Global Constraints

- No build step — pure browser JS, ES modules only.
- Game logic stays in `game/index.html`; battle data in `game/battles/*.js`.
- Historical content untouched; reverent tone preserved (loading quote and card copy below is final — don't invent new copy).
- Touch targets ≥44px; baseline viewport 390×844; desktop spot-check at 1280px.
- Run Plan 1 (mobile audit) first. Locate all anchors by `grep`, never by line number.
- Verify each task in the browser before committing (clear `localStorage`/`sessionStorage` between first-visit tests: `localStorage.clear(); sessionStorage.clear()` in the console).

---

### Task 1: Instant loading screen

**Files:**
- Modify: `game/index.html` — static HTML right after `<body>`, CSS in the main `<style>` block, removal call at the end of the module script (grep `buildSelectScreen(); applySettings(); showOpeningIfNeeded()`).

**Interfaces:**
- Produces: `<div id="boot-loader">` present in static HTML, removed by `dismissBootLoader()` once the game boots. No other task depends on it, but Task 5's regression checks it appears.

- [ ] **Step 1: Add the static loader markup**

Immediately after `<body>` (before `#screen-opening`), add:

```html
<div id="boot-loader">
  <div class="boot-star">✦</div>
  <div class="boot-title">REGIMENT</div>
  <div class="boot-quote">"When you go home, tell them of us and say —<br>for your tomorrow, we gave our today."</div>
  <div class="boot-bar"><div class="boot-bar-fill"></div></div>
</div>
```

- [ ] **Step 2: Add the loader CSS**

In the main `<style>` block (near the `.opening-*` rules):

```css
#boot-loader{position:fixed;inset:0;z-index:900;background:#0a0a14;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;font-family:'Courier New',monospace;transition:opacity .4s;}
#boot-loader .boot-star{color:#c8a96e;font-size:18px;}
#boot-loader .boot-title{color:#c8a96e;font-size:22px;letter-spacing:8px;}
#boot-loader .boot-quote{color:#869181;font-size:11px;line-height:1.7;text-align:center;padding:0 28px;font-style:italic;}
#boot-loader .boot-bar{width:140px;height:2px;background:rgba(200,169,110,.15);border-radius:2px;overflow:hidden;}
#boot-loader .boot-bar-fill{width:40%;height:100%;background:#c8a96e;animation:bootSlide 1.1s ease-in-out infinite alternate;}
@keyframes bootSlide{from{margin-left:0}to{margin-left:60%}}
#boot-loader.done{opacity:0;pointer-events:none;}
```

- [ ] **Step 3: Dismiss on boot**

At the end of the module script, find `buildSelectScreen(); applySettings(); showOpeningIfNeeded(); gameLoop();` and add before it:

```javascript
function dismissBootLoader(){const b=document.getElementById('boot-loader');if(!b)return;b.classList.add('done');setTimeout(()=>b.remove(),450);}
```

and call `dismissBootLoader();` immediately after `showOpeningIfNeeded();`.

- [ ] **Step 4: Verify**

Phone viewport, hard-reload with network throttled to Fast 3G. Expected: REGIMENT + Kohima epitaph quote visible within ~1s, loader fades once the opening/select screen appears. Un-throttle afterwards.

- [ ] **Step 5: Commit**

```bash
git add game/index.html
git commit -m "feat: instant boot loader — insignia quote while Three.js loads"
```

---

### Task 2: First-visit "START HERE" card

**Files:**
- Modify: `game/index.html` — markup inside `#select-home` (grep `id="select-home"`), CSS near `.campaign-banner` rules, JS in `showBattleSelect` (grep `function showBattleSelect`).

**Interfaces:**
- Consumes: `showMissionBrief(battle)` (existing — grep `function showMissionBrief`) and `BATTLES` array.
- Produces: `localStorage` key `regiment_seen` (set to `'1'` by Task 4 when the first battle *starts*); `renderFirstVisitCard()` called from `showBattleSelect()`.

- [ ] **Step 1: Add the card markup**

Inside `#select-home`, ABOVE `#campaign-banner`:

```html
<div id="first-visit-card" class="hidden">
  <div class="fv-label">YOUR FIRST BATTLE</div>
  <div class="fv-title">SARAGARHI · 1897</div>
  <div class="fv-sub">21 soldiers. 10,000 attackers. They all chose to stand.</div>
  <button id="fv-start-btn">START HERE →</button>
</div>
```

- [ ] **Step 2: Add the CSS**

Near the `.campaign-banner` / battle-card rules:

```css
#first-visit-card{max-width:420px;margin:0 auto 18px;padding:18px 20px;border:1px solid rgba(200,169,110,.45);border-radius:10px;background:linear-gradient(180deg,rgba(200,169,110,.10),rgba(200,169,110,.03));text-align:center;}
#first-visit-card.hidden{display:none;}
#first-visit-card .fv-label{font-size:9px;letter-spacing:3px;color:#c8a96e;margin-bottom:8px;}
#first-visit-card .fv-title{font-size:16px;font-weight:bold;letter-spacing:2px;color:#e8e0d0;margin-bottom:6px;}
#first-visit-card .fv-sub{font-size:11px;color:#b0b0bf;line-height:1.6;margin-bottom:12px;}
#first-visit-card #fv-start-btn{width:100%;min-height:48px;border:none;border-radius:999px;background:#c8a96e;color:#141410;font-family:'Courier New',monospace;font-weight:bold;font-size:12px;letter-spacing:2px;cursor:pointer;}
```

- [ ] **Step 3: Wire the logic**

In `showBattleSelect()`, at the top of the function body, add a call `renderFirstVisitCard();` and define next to it:

```javascript
function renderFirstVisitCard(){
  const card=document.getElementById('first-visit-card'); if(!card) return;
  const firstVisit=!localStorage.getItem('regiment_seen');
  card.classList.toggle('hidden',!firstVisit);
  if(firstVisit&&!card._wired){
    card._wired=true;
    document.getElementById('fv-start-btn').addEventListener('click',()=>{
      const b=BATTLES.find(x=>x.name==='Saragarhi');
      if(b) showMissionBrief(b);
    });
  }
}
```

- [ ] **Step 4: Verify**

Phone viewport, cleared storage → select screen shows the card above the campaign banner; tapping START HERE lands on the Saragarhi mission brief. Set `localStorage.setItem('regiment_seen','1')`, reload → card gone, layout identical to before this task. Desktop 1280px: card centered, not stretched.

- [ ] **Step 5: Commit**

```bash
git add game/index.html
git commit -m "feat: first-visit START HERE card — Saragarhi as the curated first battle"
```

---

### Task 3: Mobile-skippable opening

**Files:**
- Modify: `game/index.html` — `showOpeningIfNeeded()` (grep `function showOpeningIfNeeded`).

**Interfaces:**
- Consumes: `isMobileView()` (existing), `OPENING_CARDS`, the `done()` closure inside `showOpeningIfNeeded`.
- Produces: no new API; behavioral change only.

- [ ] **Step 1: Show SKIP immediately on mobile + tap-anywhere skip**

In `showOpeningIfNeeded()`, replace the line `setTimeout(()=>{ if(!cancelled) skipBtn.classList.remove('hidden'); }, 3000);` with:

```javascript
setTimeout(()=>{ if(!cancelled) skipBtn.classList.remove('hidden'); }, isMobileView()?600:3000);
if(isMobileView()) document.getElementById('screen-opening').addEventListener('click', done);
```

Note: `done()` is idempotent via the `cancelled` flag, so the extra listener is safe alongside the buttons.

- [ ] **Step 2: Verify**

Phone viewport, cleared sessionStorage → opening plays, SKIP visible well under 1s, tapping anywhere jumps to battle select. Desktop 1280px, cleared sessionStorage → old behavior (SKIP after 3s, tap-anywhere does nothing, BEGIN button works).

- [ ] **Step 3: Commit**

```bash
git add game/index.html
git commit -m "feat: opening cinematic tap-to-skip on mobile, SKIP visible immediately"
```

---

### Task 4: Guided first two turns

**Files:**
- Modify: `game/index.html` — new tutorial module near `startIdleNudge` (grep `function startIdleNudge`); hooks in `selectUnit`, `executeMove`, `executeAttack`, `doEndTurn`, `startBattle` (grep each); CSS near the idle-nudge styles.

**Interfaces:**
- Consumes: `gameState`, `gameSettings.autoPlay`, `showNarrative` NOT used (tutorial has its own element so it never collides with battle narratives).
- Produces: `tutorialStep(name)` called with `'select'|'move'|'attack'|'endturn'|'round2'`; `localStorage` key `regiment_seen` set in `startBattle`.

- [ ] **Step 1: Add the tutorial element + CSS**

Markup, after the `#war-cry-overlay` div:

```html
<div id="tutorial-tip" class="hidden"><span id="tutorial-tip-text"></span></div>
```

CSS:

```css
#tutorial-tip{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(96px + env(safe-area-inset-bottom));z-index:350;background:rgba(10,10,20,.92);border:1px solid rgba(200,169,110,.55);border-radius:8px;padding:10px 16px;font-family:'Courier New',monospace;font-size:12px;color:#e8e0d0;letter-spacing:.5px;max-width:320px;text-align:center;transition:opacity .3s;}
#tutorial-tip.hidden{opacity:0;pointer-events:none;}
```

- [ ] **Step 2: Add the tutorial state machine**

Near `startIdleNudge`:

```javascript
const TUTORIAL_STEPS=[
  {key:'select', text:'Tap one of your soldiers'},
  {key:'move',   text:'Blue tiles = move. Tap one to advance'},
  {key:'attack', text:'Red tiles = enemy in range. Tap to attack'},
  {key:'endturn',text:'Done? Tap END TURN — the enemy moves next'},
  {key:'round2', text:'Hold the fort. Every soldier here was real.'},
];
let _tutorialIdx=-1;
function tutorialActive(){ return _tutorialIdx>=0 && _tutorialIdx<TUTORIAL_STEPS.length; }
function startTutorial(){
  if(localStorage.getItem('regiment_tutorial_done')||gameSettings.autoPlay) return;
  _tutorialIdx=0; showTutorialTip();
}
function showTutorialTip(){
  const el=document.getElementById('tutorial-tip');
  if(!tutorialActive()){ el.classList.add('hidden'); return; }
  document.getElementById('tutorial-tip-text').textContent=TUTORIAL_STEPS[_tutorialIdx].text;
  el.classList.remove('hidden');
}
function tutorialStep(key){
  if(!tutorialActive()) return;
  if(TUTORIAL_STEPS[_tutorialIdx].key!==key) return;
  _tutorialIdx++;
  if(!tutorialActive()){
    localStorage.setItem('regiment_tutorial_done','1');
    document.getElementById('tutorial-tip').classList.add('hidden');
    return;
  }
  showTutorialTip();
}
```

- [ ] **Step 3: Wire the hooks**

One line each, at the end of the existing functions:
- `selectUnit(unit)` → `tutorialStep('select');`
- `executeMove(...)` → inside the final else-branch where `unit.moved=true` is set, add `tutorialStep('move');`
- `executeAttack(atk,def)` → after `spawnWeaponEffect(atk,def);` add `tutorialStep('attack');`
- `doEndTurn()` → after `deselect();` add `tutorialStep('endturn');`
- `nextRound()` → after `gameState.phase='player_turn';` add `if(gameState.round===2) tutorialStep('round2');` — the final tip shows during round 2 and completes on the next `tutorialStep` call OR auto-hides: additionally in `nextRound()` when `gameState.round===3` add `if(tutorialActive()){_tutorialIdx=TUTORIAL_STEPS.length;localStorage.setItem('regiment_tutorial_done','1');document.getElementById('tutorial-tip').classList.add('hidden');}`

In `startBattle(name)`, after `updateMobileDock();` add:

```javascript
localStorage.setItem('regiment_seen','1');
startTutorial();
```

- [ ] **Step 4: Strip the HOW TO PLAY wall for tutorial users**

The mission brief renders `introText` including a HOW TO PLAY section (split by `plainIntroLines` — grep it). In the function that renders `#intro-howto` (follow `intro-howto` usages), skip rendering the how-to block when `!localStorage.getItem('regiment_tutorial_done')` — first-timers get the guided version instead; veterans keep the text.

- [ ] **Step 5: Verify**

Phone viewport, cleared storage, full first-run: mission brief shows no HOW TO PLAY wall; entering battle shows "Tap one of your soldiers"; each action advances the tip; tips gone from round 3; reload + replay → no tips (localStorage flag). Auto-play (WATCH STORY MODE) from cleared storage → no tips ever appear.

- [ ] **Step 6: Commit**

```bash
git add game/index.html
git commit -m "feat: guided first battle — contextual tutorial tips replace HOW TO PLAY wall"
```

---

### Task 5: Funnel regression run

**Files:**
- Modify: none expected; fix regressions if found.

**Interfaces:**
- Consumes: everything above.

- [ ] **Step 1: The 60-second test**

Fresh phone-viewport session, cleared storage, throttled Fast 3G. Start a timer at navigation. Path: boot loader → opening (tap to skip) → select (START HERE card) → mission brief → BEGIN BATTLE → first unit selected with tutorial tip visible. Expected: under 60 seconds with unhurried tapping. Record the time.

- [ ] **Step 2: Returning-visitor test**

Reload (storage now has `regiment_seen`) → no START HERE card, no tutorial, opening skipped (sessionStorage) or skippable. Battle select is the normal full grid.

- [ ] **Step 3: Plan 1 exit-criterion re-run**

Re-run Plan 1 Task 6 Step 1 (full Saragarhi run). Expected: still zero blockers.

- [ ] **Step 4: Commit any regression fixes**

```bash
git add game/index.html
git commit -m "fix: funnel regression fixes from 60-second test"
```

(Skip the commit if nothing changed.)
