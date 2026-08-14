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
