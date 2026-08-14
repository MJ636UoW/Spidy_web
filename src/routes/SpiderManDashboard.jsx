import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import RevealHero from '../components/RevealHero';
import PowerCard from '../components/PowerCard';
import ClipModal from '../components/ClipModal';
import CursorTrail from '../components/CursorTrail';
import { spiderGadgets } from '../data/spiderGadgets';
import { playThwip } from '../data/soundSynthesizer';

// Import custom character assets
import suitImg from '../assets/spiderman/suit.jpg';
import faceImg from '../assets/spiderman/face.jpg';

function SpiderManDashboard() {
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

  const handleCardClick = (gadget) => {
    if (isAudioEnabled) {
      playThwip();
    }
    setActiveItem(gadget);
  };

  const handleRevealSound = () => {
    if (isAudioEnabled) {
      playThwip();
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
    <PageWrapper theme="spiderman">
      <CursorTrail theme="spiderman" />

      <div data-theme="spiderman" className="relative z-20 min-h-screen bg-theme-bg text-theme-text p-4 md:p-8 font-body transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-theme-primary/20 pb-4 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-display uppercase tracking-wider text-theme-primary">
                Spider-Man
              </h1>
              <p className="font-mono text-[10px] text-theme-glow tracking-widest uppercase">
                Peter Parker // Suit Specs & Bio
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
                to="/venom" 
                className="px-3 py-2 font-mono text-xs border border-zinc-150 hover:bg-zinc-150 hover:text-black text-zinc-100 transition duration-200 uppercase tracking-widest font-bold focus-visible:ring-2 focus-visible:ring-zinc-100 focus-visible:ring-offset-2 focus-visible:ring-offset-theme-bg"
                style={{ fontFamily: "'Unbounded', sans-serif" }}
              >
                VENOM CORE →
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
            <RevealHero 
              theme="spiderman" 
              suitImage={suitImg} 
              faceImage={faceImg} 
              suitPosition="center center"
              suitScale={1.0}
              facePosition="center center"
              faceScale={1.40}
              faceTranslateX="-0.2%"
              faceTranslateY="5.4%"
              onReveal={handleRevealSound} 
            />
          </section>

          {/* Grid Area */}
          <main className="space-y-6">
            <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-2">
              01 / Frontend Competencies Overview
            </h2>
            
            <motion.div 
              variants={gridVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.05 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {spiderGadgets.map((gadget) => (
                <motion.div key={gadget.id} variants={cardVariants}>
                  <PowerCard 
                    item={gadget} 
                    onClick={() => handleCardClick(gadget)}
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
                theme="spiderman"
                onClose={() => setActiveItem(null)}
              />
            )}
          </AnimatePresence>

        </div>
      </div>
    </PageWrapper>
  );
}

export default SpiderManDashboard;
