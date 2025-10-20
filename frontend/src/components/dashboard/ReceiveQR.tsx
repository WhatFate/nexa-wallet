"use client";
import { QRCodeCanvas } from "qrcode.react";

export default function ReceiveQR({ address }: { address: string }) {
  const qrValue = `ethereum:${address}`;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-900/70 rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-white tracking-wide">
        Receive Tokens
      </h2>

      <div className="p-4 bg-gray-900/70 rounded-xl shadow-inner">
        <QRCodeCanvas
          value={qrValue}
          size={240}
          bgColor="rgba(17, 24, 39, 0.7)"
          fgColor="#ffffffff"
          includeMargin={true}
        />
      </div>

      <div className="mt-6 text-center w-full">
        <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">
          Your Address
        </p>
        <div className="bg-gray-800/70 px-3 py-2 rounded-lg border border-gray-700">
          <p className="text-gray-100 text-sm font-mono break-all">{address}</p>
        </div>
      </div>
    </div>
  );
}
