import NEXA_FACTORY_ABI from "../abi/NexaAccountFactoryAbi.json";
import { ethers } from "ethers";
import { getDevSigner } from "./test/rpcBackend";
import { getFactoryAddress } from "./test/rpcBackend";

export async function deployAccountAbstraction(
  ownerAddress: string,
  entryPointAddress: string
) {
  const FACTORY_ADDRESS = await getFactoryAddress();
  const signer = await getDevSigner();
  const factory = new ethers.Contract(
    FACTORY_ADDRESS,
    NEXA_FACTORY_ABI,
    signer
  );
  const tx = await factory.createAccount(entryPointAddress, ownerAddress);

  const receipt = await tx.wait();

  const event = receipt.events.find((e: any) => e.event === "AccountCreated");
  const aaAddress = event.args.account;

  return { txHash: receipt.transactionHash, aaAddress };
}
