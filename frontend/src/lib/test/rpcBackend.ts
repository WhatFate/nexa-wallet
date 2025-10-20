import { ethers } from "ethers";

interface DevConfig {
  account_factory: string;
  entry_point: string;
  private_key: string;
  rpc_url: string;
  salt: string;
}

let cachedConfig: DevConfig | null = null;

async function fetchBackendConfig() {
  if (cachedConfig) return cachedConfig;

  try {
    const response = await fetch("http://127.0.0.1:5000/api/get-env");
    if (!response.ok) throw new Error("Failed to fetch backend config");

    const data = await response.json();
    if (
      !data.account_factory ||
      !data.api_key ||
      !data.entry_point ||
      !data.private_key ||
      !data.rpc_url ||
      !data.salt
    )
      throw new Error("Invalid backend config response");

    cachedConfig = data;
    return data;
  } catch (err) {
    console.error("Backend config fetch failed:", err);
    throw err;
  }
}

export const getProvider = async () => {
  const { rpc_url } = await fetchBackendConfig();
  return new ethers.providers.JsonRpcProvider(rpc_url);
};

export const getRpcUrl = async () => {
  const { rpc_url } = await fetchBackendConfig();
  return rpc_url;
};

export const getApiKey = async () => {
  const { api_key } = await fetchBackendConfig();
  return api_key;
};

export const getDevSigner = async () => {
  const { private_key } = await fetchBackendConfig();
  const provider = await getProvider();
  return new ethers.Wallet(private_key, provider);
};

export const getPrivateKey = async () => {
  const { private_key } = await fetchBackendConfig();
  return private_key;
};

export const getEntryPoint = async () => {
  const { entry_point } = await fetchBackendConfig();
  return entry_point;
};

export const getFactoryAddress = async () => {
  const { account_factory } = await fetchBackendConfig();
  return account_factory;
};

export const getSalt = async () => {
  const { salt } = await fetchBackendConfig();
  return salt;
};
