// Battle of Asal Uttar — 10 September 1965
// 4 Horse, 3 Cavalry, Deccan Horse | Centurion tanks vs Pakistani M48 Patton 1st Armoured Division
export default {
  terrain: {
    'P': {color:0x3a4020,height:2.5,block:true},   // embankment / bund — blocking
    'R': {color:0x4a5030,height:2.0,block:true},   // raised road bund
    'c': {color:0x7aaa40,height:0.9,def:1.2,mov:1},// sugarcane fields — cover
    'f': {color:0xa8b860,height:0.7,def:0.8,mov:1},// flat Punjab plain
    'w': {color:0x4a7a50,height:0.5,def:0.6,mov:2},// waterlogged ground / paddy
    'r': {color:0x9a8840,height:1.1,def:1.4,mov:2},// raised ground / tank bund
    '.': {color:0xc8b870,height:0.6,def:1.0,mov:1},// open ground
  },
  map: [
    ['f','f','f','f','f','f','f','f','f','f','f'],
    ['f','f','c','c','c','c','c','c','c','f','f'],
    ['f','c','c','c','r','r','r','c','c','c','f'],
    ['f','c','r','r','r','.','r','r','r','c','f'],
    ['w','w','r','.','.','.','.','.','r','w','w'],
    ['w','w','w','.','.','.','.','.','w','w','w'],
    ['f','c','c','.','r','r','r','.','c','c','f'],
    ['f','f','c','c','c','.','c','c','c','f','f'],
    ['P','P','P','c','c','c','c','c','P','P','P'],
    ['R','R','R','R','R','R','R','R','R','R','R'],
  ],
  structures: {
    '4,3':{type:'sangar',label:'Tank Hide W',  atkMul:1.4,defMul:1.8,rngBonus:1},
    '6,3':{type:'sangar',label:'Tank Hide E',  atkMul:1.4,defMul:1.8,rngBonus:1},
    '5,2':{type:'lmg',   label:'Fire Slit',    atkMul:1.6,defMul:1.5,rngBonus:1},
    '5,4':{type:'mortar',label:'Mortar Troop', atkMul:2.0,defMul:1.0,rngBonus:2,noRetaliate:true},
  },
  indStarts: [
    {col:5,row:3,type:'hero',       name:'Lt Col Ardeshir Tarapore',platoon:0,bio:'Poona Horse. Killed in action. Posthumously awarded Param Vir Chakra — India\'s highest wartime honour. His Centurion tank was hit three times; he continued fighting until the fourth hit.'},
    {col:3,row:3,type:'section_cdr',name:'Capt Daljit Singh',       platoon:9,bio:'3 Cavalry. Western flank, sugarcane ambush. His squadron held the drainage channel against the Patton advance.'},
    {col:7,row:3,type:'section_cdr',name:'Lt Arun Khetrapal',       platoon:8,bio:'Poona Horse. 21 years old. His tank was on fire; he refused to bail out and continued firing. Param Vir Chakra (posthumous).'},
    {col:4,row:4,type:'rifleman',   name:'Hav Ram Singh Centurion', platoon:9,bio:'Tank crew, western hide. Centurion 20-pounder at 400 yards — first Patton destroyed at Asal Uttar.'},
    {col:5,row:4,type:'rifleman',   name:'Gnr Mortar Troop',        platoon:0,bio:'Anti-tank troop. Sited in the sugarcane. The Pattons came into the killing ground one by one.'},
    {col:6,row:4,type:'rifleman',   name:'Hav Gurbachan Singh',     platoon:8,bio:'Eastern ambush position. His Centurion claimed four Pattons in the first hour.'},
  ],
  plaWaves: [
    [{col:3,row:8,type:'pla_tank'},{col:5,row:8,type:'pla_cdr'},{col:7,row:8,type:'pla_tank'},{col:4,row:9,type:'pla'},{col:6,row:9,type:'pla'}],
    [{col:2,row:8,type:'pla_tank'},{col:5,row:9,type:'pla_tank'},{col:8,row:8,type:'pla_tank'},{col:4,row:8,type:'pla_cdr'},{col:6,row:8,type:'pla'}],
    [{col:2,row:8,type:'pla_tank'},{col:4,row:8,type:'pla_tank'},{col:6,row:8,type:'pla_tank'},{col:8,row:8,type:'pla_tank'},{col:5,row:9,type:'pla_cdr'},{col:3,row:9,type:'pla'},{col:7,row:9,type:'pla'}],
  ],
  initialEnemies: [],
  roundEvents: {
    3: {type:'airstrike', dmg:2, msg:'⚡ IAF Gnats engage. Pakistani armour takes 2 damage.'},
  },
  narratives: {
    1:  '10 September 1965 · Pakistani 1st Armoured Division advances through Khem Karan.',
    2:  'Centurions engage from hides in the sugarcane. The killing ground is set.',
    3:  '⚡ IAF Gnats overhead. Pakistani communications disrupted.',
    4:  'The Pattons are bogging in the waterlogged paddy. Centurions pick them off.',
    5:  'ASAL UTTAR HOLDS. 97 Pakistani tanks destroyed. The graveyard of Pattons.',
  },
  histCards: {
    1: {
      name:  'Param Vir Chakra — Lt Col Ardeshir Tarapore',
      rank:  'Poona Horse · Asal Uttar, September 1965',
      body:  'Lt Col Ardeshir Tarapore led the Poona Horse in a series of counterattacks at Asal Uttar. His tank was hit three times. He continued to command and fight until the fourth hit killed him. He was awarded the Param Vir Chakra posthumously — India\'s highest wartime honour.',
    },
    3: {
      name:  'The Graveyard of Pattons',
      rank:  'Battle of Khem Karan · 1965',
      body:  'Pakistan\'s 1st Armoured Division — equipped with the latest M48 Patton tanks, called "the best tanks in Asia" — was destroyed at Asal Uttar in the paddy fields of Punjab. 97 Pakistani tanks were captured or destroyed. The field is still called "Patton Nagar" — Patton Town.',
    },
  },
  winCondition:  {type:'waves'},
  defensiveAI:   false,
  autoPlayForceWin: true,
  autoPlayStyle: 'defensive',
  enemyLabels:   {pla:'M48 Patton', pla_cdr:'Pakistani Armour CO', pla_tank:'Patton Squadron'},
  enemyBio:      'Pakistani 1st Armoured Division — M48 Patton tanks and supporting infantry.',
  introMeta:     '1965 · ASAL UTTAR · KHEM KARAN, PUNJAB',
  introText:     `Poona Horse & 3 Cavalry — Centurion tanks defending the Khem Karan sector.<br>Pakistani 1st Armoured Division advances. 97 Patton tanks. Hold the line.<br><br><strong style="color:#c8a96e;">OBJECTIVE</strong><br>Destroy all Pakistani armour waves from your prepared positions.<br><br><strong style="color:#c8a96e;">HOW TO PLAY</strong><br>Click a unit to select. <span style="color:#4488ff;">Blue</span> = move. <span style="color:#ff5555;">Red</span> = attack.<br>Hold the tank hides and fire slits — the Pattons will come to you.`,
  debriefWin:    'ASAL UTTAR HOLDS — PATTON NAGAR',
  debriefLoss:   'THE KHEM KARAN SECTOR IS LOST',
  debriefHistory:'The Battle of Asal Uttar (10 September 1965) destroyed Pakistan\'s 1st Armoured Division. 97 Pakistani M48 Patton tanks were captured or destroyed in the waterlogged paddy fields of Khem Karan. The field is called "Patton Nagar" to this day. Two Param Vir Chakras were awarded for this battle.',
};
