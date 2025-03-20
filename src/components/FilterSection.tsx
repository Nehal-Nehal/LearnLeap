
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { FilterX, ChevronDown, Settings } from 'lucide-react';
import { FilterOptions } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { 
  getAllLocations, 
  getAllInstitutionTypes, 
  getAllEntryRequirements, 
  getAllCoursesOffered, 
  getAllCoCurricularActivities, 
  getAllSpecialPrograms 
} from '@/lib/mockData';

interface FilterSectionProps {
  filters: FilterOptions;
  onChange: (newFilters: Partial<FilterOptions>) => void;
  onReset: () => void;
  className?: string;
}

interface FilterItemProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

const FilterItem: React.FC<FilterItemProps> = ({ label, options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (option: string) => {
    const isSelected = selected.includes(option);
    if (isSelected) {
      onChange(selected.filter(item => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <div className="border-b border-border/50 pb-2">
        <CollapsibleTrigger asChild>
          <button className="flex items-center justify-between w-full py-2 text-sm font-medium text-left">
            <span>{label} {selected.length > 0 && `(${selected.length})`}</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-muted-foreground transition-transform duration-200",
                isOpen && "transform rotate-180"
              )}
            />
          </button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="pt-2 pb-4">
        <div className="max-h-48 overflow-y-auto space-y-1 pr-2">
          {options.map((option) => (
            <div key={option} className="flex items-center">
              <input
                type="checkbox"
                id={`${label}-${option}`}
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label
                htmlFor={`${label}-${option}`}
                className="ml-2 text-sm text-foreground"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

const FilterSection: React.FC<FilterSectionProps> = ({ 
  filters, 
  onChange, 
  onReset,
  className 
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  // Get all available filter options
  const locations = getAllLocations();
  const types = getAllInstitutionTypes();
  const entryRequirements = getAllEntryRequirements();
  const courses = getAllCoursesOffered();
  const activities = getAllCoCurricularActivities();
  const programs = getAllSpecialPrograms();
  
  const hasActiveFilters = Object.values(filters).some(
    value => Array.isArray(value) ? value.length > 0 : value !== undefined
  );

  return (
    <div className={cn(
      "bg-white/50 backdrop-blur-sm shadow-sm border border-border/40 rounded-xl p-4 transition-all duration-300",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-medium">Filters</h3>
        </div>
        
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onReset}
              className="h-8 px-2 text-xs"
            >
              <FilterX className="h-3 w-3 mr-1" />
              Reset
            </Button>
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 px-2"
          >
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform duration-200",
              isExpanded && "transform rotate-180"
            )} />
          </Button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="space-y-4">
          <FilterItem
            label="Type"
            options={types}
            selected={filters.type}
            onChange={(selected) => onChange({ type: selected })}
          />
          
          <FilterItem
            label="Location"
            options={locations}
            selected={filters.location}
            onChange={(selected) => onChange({ location: selected })}
          />
          
          <FilterItem
            label="Entry Requirements"
            options={entryRequirements}
            selected={filters.entryRequirements}
            onChange={(selected) => onChange({ entryRequirements: selected })}
          />
          
          <FilterItem
            label="Courses Offered"
            options={courses}
            selected={filters.coursesOffered}
            onChange={(selected) => onChange({ coursesOffered: selected })}
          />
          
          <FilterItem
            label="Co-Curricular Activities"
            options={activities}
            selected={filters.coCurricularActivities}
            onChange={(selected) => onChange({ coCurricularActivities: selected })}
          />
          
          <FilterItem
            label="Special Programs"
            options={programs}
            selected={filters.specialPrograms}
            onChange={(selected) => onChange({ specialPrograms: selected })}
          />
          
          <div className="pt-2">
            <h4 className="text-sm font-medium mb-2">QS Ranking</h4>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minRanking || ''}
                onChange={(e) => onChange({ minRanking: e.target.value ? Number(e.target.value) : undefined })}
                className="w-full rounded-md border border-border bg-background px-3 py-1 text-sm"
                min="1"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxRanking || ''}
                onChange={(e) => onChange({ maxRanking: e.target.value ? Number(e.target.value) : undefined })}
                className="w-full rounded-md border border-border bg-background px-3 py-1 text-sm"
                min="1"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSection;
