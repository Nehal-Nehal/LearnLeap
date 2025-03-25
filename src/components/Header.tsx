
import React from 'react';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link, useLocation } from 'react-router-dom';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const location = useLocation();

  // Function to check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={cn(
      "w-full px-6 py-4 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-border/40 shadow-sm z-10",
      className
    )}>
      <div className="flex items-center space-x-2">
        <Link to="/" className="flex flex-col">
          <h1 className="text-xl font-semibold tracking-tight">LearnLeap</h1>
          <p className="text-xs text-muted-foreground">DISCOVER, LEARN, GROW</p>
        </Link>
      </div>
      
      <nav className="hidden md:flex items-center space-x-8">
        <Link 
          to="/" 
          className={cn(
            "text-sm font-medium transition-colors",
            isActive('/') ? "text-primary" : "text-foreground hover:text-primary"
          )}
        >
          Home
        </Link>
        <Link 
          to="/about" 
          className={cn(
            "text-sm font-medium transition-colors",
            isActive('/about') ? "text-primary" : "text-foreground hover:text-primary"
          )}
        >
          About
        </Link>
        <Link 
          to="/resources" 
          className={cn(
            "text-sm font-medium transition-colors",
            isActive('/resources') ? "text-primary" : "text-foreground hover:text-primary"
          )}
        >
          Resources
        </Link>
        <Link 
          to="/contact" 
          className={cn(
            "text-sm font-medium transition-colors",
            isActive('/contact') ? "text-primary" : "text-foreground hover:text-primary"
          )}
        >
          Contact
        </Link>
      </nav>
      
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-2 rounded-full hover:bg-muted/50 p-1 transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden md:inline-block">Guest</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center">
              <Link to="/profile" className="flex items-center w-full">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
