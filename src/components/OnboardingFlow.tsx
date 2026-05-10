import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlowOrb from "@/container/GlowOrb";

interface OnboardingFlowProps {
  onComplete: (name: string, profile: string) => void;
}

const questions = [
  {
    question: 'How experienced are you with crypto?',
    options: [{ label: 'Newbie', value: 'new' }, { label: 'Veteran', value: 'expert' }],
  },
  {
    question: 'What is your goal?',
    options: [{ label: 'Safety', value: 'safe' }, { label: 'High Risk', value: 'high' }],
  },
];

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState(-1);
  const [userName, setUserName] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [finalProfile, setFinalProfile] = useState<string | null>(null);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setIsCalculating(true);
      setTimeout(() => {
        setIsCalculating(false);
        setFinalProfile(value === 'high' ? 'risk-explorer' : 'careful-investor');
      }, 2000);
    }
  };

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-background p-6">
      <AnimatePresence mode="wait">
        {step === -1 && (
          <motion.div key="name" className="w-full max-w-sm text-center space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <h2 className="text-3xl font-bold">What should I call you?</h2>
            <input 
              type="text" value={userName} onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-center text-xl outline-none"
              placeholder="Your name..." autoFocus
            />
            <button disabled={!userName.trim()} onClick={() => setStep(0)} className="w-full bg-primary text-white font-bold py-4 rounded-2xl disabled:opacity-30">Continue</button>
          </motion.div>
        )}

        {isCalculating && (
          <motion.div key="loading" className="flex flex-col items-center gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <GlowOrb size={100} />
            <p className="animate-pulse">Analyzing your persona...</p>
          </motion.div>
        )}

        {finalProfile && !isCalculating && (
          <motion.div key="result" className="text-center space-y-6" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="text-6xl">🚀</div>
            <h2 className="text-2xl font-bold">Welcome, {userName}!</h2>
            <p className="text-muted-foreground">You are a {finalProfile.replace('-', ' ')}.</p>
            <button onClick={() => onComplete(userName, finalProfile)} className="w-full bg-primary text-white font-bold py-4 px-10 rounded-2xl">Launch Dashboard</button>
          </motion.div>
        )}

        {step >= 0 && !isCalculating && !finalProfile && (
          <motion.div key={`q-${step}`} className="w-full max-w-sm space-y-6" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <h2 className="text-xl font-semibold">{questions[step].question}</h2>
            {questions[step].options.map(o => (
              <button key={o.value} onClick={() => handleAnswer(o.value)} className="w-full text-left p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/20 transition-all">{o.label}</button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default OnboardingFlow;