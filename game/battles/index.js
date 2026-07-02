import saragarhi from './saragarhi.js';
import haifa     from './haifa.js';
import kohima    from './kohima.js';
import rezangLa  from './rezang-la.js';
import asalUttar from './asal-uttar.js';
import dograi    from './dograi.js';
import longewala from './longewala.js';
import siachen   from './siachen.js';
import tololing  from './tololing.js';
import sindoor   from './operation-sindoor.js';

export const BATTLE_DATA = {
  'Saragarhi':        saragarhi,
  'Haifa':            haifa,
  'Kohima':           kohima,
  'Rezang La':        rezangLa,
  'Asal Uttar':       asalUttar,
  'Dograi':           dograi,
  'Longewala':        longewala,
  'Siachen':          siachen,
  'Tololing':         tololing,
  'Operation Sindoor':sindoor,
};

// Regiment identity — motto, war cry, regimental colour (Paltan identity)
export const BATTLES = [
  {
    name:         'Saragarhi',
    year:         1897,
    regiment:     '36th Sikh Infantry',
    regimentFull: '36th Sikh Infantry · Now 4th Battalion, Sikh Regiment',
    color:        '#c8a030',
    regimentColor:'#c87a18',   // saffron
    colorName:    'Saffron & Navy Blue',
    motto:        'Nischay Kar Apni Jeet Karo',
    mottoEng:     'With determination, achieve your victory',
    warCry:       'Jo Bole So Nihaal, Sat Sri Akal!',
    insignia:     'Khanda (double-edged sword) on saffron ground',
    insigniaFile: 'assets/insignia/sikh.svg',
    unlocked:     true,
    sub:          'September 1897. A mud-brick signal post. 10,000 Pashtun warriors. The 21 men of Saragarhi chose to fight — and bought the empire a day.',
    regimentBio:  'The 36th Sikh Infantry was raised in 1887 as part of the frontier garrison — one of many Sikh regiments that formed the backbone of the northwest frontier. By 1897 they had earned a reputation as the most disciplined soldiers on the Khyber line. Their fighting spirit drew from the Sikh martial tradition: Chardi Kala — eternal optimism, the warrior\'s refusal to accept defeat. When they were posted to Saragarhi, they were not an elite unit. They were ordinary soldiers of an ordinary regiment. What they did on 12 September 1897 was not ordinary.',
    debriefLegacy:'The 36th Sikh Infantry became the 4th Battalion, Sikh Regiment — one of the most decorated units in the Indian Army. 12 September is commemorated annually as Saragarhi Day. A memorial stands at Ferozepur, Punjab. The British Parliament passed a resolution in their honour. Victoria Crosses were awarded posthumously. Their names are carved in stone.',
    insigniaSvg: (c)=>`<svg viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="52" r="22" stroke="${c}" stroke-width="1.8" opacity="0.7"/>
      <path d="M17,30 C19,42 21,56 23,76" stroke="${c}" stroke-width="1.6" stroke-linecap="round" opacity="0.8"/>
      <path d="M63,30 C61,42 59,56 57,76" stroke="${c}" stroke-width="1.6" stroke-linecap="round" opacity="0.8"/>
      <path d="M40,10 L44,46 L40,56 L36,46 Z" fill="${c}"/>
      <path d="M32,53 L48,53 L46,58 L34,58 Z" fill="${c}"/>
      <rect x="38" y="58" width="4" height="13" rx="1" fill="${c}"/>
      <rect x="35" y="69" width="10" height="4" rx="1" fill="${c}"/>
      <path d="M28,88 L40,80 L52,88 L48,92 L40,86 L32,92 Z" fill="${c}" opacity="0.6"/>
    </svg>`,
  },
  {
    name: 'Haifa', year: 1918,
    regiment: 'Jodhpur Lancers & Mysore Lancers',
    regimentFull: 'Jodhpur Lancers & Mysore Lancers · Imperial Service Cavalry',
    color: '#c8a030', regimentColor: '#c87a18',
    colorName: 'Gold & Crimson',
    motto: 'Rann Banka Rathore', mottoEng: 'The Rathore is brave in battle',
    warCry: 'Jai Jodhana! Vande Mataram!',
    insignia: 'Crossed lances on royal blue',
    regimentBio: 'The Jodhpur Lancers and Mysore Lancers were part of the Indian Imperial Service Cavalry. On 23 September 1918 they executed one of the last great cavalry charges in history, capturing the city of Haifa from Ottoman and German forces in under three hours. India celebrates 23 September as Haifa Day.',
    debriefLegacy: 'A road in Tel Aviv bears their name. The charge is taught at cavalry schools worldwide.',
    insigniaSvg: (c) => `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="36" fill="none" stroke="${c}" stroke-width="2"/><line x1="20" y1="60" x2="60" y2="20" stroke="${c}" stroke-width="3"/><line x1="60" y1="60" x2="20" y2="20" stroke="${c}" stroke-width="3"/><circle cx="40" cy="40" r="6" fill="${c}"/></svg>`,
    insigniaFile: 'assets/insignia/haifa.svg',
    unlocked: true,
    sub: '23 September 1918. Haifa, Ottoman Palestine. The Jodhpur and Mysore Lancers charged across open ground under machine-gun fire — one of the last great cavalry charges in history.',
  },
  {
    name: 'Kohima', year: 1944,
    regiment: 'Assam Regiment & Rajput Regiment',
    regimentFull: 'Assam Regiment & Rajput Regiment · 1944 Burma Campaign',
    color: '#4a8a30', regimentColor: '#3a7a20',
    colorName: 'Jungle Green',
    motto: 'Nagaland Forever', mottoEng: 'The Hills Remember',
    warCry: 'Jai Hind!',
    insignia: 'Crossed khukris on jungle green',
    regimentBio: 'The garrison at Kohima held against the full weight of the Japanese 31st Division from 4 April 1944. For 15 days, 1,500 soldiers — Indian, British, and Naga — held 15,000 Japanese at bay on a tennis court in Nagaland. The Japanese never passed.',
    debriefLegacy: '"When you go home, tell them of us and say — for your tomorrow, we gave our today." The Kohima Epitaph.',
    insigniaSvg: (c) => `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="36" fill="none" stroke="${c}" stroke-width="2"/><rect x="28" y="22" width="24" height="36" rx="2" fill="none" stroke="${c}" stroke-width="2"/><line x1="28" y1="40" x2="52" y2="40" stroke="${c}" stroke-width="1.5"/></svg>`,
    insigniaFile: 'assets/insignia/kohima.svg',
    unlocked: true,
    sub: 'April 1944. Nagaland. A tennis court. Japanese and Indian positions 15 metres apart. 1,500 held 15,000. The Japanese never passed.',
  },
  {
    name:         'Rezang La',
    year:         1962,
    regiment:     '13 Kumaon',
    regimentFull: '13th Battalion, Kumaon Regiment',
    color:        '#3a7a48',
    regimentColor:'#2a5a38',   // forest green
    colorName:    'Black & Green',
    motto:        'Yuddhaya Krit Nischaya',
    mottoEng:     'Resolved to fight',
    warCry:       'Kalika Mata Ki Jai!',
    insignia:     'Crossed kukris above "Kumaon" scroll',
    insigniaFile: 'assets/insignia/kumaon.svg',
    unlocked:     true,
    sub:          '−20°C. 16,000 ft. No artillery, no air cover. 114 men of C Company held Rezang La against a full PLA division. Not one retreated.',
    regimentBio:  'The Kumaon Regiment draws its identity from the hills of Uttarakhand — men who have soldiered in some of the most unforgiving terrain on earth for centuries. Raised formally in 1945, C Company of 13 Kumaon were not specialists flown in for a mission. They were the garrison of Rezang La because that was their posting. They had no artillery, no air support, and no reinforcement route. They had their rifles, their Bren guns, their training, and each other.',
    debriefLegacy:'Major Shaitan Singh received the Param Vir Chakra — posthumously. The bodies of C Company were found frozen at their posts, in firing position, when the snow thawed in spring 1963. 113 of 114 died. One survived. The Rezang La war memorial stands on the battlefield at 16,000 ft. The battle honour "Rezang La" is inscribed on 13 Kumaon\'s colours. The regiment continues to serve.',
    insigniaSvg: (c)=>`<svg viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40,8 L58,34 L22,34 Z" stroke="${c}" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M40,8 L47,20 L40,24 L33,20 Z" fill="${c}" opacity="0.5"/>
      <line x1="40" y1="34" x2="40" y2="42" stroke="${c}" stroke-width="1.4" opacity="0.6"/>
      <path d="M18,48 C22,50 32,53 40,53 C48,53 58,50 62,48 C60,60 54,70 46,74 L40,76 L34,74 C26,70 20,60 18,48 Z" stroke="${c}" stroke-width="1.8" fill="none"/>
      <path d="M18,48 C22,50 32,53 40,53 C48,53 58,50 62,48" stroke="${c}" stroke-width="1.2" opacity="0.4"/>
      <path d="M62,48 C60,60 54,70 46,74 L40,76 L34,74 C26,70 20,60 18,48" stroke="${c}" stroke-width="1.6"/>
      <line x1="30" y1="47" x2="28" y2="75" stroke="${c}" stroke-width="1.4" opacity="0.7"/>
      <line x1="50" y1="47" x2="52" y2="75" stroke="${c}" stroke-width="1.4" opacity="0.7"/>
      <circle cx="22" cy="84" r="2.5" fill="${c}" opacity="0.7"/>
      <circle cx="40" cy="88" r="2.5" fill="${c}" opacity="0.7"/>
      <circle cx="58" cy="84" r="2.5" fill="${c}" opacity="0.7"/>
    </svg>`,
  },
  {
    name: 'Asal Uttar', year: 1965,
    regiment: 'Poona Horse & 3 Cavalry',
    regimentFull: '17th Horse (Poona Horse) · 4th Horse · 3rd Cavalry',
    color: '#c8a030', regimentColor: '#b89020',
    colorName: 'Black & Gold',
    motto: 'Sawari Aur Talwar', mottoEng: 'Cavalry and Sword',
    warCry: 'Ek Bar Aur! (One More Time!)',
    insignia: 'Centurion tank on gold field',
    regimentBio: 'The Poona Horse (17th Horse) and its sister regiments destroyed the Pakistani 1st Armoured Division at Asal Uttar in September 1965. 97 Pakistani M48 Patton tanks were captured or destroyed in the paddy fields of Khem Karan. The field is called "Patton Nagar" to this day.',
    debriefLegacy: 'Two Param Vir Chakras. 97 Pattons in the paddy. The Poona Horse battle cry: "Ek Bar Aur."',
    insigniaSvg: (c) => `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="36" fill="none" stroke="${c}" stroke-width="2"/><rect x="24" y="34" width="32" height="14" rx="3" fill="none" stroke="${c}" stroke-width="2"/><line x1="52" y1="41" x2="66" y2="41" stroke="${c}" stroke-width="2.5"/><circle cx="32" cy="50" r="5" fill="none" stroke="${c}" stroke-width="1.5"/><circle cx="48" cy="50" r="5" fill="none" stroke="${c}" stroke-width="1.5"/></svg>`,
    insigniaFile: 'assets/insignia/asal-uttar.svg',
    unlocked: true,
    sub: 'September 1965. Khem Karan, Punjab. Centurion vs Patton. 97 Pakistani tanks destroyed in the paddy fields. "Patton Nagar."',
  },
  {
    name: 'Dograi', year: 1965,
    regiment: '3 Jat Regiment',
    regimentFull: '3rd Battalion, Jat Regiment · Lahore Sector, 1965',
    color: '#8a6030', regimentColor: '#7a5020',
    colorName: 'Khaki & Maroon',
    motto: 'Jai Jawan Jai Kisan', mottoEng: 'Hail the Soldier, Hail the Farmer',
    warCry: 'Jat Balwan! Jai Bhagwan!',
    insignia: 'Bayonet on maroon ground',
    regimentBio: 'The 3 Jat Regiment captured Dograi village in a night assault on 21 September 1965. Lt Col Desmond Hayde led the attack personally when radios failed, advancing through compound walls in darkness. The battle is taught as a model night assault at military academies. Battle honour: DOGRAI.',
    debriefLegacy: 'DOGRAI — embroidered on the Regimental Colour. Worn with pride to this day.',
    insigniaSvg: (c) => `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="36" fill="none" stroke="${c}" stroke-width="2"/><line x1="40" y1="15" x2="40" y2="65" stroke="${c}" stroke-width="2.5"/><line x1="40" y1="22" x2="50" y2="32" stroke="${c}" stroke-width="2.5"/></svg>`,
    insigniaFile: 'assets/insignia/dograi.svg',
    unlocked: true,
    sub: '03:00, 21 September 1965. No radio. Fixed bayonets. 3 Jat Regiment stormed Dograi in darkness — room to room, compound to compound.',
  },
  {
    name:         'Longewala',
    year:         1971,
    regiment:     '23 Punjab',
    regimentFull: '23rd Battalion, Punjab Regiment',
    color:        '#5880c0',
    regimentColor:'#8a2020',   // crimson
    colorName:    'Crimson & Navy',
    motto:        'Badhte Chalo',
    mottoEng:     'Keep moving forward',
    warCry:       'Bole So Nihal, Sat Sri Akal!',
    insignia:     'Crossed swords beneath a star on crimson ground',
    insigniaFile: 'assets/insignia/punjab.svg',
    unlocked:     true,
    sub:          'Midnight, December 1971. Pakistani tanks crossed the border. Major Chandpuri\'s 120 men were told to withdraw. They chose to hold instead.',
    regimentBio:  'The Punjab Regiment is among the oldest in the Indian Army — its lineage traced to irregular cavalry units of the 1840s. By 1971, 23 Punjab was a seasoned line infantry battalion posted to the Thar Desert sector, considered a quiet posting. No one expected Pakistan to send an armoured brigade across the desert. When they did, A Company had no anti-tank guns and a choice to make. Standing orders allowed Major Chandpuri to withdraw. He chose not to.',
    debriefLegacy:'The Punjab Regiment has the longest battle honours list of any regiment in the Indian Army. Longewala is inscribed on their colours. Major Chandpuri received the Maha Vir Chakra. 36 Pakistani tanks and 100+ vehicles were destroyed in the open desert at first light. The post at Longewala still stands. The film Border (1997) dramatised the battle.',
    insigniaSvg: (c)=>`<svg viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40,10 L44,14 L44,36 L48,36 L40,46 L32,36 L36,36 L36,14 Z" fill="${c}" opacity="0.9"/>
      <path d="M40,10 L44,14 L44,36 L48,36 L40,46 L32,36 L36,36 L36,14 Z" stroke="${c}" stroke-width="0.5" fill="${c}"/>
      <path d="M23,22 L27,26 L27,44 L31,44 L23,54 L15,44 L19,44 L19,26 Z" fill="${c}" opacity="0.65"/>
      <path d="M57,22 L61,26 L61,44 L65,44 L57,54 L49,44 L53,44 L53,26 Z" fill="${c}" opacity="0.65"/>
      <ellipse cx="40" cy="68" rx="18" ry="5" stroke="${c}" stroke-width="1.4" opacity="0.5"/>
      <line x1="40" y1="63" x2="40" y2="73" stroke="${c}" stroke-width="1.4"/>
      <circle cx="40" cy="80" r="6" stroke="${c}" stroke-width="1.6"/>
      <circle cx="40" cy="80" r="2" fill="${c}"/>
      <path d="M37,77 L43,77 M40,74 L40,77 M40,83 L40,86 M37,83 L43,83" stroke="${c}" stroke-width="1"/>
    </svg>`,
  },
  {
    name:         'Siachen',
    year:         1987,
    regiment:     '19 JAK RIF',
    regimentFull: '19th Battalion, Jammu & Kashmir Rifles',
    color:        '#4a7aa0',
    regimentColor:'#2a4a20',   // rifle green
    colorName:    'Rifle Green',
    motto:        'Paharon Ki Tareh Mazbooth',
    mottoEng:     'Firm as the mountains',
    warCry:       'Durga Mata Ki Jai!',
    insignia:     'Mountain peak above crossed rifles on rifle green ground',
    insigniaFile: 'assets/insignia/jak-rif.svg',
    unlocked:     true,
    sub:          'The world\'s highest battlefield. A post everyone said was impregnable. Naib Subedar Bana Singh climbed 457 metres of ice to prove them wrong.',
    regimentBio:  'The Jammu & Kashmir Rifles were raised in 1947 from the soldiers of the former J&K State Forces — men who had spent their lives in the Himalaya and Karakoram. 19 JAK RIF were at Siachen because they belonged there. When Operation Meghdoot secured the glacier for India in 1984, JAK RIF units formed the permanent garrison, living at altitude year-round in conditions that broke most soldiers. Naib Subedar Bana Singh was one of them. In June 1987, he was assigned a task his officers described as near impossible.',
    debriefLegacy:'Naib Subedar Bana Singh was awarded the Param Vir Chakra, making him the only living PVC recipient at the time. Quaid Post was renamed Bana Post. It remains the highest permanently occupied military post on earth. The Siachen Glacier has been under Indian control since 1984. The cost: more soldiers have died from altitude and cold than from enemy action.',
    insigniaSvg: (c)=>`<svg viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40,10 L60,44 L40,36 L20,44 Z" stroke="${c}" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M40,10 L48,28 L40,36 L32,28 Z" fill="${c}" opacity="0.5"/>
      <line x1="20" y1="50" x2="38" y2="50" stroke="${c}" stroke-width="2" stroke-linecap="round"/>
      <line x1="42" y1="50" x2="60" y2="50" stroke="${c}" stroke-width="2" stroke-linecap="round"/>
      <line x1="30" y1="44" x2="26" y2="68" stroke="${c}" stroke-width="1.6" stroke-linecap="round"/>
      <line x1="50" y1="44" x2="54" y2="68" stroke="${c}" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M24,60 L30,56 L38,60" stroke="${c}" stroke-width="1.4" stroke-linecap="round" opacity="0.7"/>
      <path d="M56,60 L50,56 L42,60" stroke="${c}" stroke-width="1.4" stroke-linecap="round" opacity="0.7"/>
      <ellipse cx="40" cy="78" rx="14" ry="6" stroke="${c}" stroke-width="1.6"/>
      <line x1="40" y1="72" x2="40" y2="68" stroke="${c}" stroke-width="1.4"/>
      <line x1="26" y1="78" x2="54" y2="78" stroke="${c}" stroke-width="1" opacity="0.4"/>
    </svg>`,
  },
  {
    name:         'Tololing',
    year:         1999,
    regiment:     '2 Rajputana Rifles',
    regimentFull: '2nd Battalion, Rajputana Rifles',
    color:        '#b04040',
    regimentColor:'#6a1a1a',   // deep red
    colorName:    'Dark Green & Red',
    motto:        'Sarvatra Vijay',
    mottoEng:     'Victory everywhere',
    warCry:       'Rajputana Rifles Ki Jai!',
    insignia:     'Ram\'s head (Mewar emblem) on dark green ground',
    insigniaFile: 'assets/insignia/rajputana.svg',
    unlocked:     true,
    sub:          'Pakistan held the heights. The plan: assault uphill, at night, on near-vertical rock. 2 Rajputana Rifles began climbing at 03:00 hrs.',
    regimentBio:  'The Rajputana Rifles are among the most decorated regiments in the Indian Army — raised in 1921 from the fighting men of Rajasthan. Their motto, Sarvatra Vijay — Victory Everywhere — is not a boast. It is a record. In June 1999, 2 Rajputana Rifles was tasked with retaking Tololing, a near-vertical ridgeline at 16,962 ft held by entrenched Pakistani forces. The plan called for a night climb up bare rock under direct fire. The battalion\'s commanding officer knew the casualties would be severe. They climbed anyway.',
    debriefLegacy:'Tololing was the first major Kargil peak retaken, on 13 June 1999. The Tricolour was raised at 16,962 ft. 2 Rajputana Rifles lost several officers in the assault. The battle became the template for subsequent Kargil recaptures. 26 July 1999 is celebrated as Kargil Vijay Diwas. The regiment continues to serve on India\'s most contested frontiers.',
    insigniaSvg: (c)=>`<svg viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="38" rx="20" ry="14" stroke="${c}" stroke-width="1.8"/>
      <path d="M28,30 C30,26 34,24 40,24 C46,24 50,26 52,30" stroke="${c}" stroke-width="2" stroke-linecap="round"/>
      <path d="M28,30 C26,34 26,38 28,44 C32,50 36,52 40,52 C44,52 48,50 52,44 C54,38 54,34 52,30" stroke="${c}" stroke-width="1.6" fill="none"/>
      <circle cx="34" cy="36" r="3" stroke="${c}" stroke-width="1.4"/>
      <circle cx="46" cy="36" r="3" stroke="${c}" stroke-width="1.4"/>
      <circle cx="34" cy="36" r="1" fill="${c}"/>
      <circle cx="46" cy="36" r="1" fill="${c}"/>
      <path d="M36,44 C37,46 38,47 40,47 C42,47 43,46 44,44" stroke="${c}" stroke-width="1.4" stroke-linecap="round"/>
      <path d="M14,64 L26,56 L40,60 L54,56 L66,64" stroke="${c}" stroke-width="1.8" stroke-linejoin="round" opacity="0.7"/>
      <path d="M20,74 L28,68 L40,71 L52,68 L60,74" stroke="${c}" stroke-width="1.6" stroke-linejoin="round" opacity="0.5"/>
      <line x1="40" y1="52" x2="40" y2="60" stroke="${c}" stroke-width="1.4" opacity="0.6"/>
      <path d="M26,88 L40,82 L54,88" stroke="${c}" stroke-width="1.6" stroke-linecap="round" opacity="0.6"/>
    </svg>`,
  },
  {
    name:         'Operation Sindoor',
    year:         2025,
    regiment:     'Army Air Defence Corps',
    regimentFull: 'S-400 Triumf Battery · Army Air Defence Corps, Adampur',
    color:        '#3a7ab8',
    regimentColor:'#1a4a78',   // air defence blue
    colorName:    'Air Defence Blue',
    motto:        'Akash Raksha',
    mottoEng:     'Defence of the Skies',
    warCry:       'Jai Hind!',
    insignia:     'Crossed missiles above a radar dish on blue ground',
    insigniaFile: 'assets/insignia/aada.svg',
    unlocked:     true,
    sub:          '10 May 2025. Pakistani drones, missiles, and JF-17s inbound. The S-400 has never fired in combat. Tonight it does.',
    regimentBio:  'The Army Air Defence Corps was established in 1994, consolidating India\'s ground-based air defence under a single command. By 2025, AADA operated the most sophisticated multi-layered air defence architecture in Asia: S-400 Triumf at the strategic layer, Akash and Spyder at medium range, MANPAD teams for close-in defence. The batteries at Adampur, Bhuj, and Bikaner had never fired in combat. On 10 May 2025, Pakistan launched Operation Bunyan-um-Marsoos — 26 targets, ballistic missiles, cruise missiles, drone swarms. AADA was ready.',
    debriefLegacy:'The 2025 conflict marked the first confirmed combat use of the S-400 Triumf outside Russia-Ukraine, and the first major combat deployment of India\'s Akash system. India\'s multi-layered intercept performance was assessed as highly effective. The Army Air Defence Corps emerged with a combat-proven record. A US-brokered ceasefire was reached on 10 May 2025 at 17:00 IST.',
    insigniaSvg: (c)=>`<svg viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M28,58 L22,8 L26,8 L32,52 Z" fill="${c}" opacity="0.85"/>
      <path d="M22,8 L28,4 L26,8 Z" fill="${c}"/>
      <path d="M20,52 L28,58 L22,60 Z" fill="${c}" opacity="0.6"/>
      <path d="M52,58 L58,8 L54,8 L48,52 Z" fill="${c}" opacity="0.85"/>
      <path d="M58,8 L52,4 L54,8 Z" fill="${c}"/>
      <path d="M60,52 L52,58 L58,60 Z" fill="${c}" opacity="0.6"/>
      <path d="M40,54 L22,60 L58,60 Z" stroke="${c}" stroke-width="1.4" fill="${c}" opacity="0.3"/>
      <ellipse cx="40" cy="76" rx="22" ry="8" stroke="${c}" stroke-width="1.8"/>
      <path d="M18,76 Q40,60 62,76" stroke="${c}" stroke-width="1.4" fill="none"/>
      <line x1="40" y1="68" x2="40" y2="60" stroke="${c}" stroke-width="1.6"/>
      <circle cx="40" cy="58" r="3" fill="${c}"/>
      <line x1="26" y1="88" x2="54" y2="88" stroke="${c}" stroke-width="1.4" opacity="0.5"/>
      <circle cx="40" cy="88" r="1.5" fill="${c}" opacity="0.5"/>
    </svg>`,
  },
];
