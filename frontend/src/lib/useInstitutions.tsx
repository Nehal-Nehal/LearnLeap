
import { useState, useEffect, useMemo } from 'react';
import { Institution, FilterOptions, SearchState } from './types';
import axios from 'axios';
import { generateFilterOptions } from './filterUtils';

// Define the type for filter options
export interface FilterOptionsData {
  addresses: string[];
  schoolLevels: string[];
  schoolTypes: string[];
  zones: string[];
  subjects: string[];
  ccas: string[];
  distinctivePrograms: string[];
  moePrograms: string[];
  motherTongues: string[];
  type: string[];
}

export const useInstitutions = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [searchState, setSearchState] = useState<SearchState>({
    query: '',
    filters: {
      address: [],
      school_level: [],
      school_type: [],
      zone: [],
      subjects: [],
      CCA: [],
      school_distinctive_programmes: [],
      MOE_programmes: [],
      mother_tongue: []
    }
  });
  
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State to hold filter options derived from actual data
  const [filterOptions, setFilterOptions] = useState<FilterOptionsData>({
    addresses: [],
    schoolLevels: [],
    schoolTypes: [],
    zones: [],
    subjects: [],
    ccas: [],
    distinctivePrograms: [],
    moePrograms: [],
    motherTongues: [],
    type: []
  });
  
  // Fetch data from the API
  useEffect(() => {
    const fetchInstitutions = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/institutions/getall');
        
        let institutionsData: Institution[] = [];
        
        // Check if the response contains the expected data
        if (response.data && Array.isArray(response.data.data)) {
          institutionsData = response.data.data;
        } else if (Array.isArray(response.data)) {
          institutionsData = response.data;
        } else {
          throw new Error('Invalid data format received from API');
        }
        
        // Ensure all institutions have the required arrays initialized
        institutionsData = institutionsData.map(inst => ({
          ...inst,
          subjects: inst.subjects || [],
          CCA: inst.CCA || [],
          school_distinctive_programmes: inst.school_distinctive_programmes || [],
          MOE_programmes: inst.MOE_programmes || [],
          mother_tongue: inst.mother_tongue || [],
          vice_principles: inst.vice_principles || []
        }));
        
        setInstitutions(institutionsData);
        
        // Generate filter options from the actual data
        const options = generateFilterOptions(institutionsData);
        setFilterOptions(options);
        
        setError(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstitutions();
  }, []);
  
  const filteredInstitutions = useMemo(() => {
    const { query, filters } = searchState;
    
    return institutions.filter(institution => {
      // Filter by search query
      if (query && !institution.school_name.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }
      
      // Filter by address
      if (filters.address && filters.address.length > 0 && !filters.address.includes(institution.address)) {
        return false;
      }
      
      // Filter by school_level
      if (filters.school_level && filters.school_level.length > 0 && !filters.school_level.includes(institution.school_level)) {
        return false;
      }
      
      // Filter by school_type
      if (filters.school_type && filters.school_type.length > 0 && !filters.school_type.includes(institution.school_type)) {
        return false;
      }
      
      // Filter by zone
      if (filters.zone && filters.zone.length > 0 && !filters.zone.includes(institution.zone)) {
        return false;
      }
      
      // Filter by subjects - match any
      if (filters.subjects && filters.subjects.length > 0 && 
          !institution.subjects.some(subject => filters.subjects?.includes(subject))) {
        return false;
      }
      
      // Filter by CCA - match any
      if (filters.CCA && filters.CCA.length > 0 && 
          !institution.CCA.some(activity => filters.CCA?.includes(activity))) {
        return false;
      }
      
      // Filter by school_distinctive_programmes - match any
      if (filters.school_distinctive_programmes && filters.school_distinctive_programmes.length > 0 && 
          !institution.school_distinctive_programmes.some(program => 
            filters.school_distinctive_programmes?.includes(program))) {
        return false;
      }
      
      // Filter by MOE_programmes - match any
      if (filters.MOE_programmes && filters.MOE_programmes.length > 0 && 
          !institution.MOE_programmes.some(program => 
            filters.MOE_programmes?.includes(program))) {
        return false;
      }
      
      // Filter by mother_tongue - match any
      if (filters.mother_tongue && filters.mother_tongue.length > 0 && 
          !institution.mother_tongue.some(language => 
            filters.mother_tongue?.includes(language))) {
        return false;
      }
      
      // Filter by ranking
      if (filters.minRanking !== undefined && 
          institution.ranking && 
          institution.ranking < filters.minRanking) {
        return false;
      }
      
      if (filters.maxRanking !== undefined && 
          institution.ranking && 
          institution.ranking > filters.maxRanking) {
        return false;
      }
      
      return true;
    });
  }, [searchState, institutions]);
  
  const updateSearchQuery = (query: string) => {
    setSearchState(prev => ({
      ...prev,
      query
    }));
  };
  
  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    setSearchState(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        ...newFilters
      }
    }));
  };
  
  const resetFilters = () => {
    setSearchState(prev => ({
      ...prev,
      filters: {
        address: [],
        school_level: [],
        school_type: [],
        zone: [],
        subjects: [],
        CCA: [],
        school_distinctive_programmes: [],
        MOE_programmes: [],
        mother_tongue: []
      }
    }));
  };
  
  return {
    institutions: filteredInstitutions,
    isLoading,
    error,
    selectedInstitution,
    setSelectedInstitution,
    searchState,
    filterOptions, // Add this to expose the filter options
    updateSearchQuery,
    updateFilters,
    resetFilters
  };
};