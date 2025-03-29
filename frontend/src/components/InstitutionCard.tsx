import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { MapPin, Award, Info } from 'lucide-react';
import { Institution } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react'; 
import axios from 'axios';

interface InstitutionCardProps {
  institution: Institution;
  isSelected: boolean;
  onClick: () => void;
  onViewDetails: () => void;
  isFavourited?: boolean;
  onToggleFavourite?: (institutionName: string, favourited: boolean) => void;
}

const InstitutionCard: React.FC<InstitutionCardProps> = ({
  institution,
  isSelected,
  onClick,
  onViewDetails,
  isFavourited = false,
  onToggleFavourite,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const username = localStorage.getItem('username');
  const isSignedIn = !!username;

  const handleFavourite = async (e: React.MouseEvent) => {
    e.stopPropagation();
  
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/users/favourite', {
        username,
        institution_name: institution.school_name // Changed from institution.name
      });
      if (onToggleFavourite) {
        onToggleFavourite(institution.school_name, response.data.favourited); // Changed from institution.name
      }
      alert(response.data.message);
    } catch (error: any) {
      console.error('Error toggling favourite:', error.response?.data || error.message);
    }
  };
  return (
    <div 
      className={cn(
        "relative group cursor-pointer overflow-hidden transition-all duration-300 bg-white/60 backdrop-blur-md border border-border/40 rounded-xl hover:bg-white/80 hover:shadow-md",
        isSelected && "ring-2 ring-primary bg-white/80 shadow-md"
      )}
      onClick={onClick}
    >
      <div className="relative h-40 overflow-hidden rounded-t-xl">
        <div className={cn(
          "absolute inset-0 bg-gray-200 animate-pulse",
          imageLoaded && "animate-none bg-transparent"
        )} />
        <img
          src={institution.school_image} // Changed from institution.imageUrl
          alt={institution.school_name} // Changed from institution.name
          className={cn(
            "lazy-image w-full h-full object-cover transition-all duration-700",
            imageLoaded && "loaded"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        
        <div className="absolute bottom-0 left-0 p-3 flex items-center">
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-foreground">
            {institution.school_level} {/* Changed from institution.type */}
          </span>
        </div>
        
        {institution.ranking && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-primary/90 text-primary-foreground">
            <Award className="h-3 w-3" />
            <span>Rank {institution.ranking}</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-medium line-clamp-1">{institution.school_name}</h3> {/* Changed from institution.name */}
        
        <div className="flex items-center mt-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span>{institution.address}</span> {/* Changed from institution.location */}
        </div>
        
        <div className="mt-3 flex flex-wrap gap-1">
          {institution.subjects.slice(0, 3).map((subject, index) => ( // Changed from institution.coursesOffered
            <span 
              key={index}
              className="text-xs px-2 py-0.5 bg-muted rounded-full"
            >
              {subject}
            </span>
          ))}
          {institution.subjects.length > 3 && ( // Changed from institution.coursesOffered
            <span className="text-xs px-2 py-0.5 bg-muted rounded-full">
              +{institution.subjects.length - 3} more
            </span>
          )}
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-8 bg-white"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
          >
            <Info className="h-3 w-3 mr-1" />
            Details
          </Button>
          
          {isSignedIn && (
            <Button
              size="sm"
              variant="ghost"
              className={cn(
                "text-xs h-8",
                isFavourited ? "text-primary" : "text-muted-foreground hover:text-primary"
              )}
              onClick={handleFavourite}
            >
              <Heart
                className={cn("h-4 w-4 mr-1", isFavourited && "fill-current")}
              />
              {isFavourited ? "Favourited" : "Favourite"}
            </Button>
          )}
        </div>
      </div>
      
      <div className="absolute inset-0 pointer-events-none animated-border"></div>
    </div>
  );
};

export default InstitutionCard;