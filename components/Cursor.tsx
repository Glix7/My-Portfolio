
import React, { useEffect, useRef } from 'react';
import { useProfile } from '../context/ProfileContext';

const Cursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { settings } = useProfile();
  const colorRef = useRef('#22d3ee');

  useEffect(() => {
    if (settings?.primary_color) {
        colorRef.current = settings.primary_color;
    }
  }, [settings]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
       const isFinePointer = window.matchMedia("(pointer: fine)").matches;
       if (!isFinePointer) return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let mouse = { x: 0, y: 0 };
    let head = { x: 0, y: 0 };
    let trail: { x: number; y: number }[] = [];
    const MAX_TRAIL_LENGTH = 12;
    
    let particles: { 
      x: number; y: number; vx: number; vy: number; 
      life: number; color: string; size: number;
    }[] = [];

    let isActive = false;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const updateMouse = (x: number, y: number) => {
      mouse.x = x;
      mouse.y = y;
      if (!isActive) {
        head = { x, y };
        isActive = true;
      }
    };

    const onMouseMove = (e: MouseEvent) => updateMouse(e.clientX, e.clientY);
    window.addEventListener('mousemove', onMouseMove);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      const primaryColor = colorRef.current;

      if (isActive) {
        head.x = mouse.x;
        head.y = mouse.y;

        trail.push({ x: head.x, y: head.y });
        if (trail.length > MAX_TRAIL_LENGTH) {
          trail.shift();
        }

        if (Math.random() > 0.5) {
             particles.push({
               x: head.x + (Math.random() - 0.5) * 4,
               y: head.y + (Math.random() - 0.5) * 4,
               vx: (Math.random() - 0.5) * 2, 
               vy: (Math.random() - 0.5) * 2,
               life: 1.0,
               color: primaryColor,
               size: Math.random() * 2 + 1
             });
        }

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.05;
          p.size *= 0.92;
          
          if (p.life <= 0) {
            particles.splice(i, 1);
          }
        }

        if (trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(trail[0].x, trail[0].y);
          
          for (let i = 1; i < trail.length - 1; i++) {
            const xc = (trail[i].x + trail[i + 1].x) / 2;
            const yc = (trail[i].y + trail[i + 1].y) / 2;
            ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
          }
          ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
          
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.lineWidth = 4;
          
          // Gradient Trail
          const gradient = ctx.createLinearGradient(
            trail[0].x, trail[0].y, 
            trail[trail.length-1].x, trail[trail.length-1].y
          );
          
          gradient.addColorStop(0, `${primaryColor}00`);
          gradient.addColorStop(1, primaryColor);
          
          ctx.strokeStyle = gradient;
          ctx.shadowBlur = 4;
          ctx.shadowColor = primaryColor;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        for (const p of particles) {
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;

        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(head.x, head.y, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(head.x, head.y, 8, 0, Math.PI * 2);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[9999]" />;
};

export default Cursor;
