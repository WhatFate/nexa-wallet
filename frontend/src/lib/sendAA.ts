import { ethers } from "ethers";
import { getProvider } from "./test/rpcBackend";
import NexaAccount from "@/abi/NexaAccount.json";

export async function sendERC20(
  target: string,
  amount: string,
  tokenAddress: string
) {
  const privateKey = localStorage.getItem("eoaPrivateKey");
  const aaAddress = localStorage.getItem("aaAddress");
  if (!privateKey) throw new Error("Private key not found in localStorage");
  if (!aaAddress)
    throw new Error("Account Abstraction address not found in localStorage");
  const ERC20_ABI = [
    "function decimals() view returns (uint8)",
    "function name() view returns (string)",
    "function symbol() view returns (string)",
  ];

  const provider = await getProvider();
  const signer = new ethers.Wallet(privateKey, provider);

  const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
  const nexaContract = new ethers.Contract(aaAddress, NexaAccount.abi, signer);

  const decimals = await Promise.all([tokenContract.decimals()]);
  const value = ethers.utils.parseUnits(amount, decimals);

  const tx = await nexaContract.transferERC20(target, value, tokenAddress);
  console.log("Tx sent:", tx.hash);

  const receipt = await tx.wait();
  console.log("Tx confirmed:", receipt.transactionHash);

  return receipt.transactionHash;
}
