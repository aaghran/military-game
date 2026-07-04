// Battle of Point 5140 — 19–20 June 1999
// 13 JAK RIF | Capt Vikram Batra PVC | Drass sector, Kargil
export default {
  terrain: {
    'P': {color:0x1a1820,height:5.0,block:true},
    'R': {color:0x28263a,height:4.0,block:true},
    'r': {color:0x48455a,height:2.2,def:1.4,mov:2},
    'i': {color:0x78a0c0,height:1.6,def:0.7,mov:3},
    'b': {color:0x4a3c38,height:2.5,def:2.8,mov:1},
    'f': {color:0x5a5060,height:1.8,def:1.6,mov:2},
    '.': {color:0x706870,height:1.2,def:1.0,mov:1},
  },
  map: [
    ['P','P','P','P','R','b','R','P','P','P','P'],
    ['P','P','P','R','f','b','f','R','P','P','P'],
    ['P','P','R','r','f','.','f','r','R','P','P'],
    ['P','R','r','r','.','.','.','r','r','R','P'],
    ['P','r','r','.','.','.','.','.',  'r','r','P'],
    ['r','r','.','.','i','.','i','.','.','r','r'],
    ['r','.','.','i','i','.','i','i','.','.',  'r'],
    ['.','.',  'i','i','.','.','.',  'i','i','.','.'],
    ['.','i','i','.','.','.','.','.',  'i','i','.'],
    ['i','i','.','.','.','.','.','.','.',  'i','i'],
  ],
  structures: {
    '5,0':{type:'sangar',label:'Summit Post',      atkMul:2.0,defMul:3.0,rngBonus:2},
    '4,1':{type:'lmg',   label:'W Bunker',         atkMul:1.8,defMul:2.5,rngBonus:1},
    '6,1':{type:'lmg',   label:'E Bunker',         atkMul:1.8,defMul:2.5,rngBonus:1},
    '5,2':{type:'mortar',label:'Mortar Sangat',    atkMul:2.0,defMul:1.0,rngBonus:2,noRetaliate:true},
  },
  indStarts: [
    {col:4,row:8,type:'hero',       name:'Capt Vikram Batra',    platoon:0,bio:'"Yeh Dil Maange More." Captured Point 5140 on 20 June 1999. Went back to retrieve a wounded officer. Killed by enemy fire. Param Vir Chakra, posthumous. 24 years old.'},
    {col:6,row:8,type:'section_cdr',name:'Hav Sanjay Kumar',     platoon:9,bio:'13 JAK RIF. Cleared the first bunker single-handed. Param Vir Chakra — one of only two living PVC recipients of the Kargil War.'},
    {col:3,row:7,type:'section_cdr',name:'Lt Saurabh Kalia',     platoon:8,bio:'13 JAK RIF patrol. Captured by Pakistani forces before the main battle. His sacrifice galvanised the regiment.'},
    {col:4,row:7,type:'rifleman',   name:'Rfn Dinesh Singh',     platoon:9,bio:'JAK RIF rifleman. Assault section. Climbed the ice face under fire without stopping.'},
    {col:6,row:7,type:'rifleman',   name:'Rfn Rajesh Kumar',     platoon:0,bio:'Centre assault. Reached the ledge first. Held position while the captain reorganised.'},
    {col:7,row:7,type:'rifleman',   name:'Rfn Balvir Singh',     platoon:8,bio:'Right flank. Knocked out the eastern LMG post allowing the summit assault.'},
  ],
  plaWaves: [
    [{col:4,row:1,type:'pla'},{col:5,row:0,type:'pla_cdr'},{col:6,row:1,type:'pla'},{col:4,row:2,type:'pla'},{col:6,row:2,type:'pla'}],
    [{col:3,row:2,type:'pla'},{col:5,row:1,type:'pla_cdr'},{col:7,row:2,type:'pla'},{col:4,row:2,type:'pla'},{col:6,row:2,type:'pla'},{col:5,row:2,type:'pla'}],
    [{col:3,row:1,type:'pla_cdr'},{col:5,row:0,type:'pla'},{col:7,row:1,type:'pla_cdr'},{col:4,row:1,type:'pla'},{col:6,row:1,type:'pla'}],
  ],
  initialEnemies: [
    {col:4,row:0,type:'pla',    name:'NLI Sentry W'},
    {col:6,row:0,type:'pla',    name:'NLI Sentry E'},
    {col:5,row:1,type:'pla_cdr',name:'NLI Post Commander'},
  ],
  roundEvents: {},
  narratives: {
    1: '19 June 1999 · 23:00 — 13 JAK RIF begins the night assault up the ice face.',
    2: 'Enemy LMG opens up. Capt Batra directs the section forward.',
    3: 'The first bunker line. Hav Sanjay Kumar leads the breach.',
    4: '20 June · 03:30 — Summit in sight. "Yeh Dil Maange More."',
    5: 'POINT 5140 CAPTURED. Vikram Batra goes back for the wounded.',
  },
  histCards: {
    1: {
      name:  'Captain Vikram Batra — Sher Shah',
      rank:  '13 JAK RIF · Param Vir Chakra',
      body:  'Capt Vikram Batra captured Point 5140 on 20 June 1999. His call sign was "Sher Shah." His code message on capturing the peak, "Yeh Dil Maange More," became the defining phrase of Operation Vijay. He was 24 years old. He was killed hours later going back for a wounded comrade.',
    },
    3: {
      name:  'Havildar Sanjay Kumar — Living PVC',
      rank:  '13 JAK RIF · Param Vir Chakra',
      body:  'Hav Sanjay Kumar cleared the first bunker on the Flat Top feature single-handed, absorbing multiple bullet wounds. He is one of only two living Param Vir Chakra recipients from Kargil.',
    },
  },
  introMap: {
    // 19-20 June 1999 — three-pronged night assault up the ice face
    features: [
      {col:5,   row:3.5, label:'FLAT TOP FEATURE'},
      {col:4.8, row:6,   label:'ICE COULOIR'},
    ],
    phases: [
      // Left wing — Hav Sanjay Kumar, cleared W Bunker single-handedly
      {label:'LEFT — SANJAY KUMAR', color:'rgba(190,165,90,0.62)',
       path:[{col:3,row:7.5},{col:3.5,row:5.5},{col:3.8,row:3},{col:4,row:1}]},
      // Centre — Capt Vikram Batra, straight up the ice couloir to summit
      {label:'CENTRE — BATRA', color:'rgba(220,200,130,0.85)',
       path:[{col:5,row:8},{col:5,row:5.5},{col:5,row:3},{col:5,row:0}]},
      // Right wing — flanked via eastern rocky slope
      {label:'RIGHT FLANK', color:'rgba(190,165,90,0.62)',
       path:[{col:7,row:7.5},{col:6.5,row:5.5},{col:6.2,row:3},{col:6,row:1}]},
    ],
  },
  winCondition:  {type:'waves'},
  defensiveAI:   false,
  autoPlayForceWin: true,
  autoPlayStyle: 'offensive',
  enemyLabels:   {pla:'NLI Infantry', pla_cdr:'NLI Officer', pla_tank:'Bunker Crew'},
  enemyBio:      'Pakistan Northern Light Infantry — entrenched at Point 5140, Drass sector.',
  introMeta:     '1999 · POINT 5140 · DRASS SECTOR, KARGIL',
  introText:     `13 JAK RIF — night assault up the ice face of Point 5140.<br>Capt Vikram Batra. 5,140 metres. 03:00. "Yeh Dil Maange More."<br><br><strong style="color:#c8a96e;">OBJECTIVE</strong><br>Clear the NLI garrison and capture Point 5140 in three waves.<br><br><strong style="color:#c8a96e;">HOW TO PLAY</strong><br>Click a unit to select. <span style="color:#4488ff;">Blue</span> = move. <span style="color:#ff5555;">Red</span> = attack.<br>Advance up the ridge — the ice slows movement. Keep pushing.`,
  debriefWin:    'YEH DIL MAANGE MORE',
  debriefLoss:   'THE ICE FACE HELD THEM BACK',
  debriefHistory:'Point 5140 was captured by 13 JAK RIF on 20 June 1999. Capt Vikram Batra\'s code words "Yeh Dil Maange More" became the motto of Operation Vijay. He was awarded the Param Vir Chakra posthumously. Hav Sanjay Kumar received a living Param Vir Chakra for the same action.',
};
