
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { pb } from '../lib/pocketbase';
import { ActionSection } from '../types';
import ScrollReveal from './ScrollReveal';
import { getIcon } from '../lib/icons';

// Corner Arc SVG Component
const CornerArc = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 40 40" 
    className={`absolute w-8 h-8 pointer-events-none transition-all duration-500 text-white/20 ${className}`}
  >
    <path 
      d="M1 40 L1 20 Q1 1 20 1 L40 1" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
    />
  </svg>
);

const CTA: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<ActionSection | null>(null);
  
  const isProjectDetail = location.pathname.startsWith('/works/') && location.pathname !== '/works';
  const hiddenRoutes = ['/contact', '/privacy-policy', '/terms-of-use'];

  useEffect(() => {
    const fetchData = async () => {
        try {
            const result = await pb.collection('action').getList<ActionSection>(1, 1, {
                sort: '-created'
            });
            if (result.items.length > 0) {
                setData(result.items[0]);
            }
        } catch (error) {
            console.error("Failed to load action content:", error);
        }
    };
    fetchData();
  }, []);

  if (hiddenRoutes.includes(location.pathname) || isProjectDetail) return null;

  const heading = data?.heading || "Luminous Design";
  const subheading = data?.subheading || "Light folds around form, revealing layers of depth.";
  const btnText = data?.button || "Activate";
  const iconName = data?.icon || 'lightbulb';

  return (
    <section className="w-full px-4 md:px-6 py-16 relative z-10 overflow-hidden perspective-1000">
      
      {/* SVG Filters */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="strong-inner">
            <feFlood floodColor="white" floodOpacity="0.15" result="flood" />
            <feComposite operator="out" in="flood" in2="SourceGraphic" result="mask" />
            <feMorphology operator="dilate" radius="1" in="SourceAlpha" result="dilated" />
            <feGaussianBlur stdDeviation="2" in="dilated" result="blurred" />
            <feComposite operator="in" in="blurred" in2="SourceAlpha" result="shadow" />
            <feComposite operator="atop" in="shadow" in2="SourceGraphic" result="final" />
          </filter>
        </defs>
      </svg>

      <ScrollReveal animation="fade-up" duration={1000}>
        <div className="max-w-4xl mx-auto py-4">
            
            {/* Wrapper for Floating Arcs & 3D Effect */}
            <div className="relative group p-4 perspective-container">
                
                {/* Floating Corner Arcs - Slightly smaller and tighter */}
                <div className="absolute inset-0 pointer-events-none z-0 transition-transform duration-700 group-hover:scale-[1.02]">
                    <CornerArc className="top-0 left-0 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:text-primary/40" />
                    <CornerArc className="top-0 right-0 rotate-90 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary/40" />
                    <CornerArc className="bottom-0 right-0 rotate-180 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:text-primary/40" />
                    <CornerArc className="bottom-0 left-0 -rotate-90 group-hover:-translate-x-1 group-hover:translate-y-1 group-hover:text-primary/40" />
                </div>

                {/* THE CARD */}
                <div className="
                    relative rounded-[2rem] overflow-hidden select-none 
                    border border-white/10 
                    bg-[#050505]/60 backdrop-blur-xl
                    shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] 
                    transition-all duration-700 ease-out
                    group-hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.7),0_0_20px_rgba(255,255,255,0.05)]
                    group-hover:-translate-y-2
                    transform-gpu preserve-3d
                ">
                    
                    {/* 1. SHINE / SHOE EFFECT */}
                    {/* A sheen moving across on hover */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out"></div>
                    </div>

                    {/* 2. LIGHTING & GLASS LAYERS */}
                    <div className="absolute inset-0 pointer-events-none">
                         {/* Top Slit Highlight */}
                         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-30 group-hover:opacity-80 group-hover:w-[70%] transition-all duration-700"></div>
                         
                         {/* Inner Glow */}
                         <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    </div>

                    {/* 3. CONTENT */}
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-10 gap-8">
                        
                        {/* Icon & Text - Reduced Sizes */}
                        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left flex-1">
                            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center relative shrink-0">
                                {/* Back Glow for Icon */}
                                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                
                                <div style={{ filter: 'url(#strong-inner)' }} className="relative z-10 text-white/70 group-hover:text-white transition-colors duration-500 transform group-hover:scale-110 group-hover:rotate-6">
                                    {getIcon(iconName, { 
                                        size: 48, 
                                        strokeWidth: 1.5,
                                        className: "drop-shadow-lg"
                                    })}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <h2 className="text-2xl md:text-3xl font-bold text-white font-display tracking-tight leading-none group-hover:text-shadow-glow transition-all">
                                    {heading}
                                </h2>
                                <p className="text-textMuted text-sm md:text-base font-medium max-w-sm leading-relaxed">
                                    {subheading}
                                </p>
                            </div>
                        </div>

                        {/* Outlined Button - Replaces Slider */}
                        <button 
                            onClick={() => navigate('/contact')}
                            className="
                                group relative px-8 py-3 rounded-full 
                                bg-[#050505] border-2 border-primary 
                                text-primary font-bold uppercase tracking-widest text-sm
                                transition-all duration-300 ease-out
                                hover:bg-primary hover:text-black 
                                hover:shadow-[0_0_30px_var(--primary)] hover:scale-105
                                flex items-center gap-3 shrink-0
                            "
                        >
                            <span className="relative z-10">{btnText}</span>
                            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

        </div>
      </ScrollReveal>
      
      <style>{`
        .perspective-container {
            perspective: 1000px;
        }
        .preserve-3d {
            transform-style: preserve-3d;
        }
        .text-shadow-glow {
            text-shadow: 0 0 15px rgba(255,255,255,0.3);
        }
      `}</style>
    </section>
  );
};

export default CTA;
