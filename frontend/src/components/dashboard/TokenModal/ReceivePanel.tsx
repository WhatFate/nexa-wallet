import ReceiveQR from "@/components/dashboard/ReceiveQR";

export default function ReceivePanel({ address, onBack }) {
  return (
    <>
      <ReceiveQR address={address} />
      <button onClick={onBack}>Back</button>
    </>
  );
}
