
import React, { useState } from 'react';
import { useInstitutions } from '@/lib/useInstitutions';
import { Institution } from '@/lib/types';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import FilterSection from '@/components/FilterSection';
import InstitutionCard from '@/components/InstitutionCard';
import InstitutionDetailModal from '@/components/InstitutionDetailModal';
import Map from '@/components/Map';
import { GraduationCap, FileText, School, Building, Loader2 } from 'lucide-react';

const Index = () => {
  const { 
    institutions,
    isLoading,
    selectedInstitution,
    setSelectedInstitution,
    searchState,
    updateSearchQuery,
    updateFilters,
    resetFilters
  } = useInstitutions();

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleCardClick = (institution: Institution) => {
    setSelectedInstitution(institution);
  };

  const handleViewDetails = (institution: Institution) => {
    setSelectedInstitution(institution);
    setShowDetailModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header className="sticky top-0 z-50" />
      
      <main className="flex-1 container mx-auto px-4 py-6 md:px-6 xl:px-0">
        <div className="flex flex-col space-y-6">
          {/* Hero section */}
          <section className="text-center py-10 px-4">
            <div className="inline-block rounded-full bg-primary/10 p-2 mb-4 animate-fade-in">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 animate-slide-down">
              Find Your Perfect <span className="text-primary">Educational Institution</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6 animate-slide-down" style={{ animationDelay: '100ms' }}>
              Discover universities, junior colleges, and schools across Singapore with our comprehensive search system.
            </p>
            
            <div className="max-w-3xl mx-auto animate-scale-in" style={{ animationDelay: '200ms' }}>
              <SearchBar 
                value={searchState.query} 
                onChange={updateSearchQuery} 
                placeholder="Search by institution name..."
              />
            </div>
          </section>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Sidebar with filters */}
            <div className="lg:col-span-1 space-y-6">
              <FilterSection 
                filters={searchState.filters}
                onChange={updateFilters}
                onReset={resetFilters}
              />
              
              {/* Institution types */}
              <div className="bg-white/50 backdrop-blur-sm shadow-sm border border-border/40 rounded-xl p-4">
                <h3 className="text-sm font-medium mb-3">Institution Types</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className="flex flex-col items-center justify-center p-3 rounded-lg bg-white border border-border/50 hover:border-primary/50 transition-colors"
                    onClick={() => updateFilters({ type: ['University'] })}
                  >
                    <Building className="h-5 w-5 text-primary mb-1" />
                    <span className="text-xs">Universities</span>
                  </button>
                  
                  <button
                    className="flex flex-col items-center justify-center p-3 rounded-lg bg-white border border-border/50 hover:border-primary/50 transition-colors"
                    onClick={() => updateFilters({ type: ['Junior College'] })}
                  >
                    <School className="h-5 w-5 text-primary mb-1" />
                    <span className="text-xs">Junior Colleges</span>
                  </button>
                  
                  <button
                    className="flex flex-col items-center justify-center p-3 rounded-lg bg-white border border-border/50 hover:border-primary/50 transition-colors"
                    onClick={() => updateFilters({ type: ['School'] })}
                  >
                    <FileText className="h-5 w-5 text-primary mb-1" />
                    <span className="text-xs">Schools</span>
                  </button>
                  
                  <button
                    className="flex flex-col items-center justify-center p-3 rounded-lg bg-white border border-border/50 hover:border-primary/50 transition-colors"
                    onClick={resetFilters}
                  >
                    <GraduationCap className="h-5 w-5 text-primary mb-1" />
                    <span className="text-xs">All Types</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2 xl:col-span-3 space-y-6">
              {/* Map section */}
              <div className="w-full h-[300px] md:h-[400px]">
                <Map 
                  institutions={institutions}
                  selectedInstitution={selectedInstitution}
                  onMarkerClick={handleCardClick}
                />
              </div>
              
              {/* Results section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">
                    Results 
                    <span className="ml-2 text-sm text-muted-foreground">
                      ({institutions.length} institutions found)
                    </span>
                  </h2>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      className={`p-1 rounded-md ${viewMode === 'grid' ? 'bg-muted' : 'hover:bg-muted/50'}`}
                      onClick={() => setViewMode('grid')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                      </svg>
                    </button>
                    <button
                      className={`p-1 rounded-md ${viewMode === 'list' ? 'bg-muted' : 'hover:bg-muted/50'}`}
                      onClick={() => setViewMode('list')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="8" y1="6" x2="21" y2="6" />
                        <line x1="8" y1="12" x2="21" y2="12" />
                        <line x1="8" y1="18" x2="21" y2="18" />
                        <line x1="3" y1="6" x2="3.01" y2="6" />
                        <line x1="3" y1="12" x2="3.01" y2="12" />
                        <line x1="3" y1="18" x2="3.01" y2="18" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {isLoading ? (
                  <div className="flex items-center justify-center h-60">
                    <div className="flex flex-col items-center">
                      <Loader2 className="h-8 w-8 text-primary animate-spin" />
                      <p className="mt-2 text-sm text-muted-foreground">Loading institutions...</p>
                    </div>
                  </div>
                ) : institutions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-60 bg-white/50 backdrop-blur-sm rounded-xl border border-border/40 p-6">
                    <GraduationCap className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No institutions found</h3>
                    <p className="text-muted-foreground text-center max-w-xs mt-2">
                      Try adjusting your search or filter criteria to find institutions.
                    </p>
                  </div>
                ) : (
                  <div 
                    className={viewMode === 'grid' 
                      ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" 
                      : "flex flex-col space-y-4"
                    }
                  >
                    {institutions.map((institution) => (
                      <InstitutionCard
                        key={institution.id}
                        institution={institution}
                        isSelected={selectedInstitution?.id === institution.id}
                        onClick={() => handleCardClick(institution)}
                        onViewDetails={() => handleViewDetails(institution)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="mt-auto py-6 bg-muted/50 border-t border-border/40">
        <div className="container mx-auto px-4 md:px-6 xl:px-0">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <GraduationCap className="h-5 w-5 text-primary" />
              <span className="font-medium">EduQuest</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} EduQuest Institution Search System
            </p>
          </div>
        </div>
      </footer>
      
      <InstitutionDetailModal
        institution={selectedInstitution}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </div>
  );
};

export default Index;
