# Regiment — Indian Army Historical Battle Game
*Status: In dev. Chapter 1 spike underway.*

---

## Current state

Chapter 1 locked: **Battle of Rezang La, 18 November 1962**. C Company, 13 Kumaon Regiment — 114 men at 16,000 ft holding a Himalayan pass against a PLA division. Phaser.js spike built: top-down map, 13 named defender units, attacker waves, ammo + cold exposure mechanics, named death events, end screen with epitaph.

## TODOs

- [ ] Expand from 13 representative soldiers to full 114 (3 platoons + HQ, grouped as squads)
- [ ] Proper sprite art — turbans for 13 Kumaon, PLA winter uniform for attackers
- [ ] Artillery barrage pre-wave mechanic (historically PLA opened with artillery)
- [ ] Radio comms event — Maj Shaitan Singh's last message to battalion HQ
- [ ] Terrain elevation system — Rezang La is a V-shaped ridgeline with height advantage
- [ ] Research full list of 13 Kumaon C Company soldiers and their positions
- [ ] Sound design — wind, rifle fire, distant artillery

## Asks / blockers

- Need to decide: browser-native standalone vs embedded in Jarvis web dashboard
- Historical fort layout — needs research or approximation from accounts

---

## What it is

A narrative 2D tactical game that recreates real battles fought by Indian Army infantry regiments. Each chapter is a different battle, a different regiment, a different piece of Indian military history. The player commands real soldiers with real names.

Chapter 1 starts at the Battle of Saragarhi — widely regarded as one of the greatest last stands in military history.

---

## Game design

**Genre:** 2D top-down tactical defense

**Core loop:**
1. Place your 21 soldiers across Saragarhi's walls, gate, and interior
2. Repel waves of attackers from multiple directions
3. Each soldier is named and has a short bio — death is permanent and named
4. Signal British forts at Lockhart and Gulistan at narrative checkpoints
5. Hold as long as you can; the historical outcome is baked in — the question is how much you can change

**Mechanics (v1 scope):**
- Formation placement (wall / gate / interior positions)
- Cover system — walls degrade as attackers chip away
- Ammo tracking per soldier (they ran out — historically accurate)
- Morale meter tied to named deaths
- The breach event: gate falls, hold the doorway (Havildar Ishar Singh's last stand)

**Win condition:** Send the final signal to Fort Lockhart. Your soldiers died — the message got through.

---

## Art direction

- Sepia / desaturated palette — history, not fantasy
- 2D sprite units with turbans + regimental colors (saffron and navy for 36th Sikhs)
- Top-down fort map as primary play field
- Minimal UI — score is survival time + soldiers alive at each checkpoint

---

## Campaign roadmap

| Chapter | Battle | Year | Regiment | Terrain |
|---|---|---|---|---|
| 1 | Battle of Saragarhi | 1897 | 36th Sikh Regiment | NWFP mountain fort |
| 2 | Battle of Rezang La | 1962 | 13 Kumaon Regiment | Himalayan high-altitude pass |
| 3 | Battle of Longewala | 1971 | 23 Punjab Regiment | Thar Desert |
| 4 | Battle of Haji Pir | 1965 | Para Commandos | Mountain pass |
| 5 | Battle of Tololing | 1999 | 2 Rajputana Rifles | Kargil ridgeline |

---

## Stack

- **Phaser.js** — 2D game framework, browser-native
- Tiled — map design (open-source tilemap editor)
- Vanilla HTML/JS — no backend for v1
- Standalone at first; can embed in Jarvis dashboard later

---

## References

- Saragarhi: 21 soldiers, Sept 12 1897, Tirah campaign
- British Parliament observed a moment of silence; all 21 awarded Indian Order of Merit
- Historical accounts in British Indian Army regimental diaries
- Rezang La: C Company, 13 Kumaon — 113 of 114 men died; Major Shaitan Singh, PVC
