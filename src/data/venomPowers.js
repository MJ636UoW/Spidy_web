export const venomPowers = [
  {
    id: 'camouflage',
    name: 'Camouflage',
    tagline: 'Light-bending symbiote cell alignment',
    description: 'Vanish from sight by blending the symbiote outer membrane with light reflections in the immediate environment. Allows Eddie Brock to execute silent takedowns and escape heated situations instantly.',
    stats: [
      { label: 'VISIBILITY', value: '0%' },
      { label: 'ENERGY DRAIN', value: '1.2/s' },
      { label: 'STEALTH MOD', value: 'MAX' }
    ],
    videoPlaceholderText: '👤 CAMOUFLAGE_CLIP: INVISIBLE_MEMBRANE'
  },
  {
    id: 'tendril-strike',
    name: 'Tendril Strike',
    tagline: 'Multi-directional whipping lashes',
    description: 'Shoots high-speed black symbiote tendrils outward to impale, whip, or drag enemies. Highly effective for crowd sweeps, closing gaps, and grabbing heavy environmental objects to throw.',
    stats: [
      { label: 'RANGE', value: '15m' },
      { label: 'STRIKES/SEC', value: '4.5' },
      { label: 'PENETRATION', value: 'HIGH' }
    ],
    videoPlaceholderText: '🦑 TENDRIL_STRIKE_CLIP: OVERREACH_LASH'
  },
  {
    id: 'enhanced-strength',
    name: 'Enhanced Strength',
    tagline: 'Superhuman muscle fiber augmentation',
    description: 'The symbiote reinforces the host\'s musculature, raising lifting capacity to multiple tons. Allows Venom to smash walls, hurl automobiles, and deliver devastating ground pounds that collapse concrete surfaces.',
    stats: [
      { label: 'CARRY LIMIT', value: '25 TONS' },
      { label: 'STRENGTH MULT', value: 'x10' },
      { label: 'IMPACT RATING', value: 'DEVASTATING' }
    ],
    videoPlaceholderText: '💪 ENHANCED_STRENGTH_CLIP: KINETIC_FORCE'
  },
  {
    id: 'regeneration',
    name: 'Regeneration',
    tagline: 'Accelerated host tissue reconstruction',
    description: 'Forces active cellular regeneration in the host, instantly healing physical traumas, bones, and bullet wounds. Healing rate increases based on the amount of raw organic matter consumed.',
    stats: [
      { label: 'HEAL RATE', value: '15%/s' },
      { label: 'SYNC COST', value: '20%' },
      { label: 'RECOVERY MOD', value: 'CELLULAR' }
    ],
    videoPlaceholderText: '🩸 REGENERATION_CLIP: ACCELERATED_MEND'
  },
  {
    id: 'venom-bite',
    name: 'Venom Bite',
    tagline: 'Devastating close-range predator executioner',
    description: 'A crushing bite maneuver utilizing the symbiote\'s razor fangs. Bites through titanium plates, absorbs neural energy from the target, and immediately restores health to Eddie Brock.',
    stats: [
      { label: 'DAMAGE RATING', value: 'FATAL' },
      { label: 'HP REFUND', value: '40%' },
      { label: 'FEED RATIO', value: 'OPTIMAL' }
    ],
    videoPlaceholderText: '🦷 VENOM_BITE_CLIP: TARGET_CONSUMED'
  },
  {
    id: 'symbiote-roar',
    name: 'Symbiote Roar',
    tagline: 'Acoustic shockwave and mental disruption',
    description: 'Unleashes a deep acoustic roar that creates a shockwave, disorienting target neural pathways. Paralyzes weak-willed enemies, shatters surrounding glass structures, and forces armor panels to tear off.',
    stats: [
      { label: 'DECIBELS', value: '145 dB' },
      { label: 'RADIUS', value: '12m' },
      { label: 'DISRUPT TIME', value: '4.0s' }
    ],
    videoPlaceholderText: '🗣️ SYMBIOTE_ROAR_CLIP: NEURAL_SHOCK'
  }
];
