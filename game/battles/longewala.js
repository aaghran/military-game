// Battle of Longewala — 5-6 December 1971
// A Company, 23 Punjab Regiment | 120 soldiers vs Pakistani 51 Infantry Brigade + 45 tanks
export default {
  terrain: {
    'P': {color:0x5c5040,height:2.0,block:true},
    'R': {color:0x8a7550,height:1.6,block:true},
    'd': {color:0xd4b060,height:1.1,def:1.6,mov:2},
    's': {color:0xe8c870,height:0.7,def:0.8,mov:1},
    '.': {color:0xd4aa58,height:0.7,def:1.0,mov:1},
    'f': {color:0x6a5a3a,height:0.9,def:1.4,mov:1},
  },
  map: [
    ['s','s','s','s','s','s','s','s','s','s','s'],
    ['s','s','s','s','s','s','s','s','s','s','s'],
    ['s','s','s','s','s','s','s','s','s','s','s'],
    ['d','d','s','s','s','s','s','s','s','d','d'],
    ['d','d','d','s','.','.','.','s','d','d','d'],
    ['R','d','d','.','f','f','f','.','d','d','R'],
    ['R','d','.','.','.','.','.','.','.','d','R'],
    ['R','R','d','.','.','.','.','.','d','R','R'],
    ['R','R','R','d','.','.','.','d','R','R','R'],
    ['R','R','R','R','.','.','.','R','R','R','R'],
  ],
  structures: {
    '4,5':{type:'sangar', label:'Gun Post',         atkMul:1.5,defMul:1.5,rngBonus:1},
    '6,5':{type:'sangar', label:'Gun Post',         atkMul:1.5,defMul:1.5,rngBonus:1},
    '5,5':{type:'mortar', label:'Post Centre',      atkMul:1.8,defMul:1.2,rngBonus:2,noRetaliate:true},
    '5,6':{type:'lmg',    label:'106mm RCL Jeep',  atkMul:3.0,defMul:0.8,rngBonus:3,noRetaliate:true},
  },
  indStarts: [
    {col:5,row:5,type:'hero',       name:'Maj Chandpuri',       platoon:0,bio:'Maha Vir Chakra. Commanded A Company, 23 Punjab. Refused to withdraw. Held Longewala all night with 120 men against 2,000 Pakistani troops and 45 tanks.'},
    {col:4,row:5,type:'section_cdr',name:'Lt Rattan Kumar',     platoon:9,bio:'Left flank commander. Held western approach against Pakistani infantry.'},
    {col:6,row:5,type:'section_cdr',name:'Nb Sub Kishan Singh', platoon:8,bio:'Right flank. Coordinated fire with eastern gun post throughout the night.'},
    {col:4,row:6,type:'rifleman',   name:'Rfn Major Singh',     platoon:9,bio:'Machine gunner. Laid down covering fire during the darkest hours of the night.'},
    {col:5,row:6,type:'rifleman',   name:'Rfn Ram Lal',         platoon:0,bio:'Dug in at the post centre. Never left position even when armour approached.'},
    {col:6,row:6,type:'rifleman',   name:'Rfn Balwant Singh',   platoon:8,bio:'Eastern approach defender. Reported the tank column\'s approach in the dark.'},
  ],
  plaWaves: [
    [{col:4,row:0,type:'pla'},{col:5,row:0,type:'pla_cdr'},{col:6,row:0,type:'pla'}],
    [{col:3,row:0,type:'pla'},{col:4,row:0,type:'pla'},{col:5,row:0,type:'pla'},{col:6,row:0,type:'pla'},{col:7,row:0,type:'pla'}],
    [{col:3,row:0,type:'pla_tank'},{col:5,row:0,type:'pla_cdr'},{col:7,row:0,type:'pla_tank'}],
    [{col:2,row:0,type:'pla'},{col:4,row:0,type:'pla_tank'},{col:5,row:0,type:'pla_cdr'},{col:6,row:0,type:'pla_tank'},{col:8,row:0,type:'pla'}],
    [{col:2,row:0,type:'pla'},{col:3,row:0,type:'pla_tank'},{col:4,row:0,type:'pla'},{col:5,row:0,type:'pla_tank'},{col:6,row:0,type:'pla'},{col:7,row:0,type:'pla_tank'},{col:8,row:0,type:'pla'}],
  ],
  initialEnemies: [],
  roundEvents: {5:{type:'airstrike',dmg:2,msg:'IAF Hawker Hunters strike — all Pakistani units take 2 damage!'}},
  narratives: {
    1: '5 Dec 1971 · 22:30 hrs — Pakistani 51 Infantry Brigade crosses the border. Infantry first.',
    2: 'M47 Patton tanks spotted on the horizon. The 106mm RCL is your only answer.',
    3: 'Tanks closing in. Maj Chandpuri calls for air support — dawn is hours away.',
    5: '⚡ IAF Hawker Hunters arrive at dawn. Air strike on the Patton column!',
    7: 'Pakistani armour burning. Infantry continues the assault.',
    10: 'Longewala holds. The post never fell.',
  },
  histCards: {
    1: {
      name:  'Major Kuldeep Singh Chandpuri',
      rank:  'OC A Company, 23 Punjab Regiment',
      medal: 'Maha Vir Chakra',
      body:  '120 soldiers vs ~2,000 Pakistani troops with 45 tanks. When asked about withdrawing, Chandpuri refused. His company held the Longewala post through the night using nothing but small arms and mines, calling in the IAF at dawn. The Pakistani column was destroyed. Chandpuri\'s stand became one of the most celebrated actions of the 1971 war.',
    },
    5: {
      name:  'IAF Hawker Hunter',
      rank:  'Indian Air Force · Operation Vijay (1971)',
      body:  'At first light on 6 December, Hawker Hunter jets from IAF Station Jaisalmer struck the Pakistani armoured column. In the open desert with no cover, the tanks were sitting targets. 36 tanks and over 100 vehicles were destroyed. It was one of the most decisive air-land actions in Indian military history.',
    },
    8: {
      name:  'Battle of Longewala',
      rank:  'Historical Context · 5–6 December 1971',
      body:  'Pakistan lost ~200 soldiers, 36 tanks, and 100+ vehicles. India lost 2 soldiers. General Sam Manekshaw called it "a perfect example of army-air force cooperation." The battle was dramatized in the film Border (1997). The post at Longewala still stands.',
    },
  },
  introMap: {
    // 5-6 Dec 1971 — 23 Punjab; 120 soldiers vs ~2,000 Pakistani troops and 45 Patton tanks
    // Flat Thar Desert; Pakistani column approached from west/northwest; IAF struck at dawn
    features: [
      {col:5,   row:5.5, label:'LONGEWALA POST'},
      {col:5,   row:1.5, label:'PAKISTANI STAGING'},
      {col:5,   row:3.5, label:'DUNE BELT'},
    ],
    phases: [
      // Pakistani infantry first wave — probing attack
      {label:'PAK INFANTRY', color:'rgba(200,70,70,0.5)',
       path:[{col:4,row:0.5},{col:4,row:2.5},{col:4.5,row:4.5}]},
      // Pakistani Patton tank column — main thrust down the track from NW
      {label:'PATTON COLUMN', color:'rgba(200,70,70,0.75)',
       path:[{col:5,row:0.5},{col:5,row:1.5},{col:5,row:3},{col:5,row:4.5}]},
      // Second infantry axis — eastern pincer
      {label:'E INFANTRY', color:'rgba(200,70,70,0.45)',
       path:[{col:7,row:0.5},{col:6.5,row:2},{col:6,row:4.5}]},
      // IAF Hawker Hunter airstrike axis at dawn (round 5 event)
      {label:'IAF STRIKE — DAWN', color:'rgba(100,180,255,0.6)',
       path:[{col:9.5,row:3},{col:7,row:2},{col:5,row:1.5}]},
    ],
  },
  winCondition:  {type:'rounds',n:10},
  defensiveAI:   false,
  enemyLabels:   {pla:'Pakistani Infantry', pla_cdr:'Pakistani Officer', pla_tank:'M47 Patton Tank'},
  // Pakistan used M47/M48 Patton tanks at Longewala, not Soviet T-54/55
  enemyBio:      'Pakistani 51 Infantry Brigade with M47/M48 Patton tank support.',
  introMeta:     '1971 · THAR DESERT · RAJASTHAN',
  introText:     `A Company, 23 Punjab — holding the Longewala outpost in the Thar Desert.<br>Pakistani 51 Brigade advances with tanks and 2,000 infantry.<br><br><strong style="color:#c8a96e;">OBJECTIVE</strong><br>Hold the post for 10 rounds until IAF air support arrives at dawn.<br><br><strong style="color:#c8a96e;">HOW TO PLAY</strong><br>Click a unit to select. <span style="color:#4488ff;">Blue</span> = move. <span style="color:#ff5555;">Red</span> = attack.<br>Round 5: Air strike hits all enemy units.`,
  debriefWin:    'LONGEWALA HOLDS',
  debriefLoss:   'THE POST IS OVERRUN',
  debriefHistory:'Historically, Longewala held through the night and the IAF destroyed the Pakistani armoured column at dawn. Pakistan lost 36 tanks and 100+ vehicles. India lost 2 soldiers. The post stands to this day.',
  autoPlayForceWin: true,
  autoPlayStyle:    'defensive',
};
