import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mic, Send, Loader2 } from 'lucide-react';

interface AIChatProps {
  onBack: () => void;
  onOpenVoice: () => void;
  onOpenCrossChain: () => void;
  onSendMessage?: (msg: string) => void;
  isPreviewOnly?: boolean;
  history?: {role: 'laira' | 'user', content: string}[]; // FIXED: Array history
  loading?: boolean;
}

const AIChat: React.FC<AIChatProps> = ({ 
  onBack, onOpenVoice, onOpenCrossChain, onSendMessage,
  isPreviewOnly = false, history = [], loading = false 
}) => {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [history]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage?.(input);
    setInput("");
  };

  if (isPreviewOnly) {
    const lastMsg = history[history.length - 1]?.content || "How can I help?";
    return (
      <div className="laira-glass p-6 h-full border border-white/5 bg-black/20 hover:bg-black/40 transition-all cursor-pointer">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Laira AI</p>
        {loading ? (
          <div className="flex items-center gap-2 mt-2 text-primary animate-pulse">
            <Loader2 className="h-3 w-3 animate-spin" />
            <p className="text-xs italic">Processing...</p>
          </div>
        ) : <p className="text-sm text-foreground/60 italic mt-2 line-clamp-2">"{lastMsg}"</p>}
      </div>
    );
  }

  return (
    <motion.div className="fixed inset-0 z-[75] bg-background flex flex-col" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}>
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-card">
        <button onClick={onBack} className="p-2"><ArrowLeft size={20} /></button>
        <button onClick={onOpenCrossChain} className="text-xs text-primary font-bold tracking-widest">BRIDGE</button>
      </div>
      
      <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-4">
        {history.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-4 rounded-2xl max-w-[85%] text-sm ${
              msg.role === 'user' ? 'bg-primary text-white' : 'bg-white/5 border border-white/10'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <Loader2 className="animate-spin text-primary ml-2" />}
      </div>

      <div className="p-4 border-t border-white/5 flex gap-3 bg-card">
        <button onClick={onOpenVoice} className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"><Mic size={20} /></button>
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-white/5 rounded-xl px-4 outline-none focus:ring-1 focus:ring-primary/50" 
          placeholder="Message Laira..." 
        />
        <button onClick={handleSend} className="p-3 bg-primary rounded-xl text-white hover:opacity-90 transition-opacity">
          <Send size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default AIChat;