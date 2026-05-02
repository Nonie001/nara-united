import type { Metadata } from "next";
import { Card, CardBody, CardHeader } from "@/components/shared/Card";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "เข้าสู่ระบบ" };

type Props = {
  searchParams: Promise<{ next?: string; error?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const sp = await searchParams;
  return (
    <div className="min-h-screen grid place-items-center px-4 bg-nara-green-dark">
      <Card className="w-full max-w-md">
        <CardHeader className="bg-nara-green text-white">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-nara-gold text-nara-green-dark font-black">
              N
            </span>
            <div>
              <div className="font-display text-lg font-extrabold">
                NARA UNITED
              </div>
              <div className="text-xs text-white/80">Admin Console</div>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          {sp.error === "forbidden" ? (
            <p className="mb-3 rounded bg-red-50 text-nara-red text-sm p-2">
              บัญชีของคุณไม่มีสิทธิ์เข้าใช้หลังบ้าน
            </p>
          ) : null}
          <LoginForm next={sp.next} />
        </CardBody>
      </Card>
    </div>
  );
}
