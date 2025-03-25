
import React, { useState } from 'react';
import Header from '@/components/Header';
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  MapPin, 
  Send, 
  CheckCircle, 
  AlertCircle,
  GraduationCap
} from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Show success toast
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
        variant: "default"
      });
      
      // Reset form
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header className="sticky top-0 z-50" />
      
      <main className="flex-1 container mx-auto px-4 py-12 md:px-6 xl:px-0">
        <section className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block rounded-full bg-primary/10 p-3 mb-4">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
            <p className="text-xl text-muted-foreground">
              Have questions or feedback? We're here to help!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email Us</h3>
                    <p className="text-muted-foreground">
                      <a href="mailto:info@learnleap.sg" className="hover:text-primary transition-colors">
                        info@learnleap.sg
                      </a>
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      We typically respond within 1 business day
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Call Us</h3>
                    <p className="text-muted-foreground">
                      <a href="tel:+6565551234" className="hover:text-primary transition-colors">
                        +65 6555 1234
                      </a>
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Mon-Fri: 9am-6pm (Singapore Time)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Visit Us</h3>
                    <p className="text-muted-foreground">
                      123 Education Road<br />
                      #12-34 Learning Tower<br />
                      Singapore 123456
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
                
                <div className="space-y-4">
                  <div className="bg-white/80 p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium flex items-center">
                      <GraduationCap className="h-4 w-4 text-primary mr-2" />
                      How do I register my institution?
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      You can register your institution through the Registration tab on our homepage.
                    </p>
                  </div>
                  
                  <div className="bg-white/80 p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium flex items-center">
                      <GraduationCap className="h-4 w-4 text-primary mr-2" />
                      How is the data collected?
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Our data is sourced from official data.gov.sg datasets and institutional websites, ensuring accuracy and reliability.
                    </p>
                  </div>
                  
                  <div className="bg-white/80 p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium flex items-center">
                      <GraduationCap className="h-4 w-4 text-primary mr-2" />
                      How can I report incorrect information?
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Please use the contact form to report any inaccuracies, and our team will review and update the information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-border/40">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general-inquiry">General Inquiry</option>
                    <option value="institution-registration">Institution Registration</option>
                    <option value="data-correction">Data Correction</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    placeholder="Type your message here..."
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center bg-primary text-white p-3 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-blue-800 flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 text-blue-500" />
                <p>
                  Your data is kept confidential and will only be used to respond to your inquiry.
                  Read our <a href="#" className="underline">Privacy Policy</a> for more information.
                </p>
              </div>
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

export default Contact;
