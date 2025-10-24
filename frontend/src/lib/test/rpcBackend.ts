import { ethers } from "ethers";

interface DevConfig {
  account_factory: string;
  entry_point: string;
  swap_router: string;
  api_key: string;
  private_key: string;
  rpc_url: string;
  salt: string;
}

let cachedConfig: DevConfig | null = null;

const BACKEND_URL = "http://localhost:8001/flask/api/get-env";

async function fetchBackendConfig(): Promise<DevConfig> {
  if (cachedConfig) return cachedConfig;

  try {
    const res = await fetch(BACKEND_URL);
    if (!res.ok) throw new Error(`Backend returned ${res.status}`);

    const data = await res.json();

    const requiredKeys: (keyof DevConfig)[] = [
      "account_factory",
      "entry_point",
      "swap_router",
      "api_key",
      "private_key",
      "rpc_url",
      "salt",
    ];

    for (const key of requiredKeys) {
      if (!data[key]) throw new Error(`Missing key in backend config: ${key}`);
    }

    cachedConfig = data;
    return data;
  } catch (err) {
    console.error("Failed to fetch backend config:", err);
    throw err;
  }
}

const getConfigValue = async <K extends keyof DevConfig>(
  key: K
): Promise<DevConfig[K]> => {
  const config = await fetchBackendConfig();
  return config[key];
};

export const getProvider = async () =>
  new ethers.providers.JsonRpcProvider(await getConfigValue("rpc_url"));

export const getRpcUrl = () => getConfigValue("rpc_url");
export const getApiKey = () => getConfigValue("api_key");
export const getPrivateKey = () => getConfigValue("private_key");
export const getEntryPoint = () => getConfigValue("entry_point");
export const getSwapRouter = () => getConfigValue("swap_router");
export const getFactoryAddress = () => getConfigValue("account_factory");
export const getSalt = () => getConfigValue("salt");

export const getDevSigner = async () => {
  const provider = await getProvider();
  const privateKey = await getConfigValue("private_key");
  return new ethers.Wallet(privateKey, provider);
};
