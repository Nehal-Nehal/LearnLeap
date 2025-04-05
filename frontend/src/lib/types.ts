export interface Institution {
  id: string;
  school_name: string;
  school_level: string; // PRIMARY, SECONDARY, JUNIOR COLLEGE, UNIVERSITY, etc.
  school_type: string; // GOVERNMENT SCHOOL, etc.
  address: string;
  postal_code: string;
  zone: string; // NORTH, SOUTH, etc.
  DGP_area: string;
  latitude: number;
  longitude: number;
  telephone_no: string;
  telephone_no_2: string;
  fax_no: string;
  fax_no_2: string;
  email_address: string;
  official_website: string;
  principal: string;
  vice_principles: string[];
  ranking?: number; // Keep this for compatibility
  school_distinctive_programmes: string[];
  MOE_programmes: string[];
  subjects: string[];
  CCA: string[];
  mother_tongue: string[];
  bus_desc: string;
  mrt_desc: string;
  school_image: string;
}

export interface FilterOptions {
  address: string[];
  school_level: string[];
  school_type: string[];
  zone: string[];
  subjects: string[];
  CCA: string[];
  school_distinctive_programmes: string[];
  MOE_programmes: string[];
  mother_tongue: string[];
  minRanking?: number;
  maxRanking?: number;
}

export interface SearchState {
  query: string;
  filters: FilterOptions;
}
