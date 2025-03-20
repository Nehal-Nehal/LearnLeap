
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';
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
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
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
        {/* Placeholder map - would be replaced with actual map API in production */}
        <div className="h-full w-full bg-[#f8f9fa] bg-opacity-80 relative overflow-hidden">
          <div className="absolute inset-0">
            {/* Singapore map outline placeholder */}
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
              <path d="M30,30 C40,20 60,20 70,30 C80,40 80,60 70,70 C60,80 40,80 30,70 C20,60 20,40 30,30 Z" 
                fill="none" stroke="#000" strokeWidth="0.5" />
            </svg>
          </div>
          
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
