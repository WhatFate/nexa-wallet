import { ethers } from "ethers";

export const getProvider = () => {
  const url = import.meta.env.VITE_RPC_URL!;
  if (!url) throw new Error("VITE_RPC_URL not set");
  return new ethers.providers.JsonRpcProvider(url);
};

export const getDevSigner = () => {
  const key = import.meta.env.VITE_PRIVATE_KEY!;
  if (!key) throw new Error("VITE_PRIVATE_KEY not set");
  const provider = getProvider();
  return new ethers.Wallet(key, provider);
};
