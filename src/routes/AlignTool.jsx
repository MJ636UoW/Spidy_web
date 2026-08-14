import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import suitImg from '../assets/spiderman/suit.jpg';
import faceImg from '../assets/spiderman/face.jpg';

function AlignTool() {
  const [scale, setScale] = useState(0.755);
  const [translateX, setTranslateX] = useState(-39.1);
  const [translateY, setTranslateY] = useState(-34.8);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 p-6 font-mono flex flex-col items-center">
      <header className="w-full max-w-4xl border-b border-zinc-800 pb-4 mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-widest text-red-500">
            Interactive Image Alignment Tool
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Slide values to overlay Andrew Garfield exactly with Spider-Man's mask.
          </p>
        </div>
        <Link
          to="/spiderman"
          className="px-4 py-2 border border-zinc-700 hover:bg-zinc-800 hover:text-white transition duration-200 text-xs"
        >
          BACK
        </Link>
      </header>

      <main className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Overlay Preview Panel */}
        <div className="flex flex-col items-center">
          <div className="text-xs text-zinc-500 mb-2 uppercase tracking-wider">
            Live Preview (50% Opacity Overlay)
          </div>
          
          <div className="reveal relative w-full max-w-[320px] aspect-[576/1024] overflow-hidden bg-neutral-900 border border-red-500/20 rounded-xl shadow-2xl">
            {/* Face Layer (50% Opacity, Scaled and Translated) */}
            <div className="absolute inset-0 w-full h-full opacity-50 z-10 pointer-events-none">
              <img
                src={faceImg}
                alt="Face layer preview"
                className="w-full h-full object-cover"
                style={{
                  objectPosition: 'center center',
                  transform: `translate(${translateX}%, ${translateY}%) scale(${scale})`,
                  filter: 'hue-rotate(240deg)' // blue tint for distinction
                }}
              />
            </div>

            {/* Suit Layer (50% Opacity, centered and static) */}
            <div className="absolute inset-0 w-full h-full opacity-50 z-20 pointer-events-none">
              <img
                src={suitImg}
                alt="Suit layer preview"
                className="w-full h-full object-cover"
                style={{
                  objectPosition: 'center center',
                  transform: 'scale(1)'
                }}
              />
            </div>

            {/* Center target crosshair */}
            <div className="absolute inset-0 border border-white/5 pointer-events-none z-35 flex items-center justify-center">
              <div className="w-4 h-[1px] bg-white/20" />
              <div className="h-4 w-[1px] bg-white/20" />
            </div>
          </div>
        </div>

        {/* Sliders and Code Output */}
        <div className="space-y-6">
          <div className="space-y-4 bg-neutral-900 p-6 rounded-lg border border-zinc-800">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-300">
              Alignment Sliders
            </h2>

            {/* Scale Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Face Scale (scale)</span>
                <span className="text-red-500 font-bold">{scale.toFixed(3)}</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="2.0"
                step="0.005"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
            </div>

            {/* Translate X Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Translate X (%)</span>
                <span className="text-red-500 font-bold">{translateX.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="-150"
                max="150"
                step="0.1"
                value={translateX}
                onChange={(e) => setTranslateX(parseFloat(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
            </div>

            {/* Translate Y Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Translate Y (%)</span>
                <span className="text-red-500 font-bold">{translateY.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="-150"
                max="150"
                step="0.1"
                value={translateY}
                onChange={(e) => setTranslateY(parseFloat(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
            </div>
          </div>

          {/* Copyable Props Code block */}
          <div className="bg-neutral-900 p-6 rounded-lg border border-zinc-800 space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-300">
              Resolved Output Props
            </h2>
            <p className="text-[10px] text-zinc-500">
              Slide until the blue-tinted face aligns with the mask, then copy these props:
            </p>
            <pre className="bg-black/60 p-4 rounded text-xs text-green-400 overflow-x-auto select-all">
{`suitPosition="center center"
suitScale={1.0}
facePosition="center center"
faceScale={${scale.toFixed(3)}}
faceTranslateX="${translateX.toFixed(1)}%"
faceTranslateY="${translateY.toFixed(1)}%"`}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AlignTool;
