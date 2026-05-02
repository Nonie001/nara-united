import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

// Service-role client. Server-only. Bypasses RLS — use only in trusted server
// code (Server Actions / Route Handlers) for elevated operations.
export function createSupabaseAdminClient() {
  return createClient(
    env.supabaseUrl(),
    env.supabaseServiceRoleKey(),
    {
      auth: { persistSession: false, autoRefreshToken: false },
    }
  );
}
