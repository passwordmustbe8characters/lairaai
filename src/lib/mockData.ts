export interface Token {
  symbol: string;
  name: string;
  balance: number;
  value: number;
  change24h: number;
  icon: string;
}

export interface Insight {
  id: string;
  type: 'calm' | 'caution' | 'positive';
  message: string;
  icon: string;
}

export const tokens: Token[] = [
  { symbol: 'SOL', name: 'Solana', balance: 24.5, value: 3842.15, change24h: 2.4, icon: '◎' },
  { symbol: 'USDC', name: 'USD Coin', balance: 1250.0, value: 1250.0, change24h: 0.01, icon: '$' },
  { symbol: 'JUP', name: 'Jupiter', balance: 580, value: 412.8, change24h: -1.2, icon: '♃' },
  { symbol: 'RAY', name: 'Raydium', balance: 120, value: 198.0, change24h: 3.8, icon: '◈' },
];

export const totalBalance = 5702.95;
export const totalChange = 1.8;

export const insights: Insight[] = [
  {
    id: '1',
    type: 'calm',
    message: 'Your portfolio appears relatively stable today. No major changes detected.',
    icon: '🌿',
  },
  {
    id: '2',
    type: 'caution',
    message: 'You may be slightly overexposed to volatility. Consider diversifying.',
    icon: '🫧',
  },
  {
    id: '3',
    type: 'positive',
    message: 'Your patience is paying off. SOL has grown steadily this week.',
    icon: '✨',
  },
];

export const personalityProfiles = {
  'calm-builder': {
    title: 'Calm Builder',
    description: 'You approach crypto with patience and a long-term mindset. You value steady growth over quick wins.',
    emoji: '🌱',
  },
  'careful-investor': {
    title: 'Careful Investor',
    description: 'You research thoroughly before making moves. Safety and stability guide your decisions.',
    emoji: '🛡️',
  },
  'emotional-trader': {
    title: 'Emotional Trader',
    description: 'Market swings affect your decisions. Laira will help you develop calmer trading habits.',
    emoji: '🌊',
  },
  'risk-explorer': {
    title: 'Risk Explorer',
    description: 'You embrace volatility and seek growth opportunities. Laira will help balance your enthusiasm.',
    emoji: '🚀',
  },
};

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export const suggestedPrompts = [
  'How risky is my portfolio?',
  "I'm scared the market will crash.",
  'Should I buy more SOL?',
  'How do I safely enter Solana?',
];

export const aiResponses: Record<string, string> = {
  'How risky is my portfolio?':
    "Based on your current holdings, your portfolio carries moderate risk. About 67% is in SOL which ties you to Solana's market movements. Your USDC position provides a nice safety buffer though. I'd suggest keeping at least 20-25% in stablecoins to help you sleep better at night. Remember -- it's not about eliminating risk, it's about finding a level you're comfortable with.",
  "I'm scared the market will crash.":
    "That feeling is completely valid, and it's actually a sign of healthy awareness. Fear in crypto markets is normal -- even experienced investors feel it. Here's what might help: look at your portfolio and ask yourself, 'If the market dropped 30% tomorrow, would I still be okay financially?' If the answer is no, consider reducing your exposure to a level where you can weather storms calmly. Your emotional wellbeing matters more than any trade.",
  'Should I buy more SOL?':
    "That depends on your goals and current exposure. Right now SOL makes up about 67% of your portfolio, which is already significant. Before buying more, consider: Are you comfortable with that concentration? Do you have enough stablecoins as a safety net? There's no rush -- Solana isn't going anywhere. A calm, measured approach usually outperforms impulsive decisions. Maybe consider setting a small recurring buy instead of a large one-time purchase.",
  'How do I safely enter Solana?':
    "Great question! The safest way to enter Solana is step by step. If you have ETH or USDC on another chain, you can bridge them over using trusted tools like Wormhole or LI.FI. Start small -- maybe move 10-20% of what you plan to invest, see how it feels, then gradually increase. I can show you a simple cross-chain preview to help visualize the process. Would you like me to walk you through it?",
};

export const defaultAiResponse =
  "That's a thoughtful question. Let me think about this with your financial personality in mind. Generally, the best approach in crypto is one that lets you sleep peacefully at night. If something about your portfolio is causing you stress, that's a signal worth listening to. Would you like to explore this further together?";

export const weeklyReflection = {
  title: 'Weekly Reflection',
  date: 'May 3 - May 9, 2026',
  transcript:
    "This week your portfolio remained relatively stable despite some market volatility. Your SOL holdings gained 2.4%, while Jupiter saw a slight pullback of 1.2%. Your overall behavior patterns suggest cautious, measured decision-making -- which aligns well with your financial personality. One thing I noticed: you checked your portfolio less frequently this week, which is actually a positive sign of growing confidence. Keep trusting your process. Remember, the best investors are often the most patient ones.",
  highlights: [
    { label: 'Portfolio Change', value: '+1.8%', type: 'positive' as const },
    { label: 'Best Performer', value: 'RAY +3.8%', type: 'positive' as const },
    { label: 'Emotional Score', value: 'Calm', type: 'neutral' as const },
    { label: 'Risk Level', value: 'Moderate', type: 'neutral' as const },
  ],
};