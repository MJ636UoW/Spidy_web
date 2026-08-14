import React from 'react';

function PowerCard({ item, onClick, theme }) {
  // Select some thematic visual accents based on items
  const stats = item.stats || [];
  const glossyClass = theme === 'venom' ? 'venom-glossy' : theme === 'spiderman' ? 'spiderman-glossy' : '';

  return (
    <button
      onClick={onClick}
      className={`group text-left w-full relative flex flex-col justify-between p-6 rounded-xl ${glossyClass} hover:border-theme-glow transition-all duration-300 ease-out outline-hidden cursor-pointer focus-visible:ring-2 focus-visible:ring-theme-glow focus-visible:ring-offset-2 focus-visible:ring-offset-theme-bg hover:shadow-2xl hover:shadow-theme-glow/10 hover:-translate-y-1.5`}
    >
      {/* Decorative corners for the "spec-sheet" layout */}
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

      {/* Decorative separator line */}
      <div className="my-5 h-[1px] w-full bg-theme-primary/10 group-hover:bg-theme-primary/30 transition-colors duration-300" />

      {/* Specs layout using the IBM Plex Mono utility font */}
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
