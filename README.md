# Regiment

`Regiment` is a browser-native historical tactics game about real battles fought by Indian Army units. Each battle is a playable chapter with its own regiment identity, terrain, opening situation, and historical debrief.

The current build is a static HTML/JavaScript game with no backend and no build step.

## Included battles

13 battles from Saragarhi (1897) to Operation Sindoor (2025). See `game/battles/index.js` for the full roster.

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

Then open `http://127.0.0.1:4173/landing.html`.

## Deploy (Vercel)

**Production:** https://regiment-delta.vercel.app

| URL | Page |
|-----|------|
| `/` | Landing |
| `/play` | Game |
| `/share/tololing` | Battle share card (OG meta) |
| `/game/vijay-diwas.html` | Vijay Diwas tribute |

```bash
git push origin main
npx vercel deploy --prod --yes
```

## Repo scope

- `game/` — playable site
- `vercel.json` — routing
- `README.md` — this file

Project planning notes stay in the private Jarvis workspace.
