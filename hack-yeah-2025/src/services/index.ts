// Centralny eksport wszystkich serwisów
export { InterviewService } from "./interview.service";
export { DatabaseService } from "./database.service";
export { RcbService } from "./rcb.service";

// Re-export klientów Supabase
export { supabase } from "@/lib/supabase/client";
export type { SupabaseClient } from "@/lib/supabase/client";
