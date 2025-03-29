
import React, { useState,useEffect} from 'react';
import axios from 'axios';
import { useInstitutions } from '@/lib/useInstitutions';
import { Institution } from '@/lib/types';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import FilterSection from '@/components/FilterSection';
import InstitutionCard from '@/components/InstitutionCard';
import InstitutionDetailModal from '@/components/InstitutionDetailModal';
import Map from '@/components/Map';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, FileText, School, Building, Loader2, MapPin, UserPlus, Scale } from 'lucide-react';

const Index = () => {
  const { 
    institutions,
    isLoading,
    selectedInstitution,
    setSelectedInstitution,
    searchState,
    filterOptions, // Make sure to get this from useInstitutions
    updateSearchQuery,
    updateFilters,
    resetFilters
  } = useInstitutions();

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState("search");
  const [favouritedInstitutions, setFavouritedInstitutions] = useState<string[]>([]);
  const [showOnlyFavourites, setShowOnlyFavourites] = useState(false);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchFavourites = async () => {
      if (!username) return;
  
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/users/get-favourites?username=${username}`);
        setFavouritedInstitutions(response.data.favourites || []);
      } catch (error) {
        console.error("Failed to load favourites:", error);
      }
    };
  
    fetchFavourites();
  }, [username]);

  const handleToggleFavourite = (institutionName: string, favourited: boolean) => {
    setFavouritedInstitutions((prev) =>
      favourited
        ? [...new Set([...prev, institutionName])]
        : prev.filter((name) => name !== institutionName)
    );
  };
  

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
          <section className="text-center py-8 px-4">
            <div className="inline-block rounded-full bg-primary/10 p-2 mb-4 animate-fade-in">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 animate-slide-down">
              Find Your Perfect <span className="text-primary">Educational Institution</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6 animate-slide-down" style={{ animationDelay: '100ms' }}>
              Discover universities, junior colleges, and schools across Singapore with LearnLeap's comprehensive search system.
            </p>
            
            <div className="max-w-3xl mx-auto animate-scale-in" style={{ animationDelay: '200ms' }}>
              <SearchBar 
                value={searchState.query} 
                onChange={updateSearchQuery} 
                placeholder="Search by institution name..."
              />
            </div>
          </section>
          
          {/* Main tabs */}
          <Tabs defaultValue="search" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start mb-6">
              <TabsTrigger value="search" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                <span>Institution Search</span>
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Interactive Map</span>
              </TabsTrigger>
              <TabsTrigger value="register" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                <span>Registration</span>
              </TabsTrigger>
              <TabsTrigger value="compare" className="flex items-center gap-2">
                <Scale className="h-4 w-4" />
                <span>Compare</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Search tab content */}
            <TabsContent value="search" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Sidebar with filters */}
                <div className="lg:col-span-1 space-y-6">
                  <FilterSection 
                    filters={searchState.filters}
                    filterOptions={filterOptions} // Pass the filter options
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
                            isFavourited={favouritedInstitutions.includes(institution.school_name)}
                            onToggleFavourite={handleToggleFavourite} // ✅ new
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Map tab content */}
            <TabsContent value="map" className="mt-0">
              <div className="bg-white/50 backdrop-blur-sm shadow-sm border border-border/40 rounded-xl p-4">
              <h2 className="text-xl font-semibold mb-4 flex justify-between items-center">
                  <span>Institution Locations</span>
                  
                  {/* ✅ Toggle favourite filter */}
                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={showOnlyFavourites}
                      onChange={(e) => setShowOnlyFavourites(e.target.checked)}
                      className="accent-primary"
                    />
                    <span>Show only favourited</span>
                  </label>
              </h2>
                <div className="w-full h-[600px]">
                  <Map 
                    institutions={
                      showOnlyFavourites
                        ? institutions.filter((inst) => favouritedInstitutions.includes(inst.school_name))
                        : institutions
                    }
                    selectedInstitution={selectedInstitution}
                    onMarkerClick={handleCardClick}
                  />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Interactive map showing all educational institutions in Singapore. Click on a marker to view details.
                </p>
              </div>
            </TabsContent>
            
            {/* Registration tab content */}
            <TabsContent value="register" className="mt-0">
              <div className="bg-white/50 backdrop-blur-sm shadow-sm border border-border/40 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Institution Registration</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-muted-foreground mb-6">
                      Are you an educational institution in Singapore? Register with LearnLeap to showcase your 
                      programs, facilities, and achievements to prospective students.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="p-4 border border-border/40 rounded-lg bg-muted/30">
                        <h3 className="font-medium mb-2 flex items-center">
                          <GraduationCap className="h-4 w-4 mr-2 text-primary" />
                          Enhanced Visibility
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Get discovered by students looking for educational opportunities.
                        </p>
                      </div>
                      
                      <div className="p-4 border border-border/40 rounded-lg bg-muted/30">
                        <h3 className="font-medium mb-2 flex items-center">
                          <School className="h-4 w-4 mr-2 text-primary" />
                          Detailed Profile
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Showcase your courses, facilities, and unique programs.
                        </p>
                      </div>
                      
                      <div className="p-4 border border-border/40 rounded-lg bg-muted/30">
                        <h3 className="font-medium mb-2 flex items-center">
                          <Building className="h-4 w-4 mr-2 text-primary" />
                          Direct Engagement
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Connect directly with interested students.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 border border-border/40 rounded-lg bg-white">
                    <h3 className="text-lg font-medium mb-4">Request Registration</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Complete the form below to begin the registration process. Our team will contact you shortly.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Institution Name</label>
                        <input 
                          type="text" 
                          className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                          placeholder="Enter institution name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Email Address</label>
                        <input 
                          type="email" 
                          className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                          placeholder="Enter official email"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Contact Person</label>
                        <input 
                          type="text" 
                          className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                          placeholder="Enter contact person name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Institution Type</label>
                        <select className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/50">
                          <option value="">Select institution type</option>
                          <option value="university">University</option>
                          <option value="polytechnic">Polytechnic</option>
                          <option value="junior-college">Junior College</option>
                          <option value="secondary-school">Secondary School</option>
                          <option value="primary-school">Primary School</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <button className="w-full bg-primary text-white p-2 rounded-md hover:bg-primary/90 transition-colors">
                        Submit Registration Request
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="compare" className="mt-0">
              <div className="bg-white/50 backdrop-blur-sm shadow-sm border border-border/40 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Compare Favourited Institutions</h2>

                {favouritedInstitutions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">You have not favourited any institutions yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                      <thead className="bg-muted/50 text-muted-foreground">
                        <tr>
                          <th className="px-4 py-2 border">Name</th>
                          <th className="px-4 py-2 border">Type</th>
                          <th className="px-4 py-2 border">Location</th>
                          <th className="px-4 py-2 border">Subjects</th>
                          <th className="px-4 py-2 border">CCA</th>
                          <th className="px-4 py-2 border">Special Programs</th>
                        </tr>
                      </thead>
                      <tbody>
                        {institutions
                          .filter((inst) => favouritedInstitutions.includes(inst.school_name))
                          .map((inst) => (
                            <tr key={inst.id} className="border-t">
                              <td className="px-4 py-2 border font-medium">{inst.school_name}</td>
                              <td className="px-4 py-2 border">{inst.school_type}</td>
                              <td className="px-4 py-2 border">
                                {inst.address}, S({inst.postal_code})
                              </td>
                              <td className="px-4 py-2 border">
                                {inst.subjects?.length > 0
                                  ? inst.subjects.slice(0, 3).join(", ") + (inst.subjects.length > 3 ? "..." : "")
                                  : "N/A"}
                              </td>
                              <td className="px-4 py-2 border">
                                {inst.CCA?.length > 0
                                  ? inst.CCA.slice(0, 3).join(", ") + (inst.CCA.length > 3 ? "..." : "")
                                  : "N/A"}
                              </td>
                              <td className="px-4 py-2 border">
                                {[...(inst.school_distinctive_programmes || []), ...(inst.MOE_programmes || [])]
                                  .slice(0, 3)
                                  .join(", ") + (
                                    (inst.school_distinctive_programmes?.length || 0) + (inst.MOE_programmes?.length || 0) > 3
                                      ? "..."
                                      : ""
                                  ) || "N/A"}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="mt-auto py-6 bg-muted/50 border-t border-border/40">
        <div className="container mx-auto px-4 md:px-6 xl:px-0">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="font-medium">LearnLeap</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} LearnLeap - Discover, Learn, Grow
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
