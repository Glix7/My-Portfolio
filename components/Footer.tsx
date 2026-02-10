
import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Github, Heart, Code } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';

const Footer: React.FC = () => {
  const { branding, socials, profile } = useProfile();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#050505] border-t border-white/10 pt-12 pb-8 relative z-50">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4 tracking-tight font-display">{branding.logo}.</h2>
            {/* USING PROFILE TAGLINE FOR DESCRIPTION */}
            <p className="text-textMuted text-sm mb-6 leading-relaxed max-w-sm">
              {profile?.tagline || "Your professional tagline goes here."}
            </p>
            <div className="flex gap-4">
              <a href={socials.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 text-textMuted hover:bg-white hover:text-black transition-all border border-white/5">
                <Github size={18} />
              </a>
              <a href={socials.leetcode} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 text-textMuted hover:bg-white hover:text-black transition-all border border-white/5" title="LeetCode">
                <Code size={18} />
              </a>
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 text-textMuted hover:bg-white hover:text-black transition-all border border-white/5">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-8">
            <div>
                <h4 className="text-white font-bold uppercase text-xs tracking-wider mb-4">Explore</h4>
                <ul className="space-y-2">
                <li><Link to="/about" className="text-textMuted text-sm hover:text-primary transition-colors">About Me</Link></li>
                <li><Link to="/skills" className="text-textMuted text-sm hover:text-primary transition-colors">My Skills</Link></li>
                <li><Link to="/works" className="text-textMuted text-sm hover:text-primary transition-colors">Projects</Link></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold uppercase text-xs tracking-wider mb-4">Support</h4>
                <ul className="space-y-2">
                <li><Link to="/contact" className="text-textMuted text-sm hover:text-primary transition-colors">Contact Us</Link></li>
                <li><Link to="/privacy-policy" className="text-textMuted text-sm hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-use" className="text-textMuted text-sm hover:text-primary transition-colors">Terms of Use</Link></li>
                </ul>
            </div>
          </div>
        </div>

        {/* Animated Collider Line */}
        <div className="relative h-px w-full mb-8">
           <style>{`
             @keyframes collisionLeft {
               0%, 100% { width: 0%; opacity: 0; }
               50% { width: 50%; opacity: 1; }
             }
             @keyframes collisionRight {
               0%, 100% { width: 0%; opacity: 0; }
               50% { width: 50%; opacity: 1; }
             }
             
             .collider-line {
               background: linear-gradient(to right, transparent, var(--primary), white);
               box-shadow: 0 0 15px var(--primary);
             }
             .collider-line-right {
               background: linear-gradient(to left, transparent, var(--primary), white);
               box-shadow: 0 0 15px var(--primary);
             }
           `}</style>
           
           {/* Static Faint Base Line */}
           <div className="absolute inset-0 bg-white/5"></div>

           {/* Left Beam */}
           <div className="absolute top-0 left-0 h-full collider-line opacity-80"
                style={{ animation: 'collisionLeft 4s ease-in-out infinite' }}></div>

           {/* Right Beam */}
           <div className="absolute top-0 right-0 h-full collider-line-right opacity-80"
                style={{ animation: 'collisionRight 4s ease-in-out infinite' }}></div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white text-sm font-bold tracking-wide">© {currentYear} {branding.logo}. All rights reserved.</p>
          <div className="flex items-center gap-2 text-white text-sm font-bold tracking-wide">
            {/* USING PROFILE FOOTER TEXT FOR COPYRIGHT AREA */}
            <span>{branding.footer}</span>
            <Heart className="w-3.5 h-3.5 text-primary fill-primary animate-pulse relative top-[1px]" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
