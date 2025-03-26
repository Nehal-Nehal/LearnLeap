
import React from 'react';
import Header from '@/components/Header';
import { GraduationCap, BookOpen, Users, Award, School, Building, MapPin } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header className="sticky top-0 z-50" />
      
      <main className="flex-1 container mx-auto px-4 py-12 md:px-6 xl:px-0">
        <section className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block rounded-full bg-primary/10 p-3 mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">About LearnLeap</h1>
            <p className="text-xl text-muted-foreground">
              Helping students and parents discover the right educational path in Singapore
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p>
              LearnLeap is a comprehensive educational institution search system designed specifically 
              for Singapore. Our mission is to help students and parents navigate the complex educational 
              landscape by providing detailed information about schools, colleges, and universities.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-border/40">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-primary/10 p-2 mr-3">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Our Vision</h3>
                </div>
                <p className="text-muted-foreground">
                  To be the most trusted resource for educational institution information in Singapore,
                  empowering families to make informed decisions about their educational journey.
                </p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-border/40">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-primary/10 p-2 mr-3">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Our Mission</h3>
                </div>
                <p className="text-muted-foreground">
                  To provide comprehensive, accurate, and up-to-date information about all educational 
                  institutions in Singapore, from primary schools to universities.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mt-12 mb-6">What We Offer</h2>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/50 backdrop-blur-sm border border-border/30 rounded-lg p-5">
                <School className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Comprehensive Database</h3>
                <p className="text-sm text-muted-foreground">
                  Information on all educational institutions in Singapore, from primary schools to universities.
                </p>
              </div>
              
              <div className="bg-white/50 backdrop-blur-sm border border-border/30 rounded-lg p-5">
                <BookOpen className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Detailed Profiles</h3>
                <p className="text-sm text-muted-foreground">
                  In-depth information about each institution's programs, facilities, and achievements.
                </p>
              </div>
              
              <div className="bg-white/50 backdrop-blur-sm border border-border/30 rounded-lg p-5">
                <Building className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Institution Comparison</h3>
                <p className="text-sm text-muted-foreground">
                  Tools to compare different institutions based on various criteria.
                </p>
              </div>
              
              <div className="bg-white/50 backdrop-blur-sm border border-border/30 rounded-lg p-5">
                <MapPin className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Interactive Maps</h3>
                <p className="text-sm text-muted-foreground">
                  Visual representation of institution locations with distance calculation.
                </p>
              </div>
              
              <div className="bg-white/50 backdrop-blur-sm border border-border/30 rounded-lg p-5">
                <Users className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-semibold mb-2">User Accounts</h3>
                <p className="text-sm text-muted-foreground">
                  Save favorite institutions and personalize your search experience.
                </p>
              </div>
              
              <div className="bg-white/50 backdrop-blur-sm border border-border/30 rounded-lg p-5">
                <Award className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Official Data</h3>
                <p className="text-sm text-muted-foreground">
                  Information sourced from official data.gov.sg datasets and institutional websites.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mt-12 mb-6">Our Story</h2>
            
            <p>
              LearnLeap was founded by a team of education enthusiasts who recognized the challenges that
              students and parents face when navigating Singapore's educational landscape. With backgrounds
              in education, technology, and data analysis, our team is committed to simplifying the process
              of finding the right educational institution.
            </p>
            
            <p className="mt-4">
              What started as a simple database has evolved into a comprehensive platform that serves
              thousands of users annually. We continually update our information and enhance our features
              to provide the most valuable resource possible for our users.
            </p>
            
            <div className="bg-primary/5 rounded-xl p-8 my-12 text-center">
              <h3 className="text-xl font-semibold mb-3">Our Commitment to Accuracy</h3>
              <p className="text-muted-foreground">
                We strive to ensure that all information on LearnLeap is accurate and up-to-date.
                Our data is sourced from official channels, and we regularly verify and update our database.
              </p>
            </div>
          </div>
        </section>
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

export default About;
