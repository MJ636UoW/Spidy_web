import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function PageWrapper({ children, theme }) {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);
    
    const handler = (e) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const wipeBg = theme === 'spiderman' 
    ? 'bg-[#D6202A]' 
    : theme === 'venom' 
      ? 'bg-[#EDEDED]' 
      : 'bg-[#161616]';

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Content wrapper */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: prefersReduced ? 0.1 : 0.3 }}
      >
        {children}
      </motion.div>

      {/* Full-screen Wipe Overlay - disabled if prefersReduced is active */}
      {!prefersReduced && (
        <motion.div
          className={`fixed inset-0 z-50 pointer-events-none ${wipeBg}`}
          initial={{ x: '0%' }}
          animate={{ x: '-100%' }}
          exit={{ x: '0%' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
    </div>
  );
}

export default PageWrapper;
