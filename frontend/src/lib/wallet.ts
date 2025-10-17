import { ethers } from "ethers";
import { getSalt } from "./test/rpcBackend";

export function generateWalletKey(username: string, password: string, salt: string) {
  const hash = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(username + password + salt)
  );
  return hash;
}

export async function createEOAWallet(username: string, password: string) {
  const salt = await getSalt();
  const privateKey = generateWalletKey(username, password, salt);
  const eoaWallet = new ethers.Wallet(privateKey);
  return eoaWallet;
}
