
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAVIGATION_LINKS } from '../constants';
import { useProfile } from '../context/ProfileContext';

const Navbar: React.FC = () => {
  const { branding } = useProfile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Handle scroll effect for floating nav
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Floating Pill Navbar */}
      <div 
        className={`fixed left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-auto md:min-w-[600px] lg:min-w-[700px] max-w-7xl transition-all duration-500 ease-in-out ${
          scrolled ? 'top-4' : 'top-8'
        }`}
      >
        <div className="flex items-center justify-between pl-4 pr-2 py-2 md:pl-6 md:pr-2 md:py-2.5 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_0_25px_-5px_rgba(0,0,0,0.5)] transition-all">
            
            {/* Logo - Animated & Disabled Link */}
            <div className="text-xl font-bold tracking-tight font-display transition-colors group flex items-center gap-0.5 mr-auto md:mr-8 cursor-default select-none">
              <div className="flex text-white">
                {branding.logo.split("").map((char, idx) => (
                  <span 
                    key={idx} 
                    className="inline-block animate-pop-loop" 
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    {char}
                  </span>
                ))}
              </div>
              <span className="text-white animate-pulse">.</span>
            </div>

            {/* Desktop Navigation - Glass Pill Inner Container */}
            <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/5">
                {NAVIGATION_LINKS.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) => `
                      px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 relative overflow-hidden
                      ${isActive 
                        ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]' 
                        : 'text-textMuted hover:text-white hover:bg-white/5'}
                    `}
                  >
                    {link.name}
                  </NavLink>
                ))}
            </nav>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-2 md:gap-3 ml-2 md:ml-8">
                <Link 
                    to="/contact" 
                    className="btn btn-white !py-2 !px-4 md:!py-2.5 md:!px-6 !rounded-full text-xs md:text-sm !shadow-none hover:!shadow-[0_0_15px_rgba(255,255,255,0.4)] whitespace-nowrap"
                >
                    Let's Talk
                </Link>
                
                <button 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 text-white/70 hover:text-white hover:bg-white/20 rounded-full transition-colors"
                >
                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-3xl transition-all duration-500 md:hidden ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
          
          {/* Decorative Elements for Mobile Menu */}
          <div className="absolute top-[-20%] right-[-20%] w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="flex flex-col h-full justify-center px-10 gap-8 relative z-10">
            {NAVIGATION_LINKS.map((link, idx) => (
              <NavLink
                key={link.path}
                to={link.path}
                style={{ transitionDelay: `${idx * 50}ms` }}
                className={({ isActive }) => `
                  text-4xl font-black font-display tracking-tight transition-all duration-300 transform
                  ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
                  ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 scale-105 origin-left' : 'text-white/40 hover:text-white'}
                `}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            
            <div className={`mt-8 transition-all duration-500 delay-300 transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <Link to="/contact" className="btn btn-white w-full py-4 text-lg rounded-2xl" onClick={() => setMobileMenuOpen(false)}>
                    Start Project
                </Link>
            </div>
          </div>
      </div>
    </>
  );
};

export default Navbar;
