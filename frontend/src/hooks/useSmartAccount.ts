import { useCallback, useState } from "react";
import { ethers } from "ethers";
import { getProvider, getDevSigner } from "../utils/rpc";
import { SimpleAccountAPI } from "@account-abstraction/sdk";

type UseSmartAccountState = {
  initialized: boolean;
  address?: string;
  balance?: string;
  walletAPI?: SimpleAccountAPI;
  error?: string;
  init: () => Promise<void>;
  refreshBalance: () => Promise<void>;
};

export const useSmartAccount = (): UseSmartAccountState => {
  const [initialized, setInitialized] = useState(false);
  const [address, setAddress] = useState<string>();
  const [balance, setBalance] = useState<string>();
  const [walletAPI, setWalletAPI] = useState<SimpleAccountAPI>();
  const [error, setError] = useState<string>();

  const init = useCallback(async () => {
    try {
      setError(undefined);

      const res = await fetch("http://localhost:5000/api/get-env");
      if (!res.ok) throw new Error("Failed to fetch env from backend");
      const envData = await res.json();

      const entryPointAddress = envData.entry_point;
      if (!entryPointAddress) throw new Error("Entry point address not provided by backend");

      const provider = await getProvider();
      const owner = await getDevSigner();

      const account = new SimpleAccountAPI({
        provider,
        owner,
        entryPointAddress,
      });

      await account.init();
      const addr = await account.getAccountAddress();

      setWalletAPI(account);
      setAddress(addr);
      setInitialized(true);

      const bal = await provider.getBalance(addr);
      setBalance(ethers.utils.formatEther(bal));
    } catch (e: any) {
      console.error("SmartAccount init error", e);
      setError(e.message || String(e));
    }
  }, []);

  const refreshBalance = useCallback(async () => {
    try {
      if (!address) return;
      const provider = await getProvider();
      const bal = await provider.getBalance(address);
      setBalance(ethers.utils.formatEther(bal));
    } catch (e: any) {
      console.error("refreshBalance error", e);
      setError(e.message || String(e));
    }
  }, [address]);

  return { initialized, address, balance, walletAPI, error, init, refreshBalance };
};
