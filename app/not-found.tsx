import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] grid place-items-center px-4">
      <div className="text-center">
        <div className="font-display text-7xl font-black text-nara-green-dark">
          404
        </div>
        <p className="mt-2 text-gray-600">ไม่พบหน้านี้</p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-nara-green text-white px-4 py-2 hover:bg-nara-green-dark"
        >
          กลับหน้าแรก
        </Link>
      </div>
    </div>
  );
}
