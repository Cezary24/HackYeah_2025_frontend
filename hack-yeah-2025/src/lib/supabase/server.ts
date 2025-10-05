import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// Klient server-side z Service Role Key (ma pełne uprawnienia)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error(
    "Brak wymaganych zmiennych środowiskowych Supabase dla server-side operations"
  );
}

// Klient z Service Role - TYLKO dla operacji server-side (API routes, Server Components)
export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  supabaseServiceRoleKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

export type SupabaseAdmin = typeof supabaseAdmin;
