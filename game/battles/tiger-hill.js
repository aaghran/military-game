// Battle of Tiger Hill (Point 5060) — 3–4 July 1999
// 8 Sikh + 18 Grenadiers + Garhwal Rifles | Drass sector
export default {
  terrain: {
    'P': {color:0x181620,height:5.5,block:true},
    'R': {color:0x262438,height:4.0,block:true},
    'r': {color:0x444258,height:2.5,def:1.4,mov:2},
    'i': {color:0x6888aa,height:1.8,def:0.7,mov:3},
    'b': {color:0x3a3028,height:3.0,def:2.8,mov:1},
    'f': {color:0x4c4860,height:2.2,def:1.5,mov:2},
    '.': {color:0x646070,height:1.4,def:1.0,mov:1},
    's': {color:0x90a8c0,height:1.0,def:0.6,mov:2},
  },
  map: [
    ['P','P','P','P','b','b','b','P','P','P','P'],
    ['P','P','P','R','b','R','b','R','P','P','P'],
    ['P','P','R','f','r','b','r','f','R','P','P'],
    ['P','R','r','r','.','.','.',  'r','r','R','P'],
    ['R','r','r','.','.','f','.','.','r','r','R'],
    ['r','r','.','.','s','.','s','.','.','r','r'],
    ['r','.','.','s','s','.','s','s','.','.',  'r'],
    ['.','.',  'i','s','.','.','.',  's','i','.','.',],
    ['.','i','i','.','.','.','.','.',  'i','i','.'],
    ['i','i','s','.','.','.','.','.',  's','i','i'],
  ],
  structures: {
    '4,0':{type:'sangar',label:'Tiger Summit W',    atkMul:2.0,defMul:3.0,rngBonus:2},
    '6,0':{type:'sangar',label:'Tiger Summit E',    atkMul:2.0,defMul:3.0,rngBonus:2},
    '5,1':{type:'lmg',   label:'Summit LMG',        atkMul:2.2,defMul:2.0,rngBonus:2},
    '5,2':{type:'mortar',label:'Mid Mortar Post',   atkMul:2.0,defMul:1.0,rngBonus:3,noRetaliate:true},
    '3,3':{type:'sangar',label:'W Approach Sangar', atkMul:1.5,defMul:2.0,rngBonus:1},
    '7,3':{type:'sangar',label:'E Approach Sangar', atkMul:1.5,defMul:2.0,rngBonus:1},
  },
  indStarts: [
    {col:5,row:8,type:'hero',       name:'Lt Col K.P. Singh',       platoon:0,bio:'8 Sikh. Commanded the Tiger Hill assault. Coordinated three assault groups simultaneously in darkness and fog. Maha Vir Chakra.'},
    {col:2,row:7,type:'section_cdr',name:'Maj Sonam Wangchuk',      platoon:9,bio:'Ladakh Scouts. Western assault column. Guided the 8 Sikh advance through the ice face under artillery fire.'},
    {col:8,row:7,type:'section_cdr',name:'Maj Mohit Saxena',        platoon:8,bio:'Grenadiers, eastern column. Took the right ridge and held against the Pakistani counterattack at dawn.'},
    {col:3,row:8,type:'rifleman',   name:'Hav Yogendra Singh Yadav',platoon:9,bio:'18 Grenadiers. Climbed the 1500-foot face on a rope under fire. Cleared the first three bunkers. Param Vir Chakra (living).'},
    {col:5,row:9,type:'rifleman',   name:'Rfn Gurbachan Singh',     platoon:0,bio:'8 Sikh, centre. Carried ammunition to the forward section through 48 hours of continuous fire.'},
    {col:7,row:8,type:'rifleman',   name:'Rfn Dhan Singh Thapa',    platoon:8,bio:'Eastern assault. Garhwal Rifles. Reached the summit ridgeline before dawn.'},
  ],
  plaWaves: [
    [{col:4,row:0,type:'pla'},{col:5,row:1,type:'pla_cdr'},{col:6,row:0,type:'pla'},{col:3,row:2,type:'pla'},{col:7,row:2,type:'pla'}],
    [{col:4,row:1,type:'pla_cdr'},{col:5,row:0,type:'pla'},{col:6,row:1,type:'pla_cdr'},{col:3,row:1,type:'pla'},{col:7,row:1,type:'pla'},{col:5,row:2,type:'pla'}],
    [{col:3,row:0,type:'pla_cdr'},{col:5,row:0,type:'pla'},{col:7,row:0,type:'pla_cdr'},{col:4,row:1,type:'pla'},{col:6,row:1,type:'pla'},{col:4,row:2,type:'pla'},{col:6,row:2,type:'pla'}],
  ],
  initialEnemies: [
    {col:4,row:0,type:'pla',    name:'NLI Summit W'},
    {col:6,row:0,type:'pla',    name:'NLI Summit E'},
    {col:5,row:1,type:'pla_cdr',name:'NLI Tiger CO'},
    {col:3,row:3,type:'pla',    name:'NLI W Sangar'},
    {col:7,row:3,type:'pla',    name:'NLI E Sangar'},
  ],
  roundEvents: {
    3: {type:'airstrike', dmg:2, msg:'⚡ Bofors artillery strikes Tiger Hill peak. Enemy takes 2 damage.'},
  },
  narratives: {
    1: '3 July 1999 · Night — 8 Sikh, Grenadiers, Garhwal Rifles begin the triple assault.',
    2: 'Hav Yogendra Singh Yadav climbs the cliff face on a rope under fire.',
    3: '⚡ Bofors speaks. The Pakistani bunkers shake.',
    4: '4 July · 04:15 — Tiger Hill summit reached from both flanks.',
    5: 'TIGER HILL CAPTURED. India holds its highest point in the Kargil War.',
  },
  histCards: {
    1: {
      name:  'Havildar Yogendra Singh Yadav PVC',
      rank:  '18 Grenadiers · Tiger Hill, July 1999',
      body:  'Hav Yogendra Singh Yadav climbed a 1,500-foot near-vertical ice face under fire on a rope at Tiger Hill. He was shot multiple times and continued climbing. He cleared three bunkers. Param Vir Chakra — one of two living PVC recipients from Kargil.',
    },
    3: {
      name:  'The Bofors Gun',
      rank:  'Kargil War · 1999',
      body:  'The Bofors FH77B howitzer proved decisive at Kargil. Its ability to fire at high angles allowed it to hit enemy positions at 5,000+ metres. Tiger Hill fell with Bofors support.',
    },
  },
  paintHints: { biome:'alpine' },
  introMap: {
    // 3-4 July 1999 — 8 Sikh Regiment; three assault columns, night/fog, Bofors artillery support
    features: [
      {col:5,   row:0.5, label:'TIGER HILL 5062 m'},
      {col:5,   row:3.2, label:'HELMET FEATURE'},
      {col:4.8, row:5.5, label:'SNOW SLOPE'},
    ],
    phases: [
      // Left column — western approach, clearing W Approach Sangar
      {label:'LEFT — 8 SIKH', color:'rgba(190,165,90,0.62)',
       path:[{col:2.5,row:9},{col:3,row:6.5},{col:3,row:4},{col:3,row:3}]},
      // Centre — main assault straight up the ridge spine
      {label:'CENTRE RIDGE', color:'rgba(220,200,130,0.88)',
       path:[{col:5,row:9},{col:5,row:6.5},{col:5,row:4},{col:5,row:2},{col:5,row:0}]},
      // Right column — eastern approach, clearing E Approach Sangar
      {label:'RIGHT FLANK', labelAt:1, color:'rgba(190,165,90,0.62)',
       path:[{col:7.5,row:9},{col:7,row:6.5},{col:7,row:4},{col:7,row:3}]},
    ],
  },
  winCondition:  {type:'waves'},
  defensiveAI:   false,
  autoPlayForceWin: true,
  autoPlayStyle: 'offensive',
  enemyLabels:   {pla:'NLI Infantry', pla_cdr:'NLI Officer', pla_tank:'Heavy Bunker'},
  enemyBio:      'Pakistan Northern Light Infantry — fortified summit positions at Tiger Hill (Point 5060).',
  introMeta:     '1999 · TIGER HILL · DRASS SECTOR, KARGIL',
  introText:     `8 Sikh + Grenadiers + Garhwal Rifles — three-column assault on Tiger Hill.<br>Point 5060m. Two flanks. Bofors artillery. No retreat.<br><br><strong style="color:#c8a96e;">OBJECTIVE</strong><br>Clear all NLI positions from both flanks and capture Tiger Hill.<br><br><strong style="color:#c8a96e;">HOW TO PLAY</strong><br>Click a unit to select. <span style="color:#4488ff;">Blue</span> = move. <span style="color:#ff5555;">Red</span> = attack.<br>Advance both flanks — the Bofors softens the peak on round 3.`,
  debriefWin:    'TIGER HILL — INDIA HOLDS THE SKY',
  debriefLoss:   'THE SUMMIT WAS NOT REACHED',
  debriefHistory:'Tiger Hill (Point 5060) was captured on 4 July 1999. Hav Yogendra Singh Yadav received the Param Vir Chakra for his actions on the cliff face. Tiger Hill was the highest and most fortified position captured in the Kargil War.',
};
