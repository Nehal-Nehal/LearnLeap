import { Institution } from './types';

export const institutions: Institution[] = [
  {
    id: '1',
    name: 'National University of Singapore',
    type: 'University',
    location: 'Singapore',
    latitude: 1.2966,
    longitude: 103.7764,
    ranking: 11,
    entryRequirements: ['A-Levels', 'International Baccalaureate', 'Polytechnic Diploma'],
    coursesOffered: ['Computer Science', 'Business', 'Engineering', 'Medicine', 'Law'],
    coCurricularActivities: ['Sports', 'Arts', 'Community Service', 'Research'],
    specialPrograms: ['NUS Overseas Colleges', 'Double Degree Programs', 'Student Exchange'],
    description: 'The National University of Singapore (NUS) is a comprehensive research university located in Singapore. Founded in 1905, it is the oldest higher education institution in Singapore and consistently ranks among the top universities in Asia and the world.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/NUS_coat_of_arms.svg/1200px-NUS_coat_of_arms.svg.png'
  },
  {
    id: '2',
    name: 'Nanyang Technological University',
    type: 'University',
    location: 'Singapore',
    latitude: 1.3483,
    longitude: 103.6831,
    ranking: 19,
    entryRequirements: ['A-Levels', 'International Baccalaureate', 'Polytechnic Diploma'],
    coursesOffered: ['Engineering', 'Science', 'Business', 'Humanities', 'Art & Design'],
    coCurricularActivities: ['Sports', 'Arts', 'Community Service', 'Entrepreneurship'],
    specialPrograms: ['Renaissance Engineering Programme', 'CN Yang Scholars Programme', 'Global Exchange'],
    description: 'Nanyang Technological University (NTU) is a public research university in Singapore. The university has been ranked as overall 1st in the ranking of young universities in the QS World University Rankings since 2015.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b8/Nanyang_Technological_University_coat_of_arms_vector.svg/1200px-Nanyang_Technological_University_coat_of_arms_vector.svg.png'
  },
  {
    id: '3',
    name: 'Singapore Management University',
    type: 'University',
    location: 'Singapore',
    latitude: 1.2967,
    longitude: 103.8517,
    ranking: 511,
    entryRequirements: ['A-Levels', 'International Baccalaureate', 'Polytechnic Diploma'],
    coursesOffered: ['Business', 'Economics', 'Law', 'Information Systems', 'Social Sciences'],
    coCurricularActivities: ['Arts', 'Sports', 'Community Service', 'Student Leadership'],
    specialPrograms: ['SMU-X', 'Global Impact Scholarship', 'SMU Ventures'],
    description: 'Singapore Management University (SMU) is a premier university in Asia, internationally recognized for its world-class research and distinguished teaching focused on Management, Social Sciences, and Computing.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/Singapore_Management_University_logo.svg/1200px-Singapore_Management_University_logo.svg.png'
  },
  {
    id: '4',
    name: 'Raffles Institution',
    type: 'Junior College',
    location: 'Singapore',
    latitude: 1.3453,
    longitude: 103.8470,
    entryRequirements: ['O-Levels', 'Direct School Admission'],
    coursesOffered: ['Arts Stream', 'Science Stream', 'Raffles Academy', 'Humanities Programme'],
    coCurricularActivities: ['Sports', 'Performing Arts', 'Clubs & Societies', 'Leadership'],
    specialPrograms: ['Raffles Diploma', 'Raffles Leadership Programme', 'Research Studies'],
    description: 'Raffles Institution (RI) is the oldest school in Singapore for pre-tertiary education. It has a long tradition of producing leaders in various fields and is known for its academic excellence.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/90/Raffles_Institution_school_crest.png/220px-Raffles_Institution_school_crest.png'
  },
  {
    id: '5',
    name: 'Hwa Chong Institution',
    type: 'Junior College',
    location: 'Singapore',
    latitude: 1.3233,
    longitude: 103.8070,
    entryRequirements: ['O-Levels', 'Direct School Admission'],
    coursesOffered: ['Arts Stream', 'Science Stream', 'Integrated Programme', 'Humanities Programme'],
    coCurricularActivities: ['Sports', 'Performing Arts', 'Clubs & Societies', 'Student Leadership'],
    specialPrograms: ['Hwa Chong Diploma', 'Bi-Cultural Studies Programme', 'Art Elective Programme'],
    description: 'Hwa Chong Institution (HCI) is an independent school in Singapore offering secondary and pre-university education. It is known for its bilingual and bicultural learning environment.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e6/HCI_Crest.png/220px-HCI_Crest.png'
  },
  {
    id: '6',
    name: 'Singapore University of Technology and Design',
    type: 'University',
    location: 'Singapore',
    latitude: 1.3413,
    longitude: 103.9638,
    ranking: 41,
    entryRequirements: ['A-Levels', 'International Baccalaureate', 'Polytechnic Diploma'],
    coursesOffered: ['Architecture and Sustainable Design', 'Engineering Product Development', 'Information Systems Technology and Design', 'Engineering Systems and Design'],
    coCurricularActivities: ['Design Innovation', 'Sports', 'Arts', 'Entrepreneurship'],
    specialPrograms: ['SUTD-MIT Dual Masters', 'SUTD Technology Entrepreneurship Programme', 'SUTD-ZJU Innovation, Design and Entrepreneurship Alliance'],
    description: 'Singapore University of Technology and Design (SUTD) is Singapore\'s fourth public university. SUTD was established in collaboration with MIT to advance knowledge and nurture technically grounded leaders and innovators to serve societal needs.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/58/SUTD-logo-20170512.png/220px-SUTD-logo-20170512.png'
  },
  {
    id: '7',
    name: 'Victoria Junior College',
    type: 'Junior College',
    location: 'Singapore',
    latitude: 1.3053,
    longitude: 103.9164,
    entryRequirements: ['O-Levels'],
    coursesOffered: ['Arts Stream', 'Science Stream', 'Music Elective Programme'],
    coCurricularActivities: ['Sports', 'Performing Arts', 'Clubs & Societies', 'Service Learning'],
    specialPrograms: ['Talent Development Programme', 'Victoria Enhanced Curriculum', 'Leadership Programme'],
    description: 'Victoria Junior College (VJC) is a junior college in Singapore established in 1984. It offers a two-year course leading to the GCE A-Level examination and is known for its strong academic and co-curricular programmes.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/46/Victoria_Junior_College_Logo.svg/1200px-Victoria_Junior_College_Logo.svg.png'
  },
  {
    id: '8',
    name: 'Anderson Serangoon Junior College',
    type: 'Junior College',
    location: 'Singapore',
    latitude: 1.3884,
    longitude: 103.8695,
    entryRequirements: ['O-Levels'],
    coursesOffered: ['Arts Stream', 'Science Stream'],
    coCurricularActivities: ['Sports', 'Performing Arts', 'Clubs & Societies', 'Community Involvement'],
    specialPrograms: ['Talent Development', 'Higher Education and Career Guidance', 'Overseas Immersion'],
    description: 'Anderson Serangoon Junior College (ASRJC) is a junior college in Singapore formed through the merger of Anderson Junior College and Serangoon Junior College in 2019.',
    imageUrl: 'https://asrjc.moe.edu.sg/wp-content/uploads/2021/01/ASRJC-Logo.png'
  },
  {
    id: '9',
    name: 'Raffles Girls School',
    type: 'School',
    location: 'Singapore',
    latitude: 1.3021,
    longitude: 103.7877,
    entryRequirements: ['PSLE', 'Direct School Admission'],
    coursesOffered: ['Secondary Education', 'Integrated Programme'],
    coCurricularActivities: ['Sports', 'Arts', 'Clubs', 'Leadership'],
    specialPrograms: ['Raffles Leadership Programme', 'Raffles Girls\' Talent Development', 'RGS Centre for Pedagogical Research and Learning'],
    description: 'Raffles Girls\' School (Secondary) is an independent girls\' school in Singapore. It offers a six-year Integrated Programme leading to the GCE A-Level examination in collaboration with Raffles Institution.',
    imageUrl: 'https://www.rgs.edu.sg/wp-content/uploads/2020/11/rgs-logo-vertical.png'
  },
  {
    id: '10',
    name: 'Anglo-Chinese School (Independent)',
    type: 'School',
    location: 'Singapore',
    latitude: 1.3283,
    longitude: 103.7871,
    entryRequirements: ['PSLE', 'Direct School Admission'],
    coursesOffered: ['International Baccalaureate Diploma Programme', 'Integrated Programme'],
    coCurricularActivities: ['Sports', 'Performing Arts', 'Uniformed Groups', 'Clubs & Societies'],
    specialPrograms: ['ACSian Theatre & The Arts', 'Regional Studies Programme', 'Science & Mathematics Talent Programme'],
    description: 'Anglo-Chinese School (Independent) is an autonomous Methodist boys\' school in Singapore. It offers the four-year Singapore-Cambridge GCE Ordinary Level Programme and the six-year Integrated Programme leading to the International Baccalaureate Diploma.',
    imageUrl: 'https://acsindep.moe.edu.sg/wp-content/uploads/2021/01/acs-logo.png'
  },
  {
    id: '11',
    name: 'Singapore Institute of Technology',
    type: 'University',
    location: 'Singapore',
    latitude: 1.3108,
    longitude: 103.7730,
    ranking: 501,
    entryRequirements: ['Polytechnic Diploma', 'A-Levels'],
    coursesOffered: ['Engineering', 'Chemical Engineering', 'Food Technology', 'Computer Science', 'Hospitality Business'],
    coCurricularActivities: ['Sports', 'Student Clubs', 'Community Service', 'Professional Development'],
    specialPrograms: ['Integrated Work Study Programme', 'Overseas Immersion Programme', 'Enterprise Leadership'],
    description: 'Singapore Institute of Technology (SIT) is Singapore\'s university of applied learning. It offers industry-focused degree programs and aims to develop individuals who can contribute towards the advancement of society.',
    imageUrl: 'https://www.singaporetech.edu.sg/sites/default/files/sit-logo.png'
  },
  {
    id: '12',
    name: 'Singapore Institute of Management',
    type: 'University',
    location: 'Singapore',
    latitude: 1.3326,
    longitude: 103.7764,
    entryRequirements: ['A-Levels', 'Polytechnic Diploma', 'International Baccalaureate'],
    coursesOffered: ['Business Management', 'Finance', 'Accounting', 'International Relations', 'Psychology'],
    coCurricularActivities: ['Student Clubs', 'Sports', 'Community Service', 'International Exposure'],
    specialPrograms: ['Global Learning', 'SIM-UOL Programmes', 'Career Development'],
    description: 'Singapore Institute of Management (SIM) is one of Singapore\'s leading private education institutions, offering various undergraduate and postgraduate programs in partnership with renowned international universities.',
    imageUrl: 'https://www.sim.edu.sg/themes/custom/sim/logo.svg'
  },
  {
    id: '13',
    name: 'Temasek Junior College',
    type: 'Junior College',
    location: 'Singapore',
    latitude: 1.3472,
    longitude: 103.9374,
    entryRequirements: ['O-Levels'],
    coursesOffered: ['Science Stream', 'Arts Stream', 'Humanities Programme'],
    coCurricularActivities: ['Sports', 'Performing Arts', 'Clubs & Societies', 'Student Leadership'],
    specialPrograms: ['Temasek Academy', 'Talent Development', 'Overseas Learning Programme'],
    description: 'Temasek Junior College (TJC) is a junior college in Singapore that offers a two-year pre-university education leading to the GCE A-Level examination. It is known for its academic excellence and vibrant campus life.',
    imageUrl: 'https://www.temasekjc.moe.edu.sg/qql/slot/u550/2020/AboutTJC/TJC_logo.png'
  },
  {
    id: '14',
    name: 'National Junior College',
    type: 'Junior College',
    location: 'Singapore',
    latitude: 1.3262,
    longitude: 103.8066,
    entryRequirements: ['O-Levels', 'Direct School Admission'],
    coursesOffered: ['Arts Stream', 'Science Stream', 'Art Elective Programme'],
    coCurricularActivities: ['Sports', 'Performing Arts', 'Clubs & Societies', 'Student Leadership'],
    specialPrograms: ['NJC Boarding Programme', 'Special Programme in Humanities', 'Science Research Programme'],
    description: 'National Junior College (NJC) is the first junior college established in Singapore. It offers both the Integrated Programme and the Junior College Programme, providing students with diverse learning opportunities.',
    imageUrl: 'https://natjc.moe.edu.sg/wp-content/uploads/2020/07/NJC-Logo.png'
  },
  {
    id: '15',
    name: 'Nanyang Girls\' High School',
    type: 'School',
    location: 'Singapore',
    latitude: 1.3233,
    longitude: 103.8066,
    entryRequirements: ['PSLE', 'Direct School Admission'],
    coursesOffered: ['Secondary Education', 'Integrated Programme'],
    coCurricularActivities: ['Sports', 'Performing Arts', 'Clubs & Societies', 'Leadership'],
    specialPrograms: ['Bicultural Studies Programme', 'Research Studies', 'Leadership Development'],
    description: 'Nanyang Girls\' High School (NYGH) is an independent school in Singapore offering secondary education for girls. It is known for its rigorous academic curriculum and strong emphasis on bilingual education.',
    imageUrl: 'https://www.nygh.edu.sg/wp-content/uploads/2020/07/nygh-logo.png'
  },
  {
    id: '16',
    name: 'Ngee Ann Polytechnic',
    type: 'Polytechnic',
    location: 'Singapore',
    latitude: 1.3327,
    longitude: 103.7750,
    entryRequirements: ['O-Levels', 'N-Levels (Nitec/Higher Nitec)'],
    coursesOffered: ['Engineering', 'Business', 'Design', 'Health Sciences', 'Infocomm Technology'],
    coCurricularActivities: ['Sports', 'Arts', 'Community Service', 'Student Leadership'],
    specialPrograms: ['Overseas Immersion', 'Industry Partnerships', 'Entrepreneurship'],
    description: 'Ngee Ann Polytechnic is a tertiary education institution in Singapore offering diploma courses in various disciplines. It is known for its industry-relevant curriculum and strong focus on practical skills development.',
    imageUrl: 'https://www.np.edu.sg/images/default-source/default-album/np-logo-2.png'
  },
  {
    id: '17',
    name: 'Singapore Polytechnic',
    type: 'Polytechnic',
    location: 'Singapore',
    latitude: 1.3103,
    longitude: 103.7774,
    entryRequirements: ['O-Levels', 'N-Levels (Nitec/Higher Nitec)'],
    coursesOffered: ['Engineering', 'Architecture', 'Business', 'Maritime Studies', 'Information Technology'],
    coCurricularActivities: ['Sports', 'Arts', 'Community Service', 'Student Clubs'],
    specialPrograms: ['SP Engineering Academy', 'SP Design School', 'SP Business School'],
    description: 'Singapore Polytechnic is the first polytechnic established in Singapore. It offers diploma courses in various disciplines and is recognized for its quality education and strong industry connections.',
    imageUrl: 'https://www.sp.edu.sg/sp/sites/themes/bootstrap/sp/img/common/logo.png'
  },
  {
    id: '18',
    name: 'Temasek Polytechnic',
    type: 'Polytechnic',
    location: 'Singapore',
    latitude: 1.3453,
    longitude: 103.9318,
    entryRequirements: ['O-Levels', 'N-Levels (Nitec/Higher Nitec)'],
    coursesOffered: ['Engineering', 'Business', 'Design', 'Applied Science', 'Informatics & IT'],
    coCurricularActivities: ['Sports', 'Arts', 'Community Service', 'Student Clubs'],
    specialPrograms: ['TP Entrepreneurship', 'TP Law & Management', 'TP Veterinary Technology'],
    description: 'Temasek Polytechnic is a tertiary institution in Singapore offering diploma courses across various disciplines. It is known for its practice-oriented curriculum and modern campus facilities.',
    imageUrl: 'https://www.tp.edu.sg/content/dam/tp-web/images/common/tp-logo.svg'
  },
  {
    id: '19',
    name: 'Republic Polytechnic',
    type: 'Polytechnic',
    location: 'Singapore',
    latitude: 1.4414,
    longitude: 103.7852,
    entryRequirements: ['O-Levels', 'N-Levels (Nitec/Higher Nitec)'],
    coursesOffered: ['Engineering', 'Hospitality', 'Sports', 'Technology for the Arts', 'Infocomm'],
    coCurricularActivities: ['Sports', 'Arts', 'Community Service', 'Student Clubs'],
    specialPrograms: ['Problem-based Learning', 'Industry Immersion', 'Overseas Exposure'],
    description: 'Republic Polytechnic is a tertiary education institution in Singapore known for its unique problem-based learning approach. It offers diploma courses across various disciplines and emphasizes hands-on learning.',
    imageUrl: 'https://www.rp.edu.sg/img/logo.png'
  },
  {
    id: '20',
    name: 'Nanyang Polytechnic',
    type: 'Polytechnic',
    location: 'Singapore',
    latitude: 1.3801,
    longitude: 103.8490,
    entryRequirements: ['O-Levels', 'N-Levels (Nitec/Higher Nitec)'],
    coursesOffered: ['Engineering', 'Business Management', 'Design', 'Health Sciences', 'Information Technology'],
    coCurricularActivities: ['Sports', 'Arts', 'Community Service', 'Student Clubs'],
    specialPrograms: ['Teaching Industry Collaboration', 'Overseas Program', 'Innovation & Enterprise'],
    description: 'Nanyang Polytechnic is a tertiary education institution in Singapore offering diploma courses in various disciplines. It is known for its strong industry connections and innovative teaching approaches.',
    imageUrl: 'https://www.nyp.edu.sg/content/dam/nyp/NYP-Logo-Color.png'
  }
];

export const getAllLocations = (): string[] => {
  const locationsSet = new Set<string>();
  institutions.forEach(institution => {
    locationsSet.add(institution.location);
  });
  return Array.from(locationsSet);
};

export const getAllInstitutionTypes = (): string[] => {
  const typesSet = new Set<string>();
  institutions.forEach(institution => {
    typesSet.add(institution.type);
  });
  return Array.from(typesSet);
};

export const getAllEntryRequirements = (): string[] => {
  const requirementsSet = new Set<string>();
  institutions.forEach(institution => {
    institution.entryRequirements.forEach(req => {
      requirementsSet.add(req);
    });
  });
  return Array.from(requirementsSet);
};

export const getAllCoursesOffered = (): string[] => {
  const coursesSet = new Set<string>();
  institutions.forEach(institution => {
    institution.coursesOffered.forEach(course => {
      coursesSet.add(course);
    });
  });
  return Array.from(coursesSet);
};

export const getAllCoCurricularActivities = (): string[] => {
  const activitiesSet = new Set<string>();
  institutions.forEach(institution => {
    institution.coCurricularActivities.forEach(activity => {
      activitiesSet.add(activity);
    });
  });
  return Array.from(activitiesSet);
};

export const getAllSpecialPrograms = (): string[] => {
  const programsSet = new Set<string>();
  institutions.forEach(institution => {
    institution.specialPrograms.forEach(program => {
      programsSet.add(program);
    });
  });
  return Array.from(programsSet);
};
