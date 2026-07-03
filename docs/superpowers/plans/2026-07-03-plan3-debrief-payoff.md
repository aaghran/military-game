# Plan 3 — The Payoff: Debrief, Share, Next Battle

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finishing a battle ends in a paced, full-screen emotional debrief with a one-tap share and a curated next-battle pull.

**Architecture:** Three changes to `game/index.html`: (1) the existing debrief sections become sequential "beats" revealed by tap on mobile (staggered auto-reveal on desktop), (2) a share button using the Web Share API with clipboard fallback, (3) a "NEXT BATTLE" recommendation from a fixed curated order for non-campaign wins. All content comes from existing `DEBRIEF_DATA` / battle data — no new copy beyond the share text template.

**Tech Stack:** Single-file Three.js r160 game (`game/index.html`), ES modules, no build step. `DEBRIEF_DATA` from `game/battles/debrief-data.js`. Verification via phone-viewport browser at 390×844 (server: `cd game && python3 -m http.server 8321`).

**Spec:** `docs/superpowers/specs/2026-07-03-pre-share-mobile-polish-design.md`

## Global Constraints

- No build step — pure browser JS, ES modules only.
- Game logic stays in `game/index.html`; battle data in `game/battles/*.js`.
- Historical content untouched; reverent tone preserved. Share copy template below is final.
- Touch targets ≥44px; baseline viewport 390×844; desktop spot-check at 1280px.
- Campaign-mode debrief behavior (`renderDebriefButtons` NEXT flow) must keep working unchanged.
- Run after Plans 1 and 2. Locate anchors by `grep`, never line numbers.

---

### Task 1: Paced debrief reveal

**Files:**
- Modify: `game/index.html` — `#screen-debrief` markup (grep `id="screen-debrief"`), `showDebrief(result)` (grep `function showDebrief`), CSS near `.debrief-shell`.

**Interfaces:**
- Consumes: existing debrief DOM ids: `debrief-title`, `debrief-fallen`, `debrief-infographic`, `debrief-hero-card`, `debrief-epitaph`, `debrief-history`, `debrief-legacy`, `back-btn`.
- Produces: `revealDebrief()` — called at the end of `showDebrief` — and beat container class `.db-beat`. Tasks 2 and 3 place their buttons inside the final beat.

- [ ] **Step 1: Group sections into beats**

Wrap the existing debrief children into four beat containers by adding `class="db-beat"` wrappers in the markup (keep all existing ids and inner structure intact):
- Beat 1: `.debrief-header` + `#debrief-epitaph` (move the epitaph div up in the markup, directly after the header — it's the emotional opener).
- Beat 2: the "YOUR BATTLE" panel (stats + `#debrief-fallen`).
- Beat 3: the "WHAT HAPPENED" panel (`#debrief-infographic`) + `#debrief-hero-card`.
- Beat 4: `#debrief-history` + `#debrief-legacy` + `#back-btn` (and later the share/next buttons).

- [ ] **Step 2: Add the beat CSS + tap-to-continue affordance**

```css
.db-beat{opacity:0;transform:translateY(14px);transition:opacity .6s ease,transform .6s ease;}
.db-beat.shown{opacity:1;transform:none;}
#db-continue{margin:18px auto 0;display:block;background:none;border:none;color:#c8a96e;font-family:'Courier New',monospace;font-size:11px;letter-spacing:2px;min-height:44px;cursor:pointer;animation:dbPulse 1.6s ease-in-out infinite;}
#db-continue.hidden{display:none;}
@keyframes dbPulse{0%,100%{opacity:.5}50%{opacity:1}}
@media (max-width:700px){ .debrief-shell{min-height:100dvh;padding-bottom:calc(24px + env(safe-area-inset-bottom));} }
```

Add `<button id="db-continue">TAP TO CONTINUE ▾</button>` as the last child of `.debrief-shell`.

- [ ] **Step 3: Implement `revealDebrief()`**

Add near `showDebrief`:

```javascript
function revealDebrief(){
  const beats=[...document.querySelectorAll('#screen-debrief .db-beat')];
  const cont=document.getElementById('db-continue');
  beats.forEach(b=>b.classList.remove('shown'));
  let i=0;
  function show(){
    if(i<beats.length){ beats[i++].classList.add('shown'); beats[i-1].scrollIntoView({behavior:'smooth',block:'nearest'}); }
    cont.classList.toggle('hidden', i>=beats.length);
  }
  cont.onclick=show;
  show();                                     // beat 1 immediately
  if(!isMobileView()){                         // desktop: auto-stagger the rest
    const t=setInterval(()=>{ show(); if(i>=beats.length) clearInterval(t); },900);
  }
}
```

At the very end of `showDebrief(result)` (after `renderDebriefButtons(result);`) add `revealDebrief();`.

- [ ] **Step 4: Verify**

Phone viewport: finish Saragarhi (use WATCH STORY MODE for speed). Debrief opens with only header + epitaph visible; TAP TO CONTINUE reveals stats → infographic/hero → history/buttons; button disappears after the last beat; everything scrolls, nothing overflows. Desktop 1280px: beats auto-reveal ~0.9s apart, no continue-tapping needed. Campaign flow (start Vijay Diwas campaign, win first battle): NEXT button still appears and works.

- [ ] **Step 5: Commit**

```bash
git add game/index.html
git commit -m "feat: paced debrief reveal — four beats, tap-to-continue on mobile"
```

---

### Task 2: One-tap share

**Files:**
- Modify: `game/index.html` — button in debrief beat 4 markup, share logic near `showDebrief`, toast CSS.

**Interfaces:**
- Consumes: `_currentBattleName`, `gameState.round`, `gameState.casualties`, `DEBRIEF_DATA[...].infographic` (for the odds line), `activeBattleData.winCondition`.
- Produces: `shareBattleResult()` wired to `#db-share-btn`.

- [ ] **Step 1: Add the button + toast markup/CSS**

In beat 4, directly above `#back-btn`:

```html
<button id="db-share-btn">⤴ SHARE YOUR BATTLE</button>
<div id="db-share-toast" class="hidden">Link copied — paste it anywhere</div>
```

```css
#db-share-btn{display:block;margin:14px auto 10px;min-height:48px;padding:0 28px;border-radius:999px;border:1px solid rgba(200,169,110,.6);background:rgba(200,169,110,.12);color:#c8a96e;font-family:'Courier New',monospace;font-size:12px;font-weight:bold;letter-spacing:2px;cursor:pointer;}
#db-share-toast{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(24px + env(safe-area-inset-bottom));background:rgba(10,10,20,.94);border:1px solid rgba(200,169,110,.5);border-radius:8px;padding:10px 18px;font-family:'Courier New',monospace;font-size:11px;color:#e8e0d0;z-index:600;transition:opacity .3s;}
#db-share-toast.hidden{opacity:0;pointer-events:none;}
```

- [ ] **Step 2: Implement the share text + handler**

```javascript
function battleShareText(){
  const b=BATTLES.find(x=>x.name===_currentBattleName)||{};
  const dd=DEBRIEF_DATA[_currentBattleName]||{};
  const odds=dd.infographic&&dd.infographic.type==='odds'?` ${dd.infographic.indian} vs ${dd.infographic.enemy}.`:'';
  const wc=activeBattleData?.winCondition||{};
  const line=wc.type==='rounds'
    ?`I held ${_currentBattleName} for ${gameState.round>wc.n?wc.n:gameState.round} rounds.${odds}`
    :`I fought ${_currentBattleName} — ${gameState.casualties.pla} enemy stopped.${odds}`;
  return {
    title:`Regiment — ${_currentBattleName} ${b.year||''}`.trim(),
    text:line+' Can you hold the line?',
    url:`https://regiment-delta.vercel.app/?battle=${encodeURIComponent(_currentBattleName)}`,
  };
}
function shareBattleResult(){
  const payload=battleShareText();
  if(navigator.share){ navigator.share(payload).catch(()=>{}); return; }
  navigator.clipboard.writeText(`${payload.text} ${payload.url}`).then(()=>{
    const t=document.getElementById('db-share-toast');
    t.classList.remove('hidden');
    setTimeout(()=>t.classList.add('hidden'),2200);
  }).catch(()=>{});
}
document.getElementById('db-share-btn').addEventListener('click',shareBattleResult);
```

Place the listener wiring with the other `document.getElementById(...).addEventListener` calls near `#begin-btn`/`#back-btn` (grep `begin-btn'`).

- [ ] **Step 3: Verify**

Phone viewport (where `navigator.share` may not exist in the automation browser — that's fine, it exercises the fallback): finish Saragarhi, tap SHARE → toast "Link copied", clipboard contains e.g. `I held Saragarhi for 12 rounds. 21 vs 10,000. Can you hold the line? https://regiment-delta.vercel.app/?battle=Saragarhi`. Open that URL in a new tab → Saragarhi mission brief auto-opens (existing `?battle=` wiring). Verify a waves-type battle too (Tololing) → text uses the "enemy stopped" form.

- [ ] **Step 4: Commit**

```bash
git add game/index.html
git commit -m "feat: one-tap battle result share — Web Share API with clipboard fallback"
```

---

### Task 3: Curated next-battle pull

**Files:**
- Modify: `game/index.html` — `renderDebriefButtons(result)` (grep `function renderDebriefButtons`).

**Interfaces:**
- Consumes: `campaignState.active` (must remain the guard — campaign keeps its own NEXT button), `showMissionBrief(battle)`, `BATTLES`.
- Produces: `RECOMMENDED_ORDER` constant; a `#next-battle-btn` in the debrief for non-campaign wins.

- [ ] **Step 1: Add the order + button logic**

Above `renderDebriefButtons`:

```javascript
const RECOMMENDED_ORDER=['Saragarhi','Longewala','Rezang La','Tololing','Point 5140','Tiger Hill','Kohima','Haifa','Asal Uttar','Dograi','Khalubar','Siachen','Operation Sindoor'];
```

Inside `renderDebriefButtons(result)`, after the existing campaign branch (keep it first and unchanged), add:

```javascript
const existingNext=document.getElementById('next-battle-btn');
if(existingNext) existingNext.remove();
if(result==='win'&&!campaignState.active){
  const idx=RECOMMENDED_ORDER.indexOf(_currentBattleName);
  const nextName=RECOMMENDED_ORDER[(idx+1)%RECOMMENDED_ORDER.length];
  const next=BATTLES.find(b=>b.name===nextName);
  if(next){
    const btn=document.createElement('button');
    btn.id='next-battle-btn';
    btn.className='btn-primary campaign-next-debrief-btn';
    btn.textContent=`NEXT BATTLE: ${nextName.toUpperCase()} →`;
    btn.addEventListener('click',()=>{
      unitGroups.forEach(g=>scene.remove(g));unitGroups.length=0;unitGroupMap.clear();clearHighlights();
      gameState.units=[];gameState.screen='select';
      showMissionBrief(next);
    });
    backBtn.parentNode.insertBefore(btn,backBtn);
  }
}
```

- [ ] **Step 2: Verify**

Phone viewport: win Saragarhi (story mode) → debrief beat 4 shows `NEXT BATTLE: LONGEWALA →` above RETURN; tapping it goes straight to the Longewala mission brief and the battle is playable. Lose a battle (let autoplay lose Rezang La or quit early) → no next button. Campaign mode: win the first campaign battle → only the campaign NEXT button appears (not both).

- [ ] **Step 3: Commit**

```bash
git add game/index.html
git commit -m "feat: curated next-battle recommendation on non-campaign debrief"
```

---

### Task 4: Full regression + desktop spot-check

**Files:**
- Modify: none expected; fix regressions if found.

**Interfaces:**
- Consumes: everything above + Plans 1–2 behavior.

- [ ] **Step 1: The friend-journey run**

Fresh phone-viewport session, cleared storage: boot loader → tap-skip opening → START HERE → mission brief → battle with tutorial tips → win → paced debrief → SHARE (clipboard toast) → NEXT BATTLE: LONGEWALA → begin Longewala. Zero blockers expected. Screenshot the debrief beats and share toast.

- [ ] **Step 2: Campaign + desktop checks**

- Campaign: full first-battle flow → bridge/NEXT behavior unchanged.
- Desktop 1280px: debrief auto-reveals, share falls back to clipboard, next-battle button present. No layout breakage.

- [ ] **Step 3: Plan 1 exit-criterion re-run**

Re-run Plan 1 Task 6 Step 1. Expected: still zero blockers.

- [ ] **Step 4: Commit any regression fixes**

```bash
git add game/index.html
git commit -m "fix: payoff regression fixes from friend-journey run"
```

(Skip the commit if nothing changed.)
