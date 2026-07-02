// Battle of Tololing — June 1999 (Kargil War)
// 2 Rajputana Rifles | Assault on Pakistani-held ridgeline at 16,962 ft
export default {
  terrain: {
    'P': {color:0x2a2a30,height:4.0,block:true},
    'R': {color:0x383840,height:3.0,block:true},
    'b': {color:0x4a3a38,height:1.8,def:2.5,mov:1},
    'r': {color:0x5a5050,height:1.5,def:1.3,mov:2},
    'i': {color:0x88aacc,height:1.2,def:0.8,mov:2},
    '.': {color:0x6a6060,height:1.0,def:1.0,mov:1},
  },
  map: [
    ['P','P','P','P','R','R','R','P','P','P','P'],
    ['P','P','P','R','b','.','b','R','P','P','P'],
    ['P','P','R','r','.','.','.','r','R','P','P'],
    ['P','P','R','r','.','.','.','r','R','P','P'],
    ['P','R','R','r','i','i','i','r','R','R','P'],
    ['P','R','r','r','i','i','i','r','r','R','P'],
    ['P','R','r','.','.','.','.','.','r','R','P'],
    ['P','R','r','.','.','.','.','.','r','R','P'],
    ['P','P','R','r','.','.','.','r','R','P','P'],
    ['P','P','P','R','.','.','.','R','P','P','P'],
  ],
  structures: {
    '4,1':{type:'sangar',label:'Pakistani Bunker',atkMul:1.0,defMul:2.5,rngBonus:1},
    '6,1':{type:'sangar',label:'Pakistani Bunker',atkMul:1.0,defMul:2.5,rngBonus:1},
  },
  indStarts: [
    {col:5,row:8,type:'hero',       name:'Maj Vivek Gupta',   platoon:0,bio:'Led the Tololing assault. First to reach the ridge. Param Vir Chakra nominee.'},
    {col:4,row:8,type:'section_cdr',name:'Lt Balwan Singh',   platoon:9,bio:'Breached the first Pakistani defensive line. Continued despite wounds.'},
    {col:6,row:8,type:'section_cdr',name:'Lt Dinesh Kumar',   platoon:8,bio:'Eastern assault. Climbed 2,000 ft under fire without stopping.'},
    {col:4,row:9,type:'rifleman',   name:'Rfn Vikram Singh',  platoon:9,bio:'Assault section. Carried extra ammunition up the ridge under fire.'},
    {col:5,row:9,type:'rifleman',   name:'Rfn Subedar Yadav', platoon:0,bio:'Point man on the final push to the summit.'},
    {col:6,row:9,type:'rifleman',   name:'Rfn Arjun Ram',     platoon:8,bio:'Covered the eastern flank during the summit assault.'},
  ],
  plaWaves: [],
  initialEnemies: [
    {col:4,row:1,type:'pla_cdr'},{col:6,row:1,type:'pla_cdr'},
    {col:4,row:2,type:'pla'},{col:5,row:2,type:'pla'},{col:6,row:2,type:'pla'},
    {col:5,row:3,type:'pla'},{col:4,row:3,type:'pla'},
  ],
  narratives: {
    1: 'June 1999 · 03:00 hrs — 2 Rajputana Rifles begins the assault on Tololing.',
    3: 'Pakistani fire intensifies from the bunkers. Uphill under machine gun fire.',
    5: 'Close-quarter fighting. The summit is in sight.',
    7: 'The Tricolour is raised at Tololing — 16,962 ft.',
  },
  histCards: {
    1: {
      name:  'Capt Manoj Kumar Pandey',
      rank:  '1/11 Gorkha Rifles · Kargil 1999',
      medal: 'Param Vir Chakra — Posthumous',
      // Born 25 Jun 1975, died 3 Jul 1999 — age 24. Unit confirmed: 1/11 Gorkha Rifles.
      body:  'Though from an adjacent unit in the Kargil campaign, Pandey\'s example inspired the Tololing assault. He cleared four enemy positions singlehandedly at Khalubar before falling. At 24, he was one of the youngest PVC recipients in the Kargil War.',
    },
    3: {
      name:  'Lt Saurav Kalia',
      rank:  '4 Jat Regiment · Kargil 1999',
      medal: 'Sena Medal (Posthumous — disputed)',
      body:  'The first reported Indian prisoner of the Kargil conflict, captured with 5 soldiers in April 1999 after being outflanked. His fate shocked the nation and deepened Indian resolve throughout Operation Vijay. His family\'s fight for justice continues.',
    },
    5: {
      name:  'Operation Vijay',
      rank:  'May–July 1999 · Historical Context',
      body:  'India recaptured all Kargil peaks by July 26 1999, now celebrated as Kargil Vijay Diwas. Over 527 Indian soldiers died. Tololing was the first major peak retaken on June 13 1999, proving night-assault tactics viable on near-vertical terrain. Pakistan has never officially acknowledged their regulars were involved.',
    },
  },
  winCondition:  {type:'waves'},
  defensiveAI:   true,
  enemyLabels:   {pla:'Pak NLI Soldier', pla_cdr:'Pak NLI Officer'},
  enemyBio:      'Pakistan Northern Light Infantry. Entrenched at 16,962 ft.',
  introMeta:     '1999 · KARGIL · 16,962 FT',
  introText:     `2 Rajputana Rifles — assaulting the Tololing ridgeline.<br>Pakistani Northern Light Infantry holds entrenched positions at the peak.<br><br><strong style="color:#c8a96e;">OBJECTIVE</strong><br>Assault uphill. Reach and eliminate all Pakistani defenders at the summit.<br><br><strong style="color:#c8a96e;">HOW TO PLAY</strong><br>Click a unit to select. <span style="color:#4488ff;">Blue</span> = move. <span style="color:#ff5555;">Red</span> = attack.<br>Ice terrain slows movement. Enemy bunkers have +2.5× defense — plan carefully.`,
  debriefWin:    'TOLOLING TAKEN',
  debriefLoss:   'THE ASSAULT HAS FAILED',
  debriefHistory:'Tololing was captured on June 13, 1999. It was the first major peak retaken in the Kargil War. The Tricolour was raised at 16,962 ft. Operation Vijay ended July 26, 1999 — now celebrated as Kargil Vijay Diwas.',
};
