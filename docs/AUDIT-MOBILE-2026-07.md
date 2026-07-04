# Mobile Playability Audit — July 2026

**Viewport:** 390×844 portrait (iPhone 14 baseline)  
**Flow tested:** Saragarhi end-to-end + Plan 2 funnel + Plan 3 debrief payoff  
**Exit criterion:** Met — zero tap/read/stuck blockers on phone viewport

## Defects found and fixed

| Screen | Defect | Fix | Evidence |
|--------|--------|-----|----------|
| Global | Missing `viewport-fit=cover` for notch devices | Updated viewport meta tag | `index.html` head |
| Opening | SKIP button tap target undersized | `min-height: 44px` + safe-area padding on mobile | mobile `@media` block |
| Opening | BEGIN button could clip on small screens | `min-height: 48px` on mobile | mobile `@media` block |
| Opening | Card text could overflow 390px | `max-width: calc(100vw - 32px)` on `.opening-card` | mobile `@media` block |
| Battle select | Select header under notch | `padding-top: env(safe-area-inset-top)` on `.select-header` | mobile `@media` block |
| Battle select | Campaign banner tap target | `min-height: 44px` on `#campaign-banner` | mobile `@media` block |
| In-battle | End-turn dock button 38px (below 44px guideline) | Raised to `min-height: 44px` | mobile dock grid CSS |
| In-battle | histCard dismiss control small | `min-height: 44px` on `.hc-close` | mobile `@media` block |
| Mission brief | WATCH STORY vs BEGIN fat-finger risk | `min-height: 44px`, `margin-top: 14px` gap | mobile `@media` block |
| Debrief | RETURN button undersized | `min-height: 48px`, full-width on mobile | mobile `@media` block |
| Debrief | Fallen names small at phone size | `font-size: 11px` on `.debrief-fallen-name` | mobile `@media` block |
| Performance | Glow ring updates every frame | Every 3rd frame on mobile | `gameLoop()` |

## Plan 2 additions (funnel)

| Feature | Implementation |
|---------|----------------|
| Boot loader | Static `#boot-loader` with Kohima epitaph; `dismissBootLoader()` on boot |
| START HERE card | `#first-visit-card` when `!regiment_seen`; jumps to Saragarhi mission brief |
| Mobile opening skip | SKIP at 600ms; tap-anywhere skip on mobile |
| Guided tutorial | `#tutorial-tip` state machine; hooks on select/move/attack/endturn; skips HOW TO PLAY wall |

## Plan 3 additions (payoff)

| Feature | Implementation |
|---------|----------------|
| Paced debrief | Four `.db-beat` containers; tap-to-continue on mobile; auto-stagger on desktop |
| Share | `#db-share-btn` — Web Share API + clipboard toast fallback |
| Next battle | `RECOMMENDED_ORDER` curated sequence for non-campaign wins |

## Performance notes

- Load to interactive battle-select on localhost: **< 3s** (unthrottled)
- `setPixelRatio` cap at 2: already present
- Glow ring throttle on mobile: implemented

## Regression checks

- [x] Plan 1 exit run: opening → Saragarhi → battle → debrief → RETURN
- [x] Plan 2: 60-second first-visit path (boot → skip → START HERE → battle + tutorial)
- [x] Plan 3: friend journey (win → paced debrief → share toast → NEXT BATTLE Longewala)
- [x] Desktop 1280px spot-check: no layout breakage from mobile CSS additions
- [x] Campaign debrief: `campaign-next-btn` unchanged; no duplicate next button

## Non-blocker observations (backlog)

- Sandbag visual quality still under review (see SESSION-HANDOFF)
- Tank unit type for Asal Uttar not in scope
