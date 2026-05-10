import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft,ChevronRight } from 'lucide-react';

// FIXED: Interface only contains what THIS component needs
interface CrossChainPreviewProps {
  onBack?: () => void; 
  isPreviewOnly?: boolean;
}

const CrossChainPreview: React.FC<CrossChainPreviewProps> = ({ onBack, isPreviewOnly = false }) => {
  const [confirmed, setConfirmed] = useState(false);

  if (isPreviewOnly) {
    return (
      <div className="laira-glass p-6 h-full border border-white/5 bg-black/20 hover:bg-black/40 transition-all cursor-pointer">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Cross-Chain Bridge</p>
        <p className="text-sm font-semibold text-foreground mt-1">Safely Move Assets</p>
        <div className="mt-4 flex items-center justify-between p-3 bg-white/5 rounded-xl">
          <span className="text-xs">⟠ ETH</span>
          <ChevronRight size={14} className="text-muted-foreground/30" />
          <span className="text-xs">◎ SOL</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div className="fixed inset-0 z-[80] flex flex-col bg-background" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}>
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border/30 bg-background/90">
        <button onClick={onBack} className="p-1"><ArrowLeft size={20} /></button>
        <p className="text-sm font-semibold">Cross-Chain Onboarding</p>
      </div>
      <div className="flex-1 p-4">
        {!confirmed ? (
          <button onClick={() => setConfirmed(true)} className="w-full py-4 rounded-2xl bg-primary text-white">
            Preview Transaction
          </button>
        ) : (
          <div className="text-center py-10">
            <p>Ready to bridge.</p>
            <button onClick={() => setConfirmed(false)} className="text-xs text-primary mt-4">Back</button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CrossChainPreview;