"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";

const LoginSchema = z.object({
  email: z.email("กรุณากรอกอีเมลให้ถูกต้อง"),
  password: z.string().min(6, "รหัสผ่านอย่างน้อย 6 ตัวอักษร"),
});

export type LoginState = {
  ok?: boolean;
  message?: string;
};

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  if (!isSupabaseConfigured()) {
    return { ok: false, message: "ยังไม่ได้ตั้งค่า Supabase" };
  }

  const parsed = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "ข้อมูลไม่ถูกต้อง",
    };
  }

  const sb = await createSupabaseServerClient();
  const { error } = await sb.auth.signInWithPassword(parsed.data);
  if (error) return { ok: false, message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" };

  const next = (formData.get("next") as string) || "/admin";
  revalidatePath("/admin", "layout");
  redirect(next);
}

export async function logoutAction() {
  if (!isSupabaseConfigured()) return;
  const sb = await createSupabaseServerClient();
  await sb.auth.signOut();
  redirect("/admin/login");
}
