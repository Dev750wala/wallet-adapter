import { Buffer } from "buffer";
if (!window.Buffer) {
  window.Buffer = Buffer;
}

import React, { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

const SendSol = () => {
  const [recipentAddr, setRecipentAddr] = useState("");
  const [amount, setAmount] = useState(0);

  const { connection } = useConnection();
  const wallet = useWallet();

  async function sendToken() {
    try {
      const transaction = new Transaction();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(recipentAddr),
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      await wallet.sendTransaction(transaction, connection);
      alert("Sent " + amount + " SOL to " + recipentAddr);
      setRecipentAddr("");
      setAmount(0)
    } catch (error) {
      alert("Unexpected error occurred: " + error);
    }
  }

  if (!wallet.connected || !wallet.publicKey) {
    return <div>Connect to your wallet first to send the SOL.</div>;
  }

  return (
    <div>
      <input
        type="text"
        name="address"
        id="address"
        onChange={(e) => setRecipentAddr(e.target.value)}
        placeholder="Recipent address"
        style={{
          padding: "12px",
          borderRadius: "20px",
          border: "1px solid black",
          margin: "20px",
          //   width: "25em"
        }}
      />
      <input
        type="number"
        name="amount"
        id="amount"
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        style={{
          padding: "12px",
          borderRadius: "20px",
          border: "1px solid black",
          margin: "20px",
        }}
      />
      <button
        onClick={sendToken}
        style={{
          borderRadius: "20px",
          border: "1px solid black",
        }}
      >
        Send
      </button>
    </div>
  );
};

export default SendSol;
