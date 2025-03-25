
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
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedInstitution) {
      setMapCenter({
        lat: selectedInstitution.latitude,
        lng: selectedInstitution.longitude
      });
      
      if (userLocation) {
        calculateRoute(userLocation, {
          lat: selectedInstitution.latitude,
          lng: selectedInstitution.longitude
        });
      }
    }
  }, [selectedInstitution, userLocation]);
  
  const calculateRoute = (start: {lat: number; lng: number}, end: {lat: number; lng: number}) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (end.lat - start.lat) * Math.PI / 180;
    const dLon = (end.lng - start.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(start.lat * Math.PI / 180) * Math.cos(end.lat * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    const duration = distance / 30 * 60; // minutes
    
    setRouteInfo({
      distance: `${distance.toFixed(1)} km`,
      duration: `${Math.round(duration)} mins`
    });
  };
  
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
        {/* Real map background */}
        <div className="h-full w-full relative overflow-hidden">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255281.19036084877!2d103.70693276922054!3d1.3143393776513576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da11238a8b9375%3A0x887869cf52abf5c4!2sSingapore!5e0!3m2!1sen!2ssg!4v1624932662556!5m2!1sen!2ssg" 
            className="absolute inset-0 w-full h-full border-0 z-0"
            style={{ opacity: 0.8 }}
            loading="lazy"
            allowFullScreen
          ></iframe>
          
          <div className="absolute inset-0 z-10">
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
                
                {routeInfo && (
                  <div className="absolute top-4 left-4 bg-white/90 p-2 rounded-md shadow-sm z-30 text-sm">
                    <div className="font-medium">Route Information</div>
                    <div className="text-xs text-muted-foreground">Distance: {routeInfo.distance}</div>
                    <div className="text-xs text-muted-foreground">Est. travel time: {routeInfo.duration}</div>
                  </div>
                )}
              </>
            )}
            
            <div className="absolute inset-0">
              {institutions.map((institution) => {
                const x = ((institution.longitude - 103.6) / 0.4) * 100;
                const y = ((1.45 - institution.latitude) / 0.2) * 100;
                
                const isSelected = selectedInstitution?.id === institution.id;
                
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
          </div>
          
          <div className="absolute top-4 right-4 space-y-2 z-20">
            <button 
              className="flex items-center justify-center h-10 w-10 bg-white rounded-full shadow-md hover:bg-gray-50"
              onClick={() => setMapCenter({ lat: 1.3521, lng: 103.8198 })}
            >
              <Navigation className="h-5 w-5 text-primary" />
            </button>
          </div>
          
          <div className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-md shadow-sm z-20">
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
      
      <style>
        {`
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
      `}
      </style>
    </div>
  );
};

export default Map;
