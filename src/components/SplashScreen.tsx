import React from 'react';
import { motion } from 'framer-motion';
import GlowOrb from '../container/GlowOrb';

interface SplashScreenProps {
  onContinue: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onContinue }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Subtle background glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(340 55% 72% / 0.06) 0%, transparent 60%)',
        }}
      />

      <motion.div
        className="flex flex-col items-center gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <GlowOrb size={140} />

        <div className="flex flex-col items-center gap-3 mt-2">
          <h1 className="text-4xl font-display font-bold tracking-tight text-foreground">
            Laira
          </h1>
          <p className="text-sm text-muted-foreground text-center max-w-[260px] leading-relaxed">
            Your emotionally intelligent AI companion for navigating crypto safely.
          </p>
        </div>

        <motion.button
          onClick={onContinue}
          className="mt-8 px-8 py-3 rounded-2xl text-sm font-medium laira-glow-button text-primary-foreground"
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          Get Started
        </motion.button>
      </motion.div>

      {/* Bottom branding */}
      <motion.p
        className="absolute bottom-8 text-[10px] text-muted-foreground/40 tracking-widest uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        Powered by Solana
      </motion.p>
    </motion.div>
  );
};

export default SplashScreen;