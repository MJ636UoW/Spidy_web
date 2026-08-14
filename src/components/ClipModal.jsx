import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ClipModal({ item, onClose, theme }) {
  const modalRef = useRef(null);

  // Disable background scrolling when modal is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Focus trap
  useEffect(() => {
    if (!modalRef.current) return;
    
    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = modalRef.current.querySelectorAll(focusableSelectors);
    
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Shift focus to the first element (usually the close button)
    firstElement.focus();

    const handleFocusTrap = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab: wrap to last element
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        // Tab: wrap to first element
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleFocusTrap);
    return () => window.removeEventListener('keydown', handleFocusTrap);
  }, []);

  // Stylized Vector Video Fallback representing holographic projections
  const renderVectorPlayer = () => {
    if (theme === 'spiderman') {
      return (
        <svg className="w-full h-full bg-[#05050A]" viewBox="0 0 600 340">
          <defs>
            <pattern id="scanlines" width="10" height="4" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="100%" y2="0" stroke="#6FA8FF" strokeOpacity="0.05" strokeWidth="1" />
            </pattern>
          </defs>
          {/* Base and grid */}
          <rect width="600" height="340" fill="#06060c" />
          <rect width="600" height="340" fill="url(#scanlines)" />
          
          {/* Grid lines */}
          <path d="M 0,85 L 600,85 M 0,170 L 600,170 M 0,255 L 600,255 M 150,0 L 150,340 M 300,0 L 300,340 M 450,0 L 450,340" stroke="#1B3F8B" strokeWidth="0.5" strokeOpacity="0.2" />
          
          {/* Animated radar rings (pulse) */}
          <circle cx="300" cy="170" r="80" stroke="#D6202A" strokeWidth="1.5" strokeOpacity="0.4" fill="none">
            <animate attributeName="r" values="40;160;40" dur="5s" repeatCount="indefinite" />
            <animate attributeName="strokeOpacity" values="0.8;0;0.8" dur="5s" repeatCount="indefinite" />
          </circle>
          
          <circle cx="300" cy="170" r="120" stroke="#6FA8FF" strokeWidth="1" strokeOpacity="0.2" fill="none">
            <animate attributeName="r" values="80;200;80" dur="7s" repeatCount="indefinite" />
            <animate attributeName="strokeOpacity" values="0.5;0;0.5" dur="7s" repeatCount="indefinite" />
          </circle>

          {/* Web mesh graphics */}
          <path d="M 300,170 L 150,85 M 300,170 L 450,85 M 300,170 L 150,255 M 300,170 L 450,255 M 300,170 L 300,0 M 300,170 L 300,340 M 300,170 L 0,170 M 300,170 L 600,170" stroke="#6FA8FF" strokeWidth="1" strokeOpacity="0.3" />

          {/* HUD details */}
          <rect x="20" y="20" width="80" height="15" fill="none" stroke="#D6202A" strokeWidth="1" strokeOpacity="0.6" />
          <text x="30" y="31" fill="#D6202A" fontSize="8" fontFamily="monospace" letterSpacing="1">FEED:ON</text>
          
          {/* Text labels */}
          <text x="300" y="325" fill="#6FA8FF" fontSize="10" fontFamily="monospace" textAnchor="middle" letterSpacing="2">
            {item.videoPlaceholderText}
          </text>
        </svg>
      );
    } else {
      // Venom
      return (
        <svg className="w-full h-full bg-[#F5F5F5]" viewBox="0 0 600 340">
          {/* Light Background */}
          <rect width="600" height="340" fill="#F0F0F0" />
          
          {/* Symbiote breathing veins (organic lines animating) */}
          <path d="M 100,340 C 150,250 250,280 300,170 C 350,60 480,100 500,0" stroke="#000000" strokeWidth="2.5" strokeOpacity="0.12" fill="none">
            <animate attributeName="d" 
                     values="M 100,340 C 150,250 250,280 300,170 C 350,60 480,100 500,0;
                             M 120,340 C 140,230 280,290 280,170 C 280,50 490,120 480,0;
                             M 100,340 C 150,250 250,280 300,170 C 350,60 480,100 500,0"
                     dur="6s" repeatCount="indefinite" />
          </path>
          
          <path d="M 500,340 C 450,250 350,280 300,170 C 250,60 120,100 100,0" stroke="#000000" strokeWidth="2" strokeOpacity="0.18" fill="none">
            <animate attributeName="d" 
                     values="M 500,340 C 450,250 350,280 300,170 C 250,60 120,100 100,0;
                             M 480,340 C 460,260 320,290 320,170 C 320,50 110,90 120,0;
                             M 500,340 C 450,250 350,280 300,170 C 250,60 120,100 100,0"
                     dur="8s" repeatCount="indefinite" />
          </path>

          {/* Creepy pulsing blobs */}
          <circle cx="300" cy="170" r="30" fill="#E0E0E0" fillOpacity="0.8">
            <animate attributeName="r" values="30;45;30" dur="4s" repeatCount="indefinite" />
          </circle>
          
          <circle cx="300" cy="170" r="10" fill="#000000" fillOpacity="0.25">
            <animate attributeName="r" values="10;22;10" dur="3s" repeatCount="indefinite" />
          </circle>

          {/* Text labels */}
          <text x="300" y="325" fill="#1A1A1A" fontSize="10" fontFamily="monospace" textAnchor="middle" letterSpacing="2">
            {item.videoPlaceholderText}
          </text>
        </svg>
      );
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <motion.div
        className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal Dialog Body */}
      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`relative w-full max-w-2xl ${theme === 'spiderman' ? 'spiderman-glossy' : 'venom-glossy'} rounded-2xl overflow-hidden shadow-2xl z-10 select-none flex flex-col`}
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.93 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Media Block (Video Player fallback) */}
        <div className="aspect-video w-full overflow-hidden border-b border-theme-primary/10 bg-black relative">
          {renderVectorPlayer()}
        </div>

        {/* Info Block */}
        <div className="p-6 md:p-8 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 id="modal-title" className="text-2xl md:text-3xl font-display uppercase tracking-wide text-theme-primary">
                {item.name}
              </h2>
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mt-1">
                {item.tagline}
              </p>
            </div>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className={`px-3 py-1.5 font-mono text-xs border transition duration-200 uppercase tracking-wider cursor-pointer font-bold focus-visible:ring-1 focus-visible:ring-theme-primary outline-hidden ${theme === 'venom' ? 'border-zinc-300 hover:border-theme-primary text-zinc-600 hover:text-theme-primary' : 'border-zinc-700 hover:border-theme-primary text-zinc-400 hover:text-theme-primary'}`}
              aria-label="Close details"
            >
              CLOSE
            </button>
          </div>

          <p className={`text-sm font-body leading-relaxed ${theme === 'venom' ? 'text-zinc-700' : 'text-zinc-300'}`}>
            {item.description}
          </p>

          {/* Stats Sheet */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-theme-primary/10">
            {item.stats && item.stats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <span className="block font-mono text-[9px] text-zinc-500 uppercase tracking-wider">
                  {stat.label}
                </span>
                <span className="block font-mono text-xs text-theme-glow font-bold">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ClipModal;
export { ClipModal };
