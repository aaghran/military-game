// Battle of Dograi — 21–22 September 1965
// 3 Jat Regiment | Lt Col Desmond Hayde | night assault on Dograi village
export default {
  terrain: {
    'P': {color:0x3a3020,height:2.5,block:true},   // compound wall — blocking
    'R': {color:0x5a4830,height:2.0,block:true},   // raised embankment
    'v': {color:0x6a5a40,height:1.4,def:2.0,mov:2},// village buildings
    'c': {color:0x7aaa40,height:0.9,def:1.2,mov:1},// crop fields
    'r': {color:0x9a8840,height:1.2,def:1.3,mov:2},// raised track
    'w': {color:0x4a7060,height:0.5,def:0.7,mov:2},// irrigation channel
    '.': {color:0xb8a870,height:0.7,def:1.0,mov:1},// open ground
  },
  map: [
    ['c','c','c','c','c','c','c','c','c','c','c'],
    ['c','c','c','.','.','.','.','.','c','c','c'],
    ['c','c','.','r','r','r','r','r','.','c','c'],
    ['c','.','r','.','v','v','v','.','r','.','c'],
    ['w','w','r','v','v','P','v','v','r','w','w'],
    ['w','w','r','v','P','P','P','v','r','w','w'],
    ['c','.','r','v','v','v','v','v','r','.','c'],
    ['c','c','.','r','r','r','r','r','.','c','c'],
    ['R','R','R','R','.','.','.','R','R','R','R'],
    ['R','R','R','R','R','R','R','R','R','R','R'],
  ],
  structures: {
    '5,4':{type:'sangar',label:'Central Bunker',  atkMul:1.6,defMul:2.5,rngBonus:1},
    '4,3':{type:'lmg',   label:'NW Bren',         atkMul:1.8,defMul:1.5,rngBonus:1},
    '6,3':{type:'lmg',   label:'NE Bren',         atkMul:1.8,defMul:1.5,rngBonus:1},
    '5,5':{type:'mortar',label:'Mortar Pit',      atkMul:2.0,defMul:1.0,rngBonus:2,noRetaliate:true},
  },
  indStarts: [
    {col:5,row:1,type:'hero',       name:'Lt Col Desmond Hayde', platoon:0,bio:'Commanding Officer, 3 Jat Regiment. Led the night assault on Dograi in person. When the radio failed, he advanced with his batman. Maha Vir Chakra.'},
    {col:3,row:1,type:'section_cdr',name:'Maj Ranjit Singh Dayal',platoon:9,bio:'Left flank. Led A Company through the irrigation channels in darkness. First to enter the village.'},
    {col:7,row:1,type:'section_cdr',name:'Maj Harwant Singh',    platoon:8,bio:'Right flank. B Company fought through the compound walls room by room.'},
    {col:3,row:2,type:'rifleman',   name:'Rfn Gian Singh',       platoon:9,bio:'3 Jat Regiment. Crossed the irrigation channel under fire. Cleared the first compound.'},
    {col:5,row:0,type:'rifleman',   name:'Rfn Mange Ram',        platoon:0,bio:'Centre section. Advanced through the open ground under searchlight. Did not stop.'},
    {col:7,row:2,type:'rifleman',   name:'Rfn Sher Singh',       platoon:8,bio:'Right assault. Breached the eastern compound wall with a pickaxe.'},
  ],
  plaWaves: [
    [{col:4,row:7,type:'pla'},{col:5,row:8,type:'pla_cdr'},{col:6,row:7,type:'pla'},{col:4,row:8,type:'pla'},{col:6,row:8,type:'pla'}],
    [{col:3,row:8,type:'pla'},{col:5,row:8,type:'pla_cdr'},{col:7,row:8,type:'pla'},{col:4,row:8,type:'pla'},{col:6,row:8,type:'pla'},{col:5,row:9,type:'pla'}],
    [{col:2,row:8,type:'pla_cdr'},{col:4,row:8,type:'pla'},{col:6,row:8,type:'pla'},{col:8,row:8,type:'pla_cdr'},{col:3,row:9,type:'pla'},{col:7,row:9,type:'pla'}],
  ],
  initialEnemies: [],
  roundEvents: {},
  narratives: {
    1:  '21 September 1965 · 03:00 — 3 Jat Regiment crosses the start line in darkness.',
    2:  'The searchlights come on. 3 Jat does not stop.',
    3:  'Compound walls breached. Room-to-room fighting in the dark.',
    4:  '22 September · Dawn. Dograi is taken. 3 Jat holds the village.',
  },
  histCards: {
    1: {
      name:  'Lt Col Desmond Hayde MVC',
      rank:  '3 Jat Regiment · Dograi, September 1965',
      body:  'Lt Col Desmond Hayde led the night assault on Dograi in person, advancing alongside his batman when radio communications failed. 3 Jat Regiment attacked a prepared Pakistani position at 03:00 with fixed bayonets. They captured Dograi and held it against counterattacks. Hayde was awarded the Maha Vir Chakra.',
    },
    3: {
      name:  'The Battle of Dograi',
      rank:  '3 Jat Regiment · 21–22 September 1965',
      body:  'The capture of Dograi by 3 Jat Regiment is considered one of the finest infantry actions of the 1965 war. The regiment attacked at night, breached compound walls, and fought room to room. The battle is taught at military academies as a model night assault. The regiment\'s battle honour: DOGRAI.',
    },
  },
  winCondition:  {type:'waves'},
  defensiveAI:   false,
  autoPlayForceWin: true,
  autoPlayStyle: 'offensive',
  enemyLabels:   {pla:'Pakistani Infantry', pla_cdr:'Pakistani Officer', pla_tank:'Bunker Crew'},
  enemyBio:      'Pakistani garrison defending Dograi village with prepared positions and bunkers.',
  introMeta:     '1965 · DOGRAI · LAHORE SECTOR',
  introText:     `3 Jat Regiment — night assault on Dograi village, Lahore sector.<br>03:00. No radio. Searchlights. Bayonets fixed.<br><br><strong style="color:#c8a96e;">OBJECTIVE</strong><br>Break through three Pakistani defensive waves and capture Dograi.<br><br><strong style="color:#c8a96e;">HOW TO PLAY</strong><br>Click a unit to select. <span style="color:#4488ff;">Blue</span> = move. <span style="color:#ff5555;">Red</span> = attack.<br>Advance through the compound walls — speed is your cover.`,
  debriefWin:    'DOGRAI TAKEN — JO BOLE SO NIHAAL',
  debriefLoss:   'THE ASSAULT IS REPULSED',
  debriefHistory:'The Battle of Dograi (21–22 September 1965) is one of the most celebrated infantry actions of the 1965 Indo-Pakistani War. 3 Jat Regiment captured a prepared defensive position in a night assault, fighting room to room through the village. Lt Col Desmond Hayde was awarded the Maha Vir Chakra. The regiment\'s battle honour DOGRAI is worn to this day.',
};
