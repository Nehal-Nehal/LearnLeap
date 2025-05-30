import React from 'react';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/lib/useAuth';
import { Button } from './ui/button';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

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
        {["/", "/about", "/resources", "/contact"].map((path) => (
          <Link
            key={path}
            to={path}
            className={cn(
              "text-sm font-medium transition-colors",
              isActive(path) ? "text-primary" : "text-foreground hover:text-primary"
            )}
          >
            {path === "/" ? "Home" : path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
          </Link>
        ))}
      </nav>

      <div className="flex items-center space-x-4">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-2 rounded-full hover:bg-muted/50 p-1 transition-colors">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user.photoURL || "https://api.dicebear.com/7.x/initials/svg?seed=U"}
                    alt={user.displayName || "User"}
                  />
                  <AvatarFallback>{user.displayName?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden md:inline-block">
                  {user.displayName || "User"}
                </span>
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
              <DropdownMenuItem onClick={signOut}>
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="outline" onClick={() => navigate('/login')}>
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
