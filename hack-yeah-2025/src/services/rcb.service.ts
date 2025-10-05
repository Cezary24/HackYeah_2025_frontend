import { supabase } from "@/lib/supabase/client";

export interface RcbNews {
  id: number;
  event: string; // Format: DD.MM.YYYY
  title: string;
  intro: string;
  image_url: string;
  image_region: string;
  article_url: string;
}

export class RcbService {
  /**
   * Pobierz wszystkie komunikaty
   */
  static async getAllNews(): Promise<{
    data: RcbNews[] | null;
    error: Error | null;
  }> {
    try {
      const { data, error } = await supabase
        .from("rcb")
        .select("*")
        .order("event", { ascending: false });

      if (error) {
        console.error("Get all news error:", error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error("Get all news error:", error);
      return { data: null, error: error as Error };
    }
  }

  /**
   * Pobierz pojedynczy komunikat po ID
   */
  static async getNewsById(
    id: string
  ): Promise<{ data: RcbNews | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from("rcb")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Get news by ID error:", error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error("Get news by ID error:", error);
      return { data: null, error: error as Error };
    }
  }
}
