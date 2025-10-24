import { Dispatch, SetStateAction } from "react";

export function handleAmountChange(
  value: string,
  setAmount: Dispatch<SetStateAction<string>>
) {
  if (/^[0-9.]*$/.test(value)) {
    const parts = value.split(".");
    if (parts.length <= 2) {
      setAmount(value);
    }
  }
}

export function handleAmountWheel(
  e: React.WheelEvent<HTMLInputElement>,
  amount: string,
  setAmount: Dispatch<SetStateAction<string>>,
  step = 0.1
) {
  e.preventDefault();
  const current = parseFloat(amount) || 0;
  const delta = e.deltaY < 0 ? step : -step;
  setAmount(Math.max(0, parseFloat((current + delta).toFixed(1))).toString());
}

export function handleAmountKeyDown(
  e: React.KeyboardEvent<HTMLInputElement>,
  amount: string,
  setAmount: Dispatch<SetStateAction<string>>,
  step = 0.1
) {
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    e.preventDefault();
    const current = parseFloat(amount) || 0;
    const delta = e.key === "ArrowUp" ? step : -step;
    setAmount(Math.max(0, parseFloat((current + delta).toFixed(1))).toString());
  }
}
