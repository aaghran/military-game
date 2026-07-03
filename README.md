# Regiment

`Regiment` is a browser-native historical tactics game about real battles fought by Indian Army units. Each battle is a playable chapter with its own regiment identity, terrain, opening situation, and historical debrief.

The current build is a static HTML/JavaScript game with no backend and no build step.

## Included battles

- `Saragarhi` - 36th Sikh Infantry
- `Rezang La` - 13 Kumaon
- `Longewala` - 23 Punjab
- `Tololing` - 2 Rajputana Rifles
- `Siachen` - 19 JAK RIF
- `Operation Sindoor` - Army Air Defence Corps

## Tech

- Vanilla `HTML` and `JavaScript`
- `Three.js` loaded from CDN
- Static asset bundle in `game/assets`

## Run locally

From the repository root:

```bash
cd game
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173`.

## Deploy

This repository includes a GitHub Pages workflow at `.github/workflows/deploy-pages.yml`.

On every push to `main`, GitHub Actions deploys the `game/` directory as a static site.

**GitHub Pages:** `https://aaghran.github.io/military-game/`

**Vercel (production):** `https://regiment-delta.vercel.app/game/landing.html`

The Vercel deployment uses `/game/` as the site path. Landing at `/game/landing.html`, game at `/game/index.html`, share at `/game/share.html?battle=BattleName`. Root `/` redirects to landing.

## Repo scope

This public repo is intentionally narrow:

- `game/` contains the playable site
- `.github/workflows/` contains deployment automation
- `README.md` documents the project

Project planning notes, local context files, and internal working docs stay in the private Jarvis workspace and are not pushed to this repository.
