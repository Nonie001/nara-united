// Centralized env access. Throws clear errors when required vars are missing.

function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing environment variable: ${name}. See .env.local.example.`
    );
  }
  return value;
}

export const env = {
  supabaseUrl: () =>
    required("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL),
  supabaseAnonKey: () =>
    required(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ),
  supabaseServiceRoleKey: () =>
    required(
      "SUPABASE_SERVICE_ROLE_KEY",
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ),
  siteUrl: () =>
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  thaiLeagueApiBase: () => process.env.THAI_LEAGUE_API_BASE ?? "",
  thaiLeagueApiKey: () => process.env.THAI_LEAGUE_API_KEY ?? "",
  cronSecret: () => process.env.CRON_SECRET ?? "",
};

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
