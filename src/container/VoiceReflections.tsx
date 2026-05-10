import React from 'react';
import { motion } from 'framer-motion';
// Add all missing icons back into this single import line
import { ArrowLeft, Loader2, Sparkles, ShieldCheck } from 'lucide-react'; 
import { useConversation } from "@elevenlabs/react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react"; //
import { LAMPORTS_PER_SOL } from "@solana/web3.js"; //
import { weeklyReflection } from '@/lib/mockData'; //

interface VoiceReflectionsProps {
  onBack: () => void;
  userName: string; // Passed from your Index.tsx state
}

const VoiceReflections: React.FC<VoiceReflectionsProps> = ({ onBack, userName }) => {
  const { connection } = useConnection(); //
  const { publicKey } = useWallet(); //
  
  // 1. Initialize the ElevenLabs Conversation Hook
  const conversation = useConversation({
    onConnect: () => console.log("Laira is Live"),
    onDisconnect: () => console.log("Laira Disconnected"),
    onError: (err) => console.error("ElevenLabs Error:", err),
  });

  const { status, isSpeaking } = conversation; //

  // 2. Extract context for Laira's "Emotional Intelligence"
  const emotionalState = weeklyReflection.highlights.find(h => h.label === "Emotional Score")?.value || "Calm";

  const handleToggleConversation = async () => {
    if (status === "connected") {
      await conversation.endSession(); //
    } else {
      try {
        // Request Microphone Permission
        await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Fetch real Solana Balance for the Agent
        const lamports = publicKey ? await connection.getBalance(publicKey) : 0;
        const balance = (lamports / LAMPORTS_PER_SOL).toFixed(2);

        // 3. Start Session with Dynamic Variables
        await conversation.startSession({
          agentId: import.meta.env.VITE_ELEVENLABS_AGENT_ID,
          dynamicVariables: {
            user_name: userName, //
            sol_balance: `${balance} SOL`, //
            emotional_state: emotionalState, //
          }
        });
      } catch (err) {
        console.error("Failed to start session:", err);
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col bg-background overflow-hidden"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 260 }}
    >
      {/* Header - Stays fixed at top */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-border/30 bg-background/95 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors p-2 -ml-2">
            <ArrowLeft size={20} />
          </button>
          <div>
            <p className="text-sm font-bold tracking-tight">Laira Reflection</p>
            <div className="flex items-center gap-1.5">
              <div className={`h-1.5 w-1.5 rounded-full ${status === 'connected' ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-500'}`} />
              <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold">
                {status === 'connected' ? 'Encrypted Live' : 'Offline'}
              </p>
            </div>
          </div>
        </div>
        <ShieldCheck size={18} className="text-muted-foreground/40" />
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto px-6 py-12 flex flex-col items-center">
        <div className="max-w-md w-full space-y-12">
          
          {/* AI Avatar / Voice Visualizer */}
          <div className="relative flex justify-center">
            {isSpeaking && (
              <motion.div 
                className="absolute w-44 h-44 rounded-full bg-primary/10 border border-primary/20"
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.2, 0.6] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            )}
            <div className={`relative w-40 h-40 rounded-full flex items-center justify-center transition-all duration-700 shadow-2xl ${
              status === 'connected' ? 'bg-primary shadow-primary/40 scale-105' : 'bg-muted'
            }`}>
              {status === 'connecting' ? (
                <Loader2 className="w-12 h-12 text-white animate-spin" />
              ) : (
                <Sparkles className={`w-12 h-12 ${status === 'connected' ? 'text-white' : 'text-muted-foreground'}`} />
              )}
            </div>
          </div>

          {/* Dynamic Status Text */}
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-bold text-foreground">
              {status === 'connected' ? `Talking with Laira` : `Reflect, ${userName}`}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed px-6">
              {status === 'connected' 
                ? "I'm listening to your thoughts on your Solana journey." 
                : "A calm space to discuss your emotional trends and crypto activity."}
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button
              onClick={handleToggleConversation}
              disabled={status === 'connecting'}
              className={`w-full py-5 rounded-3xl font-bold text-lg transition-all shadow-xl active:scale-95 ${
                status === 'connected' 
                  ? 'bg-zinc-900 text-white shadow-zinc-950/20' 
                  : 'bg-primary text-white shadow-primary/20'
              } disabled:opacity-50`}
            >
              {status === 'connected' ? "End Session" : "Start Conversation"}
            </button>
          </div>

          {/* Reflection Context Card */}
          <motion.div 
            className="laira-glass p-6 rounded-2xl border border-white/5 space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Weekly Context</span>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{emotionalState} Mode</span>
            </div>
            <p className="text-xs text-foreground/70 italic leading-relaxed">
              "Laira is aware of your calm behavior score and current asset holdings for this session."
            </p>
          </motion.div>

          {/* Footer Branding */}
          <div className="pb-12 pt-6 text-center opacity-30">
            <p className="text-[9px] uppercase tracking-widest font-bold">
              Emotionally Intelligent Voice by ElevenLabs
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VoiceReflections;