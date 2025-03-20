
import React from 'react';
import { X, MapPin, Award, BookOpen, Users, Dumbbell, Sparkles } from 'lucide-react';
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-white/80 backdrop-blur-md">
        <div className="relative h-64 w-full">
          <img
            src={institution.imageUrl}
            alt={institution.name}
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
                {institution.type}
              </span>
              
              {institution.ranking && (
                <span className="ml-2 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-primary/90 text-primary-foreground">
                  <Award className="h-3 w-3" />
                  Rank {institution.ranking}
                </span>
              )}
            </div>
            
            <h2 className="mt-2 text-xl font-semibold text-white">{institution.name}</h2>
            
            <div className="flex items-center mt-1 text-sm text-white/90">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{institution.location}</span>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl">About</DialogTitle>
            <DialogDescription>
              {institution.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="flex items-center text-sm font-medium mb-2">
                  <BookOpen className="h-4 w-4 mr-1 text-primary" />
                  Entry Requirements
                </h3>
                <ul className="space-y-1">
                  {institution.entryRequirements.map((req, index) => (
                    <li key={index} className="text-sm flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/70 mr-2" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="flex items-center text-sm font-medium mb-2">
                  <Users className="h-4 w-4 mr-1 text-primary" />
                  Co-Curricular Activities
                </h3>
                <div className="flex flex-wrap gap-1">
                  {institution.coCurricularActivities.map((activity, index) => (
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
            
            <div className="space-y-4">
              <div>
                <h3 className="flex items-center text-sm font-medium mb-2">
                  <Dumbbell className="h-4 w-4 mr-1 text-primary" />
                  Courses Offered
                </h3>
                <div className="flex flex-wrap gap-1">
                  {institution.coursesOffered.map((course, index) => (
                    <span 
                      key={index}
                      className="text-xs px-2 py-1 bg-muted rounded-full"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="flex items-center text-sm font-medium mb-2">
                  <Sparkles className="h-4 w-4 mr-1 text-primary" />
                  Special Programs
                </h3>
                <ul className="space-y-1">
                  {institution.specialPrograms.map((program, index) => (
                    <li key={index} className="text-sm flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/70 mr-2" />
                      {program}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 bg-muted/50 flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InstitutionDetailModal;
