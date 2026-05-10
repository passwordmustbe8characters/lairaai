import React, { useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Bell, Search } from 'lucide-react';

// Required for the wallet button to look correct
import '@solana/wallet-adapter-react-ui/styles.css';

const Header: React.FC = () => {
  const { connection } = useConnection(); //
  const { publicKey } = useWallet(); //
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!publicKey) {
      setBalance(null);
      return;
    }

    const updateBalance = async () => {
      try {
        const lamports = await connection.getBalance(publicKey); //
        setBalance(lamports / LAMPORTS_PER_SOL);
      } catch (e) {
        console.error("Failed to fetch balance:", e);
      }
    };

    updateBalance();
    const id = connection.onAccountChange(publicKey, () => updateBalance());
    return () => { connection.removeAccountChangeListener(id); };
  }, [publicKey, connection]);

 return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl">
          <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-white">L</div>
          <span>Laira</span>
        </div>

        {/* This section uses the Search and Bell icons to clear the error */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center relative mr-2">
            <Search className="absolute left-2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-8 h-9 w-40 rounded-md border border-input bg-transparent text-sm"
            />
          </div>

          <button className="p-2 hover:bg-accent rounded-full relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {publicKey && (
            <div className="text-right mr-2">
              <p className="text-[10px] uppercase text-muted-foreground">Testnet</p>
              <p className="text-sm font-bold">{balance !== null ? `${balance.toFixed(2)} SOL` : '...'}</p>
            </div>
          )}
          <WalletMultiButton className="!bg-primary !h-9 !text-sm" />
        </div>
      </div>
    </header>
  );
};

export default Header;