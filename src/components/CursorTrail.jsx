import React, { useRef, useEffect, useState } from 'react';

function CursorTrail({ theme }) {
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);
    const handler = (e) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || (navigator.maxTouchPoints > 0);
    if (prefersReduced || isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrame;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e) => {
      pointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        age: 0,
        vx: (Math.random() - 0.5) * 0.7,
        vy: theme === 'venom' ? Math.random() * 0.5 + 0.3 : (Math.random() - 0.5) * 0.3,
        size: theme === 'venom' ? Math.random() * 5 + 3 : 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const points = pointsRef.current;

      if (theme === 'spiderman') {
        // Draw Spider-Man Web trail
        ctx.strokeStyle = '#6FA8FF';
        ctx.lineWidth = 0.8;
        
        for (let i = 1; i < points.length; i++) {
          const p1 = points[i - 1];
          const p2 = points[i];
          const ageRatio = p2.age / 35;
          
          if (ageRatio < 1) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(111, 168, 255, ${0.35 * (1 - ageRatio)})`;
            ctx.stroke();
          }

          // Cross-web strings connecting older positions
          for (let j = i + 2; j < Math.min(i + 8, points.length); j++) {
            const pj = points[j];
            const dx = p1.x - pj.x;
            const dy = p1.y - pj.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 70) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(pj.x, pj.y);
              ctx.strokeStyle = `rgba(111, 168, 255, ${0.08 * (1 - (p1.age / 35))})`;
              ctx.stroke();
            }
          }
        }
      } else {
        // Draw Venom Symbiote Ink-drip trail
        for (let i = 0; i < points.length; i++) {
          const p = points[i];
          const ageRatio = p.age / 50;
          
          if (ageRatio < 1) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * (1 + ageRatio * 0.8), 0, Math.PI * 2);
            // Splatters of black symbiote and rare red fang glows
            const color = i % 8 === 0 
              ? `rgba(122, 0, 0, ${0.25 * (1 - ageRatio)})` 
              : `rgba(16, 16, 16, ${0.5 * (1 - ageRatio)})`;
            ctx.fillStyle = color;
            ctx.fill();

            // Drift coordinates
            p.x += p.vx;
            p.y += p.vy;
          }
        }
      }

      pointsRef.current = points
        .map((p) => ({ ...p, age: p.age + 1 }))
        .filter((p) => p.age < (theme === 'spiderman' ? 35 : 50));

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, [theme, prefersReduced]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10"
    />
  );
}

export default CursorTrail;
