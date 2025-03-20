
import React from 'react';
import { cn } from '@/lib/utils';
import { GraduationCap } from 'lucide-react';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn(
      "w-full px-6 py-4 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-border/40 shadow-sm z-10",
      className
    )}>
      <div className="flex items-center space-x-2">
        <GraduationCap className="h-8 w-8 text-primary" />
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold tracking-tight">EduQuest</h1>
          <p className="text-xs text-muted-foreground">Institution Search System</p>
        </div>
      </div>
      
      <nav className="hidden md:flex items-center space-x-8">
        <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
          Home
        </a>
        <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
          About
        </a>
        <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
          Resources
        </a>
        <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
          Contact
        </a>
      </nav>
      
      <div className="flex items-center space-x-4">
        <button className="relative inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
          Sign In
        </button>
      </div>
    </header>
  );
};

export default Header;
