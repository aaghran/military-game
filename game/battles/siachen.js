// Battle of Bana Post — June 1987 · Siachen Conflict
// 19 JAK RIF | Assault on Pakistani "Quaid Post" at 21,153 ft (6,447m)
// Naib Subedar Bana Singh led a 3-man team up a 70° ice wall under fire.
// He was awarded the Param Vir Chakra — the only living PVC recipient at the time.
export default {
  terrain: {
    'P': {color:0x1a1a20,height:4.5,block:true},   // vertical rock face — impassable
    'R': {color:0x2a2a32,height:3.5,block:true},   // rocky peak
    'b': {color:0x3c3028,height:2.0,def:3.0,mov:1},// fortified bunker position
    'f': {color:0x4a4040,height:1.8,def:2.0,mov:2},// frozen rocky ledge
    'i': {color:0x6a8ab0,height:1.4,def:0.7,mov:3},// 70° ice face — brutal climb
    'g': {color:0x8ab0d0,height:1.0,def:0.8,mov:2},// glacier approach
    '.': {color:0x9ab8cc,height:0.7,def:1.0,mov:1},// snow field
  },
  map: [
    ['P','P','P','R','b','b','b','R','P','P','P'],
    ['P','P','R','f','b','.','b','f','R','P','P'],
    ['P','P','R','f','f','.','f','f','R','P','P'],
    ['P','R','i','i','f','f','f','i','i','R','P'],
    ['P','R','i','i','i','f','i','i','i','R','P'],
    ['P','R','i','i','i','i','i','i','i','R','P'],
    ['P','R','g','i','i','i','i','i','g','R','P'],
    ['P','R','g','g','g','g','g','g','g','R','P'],
    ['P','P','R','.','.','.','.','.','R','P','P'],
    ['P','P','P','.','.','.','.','.','P','P','P'],
  ],
  structures: {
    '4,0':{type:'sangar',label:'Quaid Bunker Alpha',atkMul:1.0,defMul:3.5,rngBonus:2},
    '6,0':{type:'sangar',label:'Quaid Bunker Bravo',atkMul:1.0,defMul:3.5,rngBonus:2},
    '5,1':{type:'sangar',label:'Quaid Post HQ',     atkMul:1.0,defMul:2.5,rngBonus:1},
  },
  indStarts: [
    {col:5,row:8,type:'hero',       name:'Nb Sub Bana Singh',  platoon:0,bio:'Param Vir Chakra. Led the 3-man assault team up the ice wall. Climbed 457m at 70° gradient under direct fire. Stormed the summit and held it.'},
    {col:4,row:8,type:'section_cdr',name:'Hav Chander Singh',  platoon:9,bio:'Right assault element. Covered the western approach during the ice wall climb.'},
    {col:6,row:8,type:'section_cdr',name:'Hav Fateh Singh',    platoon:9,bio:'Left assault element. Secured the base of the ice wall for the assault team.'},
    {col:4,row:9,type:'rifleman',   name:'Rfn Durga Prasad',   platoon:9,bio:'Carried extra ammunition 6,000m up the glacier approach under altitude stress.'},
    {col:5,row:9,type:'rifleman',   name:'Rfn Vikram Singh',   platoon:9,bio:'Point man on the ice face. First to reach the ledge below the bunkers.'},
    {col:6,row:9,type:'rifleman',   name:'Rfn Arjun Lal',      platoon:9,bio:'Covered the withdrawal route. Held the glacier line while the assault team climbed.'},
  ],
  plaWaves: [],
  initialEnemies: [
    {col:4,row:0,type:'pla_cdr'},
    {col:6,row:0,type:'pla_cdr'},
    {col:5,row:1,type:'pla'},
    {col:4,row:2,type:'pla'},
    {col:6,row:2,type:'pla'},
    {col:5,row:3,type:'pla'},
  ],
  narratives: {
    1: 'June 1987 · 21,153 ft — Bana Singh\'s team moves up the Siachen Glacier under cover of night.',
    3: 'The ice wall begins. 70° gradient. Every step under Pakistani fire from above.',
    5: 'Bana Singh reaches the ledge below the bunkers. The post is in sight.',
    7: 'The Tricolour is raised at Bana Post — the highest battlefield on earth.',
  },
  histCards: {
    1: {
      name:  'Naib Subedar Bana Singh',
      rank:  '19 JAK RIF (Jammu & Kashmir Rifles)',
      medal: 'Param Vir Chakra',
      body:  'At 21,153 ft, Bana Singh led three soldiers up a 457-metre ice wall at a 70° gradient while under direct Pakistani fire. He stormed the bunker position that had been considered impregnable. Quaid Post became Bana Post. He was one of very few living PVC recipients.',
    },
    3: {
      name:  'Siachen Conflict',
      rank:  'April 1984 – Ongoing · Historical Context',
      body:  'Operation Meghdoot (April 13, 1984) — India airlifted troops to the Siachen Glacier before Pakistan could act, securing the world\'s highest battlefield. India now controls the Saltoro Ridge and all three key passes: Sia La, Bilafond La, and Gyong La. Temperatures reach −60°C. More soldiers have died of altitude and cold than in combat.',
    },
    5: {
      name:  'Operation Meghdoot',
      rank:  '13 April 1984 · Indian Army',
      body:  'India launched Operation Meghdoot when intelligence revealed Pakistan was planning to occupy the Siachen Glacier. The Indian Army\'s rapid heliborne insertion secured all three Saltoro passes before Pakistani forces arrived. The glacier has been under Indian control ever since — though at enormous cost in lives and logistics.',
    },
  },
  winCondition:  {type:'waves'},
  defensiveAI:   true,
  enemyLabels:   {pla:'Pak NLI Soldier', pla_cdr:'Pak SSG Officer'},
  enemyBio:      'Pakistan Special Services Group and NLI troops. Entrenched at 21,153 ft.',
  introMeta:     '1987 · SIACHEN · 21,153 FT',
  introText:     `19 JAK RIF — assaulting Pakistani "Quaid Post" at 21,153 ft.<br>The world\'s highest battlefield. 70° ice face. Temperature: −40°C.<br><br><strong style="color:#c8a96e;">OBJECTIVE</strong><br>Climb the ice wall. Reach and eliminate all Pakistani defenders.<br><br><strong style="color:#c8a96e;">HOW TO PLAY</strong><br>Click a unit to select. <span style="color:#4488ff;">Blue</span> = move. <span style="color:#ff5555;">Red</span> = attack.<br>Ice face (mov 3) and glacier (mov 2) will slow every step. Plan your route.`,
  debriefWin:    'BANA POST TAKEN',
  debriefLoss:   'THE ASSAULT HAS FAILED',
  debriefHistory:'Naib Subedar Bana Singh stormed Quaid Post in June 1987, earning the Param Vir Chakra. The post was renamed Bana Post in his honour. He remained one of very few living PVC recipients for decades.',
};
