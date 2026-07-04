// Battle of Kohima — 4 April – 22 June 1944
// Assam Regiment & Rajput Regiment with British reinforcements | vs Japanese 31st Division
export default {
  terrain: {
    'P': {color:0x2a3a20,height:4.0,block:true},   // jungle ridge — impassable
    'R': {color:0x3a5028,height:3.0,block:true},   // dense jungle
    'j': {color:0x4a6a30,height:1.5,def:1.6,mov:2},// jungle floor
    'b': {color:0x5a4a30,height:1.8,def:2.2,mov:1},// bunker / defended position
    't': {color:0x7a6a50,height:1.2,def:1.8,mov:1},// trench
    '.': {color:0x6a7a50,height:0.9,def:1.0,mov:1},// open clearing (the tennis court)
    'r': {color:0x8a7a60,height:1.1,def:1.2,mov:2},// rocky outcrop
  },
  map: [
    ['P','P','P','R','R','R','R','R','P','P','P'],
    ['P','P','R','j','j','j','j','j','R','P','P'],
    ['P','R','j','b','j','j','j','b','j','R','P'],
    ['R','j','j','j','t','t','t','j','j','j','R'],
    ['j','j','b','t','.','.','.','t','b','j','j'],
    ['j','j','j','t','.','.','.','t','j','j','j'],
    ['j','r','j','j','t','t','t','j','j','r','j'],
    ['R','j','j','r','j','j','j','r','j','j','R'],
    ['P','R','j','j','j','j','j','j','j','R','P'],
    ['P','P','R','R','j','j','j','R','R','P','P'],
  ],
  structures: {
    '3,2':{type:'sangar',label:'NW Bunker',    atkMul:1.3,defMul:2.5,rngBonus:1},
    '7,2':{type:'sangar',label:'NE Bunker',    atkMul:1.3,defMul:2.5,rngBonus:1},
    '2,4':{type:'lmg',   label:'W Bren Post',  atkMul:1.8,defMul:1.6,rngBonus:1},
    '8,4':{type:'lmg',   label:'E Bren Post',  atkMul:1.8,defMul:1.6,rngBonus:1},
    '5,3':{type:'mortar',label:'Mortar Pit',   atkMul:2.0,defMul:1.0,rngBonus:2,noRetaliate:true},
  },
  indStarts: [
    {col:5,row:4,type:'hero',       name:'Lt Col John Young',    platoon:0,bio:'Garrison Commander. Held Kohima with 1,500 men against 15,000 Japanese. The tennis court changed hands seven times. Kohima became the "Stalingrad of the East."'},
    {col:3,row:3,type:'section_cdr',name:'Capt John Corlett',    platoon:9,bio:'West flank. Held the tennis court perimeter for three weeks under constant assault.'},
    {col:7,row:3,type:'section_cdr',name:'Havildar Hangpan Dada',platoon:8,bio:'Assam Regiment. Covered the eastern approach. Later awarded the Ashoka Chakra.'},
    {col:2,row:4,type:'rifleman',   name:'Rfn Naga Home Guard',  platoon:9,bio:'Local Naga volunteers fought alongside the garrison. Their intelligence and support was decisive.'},
    {col:5,row:3,type:'rifleman',   name:'Gnr Mortar Team',      platoon:0,bio:'The mortar pit at the centre of the tennis court. Fired through the night, every night.'},
    {col:8,row:4,type:'rifleman',   name:'Rfn Assam Regt',       platoon:8,bio:'Eastern defence. The Assam Regiment was the first to engage the Japanese advance.'},
  ],
  plaWaves: [
    [{col:3,row:8,type:'pla'},{col:5,row:8,type:'pla_cdr'},{col:7,row:8,type:'pla'},{col:4,row:9,type:'pla'},{col:6,row:9,type:'pla'}],
    [{col:2,row:7,type:'pla'},{col:5,row:9,type:'pla_cdr'},{col:8,row:7,type:'pla'},{col:4,row:8,type:'pla'},{col:6,row:8,type:'pla'},{col:3,row:9,type:'pla'},{col:7,row:9,type:'pla'}],
    [{col:2,row:8,type:'pla_cdr'},{col:5,row:8,type:'pla'},{col:8,row:8,type:'pla_cdr'},{col:3,row:9,type:'pla'},{col:7,row:9,type:'pla'},{col:5,row:9,type:'pla'}],
    [{col:2,row:7,type:'pla'},{col:4,row:8,type:'pla_cdr'},{col:6,row:8,type:'pla_cdr'},{col:8,row:7,type:'pla'},{col:3,row:9,type:'pla'},{col:7,row:9,type:'pla'},{col:5,row:9,type:'pla'}],
  ],
  initialEnemies: [],
  roundEvents: {
    4: {type:'airstrike', dmg:2, msg:'⚡ RAF supply drop + artillery. Enemy takes 2 damage.'},
  },
  narratives: {
    1:  'April 1944 · Japanese 31st Division encircles Kohima. The siege begins.',
    2:  'The tennis court. Japanese and Indian positions are 15 metres apart.',
    3:  'Night assault. Grenades across the tennis court net.',
    4:  '⚡ RAF support arrives. The tide begins to turn.',
    5:  'The relief column of 2nd Division breaks through.',
  },
  histCards: {
    1: {
      name:  'The Battle of the Tennis Court',
      rank:  'Assam Regiment & British 2nd Division · 1944',
      body:  'At Kohima, the tennis court of the Deputy Commissioner\'s bungalow became the most contested piece of ground in the Burma campaign. For three weeks, Japanese and Allied positions were separated by 15 metres — the width of the court. The Japanese never broke through.',
    },
    3: {
      name:  'The Kohima Epitaph',
      rank:  'Burma Campaign Memorial',
      body:  '"When you go home, tell them of us and say — for your tomorrow, we gave our today." The Kohima Epitaph, inscribed at the war cemetery, is among the most recognised in the world. Kohima is called the "Stalingrad of the East." The Japanese 31st Division was destroyed.',
    },
  },
  introMap: {
    // Apr-Jun 1944 — Kohima Garrison; the "Stalingrad of the East"; tennis court changed hands 7 times
    // Japanese 31st Division attacked from south, trying to break through to Imphal
    features: [
      {col:5,   row:4.5, label:'THE TENNIS COURT'},
      {col:5,   row:2.5, label:'GARRISON HILL'},
      {col:5,   row:7.5, label:'JAPANESE APPROACH'},
    ],
    phases: [
      // Japanese 31st Division frontal assault from south through the jungle
      {label:'JPN FRONTAL', color:'rgba(200,70,70,0.58)',
       path:[{col:5,row:9.5},{col:5,row:7.5},{col:5,row:6},{col:5,row:5}]},
      // Japanese western column — tried to flank via the western ridge
      {label:'JPN W FLANK', color:'rgba(200,70,70,0.42)',
       path:[{col:2,row:9},{col:2.5,row:7},{col:3,row:5.5}]},
      // Japanese eastern column
      {label:'JPN E FLANK', color:'rgba(200,70,70,0.42)',
       path:[{col:8,row:9},{col:7.5,row:7},{col:7,row:5.5}]},
      // British 2nd Division relief column broke the siege from the north
      {label:'2ND DIV RELIEF', color:'rgba(100,180,255,0.58)',
       path:[{col:5,row:0.5},{col:5,row:2},{col:5,row:3.5}]},
    ],
  },
  winCondition:  {type:'rounds', n:7},
  defensiveAI:   false,
  autoPlayForceWin: true,
  autoPlayStyle: 'defensive',
  enemyLabels:   {pla:'Japanese Infantry', pla_cdr:'Japanese Officer', pla_tank:'Japanese Mortar Team'},
  enemyBio:      'Japanese 31st Division — storm troops of the Burma campaign.',
  introMeta:     '1944 · KOHIMA · NAGALAND',
  introText:     `Assam Regiment & Rajput Regiment — defending Kohima against the Japanese 31st Division.<br>A tennis court. Grenades over the net. Hold for seven rounds.<br><br><strong style="color:#c8a96e;">OBJECTIVE</strong><br>Survive all waves for 7 rounds until the relief column arrives.<br><br><strong style="color:#c8a96e;">HOW TO PLAY</strong><br>Click a unit to select. <span style="color:#4488ff;">Blue</span> = move. <span style="color:#ff5555;">Red</span> = attack.<br>Hold the bunkers and Bren posts — do not advance into the jungle.`,
  debriefWin:    'KOHIMA HELD — THE LINE DID NOT BREAK',
  debriefLoss:   'THE PERIMETER IS BREACHED',
  debriefHistory:'The siege of Kohima (4 April – 22 June 1944) was the turning point of the Burma campaign. Japanese General Sato\'s 31st Division, 15,000 strong, was held by a garrison of 1,500 for 15 days until relief arrived. The Japanese never captured Kohima. The 31st Division was effectively destroyed in the retreat.',
};
