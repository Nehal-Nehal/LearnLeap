
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
  
  // In a real implementation, we would use the Google Maps API here
  // For now, we'll just show a placeholder
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div 
      className={cn(
        "relative rounded-xl overflow-hidden shadow-sm bg-muted/30 backdrop-blur-sm border border-border/50 transition-all duration-300",
        className
      )}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-xs">
          <div className="h-8 w-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin-slow" />
        </div>
      )}
      
      <div className="relative h-full">
        {/* Placeholder map - would be replaced with Google Maps in actual implementation */}
        <div className="h-full w-full bg-[#f8f9fa] bg-opacity-80 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground">Map Placeholder - Would use Google Maps API in production</p>
          </div>
          
          {/* Placeholder markers */}
          <div className="absolute inset-0">
            {institutions.map((institution) => {
              // Map lat/long to relative positions for our placeholder
              const x = ((institution.longitude - 103.6) / 0.4) * 100; // Map Singapore longitude range to percentages
              const y = ((1.4 - institution.latitude) / 0.15) * 100; // Map Singapore latitude range to percentages
              
              const isSelected = selectedInstitution?.id === institution.id;
              
              return (
                <button
                  key={institution.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                  style={{ 
                    left: `${Math.min(Math.max(x, 10), 90)}%`, 
                    top: `${Math.min(Math.max(y, 10), 90)}%` 
                  }}
                  onClick={() => onMarkerClick(institution)}
                >
                  <div className={cn(
                    "map-marker",
                    isSelected && "active"
                  )}>
                    <MapPin className="h-4 w-4" />
                  </div>
                  
                  {isSelected && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-white rounded-lg shadow-md text-xs font-medium whitespace-nowrap z-10">
                      {institution.name}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Placeholder map elements */}
          <div className="absolute bottom-4 right-4 bg-white p-2 rounded-md shadow-sm">
            <div className="flex flex-col gap-2">
              <div className="w-6 h-6 bg-gray-300 rounded-sm" />
              <div className="w-6 h-6 bg-gray-300 rounded-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
