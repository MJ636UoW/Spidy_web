import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// --- Vector Artwork Components (No-Art Fallbacks) ---

function SpiderManSuitSVG() {
  return (
    <svg className="w-full h-full bg-[#0C0C16]" viewBox="0 0 1200 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sm-suit-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D6202A" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0B0B10" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="500" fill="#0B0B10" />
      <rect width="1200" height="500" fill="url(#sm-suit-glow)" />
      
      <path d="M400 500 C450 150, 750 150, 800 500" fill="#D6202A" />
      <path d="M400 500 C430 350, 480 320, 500 500" fill="#1B3F8B" />
      <path d="M800 500 C770 350, 720 320, 700 500" fill="#1B3F8B" />
      
      <path d="M600 200 C600 300, 600 400, 600 500" stroke="#0B0B10" strokeWidth="3" />
      <path d="M500 500 C550 350, 650 350, 700 500" stroke="#0B0B10" strokeWidth="2.5" />
      <path d="M450 500 C520 280, 680 280, 750 500" stroke="#0B0B10" strokeWidth="2" />
      <path d="M420 500 C500 200, 700 200, 780 500" stroke="#0B0B10" strokeWidth="2" />
      <path d="M600 250 Q500 290, 430 260" stroke="#0B0B10" strokeWidth="2" />
      <path d="M600 250 Q700 290, 770 260" stroke="#0B0B10" strokeWidth="2" />
      <path d="M600 320 Q500 360, 420 350" stroke="#0B0B10" strokeWidth="2" />
      <path d="M600 320 Q700 360, 780 350" stroke="#0B0B10" strokeWidth="2" />
      <path d="M600 400 Q480 430, 410 440" stroke="#0B0B10" strokeWidth="2" />
      <path d="M600 400 Q720 430, 790 440" stroke="#0B0B10" strokeWidth="2" />
      
      <path d="M510 280 C480 260, 460 220, 520 205 C550 200, 570 240, 560 270 C550 285, 525 285, 510 280 Z" fill="#E7E9F0" stroke="#0B0B10" strokeWidth="12" strokeLinejoin="round" />
      <path d="M690 280 C720 260, 740 220, 680 205 C650 200, 630 240, 640 270 C650 285, 675 285, 690 280 Z" fill="#E7E9F0" stroke="#0B0B10" strokeWidth="12" strokeLinejoin="round" />

      <path d="M600 400 Q600 440, 600 460 M600 415 Q590 425, 580 420 M600 415 Q610 425, 620 420 M600 430 Q585 445, 570 440 M600 430 Q615 445, 630 440" stroke="#0B0B10" strokeWidth="4" fill="none" />
      <circle cx="600" cy="415" r="7" fill="#0B0B10" />
      <circle cx="600" cy="428" r="11" fill="#0B0B10" />
    </svg>
  );
}

function PeterParkerSVG() {
  return (
    <svg className="w-full h-full bg-[#1B3F8B]" viewBox="0 0 1200 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pp-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1B3F8B" />
          <stop offset="100%" stopColor="#0B0B10" />
        </linearGradient>
      </defs>
      <rect width="1200" height="500" fill="url(#pp-bg)" />
      
      <circle cx="600" cy="250" r="180" fill="#6FA8FF" opacity="0.15" />
      <circle cx="600" cy="250" r="130" fill="#6FA8FF" opacity="0.25" />
      
      <path d="M420 500 C430 400, 480 350, 520 340 C530 310, 520 250, 530 220 C500 200, 490 140, 540 100 C590 60, 680 80, 680 140 C680 180, 660 210, 670 230 C690 260, 680 310, 680 340 C720 350, 770 400, 780 500 Z" fill="#E7E9F0" />
      <path d="M530 160 C510 140, 520 100, 550 90 C590 75, 680 80, 670 130 C660 110, 620 110, 600 120 C580 110, 550 120, 530 160 Z" fill="#3E2723" />
      <rect x="555" y="165" width="40" height="30" rx="5" stroke="#3E2723" strokeWidth="4" fill="none" />
      <rect x="605" y="165" width="40" height="30" rx="5" stroke="#3E2723" strokeWidth="4" fill="none" />
      <line x1="595" y1="175" x2="605" y2="175" stroke="#3E2723" strokeWidth="4" />
    </svg>
  );
}

function VenomSuitSVG() {
  return (
    <svg className="w-full h-full bg-[#050505]" viewBox="0 0 1200 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="vn-suit-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7A0000" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#050505" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="500" fill="#050505" />
      <rect width="1200" height="500" fill="url(#vn-suit-glow)" />

      <path d="M350 500 C380 100, 820 100, 850 500 Z" fill="#161616" stroke="#000" strokeWidth="4" />
      
      <path d="M600 180 Q610 250, 600 350" stroke="#EDEDED" strokeWidth="3" opacity="0.4" />
      <path d="M530 500 Q560 380, 580 320" stroke="#EDEDED" strokeWidth="2" opacity="0.3" />
      <path d="M670 500 Q640 380, 620 320" stroke="#EDEDED" strokeWidth="2" opacity="0.3" />
      
      <path d="M470 260 C420 220, 440 130, 530 160 C550 170, 550 200, 545 220 C540 240, 500 270, 470 260 Z" fill="#EDEDED" stroke="#000" strokeWidth="6" />
      <path d="M730 260 C780 220, 760 130, 670 160 C650 170, 650 200, 655 220 C660 240, 700 270, 730 260 Z" fill="#EDEDED" stroke="#000" strokeWidth="6" />

      <path d="M520 280 Q600 310, 680 280 C670 330, 530 330, 520 280 Z" fill="#0F0F0F" stroke="#EDEDED" strokeWidth="2" />
      <path d="M530 285 L540 295 L550 287 L560 298 L570 290 L580 300 L590 292 L600 302 L610 292 L620 300 L630 290 L640 298 L650 287 L660 295 L670 285" fill="#EDEDED" />
    </svg>
  );
}

function EddieBrockSVG() {
  return (
    <svg className="w-full h-full bg-[#161616]" viewBox="0 0 1200 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="eb-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#161616" />
          <stop offset="100%" stopColor="#050505" />
        </linearGradient>
      </defs>
      <rect width="1200" height="500" fill="url(#eb-bg)" />
      
      <path d="M300 100 Q450 250, 320 400" stroke="#7A0000" strokeWidth="2" opacity="0.3" />
      <path d="M900 100 Q750 250, 880 400" stroke="#7A0000" strokeWidth="2" opacity="0.3" />

      <path d="M420 500 C430 400, 480 350, 520 340 C530 310, 520 250, 530 220 C500 200, 490 140, 540 100 C590 60, 680 80, 680 140 C680 180, 660 210, 670 230 C690 260, 680 310, 680 340 C720 350, 770 400, 780 500 Z" fill="#7A7A7A" />
      <path d="M530 140 C520 90, 580 80, 600 70 C650 70, 680 100, 675 140 C650 115, 600 110, 570 120 Z" fill="#9E8E6A" />

      <path d="M480 430 C490 400, 510 390, 530 380 C540 370, 542 340, 540 330 C538 310, 540 280, 550 260" stroke="#050505" strokeWidth="8" strokeLinecap="round" />
      <path d="M490 450 Q515 410, 550 400" stroke="#050505" strokeWidth="5" />
      <path d="M510 490 Q530 440, 560 430" stroke="#050505" strokeWidth="5" />
      <path d="M538 310 Q560 290, 570 300" stroke="#050505" strokeWidth="4" />
    </svg>
  );
}

// --- Main RevealHero Component ---

function RevealHero({ 
  suitImage, 
  faceImage, 
  theme, 
  onReveal, 
  suitPosition = 'center center', 
  facePosition = 'center center',
  suitScale = 1,
  faceScale = 1,
  suitTranslateX = '0px',
  suitTranslateY = '0px',
  faceTranslateX = '0px',
  faceTranslateY = '0px'
}) {
  const containerRef = useRef(null);
  const suitRef = useRef(null);
  
  const [isInteracting, setIsInteracting] = useState(false);
  const [hasSuitImg, setHasSuitImg] = useState(!!suitImage);
  const [hasFaceImg, setHasFaceImg] = useState(!!faceImage);

  useEffect(() => {
    setHasSuitImg(!!suitImage);
  }, [suitImage]);

  useEffect(() => {
    setHasFaceImg(!!faceImage);
  }, [faceImage]);

  // Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const r = useMotionValue(0); // starts fully suited (radius = 0)

  // Reduced motion detection
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);
    
    const handler = (e) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Spring Settings
  const springConfig = prefersReduced 
    ? { damping: 0, stiffness: 0 } 
    : { damping: 30, stiffness: 180, mass: 0.8 };

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springR = useSpring(r, springConfig);

  // Directly adjust style properties of top suit container for high-performance updates
  useEffect(() => {
    const unsubX = springX.on('change', (val) => {
      if (suitRef.current) suitRef.current.style.setProperty('--x', `${val}px`);
    });
    const unsubY = springY.on('change', (val) => {
      if (suitRef.current) suitRef.current.style.setProperty('--y', `${val}px`);
    });
    const unsubR = springR.on('change', (val) => {
      if (suitRef.current) suitRef.current.style.setProperty('--r', `${val}px`);
    });
    return () => {
      unsubX();
      unsubY();
      unsubR();
    };
  }, [springX, springY, springR]);

  // Center pointer on mount
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      x.set(rect.width / 2);
      y.set(rect.height / 2);
    }
  }, []);

  // Idle drift pattern triggered after inactivity
  useEffect(() => {
    if (prefersReduced || isInteracting) {
      if (!isInteracting) r.set(0); 
      return;
    }

    let animFrame;
    let driftTimer = setTimeout(() => {
      r.set(180); // Bigger automatic reveal radius
      const startTime = Date.now();

      const tick = () => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const elapsed = (Date.now() - startTime) / 1000;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Circular/elliptical revolve sweeping the entire card boundary
        const dx = Math.sin(elapsed * 0.85) * (rect.width * 0.42);
        const dy = Math.cos(elapsed * 0.85) * (rect.height * 0.42);

        x.set(centerX + dx);
        y.set(centerY + dy);

        animFrame = requestAnimationFrame(tick);
      };
      tick();
    }, 800); // Start revolving faster

    return () => {
      clearTimeout(driftTimer);
      cancelAnimationFrame(animFrame);
    };
  }, [isInteracting, prefersReduced]);

  // Event Handlers
  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    
    // Play sound if we were not already unmasking
    if (!isInteracting && onReveal) {
      onReveal();
    }

    setIsInteracting(true);
    const rect = containerRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
    r.set(220); // Larger cursor unmasking radius
  };

  const handlePointerLeave = () => {
    setIsInteracting(false);
    r.set(0);
  };

  const handleTouchStart = (e) => {
    if (!containerRef.current || e.touches.length === 0) return;
    
    if (onReveal) {
      onReveal();
    }

    setIsInteracting(true);
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    x.set(touch.clientX - rect.left);
    y.set(touch.clientY - rect.top);
    r.set(220); // Larger touch unmasking radius
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    x.set(touch.clientX - rect.left);
    y.set(touch.clientY - rect.top);
  };

  const handleTouchEnd = () => {
    setIsInteracting(false);
    r.set(0);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="reveal relative mx-auto w-full max-w-[320px] md:max-w-[380px] aspect-[576/1024] overflow-hidden bg-black select-none border border-theme-primary/10 rounded-xl cursor-crosshair shadow-2xl"
    >
      {/* Face Layer (Behind) */}
      <div className="absolute inset-0 w-full h-full">
        {hasFaceImg ? (
          <img
            src={faceImage}
            onError={() => setHasFaceImg(false)}
            alt="Hero unmasked"
            className="w-full h-full object-cover"
            style={{ 
              objectPosition: facePosition,
              transform: `translate(${faceTranslateX}, ${faceTranslateY}) scale(${faceScale})`
            }}
            draggable="false"
          />
        ) : theme === 'spiderman' ? (
          <PeterParkerSVG />
        ) : (
          <EddieBrockSVG />
        )}
      </div>

      {/* Suit Layer (On top, masked) */}
      <div
        ref={suitRef}
        className="suit absolute inset-0 w-full h-full will-change-transform"
        style={{
          '--x': `${x.get()}px`,
          '--y': `${y.get()}px`,
          '--r': `${r.get()}px`,
          WebkitMaskImage: 'radial-gradient(circle var(--r) at var(--x) var(--y), transparent 0%, transparent 50%, black 90%)',
          maskImage: 'radial-gradient(circle var(--r) at var(--x) var(--y), transparent 0%, transparent 50%, black 90%)',
          transform: 'translateZ(0)',
        }}
      >
        {hasSuitImg ? (
          <img
            src={suitImage}
            onError={() => setHasSuitImg(false)}
            alt="Hero suited"
            className="w-full h-full object-cover"
            style={{ 
              objectPosition: suitPosition,
              transform: `translate(${suitTranslateX}, ${suitTranslateY}) scale(${suitScale})`
            }}
            draggable="false"
          />
        ) : theme === 'spiderman' ? (
          <SpiderManSuitSVG />
        ) : (
          <VenomSuitSVG />
        )}
      </div>
      
      {/* Instructions Overlay */}
      <div className="absolute bottom-4 left-4 z-25 bg-black/60 px-3 py-1.5 rounded border border-white/5 font-mono text-[9px] text-zinc-400 pointer-events-none uppercase tracking-widest">
        {isInteracting ? 'Unmasked' : 'Hover / Touch to Unmask'}
      </div>
    </div>
  );
}

export default RevealHero;
