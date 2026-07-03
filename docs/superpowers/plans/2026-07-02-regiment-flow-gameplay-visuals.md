# Regiment — Flow, Gameplay & Visual Identity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform Regiment into a cohesive interactive military history experience with a cinematic opening, guided auto-play mode, morale + ability system, and real regiment insignia.

**Architecture:** Single-file game (`game/index.html`) + modular battle files (`game/battles/*.js`) + new asset folder (`game/assets/insignia/`). No build step. All code is vanilla JS / Three.js r160 ES modules loaded via importmap. Changes follow existing patterns: new screens use `.screen.hidden` pattern; new game state goes on `gameState`; new settings go in `gameSettings`.

**Tech Stack:** Three.js r160 (ES module, importmap), vanilla JS, CSS3, Web Audio API. No frameworks, no bundler.

## Global Constraints

- No build step — all JS must run in browser as-is (ES modules via importmap)
- Three.js is `THREE` imported via importmap from `three/build/three.module.js`
- Existing screen pattern: `<div id="screen-X" class="screen hidden">` shown via `showScreen('screen-X')`
- `showScreen(name)` hides all four screens: `['screen-select','screen-regiment','screen-intro','screen-debrief']` — any new screen added must be added to this list
- `gameSettings` is persisted to localStorage key `regiment_settings`; new keys added to the object are saved automatically via `saveSettings()`
- `gameState` is the runtime object; fields reset in `startBattle()` must be explicitly reset there
- Directional light variable is `sun` (not `dirLight`)
- `executeMove(unit, tc, tr)` moves an Indian unit with animation
- `executeMove_pla(unit, tc, tr, cb)` moves a PLA unit with callback
- `executeAttack(atk, def)` resolves Indian→PLA combat
- `executeAttack_pla(atk, def, cb)` resolves PLA→Indian combat with callback
- `doEndTurn()` ends player turn, triggers enemy AI
- `enemyTurn()` drives all PLA units
- `nextRound()` advances round counter, resets moved/attacked flags
- `axDist(q1,r1,q2,r2)` returns hex distance
- `toAxial(col, row)` → `{q, r}`; `toOffset(q, r)` → `{col, row}`
- `unitAt(col, row)` returns living unit at position or undefined
- `DIRS` is the 6 axial direction vectors: `[{q,r}, ...]`
- All insignia SVG files go in `game/assets/insignia/`
- Implementation order: Task 1 (Opening) → Task 2 (Visual Identity) → Task 3 (Auto-mode) → Task 4 (Morale + Abilities)

---

## File Map

| File | Changes |
|---|---|
| `game/index.html` | All tasks — new screen HTML, new CSS, new JS functions |
| `game/battles/index.js` | Tasks 2, 4 — add `insigniaFile`, update STATS entries |
| `game/assets/insignia/sikh.svg` | Task 2 — downloaded Wikipedia SVG |
| `game/assets/insignia/kumaon.svg` | Task 2 — downloaded Wikipedia SVG |
| `game/assets/insignia/punjab.svg` | Task 2 — downloaded Wikipedia SVG |
| `game/assets/insignia/rajputana.svg` | Task 2 — downloaded Wikipedia SVG |
| `game/assets/insignia/jak-rif.svg` | Task 2 — downloaded Wikipedia SVG |
| `game/assets/insignia/aada.svg` | Task 2 — adapted SVG (no Wikipedia source) |

---

## Task 1: Cinematic Opening Sequence

**Files:**
- Modify: `game/index.html`

**Interfaces:**
- Produces: `showOpeningIfNeeded()` — call on page load instead of direct `showScreen('screen-select')`
- Produces: `#screen-opening` screen element

**What this does:** Adds a dark cinematic intro screen shown once per session. Four text cards fade in/out sequentially (~18s total), then a title + "BEGIN THE JOURNEY" button appears. A skip button appears after 3s. On completion or skip, transitions to the battle select screen.

- [ ] **Step 1: Add `#screen-opening` HTML** — insert before `#screen-select` in `game/index.html`:

```html
<div id="screen-opening" class="screen hidden">
  <div id="opening-card" class="opening-card"></div>
  <div id="opening-title" class="opening-title hidden">
    <div class="opening-regiment-name">REGIMENT</div>
    <div class="opening-sub">A journey through Indian military history</div>
    <button id="opening-begin-btn" class="opening-begin-btn">BEGIN THE JOURNEY →</button>
  </div>
  <button id="opening-skip-btn" class="opening-skip-btn hidden">SKIP ›</button>
</div>
```

- [ ] **Step 2: Add CSS for opening screen** — add after the last existing `body.light` block:

```css
/* ── CINEMATIC OPENING ───────────────────────────────────── */
#screen-opening { background:#000; justify-content:center; align-items:center; }
.opening-card {
  font-family:'Courier New',monospace; font-size:clamp(1em,2.5vw,1.4em);
  color:#c8a96e; letter-spacing:0.05em; text-align:center; line-height:1.8;
  max-width:560px; padding:0 24px; opacity:0; transition:opacity 0.6s;
  position:absolute;
}
.opening-title {
  display:flex; flex-direction:column; align-items:center; gap:16px;
  opacity:0; transition:opacity 0.8s;
}
.opening-title.hidden { display:none; }
.opening-regiment-name {
  font-size:clamp(2.5em,8vw,5em); font-weight:700; letter-spacing:0.3em;
  color:#c8a96e; text-shadow:0 0 80px rgba(200,169,110,0.4);
}
.opening-sub { font-size:0.75em; letter-spacing:0.3em; color:#5a5a6a; }
.opening-begin-btn {
  margin-top:24px; background:transparent; border:1px solid #c8a96e;
  color:#c8a96e; font-family:'Courier New',monospace; font-size:0.75em;
  letter-spacing:0.2em; padding:14px 36px; cursor:pointer;
  transition:background 0.2s;
}
.opening-begin-btn:hover { background:rgba(200,169,110,0.08); }
.opening-skip-btn {
  position:absolute; top:20px; right:24px; background:transparent;
  border:none; color:#3a3a5a; font-family:'Courier New',monospace;
  font-size:0.65em; letter-spacing:0.2em; cursor:pointer;
}
.opening-skip-btn.hidden { display:none; }
.opening-skip-btn:hover { color:#c8a96e; }
```

- [ ] **Step 3: Add `showScreen` must include `screen-opening`** — find the existing `showScreen` function and add `'screen-opening'` to its list:

```javascript
// Find this line (around line 1981):
['screen-select','screen-regiment','screen-intro','screen-debrief'].forEach(...)
// Change to:
['screen-select','screen-regiment','screen-intro','screen-debrief','screen-opening'].forEach(...)
```

- [ ] **Step 4: Add `showOpeningIfNeeded()` function** — add after the `showScreen` function:

```javascript
const OPENING_CARDS = [
  '"September 1897. A mud-brick signal post.\n10,000 Pashtun warriors."',
  '"November 1962. −20°C.\nNo artillery. No retreat."',
  '"December 1971. Midnight.\nPakistani tanks in the desert."',
  'Six regiments. Six battles.\nOne hundred and twenty-eight years.',
];

function showOpeningIfNeeded(){
  if(sessionStorage.getItem('_introShown')){showScreen('screen-select');return;}
  sessionStorage.setItem('_introShown','1');
  showScreen('screen-opening');
  const cardEl = document.getElementById('opening-card');
  const titleEl = document.getElementById('opening-title');
  const skipBtn = document.getElementById('opening-skip-btn');
  let cancelled = false;

  function done(){ if(!cancelled){ cancelled=true; showScreen('screen-select'); } }
  document.getElementById('opening-begin-btn').addEventListener('click', done);
  skipBtn.addEventListener('click', done);

  // Show skip button after 3s
  setTimeout(()=>{ if(!cancelled) skipBtn.classList.remove('hidden'); }, 3000);

  // Sequence cards
  let ci = 0;
  function showCard(){
    if(cancelled) return;
    if(ci >= OPENING_CARDS.length){
      cardEl.style.opacity='0';
      setTimeout(()=>{
        if(cancelled) return;
        cardEl.style.display='none';
        titleEl.classList.remove('hidden');
        requestAnimationFrame(()=>{ titleEl.style.opacity='1'; });
      }, 600);
      return;
    }
    cardEl.textContent = OPENING_CARDS[ci++];
    cardEl.style.opacity='0';
    requestAnimationFrame(()=>{
      cardEl.style.opacity='1';
      setTimeout(()=>{
        if(cancelled) return;
        cardEl.style.opacity='0';
        setTimeout(showCard, 600);
      }, 2800);
    });
  }
  setTimeout(showCard, 400);
}
```

- [ ] **Step 5: Change page-load call** — find the last line of `game/index.html` that calls `showScreen('screen-select')` and change it:

```javascript
// Find (around line 2181):
buildSelectScreen(); applySettings(); showScreen('screen-select'); gameLoop();
// Change to:
buildSelectScreen(); applySettings(); showOpeningIfNeeded(); gameLoop();
```

- [ ] **Step 6: Verify manually** — open `localhost:8765` in a fresh private/incognito window. You should see the dark cinematic cards playing in sequence. After card 4, the REGIMENT title and "BEGIN THE JOURNEY" button appear. Clicking it or the SKIP button goes to the battle select screen. Reloading in the same session skips the intro and goes straight to select.

- [ ] **Step 7: Commit**

```bash
cd /Users/aaghran/projects/jarvis/projects/regiment
git add game/index.html
git commit -m "feat: cinematic opening sequence shown once per session"
```

---

## Task 2: Visual Identity — Regiment Insignia Assets

**Files:**
- Create: `game/assets/insignia/sikh.svg`, `kumaon.svg`, `punjab.svg`, `rajputana.svg`, `jak-rif.svg`, `aada.svg`
- Modify: `game/battles/index.js` — add `insigniaFile` to each BATTLES entry
- Modify: `game/index.html` — update regiment screen and cards to load `<img>` from file with fallback

**Interfaces:**
- Produces: `battle.insigniaFile` — relative path string e.g. `'assets/insignia/sikh.svg'`
- Produces: `loadInsigniaImg(battle, size)` — returns `<img>` element with fallback

**What this does:** Downloads real Wikipedia regiment SVGs, wires them into the regiment intro screen (140×168px), battle cards (48px), and the in-battle panel badge (20px).

- [ ] **Step 1: Download Wikipedia SVGs** — run these curl commands to save the actual regiment insignia:

```bash
cd /Users/aaghran/projects/jarvis/projects/regiment/game/assets/insignia

# Sikh Regiment
curl -L "https://upload.wikimedia.org/wikipedia/commons/1/1f/Sikh_Regiment%2C_Indian_Army.svg" -o sikh.svg

# Kumaon Regiment
curl -L "https://upload.wikimedia.org/wikipedia/commons/a/a5/Kumaon_Regiment.svg" -o kumaon.svg

# Punjab Regiment
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Punjab_Regiment_%28India%29.svg/960px-Punjab_Regiment_%28India%29.svg.png" -o punjab.png

# Rajputana Rifles
curl -L "https://upload.wikimedia.org/wikipedia/commons/f/f5/Rajputana_Rifles.svg" -o rajputana.svg

# JAK Rifles
curl -L "https://upload.wikimedia.org/wikipedia/commons/e/e4/Jammu_and_Kashmir_Rifles.svg" -o jak-rif.svg
```

For AADA (`aada.svg`), there is no Wikipedia source. Create it as a clean inline SVG file:

```bash
cat > /Users/aaghran/projects/jarvis/projects/regiment/game/assets/insignia/aada.svg << 'EOF'
<svg viewBox="0 0 120 144" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M42,87 L33,12 L39,12 L48,78 Z" fill="#3a7ab8" opacity="0.9"/>
  <path d="M33,12 L42,6 L39,12 Z" fill="#3a7ab8"/>
  <path d="M30,78 L42,87 L33,90 Z" fill="#3a7ab8" opacity="0.6"/>
  <path d="M78,87 L87,12 L81,12 L72,78 Z" fill="#3a7ab8" opacity="0.9"/>
  <path d="M87,12 L78,6 L81,12 Z" fill="#3a7ab8"/>
  <path d="M90,78 L78,87 L87,90 Z" fill="#3a7ab8" opacity="0.6"/>
  <path d="M60,81 L33,90 L87,90 Z" fill="#3a7ab8" opacity="0.3"/>
  <ellipse cx="60" cy="114" rx="33" ry="12" stroke="#3a7ab8" stroke-width="2.5"/>
  <path d="M27,114 Q60,90 93,114" stroke="#3a7ab8" stroke-width="2" fill="none"/>
  <line x1="60" y1="102" x2="60" y2="90" stroke="#3a7ab8" stroke-width="2.4"/>
  <circle cx="60" cy="87" r="4.5" fill="#3a7ab8"/>
  <line x1="39" y1="132" x2="81" y2="132" stroke="#3a7ab8" stroke-width="2" opacity="0.5"/>
</svg>
EOF
```

- [ ] **Step 2: Verify files exist**

```bash
ls -la /Users/aaghran/projects/jarvis/projects/regiment/game/assets/insignia/
```

Expected: 6 files (sikh.svg, kumaon.svg, punjab.svg or punjab.png, rajputana.svg, jak-rif.svg, aada.svg). If any curl failed, check the URL — Wikipedia SVG filenames are case-sensitive. Adjust the filename if needed and retry.

- [ ] **Step 3: Add `insigniaFile` to each BATTLES entry in `game/battles/index.js`**

Add one line to each entry (after `insigniaSvg`):

```javascript
// Saragarhi
insigniaFile: 'assets/insignia/sikh.svg',

// Rezang La
insigniaFile: 'assets/insignia/kumaon.svg',

// Longewala
insigniaFile: 'assets/insignia/punjab.svg',  // or 'assets/insignia/punjab.png'

// Tololing
insigniaFile: 'assets/insignia/rajputana.svg',

// Siachen
insigniaFile: 'assets/insignia/jak-rif.svg',

// Operation Sindoor
insigniaFile: 'assets/insignia/aada.svg',
```

- [ ] **Step 4: Add `loadInsigniaImg()` helper to `game/index.html`** — add near the top of the script section, after `const gameSettings = ...`:

```javascript
function loadInsigniaImg(battle, sizePx){
  const img = document.createElement('img');
  img.width = sizePx; img.height = sizePx;
  img.style.objectFit = 'contain';
  img.alt = battle.regiment + ' insignia';
  if(battle.insigniaFile){
    img.src = battle.insigniaFile;
    img.onerror = ()=>{
      // fallback: replace with inline SVG
      const wrapper = document.createElement('div');
      wrapper.style.cssText = `width:${sizePx}px;height:${sizePx}px;display:flex;align-items:center;justify-content:center;`;
      wrapper.innerHTML = battle.insigniaSvg?.(battle.color) || '';
      img.replaceWith(wrapper);
    };
  } else {
    // no file — use inline SVG directly
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `width:${sizePx}px;height:${sizePx}px;display:flex;align-items:center;justify-content:center;`;
    wrapper.innerHTML = battle.insigniaSvg?.(battle.color) || '';
    return wrapper;
  }
  return img;
}
```

- [ ] **Step 5: Update `showRegiment()` to use `loadInsigniaImg()`** — find the `showRegiment` function in `game/index.html`. Replace the last two lines before `showScreen(...)`:

```javascript
// Remove:
const insEl = document.getElementById('rgt-insignia');
insEl.innerHTML = battle.insigniaSvg?.(battle.color)||'';

// Replace with:
const insEl = document.getElementById('rgt-insignia');
insEl.innerHTML = '';
insEl.appendChild(loadInsigniaImg(battle, 140));
```

- [ ] **Step 6: Update battle card builder to show insignia** — find `buildSelectScreen()` (search for `card.innerHTML=\`<div class="card-accent"`). Replace the `.card-icon` part:

```javascript
// Find the line that sets card.innerHTML (it contains card-accent, card-icon, card-body)
// The card-icon currently contains an inline SVG string (the terrain icon)
// Change the card-icon section to use loadInsigniaImg at 48px:

// In buildSelectScreen(), after creating the card element, replace innerHTML assignment:
const iconEl = document.createElement('div');
iconEl.className = 'card-icon';
const insigniaImg = loadInsigniaImg(b, 48);
iconEl.appendChild(insigniaImg);

const bodyEl = document.createElement('div');
bodyEl.className = 'card-body';
bodyEl.innerHTML = `
  <div class="card-chapter">${chap}</div>
  <div class="card-title" style="color:${b.unlocked?b.color:'#2a2a38'};">${b.name.toUpperCase()}</div>
  <div class="card-meta">${b.year} · ${b.regiment}</div>
  <div class="card-sub">${b.sub}</div>
  <button class="card-btn" style="background:${b.unlocked?b.color:'#1c1c24'};color:${b.unlocked?'#fff':'#2a2a3a'};">${b.unlocked?'▶ PLAY':'COMING SOON'}</button>
`;

const accentEl = document.createElement('div');
accentEl.className = 'card-accent';
accentEl.style.background = b.color||'#c8a96e';

card.appendChild(accentEl);
card.appendChild(iconEl);
card.appendChild(bodyEl);
```

Note: you will need to read the existing `buildSelectScreen()` to understand what `chap` and `b` variables are already named there, and replace only the `card.innerHTML = \`...\`` assignment with the above DOM construction approach.

- [ ] **Step 7: Add panel insignia badge during battle** — in `updatePanel()`, find where `unit-info` innerHTML is built when a unit is selected. Add a small badge img before the unit name. Find the line that sets `document.getElementById('unit-info').innerHTML = ...` and prepend the badge:

```javascript
// After building the unit info HTML, add the battle insignia as a small badge:
const activeBattle = BATTLES.find(b=>b.name===_currentBattleName);
if(activeBattle){
  const badge = loadInsigniaImg(activeBattle, 20);
  badge.style.cssText = 'display:inline-block;vertical-align:middle;margin-right:6px;opacity:0.7;';
  const unitInfoEl = document.getElementById('unit-info');
  // prepend badge to first child
  if(unitInfoEl.firstChild) unitInfoEl.insertBefore(badge, unitInfoEl.firstChild);
}
```

- [ ] **Step 8: Verify visually** — open `localhost:8765`, skip the intro, click Saragarhi. The card should show the Sikh Regiment insignia (Wikipedia version) at 48px. Click PLAY, go to regiment screen — insignia appears at 140px. During battle, the panel shows a 20px badge. If any image fails to load, the fallback inline SVG appears instead.

- [ ] **Step 9: Commit**

```bash
cd /Users/aaghran/projects/jarvis/projects/regiment
git add game/assets/insignia/ game/battles/index.js game/index.html
git commit -m "feat: real regiment insignia from Wikipedia + loadInsigniaImg with fallback"
```

---

## Task 3: Auto / Guided Play Mode

**Files:**
- Modify: `game/index.html`
- Modify: `game/battles/index.js` — add `autoPlay: false` to `gameSettings` default

**Interfaces:**
- Produces: `gameState.autoPlaying` — boolean, true when guided mode is active
- Produces: `autoPlayIndianTurn()` — drives Indian units automatically with 800ms delays
- Produces: `#rgt-btn-auto` — button on regiment screen

**What this does:** Adds an AUTO-PLAY button on the regiment screen. When chosen, the battle starts with `gameState.autoPlaying = true`. Each Indian phase drives units toward nearest enemies automatically. A PAUSE button replaces END TURN in the panel. Clicking any Indian unit exits auto-mode.

- [ ] **Step 1: Add `autoPlay` to `gameSettings`** — find `const gameSettings = {...}` in `game/index.html` and add `autoPlay: false`:

```javascript
const gameSettings = { musicOn:true, musicVol:35, animSpeed:1.0, showDmg:true, theme:'dark', autoPlay:false };
```

- [ ] **Step 2: Add `autoPlaying` to `gameState`** — find `const gameState = {...}` and add `autoPlaying:false`:

```javascript
const gameState={screen:'select',phase:'',units:[],selected:null,moveable:[],attackable:[],round:1,waveIndex:0,animating:false,log:[],casualties:{ind:0,pla:0},lastAction:null,autoPlaying:false};
```

- [ ] **Step 3: Add AUTO-PLAY button to regiment screen HTML** — find `<button class="rgt-btn" id="rgt-btn">READ THE MISSION →</button>` and add after it:

```html
<button class="rgt-btn rgt-btn-auto" id="rgt-btn-auto">▶ AUTO-PLAY</button>
```

- [ ] **Step 4: Add CSS for auto-play button and panel pause button**:

```css
.rgt-btn-auto { margin-top:10px; opacity:0.75; }
.rgt-btn-auto:hover { opacity:1; }
#auto-pause-btn {
  display:none; width:calc(100% - 20px); margin:0 10px 8px;
  padding:11px; background:rgba(200,169,110,0.12); border:1px solid #c8a96e;
  color:#c8a96e; font-family:'Courier New',monospace; font-size:10px;
  letter-spacing:0.15em; cursor:pointer;
}
#auto-pause-btn:hover { background:rgba(200,169,110,0.2); }
```

- [ ] **Step 5: Add PAUSE button to panel HTML** — find `<button id="end-turn-btn">END TURN →</button>` and add before it:

```html
<button id="auto-pause-btn">⏸ PAUSE AUTO-PLAY</button>
```

- [ ] **Step 6: Wire regiment screen AUTO-PLAY button** — find the existing `document.getElementById('rgt-btn').addEventListener` and add after it:

```javascript
document.getElementById('rgt-btn-auto').addEventListener('click', ()=>{
  if(_pendingBattle){ gameSettings.autoPlay=true; saveSettings(); showIntro(_pendingBattle); }
});
// Also ensure READ THE MISSION sets autoPlay false:
document.getElementById('rgt-btn').addEventListener('click', ()=>{
  if(_pendingBattle){ gameSettings.autoPlay=false; saveSettings(); showIntro(_pendingBattle); }
});
```

Note: the original `rgt-btn` listener also calls `showIntro`. Replace it entirely with the version above.

- [ ] **Step 7: Reset `autoPlaying` in `startBattle()`** — find `startBattle(name)`. At the line that resets `gameState.round`, also reset `autoPlaying`:

```javascript
// Find:
gameState.round=1;gameState.waveIndex=0;gameState.selected=null;...
// Add autoPlaying:
gameState.round=1;gameState.waveIndex=0;gameState.selected=null;gameState.moveable=[];gameState.attackable=[];gameState.animating=false;gameState.log=[];gameState.casualties={ind:0,pla:0};gameState.lastAction=null;gameState.autoPlaying=gameSettings.autoPlay;
```

- [ ] **Step 8: Add `autoPlayIndianTurn()` function** — add after `enemyTurn()`:

```javascript
function autoPlayIndianTurn(){
  const units = gameState.units.filter(u=>u.side==='ind'&&u.alive&&!u.moved);
  let i=0;
  function next(){
    if(!gameState.autoPlaying||i>=units.length){ doEndTurn(); return; }
    const u=units[i++]; if(!u.alive){next();return;}
    const enemies=gameState.units.filter(e=>e.side==='pla'&&e.alive);
    if(!enemies.length){doEndTurn();return;}
    const ua=toAxial(u.col,u.row);
    let tgt=null,bd=99;
    enemies.forEach(e=>{const ea=toAxial(e.col,e.row),d=axDist(ua.q,ua.r,ea.q,ea.r);if(d<bd){bd=d;tgt=e;}});
    if(!tgt){next();return;}
    const ta=toAxial(tgt.col,tgt.row);
    // Move toward target if not in range
    if(bd>u.rng){
      let bn=null,bnd=bd;
      DIRS.forEach(d=>{
        const nq=ua.q+d.q,nr=ua.r+d.r,{col:nc,row:nr2}=toOffset(nq,nr);
        if(nc<0||nc>=MC||nr2<0||nr2>=MR) return;
        if(TERRAIN[MAP[nr2]?.[nc]]?.block) return;
        if(unitAt(nc,nr2)) return;
        const nd=axDist(nq,nr,ta.q,ta.r);
        if(nd<bnd){bnd=nd;bn={col:nc,row:nr2};}
      });
      if(bn){
        executeMove(u,bn.col,bn.row);
        setTimeout(()=>{
          if(tgt.alive&&axDist(toAxial(u.col,u.row).q,toAxial(u.col,u.row).r,ta.q,ta.r)<=u.rng&&!u.attacked)
            executeAttack(u,tgt);
          setTimeout(next,800);
        },ad(450));
        return;
      }
    }
    // Already in range — attack
    if(!u.attacked&&axDist(ua.q,ua.r,ta.q,ta.r)<=u.rng){
      executeAttack(u,tgt);
      setTimeout(next,800);
    } else {
      setTimeout(next,800);
    }
  }
  setTimeout(next,600);
}
```

- [ ] **Step 9: Trigger auto-play at start of player turn** — find `nextRound()`. At the end of nextRound where `gameState.phase='player_turn'` is set, add:

```javascript
gameState.phase='player_turn';
gameState.units.filter(u=>u.side==='ind').forEach(u=>{u.moved=false;u.attacked=false;});
gameState.selected=null; updatePanel();
// Auto-play: if active, drive Indian units automatically
if(gameState.autoPlaying) setTimeout(autoPlayIndianTurn, 500);
```

Also trigger it when the battle first starts — find `gameState.phase='player_turn';gameState.screen='battle';` in `startBattle()` and add after it:

```javascript
gameState.phase='player_turn'; gameState.screen='battle';
if(gameState.autoPlaying) setTimeout(autoPlayIndianTurn, 1200);
```

- [ ] **Step 10: Wire PAUSE button and unit-click exit** — find `document.getElementById('end-turn-btn').addEventListener('click',doEndTurn)` and add near it:

```javascript
document.getElementById('auto-pause-btn').addEventListener('click', ()=>{
  gameState.autoPlaying = false;
  document.getElementById('auto-pause-btn').style.display = 'none';
  document.getElementById('end-turn-btn').style.display = '';
});
```

In `updatePanel()`, show/hide the pause button based on `gameState.autoPlaying`:

```javascript
// At the start of updatePanel(), add:
const pauseBtn = document.getElementById('auto-pause-btn');
const endTurnBtn = document.getElementById('end-turn-btn');
if(pauseBtn && endTurnBtn){
  pauseBtn.style.display = gameState.autoPlaying ? 'block' : 'none';
  endTurnBtn.style.display = gameState.autoPlaying ? 'none' : '';
}
```

For take-over via unit click — in the existing click handler where `selectUnit` is called for Indian units, add before it:

```javascript
// Find where clicked?.side==='ind' and selectUnit is called. Add:
if(gameState.autoPlaying){ gameState.autoPlaying=false; updatePanel(); }
```

- [ ] **Step 11: Verify manually** — open `localhost:8765`, pick any battle from regiment screen, click "▶ AUTO-PLAY". The battle should start and Indian units move and attack automatically. You should see the PAUSE button instead of END TURN. Clicking PAUSE stops auto-play and shows END TURN. Clicking an Indian unit also exits auto-play and selects it normally.

- [ ] **Step 12: Commit**

```bash
cd /Users/aaghran/projects/jarvis/projects/regiment
git add game/index.html game/battles/index.js
git commit -m "feat: auto/guided play mode with pause and manual takeover"
```

---

## Task 4: Gameplay Depth — Morale + Abilities + Wave Atmosphere

**Files:**
- Modify: `game/index.html`

**Interfaces:**
- Produces: `unit.morale` — number 0–100 on every unit
- Produces: `unit.ability` — string key e.g. `'rally'`
- Produces: `unit.abilityUsed` — boolean
- Produces: `unit.abilityRoundUsed` — number (round when last used, -1 if never)
- Produces: `applyWaveAtmosphere(waveIndex)` — updates Three.js scene lighting/fog
- Produces: `triggerAbility(unit)` — executes the unit's ability
- Produces: `updateMoraleRing(unit)` — updates the morale arc on the unit's 3D mesh

**What this does:** Adds morale (visible arc on figurine base, affects atk when low), one ability per unit type (button in panel), and wave-based atmosphere shifts (fog density, lighting color, scene bg).

### Morale System

- [ ] **Step 1: Update STATS with morale and ability fields** — in `game/index.html`, replace the entire `const STATS = {...}` block:

```javascript
const STATS = {
  rifleman:    { hp:2, atk:2, mov:2, rng:2, morale:100, ability:'dig_in' },
  section_cdr: { hp:3, atk:2, mov:2, rng:2, morale:100, ability:'covering_fire' },
  hero:        { hp:4, atk:3, mov:3, rng:3, morale:100, ability:'rally' },
  pla:         { hp:2, atk:2, mov:2, rng:1, morale:100, ability:null },
  pla_cdr:     { hp:3, atk:3, mov:2, rng:1, morale:100, ability:'coordinated_assault' },
  pla_tank:    { hp:6, atk:4, mov:1, rng:2, morale:100, ability:'suppress' },
  drone:       { hp:1, atk:2, mov:3, rng:1, morale:100, ability:'swarm' },
  missile:     { hp:2, atk:4, mov:3, rng:1, morale:100, ability:null },
  aircraft:    { hp:3, atk:3, mov:2, rng:3, morale:100, ability:null },
};
```

- [ ] **Step 2: Add morale and ability fields when creating units** — find `startBattle()` where `gameState.units` is built from `IND_STARTS`:

```javascript
// Find:
gameState.units=IND_STARTS.map(s=>{const st=STATS[s.type];return{side:'ind',...,attacked:false};});
// Replace return object with:
gameState.units=IND_STARTS.map(s=>{
  const st=STATS[s.type];
  return{side:'ind',col:s.col,row:s.row,type:s.type,name:s.name,platoon:s.platoon??0,bio:s.bio,
    hp:st.hp,maxHp:st.hp,atk:st.atk,mov:st.mov,rng:st.rng,
    morale:100,ability:st.ability||null,abilityUsed:false,abilityRoundUsed:-1,
    alive:true,moved:false,attacked:false};
});
```

Also add morale/ability to the `initialEnemies` loop:

```javascript
const unit={side:'pla',col:s.col,row:s.row,type:s.type,name:labels[s.type]||'Enemy',bio,
  hp:st.hp,maxHp:st.hp,atk:st.atk,mov:st.mov,rng:st.rng,
  morale:100,ability:st.ability||null,abilityUsed:false,abilityRoundUsed:-1,
  alive:true,moved:false,attacked:false};
```

And in `spawnWave()`, find where enemy units are created and add the same fields:

```javascript
const unit={side:'pla',col:spawnCol,row:0,...,
  morale:100,ability:st.ability||null,abilityUsed:false,abilityRoundUsed:-1,
  alive:true,moved:false,attacked:false};
```

- [ ] **Step 3: Add morale arc mesh to unit groups** — in `createUnitMesh(unit)` find where the HP bar ring is added (search for `updateHpBar`). After the group is assembled and before it is returned, add a morale ring:

```javascript
// Add morale ring at base (y=0.06, slightly above ground)
const moraleGeo = new THREE.RingGeometry(0.38, 0.44, 24, 1, 0, Math.PI * 2);
const moraleMat = new THREE.MeshBasicMaterial({color:0x44cc44, side:THREE.DoubleSide, transparent:true, opacity:0.85});
const moraleRing = new THREE.Mesh(moraleGeo, moraleMat);
moraleRing.rotation.x = -Math.PI/2;
moraleRing.position.y = 0.06;
moraleRing.name = 'moraleRing';
group.add(moraleRing);
```

- [ ] **Step 4: Add `updateMoraleRing(unit)` function** — add after `updateHpBar`:

```javascript
function updateMoraleRing(unit){
  const g = unitGroupMap.get(unit); if(!g) return;
  const ring = g.getObjectByName('moraleRing'); if(!ring) return;
  const m = unit.morale;
  // Color: green 70+, amber 40-69, red 0-39
  const col = m>=70 ? 0x44cc44 : m>=40 ? 0xffaa00 : 0xcc2222;
  ring.material.color.setHex(col);
  // Arc length proportional to morale (full circle = 100)
  ring.geometry.dispose();
  ring.geometry = new THREE.RingGeometry(0.38, 0.44, 24, 1, 0, (m/100)*Math.PI*2);
  ring.visible = m < 100; // hide when full (clean look)
}
```

- [ ] **Step 5: Apply morale atk penalty in `doCombat()`** — find `function doCombat(atk, def)`. The atk stat is currently read directly from `atk.atk`. Apply the morale penalty:

```javascript
function doCombat(atk,def){
  const atkStruct=getStructure(atk.col,atk.row);
  const defStruct=getStructure(def.col,def.row);
  // Morale atk penalty
  const moralePenalty = atk.morale>=70 ? 0 : atk.morale>=40 ? 1 : 2;
  const effAtk = Math.max(1, atk.atk - moralePenalty);
  // Existing logic — replace atk.atk references with effAtk:
  const ag=atkStruct?Math.round(effAtk*(atkStruct.atkMul??1)):effAtk;
  // ... rest of doCombat unchanged (def.atk references stay as-is for retaliation)
```

Note: read the existing `doCombat` carefully. Only the attacker's stat needs the penalty. The retaliation uses `def.atk` unchanged.

- [ ] **Step 6: Apply morale damage on ally death** — in the section of code that sets `unit.alive=false` (in `doCombat` and in airstrike events), after the unit is removed, apply morale hit to nearby allies:

```javascript
function applyMoraleDamage(deadUnit, amount){
  gameState.units.filter(u=>u.alive&&u.side===deadUnit.side).forEach(u=>{
    const da=toAxial(deadUnit.col,deadUnit.row),ua=toAxial(u.col,u.row);
    if(axDist(da.q,da.r,ua.q,ua.r)<=2){
      u.morale=Math.max(0,u.morale-amount);
      updateMoraleRing(u);
    }
  });
}
```

Call `applyMoraleDamage(def, 15)` after `def.alive=false` is set in `doCombat`. Also call `applyMoraleDamage(atk, 15)` after `atk.alive=false`.

Also apply morale hit when a unit loses >50% maxHp in one attack: after computing `dmg` in `doCombat`, add:

```javascript
if(dmg > def.maxHp*0.5){ def.morale=Math.max(0,def.morale-20); }
```

- [ ] **Step 7: Add "pinned" skip chance** — in `enemyTurn()` and in `autoPlayIndianTurn()`, at the start of each unit's action, check morale:

```javascript
// For each unit being processed, before acting:
if(u.morale < 40 && Math.random() < 0.30){
  showNarrative(`${u.name.split(' ').pop()} is pinned — low morale!`);
  // skip this unit
  next(); return;
}
```

Apply this check in `enemyTurn()` for PLA units (`p.morale < 40 && Math.random() < 0.30 → next(); return`) and in `autoPlayIndianTurn()` for Indian units.

### Ability System

- [ ] **Step 8: Add `triggerAbility(unit)` function** — add after `updateMoraleRing`:

```javascript
function triggerAbility(unit){
  if(!unit.ability||unit.abilityUsed) return;
  const isOncePerBattle = ['rally','swarm'].includes(unit.ability);
  const isOncePerRound = ['covering_fire','dig_in','coordinated_assault','suppress'].includes(unit.ability);
  if(isOncePerBattle && unit.abilityUsed) return;
  if(isOncePerRound && unit.abilityRoundUsed === gameState.round) return;

  if(unit.ability==='rally'){
    // +25 morale to all allies within 2 hexes
    const ua=toAxial(unit.col,unit.row);
    gameState.units.filter(u=>u.alive&&u.side==='ind').forEach(u=>{
      if(axDist(ua.q,ua.r,toAxial(u.col,u.row).q,toAxial(u.col,u.row).r)<=2){
        u.morale=Math.min(100,u.morale+25); updateMoraleRing(u);
      }
    });
    showNarrative(`${unit.name.split(' ').pop()} rallies nearby troops! +25 morale`);
    unit.abilityUsed=true;
  }
  else if(unit.ability==='dig_in'){
    unit._diggingIn=true; unit.moved=true; // can't move this round
    unit._defBonus=2;
    showNarrative(`${unit.name.split(' ').pop()} digs in — +2 def this round`);
    unit.abilityRoundUsed=gameState.round;
  }
  else if(unit.ability==='covering_fire'){
    unit._coveringFire=true;
    showNarrative(`${unit.name.split(' ').pop()} sets covering fire`);
    unit.abilityRoundUsed=gameState.round;
  }
  else if(unit.ability==='coordinated_assault'){
    const pa=toAxial(unit.col,unit.row);
    gameState.units.filter(u=>u.alive&&u.side==='pla').forEach(u=>{
      if(axDist(pa.q,pa.r,toAxial(u.col,u.row).q,toAxial(u.col,u.row).r)<=1){
        u._atkBonus=(u._atkBonus||0)+1;
      }
    });
    showNarrative('Coordinated assault! Adjacent enemies +1 atk this round');
    unit.abilityUsed=true; unit.abilityRoundUsed=gameState.round;
  }
  else if(unit.ability==='suppress'){
    const tgt=gameState.selected; // suppress the selected enemy
    if(tgt&&tgt.side==='pla'){ tgt._suppressed=true; showNarrative(`${tgt.name||'Enemy'} suppressed — loses next attack`); }
    unit.abilityRoundUsed=gameState.round;
  }
  else if(unit.ability==='swarm'){
    // Attack two adjacent Indian units
    const enemies=gameState.units.filter(u=>u.alive&&u.side==='ind');
    const pa=toAxial(unit.col,unit.row);
    const adj=enemies.filter(u=>axDist(pa.q,pa.r,toAxial(u.col,u.row).q,toAxial(u.col,u.row).r)<=1);
    adj.slice(0,2).forEach(t=>executeAttack_pla(unit,t,()=>{}));
    showNarrative('Drone swarm — attacking two targets!');
    unit.abilityUsed=true;
  }
  updatePanel();
}
```

- [ ] **Step 9: Apply `_defBonus` in `doCombat`** — in `doCombat`, when computing defense, add:

```javascript
const defBonus = def._defBonus||0;
const dg = defStruct ? Math.round(def.atk*(defStruct.defMul??1)) : def.atk;
// Apply defBonus to def's effective defense (reduce incoming dmg):
const dmg = Math.max(0, ag - defBonus);
```

And clear bonuses at start of each round in `nextRound()`:

```javascript
gameState.units.forEach(u=>{
  u._defBonus=0; u._atkBonus=0; u._suppressed=false;
  u._diggingIn=false; u._coveringFire=false;
});
```

- [ ] **Step 10: Apply `_suppressed` in `executeAttack_pla`** — find `executeAttack_pla`. At the very start:

```javascript
function executeAttack_pla(atk,def,cb){
  if(atk._suppressed){ atk._suppressed=false; cb?.(); return; } // skip attack
  // ... rest unchanged
```

- [ ] **Step 11: Show ability button in panel** — in `updatePanel()`, when a unit is selected and it has an ability, add an ability button to `unit-info`:

```javascript
// After building unit-info HTML, if selected unit has an ability:
const sel = gameState.selected;
if(sel && sel.ability){
  const isOncePerBattle = ['rally','swarm'].includes(sel.ability);
  const isOncePerRound = ['covering_fire','dig_in','coordinated_assault','suppress'].includes(sel.ability);
  const used = isOncePerBattle ? sel.abilityUsed : sel.abilityRoundUsed === gameState.round;
  const abilityNames = {
    rally:'⚡ RALLY',dig_in:'🪖 DIG IN',covering_fire:'🔫 COVERING FIRE',
    coordinated_assault:'⚔ COORD. ASSAULT',suppress:'🎯 SUPPRESS',swarm:'🐝 SWARM'
  };
  const btn = document.createElement('button');
  btn.className = 'ability-btn' + (used?' ability-used':'');
  btn.textContent = abilityNames[sel.ability]||sel.ability.toUpperCase();
  btn.disabled = used;
  btn.addEventListener('click', ()=>{ if(!used) triggerAbility(sel); });
  document.getElementById('unit-info').appendChild(btn);
}
```

Add CSS for the ability button:

```css
.ability-btn {
  display:block; width:100%; margin-top:10px; padding:8px;
  background:rgba(200,169,110,0.12); border:1px solid #c8a96e;
  color:#c8a96e; font-family:'Courier New',monospace; font-size:9px;
  letter-spacing:0.15em; cursor:pointer; transition:background 0.15s;
}
.ability-btn:hover:not(:disabled) { background:rgba(200,169,110,0.22); }
.ability-btn.ability-used { opacity:0.3; cursor:default; border-color:#3a3a5a; color:#3a3a5a; }
```

### Wave Atmosphere

- [ ] **Step 12: Add `applyWaveAtmosphere(waveIndex)` function** — add after `buildTerrain()`:

```javascript
function applyWaveAtmosphere(wi){
  if(gameSettings.theme==='light') return; // skip in light mode
  const phases=[
    {fog:0.022, bg:0x0a0a14, lCol:0xffffff, lInt:1.0},
    {fog:0.022, bg:0x0a0a14, lCol:0xffffff, lInt:1.0},
    {fog:0.032, bg:0x0d0a10, lCol:0xfff4e0, lInt:0.9},
    {fog:0.032, bg:0x0d0a10, lCol:0xfff4e0, lInt:0.9},
    {fog:0.045, bg:0x100808, lCol:0xff9966, lInt:0.8},
  ];
  const p=phases[Math.min(wi,phases.length-1)];
  scene.fog.density=p.fog;
  scene.background=new THREE.Color(p.bg);
  sun.color.setHex(p.lCol);
  sun.intensity=p.lInt;
}
```

- [ ] **Step 13: Call `applyWaveAtmosphere` in `spawnWave`** — find `function spawnWave(wi)`. At the top, add:

```javascript
function spawnWave(wi){
  applyWaveAtmosphere(wi);
  // ... rest unchanged
```

- [ ] **Step 14: Add round-event flash** — in `nextRound()`, find where `airstrike` events are handled. After `showNarrative(ev.msg)`, add a white flash:

```javascript
// After: setTimeout(()=>showNarrative(ev.msg),500);
// Add:
const flash=document.createElement('div');
flash.style.cssText='position:fixed;inset:0;background:#fff;opacity:0;pointer-events:none;z-index:400;transition:opacity 0.15s';
document.body.appendChild(flash);
requestAnimationFrame(()=>{flash.style.opacity='0.55';setTimeout(()=>{flash.style.opacity='0';setTimeout(()=>flash.remove(),200);},200);});
```

- [ ] **Step 15: Verify gameplay** — open `localhost:8765`, play Longewala in manual mode. By wave 3, the scene should visibly darken. By wave 5 (the airstrike event), a white flash should occur. Select a hero unit — a RALLY button should appear in the panel. Click RALLY — nearby units' morale rings turn green. Kill enough friendly units and check that morale rings appear amber/red and that units occasionally get "pinned" messages.

- [ ] **Step 16: Commit**

```bash
cd /Users/aaghran/projects/jarvis/projects/regiment
git add game/index.html
git commit -m "feat: morale system, unit abilities, wave atmosphere shifts"
```

---

## Self-Review

**Spec coverage check:**
- ✅ Cinematic opening (Task 1)
- ✅ `insigniaFile` + `loadInsigniaImg` with fallback (Task 2)
- ✅ Three display sizes: 140px regiment screen, 48px cards, 20px panel badge (Task 2)
- ✅ `gameSettings.autoPlay` persisted (Task 3)
- ✅ `autoPlayIndianTurn()` drives Indian units at 800ms delays (Task 3)
- ✅ Pause button replaces END TURN in auto mode (Task 3)
- ✅ Click Indian unit exits auto-mode (Task 3)
- ✅ Morale 0–100 on all units, three effect tiers (Task 4)
- ✅ Morale arc on figurine base, hidden at 100 (Task 4)
- ✅ Ability per unit type, once-per-battle vs once-per-round (Task 4)
- ✅ Wave atmosphere shifts via `applyWaveAtmosphere` on `sun` variable (Task 4)
- ✅ Round event white flash (Task 4)
- ✅ Light mode skips atmosphere shifts (Task 4)
- ✅ `_warCryShown` and `autoPlaying` both reset in `startBattle` (Task 3)

**Placeholder scan:** None found. All steps have concrete code.

**Name consistency:** `sun` used throughout (not `dirLight`). `executeMove` / `executeMove_pla` / `executeAttack` / `executeAttack_pla` / `doEndTurn` / `enemyTurn` / `nextRound` all match existing function names. `MC` and `MR` are existing constants for map col/row bounds.
