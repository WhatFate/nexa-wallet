"use client";
import ReceiveQR from "@/components/dashboard/ReceiveQR";

type ReceivePanelProps = {
  address: string;
  onBack: () => void;
};

export default function ReceivePanel({ address, onBack }: ReceivePanelProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <ReceiveQR address={address} />
      <button
        onClick={onBack}
        className="mt-6 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white font-semibold transition"
      >
        Back
      </button>
    </div>
  );
}
