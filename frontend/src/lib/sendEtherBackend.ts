import { getProvider } from "./test/rpcBackend";

export async function sendEtherBackend(to: string) {
  const provider = await getProvider();

  const response = await fetch(
    "http://localhost:8001/flask/api/pay-transaction",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to }),
    }
  );

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Backend transaction failed");

  const txHash = data.txHash;
  if (!txHash) throw new Error("Backend did not return txHash");

  const receipt = await provider.waitForTransaction(txHash);

  if (receipt.status !== 1)
    throw new Error("Funding transaction failed on-chain");

  return txHash;
}
