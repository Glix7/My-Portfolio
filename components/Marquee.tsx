
import React from 'react';
import { Star } from 'lucide-react';

interface MarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  variant?: 'solid' | 'transparent';
}

const Marquee: React.FC<MarqueeProps> = ({ items, direction = 'left', variant = 'transparent' }) => {
  // Tailwind's animate-spin is too fast, usually marquees use custom keyframes.
  // We'll rely on a simple flex reverse or negative animation delay if we had custom css, 
  // but here we can just swap the order or use `flex-row-reverse` to cheat direction visually if purely text,
  // OR strictly use the `animate-scroll` vs `animate-scroll-reverse` if defined in Tailwind.
  
  const animationStyle = {
    animation: `scroll${direction === 'right' ? 'Reverse' : ''} 40s linear infinite`,
  };

  return (
    <div className={`w-full overflow-hidden relative py-2 ${variant === 'solid' ? 'bg-primary border-y-2 border-black rotate-1 scale-105 z-20' : ''}`}>
        <style>{`
            @keyframes scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
            @keyframes scrollReverse {
                0% { transform: translateX(-50%); }
                100% { transform: translateX(0); }
            }
        `}</style>
      <div 
        className="flex w-max hover:[animation-play-state:paused]"
        style={animationStyle}
      >
        {/* Render items multiple times to create seamless loop */}
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 pr-8">
             <div className={`text-xl font-bold uppercase tracking-wider ${variant === 'solid' ? 'text-black' : 'text-textMuted/50'}`}>
               {item}
             </div>
             {variant === 'solid' && <Star size={20} fill="black" className="text-black animate-spin-slow shrink-0" />}
             {/* Updated separator to be a visible primary dot */}
             {variant === 'transparent' && <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 shadow-[0_0_8px_var(--primary)]"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
