
import React, { useEffect, useState } from 'react';

const Preloader: React.FC = () => {
  const [percent, setPercent] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [hide, setHide] = useState(false);
  const [statusText, setStatusText] = useState('Initializing Core...');

  useEffect(() => {
    // Disable scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const diff = 100 - prev;
        const inc = Math.max(1, Math.ceil(diff / (Math.random() * 8 + 4)));
        return Math.min(prev + inc, 100);
      });
    }, 60);

    const safety = setTimeout(() => {
      setPercent(100);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(safety);
      // Ensure scroll is re-enabled when component unmounts
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (percent > 25 && percent < 60) setStatusText('Optimizing Neural Nets...');
    else if (percent >= 60 && percent < 90) setStatusText('Building Interfaces...');
    else if (percent >= 90 && percent < 100) setStatusText('Ready to Launch');
    
    if (percent === 100) {
      setStatusText('Connection Established');
      const hideTimer = setTimeout(() => {
        setHide(true);
        document.body.style.overflow = ''; // Re-enable scrolling explicitly
      }, 500);
      const finishTimer = setTimeout(() => setIsFinished(true), 1300);
      return () => {
        clearTimeout(hideTimer);
        clearTimeout(finishTimer);
      };
    }
  }, [percent]);

  if (isFinished) return null;

  return (
    <div 
      className={`fixed inset-0 z-[99999] bg-[#020202] flex flex-col items-center justify-center transition-all duration-800 cubic-bezier(0.16, 1, 0.3, 1) ${hide ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
        <div className="relative w-64 md:w-80">
            <div className="flex justify-between items-end mb-5">
                <span className="text-white font-display font-bold text-xl tracking-widest uppercase">
                    Harishama<span className="text-primary animate-pulse">.</span>
                </span>
                <span className="font-mono text-primary font-bold text-lg">
                    {percent}%
                </span>
            </div>

            <div className="w-full h-[1px] bg-white/5 rounded-full overflow-hidden relative">
                <div 
                    className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_15px_rgba(34,211,238,1)] transition-all duration-300 ease-out"
                    style={{ width: `${percent}%` }}
                />
            </div>

            <div className="mt-6 flex justify-between items-center text-[9px] font-bold text-textMuted uppercase tracking-[0.3em] font-mono">
                <span>{statusText}</span>
                <div className="flex gap-1.5">
                   <div className={`w-1 h-1 bg-primary rounded-full transition-opacity duration-300 ${percent % 2 === 0 ? 'opacity-100' : 'opacity-10'}`}></div>
                   <div className={`w-1 h-1 bg-primary rounded-full transition-opacity duration-300 ${percent % 3 === 0 ? 'opacity-100' : 'opacity-10'}`}></div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Preloader;
