import { ethers } from "ethers";
import { getProvider } from "./test/rpcBackend";
import NEXA_ACCOUNT_ABI from "@/abi/NexaAccountAbi.json";
import ERC20_ABI from "@/abi/ERC20Abi.json";

export async function sendERC20(
  target: string,
  amount: string,
  tokenAddress: string
) {
  const { aaAddress, signer } = await getDependencies();

  const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
  const nexaContract = new ethers.Contract(aaAddress, NEXA_ACCOUNT_ABI, signer);

  const decimals = await tokenContract.decimals();
  const value = ethers.utils.parseUnits(amount, decimals);

  const tx = await nexaContract.transferERC20(target, value, tokenAddress);
  const receipt = await tx.wait();

  return receipt.transactionHash;
}

export async function sendEther(target: string, amount: string) {
  const { aaAddress, signer } = await getDependencies();

  const nexaContract = new ethers.Contract(aaAddress, NEXA_ACCOUNT_ABI, signer);

  const decimals = 18;
  const value = ethers.utils.parseUnits(amount, decimals);
  const data = "0x";

  const tx = await nexaContract.transferEtherWithCall(target, value, data);
  const receipt = await tx.wait();

  return receipt.transactionHash;
}

export async function swap(
  tokenIn: string,
  tokenOut: string,
  amountIn: string
) {
  const { aaAddress, signer } = await getDependencies();
  const UNISWAP_FACTORY_ADDRESS = "0x0227628f3F023bb0B980b67D528571c95c6DaC1c";
  const fee = 100;

  const UNISWAP_FACTORY_ABI = [
    "function getPool(address tokenA, address tokenB, uint24 fee) external view returns (address)",
  ];

  const uniswapFactoryInterface = new ethers.utils.Interface(
    UNISWAP_FACTORY_ABI
  );

  const poolAddress = await signer.call({
    to: UNISWAP_FACTORY_ADDRESS,
    data: uniswapFactoryInterface.encodeFunctionData("getPool", [
      tokenIn,
      tokenOut,
      fee,
    ]),
  });

  const [decodedPool] = uniswapFactoryInterface.decodeFunctionResult(
    "getPool",
    poolAddress
  );

  return decodedPool;
}

export async function swapEthToWeth(amount: string) {
  const { aaAddress, signer } = await getDependencies();
  const WETH_ADDRESS = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14";
  const WETH_ABI = [
    "function deposit() public payable",
    "function withdraw(uint wad) public",
  ];
  const wethInterface = new ethers.utils.Interface(WETH_ABI);
  const nexaContract = new ethers.Contract(aaAddress, NEXA_ACCOUNT_ABI, signer);

  const decimals = 18;
  const value = ethers.utils.parseUnits(amount, decimals);
  const dataSend = wethInterface.encodeFunctionData("deposit");

  const txFirst = await nexaContract.transferEtherWithCall(
    WETH_ADDRESS,
    value,
    dataSend
  );
  await txFirst.wait();

  const dataWithdraw = wethInterface.encodeFunctionData("withdraw", [value]);
  const txSecond = await nexaContract.transferEtherWithCall(
    WETH_ADDRESS,
    "0",
    dataWithdraw
  );

  await txSecond.wait();
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
