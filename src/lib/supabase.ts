import { createClient } from "@supabase/supabase-js";

function getClient(key: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url || !key) throw new Error("Supabase env vars missing");
  return createClient(url, key);
}

// Browser / client components — uses anon key, respects RLS
export const supabase = () =>
  getClient(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

// Server only — uses service role key, bypasses RLS
export const supabaseAdmin = () =>
  getClient(process.env.SUPABASE_SERVICE_ROLE_KEY!);
