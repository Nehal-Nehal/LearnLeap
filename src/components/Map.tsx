
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { MapPin, Navigation, LocateFixed } from 'lucide-react';
import { Institution } from '@/lib/types';

interface MapProps {
  institutions: Institution[];
  selectedInstitution: Institution | null;
  onMarkerClick: (institution: Institution) => void;
  className?: string;
}

const Map: React.FC<MapProps> = ({
  institutions,
  selectedInstitution,
  onMarkerClick,
  className
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 1.3521, lng: 103.8198 }); // Singapore center
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null);
  const [routeInfo, setRouteInfo] = useState<{distance: string; duration: string} | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          console.log("User location:", position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Center map on selected institution if available
    if (selectedInstitution) {
      setMapCenter({
        lat: selectedInstitution.latitude,
        lng: selectedInstitution.longitude
      });
      
      // If user location is available, calculate route
      if (userLocation) {
        calculateRoute(userLocation, {
          lat: selectedInstitution.latitude,
          lng: selectedInstitution.longitude
        });
      }
    }
  }, [selectedInstitution, userLocation]);
  
  const calculateRoute = (start: {lat: number; lng: number}, end: {lat: number; lng: number}) => {
    // In a real implementation, this would call a directions API
    // For demo purposes, we'll simulate a response
    
    // Calculate straight-line distance (Haversine formula)
    const R = 6371; // Radius of the Earth in km
    const dLat = (end.lat - start.lat) * Math.PI / 180;
    const dLon = (end.lng - start.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(start.lat * Math.PI / 180) * Math.cos(end.lat * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    // Assume average speed of 30 km/h in Singapore traffic
    const duration = distance / 30 * 60; // minutes
    
    setRouteInfo({
      distance: `${distance.toFixed(1)} km`,
      duration: `${Math.round(duration)} mins`
    });
  };
  
  // Group institutions by type for the legend
  const institutionTypes = [...new Set(institutions.map(inst => inst.type))];
  
  return (
    <div 
      className={cn(
        "relative rounded-xl overflow-hidden shadow-sm bg-muted/30 backdrop-blur-sm border border-border/50 transition-all duration-300",
        className
      )}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-xs z-10">
          <div className="h-8 w-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin-slow" />
        </div>
      )}
      
      <div className="relative h-full">
        {/* Singapore map with institutions */}
        <div className="h-full w-full bg-[#f8f9fa] bg-opacity-80 relative overflow-hidden">
          <div className="absolute inset-0">
            {/* Singapore map outline */}
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
              <path d="M30,30 C40,20 60,20 70,30 C80,40 80,60 70,70 C60,80 40,80 30,70 C20,60 20,40 30,30 Z" 
                fill="none" stroke="#000" strokeWidth="0.5" />
            </svg>
            
            {/* Singapore region outlines - simplified */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-10">
              <path d="M25,40 C30,35 40,38 45,35 C50,32 55,35 60,38 C65,41 70,38 75,40 C70,50 65,55 60,60 C55,65 45,65 40,60 C35,55 30,50 25,40 Z" 
                fill="#7dd3fc" stroke="#0ea5e9" strokeWidth="0.2" />
              <path d="M45,35 C50,32 55,35 60,38 C65,41 70,38 75,40 C80,45 78,55 75,60 C70,65 65,62 60,60 C55,65 45,65 40,60 C45,55 50,50 45,35 Z" 
                fill="#a5f3fc" stroke="#06b6d4" strokeWidth="0.2" />
              <path d="M25,40 C30,35 40,38 45,35 C50,50 45,55 40,60 C35,55 30,50 25,40 Z" 
                fill="#bae6fd" stroke="#0284c7" strokeWidth="0.2" />
            </svg>
          </div>
          
          {/* User location marker */}
          {userLocation && (
            <div 
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30"
              style={{ 
                left: `${((userLocation.lng - 103.6) / 0.4) * 100}%`,
                top: `${((1.45 - userLocation.lat) / 0.2) * 100}%`
              }}
            >
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-500 border-2 border-white shadow-lg pulse-animation">
                <LocateFixed className="h-3 w-3 text-white" />
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-medium bg-white/80 px-1 rounded shadow-sm">
                You
              </div>
            </div>
          )}
          
          {/* Route line between user and selected institution */}
          {userLocation && selectedInstitution && (
            <>
              <svg 
                className="absolute inset-0 w-full h-full z-20"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <line 
                  x1={((userLocation.lng - 103.6) / 0.4) * 100}
                  y1={((1.45 - userLocation.lat) / 0.2) * 100}
                  x2={((selectedInstitution.longitude - 103.6) / 0.4) * 100}
                  y2={((1.45 - selectedInstitution.latitude) / 0.2) * 100}
                  stroke="#3b82f6"
                  strokeWidth="0.8"
                  strokeDasharray="2"
                />
              </svg>
              
              {/* Route info */}
              {routeInfo && (
                <div className="absolute top-4 left-4 bg-white/90 p-2 rounded-md shadow-sm z-30 text-sm">
                  <div className="font-medium">Route Information</div>
                  <div className="text-xs text-muted-foreground">Distance: {routeInfo.distance}</div>
                  <div className="text-xs text-muted-foreground">Est. travel time: {routeInfo.duration}</div>
                </div>
              )}
            </>
          )}
          
          {/* Institution markers */}
          <div className="absolute inset-0">
            {institutions.map((institution) => {
              // Map lat/long to relative positions for our placeholder
              const x = ((institution.longitude - 103.6) / 0.4) * 100; // Map Singapore longitude range to percentages
              const y = ((1.45 - institution.latitude) / 0.2) * 100; // Map Singapore latitude range to percentages
              
              const isSelected = selectedInstitution?.id === institution.id;
              
              // Determine marker color based on institution type
              let markerColorClass = "text-primary";
              if (institution.type === "Junior College") markerColorClass = "text-orange-500";
              else if (institution.type === "School") markerColorClass = "text-blue-500";
              else if (institution.type === "Polytechnic") markerColorClass = "text-green-500";
              else if (institution.type === "Primary School") markerColorClass = "text-purple-500";
              else if (institution.type === "Secondary School") markerColorClass = "text-cyan-600";
              
              return (
                <button
                  key={institution.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 focus:outline-none group"
                  style={{ 
                    left: `${Math.min(Math.max(x, 5), 95)}%`, 
                    top: `${Math.min(Math.max(y, 5), 95)}%` 
                  }}
                  onClick={() => onMarkerClick(institution)}
                >
                  <div className={cn(
                    "flex items-center justify-center h-6 w-6 rounded-full transition-all",
                    isSelected ? "scale-150 shadow-lg" : "scale-100 group-hover:scale-125",
                    isSelected ? "bg-white" : "bg-white/80 group-hover:bg-white"
                  )}>
                    <MapPin className={cn("h-4 w-4", markerColorClass)} />
                  </div>
                  
                  {isSelected && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-white rounded-lg shadow-md text-xs font-medium whitespace-nowrap z-10 min-w-40 text-center">
                      {institution.name}
                      <div className="text-[10px] text-muted-foreground">{institution.type}</div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Map controls */}
          <div className="absolute top-4 right-4 space-y-2">
            <button 
              className="flex items-center justify-center h-10 w-10 bg-white rounded-full shadow-md hover:bg-gray-50"
              onClick={() => setMapCenter({ lat: 1.3521, lng: 103.8198 })}
            >
              <Navigation className="h-5 w-5 text-primary" />
            </button>
          </div>
          
          {/* Map legend */}
          <div className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-md shadow-sm">
            <div className="text-xs font-medium mb-2">Institution Types</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3 text-primary" />
                <span className="text-xs">Universities</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3 text-orange-500" />
                <span className="text-xs">Junior Colleges</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3 text-blue-500" />
                <span className="text-xs">Schools</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3 text-green-500" />
                <span className="text-xs">Polytechnics</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3 text-purple-500" />
                <span className="text-xs">Primary Schools</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3 text-cyan-600" />
                <span className="text-xs">Secondary Schools</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for the pulsing effect */}
      <style jsx>{`
        .pulse-animation {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default Map;
