import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "@/container/Header";
import HomeDashboard from "@/container/HomeDashboard";
import AIChat from "@/container/AIChat";
import CrossChainPreview from "@/container/CrossChainPreview";
import VoiceReflections from "@/container/VoiceReflections";
import SplashScreen from "@/components/SplashScreen";
import OnboardingFlow from "@/components/OnboardingFlow";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

const Index: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  // PERSONALIZATION STATES
  const [userName, setUserName] = useState(""); 
  const [userProfile, setUserProfile] = useState(""); 

  const [showVoice, setShowVoice] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showCrossChain, setShowCrossChain] = useState(false);
  
  const [chatHistory, setChatHistory] = useState<{role: 'laira' | 'user', content: string}[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [walletBalance, setWalletBalance] = useState<number | null>(null);

  // BLOCKCHAIN SYNC
  useEffect(() => {
    (async () => {
      if (!connection || !publicKey) {
        setWalletBalance(null);
        return;
      }
      try {
        const balance = await connection.getBalance(publicKey);
        setWalletBalance(balance / LAMPORTS_PER_SOL);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    })();

    let subId: number | undefined;
    if (connection && publicKey) {
      subId = connection.onAccountChange(publicKey, (account) => {
        setWalletBalance(account.lamports / LAMPORTS_PER_SOL);
      });
    }
    return () => { if (subId !== undefined) connection.removeAccountChangeListener(subId); };
  }, [connection, publicKey]);

  // SMART CHAT LOGIC
  const handleSendMessage = (msg: string) => {
    setChatHistory(prev => [...prev, { role: 'user', content: msg }]);
    setIsAnalyzing(true);

    setTimeout(() => {
      const lowerMsg = msg.toLowerCase();
      let response = "";

      // Logic: Balance questions
      if (lowerMsg.includes("how much") || lowerMsg.includes("balance") || lowerMsg.includes("sol")) {
        response = `I've checked the ledger, ${userName}. You currently have ${walletBalance?.toFixed(2) || "0.00"} SOL in your wallet.`;
      } 
      // Logic: Persona-based advice
      else if (lowerMsg.includes("what should i do") || lowerMsg.includes("advice")) {
        response = userProfile === 'risk-explorer' 
          ? "As a risk explorer, I suggest exploring the cross-chain bridge to Celo for higher volatility plays."
          : "Given your careful approach, I recommend sticking to the main Solana staking protocols.";
      }
      else {
        response = `Got it, ${userName}. As a ${userProfile.replace('-', ' ')}, your strategy is looking solid.`;
      }

      setChatHistory(prev => [...prev, { role: 'laira', content: response }]);
      setIsAnalyzing(false);
    }, 1000);
  };

  const handleAnalyze = useCallback(() => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const bal = walletBalance || 0;
      const insight = `Hello ${userName}, I've scanned your wallet. Your ${bal.toFixed(2)} SOL is verified. Based on your ${userProfile.replace('-', ' ')} profile, I suggest we look into active yield farming.`;
      setChatHistory(prev => [...prev, { role: 'laira', content: insight }]);
      setIsAnalyzing(false);
      setShowChat(true);
    }, 1200);
  }, [walletBalance, userName, userProfile]);

  const closeOverlays = () => { setShowVoice(false); setShowChat(false); setShowCrossChain(false); };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="s" onContinue={() => { setShowSplash(false); setShowOnboarding(true); }} />
        ) : showOnboarding ? (
          <OnboardingFlow 
            key="o" 
            onComplete={(name, profile) => { 
              setUserName(name); 
              setUserProfile(profile);
              setChatHistory([{ role: 'laira', content: `Welcome, ${name}! I'm Laira. Your ${profile.replace('-', ' ')} profile is ready.` }]);
              setShowOnboarding(false); 
            }} 
          />
        ) : (
          <div key="dashboard" className="flex flex-col min-h-screen">
            <Header />
            <main className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <HomeDashboard profile={userProfile} balance={walletBalance} onTalkToLaira={handleAnalyze} />
                <div onClick={() => setShowCrossChain(true)} className="cursor-pointer">
                  <CrossChainPreview isPreviewOnly={true} onBack={closeOverlays} />
                </div>
              </div>
              <div className="lg:col-span-1 cursor-pointer" onClick={() => setShowChat(true)}>
                <AIChat isPreviewOnly={true} history={chatHistory} loading={isAnalyzing} onBack={closeOverlays} onOpenVoice={() => setShowVoice(true)} onOpenCrossChain={() => setShowCrossChain(true)} />
              </div>
            </main>
            <AnimatePresence>
              {showVoice && <VoiceReflections key="v" userName={userName} onBack={closeOverlays} />}
              {showChat && (
                <AIChat key="c" history={chatHistory} loading={isAnalyzing} onBack={closeOverlays} onSendMessage={handleSendMessage} onOpenVoice={() => { setShowChat(false); setShowVoice(true); }} onOpenCrossChain={() => { setShowChat(false); setShowCrossChain(true); }} />
              )}
              {showCrossChain && <CrossChainPreview key="cc" onBack={closeOverlays} />}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;