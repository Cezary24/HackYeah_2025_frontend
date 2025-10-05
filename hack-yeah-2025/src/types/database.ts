// Typy dla tabel Supabase - BEZ AUTENTYKACJI
// Ten plik powinien być wygenerowany automatycznie z Supabase CLI:
// npx supabase gen types typescript --project-id "your-project-id" --schema public > src/types/database.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      // Tabela dla wywiadów - bez autentykacji użytkownika
      // user_id będzie zawierać anonymous_session_id
      interviews: {
        Row: {
          id: string;
          user_id: string; // anonymous session ID, nie prawdziwy user
          answers: Json;
          categories: Json;
          completed_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string; // anonymous session ID
          answers: Json;
          categories: Json;
          completed_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          answers?: Json;
          categories?: Json;
          completed_at?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      // Tabela dla komunikatów RCB
      rcb: {
        Row: {
          id: number;
          event: string; // Format: DD.MM.YYYY
          title: string;
          intro: string;
          image_url: string;
          image_region: string;
          article_url: string;
        };
        Insert: {
          id?: number;
          event: string;
          title: string;
          intro: string;
          image_url: string;
          image_region: string;
          article_url: string;
        };
        Update: {
          id?: number;
          event?: string;
          title?: string;
          intro?: string;
          image_url?: string;
          image_region?: string;
          article_url?: string;
        };
      };
      // Dodaj więcej tabel według potrzeb (wszystkie bez autentykacji)
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
