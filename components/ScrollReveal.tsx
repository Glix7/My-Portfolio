
import React, { useEffect, useRef, useState } from 'react';

type AnimationType = 'fade-up' | 'fade-down' | 'fade-in' | 'slide-left' | 'slide-right' | 'blur-in' | 'scale-up' | 'rotate-in' | 'flip-up';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: AnimationType;
  duration?: number;
  delay?: number;
  distance?: number;
  threshold?: number;
  className?: string;
  enableBlur?: boolean;
  repeat?: boolean;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  duration = 800,
  delay = 0,
  distance = 30,
  threshold = 0.01,
  className = '',
  enableBlur = true,
  repeat = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Fast-fail safety timeout: Ensure content is visible eventually even if observer fails
    // Reduced timeout to 500ms to prevent long "blank" screens
    const safety = setTimeout(() => {
      if (!isVisible) setIsVisible(true);
    }, 500 + delay);

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return () => clearTimeout(safety);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!repeat) {
            observer.unobserve(element);
            clearTimeout(safety);
          }
        } else if (repeat) {
          setIsVisible(false);
        }
      },
      {
        threshold: threshold,
        rootMargin: '50px 0px', // Start slightly earlier
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
      clearTimeout(safety);
    };
  }, [threshold, repeat, delay]);

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
    
    switch (animation) {
      case 'fade-up':
        return `translate3d(0, ${distance}px, 0)`;
      case 'fade-down':
        return `translate3d(0, -${distance}px, 0)`;
      case 'slide-left':
        return `translate3d(-${distance}px, 0, 0)`;
      case 'slide-right':
        return `translate3d(${distance}px, 0, 0)`;
      case 'scale-up':
        return `scale(0.9)`;
      case 'rotate-in':
        return `rotate(-5deg) scale(0.95)`;
      case 'flip-up':
        return `perspective(1000px) rotateX(20deg) translate3d(0, ${distance}px, 0)`;
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `all ${duration}ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
        transitionDelay: `${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        filter: enableBlur ? (isVisible ? 'blur(0px)' : 'blur(8px)') : 'none',
        willChange: 'opacity, transform, filter',
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
