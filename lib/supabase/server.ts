import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { env } from "@/lib/env";

// Next.js 16: cookies() is async — must be awaited.
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    env.supabaseUrl(),
    env.supabaseAnonKey(),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Setting cookies in a Server Component will throw — safe to ignore
            // when middleware/proxy refreshes the session.
          }
        },
      },
    }
  );
}
