import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import RevealHero from '../components/RevealHero';
import PowerCard from '../components/PowerCard';
import ClipModal from '../components/ClipModal';
import CursorTrail from '../components/CursorTrail';
import { venomPowers } from '../data/venomPowers';
import { playHiss, getAmbientMute, setAmbientMute } from '../data/soundSynthesizer';

// Import custom character assets
import suitImg from '../assets/venom/suit.jpg';
import faceImg from '../assets/venom/face.jpg';

function VenomDashboard() {
  const [activeItem, setActiveItem] = useState(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(!getAmbientMute());
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);
    const handler = (e) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleCardClick = (power) => {
    if (isAudioEnabled) {
      playHiss();
    }
    setActiveItem(power);
  };

  const handleRevealSound = () => {
    if (isAudioEnabled) {
      playHiss();
    }
  };

  const gridVariants = prefersReduced ? {
    hidden: { opacity: 1 },
    show: { opacity: 1 }
  } : {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.07 }
    }
  };

  const cardVariants = prefersReduced ? {
    hidden: { opacity: 1 },
    show: { opacity: 1 }
  } : {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <PageWrapper theme="venom">
      <CursorTrail theme="venom" />

      <div data-theme="venom" className="relative z-20 min-h-screen bg-theme-bg text-theme-text p-4 md:p-8 font-body transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-theme-primary/20 pb-4 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-display uppercase tracking-wider text-theme-primary">
                Venom
              </h1>
              <p className="font-mono text-[10px] text-zinc-400 tracking-widest uppercase">
                Eddie Brock // Symbiote Stats & Threats
              </p>
            </div>
            
            {/* Control Panel (Back, Audio, Direct Swap) */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  const nextVal = !isAudioEnabled;
                  setIsAudioEnabled(nextVal);
                  setAmbientMute(!nextVal);
                }}
                className={`px-3 py-2 font-mono text-xs border transition duration-200 uppercase tracking-widest font-bold cursor-pointer outline-hidden focus-visible:ring-2 focus-visible:ring-theme-primary focus-visible:ring-offset-2 focus-visible:ring-offset-theme-bg
                  ${isAudioEnabled ? 'bg-theme-primary/20 border-theme-primary text-theme-primary' : 'border-zinc-700 text-zinc-400 hover:text-white'}
                `}
                aria-label={isAudioEnabled ? "Mute synthesized audio" : "Unmute synthesized audio"}
              >
                {isAudioEnabled ? 'AUDIO: ON 🔊' : 'AUDIO: MUTED 🔇'}
              </button>

              <Link 
                to="/spiderman" 
                className="px-3 py-2 font-mono text-xs border border-red-600 hover:bg-red-600 hover:text-white text-[#D6202A] transition duration-200 uppercase tracking-widest font-bold focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-theme-bg"
                style={{ fontFamily: "'Anton', sans-serif" }}
              >
                ← SPIDER-MAN CORE
              </Link>

              <Link 
                to="/" 
                className="px-3 py-2 font-mono text-xs border border-theme-primary/30 hover:border-theme-primary hover:bg-theme-primary hover:text-theme-bg transition duration-200 uppercase tracking-widest font-bold focus-visible:ring-2 focus-visible:ring-theme-primary focus-visible:ring-offset-2 focus-visible:ring-offset-theme-bg"
              >
                Back
              </Link>
            </div>
          </header>

          {/* Two-Column Dossier Info Card & Reveal Hero */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-4" aria-label="Venom profile and interactive unmasking card">
            {/* Left Side: Creative Info & Quote Card */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-zinc-900/40 backdrop-blur-md border border-theme-primary/20 rounded-xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              {/* High-tech scanner header */}
              <div className="flex justify-between items-center border-b border-theme-primary/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-theme-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-theme-primary"></span>
                  </span>
                  <span className="font-mono text-xs text-zinc-400 tracking-wider">
                    DATABASE REGISTERED // SYMBIOSIS DIAGNOSTICS
                  </span>
                </div>
                <span className="font-mono text-[9px] text-theme-glow uppercase tracking-widest">
                  SYS STATUS: DANGER
                </span>
              </div>

              {/* Bio Details */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold uppercase tracking-wider text-theme-primary font-display">
                  SUBJECT ID: EDDIE BROCK // VENOM
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed font-body">
                  An investigative journalist bonded with an alien symbiote, Eddie Brock operates as Venom, a lethal protector feeding on criminals and fighting off existential symbiote threats from the cosmic void.
                </p>
              </div>

              {/* Film Quote */}
              <blockquote className="border-l-2 border-theme-primary pl-4 py-1 my-3 italic text-zinc-400 font-body text-sm leading-relaxed relative">
                <span className="text-3xl text-theme-primary/30 font-serif absolute -left-1 -top-3">“</span>
                We are Venom. We do not eat people... unless they are bad. We protect the innocent. That is the deal.
                <cite className="block not-italic text-[10px] text-zinc-500 font-mono mt-2 uppercase tracking-wider">
                  — Venom (2018)
                </cite>
              </blockquote>

              {/* Diagnostic Specifications */}
              <div className="grid grid-cols-2 gap-4 border-t border-theme-primary/10 pt-6">
                <div>
                  <span className="block text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                    SYMBIOSIS SYNC
                  </span>
                  <span className="text-xs font-mono font-bold text-zinc-200">
                    SYNAPSE OVERLAP: 98%
                  </span>
                </div>
                <div>
                  <span className="block text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                    CORE WEAKNESSES
                  </span>
                  <span className="text-xs font-mono font-bold text-zinc-200">
                    SONIC WAVES & FIRE
                  </span>
                </div>
                <div>
                  <span className="block text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                    MUSCLE AMPLIFIER
                  </span>
                  <span className="text-xs font-mono font-bold text-zinc-200">
                    STRENGTH MULTIPLIER: +450%
                  </span>
                </div>
                <div>
                  <span className="block text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                    THREAT RATING
                  </span>
                  <span className="text-xs font-mono font-bold text-zinc-200">
                    CLASS-4 LETHAL ANTI-HERO
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side: Unmasking Portrait */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <RevealHero 
                theme="venom" 
                suitImage={suitImg} 
                faceImage={faceImg} 
                suitPosition="center center"
                suitScale={1.0}
                facePosition="center center"
                faceScale={1.62}
                faceTranslateX="-3.5%"
                faceTranslateY="6.8%"
                onReveal={handleRevealSound} 
              />
            </div>
          </section>

          {/* Grid Area */}
          <main className="space-y-6">
            <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-2">
              01 / Core Engineering Strengths Registry
            </h2>
            
            <motion.div 
              variants={gridVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.05 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {venomPowers.map((power) => (
                <motion.div key={power.id} variants={cardVariants}>
                  <PowerCard 
                    item={power} 
                    onClick={() => handleCardClick(power)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </main>

          {/* Detail Tactical Modal */}
          <AnimatePresence>
            {activeItem && (
              <ClipModal
                item={activeItem}
                theme="venom"
                onClose={() => setActiveItem(null)}
              />
            )}
          </AnimatePresence>

        </div>
      </div>
    </PageWrapper>
  );
}

export default VenomDashboard;
