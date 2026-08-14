import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import RevealHero from '../components/RevealHero';
import PowerCard from '../components/PowerCard';
import ClipModal from '../components/ClipModal';
import CursorTrail from '../components/CursorTrail';
import { venomPowers } from '../data/venomPowers';
import { playHiss } from '../data/soundSynthesizer';

function VenomDashboard() {
  const [activeItem, setActiveItem] = useState(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
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
                Mandar Joshi
              </h1>
              <p className="font-mono text-[10px] text-zinc-400 tracking-widest uppercase">
                CORE ENGINEERING STRENGTHS // SYSTEMS ANALYSES
              </p>
            </div>
            
            {/* Control Panel (Back, Audio, Direct Swap) */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsAudioEnabled(prev => !prev)}
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

          {/* Centerpiece Reveal Hero Band */}
          <section aria-label="Interactive character portrait unmasking">
            <RevealHero theme="venom" onReveal={handleRevealSound} />
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
