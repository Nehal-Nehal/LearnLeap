
import React from 'react';
import Header from '@/components/Header';
import { FileText, BookOpen, GraduationCap, Link2, Download, ExternalLink, Play, Video } from 'lucide-react';

const Resources = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header className="sticky top-0 z-50" />
      
      <main className="flex-1 container mx-auto px-4 py-12 md:px-6 xl:px-0">
        <section className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block rounded-full bg-primary/10 p-3 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">Educational Resources</h1>
            <p className="text-xl text-muted-foreground">
              Helpful guides, tools, and information for students and parents
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 mb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-border/40">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <FileText className="mr-2 h-5 w-5 text-primary" />
                Guides & Publications
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-white/80 rounded-lg border border-border/30 hover:border-primary/30 transition-colors">
                  <h3 className="font-semibold flex items-center">
                    <Download className="mr-2 h-4 w-4 text-primary" />
                    Singapore Education System Guide
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    A comprehensive overview of Singapore's education system, from primary school to university.
                  </p>
                  <a href="#" className="text-primary text-sm flex items-center mt-2 hover:underline">
                    Download PDF <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
                
                <div className="p-4 bg-white/80 rounded-lg border border-border/30 hover:border-primary/30 transition-colors">
                  <h3 className="font-semibold flex items-center">
                    <Download className="mr-2 h-4 w-4 text-primary" />
                    University Admissions Handbook
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Everything you need to know about applying to universities in Singapore.
                  </p>
                  <a href="#" className="text-primary text-sm flex items-center mt-2 hover:underline">
                    Download PDF <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
                
                <div className="p-4 bg-white/80 rounded-lg border border-border/30 hover:border-primary/30 transition-colors">
                  <h3 className="font-semibold flex items-center">
                    <Download className="mr-2 h-4 w-4 text-primary" />
                    School Selection Checklist
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    A printable checklist to help you evaluate and compare educational institutions.
                  </p>
                  <a href="#" className="text-primary text-sm flex items-center mt-2 hover:underline">
                    Download PDF <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-border/40">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Link2 className="mr-2 h-5 w-5 text-primary" />
                Useful Links
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-white/80 rounded-lg border border-border/30 hover:border-primary/30 transition-colors">
                  <h3 className="font-semibold">Official Government Resources</h3>
                  <ul className="mt-2 space-y-2">
                    <li>
                      <a href="https://www.moe.gov.sg/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center text-sm">
                        Ministry of Education <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.seab.gov.sg/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center text-sm">
                        Singapore Examinations and Assessment Board <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.skillsfuture.gov.sg/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center text-sm">
                        SkillsFuture <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 bg-white/80 rounded-lg border border-border/30 hover:border-primary/30 transition-colors">
                  <h3 className="font-semibold">University Websites</h3>
                  <ul className="mt-2 space-y-2">
                    <li>
                      <a href="https://www.nus.edu.sg/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center text-sm">
                        National University of Singapore <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.ntu.edu.sg/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center text-sm">
                        Nanyang Technological University <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.smu.edu.sg/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center text-sm">
                        Singapore Management University <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.kaplan.com.sg/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center text-sm">
                        Kaplan Singapore <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.mdis.edu.sg/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center text-sm">
                        Management Development Institute of Singapore <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 bg-white/80 rounded-lg border border-border/30 hover:border-primary/30 transition-colors">
                  <h3 className="font-semibold">Polytechnic & Private Institution Websites</h3>
                  <ul className="mt-2 space-y-2">
                    <li>
                      <a href="https://www.sp.edu.sg/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center text-sm">
                        Singapore Polytechnic <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.np.edu.sg/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center text-sm">
                        Ngee Ann Polytechnic <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.psi.edu.sg/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center text-sm">
                        PSB Academy <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.jcu.edu.sg/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center text-sm">
                        James Cook University Singapore <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.simge.edu.sg/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center text-sm">
                        Singapore Institute of Management Global Education <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-xl p-8 my-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Educational Videos</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/80 rounded-lg p-4 shadow-sm overflow-hidden">
                <div className="aspect-video bg-muted rounded-md mb-3 overflow-hidden">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/UT1VNRm_GNE" 
                    title="Understanding Singapore's Education Pathways" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-full object-cover"
                  ></iframe>
                </div>
                <h3 className="font-semibold text-sm">Understanding Singapore's Education Pathways</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  A visual guide to the different educational paths in Singapore.
                </p>
              </div>
              
              <div className="bg-white/80 rounded-lg p-4 shadow-sm overflow-hidden">
                <div className="aspect-video bg-muted rounded-md mb-3 overflow-hidden">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/SVNS9uTzP0M" 
                    title="Tips for University Applications" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-full object-cover"
                  ></iframe>
                </div>
                <h3 className="font-semibold text-sm">Tips for University Applications</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Expert advice on preparing your university application.
                </p>
              </div>
              
              <div className="bg-white/80 rounded-lg p-4 shadow-sm overflow-hidden">
                <div className="aspect-video bg-muted rounded-md mb-3 overflow-hidden">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/wVB78zMz6vY" 
                    title="Campus Tour Series" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-full object-cover"
                  ></iframe>
                </div>
                <h3 className="font-semibold text-sm">Campus Tour Series</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Virtual tours of Singapore's top educational institutions.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white/80 rounded-lg p-4 shadow-sm overflow-hidden">
                <div className="aspect-video bg-muted rounded-md mb-3 overflow-hidden">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/EGbNI26PPYg" 
                    title="Choosing the Right Private Institution" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-full object-cover"
                  ></iframe>
                </div>
                <h3 className="font-semibold text-sm">Choosing the Right Private Institution</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Key factors to consider when selecting a private education provider.
                </p>
              </div>
              
              <div className="bg-white/80 rounded-lg p-4 shadow-sm overflow-hidden">
                <div className="aspect-video bg-muted rounded-md mb-3 overflow-hidden">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/TZ3UgC9IPec" 
                    title="Scholarship Application Tips" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-full object-cover"
                  ></iframe>
                </div>
                <h3 className="font-semibold text-sm">Scholarship Application Tips</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  How to stand out in competitive scholarship applications.
                </p>
              </div>
              
              <div className="bg-white/80 rounded-lg p-4 shadow-sm overflow-hidden">
                <div className="aspect-video bg-muted rounded-md mb-3 overflow-hidden">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/RHsnHMBq8A0" 
                    title="Career Guidance for Students" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-full object-cover"
                  ></iframe>
                </div>
                <h3 className="font-semibold text-sm">Career Guidance for Students</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Planning your future career path based on your educational choices.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <h2 className="text-2xl font-bold mb-4">Need More Resources?</h2>
            <p className="text-muted-foreground mb-6">
              We're constantly adding new resources to help students and parents. 
              If you have suggestions or can't find what you're looking for, please contact us.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Contact Us
            </a>
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

export default Resources;
