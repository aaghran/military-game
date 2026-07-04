// Battle of Khalubar (Point 4812) — 3–4 July 1999
// 1/11 Gorkha Rifles | Capt Manoj Kumar Pandey PVC | Batalik sector
export default {
  terrain: {
    'P': {color:0x1c1a22,height:4.5,block:true},
    'R': {color:0x2c2a3a,height:3.5,block:true},
    'r': {color:0x4a4858,height:2.0,def:1.4,mov:2},
    'i': {color:0x7090b0,height:1.5,def:0.8,mov:2},
    'b': {color:0x3c3428,height:2.4,def:2.6,mov:1},
    'f': {color:0x504858,height:1.7,def:1.5,mov:2},
    '.': {color:0x686070,height:1.1,def:1.0,mov:1},
  },
  map: [
    ['P','P','P','R','b','b','b','R','P','P','P'],
    ['P','P','R','f','b','.','b','f','R','P','P'],
    ['P','R','r','f','.','b','.','f','r','R','P'],
    ['R','r','r','.','.','.','.','.','r','r','R'],
    ['r','r','.','.','f','.','f','.','.','r','r'],
    ['r','.','.','f','.','.','.',  'f','.','.',  'r'],
    ['.','.',  'i','.','.','.','.','.',  'i','.','.',],
    ['.','i','i','.','.','.','.','.',  'i','i','.'],
    ['i','i','.','.','.','.','.','.','.',  'i','i'],
    ['i','.','.','.','.','.','.','.','.','.',  'i'],
  ],
  structures: {
    '4,0':{type:'sangar',label:'Khalubar Bunker 1', atkMul:1.8,defMul:2.8,rngBonus:1},
    '6,0':{type:'sangar',label:'Khalubar Bunker 2', atkMul:1.8,defMul:2.8,rngBonus:1},
    '5,0':{type:'lmg',   label:'Summit LMG',        atkMul:2.0,defMul:2.0,rngBonus:2},
    '4,2':{type:'sangar',label:'Mid Bunker W',      atkMul:1.5,defMul:2.2,rngBonus:1},
    '6,2':{type:'sangar',label:'Mid Bunker E',      atkMul:1.5,defMul:2.2,rngBonus:1},
  },
  indStarts: [
    {col:5,row:8,type:'hero',       name:'Capt Manoj Kumar Pandey',platoon:0,bio:'"Na Chodnu." Cleared four bunkers single-handed at Khalubar. Killed at the fifth. Param Vir Chakra, posthumous. 25 years old. 1/11 Gorkha Rifles.'},
    {col:3,row:8,type:'section_cdr',name:'Lt Balwan Singh',        platoon:9,bio:'1/11 GR, left assault column. Cleared the western approach to Khalubar under heavy fire.'},
    {col:7,row:8,type:'section_cdr',name:'Nb Sub Kulbahadur Pun',  platoon:8,bio:'1/11 GR, right column. Held the captured bunkers against Pakistani counterattacks.'},
    {col:4,row:7,type:'rifleman',   name:'Rfn Dhan Bahadur Gurung',platoon:9,bio:'Assault section. Followed Capt Pandey up the rockface. Did not turn back.'},
    {col:5,row:7,type:'rifleman',   name:'Rfn Bir Bahadur Rai',    platoon:0,bio:'Centre section. Khukri in hand at the third bunker.'},
    {col:6,row:7,type:'rifleman',   name:'Rfn Jit Bahadur Thapa',  platoon:8,bio:'Right section. Covered the summit approaches as the captain advanced alone.'},
  ],
  plaWaves: [
    [{col:4,row:0,type:'pla'},{col:5,row:0,type:'pla_cdr'},{col:6,row:0,type:'pla'},{col:4,row:1,type:'pla'},{col:6,row:1,type:'pla'}],
    [{col:3,row:1,type:'pla'},{col:5,row:1,type:'pla_cdr'},{col:7,row:1,type:'pla'},{col:4,row:2,type:'pla'},{col:6,row:2,type:'pla'},{col:5,row:2,type:'pla'}],
    [{col:3,row:0,type:'pla_cdr'},{col:5,row:0,type:'pla'},{col:7,row:0,type:'pla_cdr'},{col:4,row:1,type:'pla'},{col:6,row:1,type:'pla'},{col:5,row:1,type:'pla'}],
  ],
  initialEnemies: [
    {col:4,row:0,type:'pla',    name:'NLI Bunker 1 Crew'},
    {col:6,row:0,type:'pla',    name:'NLI Bunker 2 Crew'},
    {col:5,row:0,type:'pla_cdr',name:'NLI Section Commander'},
    {col:4,row:2,type:'pla',    name:'NLI Mid Post W'},
    {col:6,row:2,type:'pla',    name:'NLI Mid Post E'},
  ],
  roundEvents: {},
  narratives: {
    1: '3 July 1999 · Night — 1/11 Gorkha Rifles begins the assault on Khalubar.',
    2: 'First bunker line. Capt Pandey moves forward alone.',
    3: 'Second line cleared. "Na Chodnu." He does not stop.',
    4: 'Third and fourth bunkers. The khukri comes out.',
    5: 'KHALUBAR CAPTURED. The fifth bunker. Capt Pandey falls.',
  },
  histCards: {
    1: {
      name:  'Captain Manoj Kumar Pandey PVC',
      rank:  '1/11 Gorkha Rifles · Batalik Sector',
      body:  'Capt Manoj Kumar Pandey cleared four enemy bunkers single-handed at Khalubar on 3 July 1999. His last reported words were "Na Chodnu" — "Do not spare them." He was 25 years old. He received the Param Vir Chakra posthumously — the last PVC of the Kargil War.',
    },
    3: {
      name:  'The Gorkha Khukri',
      rank:  '1/11 Gorkha Rifles · Kargil 1999',
      body:  'The khukri — the curved knife of the Gorkha Regiment — is carried into battle as both weapon and symbol. The 1/11 Gorkha Rifles captured and held Khalubar against counterattacks through the night.',
    },
  },
  introMap: {
    // 3-4 July 1999 — 1/11 Gorkha Rifles; Capt Manoj Pandey cleared 4 bunkers single-handedly
    features: [
      {col:5,   row:0.5, label:'KHALUBAR 4812 m'},
      {col:5,   row:2,   label:'BUNKER LINE 2'},
      {col:4.8, row:4.5, label:'APPROACH LEDGE'},
    ],
    phases: [
      // Left — Lt Balwan Singh, western column
      {label:'LEFT — BALWAN', color:'rgba(190,165,90,0.62)',
       path:[{col:3,row:9},{col:3.2,row:6},{col:3.5,row:4},{col:4,row:2}]},
      // Centre — Capt Manoj Pandey's solo charge through all five bunker lines
      {label:'PANDEY — SOLO ADVANCE', color:'rgba(220,200,130,0.88)',
       path:[{col:5,row:8},{col:5,row:5.5},{col:5,row:3},{col:5,row:1},{col:5,row:0}]},
      // Right — Nb Sub Kulbahadur Pun, held captured positions against counterattack
      {label:'RIGHT — KULBAHADUR', color:'rgba(190,165,90,0.62)',
       path:[{col:7,row:9},{col:6.8,row:6},{col:6.5,row:4},{col:6,row:2}]},
    ],
  },
  winCondition:  {type:'waves'},
  defensiveAI:   false,
  autoPlayForceWin: true,
  autoPlayStyle: 'offensive',
  enemyLabels:   {pla:'NLI Infantry', pla_cdr:'NLI Bunker Commander', pla_tank:'Heavy Weapon Post'},
  enemyBio:      'Pakistan Northern Light Infantry — five fortified bunker lines at Khalubar, Batalik sector.',
  introMeta:     '1999 · KHALUBAR · BATALIK SECTOR, KARGIL',
  introText:     `1/11 Gorkha Rifles — assault on five enemy bunker lines at Khalubar.<br>Capt Manoj Pandey. "Na Chodnu." Five bunkers. One night.<br><br><strong style="color:#c8a96e;">OBJECTIVE</strong><br>Clear all NLI bunker waves and capture Khalubar.<br><br><strong style="color:#c8a96e;">HOW TO PLAY</strong><br>Click a unit to select. <span style="color:#4488ff;">Blue</span> = move. <span style="color:#ff5555;">Red</span> = attack.<br>Advance through each bunker line — the Gorkha way.`,
  debriefWin:    'NA CHODNU — KHALUBAR HELD',
  debriefLoss:   'THE BUNKER LINE HELD',
  debriefHistory:'Khalubar (Point 4812) was captured by 1/11 Gorkha Rifles on 4 July 1999. Capt Manoj Kumar Pandey cleared four bunkers single-handedly before being killed at the fifth. He received the Param Vir Chakra posthumously — the fourth and final PVC of the Kargil War.',
};
