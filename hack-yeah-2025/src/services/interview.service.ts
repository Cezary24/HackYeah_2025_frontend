import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/types/database";

type InterviewRow = Database["public"]["Tables"]["interviews"]["Row"];
type InterviewInsert = Database["public"]["Tables"]["interviews"]["Insert"];
type InterviewUpdate = Database["public"]["Tables"]["interviews"]["Update"];

export interface InterviewData {
  answers: Record<string, unknown>;
  categories: {
    level1: string[];
    level2Tags: string[];
  };
}

export class InterviewService {
  /**
   * Generuj unikalny ID sesji dla użytkownika (bez autentykacji)
   * Zapisywany w localStorage
   */
  private static getOrCreateSessionId(): string {
    if (typeof window === "undefined") return "";

    let sessionId = localStorage.getItem("anonymous_session_id");
    if (!sessionId) {
      sessionId = `anon_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      localStorage.setItem("anonymous_session_id", sessionId);
    }
    return sessionId;
  }

  /**
   * Zapisz wywiad (anonimowo)
   */
  static async saveInterview(
    interviewData: InterviewData
  ): Promise<{ data: InterviewRow | null; error: Error | null }> {
    try {
      const sessionId = this.getOrCreateSessionId();

      const insertData: InterviewInsert = {
        user_id: sessionId, // Używamy session_id zamiast prawdziwego user_id
        answers: interviewData.answers as never,
        categories: interviewData.categories as never,
        completed_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("interviews")
        .insert(insertData)
        .select()
        .single();

      if (error) {
        console.error("Save interview error:", error);
        return { data: null, error };
      }

      // Zapisz także lokalnie jako backup
      if (typeof window !== "undefined") {
        localStorage.setItem("interview_data", JSON.stringify(interviewData));
        localStorage.setItem("interview_id", data.id);
      }

      return { data, error: null };
    } catch (error) {
      console.error("Save interview error:", error);
      return { data: null, error: error as Error };
    }
  }

  /**
   * Aktualizuj wywiad (anonimowo)
   */
  static async updateInterview(
    interviewId: string,
    interviewData: Partial<InterviewData>
  ): Promise<{ data: InterviewRow | null; error: Error | null }> {
    try {
      const updateData: InterviewUpdate = {
        ...(interviewData.answers && {
          answers: interviewData.answers as never,
        }),
        ...(interviewData.categories && {
          categories: interviewData.categories as never,
        }),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("interviews")
        .update(updateData)
        .eq("id", interviewId)
        .select()
        .single();

      if (error) {
        console.error("Update interview error:", error);
        return { data: null, error };
      }

      // Aktualizuj także lokalnie
      if (typeof window !== "undefined") {
        const existingData = localStorage.getItem("interview_data");
        if (existingData) {
          const parsed = JSON.parse(existingData);
          const updated = { ...parsed, ...interviewData };
          localStorage.setItem("interview_data", JSON.stringify(updated));
        }
      }

      return { data, error: null };
    } catch (error) {
      console.error("Update interview error:", error);
      return { data: null, error: error as Error };
    }
  }

  /**
   * Pobierz wywiad dla bieżącej sesji
   */
  static async getCurrentSessionInterview(): Promise<{
    data: InterviewRow | null;
    error: Error | null;
  }> {
    try {
      const sessionId = this.getOrCreateSessionId();

      const { data, error } = await supabase
        .from("interviews")
        .select("*")
        .eq("user_id", sessionId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error("Get interview error:", error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error("Get interview error:", error);
      return { data: null, error: error as Error };
    }
  }

  /**
   * Pobierz wywiad z localStorage (offline backup)
   */
  static getLocalInterview(): InterviewData | null {
    if (typeof window === "undefined") return null;

    try {
      const data = localStorage.getItem("interview_data");
      if (!data) return null;
      return JSON.parse(data);
    } catch (error) {
      console.error("Get local interview error:", error);
      return null;
    }
  }

  /**
   * Usuń wywiad
   */
  static async deleteInterview(
    interviewId: string
  ): Promise<{ error: Error | null }> {
    try {
      const { error } = await supabase
        .from("interviews")
        .delete()
        .eq("id", interviewId);

      if (error) {
        console.error("Delete interview error:", error);
        return { error };
      }

      // Usuń także lokalnie
      if (typeof window !== "undefined") {
        localStorage.removeItem("interview_data");
        localStorage.removeItem("interview_id");
      }

      return { error: null };
    } catch (error) {
      console.error("Delete interview error:", error);
      return { error: error as Error };
    }
  }

  /**
   * Wyczyść wszystkie dane (lokalnie i w bazie)
   */
  static async clearAllData(): Promise<{ error: Error | null }> {
    try {
      const sessionId = this.getOrCreateSessionId();

      // Usuń z bazy
      const { error } = await supabase
        .from("interviews")
        .delete()
        .eq("user_id", sessionId);

      if (error) {
        console.error("Clear data error:", error);
      }

      // Usuń lokalnie
      if (typeof window !== "undefined") {
        localStorage.removeItem("interview_data");
        localStorage.removeItem("interview_id");
        localStorage.removeItem("userCategories");
        localStorage.removeItem("userAnswers");
        localStorage.removeItem("interviewCompleted");
      }

      return { error: error || null };
    } catch (error) {
      console.error("Clear data error:", error);
      return { error: error as Error };
    }
  }
}
