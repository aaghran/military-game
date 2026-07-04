# Mobile audit notes — 2026-07-03

- Baseline captured at 390×844 after implementation pass.
- `viewport-fit=cover` added; safe-area padding on select header, opening skip, debrief shell.
- Mobile end-turn dock button raised from 38px to 44px min-height.
- Glow ring pulse throttled to every 3rd frame on mobile viewports.
- `renderer.setPixelRatio` already capped at 2 — no change needed.
- Pointer handling verified: `activePointers` cleared on `pointerup`/`pointercancel`; `touch-action: none` on canvas.
- No uncaught errors observed on initial load via static anchor verification.
