
export interface Institution {
  id: string;
  name: string;
  type: string; // University, Junior College, School, Polytechnic, Private Institution, etc.
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
