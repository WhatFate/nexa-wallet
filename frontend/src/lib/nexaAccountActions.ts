import { ethers } from "ethers";
import { getProvider } from "./test/rpcBackend";
import NEXA_ACCOUNT_ABI from "@/abi/NexaAccountAbi.json";
import ERC20_ABI from "@/abi/ERC20Abi.json";
import { sendEtherBackend } from "./sendEtherBackend";

export async function sendERC20(
  target: string,
  amount: string,
  tokenAddress: string
) {
  const { aaAddress, signer, eoaAddress } = await getDependencies();

  const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
  const nexaContract = new ethers.Contract(aaAddress, NEXA_ACCOUNT_ABI, signer);

  const decimals = await tokenContract.decimals();
  const parsedAmount = ethers.utils.parseUnits(amount, decimals);
  await sendEtherBackend(eoaAddress);
  const tx = await nexaContract.transferERC20(
    target,
    parsedAmount,
    tokenAddress
  );
  const receipt = await tx.wait();

  return receipt.transactionHash;
}

export async function sendEther(target: string, amount: string) {
  const { aaAddress, signer, eoaAddress } = await getDependencies();

  const nexaContract = new ethers.Contract(aaAddress, NEXA_ACCOUNT_ABI, signer);
  const parsedAmount = ethers.utils.parseUnits(amount, 18);
  const data = "0x";
  await sendEtherBackend(eoaAddress);
  const tx = await nexaContract.transferEtherWithCall(
    target,
    parsedAmount,
    data
  );
  const receipt = await tx.wait();

  return receipt.transactionHash;
}

export async function swap(
  tokenIn: string | null,
  tokenOut: string,
  amountIn: string
) {
  const { aaAddress, signer, eoaAddress } = await getDependencies();
  if (
    tokenOut === "0x0000000000000000000000000000000000000000" &&
    tokenIn === "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14"
  ) {
    await unwrapEth(amountIn);
    return;
  }
  const nexaContract = new ethers.Contract(aaAddress, NEXA_ACCOUNT_ABI, signer);
  const fee = 100;

  if (!tokenIn) {
    await swapEthToWeth(amountIn);
    const WETH_ADDRESS = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14";
    tokenIn = WETH_ADDRESS;
  }

  const tokenContract = new ethers.Contract(tokenIn, ERC20_ABI, signer);
  const decimalsIn = await tokenContract.decimals();
  const parsedAmountIn = ethers.utils.parseUnits(amountIn, decimalsIn);
  await sendEtherBackend(eoaAddress);
  if (tokenOut === "0x0000000000000000000000000000000000000000") {
    tokenOut = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14";
    const balanceBefore: ethers.BigNumber = await tokenContract.balanceOf(
      aaAddress
    );
    console.log("balanceBefore", balanceBefore);
    const txSwap = await nexaContract.swap(
      tokenIn,
      tokenOut,
      parsedAmountIn,
      fee
    );
    const receipt = await txSwap.wait();

    const balanceAfter: ethers.BigNumber = await tokenContract.balanceOf(
      aaAddress
    );
    console.log("balanceAfter", balanceAfter);
    const amountWeth: string = balanceBefore
      .sub(balanceAfter)
      .mul(1000000000)
      .toString();

    console.log("amountWeth", amountWeth);
    await unwrapEth(amountWeth);

    return receipt.transactionHash;
  }

  const txSwap = await nexaContract.swap(
    tokenIn,
    tokenOut,
    parsedAmountIn,
    fee
  );
  const receipt = await txSwap.wait();

  return receipt.transactionHash;
}

export async function swapEthToWeth(amount: string) {
  const { aaAddress, signer, eoaAddress } = await getDependencies();
  const WETH_ADDRESS = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14";
  const WETH_ABI = ["function deposit() public payable"];
  const wethInterface = new ethers.utils.Interface(WETH_ABI);

  const value = ethers.utils.parseUnits(amount, 18);
  const dataSend = wethInterface.encodeFunctionData("deposit");

  await sendEtherBackend(eoaAddress);
  const nexaContract = new ethers.Contract(aaAddress, NEXA_ACCOUNT_ABI, signer);
  const tx = await nexaContract.transferEtherWithCall(
    WETH_ADDRESS,
    value,
    dataSend
  );
  await tx.wait();
}

async function unwrapEth(amount: string) {
  const { aaAddress, signer, eoaAddress } = await getDependencies();
  const WETH_ADDRESS = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14";
  const WETH_ABI = ["function withdraw(uint wad) public"];
  const wethInterface = new ethers.utils.Interface(WETH_ABI);

  const dataSend = wethInterface.encodeFunctionData("withdraw", [amount]);

  await sendEtherBackend(eoaAddress);
  const nexaContract = new ethers.Contract(aaAddress, NEXA_ACCOUNT_ABI, signer);
  const tx = await nexaContract.transferEtherWithCall(
    WETH_ADDRESS,
    0,
    dataSend
  );
  await tx.wait();
}

async function getDependencies() {
  const privateKey = localStorage.getItem("eoaPrivateKey");
  const eoaAddress = localStorage.getItem("eoaAddress");
  const aaAddress = localStorage.getItem("aaAddress");

  if (!privateKey) throw new Error("Private key not found in localStorage");
  if (!aaAddress)
    throw new Error("Account Abstraction address not found in localStorage");
  if (!eoaAddress) throw new Error("EOA Address not found in localStorage");

  const provider = await getProvider();
  const signer = new ethers.Wallet(privateKey, provider);
  return { aaAddress, signer, eoaAddress, provider };
}
