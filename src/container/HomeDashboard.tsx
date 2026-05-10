import React from "react";

interface HomeDashboardProps {
  profile: string;
  balance: number | null; 
  onTalkToLaira: () => void;
}

const HomeDashboard: React.FC<HomeDashboardProps> = ({ profile, balance, onTalkToLaira }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {profile}</h1>
        <p className="text-muted-foreground">Your Testnet portfolio is live and synced.</p>
      </div>

      <div className="bg-[#f2a2b1] p-8 rounded-3xl text-black relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest opacity-70">Testnet Balance</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-bold">
              {balance !== null ? balance.toFixed(2) : "0.00"}
            </span>
            <span className="text-2xl font-medium opacity-70">SOL</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* FIXED: Wired up the onTalkToLaira prop to your trigger button */}
        <button 
          onClick={onTalkToLaira}
          className="w-full p-4 bg-black/10 hover:bg-black/20 transition-colors rounded-2xl border border-black/5 flex items-center justify-center gap-2 font-semibold"
        >
          Analyze with Laira AI
        </button>
      </div>
    </div>
  );
};

export default HomeDashboard;