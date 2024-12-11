import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import React from "react";

export function SignMessage() {
  const [message, setMessage] = React.useState("");

  const { publicKey, signMessage } = useWallet();

  async function onClick() {
    if (!publicKey) alert("Wallet not connected");
    if (!signMessage) alert("Wallet does not support message signing");

    const encodedMessage = new TextEncoder().encode(message);
    const signature = await signMessage(encodedMessage);

    if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
      alert("Invalid signature");
    }
    alert("Signature valid", "Messgae signed", bs58.encode(signature));
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Message"
        onChange={(e) => setMessage(e.target.value)}
        style={{
          padding: "12px",
          borderRadius: "20px",
          border: "1px solid black",
          margin: "20px",
        }}
      />
      <button
        onClick={onClick}
        style={{
          borderRadius: "20px",
          border: "1px solid black",
        }}
      >
        Sign Message
      </button>
    </div>
  );
}
