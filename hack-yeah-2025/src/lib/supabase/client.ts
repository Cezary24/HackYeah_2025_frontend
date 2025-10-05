import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// Sprawdź czy zmienne środowiskowe są ustawione
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Utwórz klienta Supabase (client-side)
// Używamy pustych stringów jako fallback podczas budowania
export const supabase = createClient<Database>(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
    global: {
      headers: {
        "x-application-name": "HackYeah-2025",
      },
    },
  }
);

// Helper do sprawdzenia czy Supabase jest skonfigurowany
export const isSupabaseConfigured = () => {
  return (
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes("your-project") &&
    !supabaseAnonKey.includes("your-")
  );
};

// Export typów dla łatwiejszego użycia
export type SupabaseClient = typeof supabase;
