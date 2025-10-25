import { BigNumber, ethers } from "ethers";
import { getProvider } from "./test/rpcBackend";
import NEXA_ACCOUNT_ABI from "@/abi/NexaAccountAbi.json";
import ERC20_ABI from "@/abi/ERC20Abi.json";

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

  await sendEtherBackend(eoaAddress, parsedAmount);

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

  const decimals = 18;
  const parsedAmount = ethers.utils.parseUnits(amount, decimals);
  const data = "0x";

  await sendEtherBackend(eoaAddress, parsedAmount);

  const tx = await nexaContract.transferEtherWithCall(
    target,
    parsedAmount,
    data
  );
  const receipt = await tx.wait();

  return receipt.transactionHash;
}

export async function swap(
  tokenIn: string,
  tokenOut: string,
  amountIn: string
) {
  const { aaAddress, signer, eoaAddress } = await getDependencies();
  const nexaContract = new ethers.Contract(aaAddress, NEXA_ACCOUNT_ABI, signer);
  const ETH_ADDRESS = "0x0000000000000000000000000000000000000000";
  const WETH_ADDRESS = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14";
  const fee = 100;
  if (!tokenIn && tokenOut === WETH_ADDRESS) {
    console.log("Swapping ETH → WETH");
    await swapEthToWeth(amountIn);
    return;
  }

  // if (tokenOut === ETH_ADDRESS) {
  //   if (!tokenIn) throw new Error("tokenIn required for ERC20 → ETH");
  //   const tokenContract = new ethers.Contract(tokenIn, ERC20_ABI, signer);
  //   const decimals = await tokenContract.decimals();
  //   const parsedAmountIn = ethers.utils.parseUnits(amountIn, decimals);

  //   await sendEtherBackend(eoaAddress, parsedAmountIn);

  //   const amountOut = await nexaContract.callStatic.swap(
  //     tokenIn,
  //     WETH_ADDRESS,
  //     parsedAmountIn,
  //     fee
  //   );

  //   await unwrapWeth(amountOut);
  //   return;
  // }

  // if (tokenIn === WETH_ADDRESS && tokenOut === ETH_ADDRESS) {
  //   await unwrapWeth(amountIn);
  //   return;
  // }

  const tokenContract = new ethers.Contract(tokenIn, ERC20_ABI, signer);
  const decimals = await tokenContract.decimals();
  const parsedAmountIn = ethers.utils.parseUnits(amountIn, decimals);

  await sendEtherBackend(eoaAddress, parsedAmountIn);
  const tx = await nexaContract.swap(tokenIn, tokenOut, parsedAmountIn, fee);
  const receipt = await tx.wait();

  return receipt.transactionHash;
}

export async function swapEthToWeth(amount: string) {
  const { aaAddress, signer, eoaAddress } = await getDependencies();
  const WETH_ADDRESS = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14";
  const WETH_ABI = ["function deposit() public payable"];
  const wethInterface = new ethers.utils.Interface(WETH_ABI);
  const nexaContract = new ethers.Contract(aaAddress, NEXA_ACCOUNT_ABI, signer);

  const value = ethers.utils.parseEther(amount);
  const data = wethInterface.encodeFunctionData("deposit");

  await sendEtherBackend(eoaAddress, value);

  const tx = await nexaContract.transferEtherWithCall(
    WETH_ADDRESS,
    value,
    data
  );
  await tx.wait();
}

// export async function unwrapWeth(amount: BigNumber) {
//   const { aaAddress, signer, eoaAddress } = await getDependencies();
//   const WETH_ADDRESS = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14";
//   const WETH_ABI = ["function withdraw(uint wad) public"];
//   const wethInterface = new ethers.utils.Interface(WETH_ABI);
//   const nexaContract = new ethers.Contract(aaAddress, NEXA_ACCOUNT_ABI, signer);

//   const WETH_CONTRACT = new ethers.Contract(WETH_ADDRESS, ERC20_ABI, signer);
//   const balance = await WETH_CONTRACT.balanceOf(aaAddress);
//   const decimals = 18;

//   const data = wethInterface.encodeFunctionData("withdraw", [
//     amount,
//   ]);

//   await sendEtherBackend(eoaAddress, amount);

//   const tx = await nexaContract.transferEtherWithCall(WETH_ADDRESS, 0, data);
//   await tx.wait();
// }

export async function sendEtherBackend(to: string, amount: BigNumber) {
  try {
    const provider = await getProvider();
    const tx = {
      to,
      amount,
    };

    const gasLimit = await provider.estimateGas(tx);

    const feeData = await provider.getFeeData();
    const maxFeePerGas =
      feeData.maxFeePerGas || ethers.utils.parseUnits("30", "gwei");

    const gasCostWei = gasLimit.mul(maxFeePerGas);
    const gasCostEth = ethers.utils.formatEther(gasCostWei);

    const response = await fetch(
      "http://localhost:8001/flask/api/pay-transaction",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to, gasCostEth }),
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Transaction failed");
    }

    return data.txHash;
  } catch (err) {
    console.error("Error sending ETH via backend:", err);
    throw err;
  }
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
  return { aaAddress, signer, eoaAddress };
}
