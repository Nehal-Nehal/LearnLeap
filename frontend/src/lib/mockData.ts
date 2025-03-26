
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
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1186&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1592280771190-3e2e4d977758?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1232&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1592494804071-1486d4149888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1186&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: '21',
    name: 'Kaplan Singapore',
    type: 'Private Institution',
    location: 'Singapore',
    latitude: 1.2930,
    longitude: 103.8556,
    entryRequirements: ['A-Levels', 'Polytechnic Diploma', 'Mature Student Entry'],
    coursesOffered: ['Business', 'Accounting', 'Banking & Finance', 'Hospitality & Tourism', 'Law'],
    coCurricularActivities: ['Professional Development', 'Industry Talks', 'Networking Events'],
    specialPrograms: ['Industry-Based Learning', 'Professional Certification Courses', 'Career Development'],
    description: 'Kaplan Singapore is a private education institution offering a wide range of academic programs in partnership with renowned overseas universities. It focuses on providing quality education and industry-relevant skills.',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: '22',
    name: 'PSB Academy',
    type: 'Private Institution',
    location: 'Singapore',
    latitude: 1.3144,
    longitude: 103.8616,
    entryRequirements: ['A-Levels', 'Polytechnic Diploma', 'Working Experience'],
    coursesOffered: ['Business', 'Engineering', 'Life Sciences', 'Communication', 'Information Technology'],
    coCurricularActivities: ['Student Clubs', 'Industry Visits', 'Professional Development'],
    specialPrograms: ['Certificate Programs', 'Diploma Programs', 'Degree Programs'],
    description: 'PSB Academy is a private education institution in Singapore providing diploma, undergraduate, and postgraduate programs in partnership with Australian and UK universities. It is known as "The Future Academy" with a focus on preparing students for Industry 4.0.',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: '23',
    name: 'Management Development Institute of Singapore',
    type: 'Private Institution',
    location: 'Singapore',
    latitude: 1.3287,
    longitude: 103.8564,
    entryRequirements: ['A-Levels', 'Polytechnic Diploma', 'Working Experience'],
    coursesOffered: ['Business', 'Tourism & Hospitality', 'Technology', 'Media & Communications', 'Psychology'],
    coCurricularActivities: ['Sports', 'Arts', 'Student Clubs', 'Community Service'],
    specialPrograms: ['Advanced Diploma Programs', 'Degree Programs', 'Postgraduate Programs'],
    description: 'The Management Development Institute of Singapore (MDIS) is Singapore\'s oldest not-for-profit professional institute for lifelong learning. It offers internationally accredited courses in partnership with renowned universities from the UK and Australia.',
    imageUrl: 'https://images.unsplash.com/photo-1560785496-3c9d27877182?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
  },
  {
    id: '24',
    name: 'James Cook University Singapore',
    type: 'Private Institution',
    location: 'Singapore',
    latitude: 1.3398,
    longitude: 103.8479,
    entryRequirements: ['A-Levels', 'Polytechnic Diploma', 'International Baccalaureate'],
    coursesOffered: ['Business', 'Education', 'Information Technology', 'Psychology', 'Tourism & Hospitality'],
    coCurricularActivities: ['Sports', 'Student Clubs', 'Community Service', 'Research'],
    specialPrograms: ['Joint Degree Programs', 'Master\'s Programs', 'Research Programs'],
    description: 'James Cook University Singapore is a branch campus of James Cook University Australia, offering the same internationally recognized degrees in a multicultural setting. It is the first private education institution in Singapore to be awarded the EduTrust Star certification.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: '25',
    name: 'Curtin Singapore',
    type: 'Private Institution',
    location: 'Singapore',
    latitude: 1.3175,
    longitude: 103.8785,
    entryRequirements: ['A-Levels', 'Polytechnic Diploma', 'Working Experience'],
    coursesOffered: ['Business', 'Accounting', 'Finance', 'Marketing', 'Logistics & Supply Chain Management'],
    coCurricularActivities: ['Student Clubs', 'Industry Visits', 'Professional Development'],
    specialPrograms: ['Foundation Programs', 'Undergraduate Programs', 'Postgraduate Programs'],
    description: 'Curtin Singapore is a branch campus of Curtin University, Australia, offering globally recognized programs in business and communication. Students receive the same qualification as they would in Australia but with the advantage of studying in Singapore.',
    imageUrl: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80'
  },
  {
    id: '26',
    name: 'Singapore School of Design and Technology',
    type: 'Private Institution',
    location: 'Singapore',
    latitude: 1.3071,
    longitude: 103.8320,
    entryRequirements: ['O-Levels', 'A-Levels', 'Portfolio Review'],
    coursesOffered: ['Graphic Design', 'Product Design', 'Fashion Design', 'Digital Media', 'Game Development'],
    coCurricularActivities: ['Design Competitions', 'Industry Projects', 'Arts Clubs', 'Portfolio Building'],
    specialPrograms: ['Professional Certification Courses', 'Diploma Programs', 'Industry Attachments'],
    description: 'The Singapore School of Design and Technology is a specialized private institution focusing on creative arts and design education. It emphasizes hands-on learning and industry collaborations to prepare students for careers in the creative industry.',
    imageUrl: 'https://images.unsplash.com/photo-1508997449629-303059a039c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
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
