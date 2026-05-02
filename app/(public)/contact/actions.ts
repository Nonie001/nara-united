"use server";

import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/env";

const ContactSchema = z.object({
  name: z.string().min(2, "กรุณากรอกชื่ออย่างน้อย 2 ตัวอักษร").max(120),
  email: z.email({ message: "กรุณากรอกอีเมลให้ถูกต้อง" }).max(200),
  subject: z.string().max(200).optional(),
  message: z.string().min(10, "ข้อความสั้นเกินไป").max(5000),
});

export type ContactState = {
  ok?: boolean;
  errors?: Partial<Record<"name" | "email" | "subject" | "message", string[]>>;
  message?: string;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const parsed = ContactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject") || undefined,
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      errors: z.flattenError(parsed.error).fieldErrors,
      message: "กรุณาตรวจสอบข้อมูลในฟอร์ม",
    };
  }

  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      message: "ระบบยังไม่ได้เชื่อมต่อฐานข้อมูล กรุณาติดต่อทางช่องทางอื่น",
    };
  }

  const sb = createSupabaseAdminClient();
  const { error } = await sb.from("contact_messages").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    subject: parsed.data.subject ?? null,
    message: parsed.data.message,
  });

  if (error) {
    return { ok: false, message: "ส่งข้อความไม่สำเร็จ กรุณาลองใหม่" };
  }

  return { ok: true, message: "ส่งข้อความเรียบร้อย ขอบคุณที่ติดต่อสโมสร" };
}
