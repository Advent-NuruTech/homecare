import { Timestamp } from "firebase/firestore";

interface TestimonyProps {
  name: string;
  message: string;
  createdAt: Timestamp;
}

export default function TestimonyCard({
  name,
  message,
  createdAt,
}: TestimonyProps) {
  const date = createdAt.toDate().toLocaleDateString();

  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-md transition">
      <h4 className="font-semibold text-lg mb-1">{name}</h4>
      <p className="text-gray-700 mb-2">{message}</p>
      <p className="text-sm text-gray-500">🕒 {date}</p>
    </div>
  );
}
