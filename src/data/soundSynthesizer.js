// Web Audio API Synthesizer for Spider-Man & Venom Sound Effects
// Programmatic synthesis avoids downloading large MP3 assets and works 100% offline.

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Generate a buffer filled with white noise
function createNoiseBuffer(ctx, duration = 1.0) {
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

/**
 * Programmatic Spider-Man "Web-Thwip" Sound Effect
 * Synthesizes a high-frequency filtered white-noise sweep with rapid exponential decay.
 */
export function playThwip() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Noise Source
    const noise = ctx.createBufferSource();
    noise.buffer = createNoiseBuffer(ctx, 0.2);

    // Bandpass Filter (handles the frequency sweep)
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.setValueAtTime(4.0, now);
    // Sweep frequency down rapidly from 8000Hz to 600Hz
    filter.frequency.setValueAtTime(8500, now);
    filter.frequency.exponentialRampToValueAtTime(500, now + 0.12);

    // Gain node (volume envelope)
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.01, now);
    // Quick attack
    gainNode.gain.linearRampToValueAtTime(0.35, now + 0.01);
    // Rapid exponential decay
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    // Connections
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Start & stop play
    noise.start(now);
    noise.stop(now + 0.16);
  } catch (error) {
    console.warn("Failed to play synthesized thwip sound:", error);
  }
}

/**
 * Programmatic Venom "Symbiote Hiss" Sound Effect
 * Synthesizes low-pass filtered noise with LFO volume modulation (breathing texture) and slow decay.
 */
export function playHiss() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const duration = 0.55;

    // Noise Source
    const noise = ctx.createBufferSource();
    noise.buffer = createNoiseBuffer(ctx, duration);

    // Lowpass Filter (lowers the harsh high-frequencies)
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.linearRampToValueAtTime(300, now + duration);
    filter.Q.setValueAtTime(2.0, now);

    // Volume Modulation (LFO breathing effect)
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(8, now); // 8 Hz LFO wobble

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(0.08, now); // modulation depth

    // Gain node (volume envelope)
    const mainGain = ctx.createGain();
    mainGain.gain.setValueAtTime(0.01, now);
    // Attack
    mainGain.gain.linearRampToValueAtTime(0.25, now + 0.05);
    // Wobbling sustain & decay
    mainGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    // Modulate mainGain with LFO
    lfo.connect(lfoGain);
    lfoGain.connect(mainGain.gain);

    // Connections
    noise.connect(filter);
    filter.connect(mainGain);
    mainGain.connect(ctx.destination);

    // Start
    lfo.start(now);
    noise.start(now);

    // Stop
    noise.stop(now + duration);
    lfo.stop(now + duration);
  } catch (error) {
    console.warn("Failed to play synthesized symbiote hiss:", error);
  }
}

// --- Background Ambient Soundtrack Synthesizer ---
let ambientNodes = [];
let ambientGainNode = null;
let isAmbientMuted = true; // start muted by default to satisfy browser autoplay policies
let currentTheme = null;

export function getAmbientMute() {
  return isAmbientMuted;
}

export function startAmbient(theme) {
  try {
    const ctx = getAudioContext();
    
    // If the theme is already playing, do nothing
    if (currentTheme === theme) {
      if (ctx.state === 'suspended') ctx.resume();
      return;
    }
    
    // Stop any existing ambient track
    stopAmbient();
    
    currentTheme = theme;
    const now = ctx.currentTime;
    
    // Create master ambient gain node if it doesn't exist
    if (!ambientGainNode) {
      ambientGainNode = ctx.createGain();
      ambientGainNode.gain.setValueAtTime(isAmbientMuted ? 0 : 0.15, now);
      ambientGainNode.connect(ctx.destination);
    }
    
    if (theme === 'spiderman') {
      // Spider-Man high-tech hero drone
      const osc1 = ctx.createOscillator();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(130.81, now); // C3 node
      
      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(196.00, now); // G3 node
      
      // Rhythmic radar beep (gadget diagnostic scan feeling)
      const beep = ctx.createOscillator();
      beep.type = 'sine';
      beep.frequency.setValueAtTime(659.25, now); // E5 note
      
      const beepGain = ctx.createGain();
      beepGain.gain.setValueAtTime(0.001, now);
      
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.7, now); // pulse every ~1.4s
      
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(0.002, now); // depth
      
      // Filter for warmth
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, now);
      
      // Connections
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(ambientGainNode);
      
      lfo.connect(lfoGain);
      lfoGain.connect(beepGain.gain);
      beep.connect(beepGain);
      beepGain.connect(ambientGainNode);
      
      // Start nodes
      osc1.start(now);
      osc2.start(now);
      beep.start(now);
      lfo.start(now);
      
      ambientNodes.push(osc1, osc2, beep, lfo, filter, beepGain, lfoGain);
      
    } else if (theme === 'venom') {
      // Venom heavy breathing symbiote rumble
      const osc1 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(55.00, now); // A1
      
      const osc2 = ctx.createOscillator();
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(56.20, now); // detuned by 1.2Hz to pulse
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(100, now);
      filter.Q.setValueAtTime(3.0, now);
      
      // LFO for breathing filter sweep
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.18, now); // slow breathing
      
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(25, now); // sweeps filter between 75Hz and 125Hz
      
      // Warm white noise hum for organic breathing texture
      const noise = ctx.createBufferSource();
      noise.buffer = createNoiseBuffer(ctx, 4.0);
      noise.loop = true;
      
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(70, now);
      
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.015, now);
      
      // Connections
      osc1.connect(filter);
      osc2.connect(filter);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      filter.connect(ambientGainNode);
      
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ambientGainNode);
      
      // Start nodes
      osc1.start(now);
      osc2.start(now);
      lfo.start(now);
      noise.start(now);
      
      ambientNodes.push(osc1, osc2, lfo, noise, filter, lfoGain, noiseFilter, noiseGain);
    }
  } catch (error) {
    console.warn("Failed to start ambient audio:", error);
  }
}

export function stopAmbient() {
  try {
    ambientNodes.forEach(node => {
      try {
        node.stop();
      } catch (e) {}
    });
    ambientNodes = [];
    currentTheme = null;
  } catch (error) {
    console.warn("Failed to stop ambient audio:", error);
  }
}

export function setAmbientMute(isMuted) {
  try {
    isAmbientMuted = isMuted;
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    if (ambientGainNode) {
      // Ramp gain exponentially to prevent audio pops
      ambientGainNode.gain.exponentialRampToValueAtTime(isMuted ? 0.0001 : 0.15, now + 0.15);
      setTimeout(() => {
        if (ambientGainNode) {
          ambientGainNode.gain.setValueAtTime(isMuted ? 0 : 0.15, ctx.currentTime);
        }
      }, 160);
    }
  } catch (error) {
    console.warn("Failed to set ambient mute state:", error);
  }
}
