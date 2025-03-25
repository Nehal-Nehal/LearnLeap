
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/useAuth';
import Header from '@/components/Header';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut, Mail, User } from 'lucide-react';

const Profile = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header className="sticky top-0 z-50" />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!user) return null;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header className="sticky top-0 z-50" />
      
      <main className="flex-1 container mx-auto px-4 py-6 md:px-6 xl:px-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User"} />
                  <AvatarFallback className="text-lg">{user.displayName?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-xl font-medium">{user.displayName}</h3>
                  <p className="text-sm text-muted-foreground flex items-center justify-center gap-1 mt-1">
                    <Mail className="h-3 w-3" /> {user.email}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={signOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>My Activity</CardTitle>
                <CardDescription>Your recent searches and saved institutions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border border-border/40 rounded-lg p-4">
                    <h3 className="font-medium mb-2">Recent Searches</h3>
                    <div className="text-sm text-muted-foreground">
                      No recent searches yet.
                    </div>
                  </div>
                  
                  <div className="border border-border/40 rounded-lg p-4">
                    <h3 className="font-medium mb-2">Saved Institutions</h3>
                    <div className="text-sm text-muted-foreground">
                      You haven't saved any institutions yet.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Registration Status</CardTitle>
                <CardDescription>Institutional registration status and history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  You haven't submitted any registration requests yet.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <footer className="mt-auto py-6 bg-muted/50 border-t border-border/40">
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

export default Profile;
