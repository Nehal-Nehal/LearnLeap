
import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  className,
  placeholder = "Search for institutions..."
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input when user presses "/" key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div 
      className={cn(
        "relative flex items-center w-full max-w-4xl transition-all duration-300",
        isFocused && "ring-2 ring-primary/20",
        className
      )}
    >
      <div className={cn(
        "w-full relative bg-white/60 backdrop-blur-md shadow-sm border border-border/60 rounded-xl overflow-hidden transition-all duration-300 group hover:border-primary/40",
        isFocused && "border-primary/60"
      )}>
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
          <Search className="h-5 w-5" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          className="w-full h-12 pl-10 pr-10 bg-transparent text-sm placeholder-muted-foreground/80 focus:outline-none focus:ring-0 border-0"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      
      <div className="absolute right-3 -top-6 text-xs text-muted-foreground pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100">
        Press <kbd className="px-1.5 py-0.5 bg-muted border border-border rounded text-[10px] font-mono">/</kbd> to search
      </div>
    </div>
  );
};

export default SearchBar;
