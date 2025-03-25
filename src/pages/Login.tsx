
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/useAuth';
import { GraduationCap } from 'lucide-react';

const Login = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      navigate('/');
    }
  }, [user, loading, navigate]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
          <div className="text-center mb-8">
            <div className="inline-block rounded-full bg-primary/10 p-3 mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to LearnLeap</h1>
            <p className="text-muted-foreground">
              Your educational journey starts here
            </p>
          </div>
          
          <div className="space-y-4 text-center">
            <p className="text-lg">
              LearnLeap helps you discover educational institutions and resources to support your learning journey.
            </p>
            <p className="text-muted-foreground">
              Explore our resources and find the perfect institution for your needs.
            </p>
            <div className="pt-4">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
              >
                Explore LearnLeap
              </button>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            By using LearnLeap, you agree to our{' '}
            <a href="#" className="text-primary hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
          </div>
        </div>
      </div>
      
      <footer className="py-6">
        <div className="container mx-auto px-4 md:px-6 xl:px-0">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="font-medium">LearnLeap</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} LearnLeap - Discover, Learn, Grow
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
