import { Institution } from './types';

// Generate filter options directly from the loaded institutions data
export const generateFilterOptions = (institutions: Institution[]) => {
  // For each filter category, create a Set to collect unique values
  const addresses = new Set<string>();
  const schoolLevels = new Set<string>();
  const schoolTypes = new Set<string>();
  const zones = new Set<string>();
  const subjects = new Set<string>();
  const ccas = new Set<string>();
  const distinctivePrograms = new Set<string>();
  const moePrograms = new Set<string>(); 
  const motherTongues = new Set<string>();

  // Process each institution to collect filter options
  institutions.forEach(institution => {
    // Add simple string properties
    if (institution.address) addresses.add(institution.address);
    if (institution.school_level) schoolLevels.add(institution.school_level);
    if (institution.school_type) schoolTypes.add(institution.school_type);
    if (institution.zone) zones.add(institution.zone);

    // Add array properties (check for null/undefined first)
    if (institution.subjects) {
      institution.subjects.forEach(subject => {
        if (subject) subjects.add(subject);
      });
    }

    if (institution.CCA) {
      institution.CCA.forEach(activity => {
        if (activity) ccas.add(activity);
      });
    }

    if (institution.school_distinctive_programmes) {
      institution.school_distinctive_programmes.forEach(program => {
        if (program) distinctivePrograms.add(program);
      });
    }

    if (institution.MOE_programmes) {
      institution.MOE_programmes.forEach(program => {
        if (program) moePrograms.add(program);
      });
    }

    if (institution.mother_tongue) {
      institution.mother_tongue.forEach(language => {
        if (language) motherTongues.add(language);
      });
    }
  });

  // Convert Sets to sorted arrays
  return {
    addresses: Array.from(addresses).sort(),
    schoolLevels: Array.from(schoolLevels).sort(),
    schoolTypes: Array.from(schoolTypes).sort(),
    zones: Array.from(zones).sort(),
    subjects: Array.from(subjects).sort(),
    ccas: Array.from(ccas).sort(),
    distinctivePrograms: Array.from(distinctivePrograms).sort(),
    moePrograms: Array.from(moePrograms).sort(),
    motherTongues: Array.from(motherTongues).sort(),
  };
};