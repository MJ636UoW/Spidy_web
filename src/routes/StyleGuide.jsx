import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function StyleGuide() {
  const [theme, setTheme] = useState('spiderman');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'spiderman' ? 'venom' : 'spiderman'));
  };

  return (
    <div data-theme={theme} className="min-h-screen bg-theme-bg text-theme-text font-body transition-colors duration-300 p-8">
      <header className="max-w-4xl mx-auto flex justify-between items-center mb-12 border-b border-theme-primary/20 pb-4">
        <div>
          <h1 className="text-3xl font-display uppercase tracking-wider text-theme-primary">
            Style Guide
          </h1>
          <p className="font-mono text-xs text-zinc-400 mt-1 uppercase tracking-widest">
            Current Theme: {theme}
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 font-mono text-sm border border-theme-primary hover:bg-theme-primary hover:text-theme-bg font-bold transition-all duration-200 cursor-pointer"
          >
            TOGGLE THEME
          </button>
          <Link
            to="/"
            className="px-4 py-2 font-mono text-sm border border-zinc-700 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all duration-200"
          >
            HOME
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto space-y-12">
        {/* Typography Section */}
        <section className="space-y-4">
          <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-2">
            01 / TYPOGRAPHY
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <span className="text-xs font-mono text-zinc-400 block">Display Font (Anton / Unbounded)</span>
              <p className="text-5xl md:text-7xl font-display uppercase break-all">
                MANDAR JOSHI
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono text-zinc-400 block mb-1">Body Font (IBM Plex Sans)</span>
                <p className="text-base font-body leading-relaxed text-zinc-300">
                  This is the standard body text. Used for developer bios, project details, and technical descriptions across both dashboards.
                </p>
              </div>
              <div>
                <span className="text-xs font-mono text-zinc-400 block mb-1">Utility / Data Font (IBM Plex Mono)</span>
                <p className="text-sm font-mono text-theme-primary font-medium tracking-tight">
                  RENDER_SPEED: 1.2ms | FPS: 60 | RATING: WCAG_AA
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Color Palette Swatches */}
        <section className="space-y-4">
          <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-2">
            02 / COLOR PALETTE SWATCHES
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <div className="bg-theme-bg border border-zinc-800 p-4 rounded flex flex-col justify-between h-32 shadow-inner">
              <span className="text-xs font-mono text-zinc-500">bg-theme-bg</span>
              <span className="text-sm font-mono uppercase font-bold text-zinc-200">Base BG</span>
            </div>

            <div className="bg-theme-primary text-theme-bg p-4 rounded flex flex-col justify-between h-32 shadow">
              <span className="text-xs font-mono opacity-80">text-theme-primary</span>
              <span className="text-sm font-mono uppercase font-bold">Primary</span>
            </div>

            <div className="bg-theme-secondary text-white p-4 rounded flex flex-col justify-between h-32 shadow">
              <span className="text-xs font-mono opacity-80">bg-theme-secondary</span>
              <span className="text-sm font-mono uppercase font-bold">Secondary</span>
            </div>

            <div className="bg-theme-glow text-black p-4 rounded flex flex-col justify-between h-32 shadow">
              <span className="text-xs font-mono opacity-80">text-theme-glow</span>
              <span className="text-sm font-mono uppercase font-bold">Glow</span>
            </div>

            <div className="bg-theme-surface text-black p-4 rounded flex flex-col justify-between h-32 shadow">
              <span className="text-xs font-mono opacity-80">bg-theme-surface</span>
              <span className="text-sm font-mono uppercase font-bold">Surface</span>
            </div>

            <div className="bg-zinc-800 text-theme-text p-4 rounded flex flex-col justify-between h-32 shadow">
              <span className="text-xs font-mono text-zinc-500">text-theme-text</span>
              <span className="text-sm font-mono uppercase font-bold text-zinc-200">Body Text</span>
            </div>
          </div>
        </section>

        {/* UI Sample Components */}
        <section className="space-y-4">
          <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-2">
            03 / THEMED COMPONENTS PREVIEW
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Spec Card */}
            <div className="border border-theme-primary/30 bg-theme-secondary/10 p-6 rounded-lg shadow-lg relative overflow-hidden group hover:border-theme-glow transition-all duration-300">
              <div className="absolute top-0 right-0 p-2 font-mono text-[10px] text-theme-primary font-semibold tracking-wider">
                CORE-01
              </div>
              <h3 className="text-xl font-display tracking-wide mb-2 uppercase">
                REACT & NEXT.JS
              </h3>
              <p className="text-sm font-body text-zinc-300 mb-4 leading-relaxed">
                Expertise in building scalable, single-page and server-rendered web applications.
              </p>
              <div className="flex justify-between items-center text-xs font-mono text-theme-glow pt-4 border-t border-theme-primary/10">
                <span>ENGINE: 98%</span>
                <span>LATENCY: 1.2ms</span>
              </div>
            </div>

            {/* Venom Style Alert / Button */}
            <div className="bg-theme-surface text-theme-bg p-6 rounded-lg flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-display tracking-wide mb-2 uppercase text-theme-bg">
                  CLEAN CODE ARCHITECTURE
                </h3>
                <p className="text-sm font-body text-zinc-800 leading-relaxed mb-4">
                  Writing maintainable, self-documenting codebases that enforce lint checkers and separation of concerns.
                </p>
              </div>
              <button className="px-4 py-2 bg-theme-primary text-theme-bg font-mono font-bold text-sm text-center border border-theme-bg hover:bg-theme-bg hover:text-theme-primary transition duration-300 uppercase cursor-pointer">
                Inspect Quality
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default StyleGuide;
