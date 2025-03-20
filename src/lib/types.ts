
export interface Institution {
  id: string;
  name: string;
  type: 'University' | 'Junior College' | 'School' | string;
  location: string;
  latitude: number;
  longitude: number;
  ranking?: number;
  entryRequirements: string[];
  coursesOffered: string[];
  coCurricularActivities: string[];
  specialPrograms: string[];
  description: string;
  imageUrl: string;
}

export interface FilterOptions {
  location: string[];
  type: string[];
  entryRequirements: string[];
  coursesOffered: string[];
  coCurricularActivities: string[];
  specialPrograms: string[];
  minRanking?: number;
  maxRanking?: number;
}

export interface SearchState {
  query: string;
  filters: FilterOptions;
}
