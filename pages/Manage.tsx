
import React from 'react';
import { Settings, Construction, ArrowLeft, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import TiltCard from '../components/TiltCard';
import CardBackground from '../components/CardBackground';
import ScrollReveal from '../components/ScrollReveal';

const Manage: React.FC = () => {
  return (
    <div className="w-full min-h-[85vh] flex flex-col items-center justify-center px-6 pt-28">
      <ScrollReveal animation="scale-up">
          <TiltCard className="w-full max-w-2xl">
            <div className="relative rounded-[2rem] bg-[#050505] border border-white/20 p-10 md:p-16 flex flex-col items-center text-center overflow-hidden shadow-2xl group">
                <CardBackground />
                
                {/* Rotating Gear Icon */}
                <div className="relative z-10 mb-8 p-6 rounded-full bg-white/5 border border-white/10 shadow-inner">
                    <Settings size={48} className="text-white animate-spin-slow" />
                    <div className="absolute top-0 right-0 p-2 bg-primary rounded-full transform translate-x-1/4 -translate-y-1/4 border-4 border-[#050505]">
                        <Construction size={16} className="text-black" />
                    </div>
                </div>

                <h1 className="relative z-10 text-3xl md:text-5xl font-bold text-white mb-4 font-display uppercase tracking-tight">
                    Management Portal
                </h1>
                
                <div className="relative z-10 w-20 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mb-6"></div>

                <p className="relative z-10 text-textMuted text-lg mb-8 max-w-md leading-relaxed">
                    This module is currently undergoing scheduled maintenance and upgrades to bring you better features.
                </p>

                <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <Link to="/" className="btn btn-white w-full sm:w-auto">
                        <ArrowLeft size={18} /> Return Home
                    </Link>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="btn w-full sm:w-auto"
                    >
                        <RefreshCw size={18} /> Check for Updates
                    </button>
                </div>

                <div className="absolute bottom-4 text-[10px] text-white/20 font-mono uppercase tracking-widest z-10">
                    System Status: Update in Progress
                </div>
            </div>
          </TiltCard>
      </ScrollReveal>
    </div>
  );
};

export default Manage;
