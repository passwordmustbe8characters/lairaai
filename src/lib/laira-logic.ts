export const generateAnalysis = (balance: number | null) => {
  if (balance === null || balance === 0) {
    return "Your portfolio is currently empty. Consider airdropping some Testnet SOL to begin exploring the ecosystem.";
  }
  
  if (balance > 0 && balance < 10) {
    return `Analysis complete: You have a healthy starter balance of ${balance.toFixed(2)} SOL. I recommend exploring staking options to earn passive yield while the market is stable.`;
  }
  
  return `Strong portfolio detected with ${balance.toFixed(2)} SOL. Current suggestion: Diversify into liquid staking protocols to maximize your capital efficiency.`;
};