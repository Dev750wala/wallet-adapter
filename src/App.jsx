import React, { FC, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
// import { clusterApiUrl } from "@solana/web3.js";
import Airdrop from "./components/Airdrop";
import "@solana/wallet-adapter-react-ui/styles.css";

import "./App.css";

function App() {
  

  return (
    <ConnectionProvider
      endpoint={
        "https://prettiest-icy-layer.solana-devnet.quiknode.pro/0d0a73e8459ace627eb37dc1f3933e97c034cf67"
      }
    >
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton style={{ margin: "10px" }} />
          <WalletDisconnectButton style={{ margin: "10px" }} />
          {/* Your app's components go here, nested within the context providers. */}

          <Airdrop />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
