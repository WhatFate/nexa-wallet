import { useState, useEffect } from "react";
import { getEthBalance, getTokenBalance } from "@/lib/token";

export function useBalances(aaAddress: string | undefined) {
  const [balances, setBalances] = useState<{
    eth: number;
    usdc: number;
    weth: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const USDC_ADDRESS = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
  const WETH_ADDRESS = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14";

  const fetchAllBalances = async () => {
    if (!aaAddress) return;
    try {
      setLoading(true);
      const [eth, usdc, weth] = await Promise.all([
        getEthBalance(aaAddress),
        getTokenBalance(USDC_ADDRESS, aaAddress),
        getTokenBalance(WETH_ADDRESS, aaAddress),
      ]);
      setBalances({ eth, usdc, weth });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBalances();
  }, [aaAddress]);

  return { balances, loading, fetchAllBalances };
}
