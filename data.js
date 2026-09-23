/* GPS Corrections Options — decision tree
   Transcribed from GPS_Corrections_Options.xlsm (28 drawings, shape macros mapped to nodes).
   Updated from the revised workbook: added 2-year RTX terms, unlock part numbers,
   Trimble Store link and the ordering walkthrough video.

   TO UPDATE PART NUMBERS: edit the "parts" arrays below and commit. Everyone using the
   hosted page gets the change immediately. Bump CACHE in sw.js at the same time.

   node fields:
     title     heading shown for the node
     sub       small grey line under the title
     note      callout box (unlock requirements, warnings)
     question  the question this node asks
     accuracy  badge text, e.g. '6-8"'
     image     file in img/
     children  ids of the next nodes
     parts     [{term, pn, via}] — via is VMS | Trimble | Raven
     unlocks   [{what, serials, pns:[{pn, note}]}] — unlock part numbers
     links     [{label, url, kind}] — kind is 'video' or 'store'
     contact   true for "go see Product Support" dead ends
*/

/* Shared links, referenced by the RTX nodes below. */
var RTX_LINKS = [
  {label: 'How to order an RTX subscription from the Trimble store',
   url: 'https://redheadequipmentca.sharepoint.com/:v:/s/Parts-Precision/IQD_0VIxJKW-S44mnJkg5v9UAbfnzKNW-REeD1wX9OMYZXM?e=kbdgLF',
   kind: 'video'},
  {label: 'Trimble Store', url: 'https://store.trimble.com', kind: 'store'}
];

window.GPS_TREE = {

  home: {
    title: 'GPS Corrections Options',
    question: 'Customer wants higher accuracy. What brand of receiver?',
    children: ['novatel', 'trimble', 'raven']
  },

  /* ---------------- Novatel / NGMA ---------------- */
  novatel: {
    title: 'Novatel / NGMA',
    sub: 'Vector / Cygnus — found on most connected machines',
    image: 'novatel.png',
    question: 'What accuracy?',
    children: ['afs_plm1', 'afs_plm2', 'afs_plm3', 'afs_plm3b', 'novatel_rtk']
  },
  afs_plm1: {
    title: 'AFS / PLM 1', accuracy: '6-8"',
    question: 'How many years of AFS/PLM 1?',
    parts: [
      {term: '1 Year', pn: '48024525', via: 'VMS'},
      {term: '3 Year', pn: '92245714', via: 'VMS'}
    ]
  },
  afs_plm2: {
    title: 'AFS / PLM 2', accuracy: '2-4"',
    note: 'Requires Medium Unlock in VMS.',
    question: 'How many years of AFS/PLM 2?',
    parts: [
      {term: '1 Year', pn: '48084211', via: 'VMS'},
      {term: '3 Year', pn: '48084213', via: 'VMS'}
    ]
  },
  afs_plm3: {
    title: 'AFS / PLM 3', accuracy: '<2"',
    note: 'Requires Medium Unlock in VMS.',
    question: 'How many years of AFS/PLM 3?',
    parts: [
      {term: '1 Year', pn: '51668573', via: 'VMS'},
      {term: '3 Year', pn: '51668576', via: 'VMS'}
    ]
  },
  afs_plm3b: {
    title: 'AFS / PLM 3B', accuracy: '<2"',
    note: 'Does not require Medium Unlock. Higher price than AFS/PLM 3.',
    question: 'How many years of AFS/PLM 3B?',
    parts: [
      {term: '1 Year', pn: '92252344', via: 'VMS'},
      {term: '3 Year', pn: '92245716', via: 'VMS'}
    ]
  },
  novatel_rtk: {
    title: 'RTK', accuracy: '1"', contact: true,
    note: 'Reach out to your local Product Support or Tech Specialist.'
  },

  /* ---------------- Trimble ---------------- */
  trimble: {
    title: 'Trimble',
    sub: '262 / 372 / 392 — found on most legacy machines',
    image: 'trimble-372.png',
    question: 'Which receiver?',
    children: ['trimble262', 'trimble372392']
  },
  trimble262: {
    title: 'Trimble 262',
    sub: 'No RTX',
    image: 'trimble-262.png',
    contact: true,
    note: 'Trimble 262 subscriptions are no longer supported within Redhead. Customer must source OmniSTAR themselves, or sell them a 392.'
  },
  trimble372392: {
    title: 'Trimble 372 / 392',
    sub: 'RTX capable',
    image: 'trimble-372.png',
    question: 'What level of accuracy do they want?',
    children: ['rangepoint', 'cp_standard', 'cp_fast', 'trimble_rtk']
  },
  rangepoint: {
    title: 'RangePoint RTX', accuracy: '6-8"',
    note: 'No unlock required.',
    question: 'How many years of RangePoint RTX?',
    parts: [
      {term: '1 Year', pn: 'AG88455-10', via: 'Trimble'},
      {term: '2 Year', pn: 'AG88455-20', via: 'Trimble'},
      {term: '3 Year', pn: 'AG88455-30', via: 'Trimble'},
      {term: '5 Year', pn: 'AG88455-50', via: 'Trimble'}
    ],
    links: RTX_LINKS
  },
  cp_standard: {
    title: 'CenterPoint RTX Standard', accuracy: '2"',
    note: 'Requires OMNI unlock.',
    question: 'How many years of CenterPoint RTX Standard?',
    parts: [
      {term: '1 Year', pn: 'AG88416-10', via: 'Trimble'},
      {term: '2 Year', pn: 'AG88416-20', via: 'Trimble'},
      {term: '3 Year', pn: 'AG88416-30', via: 'Trimble'},
      {term: '5 Year', pn: 'AG88416-50', via: 'Trimble'},
      {term: '1 Year — CenterPoint RTX Farm Plan', pn: '', via: 'Trimble',
       ask: 'See Product Support or Tech Specialist'}
    ],
    unlocks: [
      {what: '372 — OmniSTAR unlock', pns: [{pn: 'ZTN87855'}]},
      {what: '392 — Base to Medium',  pns: [{pn: 'ZTN6551-02'}]}
    ],
    links: RTX_LINKS
  },
  cp_fast: {
    title: 'CenterPoint RTX Fast', accuracy: '2"',
    note: 'Requires High unlock.',
    question: 'How many years of CenterPoint RTX Fast?',
    parts: [
      {term: '1 Year', pn: 'AG88213-10', via: 'Trimble'},
      {term: '2 Year', pn: 'AG88213-20', via: 'Trimble'},
      {term: '3 Year', pn: 'AG88213-30', via: 'Trimble'},
      {term: '5 Year', pn: 'AG88213-50', via: 'Trimble'},
      {term: '1 Year — CenterPoint RTX Farm Plan', pn: '', via: 'Trimble',
       ask: 'See Product Support or Tech Specialist'}
    ],
    unlocks: [
      {what: '372 — OmniSTAR to High unlock', pns: [{pn: 'ZTN87858'}]},
      {what: '392 — Medium to High',          pns: [{pn: 'ZTN6551-03'}]},
      {what: '392 — Base to High',            pns: [{pn: 'ZTN6551-04'}]}
    ],
    links: RTX_LINKS
  },
  trimble_rtk: {
    title: 'RTK', accuracy: '1"', contact: true,
    note: 'Reach out to your local Product Support or the Technology Specialist.'
  },

  /* ---------------- Raven ---------------- */
  raven: {
    title: 'Raven',
    sub: 'RS1 / 500S / 600S / 700S',
    image: 'rs1.png',
    question: 'What receiver?',
    children: ['rs1', 'r500s', 'r600s', 'r700s']
  },

  rs1: {
    title: 'RS1', image: 'rs1.png',
    question: 'What accuracy?',
    children: ['rs1_gspro', 'rs1_satgs', 'rs1_gslite', 'rs1_rtk']
  },
  rs1_gspro: {
    title: 'Satellite GS-PRO', accuracy: '<2"',
    note: 'Unlock required.',
    question: 'How long?',
    parts: [
      {term: '1 Year', pn: '51668573', via: 'Raven'},
      {term: '2 Year', pn: '51668574', via: 'Raven'},
      {term: '3 Year', pn: '51668576', via: 'Raven'},
      {term: '5 Year', pn: '90498991', via: 'Raven'}
    ],
    unlocks: [
      {what: 'Base SBAS + GS-Lite to SBAS + GS-Lite + GS-Pro (Base to Medium)',
       serials: 'BMWM or BMXT',
       pns: [{pn: '077-0180-256U'}, {pn: '077-0180-259U'}]},
      {what: 'Base to Satellite GS-Pro (Base to Medium)',
       serials: 'BMGX or DMGX',
       pns: [{pn: '92262876', note: 'subs from 077-0180-346U'},
             {pn: '92195847', note: 'subs from 077-0180-334U'}]}
    ]
  },
  rs1_satgs: {
    title: 'Satellite GS', accuracy: '2-4"',
    note: 'Unlock required — old board only.',
    question: 'How long?',
    parts: [
      {term: '1 Year', pn: '48084211', via: 'Raven'},
      {term: '2 Year', pn: '48084212', via: 'Raven'},
      {term: '3 Year', pn: '48084213', via: 'Raven'}
    ],
    unlocks: [
      {what: 'Base to Satellite GS', serials: 'BFN', pns: [{pn: '077-0180-177U'}]}
    ]
  },
  rs1_gslite: {
    title: 'GS-Lite', accuracy: '6-8"',
    note: 'No unlock required.',
    question: 'How long?',
    parts: [
      {term: '1 Year', pn: '48024525', via: 'Raven'},
      {term: '3 Year', pn: '92245714', via: 'Raven'},
      {term: '5 Year', pn: '90498989', via: 'Raven'}
    ]
  },
  rs1_rtk: {
    title: 'RTK', accuracy: '1"', contact: true,
    note: 'Contact Product Support or Tech Specialist.'
  },

  r500s: {
    title: '500S', image: '500s.png',
    question: 'What accuracy?',
    children: ['r500s_gslite', 'r500s_satgs']
  },
  r500s_gslite: {
    title: 'GS-Lite', sub: '500S only', accuracy: '6-8"',
    note: 'No unlock required.',
    question: 'How long?',
    parts: [{term: '1 Year', pn: '077-0180-236U', via: 'Raven'}]
  },
  r500s_satgs: {
    title: 'Satellite GS', sub: '500S only', accuracy: '2-4"',
    note: 'No unlock required.',
    question: 'How long?',
    parts: [
      {term: '3 Month', pn: '077-0180-243U', via: 'Raven'},
      {term: '6 Month', pn: '077-0180-240U', via: 'Raven'},
      {term: '1 Year',  pn: '077-0180-237U', via: 'Raven'},
      {term: '3 Year',  pn: '077-0180-238U', via: 'Raven'},
      {term: '5 Year',  pn: '077-0180-239U', via: 'Raven'}
    ]
  },

  r600s: {
    title: '600S', image: '600s.png',
    question: 'What accuracy?',
    children: ['r600s_gslite', 'r600s_satgs'],
    unlocks: [
      {what: '600S Base to Satellite GS', serials: 'BFN', pns: [{pn: '077-0180-222U'}]}
    ]
  },
  r600s_gslite: {
    title: 'GS-Lite', accuracy: '6-8"',
    note: 'No unlock required.',
    question: 'How long?',
    parts: [
      {term: '1 Year', pn: '48024525', via: 'Raven'},
      {term: '3 Year', pn: '92245714', via: 'Raven'},
      {term: '5 Year', pn: '90498989', via: 'Raven'}
    ]
  },
  r600s_satgs: {
    title: 'Satellite GS', accuracy: '2-4"',
    note: 'Unlock required.',
    question: 'How long?',
    parts: [
      {term: '1 Year', pn: '48084211', via: 'Raven'},
      {term: '2 Year', pn: '48084212', via: 'Raven'},
      {term: '3 Year', pn: '48084213', via: 'Raven'}
    ],
    unlocks: [
      {what: '600S Base to Satellite GS', serials: 'BFN', pns: [{pn: '077-0180-222U'}]}
    ]
  },

  r700s: {
    title: '700S', image: '700s.png',
    question: 'What accuracy?',
    children: ['r700s_gspro', 'r700s_gslite', 'r700s_rtk']
  },
  r700s_gspro: {
    title: 'Satellite GS-PRO', accuracy: '<2"',
    note: 'Unlock required.',
    question: 'How long?',
    parts: [
      {term: '1 Year', pn: '51668573', via: 'Raven'},
      {term: '2 Year', pn: '51668574', via: 'Raven'},
      {term: '3 Year', pn: '51668576', via: 'Raven'},
      {term: '5 Year', pn: '90498991', via: 'Raven'}
    ],
    unlocks: [
      {what: '700S SBAS + GS-Lite to SBAS + GS-Lite + GS-Pro (Base to Medium)',
       serials: 'BMHR', pns: [{pn: '077-0180-264U'}]}
    ]
  },
  r700s_gslite: {
    title: 'GS-Lite', accuracy: '6-8"',
    note: 'No unlock required.',
    question: 'How long?',
    parts: [
      {term: '1 Year', pn: '48024525', via: 'Raven'},
      {term: '3 Year', pn: '92245714', via: 'Raven'},
      {term: '5 Year', pn: '90498989', via: 'Raven'}
    ]
  },
  r700s_rtk: {
    title: 'RTK', accuracy: '1"', contact: true,
    note: 'Contact Product Support or Tech Specialist.'
  }
};
