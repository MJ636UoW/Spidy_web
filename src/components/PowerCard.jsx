import React, { useRef, useState, useEffect, useCallback } from 'react';

function PowerCard({ item, onClick, theme }) {
  const stats = item.stats || [];
  const glossyClass = theme === 'venom' ? 'venom-glossy' : theme === 'spiderman' ? 'spiderman-glossy' : '';
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 });
  const [isProximate, setIsProximate] = useState(false);

  // Proximity detection: sense cursor within 40px before touching
  const handleGlobalMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const proximity = 40;

    const expandedRect = {
      left: rect.left - proximity,
      right: rect.right + proximity,
      top: rect.top - proximity,
      bottom: rect.bottom + proximity,
    };

    const isNear =
      e.clientX >= expandedRect.left &&
      e.clientX <= expandedRect.right &&
      e.clientY >= expandedRect.top &&
      e.clientY <= expandedRect.bottom;

    const isInside =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (isNear) {
      setIsProximate(true);
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const angleX = ((e.clientY - centerY) / (rect.height / 2)) * -3;
      const angleY = ((e.clientX - centerX) / (rect.width / 2)) * 3;
      setTilt({
        rotateX: angleX,
        rotateY: angleY,
        scale: isInside ? 1.02 : 1.01,
      });
    } else {
      setIsProximate(false);
      setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleGlobalMove, { passive: true });
    return () => document.removeEventListener('mousemove', handleGlobalMove);
  }, [handleGlobalMove]);

  return (
    <button
      ref={cardRef}
      onClick={onClick}
      className={`group text-left w-full relative flex flex-col justify-between p-6 rounded-xl ${glossyClass} hover:border-theme-glow transition-all duration-300 ease-out outline-hidden cursor-pointer focus-visible:ring-2 focus-visible:ring-theme-glow focus-visible:ring-offset-2 focus-visible:ring-offset-theme-bg hover:shadow-2xl hover:shadow-theme-glow/10`}
      style={{
        transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
        transition: 'transform 0.25s ease-out, box-shadow 0.3s ease-out',
        boxShadow: isProximate
          ? theme === 'venom'
            ? '0 0 20px rgba(122, 0, 0, 0.3), inset 0 0 0 1px rgba(237, 237, 237, 0.15)'
            : '0 0 20px rgba(111, 168, 255, 0.2), inset 0 0 0 1px rgba(214, 32, 42, 0.2)'
          : undefined,
      }}
    >
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-theme-primary/30 group-hover:border-theme-glow transition-colors duration-300" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-theme-primary/30 group-hover:border-theme-glow transition-colors duration-300" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-theme-primary/30 group-hover:border-theme-glow transition-colors duration-300" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-theme-primary/30 group-hover:border-theme-glow transition-colors duration-300" />

      {/* Title block */}
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-xl md:text-2xl font-display uppercase tracking-wide group-hover:text-theme-primary transition-colors duration-300">
            {item.name}
          </h3>
          <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest pt-1.5">
            READY
          </span>
        </div>
        <p className="text-xs font-body text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300 leading-snug">
          {item.tagline}
        </p>
      </div>

      {/* Separator */}
      <div className="my-5 h-[1px] w-full bg-theme-primary/10 group-hover:bg-theme-primary/30 transition-colors duration-300" />

      {/* Stats */}
      <div className="space-y-1.5">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between items-center text-[10px] font-mono text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300">
            <span className="uppercase tracking-wider">{stat.label}:</span>
            <span className="text-theme-glow font-semibold tracking-tight">{stat.value}</span>
          </div>
        ))}
      </div>
    </button>
  );
}

export default PowerCard;
