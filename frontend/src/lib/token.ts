import { ethers } from "ethers";
import { getProvider } from "./test/rpcBackend";

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
];

export async function getEthBalance(aaAddress: string) {
  const provider = await getProvider();
  const balanceWei = await provider.getBalance(aaAddress);
  const balanceEth = ethers.utils.formatEther(balanceWei);

  return Number(balanceEth);
}

export async function getTokenBalance(
  tokenAddress: string,
  aaAddress: string
): Promise<number> {
  const provider = await getProvider();
  const token = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
  const [balance, decimals] = await Promise.all([
    token.balanceOf(aaAddress),
    token.decimals(),
  ]);

  return Number(ethers.utils.formatUnits(balance, decimals));
}

export async function getTokenInfo(tokenAddress: string) {
  const provider = await getProvider();
  const token = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
  const [name, symbol, decimals] = await Promise.all([
    token.name(),
    token.symbol(),
    token.decimals(),
  ]);

  return { name, symbol, decimals };
}
