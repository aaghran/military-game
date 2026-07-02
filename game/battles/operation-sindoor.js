// Operation Sindoor — 7–10 May 2025
// Army Air Defence Corps | S-400 Triumf + Akash + MANPAD Teams
// Adampur Air Station, Punjab — defending Indian airspace against
// Pakistani Songar drones, Fatah-II ballistic missiles, and JF-17s.
export default {
  terrain: {
    '.': {color:0x080816, height:0.4, def:0.8, mov:1},  // night sky / open airspace
    'r': {color:0x0e2038, height:0.6, def:1.2, mov:1},  // active radar coverage zone
    'b': {color:0x141c0e, height:0.8, def:1.8, mov:1},  // airfield ground / launch pad
    'P': {color:0x101018, height:1.8, block:true},        // perimeter blast wall
  },
  map: [
    ['.','.','.','.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.','.','.','.'],
    ['r','r','.','.','.','.','.','.','.',  'r','r'],
    ['r','r','r','.','.','.','.','.','r','r','r'],
    ['r','r','r','r','.','.','.',  'r','r','r','r'],
    ['b','b','.','.','.','.','.','.','.',  'b','b'],
    ['b','b','.','.','.','.','.','.','.',  'b','b'],
    ['P','b','b','.','.','.','.','.',  'b','b','P'],
  ],
  structures: {
    '5,4':{type:'sangar',label:'Primary Radar',   atkMul:1.5,defMul:1.0,rngBonus:2},
    '3,5':{type:'sangar',label:'Sector Radar W',  atkMul:1.2,defMul:1.0,rngBonus:1},
    '7,5':{type:'sangar',label:'Sector Radar E',  atkMul:1.2,defMul:1.0,rngBonus:1},
  },
  indStarts: [
    {col:5,row:8,type:'hero',       name:'Maj Vikrant Nair',    platoon:0,bio:'Battery Commander. Directed S-400 intercepts from the command post. Held the radar live through 4 waves of Pakistani drones and missiles.'},
    {col:3,row:7,type:'section_cdr',name:'Capt Suresh Tomar',   platoon:9,bio:'Akash battery, western arc. First to lock on to the Fatah-II missile track.'},
    {col:7,row:7,type:'section_cdr',name:'Nb Sub Rajesh Kumar', platoon:9,bio:'Akash battery, eastern arc. Downed two JF-17s in the final wave.'},
    {col:2,row:8,type:'rifleman',   name:'Gnr Dalbir Singh',    platoon:9,bio:'MANPAD team, western perimeter. Engaged Songar drones at close range.'},
    {col:5,row:9,type:'rifleman',   name:'Gnr Pradeep Rao',     platoon:9,bio:'MANPAD team, centre. Held the last line of defence at the launch pad.'},
    {col:8,row:8,type:'rifleman',   name:'Gnr Anil Chauhan',    platoon:9,bio:'MANPAD team, eastern perimeter. Intercepted the kamikaze drone that got through radar coverage.'},
  ],
  plaWaves: [
    // Wave 1 — Songar UAV swarm
    [{col:3,type:'drone'},{col:5,type:'drone'},{col:7,type:'drone'}],
    // Wave 2 — heavier drone swarm
    [{col:2,type:'drone'},{col:4,type:'drone'},{col:5,type:'drone'},{col:6,type:'drone'},{col:8,type:'drone'}],
    // Wave 3 — Fatah-II ballistic missiles + drones
    [{col:3,type:'missile'},{col:5,type:'drone'},{col:7,type:'missile'},{col:4,type:'drone'},{col:6,type:'drone'}],
    // Wave 4 — JF-17 + missiles + kamikaze drones
    [{col:2,type:'aircraft'},{col:4,type:'missile'},{col:5,type:'drone'},{col:6,type:'missile'},{col:8,type:'aircraft'},{col:3,type:'drone'},{col:7,type:'drone'}],
  ],
  initialEnemies: [],
  roundEvents: {
    5: {type:'airstrike', dmg:3, msg:'⚡ S-400 salvo fires — simultaneous intercept on all tracks. Enemy takes 3 damage.'},
  },
  narratives: {
    1:  '10 May 2025 · 23:00 IST — Pakistan launches Operation Bunyan-um-Marsoos. Songar drones inbound.',
    2:  'Second drone wave detected on radar. Akash batteries engaging.',
    3:  'Fatah-II ballistic missile tracks confirmed. S-400 locking.',
    5:  '⚡ S-400 salvo. Multiple simultaneous intercepts. All tracks hit.',
    6:  'JF-17s and final missile salvo inbound. This is the last wave.',
  },
  histCards: {
    1: {
      name:  'S-400 Triumf — First Combat Use',
      rank:  'Indian Army Air Defence Corps · May 2025',
      body:  'India\'s S-400 batteries at Adampur, Bhuj, and Bikaner made their first confirmed combat intercepts during Operation Bunyan-um-Marsoos. Pakistani CM-400AKG cruise missiles and YIHA-III kamikaze drones were engaged. It was the S-400\'s first combat use anywhere outside the Russia-Ukraine conflict.',
    },
    3: {
      name:  'Akash Missile System',
      rank:  'Indian Army · Medium-Range Air Defence',
      body:  'The indigenously developed Akash system provides medium-range air defence against aircraft, cruise missiles, and drones. During the 2025 conflict, Akash batteries provided layered defence alongside the S-400, covering the engagement envelope between the S-400\'s long-range kill zone and MANPAD close-in coverage.',
    },
    5: {
      name:  'Operation Bunyan-um-Marsoos',
      rank:  '10 May 2025 · Pakistani Retaliation',
      body:  'Pakistan targeted 26 Indian military installations with Fatah-II ballistic missiles, CM-400AKG cruise missiles, and Songar UAV swarms. JF-17 Thunder and J-10C fighters provided stand-off escort. India\'s multi-layered air defence — S-400, Spyder, Akash, Barak-8 — intercepted the large majority of incoming projectiles. A US-brokered ceasefire followed at 17:00 IST.',
    },
  },
  winCondition:  {type:'waves'},
  defensiveAI:   false,
  enemyLabels:   {drone:'Songar UAV', missile:'Fatah-II Missile', aircraft:'JF-17 Thunder'},
  enemyBio:      'Pakistani air assault: Songar kamikaze UAVs, Fatah-II ballistic missiles, JF-17 Thunder fighters.',
  introMeta:     '2025 · OPERATION SINDOOR · ADAMPUR',
  introText:     `Army Air Defence Corps — Adampur Air Station, Punjab.<br>Pakistan launches Operation Bunyan-um-Marsoos. Drones, missiles, aircraft inbound.<br><br><strong style="color:#c8a96e;">OBJECTIVE</strong><br>Intercept all incoming waves. Keep the radar live.<br><br><strong style="color:#c8a96e;">HOW TO PLAY</strong><br>Click a unit to select. <span style="color:#4488ff;">Blue</span> = move. <span style="color:#ff5555;">Red</span> = attack.<br>Advance into the radar zone (row 4–6) for range bonus. S-400 (hero) has longest reach.<br>Round 5: S-400 salvo hits all enemy units for 3 damage.`,
  debriefWin:    'AIRSPACE CLEAR — SINDOOR DELIVERED',
  debriefLoss:   'RADAR DESTROYED — AIRSPACE LOST',
  debriefHistory:'India\'s S-400, Akash, and MANPAD batteries intercepted the majority of Pakistani Songar drones, Fatah-II missiles, and JF-17 escorts during Operation Bunyan-um-Marsoos on 10 May 2025. A US-brokered ceasefire followed at 17:00 IST, ending the most significant India-Pakistan military exchange since 1971.',
  autoPlayForceWin: true,
};
