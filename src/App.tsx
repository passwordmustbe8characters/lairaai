
import { WalletContextProvider } from "./components/WalletContextProvider";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <WalletContextProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
          </Routes>
        </TooltipProvider>
    </WalletContextProvider>
  </QueryClientProvider>
);

<WalletMultiButton className="!bg-[#7C3AED] hover:!bg-[#6D28D9] !transition-colors" />

export default App;