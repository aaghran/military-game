// Battle of Haifa — 23 September 1918
// Mysore Lancers & Jodhpur Lancers | ~500 cavalry vs Ottoman/German garrison
export default {
  terrain: {
    'P': {color:0x5c4830,height:3.5,block:true},  // Ottoman fortress wall
    'R': {color:0x7a6040,height:2.5,block:true},  // rocky ridge
    'd': {color:0xd4aa60,height:0.9,def:0.8,mov:1}, // dry plain
    's': {color:0xe8c878,height:0.6,def:0.7,mov:1}, // sandy ground
    'r': {color:0x9a8060,height:1.3,def:1.4,mov:2}, // rocky terrain
    'f': {color:0x6a9a50,height:0.8,def:1.0,mov:1}, // field / flat approach
    'w': {color:0x2a5a7a,height:0.4,def:0.6,mov:3}, // wadi / dry riverbed
  },
  map: [
    ['R','R','r','r','d','d','d','r','r','R','R'],
    ['R','r','d','d','d','d','d','d','d','r','R'],
    ['r','d','d','f','f','f','f','f','d','d','r'],
    ['d','d','f','f','f','f','f','f','f','d','d'],
    ['s','s','f','f','f','w','f','f','f','s','s'],
    ['s','s','s','f','w','w','w','f','s','s','s'],
    ['s','s','s','s','P','P','P','s','s','s','s'],
    ['s','s','s','P','P','P','P','P','s','s','s'],
    ['s','s','P','P','R','R','R','P','P','s','s'],
    ['s','P','R','R','R','R','R','R','R','P','s'],
  ],
  structures: {
    '5,7':{type:'sangar',label:'Ottoman Gun Post',   atkMul:1.8,defMul:2.0,rngBonus:2},
    '3,8':{type:'sangar',label:'Ottoman W Redoubt',  atkMul:1.4,defMul:2.5,rngBonus:1},
    '7,8':{type:'sangar',label:'Ottoman E Redoubt',  atkMul:1.4,defMul:2.5,rngBonus:1},
  },
  indStarts: [
    {col:3,row:1,type:'hero',       name:'Major Dalpat Singh',  platoon:0,bio:'Jodhpur Lancers. Led the cavalry charge at Haifa. Killed in action. Posthumously awarded the Indian Order of Merit — the first Indian to receive it in WWI.'},
    {col:5,row:0,type:'section_cdr',name:'Lt Aman Singh Bahadur',platoon:9,bio:'Mysore Lancers. Charged the Ottoman gun position on the ridge. Wounded twice, continued fighting.'},
    {col:7,row:1,type:'section_cdr',name:'Lt Sagat Singh',       platoon:8,bio:'Jodhpur Lancers. Eastern flank of the charge. Captured the beach approach.'},
    {col:3,row:2,type:'rifleman',   name:'Swar Bhura Singh',    platoon:9,bio:'Lancer, western approach. Rode through machine-gun fire to reach the Ottoman line.'},
    {col:5,row:2,type:'rifleman',   name:'Swar Kishan Singh',   platoon:0,bio:'Centre lancer. First to breach the Ottoman perimeter.'},
    {col:7,row:2,type:'rifleman',   name:'Swar Mohan Singh',    platoon:8,bio:'Eastern lancer. Charged the redoubt with lance levelled.'},
  ],
  plaWaves: [
    [{col:3,row:7,type:'pla'},{col:5,row:7,type:'pla_cdr'},{col:7,row:7,type:'pla'},{col:4,row:8,type:'pla'},{col:6,row:8,type:'pla'}],
    [{col:3,row:8,type:'pla'},{col:5,row:8,type:'pla_tank'},{col:7,row:8,type:'pla'},{col:4,row:9,type:'pla'},{col:6,row:9,type:'pla'}],
    [{col:2,row:8,type:'pla_cdr'},{col:5,row:9,type:'pla_tank'},{col:8,row:8,type:'pla_cdr'},{col:4,row:9,type:'pla'},{col:6,row:9,type:'pla'}],
  ],
  initialEnemies: [],
  roundEvents: {},
  narratives: {
    1: '23 September 1918 · 14:00 — The Jodhpur and Mysore Lancers begin their charge across open ground.',
    2: 'Ottoman machine guns open up. The cavalry charges through the fire.',
    3: 'The wadi is crossed. The Ottoman line is within lance reach.',
    4: 'HAIFA IS TAKEN. The city falls in under three hours.',
  },
  histCards: {
    1: {
      name:  'The Last Great Cavalry Charge',
      rank:  'Mysore & Jodhpur Lancers · September 1918',
      body:  'The Battle of Haifa on 23 September 1918 is celebrated as one of the last successful cavalry charges in history. The Jodhpur Lancers, led by Major Dalpat Singh, charged across open ground under machine-gun and artillery fire to capture the city in under three hours. India celebrates 23 September as Haifa Day.',
    },
    3: {
      name:  'Major Dalpat Singh',
      rank:  'Jodhpur Lancers · Indian Order of Merit',
      body:  'Major Dalpat Singh led the decisive charge at Haifa and was killed in action. He was posthumously awarded the Indian Order of Merit, the highest gallantry award an Indian could receive at the time. A road in Tel Aviv is named after the Jodhpur Lancers to this day.',
    },
  },
  winCondition:  {type:'waves'},
  defensiveAI:   false,
  autoPlayForceWin: true,
  autoPlayStyle: 'offensive',
  enemyLabels:   {pla:'Ottoman Infantry', pla_cdr:'Ottoman Officer', pla_tank:'German Artillery'},
  enemyBio:      'Ottoman garrison with German artillery support.',
  introMeta:     '1918 · BATTLE OF HAIFA · OTTOMAN PALESTINE',
  introText:     `Mysore & Jodhpur Lancers — cavalry charge on the Ottoman garrison at Haifa.<br>Open ground. Machine guns. Lance levelled.<br><br><strong style="color:#c8a96e;">OBJECTIVE</strong><br>Break through three Ottoman waves and capture Haifa.<br><br><strong style="color:#c8a96e;">HOW TO PLAY</strong><br>Click a unit to select. <span style="color:#4488ff;">Blue</span> = move. <span style="color:#ff5555;">Red</span> = attack.<br>Advance fast — lancers fight best at close range.`,
  debriefWin:    'HAIFA TAKEN — LANCERS VICTORIOUS',
  debriefLoss:   'THE CHARGE FALTERED',
  debriefHistory:'The Battle of Haifa (23 September 1918) remains one of the last successful cavalry charges in history. The Jodhpur and Mysore Lancers captured the city in under three hours, taking 1,350 prisoners and 17 guns. India celebrates 23 September as Haifa Day. A road in Tel Aviv bears the name of the Jodhpur Lancers.',
};
