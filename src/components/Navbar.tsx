import React, { useState, useEffect } from 'react';
import { Menu, X, Home, User, Settings, Briefcase, Phone } from 'lucide-react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { id: 'home', label: 'INÍCIO', icon: Home },
    { id: 'about', label: 'SOBRE NÓS', icon: User },
    { id: 'services', label: 'SERVIÇOS', icon: Settings },
    { id: 'portfolio', label: 'PORTFÓLIO', icon: Briefcase },
    { id: 'contact', label: 'CONTATO', icon: Phone },
  ];

  useEffect(() => {
    console.log('Navbar: Setting up scroll listener with progress tracking');
    
    const handleScroll = () => {
      // Calculate scroll progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);

      // Update active section
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    console.log(`Navbar: Scrolling to section ${sectionId}`);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-tech-gray z-50">
        <div 
          className="h-full bg-gradient-to-r from-tech-accent to-orange-400 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 lg:hidden bg-tech-accent p-2 lg:p-3 rounded-full text-white hover:bg-opacity-80 transition-all duration-300"
      >
        <div className="relative">
          <Menu 
            className={`transition-all duration-300 ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} 
            size={24} 
          />
          <X 
            className={`absolute top-0 left-0 transition-all duration-300 ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} 
            size={24} 
          />
        </div>
      </button>

      {/* Animated Logo */}
      <div className="fixed top-4 left-4 z-40">
        <div 
          onClick={() => scrollToSection('home')}
          className="text-xl lg:text-2xl font-bold text-white hover:scale-110 transition-transform duration-300 cursor-pointer"
        >
          <span className="text-gradient">TECH</span>
          <span className="text-shimmer">STORE</span>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <nav className={`fixed right-0 top-0 h-full w-16 lg:w-20 bg-tech-gray/95 backdrop-blur-md z-30 transition-all duration-500 border-l border-tech-accent/20 ${
        isOpen ? 'translate-x-0 shadow-2xl w-64 lg:w-20' : 'translate-x-full lg:translate-x-0'
      }`}>
        <div className={`flex flex-col items-center justify-center h-full space-y-6 lg:space-y-8 ${isOpen ? 'lg:space-y-8' : ''}`}>
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`relative p-3 lg:p-4 rounded-full border-2 transition-all duration-500 hover-lift flex items-center space-x-3 ${isOpen ? 'w-full justify-start px-6 lg:p-4 lg:justify-center lg:w-auto lg:space-x-0' : ''} ${
                    isActive
                      ? 'border-tech-accent text-tech-accent scale-110'
                      : 'border-gray-600 text-gray-400 hover:text-tech-accent hover:border-tech-accent hover:scale-105'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon 
                    size={18} 
                    className={`transition-all duration-300 ${
                      isActive ? '' : 'group-hover:rotate-12'
                    }`} 
                  />
                  {isOpen && (
                    <span className="lg:hidden font-medium">{item.label}</span>
                  )}
                  
                  {/* Active indicator removido */}
                </button>
                
                {/* Tooltip - Only on desktop */}
                <span className="absolute right-16 lg:right-20 top-1/2 -translate-y-1/2 bg-tech-accent text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none transform translate-x-2 group-hover:translate-x-0 hidden lg:block">
                  {item.label}
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-tech-accent" />
                </span>
              </div>
            );
          })}
          
          {/* Círculos removidos - Social Media Icons removidas */}
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;