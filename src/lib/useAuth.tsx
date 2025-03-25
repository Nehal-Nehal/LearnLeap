
import { useState, createContext, useContext, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";

// Define the user type
interface User {
  uid?: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

// Define the authentication context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

// Create default context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  // Mock sign in with Google function
  const signInWithGoogle = async (): Promise<void> => {
    setLoading(true);
    try {
      // For now, create a mock user
      const mockUser: User = {
        uid: 'mock-uid-123',
        displayName: 'Demo User',
        email: 'demo@example.com',
        photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo'
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser(mockUser);
    } catch (error) {
      toast({
        title: "Sign-in failed",
        description: "An error occurred during sign-in.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Mock sign out function
  const signOut = async (): Promise<void> => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(null);
      
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Sign-out failed",
        description: "An error occurred during sign-out.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
