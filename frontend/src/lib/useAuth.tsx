import { useState, createContext, useContext, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";
import axios from 'axios';

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
  signInWithCredentials: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

// Create default context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  // ✅ New: Sign in using credentials from backend
  const signInWithCredentials = async (username: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        username,
        password,
      });

      const data = response.data;

      // ✅ You can adjust this structure based on backend response
      const authenticatedUser: User = {
        displayName: data.displayName || username,
        email: data.email || null,
        photoURL: data.photoURL || null,
      };

      setUser(authenticatedUser);
      localStorage.setItem("username", username); // Save MongoDB ID
      toast({
        title: "Login successful",
        description: `Welcome back, ${authenticatedUser.displayName || "User"}!`,
        variant: "default"
      });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "An unknown error occurred.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    setLoading(true);
    try {
      const mockUser: User = {
        uid: 'mock-uid-123',
        displayName: 'Demo User',
        email: 'demo@example.com',
        photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo'
      };

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

  const signOut = async (): Promise<void> => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setUser(null);
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
        variant: "default"
      });
      localStorage.removeItem("username");
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

  const value: AuthContextType = {
    user,
    loading,
    signInWithGoogle,
    signInWithCredentials,
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
