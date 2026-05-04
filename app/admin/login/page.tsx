import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "เข้าสู่ระบบ" };

type Props = {
  searchParams: Promise<{ next?: string; error?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const sp = await searchParams;
  return (
    <div className="min-h-screen grid place-items-center px-4 bg-gradient-to-br from-nara-ink via-[#101a13] to-black">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl">
        <div className="bg-nara-ink text-white p-6 relative">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-nara-gold to-transparent"
          />
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-md bg-nara-gold text-nara-ink font-black heading-display text-xl">
              N
            </span>
            <div>
              <div className="heading-display text-lg tracking-wide">
                NARA UNITED
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-nara-gold">
                Admin Console
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <h1 className="heading-display text-2xl text-nara-ink">เข้าสู่ระบบ</h1>
          <span className="mt-2 block h-[2px] w-10 bg-nara-gold rounded-full" />
          <p className="mt-3 text-sm text-gray-500">
            สำหรับเจ้าหน้าที่สโมสรเท่านั้น
          </p>

          {sp.error === "forbidden" ? (
            <p className="mt-4 rounded-md border border-red-200 bg-red-50 text-nara-red text-sm p-3">
              บัญชีของคุณไม่มีสิทธิ์เข้าใช้หลังบ้าน
            </p>
          ) : null}

          <div className="mt-6">
            <LoginForm next={sp.next} />
          </div>
        </div>
      </div>
    </div>
  );
}
