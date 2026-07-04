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
    {col:5,row:3,type:'hero',       name:'Lt Col Ardeshir Tarapore',platoon:0,bio:'Commanding Officer, Poona Horse. Led from his Centurion tank. Hit three times — refused to abandon his tank or crew. Killed on the fourth hit. Param Vir Chakra — Posthumous.'},
    {col:3,row:3,type:'section_cdr',name:'CQMH Abdul Hamid',        platoon:9,bio:'4 Grenadiers. Armed with a jeep-mounted RCL gun, he stalked and destroyed 7 Pakistani Patton tanks. Killed in action during his eighth engagement. Param Vir Chakra — Posthumous.'},
    {col:7,row:3,type:'section_cdr',name:'Maj Ranjit Singh Dayal',  platoon:8,bio:'3 Cavalry. Led the counterattack on the western flank. His squadron held the drainage channel and prevented a Pakistani breakthrough. Maha Vir Chakra.'},
    {col:4,row:4,type:'rifleman',   name:'Hav Karnail Singh',       platoon:9,bio:'Centurion tank commander, Poona Horse. Western hide position. His 20-pounder claimed the first Patton in the killing ground at first light.'},
    {col:5,row:4,type:'rifleman',   name:'Hav Gurnam Singh',        platoon:0,bio:'Mortar troop, Poona Horse. Sited in the sugarcane. The Pattons entered the soft paddy ground one by one — and were destroyed one by one.'},
    {col:6,row:4,type:'rifleman',   name:'Hav Gurbachan Singh',     platoon:8,bio:'Eastern ambush position. His Centurion tank claimed four Pattons in the first two hours of the battle.'},
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
      body:  'Lt Col Ardeshir Tarapore commanded the Poona Horse from inside his Centurion tank throughout the battle. Hit three times, he refused evacuation and continued directing fire. He was killed on the fourth hit. Param Vir Chakra — Posthumous. He was 44 years old.',
    },
    2: {
      name:  'CQMH Abdul Hamid — The Man Who Stalked Pattons',
      rank:  '4 Grenadiers · Asal Uttar, September 1965',
      body:  'Company Quartermaster Havildar Abdul Hamid mounted a recoilless rifle on a jeep and hunted Pakistani Patton tanks in the sugarcane fields. He destroyed seven before being killed during his eighth engagement. Param Vir Chakra — Posthumous. He was 32 years old.',
    },
    4: {
      name:  'Patton Nagar — The Graveyard of Tanks',
      rank:  'Battle of Khem Karan · 1965',
      body:  'Pakistan\'s 1st Armoured Division — equipped with the M48 Patton, called "the best tank in Asia" — drove into a carefully prepared killing ground at Asal Uttar. The waterlogged paddy trapped the tanks. 97 Pakistani Pattons were destroyed or captured. The field is still called "Patton Nagar."',
    },
  },
  introMap: {
    // 10 Sep 1965 — Asal Uttar; Centurion tanks vs Pakistani 1st Armoured Division Pattons
    // Pakistani M48 Pattons advanced from north through sugarcane onto soft paddy ground — trapped
    features: [
      {col:5,   row:4.5, label:'PADDY KILLING GROUND'},
      {col:5,   row:1.5, label:'PATTON ADVANCE'},
      {col:5,   row:8.5, label:'GRAND TRUNK ROAD BUND'},
    ],
    phases: [
      // Pakistani 1st Armoured Division — main axis down the centre
      {label:'PATTON MAIN THRUST', color:'rgba(200,70,70,0.65)',
       path:[{col:5,row:0.5},{col:5,row:2.5},{col:5,row:4},{col:5,row:5}]},
      // Pakistani western column — into the waterlogged paddy fields
      {label:'PAK W COLUMN', color:'rgba(200,70,70,0.45)',
       path:[{col:3,row:0.5},{col:3,row:3},{col:3,row:5}]},
      // Pakistani eastern column
      {label:'PAK E COLUMN', color:'rgba(200,70,70,0.45)',
       path:[{col:7,row:0.5},{col:7,row:3},{col:7,row:5}]},
      // CQMH Abdul Hamid — jeep RCL stalking the Patton column from the sugarcane
      {label:'HAMID — RCL JEEP', color:'rgba(220,200,130,0.75)',
       path:[{col:3,row:3.5},{col:4,row:2.5},{col:5.5,row:1.5}]},
    ],
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
