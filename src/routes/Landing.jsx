import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import landingBg from '../assets/landing_bg.jpg';

function Landing() {
  const [hoveredSide, setHoveredSide] = useState(null); // 'spiderman', 'venom', or null

  return (
    <PageWrapper theme={hoveredSide}>
      {/* Floating Center Badge introducing Mandar Joshi */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center text-center">
        <h1 className="font-mono text-[10px] text-zinc-300 tracking-[0.4em] uppercase bg-black/75 px-4 py-1.5 rounded border border-white/10 backdrop-blur-md select-none shadow-2xl">
          MANDAR JOSHI // SOFTWARE PORTFOLIO
        </h1>
      </div>

      <div className="relative flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-black font-body select-none">
        
        {/* Full-screen Background Image centered */}
        <div className="absolute inset-0 z-0 opacity-80">
          <img 
            src={landingBg} 
            alt="Spider-Man and Venom split artwork" 
            className="w-full h-full object-cover object-center"
            draggable="false"
          />
        </div>

        {/* Central vertical divider/seam */}
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-zinc-800/50 z-20 pointer-events-none hidden md:block" />

        {/* Spider-Man Half (Left Overlay) */}
        <Link
          to="/spiderman"
          className={`relative z-10 flex-1 flex flex-col justify-center items-center p-8 transition-all duration-300 ease-out outline-hidden cursor-pointer
            ${hoveredSide === 'spiderman' ? 'md:flex-[1.25]' : hoveredSide === 'venom' ? 'md:flex-[0.75]' : 'bg-transparent'}
          `}
          onMouseEnter={() => setHoveredSide('spiderman')}
          onMouseLeave={() => setHoveredSide(null)}
          onFocus={() => setHoveredSide('spiderman')}
          onBlur={() => setHoveredSide(null)}
          aria-label="Enter Spider-Man Experience (Frontend Tech Stack & Projects)"
        >
          {/* Red/Blue themed tint mask overlay */}
          <div 
            className={`absolute inset-0 bg-[#0B0B10] transition-opacity duration-300
              ${hoveredSide === 'spiderman' ? 'opacity-20' : hoveredSide === 'venom' ? 'opacity-80' : 'opacity-55'}
            `}
          />
          <div 
            className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,32,42,0.25)_0%,transparent_70%)] transition-opacity duration-300
              ${hoveredSide === 'spiderman' ? 'opacity-100' : 'opacity-0'}
            `}
          />

          {/* Interactive Content */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-4">
            <span className="font-mono text-xs text-[#6FA8FF] tracking-[0.3em] uppercase drop-shadow-md">
              PETER PARKER // FRONTEND ARCHITECT
            </span>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display text-[#E7E9F0] tracking-wider uppercase transition-transform duration-300 drop-shadow-lg group-hover:scale-103">
              Spider-Man
            </h2>
            <div className="h-[2px] w-12 bg-[#D6202A] transition-all duration-300" />
            <p className="font-mono text-[10px] text-zinc-200 tracking-widest uppercase bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
              Web Tech Stack & Projects
            </p>
          </div>

          {/* Focus indicator ring */}
          <div className="absolute inset-4 border border-[#D6202A]/0 rounded-lg pointer-events-none transition-all duration-300 focus-within:border-[#D6202A]/30" />
        </Link>

        {/* Venom Half (Right Overlay) */}
        <Link
          to="/venom"
          className={`relative z-10 flex-1 flex flex-col justify-center items-center p-8 transition-all duration-300 ease-out outline-hidden cursor-pointer
            ${hoveredSide === 'venom' ? 'md:flex-[1.25]' : hoveredSide === 'spiderman' ? 'md:flex-[0.75]' : 'bg-transparent'}
          `}
          onMouseEnter={() => setHoveredSide('venom')}
          onMouseLeave={() => setHoveredSide(null)}
          onFocus={() => setHoveredSide('venom')}
          onBlur={() => setHoveredSide(null)}
          aria-label="Enter Venom Experience (Core Engineering Strengths & Traits)"
        >
          {/* Black/Gray themed tint mask overlay */}
          <div 
            className={`absolute inset-0 bg-[#050505] transition-opacity duration-300
              ${hoveredSide === 'venom' ? 'opacity-20' : hoveredSide === 'spiderman' ? 'opacity-80' : 'opacity-55'}
            `}
          />
          <div 
            className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(237,237,237,0.08)_0%,transparent_70%)] transition-opacity duration-300
              ${hoveredSide === 'venom' ? 'opacity-100' : 'opacity-0'}
            `}
          />

          {/* Interactive Content */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-4">
            <span className="font-mono text-xs text-zinc-300 tracking-[0.3em] uppercase drop-shadow-md">
              EDDIE BROCK // SYSTEMS ENGINEER
            </span>
            <h2 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display text-[#EDEDED] tracking-wider uppercase transition-transform duration-300 drop-shadow-lg group-hover:scale-103"
              style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 800 }}
            >
              Venom
            </h2>
            <div className="h-[2px] w-12 bg-[#EDEDED] transition-all duration-300" />
            <p className="font-mono text-[10px] text-zinc-200 tracking-widest uppercase bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
              Core Engineering Strengths
            </p>
          </div>

          {/* Focus indicator ring */}
          <div className="absolute inset-4 border border-zinc-500/0 rounded-lg pointer-events-none transition-all duration-300 focus-within:border-zinc-500/30" />
        </Link>
      </div>
    </PageWrapper>
  );
}

export default Landing;
