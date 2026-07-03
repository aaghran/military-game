# Pre-Share Mobile Polish — Design Spec

> Approved 3 July 2026. Goal: get Regiment ready to share with friends.
> Frame: friends open the game link **on their phones**, play one battle, and it lands emotionally.
> Scope: **polish only — no new game mechanics.**

## Success criteria

- A first-time visitor on a phone (390×844 portrait baseline) can go from opening
  `regiment-delta.vercel.app` to actively fighting a battle in under 60 seconds.
- They can complete Saragarhi start-to-finish with zero "can't tap it / stuck / can't read it" moments.
- Finishing a battle ends in a full-screen emotional debrief with a one-tap share.

## Constraints (from docs/REGIMENT-CONTEXT.md design principles)

1. No build step — pure browser JS, ES modules only.
2. Game logic stays in `game/index.html`; battle data in `game/battles/*.js`.
3. Historical content (names, regiments, medals, attributions) is untouched.
4. Reverent tone preserved — polish must never make it feel like a casual game ad.
5. Each plan is independently committable and deployable (`npx vercel deploy --prod`).

## Plan 1 — Mobile playability audit + blocker fixes (the gate)

**Method.** Serve `game/` locally (e.g. `npx serve` or `python3 -m http.server`), open in a
phone-sized browser session (390×844 portrait), and play Saragarhi end-to-end:

battle select → regiment intro → select unit → move → attack → use ability → end turn →
survive at least one wave → dismiss a histCard → reach debrief.

Every defect found is fixed in source and re-verified with before/after screenshots.

**Audit checklist.**
- Touch targets ≥44px on every interactive element.
- Canvas gestures: tap-select vs drag-pan vs pinch-zoom must not fight each other
  (see `handleCanvasTap`, `pointerState`, `tapThreshold()` in index.html).
- Side panel / mobile dock: no overflow, no overlap with canvas controls.
- Text legibility at phone size (unit panel, log, narratives, histCards).
- Modals (histCard, narrative, war cry) dismissible by touch, never blocking input.
- Stuck states: `gameState.animating` must never deadlock input; verify end-turn
  always reachable.
- Load time + frame rate on a throttled mobile profile (fog, terrain props, glow rings).
- Safe-area insets (notch) respected; nothing critical off-screen in portrait.

**Exit criterion.** A first-timer completes Saragarhi on the phone viewport with zero blockers.

**Deliverable.** Fixes committed + an audit report (`docs/AUDIT-MOBILE-2026-07.md`) with screenshots.

## Plan 2 — First-time-player funnel (link → fighting in <60s)

- **First-visit fast path.** localStorage flag (`regiment_seen`). First visit: battle select
  leads with one prominent "START HERE — Saragarhi · 21 vs 10,000" card; era tiles and the
  Vijay Diwas campaign banner move below it on mobile. Returning visitors see today's full grid.
- **Intro friction cut.** Cinematic intro auto-skippable on mobile (tap anywhere + visible SKIP);
  regiment intro condensed to one screen with a single obvious START button.
- **Guided first two turns.** Replace the HOW TO PLAY text wall with contextual in-battle nudges:
  "tap a soldier" → "blue = move" → "red = attack" → "end turn". Each nudge dismisses when the
  player performs the action. Builds on the existing idle-nudge machinery. Shown only on the
  player's first-ever battle.
- **Loading experience.** Show regiment insignia + a quote within ~1s while Three.js modules load,
  so slow connections never look like a broken page.

## Plan 3 — The payoff (finish → feel → share)

- **Mobile-native debrief.** Full-screen, paced reveal: epitaph → odds infographic → hero card →
  fallen names. Uses existing `DEBRIEF_DATA` (debrief-data.js). This is the emotional peak;
  it gets the most visual care. Tap to advance each beat; no desktop panel squeezed down.
- **One-tap share.** Web Share API (`navigator.share`) with result text, e.g.
  "I held Saragarhi for 12 rounds. 21 vs 10,000. https://regiment-delta.vercel.app/?battle=Saragarhi".
  Fallback: copy-to-clipboard with confirmation toast. Reuses existing `share/` pages and the
  `?battle=X` URL-launch wiring.
- **"Next battle" pull.** Debrief ends with one curated recommendation using a fixed sequence
  (Saragarhi → Longewala → Rezang La → rest of roster), so a hooked friend rolls straight into
  battle two. Campaign-mode debriefs keep their existing NEXT behaviour.

## Out of scope (explicitly)

New mechanics (morale rework, objectives, ammo), enemy-AI ability fix, Mini Metro meta layer,
audio, memorial scroll, tank unit type, code modularization. All tracked in the backlog in
SESSION-HANDOFF-2026-07-03.md.

## Testing

Each plan verifies in the same phone-viewport browser session it was built against, with
screenshots. Plan 1's audit flow (full Saragarhi run) is re-run as the regression check at the
end of Plans 2 and 3. Desktop spot-check (1280px) to confirm nothing regressed.
