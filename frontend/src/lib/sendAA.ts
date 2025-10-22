import { ethers } from "ethers";
import { getProvider } from "./test/rpcBackend";
import NexaAccount from "@/abi/NexaAccount.json";

export async function sendERC20(
  target: string,
  amount: string,
  tokenAddress: string
) {
  const { aaAddress, signer } = await getDependencies();
  const ERC20_ABI = [
    "function decimals() view returns (uint8)",
    "function name() view returns (string)",
    "function symbol() view returns (string)",
  ];

  const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
  const nexaContract = new ethers.Contract(aaAddress, NexaAccount.abi, signer);

  const decimals = await Promise.all([tokenContract.decimals()]);
  const value = ethers.utils.parseUnits(amount, decimals);

  const tx = await nexaContract.transferERC20(target, value, tokenAddress);
  const receipt = await tx.wait();

  return receipt.transactionHash;
}

export async function sendEther(target: string, amount: string) {
  const { aaAddress, signer } = await getDependencies();

  const nexaContract = new ethers.Contract(aaAddress, NexaAccount.abi, signer);

  const decimals = 18;
  const value = ethers.utils.parseUnits(amount, decimals);
  const data = "0x";

  const tx = await nexaContract.transferEtherWithCall(target, value, data);
  const receipt = await tx.wait();

  return receipt.transactionHash;
}

async function getDependencies() {
  const privateKey = localStorage.getItem("eoaPrivateKey");
  const eoaAddress = localStorage.getItem("eoaAddress");
  console.log("EOA Address:", eoaAddress);
  const aaAddress = localStorage.getItem("aaAddress");
  if (!privateKey) throw new Error("Private key not found in localStorage");
  if (!aaAddress)
    throw new Error("Account Abstraction address not found in localStorage");

  const provider = await getProvider();
  const signer = new ethers.Wallet(privateKey, provider);
  return { aaAddress, signer };
}
