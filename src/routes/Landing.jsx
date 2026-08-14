import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';

function Landing() {
  const [hoveredSide, setHoveredSide] = useState(null); // 'spiderman', 'venom', or null

  return (
    <PageWrapper theme={hoveredSide}>
      <div className="relative flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-black font-body select-none">
        
        {/* Central vertical divider/seam */}
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-zinc-800/50 z-20 pointer-events-none hidden md:block" />

        {/* Spider-Man Half */}
        <Link
          to="/spiderman"
          className={`relative flex-1 flex flex-col justify-center items-center p-8 transition-all duration-300 ease-out outline-hidden cursor-pointer
            ${hoveredSide === 'spiderman' ? 'md:flex-[1.25] bg-[#0c0c16]' : hoveredSide === 'venom' ? 'md:flex-[0.75] bg-[#06060a]' : 'bg-[#0B0B10]'}
          `}
          onMouseEnter={() => setHoveredSide('spiderman')}
          onMouseLeave={() => setHoveredSide(null)}
          onFocus={() => setHoveredSide('spiderman')}
          onBlur={() => setHoveredSide(null)}
          aria-label="Enter Spider-Man Experience"
        >
          {/* Subtle Red/Blue radial glow */}
          <div 
            className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,32,42,0.18)_0%,rgba(27,63,139,0.1)_50%,transparent_100%)] transition-opacity duration-300
              ${hoveredSide === 'spiderman' ? 'opacity-100' : hoveredSide === 'venom' ? 'opacity-30' : 'opacity-70'}
            `}
          />
          
          {/* Dimming mask */}
          <div 
            className={`absolute inset-0 bg-black/40 transition-opacity duration-300
              ${hoveredSide === 'spiderman' ? 'opacity-0' : hoveredSide === 'venom' ? 'opacity-60' : 'opacity-20'}
            `}
          />

          {/* Interactive Content */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-4">
            <span className="font-mono text-xs text-[#6FA8FF] tracking-[0.3em] uppercase">
              Peter Parker
            </span>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display text-[#E7E9F0] tracking-wider uppercase transition-transform duration-300 group-hover:scale-105">
              Spider-Man
            </h2>
            <div className="h-[2px] w-12 bg-[#D6202A] transition-all duration-300" />
            <p className="font-mono text-[10px] text-zinc-400 tracking-widest uppercase">
              Web Arsenal & Gadgets
            </p>
          </div>

          {/* Focus indicator ring */}
          <div className="absolute inset-4 border border-[#D6202A]/0 rounded-lg pointer-events-none transition-all duration-300 peer-focus:border-[#D6202A]/40 focus-within:border-[#D6202A]/30" />
        </Link>

        {/* Venom Half */}
        <Link
          to="/venom"
          className={`relative flex-1 flex flex-col justify-center items-center p-8 transition-all duration-300 ease-out outline-hidden cursor-pointer
            ${hoveredSide === 'venom' ? 'md:flex-[1.25] bg-[#0c0c0c]' : hoveredSide === 'spiderman' ? 'md:flex-[0.75] bg-[#020202]' : 'bg-[#050505]'}
          `}
          onMouseEnter={() => setHoveredSide('venom')}
          onMouseLeave={() => setHoveredSide(null)}
          onFocus={() => setHoveredSide('venom')}
          onBlur={() => setHoveredSide(null)}
          aria-label="Enter Venom Experience"
        >
          {/* Subtle White/Crimson radial glow */}
          <div 
            className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(237,237,237,0.06)_0%,rgba(122,0,0,0.05)_50%,transparent_100%)] transition-opacity duration-300
              ${hoveredSide === 'venom' ? 'opacity-100' : hoveredSide === 'spiderman' ? 'opacity-30' : 'opacity-70'}
            `}
          />

          {/* Dimming mask */}
          <div 
            className={`absolute inset-0 bg-black/40 transition-opacity duration-300
              ${hoveredSide === 'venom' ? 'opacity-0' : hoveredSide === 'spiderman' ? 'opacity-60' : 'opacity-20'}
            `}
          />

          {/* Interactive Content */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-4">
            <span className="font-mono text-xs text-zinc-500 tracking-[0.3em] uppercase">
              Eddie Brock
            </span>
            <h2 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display text-[#EDEDED] tracking-wider uppercase transition-transform duration-300 group-hover:scale-105"
              style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 800 }}
            >
              Venom
            </h2>
            <div className="h-[2px] w-12 bg-[#EDEDED] transition-all duration-300" />
            <p className="font-mono text-[10px] text-zinc-400 tracking-widest uppercase">
              Symbiote Abilities
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
