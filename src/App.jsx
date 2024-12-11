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
import { SignMessage } from "./components/SignMessage";
import SendSol from "./components/SendSol";

function App() {
  return (
    <ConnectionProvider
      endpoint={
        "https://prettiest-icy-layer.solana-devnet.quiknode.pro/0d0a73e8459ace627eb37dc1f3933e97c034cf67"
      }
    >
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <WalletMultiButton style={{ margin: "10px", borderRadius: "25px" }} />
            <WalletDisconnectButton style={{ margin: "10px", borderRadius: "25px" }} />
          </div>
          {/* Your app's components go here, nested within the context providers. */}

          <Airdrop /><br /><br /><br />
          <SignMessage /><br /><br /><br />
          <SendSol />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
