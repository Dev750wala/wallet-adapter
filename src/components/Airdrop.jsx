import React from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

const Airdrop = () => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const requestAirdrop = async () => {
    if (!wallet.connected || !wallet.publicKey) {
      alert("Please connect your wallet.");
      return;
    }

    const amountInput = document.getElementById("amount").value;

    // Validate input
    const amount = parseFloat(amountInput);
    // if (isNaN(amount) || amount <= 0) {
    //   alert("Enter a valid positive amount greater than 0.");
    //   return;
    // }

    // Convert SOL to lamports (1 SOL = 1e9 lamports)
    const lamports = Math.round(amount * 1e9);
    const balance = await connection.getBalance(wallet.publicKey);
    console.log(`Wallet balance: ${balance / 1e9} SOL`);

    try {
      const signature = await connection.requestAirdrop(
        wallet.publicKey,
        lamports
      );
      await connection.confirmTransaction({
        signature,
        commitment: "finalized", // Ensure the transaction is fully finalized
      });
      alert(
        `Successfully airdropped ${amount} SOL to ${wallet.publicKey.toBase58()}`
      );
    } catch (error) {
      console.error("Airdrop request failed:", error);
      alert("Airdrop request failed. Check the console for details.");
    }
  };

  return (
    <div>
      <input
        type="text"
        name="amount"
        placeholder="Enter amount"
        id="amount"
        style={{
          padding: "12px",
          borderRadius: "20px",
          border: "1px solid black",
          margin: "20px",
        }}
        required
      />
      <button
        type="submit"
        style={{
          borderRadius: "20px",
          border: "1px solid black",
        }}
        onClick={requestAirdrop}
      >
        Send airdrop
      </button>
    </div>
  );
};

export default Airdrop;
