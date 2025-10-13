import { ethers } from "ethers";

let cachedConfig: { rpc_url: string; private_key: string } | null = null;

async function fetchBackendConfig() {
  if (cachedConfig) return cachedConfig;

  const response = await fetch("http://127.0.0.1:5000/api/get-env");
  if (!response.ok) {
    throw new Error("Failed to fetch backend config");
  }

  const data = await response.json();
  if (!data.rpc_url || !data.private_key) {
    throw new Error("Invalid backend config response");
  }

  cachedConfig = data;
  return data;
}

export const getProvider = async () => {
  const { rpc_url } = await fetchBackendConfig();
  return new ethers.providers.JsonRpcProvider(rpc_url);
};

export const getDevSigner = async () => {
  const { private_key } = await fetchBackendConfig();
  const provider = await getProvider();
  return new ethers.Wallet(private_key, provider);
};
