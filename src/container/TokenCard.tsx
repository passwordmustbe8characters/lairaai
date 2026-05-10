import React from 'react';
import type { Token } from '@/lib/mockData';

interface TokenCardProps {
  token: Token;
}

const TokenCard: React.FC<TokenCardProps> = ({ token }) => {
  const isPositive = token.change24h >= 0;

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-base laira-glass border border-border/30">
          {token.icon}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{token.symbol}</p>
          <p className="text-xs text-muted-foreground">{token.name}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-foreground">
          ${token.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
        <p className={`text-xs font-medium ${isPositive ? 'text-laira-profit' : 'text-laira-loss'}`}>
          {isPositive ? '+' : ''}{token.change24h}%
        </p>
      </div>
    </div>
  );
};

export default TokenCard;