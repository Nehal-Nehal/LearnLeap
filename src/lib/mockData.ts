
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
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop'
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
    imageUrl: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?q=80&w=1000&auto=format&fit=crop'
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
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop'
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
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop'
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
    imageUrl: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?q=80&w=1000&auto=format&fit=crop'
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
    imageUrl: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=1000&auto=format&fit=crop'
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
    imageUrl: 'https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78?q=80&w=1000&auto=format&fit=crop'
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
    imageUrl: 'https://images.unsplash.com/photo-1600456899121-68eda5705257?q=80&w=1000&auto=format&fit=crop'
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
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000&auto=format&fit=crop'
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
    imageUrl: 'https://images.unsplash.com/photo-1592280771190-3e2e4d977758?q=80&w=1000&auto=format&fit=crop'
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
