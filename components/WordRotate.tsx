
import React, { useEffect, useState, useRef } from 'react';

interface WordRotateProps {
  words: string[];
  duration?: number;
  className?: string;
}

const WordRotate: React.FC<WordRotateProps> = ({ words, duration = 2500, className = "" }) => {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const hiddenRef = useRef<HTMLSpanElement>(null);
  
  // Measure width to animate container size smoothly
  useEffect(() => {
    if (hiddenRef.current) {
        setWidth(hiddenRef.current.offsetWidth);
    }
  }, [index, words]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <div className={`inline-flex flex-col items-center justify-center align-bottom relative overflow-hidden h-[1.2em] ${className}`}>
      
      {/* Hidden element for width measurement */}
      <span 
        ref={hiddenRef} 
        className="absolute opacity-0 pointer-events-none whitespace-nowrap text-4xl sm:text-5xl md:text-6xl font-bold"
        aria-hidden="true"
      >
        {words[index]}
      </span>

      {/* Animated Container */}
      <div 
         className="flex flex-col transition-[width] duration-500 ease-in-out"
         style={{ width: width ? `${width}px` : 'auto' }}
      >
        {words.map((word, i) => {
            // Calculate offset for sliding effect
            return (
                <span 
                    key={i}
                    className="block h-[1.2em] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary font-bold tracking-tight whitespace-nowrap"
                    style={{ transform: `translateY(-${index * 100}%)` }}
                >
                    {word}
                </span>
            );
        })}
      </div>
    </div>
  );
};

export default WordRotate;
