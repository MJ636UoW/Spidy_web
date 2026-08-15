import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function ThemeBleed({ currentTheme }) {
  const navigate = useNavigate();
  const [bleed, setBleed] = useState(null); // { x, y, targetTheme }

  const triggerBleed = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const targetTheme = currentTheme === 'spiderman' ? 'venom' : 'spiderman';

    setBleed({ x, y, targetTheme });

    // Navigate after animation completes
    setTimeout(() => {
      navigate(targetTheme === 'spiderman' ? '/spiderman' : '/venom');
      setBleed(null);
    }, 700);
  }, [currentTheme, navigate]);

  const targetLabel = currentTheme === 'spiderman' ? 'VENOM CORE' : 'SPIDER-MAN CORE';

  // Bleed colors
  const bleedBg = bleed?.targetTheme === 'venom' ? '#050505' : '#0B0B10';
  const bleedAccent = bleed?.targetTheme === 'venom' ? '#7A0000' : '#D6202A';

  return (
    <>
      <button
        onClick={triggerBleed}
        className="px-3 py-2 font-mono text-xs border border-theme-primary/30 hover:border-theme-primary text-zinc-400 hover:text-theme-primary transition duration-200 uppercase tracking-widest font-bold cursor-pointer outline-hidden focus-visible:ring-2 focus-visible:ring-theme-primary"
      >
        — {targetLabel}
      </button>

      {bleed && (
        <div className="theme-bleed-overlay" style={{ pointerEvents: 'all' }}>
          {/* Main bleed circle */}
          <div
            style={{
              position: 'absolute',
              left: bleed.x,
              top: bleed.y,
              width: 0,
              height: 0,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${bleedAccent} 0%, ${bleedBg} 40%)`,
              transform: 'translate(-50%, -50%)',
              animation: 'bleedExpand 0.7s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
            }}
          />
          <style>{`
            @keyframes bleedExpand {
              0% {
                width: 0;
                height: 0;
                opacity: 1;
              }
              100% {
                width: 300vmax;
                height: 300vmax;
                opacity: 1;
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
}

export default ThemeBleed;
