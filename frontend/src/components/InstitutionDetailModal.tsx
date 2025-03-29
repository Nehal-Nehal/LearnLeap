
import React from 'react';
import { X, MapPin, Award, BookOpen, Users, Dumbbell, Sparkles, Phone, Mail, Globe, Bus, Train } from 'lucide-react';
import { Institution } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface InstitutionDetailModalProps {
  institution: Institution | null;
  isOpen: boolean;
  onClose: () => void;
}

const InstitutionDetailModal: React.FC<InstitutionDetailModalProps> = ({
  institution,
  isOpen,
  onClose
}) => {
  if (!institution) return null;

  const officialWebsite = institution['official website'] || institution.official_website || '';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        hideClose 
        className="max-w-3xl p-0 overflow-hidden bg-white/80 backdrop-blur-md max-h-[85vh] flex flex-col"
      >
        {/* Fixed header section with image */}
        <div className="relative h-52 w-full flex-shrink-0">
          <img
            src={institution.school_image}
            alt={institution.school_name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
          
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-4 right-4 bg-white/30 backdrop-blur-md text-white hover:bg-white/50 h-9 w-9"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
          
          <div className="absolute bottom-4 left-6">
            <div className="flex items-center">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-foreground">
                {institution.school_level}
              </span>
              
              {institution.ranking && (
                <span className="ml-2 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-primary/90 text-primary-foreground">
                  <Award className="h-3 w-3" />
                  Rank {institution.ranking}
                </span>
              )}
            </div>
            
            <h2 className="mt-2 text-xl font-semibold text-white">{institution.school_name}</h2>
            
            <div className="flex items-center mt-1 text-sm text-white/90">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{institution.address}</span>
            </div>
          </div>
        </div>
        
        {/* Scrollable content section */}
        <div className="overflow-y-auto px-6 py-4 flex-grow">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl">About</DialogTitle>
            <DialogDescription>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mt-2">
                <div className="flex">
                  <span className="font-medium mr-2">School Type:</span> 
                  <span>{institution.school_type}</span>
                </div>
                <div className="flex">
                  <span className="font-medium mr-2">Zone:</span> 
                  <span>{institution.zone}</span>
                </div>
                <div className="flex">
                  <span className="font-medium mr-2">Postal Code:</span> 
                  <span>{institution.postal_code}</span>
                </div>
                <div className="flex">
                  <span className="font-medium mr-2">Area:</span> 
                  <span>{institution.DGP_area}</span>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          
           {/* Contact Information Section */}
           <div className="mb-6">
            <h3 className="text-md font-medium mb-2">Contact Information</h3>
            <div className="grid grid-cols-1 gap-4 text-sm">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                <span>
                  {institution.telephone_no}
                  {institution.telephone_no_2 && institution.telephone_no_2 !== 'na' && `, ${institution.telephone_no_2}`}
                </span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                <a href={`mailto:${institution.email_address}`} className="hover:underline truncate">
                  {institution.email_address}
                </a>
              </div>
              {officialWebsite && (
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                  <a 
                    href={officialWebsite.startsWith('http') ? officialWebsite : `https://${officialWebsite}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:underline text-primary"
                  >
                    {officialWebsite}
                  </a>
                </div>
              )}
            </div>
          </div>
          
          {/* Administration Section */}
          <div className="mb-6">
            <h3 className="text-md font-medium mb-2">Administration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Principal:</span> {institution.principal}
              </div>
              {institution.vice_principles && institution.vice_principles.length > 0 && (
                <div>
                  <span className="font-medium">Vice Principal{institution.vice_principles.length > 1 ? 's' : ''}:</span>
                  <ul className="list-disc list-inside ml-2">
                    {institution.vice_principles.map((vp, index) => (
                      <li key={index}>{vp}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          {/* Transportation Section */}
          <div className="mb-6">
            <h3 className="text-md font-medium mb-2">Transportation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start">
                <Bus className="h-4 w-4 mr-2 text-primary mt-0.5" />
                <div>
                  <span className="font-medium">Bus Services:</span>
                  <p>{institution.bus_desc}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Train className="h-4 w-4 mr-2 text-primary mt-0.5" />
                <div>
                  <span className="font-medium">MRT/LRT:</span>
                  <p>{institution.mrt_desc}</p>
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="space-y-4">
              <div>
                <h3 className="flex items-center text-sm font-medium mb-2">
                  <BookOpen className="h-4 w-4 mr-1 text-primary" />
                  Subjects
                </h3>
                <div className="flex flex-wrap gap-1 max-h-40 overflow-y-auto">
                  {institution.subjects.map((subject, index) => (
                    <span 
                      key={index}
                      className="text-xs px-2 py-1 bg-muted rounded-full"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="flex items-center text-sm font-medium mb-2">
                  <Users className="h-4 w-4 mr-1 text-primary" />
                  Co-Curricular Activities
                </h3>
                <div className="flex flex-wrap gap-1 max-h-40 overflow-y-auto">
                  {institution.CCA.map((activity, index) => (
                    <span 
                      key={index}
                      className="text-xs px-2 py-1 bg-muted rounded-full"
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right column */}
            <div className="space-y-4">
              <div>
                <h3 className="flex items-center text-sm font-medium mb-2">
                  <Dumbbell className="h-4 w-4 mr-1 text-primary" />
                  Mother Tongue Languages
                </h3>
                <div className="flex flex-wrap gap-1">
                  {institution.mother_tongue.map((language, index) => (
                    <span 
                      key={index}
                      className="text-xs px-2 py-1 bg-muted rounded-full"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="flex items-center text-sm font-medium mb-2">
                  <Sparkles className="h-4 w-4 mr-1 text-primary" />
                  Distinctive Programs
                </h3>
                <div className="max-h-32 overflow-y-auto">
                  {institution.school_distinctive_programmes.length > 0 ? (
                    <ul className="space-y-1">
                      {institution.school_distinctive_programmes.map((program, index) => (
                        <li key={index} className="text-sm flex items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary/70 mr-2 flex-shrink-0" />
                          {program}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No distinctive programs listed</p>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="flex items-center text-sm font-medium mb-2">
                  <Sparkles className="h-4 w-4 mr-1 text-primary" />
                  MOE Programs
                </h3>
                <div className="max-h-32 overflow-y-auto">
                  {institution.MOE_programmes.length > 0 ? (
                    <ul className="space-y-1">
                      {institution.MOE_programmes.map((program, index) => (
                        <li key={index} className="text-sm flex items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary/70 mr-2 flex-shrink-0" />
                          {program}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No MOE programs listed</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InstitutionDetailModal;