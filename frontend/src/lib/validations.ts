import { ethers } from "ethers";

export function validateAddress(address: string): boolean {
  return ethers.utils.isAddress(address);
}

export function validateAmount(
  amount: string,
  balance: string | number
): boolean {
  if (!amount) return false;

  const value = parseFloat(amount);
  if (isNaN(value) || value <= 0) return false;

  if (typeof balance === "string") balance = parseFloat(balance);
  return value <= balance;
}

export function validateNumericInput(value: string): boolean {
  const parts = value.split(".");
  return /^[0-9.]*$/.test(value) && parts.length <= 2;
}
