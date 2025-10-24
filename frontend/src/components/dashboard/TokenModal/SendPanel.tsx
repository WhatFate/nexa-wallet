import { useState } from "react";
import { sendERC20, sendEther } from "@/lib/nexaAccountActions";
import { validateAddress, validateAmount } from "@/lib/validations";

export default function SendPanel({ tokenAddress, balance, symbol, onBack }) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const handleSend = async () => {
    if (!tokenAddress) await sendEther(recipient, amount);
    else await sendERC20(recipient, amount, tokenAddress);
    onBack();
  };

  const isValid = validateAddress(recipient) && validateAmount(amount, balance);

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-2">Send {symbol}</h2>

      <input
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="0x..."
      />
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="0.0"
      />

      <div className="flex gap-4 mt-4">
        <button onClick={onBack}>Back</button>
        <button onClick={handleSend} disabled={!isValid}>
          Confirm Send
        </button>
      </div>
    </>
  );
}
