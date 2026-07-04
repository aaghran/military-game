# Regiment — Canva Battle Map Scripts & Build Orders

> Visual map production guide for all 13 Regiment battles.  
> Grid reference: **11 columns × 10 rows** (matches `game/battles/*.js`).  
> Col 0 = left · Row 0 = top (usually enemy / high ground) · Row 9 = bottom (usually Indian start).

---

## Canva setup (all battles)

| Setting | Value |
|---------|-------|
| Grid battles (fort/village/radar) | 1080 × 1080 px |
| Wide battles (desert/plain) | 1920 × 1080 px |
| Mountain battles (Kargil, Rezang La, Siachen) | 1080 × 1920 px (portrait) |
| Grid overlay | 11 × 10 invisible guide grid (~98 px × ~108 px per cell at 1080²) |
| Layer stack (bottom → top) | 1 Terrain → 2 Structures → 3 Forces → 4 Arrows & callouts → 5 Title & legend |

**Icon key (Forces layer)**

| Icon | Meaning |
|------|---------|
| 🟢 | Indian unit (named soldier) |
| 🔴 | Enemy unit / wave spawn |
| ⬛ | Impassable terrain |
| 🏰 | Structure (bunker, wall, post) |
| ➡️ | Assault / advance arrow |
| ⚡ | Event (airstrike, artillery, intercept) |

---

# 1. SARAGARHI — 12 September 1897

## Script

**Title:** Battle of Saragarhi  
**Location:** Saragarhi signal post, Samana Ridge, Khyber Pakhtunkhwa  
**Regiment:** 36th Sikh Infantry (now 4 Sikh)  
**Motto:** *Nischay Kar Apni Jeet Karo* — With determination, achieve your victory  
**War cry:** *Jo Bole So Nihaal, Sat Sri Akal!*  
**Palette:** Saffron `#c87a18`, navy `#1a2840`, mud-brick `#8B7355`, frontier sand `#d4b892`

**Situation:** 21 Sikh soldiers in a mud-brick signal fort. ~10,000 Orakzai and Afridi Pashtun warriors outside. Hold 12 rounds — long enough to send the final heliograph signal to Fort Lockhart.

**Forces:** 21 Indians inside fort vs ~10,000 Pashtun approaching from north.

**Key figures:** Hav Ishar Singh (north rampart) · Sep Gurmukh Singh (signal tower) · Hav Bhagwan Singh (NW wall) · Sep Ram Singh (south wall, last line)

**Timeline**
1. 09:00 — Orakzai mass outside walls
2. Mid-morning — Sustained assault on north ramparts
3. ~Round 4 — Outer wall breached; fighting at gap
4. ~Round 7 — Gurmukh: *"We will fight to the last"*
5. ~Round 10 — Ishar Singh final stand; bayonets drawn
6. ~Round 12 — All 21 fall. None retreated.

**Quotes:** *"We will fight."* · *"Give my salaams to all."* · **21 soldiers. 7 hours. Not one retreated.**

**Legacy:** Indian Order of Merit for all 21. 12 September = Saragarhi Day. Memorial at Ferozepur.

---

## Layer-by-layer build order

**Canvas:** 1080 × 1080 px · square

### Layer 1 — Terrain

| Cell range | Terrain | Fill color | Label (optional) |
|------------|---------|------------|------------------|
| Rows 0–1, all cols | Sand/scrub `s` | `#d4b892` | Frontier |
| Rows 2 & 8 | Rampart wall `P` | `#8B7355` | Fort wall |
| Cols 1 & 9, rows 2 & 8 | Corner towers `R` | `#6a5535` | Tower |
| Rows 3–7, cols 2–8 inside P | Courtyard `.` `r` `t` `g` | `#c4a882` / `#7a6a50` / `#8a7a50` | Courtyard |
| Outside fort (rows 0–1 beyond walls) | Sand `s` | `#d4b892` | Approach |

### Layer 2 — Structures

| Cell | Type | Label text |
|------|------|------------|
| 5,5 | Signal Tower (sangar) | SIGNAL TOWER |
| 1,2 | NW Tower | NW TOWER |
| 9,2 | NE Tower | NE TOWER |
| 4,2 | North Rampart LMG | N RAMPART |
| 7,2 | North Rampart LMG | N RAMPART |

Draw rampart as thick brown rectangles on rows 2 and 8, cols 2–8. Corner towers as circles at (1,2), (9,2), (1,8), (9,8).

### Layer 3 — Forces (start positions)

| Cell | Unit | Label |
|------|------|-------|
| 4,2 | 🟢 Hero | HAV ISHAR SINGH |
| 2,2 | 🟢 Section | HAV BHAGWAN SINGH |
| 7,2 | 🟢 Section | HAV NAND SINGH |
| 1,4 | 🟢 Rifleman | SEP JIWA SINGH |
| 9,4 | 🟢 Rifleman | SEP SUNDAR SINGH |
| 4,8 | 🟢 Rifleman | SEP RAM SINGH |
| 5,5 | 🟢 Rifleman | SEP GURMUKH SINGH |
| Row 0–1, cols 3–7 | 🔴 Wave spawn | ORAKZAI MASS |

### Layer 4 — Arrows & callouts

| From → To | Arrow style | Callout text |
|-----------|-------------|--------------|
| Row 0 → Row 2 (cols 3–7) | Red dashed, thick | 10,000 WARRIORS |
| Row 2 center → Row 5 | Saffron solid | HOLD THE LINE |
| 5,5 → off-canvas top-right | Dotted line | HELIOGRAPH → FORT LOCKHART |

Numbered timeline strip along bottom: 09:00 · BREACH · SIGNAL · BAYONETS · 21 FALLEN

### Layer 5 — Title & legend

- **Title (top):** SARAGARHI · 12 SEPTEMBER 1897
- **Subtitle:** 36th Sikh Infantry · 21 vs 10,000
- **Corner badge:** Saffron khanda insignia
- **Footer:** *Jo Bole So Nihaal, Sat Sri Akal!*

---

# 2. HAIFA — 23 September 1918

## Script

**Title:** Battle of Haifa — The Last Great Cavalry Charge  
**Location:** Haifa, Ottoman Palestine  
**Regiment:** Jodhpur Lancers & Mysore Lancers  
**Motto:** *Rann Banka Rathore*  
**War cry:** *Jai Jodhana! Vande Mataram!*  
**Palette:** Gold `#c87a18`, crimson, desert ochre `#d4aa60`, stone grey `#5c4830`

**Situation:** ~500 Indian cavalry charges across open ground under machine-gun fire. Captures Haifa in under three hours. One of the last successful cavalry charges in history.

**Timeline:** 14:00 charge begins → machine guns open → wadi crossed → Haifa taken (<3 hrs)

**Key figures:** Major Dalpat Singh (killed, IOM) · Lt Aman Singh Bahadur · Lt Sagat Singh

**Legacy:** Haifa Day (23 Sep). Road in Tel Aviv named for Jodhpur Lancers. 1,350 prisoners, 17 guns.

---

## Layer-by-layer build order

**Canvas:** 1920 × 1080 px · landscape

### Layer 1 — Terrain

| Zone | Rows | Fill | Texture note |
|------|------|------|--------------|
| Open plain `d` `f` | 0–4 | `#d4aa60` | Dry grass |
| Sandy `s` | 4–5 edges | `#e8c878` | Sand |
| Wadi `w` | Row 5, cols 3–7 | `#2a5a7a` | Dry riverbed (darker strip) |
| Fortress wall `P` | Rows 6–7 | `#5c4830` | Stone wall band |
| City interior `P` `R` | Rows 8–9 | `#7a6040` | Fortified zone |

### Layer 2 — Structures

| Cell | Label |
|------|-------|
| 5,7 | OTTOMAN GUN POST |
| 3,8 | W REDOUBT |
| 7,8 | E REDOUBT |

### Layer 3 — Forces

| Cell | Unit | Label |
|------|------|-------|
| 3,1 | 🟢 Hero | MAJ DALPAT SINGH |
| 5,0 | 🟢 Section | LT AMAN SINGH |
| 7,1 | 🟢 Section | LT SAGAT SINGH |
| 3,2 | 🟢 Lancer | SWAR BHURA SINGH |
| 5,2 | 🟢 Lancer | SWAR KISHAN SINGH |
| 7,2 | 🟢 Lancer | SWAR MOHAN SINGH |
| 5,7–5,8 | 🔴 Garrison | OTTOMAN LINE |

### Layer 4 — Arrows

| Arrow | Style | Text |
|-------|-------|------|
| Row 1 → Row 6 (center mass) | Gold chevron, wide | THE CHARGE |
| Row 5 wadi crossing | Blue arc over wadi | CROSS THE WADI |
| Row 6 → Row 8 | Red burst into walls | HAIFA TAKEN · <3 HRS |

### Layer 5 — Title

- **Title:** HAIFA · 23 SEPTEMBER 1918
- **Subtitle:** Jodhpur & Mysore Lancers · Last Great Cavalry Charge
- **Footer:** 1,350 prisoners · 17 guns · Haifa Day

---

# 3. KOHIMA — April 1944

## Script

**Title:** Battle of Kohima — The Battle of the Tennis Court  
**Location:** Kohima, Nagaland  
**Regiment:** Assam Regiment & Rajput Regiment  
**Palette:** Jungle green `#3a7a20`, bunker brown, tennis-court tan

**Situation:** 1,500 hold 15,000 Japanese for 15 days. Tennis court = 15 metres between positions. Japanese never pass.

**Key figures:** Lt Col John Young · Havildar Hangpan Dada · Naga Home Guard

**Timeline:** Encirclement → tennis court standoff → night grenades → RAF round 4 → 2nd Division relief

**Quote:** *"When you go home, tell them of us and say — for your tomorrow, we gave our today."*

---

## Layer-by-layer build order

**Canvas:** 1080 × 1080 px

### Layer 1 — Terrain

| Zone | Cells | Color |
|------|-------|-------|
| Jungle ridge `P` `R` | Perimeter rows 0–1, 8–9, cols 0–1, 9–10 | `#2a3a20` / `#3a5028` |
| Jungle floor `j` | Most of rows 2–7 outside court | `#4a6a30` |
| **Tennis court `.`** | Rows 4–5, cols 4–6 | `#c8b890` — **make this the visual focal point** |
| Trenches `t` | Around court (rows 3–6, cols 3 & 7) | `#7a6a50` |
| Bunkers `b` | 3,2 and 7,2 | `#5a4a30` |

Draw a **white net line** down the middle of the tennis court (between cols 4–5 and 5–6, or down col 5).

### Layer 2 — Structures

| Cell | Label |
|------|-------|
| 3,2 | NW BUNKER |
| 7,2 | NE BUNKER |
| 2,4 | W BREN POST |
| 8,4 | E BREN POST |
| 5,3 | MORTAR PIT |

### Layer 3 — Forces

| Cell | Label |
|------|-------|
| 5,4 | 🟢 LT COL JOHN YOUNG |
| 3,3 | 🟢 CAPT CORLETT |
| 7,3 | 🟢 HAV HANGPAN DADA |
| 2,4 | 🟢 NAGA HOME GUARD |
| 5,3 | 🟢 MORTAR TEAM |
| 8,4 | 🟢 ASSAM REGT |
| Row 8–9 center | 🔴 JAPANESE 31ST DIV |

### Layer 4 — Arrows

| Arrow | Text |
|-------|------|
| South → tennis court | RED ASSAULT WAVES |
| Court center ↔ court center | 15 METRES — GRENADES OVER THE NET |
| Off-map south → court | RELIEF COLUMN (Round 5) |

### Layer 5 — Title

- **Title:** KOHIMA · APRIL 1944
- **Subtitle:** The Battle of the Tennis Court
- **Footer:** Kohima Epitaph quote

---

# 4. REZANG LA — 18 November 1962

## Script

**Title:** Battle of Rezang La  
**Location:** Rezang La pass, Ladakh — 16,000 ft, −20°C  
**Regiment:** C Company, 13 Kumaon  
**Motto:** *Yuddhaya Krit Nischaya* · **War cry:** *Kalika Mata Ki Jai!*  
**Palette:** Forest green `#2a5a38`, ice `#8ac8e0`, rock `#5a5a6e`

**Situation:** 114 men vs PLA division. No artillery, no air. 113 killed historically. None retreated.

**Key figures:** Maj Shaitan Singh (PVC) · Hav Khem Chand (Vir Chakra) · Nb Sub Dharam Paul

**Timeline:** 04:30 contact → PLA artillery → Shaitan Singh rallies → hand-to-hand → last stand

---

## Layer-by-layer build order

**Canvas:** 1080 × 1920 px · portrait (mountain pass profile)

### Layer 1 — Terrain

| Zone | Rows | Color | Note |
|------|------|-------|------|
| Peaks `P` | 0–2, all cols | `#1e1e30` ⬛ | Impassable — draw mountain silhouettes |
| Rocky `r` | 3, 6–8 sides | `#5a5a6e` | Ridge walls |
| Snow `s` | 3–4 center | `#4a78b0` | Snow patches |
| Ice `i` | Row 4 cols 3–7 | `#8ac8e0` | Ice field |
| Pass floor `.` | Rows 5–8 center | `#7a6a52` | Fighting ground |
| PLA approach | Row 9 / top | Dark grey | Enemy spawn |

### Layer 2 — Structures

| Cell | Label |
|------|-------|
| 4,6 | LMG NEST |
| 6,6 | LMG NEST |
| 5,8 | MORTAR PIT |
| 3,7 | SANGAR W |
| 6,7 | SANGAR E |

### Layer 3 — Forces

| Cell | Label |
|------|-------|
| 4,9 | 🟢 MAJ SHAITAN SINGH |
| 4,6 | 🟢 NB SUB DHARAM PAUL |
| 4,7 | 🟢 HAV KHEM CHAND |
| 3,7 | 🟢 HAV BHANWAR SINGH |
| 3,8 | 🟢 RFN RAM KISHAN |
| 6,7 | 🟢 NB SUB RAM KUMAR |
| 6,8 | 🟢 HAV HARI RAM |
| 5,9 | 🟢 RFN CHUNI LAL |
| Row 9 / top cols 3–6 | 🔴 PLA WAVES |

### Layer 4 — Arrows

| Arrow | Text |
|-------|------|
| Top → pass floor | PLA 3RD INFANTRY DIVISION |
| 4,9 → 4,6 → 6,6 | SAFFRON: SHAITAN SINGH RALLIES |
| Pass floor | −20°C · 16,000 FT · NO ARTILLERY |

### Layer 5 — Title

- **Title:** REZANG LA · 18 NOVEMBER 1962
- **Subtitle:** C Company, 13 Kumaon · 114 vs a Division
- **Footer:** *How can a man die better than facing fearful odds*

---

# 5. ASAL UTTAR — 10 September 1965

## Script

**Title:** Battle of Asal Uttar — Patton Nagar  
**Location:** Khem Karan, Punjab  
**Regiment:** Poona Horse, 3rd Cavalry, 4 Grenadiers  
**War cry:** *Ek Bar Aur!*  
**Palette:** Gold `#b89020`, sugarcane green `#7aaa40`, paddy blue-green `#4a7a50`

**Situation:** Pakistani 1st Armoured Division (M48 Pattons) funneled into waterlogged paddy. 97 tanks destroyed. Field called Patton Nagar.

**Key figures:** Lt Col Ardeshir Tarapore (PVC) · CQMH Abdul Hamid (PVC, 7 Pattons) · Maj Ranjit Singh Dayal (MVC)

---

## Layer-by-layer build order

**Canvas:** 1920 × 1080 px · landscape

### Layer 1 — Terrain

| Zone | Rows | Color |
|------|------|-------|
| Open plain `f` | 0–1, 6–7 | `#c8b870` |
| Sugarcane `c` | 1–2, 6–7 sides | `#7aaa40` |
| **Killing ground** `.` `w` | 3–5 center | `#4a7a50` (paddy) + `#c8b870` (open) |
| Raised bunds `r` | 2–4 | `#9a8840` |
| Embankment `P` `R` | 8–9 | `#3a4020` — blocks retreat |

### Layer 2 — Structures

| Cell | Label |
|------|-------|
| 4,3 | TANK HIDE W |
| 6,3 | TANK HIDE E |
| 5,2 | FIRE SLIT |
| 5,4 | MORTAR TROOP |

Hide icons inside sugarcane — use semi-transparent green rectangles with tank silhouettes.

### Layer 3 — Forces

| Cell | Label |
|------|-------|
| 5,3 | 🟢 LT COL TARAPORE |
| 3,3 | 🟢 CQMH ABDUL HAMID |
| 7,3 | 🟢 MAJ DAYAL |
| 4,4 | 🟢 HAV KARNAIL SINGH |
| 5,4 | 🟢 HAV GURNAM SINGH |
| 6,4 | 🟢 HAV GURBACHAN SINGH |
| Row 8–9 | 🔴 PATTON WAVES |

### Layer 4 — Arrows

| Arrow | Text |
|-------|------|
| Row 9 → Row 4 | RED: 1ST ARMOURED DIVISION |
| Hides → paddy center | GOLD AMBUSH |
| Round 3 from sky | ⚡ IAF GNATS |
| Paddy center | 97 PATTONS · PATTON NAGAR |

### Layer 5 — Title

- **Title:** ASAL UTTAR · 10 SEPTEMBER 1965
- **Subtitle:** Centurion vs Patton · Khem Karan
- **Footer:** *Ek Bar Aur!*

---

# 6. DOGRAI — 21–22 September 1965

## Script

**Title:** Battle of Dograi  
**Location:** Dograi village, Lahore Sector  
**Regiment:** 3 Jat Regiment  
**War cry:** *Jat Balwan! Jai Bhagwan!*  
**Palette:** Khaki `#7a5020`, maroon, mud-brick

**Situation:** 03:00 night assault. Radios fail. Searchlights on. Fixed bayonets. Room to room. Lt Col Hayde leads in person.

**Key figures:** Lt Col Desmond Hayde (MVC) · Maj Ranjit Singh Dayal · Maj Harwant Singh

**Legacy:** Battle honour DOGRAI on Regimental Colour.

---

## Layer-by-layer build order

**Canvas:** 1080 × 1080 px

### Layer 1 — Terrain

| Zone | Cells | Color |
|------|-------|-------|
| Crop fields `c` | Rows 0–2, 6–7 outer | `#7aaa40` |
| Open `.` | Row 1 center | `#b8a870` |
| **Village compounds `v`** | Rows 3–6, cols 3–7 | `#6a5a40` — grid of building blocks |
| Compound walls `P` | 5,4–5,5 | `#3a3020` |
| Irrigation `w` | Row 4, cols 0–1 & 9–10 | `#4a7060` |
| Raised track `r` | Rows 2–3, 7 | `#9a8840` |
| Pakistani line `R` | Rows 8–9 | `#5a4830` |

Draw village as **3×3 grid of square compounds** in center, walls between them.

### Layer 2 — Structures

| Cell | Label |
|------|-------|
| 5,4 | CENTRAL BUNKER |
| 4,3 | NW BREN |
| 6,3 | NE BREN |
| 5,5 | MORTAR PIT |

### Layer 3 — Forces

| Cell | Label |
|------|-------|
| 5,1 | 🟢 LT COL HAYDE |
| 3,1 | 🟢 MAJ DAYAL (Left) |
| 7,1 | 🟢 MAJ HARWANT SINGH (Right) |
| 3,2 | 🟢 RFN GIAN SINGH |
| 5,0 | 🟢 RFN MANGE RAM |
| 7,2 | 🟢 RFN SHER SINGH |
| Row 8–9 | 🔴 PAK GARRISON |

### Layer 4 — Arrows

| Arrow | Text |
|-------|------|
| Row 1 → Row 5 (3 columns) | 03:00 · BAYONETS FIXED |
| Left via col 0 wadi | THROUGH IRRIGATION CHANNELS |
| Center into 5,4 | ROOM TO ROOM |
| Searchlight cone from 5,4 | SEARCHLIGHTS ON — 3 JAT DOES NOT STOP |

### Layer 5 — Title

- **Title:** DOGRAI · 21 SEPTEMBER 1965 · 03:00 HRS
- **Subtitle:** 3 Jat Regiment · Night Assault
- **Footer:** Battle Honour — DOGRAI

---

# 7. LONGEWALA — 5–6 December 1971

## Script

**Title:** Battle of Longewala  
**Location:** Thar Desert, Rajasthan  
**Regiment:** A Company, 23 Punjab  
**War cry:** *Bole So Nihal, Sat Sri Akal!*  
**Palette:** Crimson `#8a2020`, desert sand `#e8c870`, navy

**Situation:** 120 men vs 2,000 troops + 45 tanks. Chandpuri refuses to withdraw. IAF Hunters at dawn. 36 tanks destroyed. India: 2 KIA.

**Key figures:** Maj Kuldeep Singh Chandpuri (MVC) · 106mm RCL Jeep · IAF Hawker Hunters

---

## Layer-by-layer build order

**Canvas:** 1920 × 1080 px · landscape

### Layer 1 — Terrain

| Zone | Rows | Color |
|------|------|-------|
| Deep desert `s` | 0–3 | `#e8c870` — vast empty |
| Dunes `d` | 3–4 sides | `#d4b060` |
| **Post area** `.` `f` | 5–6 center | `#d4aa58` / `#6a5a3a` |
| Rocky ridges `R` | 5–9 sides | `#8a7550` ⬛ |

Post is a **tiny island** in infinite desert — make sand dominate 80% of canvas.

### Layer 2 — Structures

| Cell | Label |
|------|-------|
| 4,5 | GUN POST W |
| 6,5 | GUN POST E |
| 5,5 | POST CENTRE (Mortar) |
| 5,6 | 106mm RCL JEEP |

Draw sandbag ring around cells 4,5 – 6,6.

### Layer 3 — Forces

| Cell | Label |
|------|-------|
| 5,5 | 🟢 MAJ CHANDPURI |
| 4,5 | 🟢 LT RATTAN KUMAR |
| 6,5 | 🟢 NB SUB KISHAN SINGH |
| 4,6 | 🟢 RFN MAJOR SINGH |
| 5,6 | 🟢 RFN RAM LAL |
| 6,6 | 🟢 RFN BALWANT SINGH |
| Row 0, cols 3–7 | 🔴 INFANTRY WAVE |
| Row 0, cols 2–8 | 🔴 PATTON TANKS (later waves) |

### Layer 4 — Arrows

| Arrow | Text |
|-------|------|
| Top edge → post | 51 INFANTRY BRIGADE + 45 TANKS |
| 5,6 → row 0 | 106mm RCL — ONLY ANTI-TANK |
| Sky, round 5 | ⚡ IAF HAWKER HUNTERS · DAWN |
| Post center | REFUSED TO WITHDRAW |

### Layer 5 — Title

- **Title:** LONGEWALA · 5–6 DECEMBER 1971
- **Subtitle:** 120 vs 2,000 · A Company, 23 Punjab
- **Footer:** 36 tanks destroyed · Post still stands

---

# 8. SIACHEN (BANA POST) — June 1987

## Script

**Title:** Assault on Quaid Post → Bana Post  
**Location:** Siachen Glacier, 21,153 ft  
**Regiment:** 19 JAK RIF  
**War cry:** *Durga Mata Ki Jai!*  
**Palette:** Rifle green `#2a4a20`, ice `#6a8ab0`, glacier `#8ab0d0`

**Situation:** Bana Singh leads 3-man team up 457 m ice wall at 70° under fire. Captures "impregnable" post. Renamed Bana Post — highest occupied military post on earth.

**Key figures:** Nb Sub Bana Singh (PVC) · Hav Chander Singh · Rfn Vikram Singh (point man)

---

## Layer-by-layer build order

**Canvas:** 1080 × 1920 px · portrait (vertical cliff profile)

### Layer 1 — Terrain

| Zone | Rows | Color | Note |
|------|------|-------|------|
| Summit peaks `P` `R` | 0 | `#1a1a20` | Skyline |
| Summit bunkers `b` | 0, cols 4–6 | `#3c3028` | Enemy positions |
| Rocky ledge `f` | 1–2 | `#4a4040` | |
| **Ice wall `i`** | 3–5 | `#6a8ab0` | **70° — shade darker, add contour lines** |
| Glacier `g` | 6–7 | `#8ab0d0` | |
| Snow field `.` | 8 | `#9ab8cc` | Assault start |
| Start line | 9 | White | BANA SINGH'S TEAM |

### Layer 2 — Structures

| Cell | Label |
|------|-------|
| 4,0 | QUAID BUNKER ALPHA |
| 6,0 | QUAID BUNKER BRAVO |
| 5,1 | QUAID POST HQ |

### Layer 3 — Forces

| Cell | Label |
|------|-------|
| 5,8 | 🟢 NB SUB BANA SINGH |
| 4,8 | 🟢 HAV CHANDER SINGH |
| 6,8 | 🟢 HAV FATEH SINGH |
| 4,9 | 🟢 RFN DURGA PRASAD |
| 5,9 | 🟢 RFN VIKRAM SINGH |
| 6,9 | 🟢 RFN ARJUN LAL |
| 4,0 – 6,3 | 🔴 PAK SSG / NLI |

### Layer 4 — Arrows

| Arrow | Text |
|-------|------|
| Row 9 → Row 0 (center) | SAFFRON: 457m · 70° ICE WALL |
| Row 0 | TRICOLOUR AT BANA POST |
| Side annotation | 21,153 FT · −40°C |

**Tip:** Use a **side-profile cross-section** rather than top-down for maximum Canva impact.

### Layer 5 — Title

- **Title:** BANA POST · JUNE 1987
- **Subtitle:** 19 JAK RIF · World's Highest Battlefield
- **Footer:** Quaid Post → Bana Post · Param Vir Chakra

---

# 9. TOLOLING — June 1999

## Script

**Title:** Battle of Tololing  
**Location:** Kargil — 16,962 ft  
**Regiment:** 2 Rajputana Rifles  
**Motto:** *Sarvatra Vijay*  
**War cry:** *Rajputana Rifles Ki Jai!*  
**Palette:** Deep red `#6a1a1a`, rock grey, ice blue

**Situation:** First major Kargil peak retaken. Night assault up near-vertical rock. Captured 13 June 1999.

**Key figures:** Maj Vivek Gupta (MVC, posthumous) · Lt Balwan Singh · Lt Dinesh Kumar

---

## Layer-by-layer build order

**Canvas:** 1080 × 1920 px · portrait

### Layer 1 — Terrain

| Zone | Rows | Color |
|------|------|-------|
| Peaks `P` | 0–1 | `#2a2a30` ⬛ |
| Summit `b` | 1, cols 4 & 6 | `#4a3a38` |
| Rock `r` | 2–4 | `#5a5050` |
| Ice `i` | 4–5 | `#88aacc` |
| Approach `.` | 6–8 | `#6a6060` |
| Start | 9 | `#383840` |

### Layer 2 — Structures

| Cell | Label |
|------|-------|
| 4,1 | PAK BUNKER W |
| 6,1 | PAK BUNKER E |

### Layer 3 — Forces

| Cell | Label |
|------|-------|
| 5,8 | 🟢 MAJ VIVEK GUPTA |
| 4,8 | 🟢 LT BALWAN SINGH |
| 6,8 | 🟢 LT DINESH KUMAR |
| 4,9 | 🟢 RFN VIKRAM SINGH |
| 5,9 | 🟢 RFN SUBEDAR YADAV |
| 6,9 | 🟢 RFN ARJUN RAM |
| 4,1 – 6,3 | 🔴 PAK NLI |

### Layer 4 — Arrows

| Arrow | Text |
|-------|------|
| Row 9 → Row 1 | 03:00 ASSAULT · UPHILL |
| Row 1 | TRICOLOUR · 16,962 FT · 13 JUN 1999 |
| Side | FIRST PEAK RETAKEN |

### Layer 5 — Title

- **Title:** TOLOLING · JUNE 1999
- **Subtitle:** 2 Rajputana Rifles · Kargil

---

# 10. POINT 5140 — 19–20 June 1999

## Script

**Title:** Battle of Point 5140  
**Location:** Drass sector — 5,140 m  
**Regiment:** 13 JAK RIF  
**War cry:** *Durga Mata Ki Jai!*  

**Situation:** Night ice-face assault. Capt Vikram Batra ("Sher Shah"). Captured 20 June. *"Yeh Dil Maange More."* Killed retrieving wounded. 24 years old. PVC.

**Key figures:** Capt Vikram Batra · Hav Sanjay Kumar (living PVC) · Lt Saurabh Kalia

---

## Layer-by-layer build order

**Canvas:** 1080 × 1920 px · portrait

### Layer 1 — Terrain

| Zone | Rows | Color |
|------|------|-------|
| Peak `P` `R` | 0–1 | `#1a1820` |
| Summit bunker `b` | 0–2 | `#4a3c38` |
| Rock `r` | 3–4 | `#48455a` |
| **Ice face `i`** | 5–9 | `#78a0c0` — gradient darker toward top |
| Flat sections `f` `.` | 2–4 | `#5a5060` |

### Layer 2 — Structures

| Cell | Label |
|------|-------|
| 5,0 | SUMMIT POST |
| 4,1 | W BUNKER |
| 6,1 | E BUNKER |
| 5,2 | MORTAR SANGAT |

### Layer 3 — Forces

| Cell | Label |
|------|-------|
| 4,8 | 🟢 CAPT VIKRAM BATRA · SHER SHAH |
| 6,8 | 🟢 HAV SANJAY KUMAR |
| 3,7 | 🟢 LT SAURABH KALIA (patrol) |
| 4,7 | 🟢 RFN DINESH SINGH |
| 6,7 | 🟢 RFN RAJESH KUMAR |
| 7,7 | 🟢 RFN BALVIR SINGH |
| 5,0 – 6,2 | 🔴 NLI GARRISON |

### Layer 4 — Arrows

| Arrow | Text |
|-------|------|
| Row 9 → Row 0 | NIGHT ASSAULT · 19 JUN 23:00 |
| 6,8 → 4,1 | HAV SANJAY KUMAR — FIRST BREACH |
| Row 0 callout | **"YEH DIL MAANGE MORE"** — large text overlay |
| 5,0 → down | BATRA RETURNS FOR WOUNDED |

### Layer 5 — Title

- **Title:** POINT 5140 · 20 JUNE 1999
- **Subtitle:** Capt Vikram Batra · 13 JAK RIF
- **Footer:** *Yeh Dil Maange More*

---

# 11. KHALUBAR — 3–4 July 1999

## Script

**Title:** Battle of Khalubar (Point 4812)  
**Location:** Batalik sector, Kargil  
**Regiment:** 1/11 Gorkha Rifles  
**War cry:** *Jai Mahakali! Ayo Gorkhali!*  
**Palette:** Rifle green `#2a6a30`, black

**Situation:** Five bunker lines. Capt Manoj Pandey clears four alone. Killed at fifth. 25 years old. Last PVC of Kargil. *"Na Chodnu."*

**Key figures:** Capt Manoj Kumar Pandey · Nb Sub Kulbahadur Pun · Khukri at bunker 3

---

## Layer-by-layer build order

**Canvas:** 1080 × 1920 px · portrait

### Layer 1 — Terrain

| Zone | Rows | Color |
|------|------|-------|
| Summit `P` `b` | 0–2 | Dark green-brown |
| Mid ridge `f` `r` | 3–5 | `#504858` |
| Ice `i` | 6–9 | `#7090b0` |

Draw **5 horizontal bunker lines** as terraced steps going up — rows 0, 1, 2, 4, 6.

### Layer 2 — Structures (5 bunker lines)

| Cell | Label | Line |
|------|-------|------|
| 4,0 | BUNKER 1 W | Summit |
| 6,0 | BUNKER 2 E | Summit |
| 5,0 | SUMMIT LMG | Summit |
| 4,2 | MID BUNKER W | Line 2 |
| 6,2 | MID BUNKER E | Line 2 |

### Layer 3 — Forces

| Cell | Label |
|------|-------|
| 5,8 | 🟢 CAPT MANOJ PANDEY |
| 3,8 | 🟢 LT BALWAN SINGH |
| 7,8 | 🟢 NB SUB KULBAHADUR PUN |
| 4,7 | 🟢 RFN DHAN BAHADUR GURUNG |
| 5,7 | 🟢 RFN BIR BAHADUR RAI |
| 6,7 | 🟢 RFN JIT BAHADUR THAPA |
| Rows 0–2 | 🔴 NLI BUNKER CREWS |

### Layer 4 — Arrows

| Arrow | Text |
|-------|------|
| 5,8 → 4,0 (alone) | BUNKERS 1–4 · ALONE |
| Bunker 3 | KHUKRI |
| 5,0 | BUNKER 5 · PANDEY FALLS |
| Large callout | **"NA CHODNU"** |

### Layer 5 — Title

- **Title:** KHALUBAR · 3–4 JULY 1999
- **Subtitle:** 1/11 Gorkha Rifles · Batalik
- **Footer:** Last PVC of the Kargil War

---

# 12. TIGER HILL — 3–4 July 1999

## Script

**Title:** Battle of Tiger Hill (Point 5060)  
**Location:** Drass sector — highest fortified Kargil position  
**Regiment:** 8 Sikh + 18 Grenadiers + Garhwal Rifles + Ladakh Scouts  
**War cry:** *Jo Bole So Nihaal, Sat Sri Akal!*  
**Palette:** Saffron `#b86020`, olive, ice

**Situation:** Three-column assault. Hav Yogendra Singh Yadav climbs 1,500-ft cliff on rope under fire — living PVC. Bofors decisive round 3. Captured 4 July 04:15.

**Key figures:** Hav Yogendra Singh Yadav (PVC, living) · Lt Col K.P. Singh · Maj Sonam Wangchuk

---

## Layer-by-layer build order

**Canvas:** 1080 × 1920 px · portrait

### Layer 1 — Terrain

| Zone | Rows | Color |
|------|------|-------|
| Summit `b` `P` | 0–1 | Dark — highest point |
| Upper rock `f` `r` | 2–4 | `#4c4860` |
| Snow `s` | 5–7 | `#90a8c0` |
| Ice `i` | 7–9 | `#6888aa` |

Shape the map as a **pyramid peak** — cols converge toward row 0.

### Layer 2 — Structures

| Cell | Label |
|------|-------|
| 4,0 | TIGER SUMMIT W |
| 6,0 | TIGER SUMMIT E |
| 5,1 | SUMMIT LMG |
| 5,2 | MID MORTAR POST |
| 3,3 | W APPROACH SANGAR |
| 7,3 | E APPROACH SANGAR |

### Layer 3 — Forces (three columns)

| Cell | Label | Column |
|------|-------|--------|
| 5,8 | 🟢 LT COL K.P. SINGH | Centre |
| 2,7 | 🟢 MAJ SONAM WANGCHUK | West |
| 8,7 | 🟢 MAJ MOHIT SAXENA | East |
| 3,8 | 🟢 HAV YOGENDRA SINGH YADAV | West cliff |
| 5,9 | 🟢 RFN GURBACHAN SINGH | Centre |
| 7,8 | 🟢 RFN DHAN SINGH THAPA | East |
| Rows 0–3 | 🔴 NLI SUMMIT |

### Layer 4 — Arrows

| Arrow | Text |
|-------|------|
| Col 2–3, row 9 → row 0 | WEST COLUMN · ROPE CLIMB |
| Col 7–8, row 9 → row 0 | EAST COLUMN |
| Col 5, row 9 → row 0 | CENTRE COLUMN |
| 3,8 → 4,0 | YADAV · 1,500 FT · 3 BUNKERS |
| Round 3 from rear | ⚡ BOFORS FH77B |
| Row 0 | 04:15 · 4 JUL · INDIA HOLDS THE SKY |

### Layer 5 — Title

- **Title:** TIGER HILL · 3–4 JULY 1999
- **Subtitle:** Point 5060 · Highest Peak in Kargil
- **Footer:** Hav Yogendra Singh Yadav · Param Vir Chakra (Living)

---

# 13. OPERATION SINDOOR — 10 May 2025

## Script

**Title:** Operation Sindoor — Defence of Adampur  
**Location:** Adampur Air Station, Punjab  
**Regiment:** Army Air Defence Corps (S-400 + Akash + MANPAD)  
**Motto:** *Akash Raksha*  
**Palette:** Air defence blue `#1a4a78`, radar green `#0e2038`, night black `#080816`

**Situation:** Pakistan Operation Bunyan-um-Marsoos — 26 targets, drones, Fatah-II missiles, JF-17s. First combat use of S-400 outside Russia-Ukraine. Ceasefire 17:00 IST.

**Key figures:** Maj Vikrant Nair · Capt Suresh Tomar · Nb Sub Rajesh Kumar

**Four waves:** (1) Songar drones → (2) drone swarm → (3) Fatah-II + drones → (4) JF-17 + missiles + kamikaze

---

## Layer-by-layer build order

**Canvas:** 1080 × 1080 px · radar-screen aesthetic

### Layer 1 — Terrain (abstract)

| Zone | Rows | Color | Label |
|------|------|-------|-------|
| Airspace `.` | 0–3 | `#080816` | INBOUND AIRSPACE |
| Radar zone `r` | 4–6 | `#0e2038` with green ring overlay | ENGAGEMENT ZONE |
| Airfield `b` | 7–8 | `#141c0e` | ADAMPUR AIR STATION |
| Perimeter `P` | 9 | `#101018` | BLAST WALL |

Draw **3 concentric radar rings** centered on cell 5,5.

### Layer 2 — Structures

| Cell | Label |
|------|-------|
| 5,4 | PRIMARY RADAR |
| 3,5 | SECTOR RADAR W |
| 7,5 | SECTOR RADAR E |

Add S-400 launcher silhouette at 5,8. Akash batteries at 3,7 and 7,7.

### Layer 3 — Forces

| Cell | Label | System |
|------|-------|--------|
| 5,8 | 🟢 MAJ VIKRANT NAIR | S-400 |
| 3,7 | 🟢 CAPT SURESH TOMAR | Akash W |
| 7,7 | 🟢 NB SUB RAJESH KUMAR | Akash E |
| 2,8 | 🟢 GNR DALBIR SINGH | MANPAD W |
| 5,9 | 🟢 GNR PRADEEP RAO | MANPAD C |
| 8,8 | 🟢 GNR ANIL CHAUHAN | MANPAD E |

**Enemy tracks (top airspace, by wave):**

| Wave | Cells | Icons | Label |
|------|-------|-------|-------|
| 1 | 3,0 · 5,0 · 7,0 | 🛸 | SONGAR UAV |
| 2 | 2,0 – 8,0 | 🛸🛸 | DRONE SWARM |
| 3 | 3,0 · 7,0 | 🚀 | FATAH-II |
| 4 | 2,0 · 8,0 | ✈️ | JF-17 THUNDER |

### Layer 4 — Arrows

| Arrow | Text |
|-------|------|
| Row 0 → Row 5 | INBOUND TRACKS |
| Row 5 → Row 0 | INTERCEPT STREAKS (gold) |
| Round 5 burst from 5,8 | ⚡ S-400 SALVO — ALL TRACKS HIT |
| Timeline right margin | W1 DRONES → W2 SWARM → W3 MISSILES → W4 JF-17 |

### Layer 5 — Title

- **Title:** OPERATION SINDOOR · 10 MAY 2025
- **Subtitle:** Army Air Defence Corps · Adampur
- **Footer:** S-400 · Akash · MANPAD · Ceasefire 17:00 IST

---

# Vijay Diwas campaign sequence

For a **connected Canva series**, produce maps in this order with bridge cards between:

```
Siachen (1987)
    ↓ bridge: "The glacier taught them altitude. Kargil would test everything else."
Tololing (13 Jun 1999)
    ↓ bridge: "First flag on a peak. The war was not over."
Point 5140 (20 Jun 1999)
    ↓ bridge: "Sher Shah fell. The regiment did not."
Khalubar (4 Jul 1999)
    ↓ bridge: "Na Chodnu. The Gorkhas did not spare them."
Tiger Hill (4 Jul 1999)
    ↓ tribute card: 527 fallen · 26 July · Kargil Vijay Diwas
```

**Bridge card template (Canva):**
- Background: dark terminal `#0a0a12`
- Saffron divider line
- Field-diary font for body text
- Next battle name + regiment insignia at bottom

---

# Production checklist

- [ ] Pick canvas size per battle type (see top table)
- [ ] Lay 11×10 guide grid
- [ ] Layer 1 terrain fills from cell tables above
- [ ] Layer 2 structure labels placed
- [ ] Layer 3 unit icons at exact cells
- [ ] Layer 4 arrows + round/event callouts
- [ ] Layer 5 title, motto, war cry, regiment colour accent
- [ ] Export PNG @2x for print / PDF for deck

---

*Source: `game/battles/*.js` + `game/battles/index.js` · Regiment project · July 2026*
