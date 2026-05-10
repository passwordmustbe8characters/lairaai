import React from 'react';
import { motion } from 'framer-motion';

interface GlowOrbProps {
  size?: number;
  className?: string;
}

const GlowOrb: React.FC<GlowOrbProps> = ({ size = 160, className = '' }) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(340 55% 72% / 0.15) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Mid glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: '15%',
          background: 'radial-gradient(circle, hsl(340 55% 72% / 0.25) 0%, hsl(340 60% 65% / 0.08) 60%, transparent 80%)',
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />
      {/* Inner core */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: '30%',
          background: 'radial-gradient(circle, hsl(340 55% 80% / 0.6) 0%, hsl(340 55% 72% / 0.3) 50%, transparent 80%)',
          filter: 'blur(2px)',
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      />
      {/* Bright center dot */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: '42%',
          background: 'radial-gradient(circle, hsl(340 60% 88% / 0.9) 0%, hsl(340 55% 72% / 0.4) 80%)',
          filter: 'blur(1px)',
        }}
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default GlowOrb;
