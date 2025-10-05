import { supabase } from "@/lib/supabase/client";
import type { PostgrestError } from "@supabase/supabase-js";

/**
 * Uniwersalny serwis do operacji CRUD na bazie danych
 */
export class DatabaseService {
  /**
   * Pobierz wszystkie rekordy z tabeli
   */
  static async getAll<T>(
    table: string,
    options?: {
      select?: string;
      orderBy?: { column: string; ascending?: boolean };
      limit?: number;
    }
  ): Promise<{ data: T[] | null; error: PostgrestError | null }> {
    try {
      let query = supabase.from(table).select(options?.select || "*");

      if (options?.orderBy) {
        query = query.order(options.orderBy.column, {
          ascending: options.orderBy.ascending ?? true,
        });
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;

      return { data: data as T[] | null, error };
    } catch (error) {
      console.error(`Get all from ${table} error:`, error);
      return { data: null, error: error as PostgrestError };
    }
  }

  /**
   * Pobierz pojedynczy rekord po ID
   */
  static async getById<T>(
    table: string,
    id: string,
    select?: string
  ): Promise<{ data: T | null; error: PostgrestError | null }> {
    try {
      const { data, error } = await supabase
        .from(table)
        .select(select || "*")
        .eq("id", id)
        .single();

      return { data: data as T | null, error };
    } catch (error) {
      console.error(`Get by ID from ${table} error:`, error);
      return { data: null, error: error as PostgrestError };
    }
  }

  /**
   * Utwórz nowy rekord
   */
  static async create<T, I>(
    table: string,
    data: I
  ): Promise<{ data: T | null; error: PostgrestError | null }> {
    try {
      const { data: result, error } = await supabase
        .from(table)
        .insert(data as never)
        .select()
        .single();

      return { data: result as T | null, error };
    } catch (error) {
      console.error(`Create in ${table} error:`, error);
      return { data: null, error: error as PostgrestError };
    }
  }

  /**
   * Zaktualizuj rekord
   */
  static async update<T, U>(
    table: string,
    id: string,
    updates: U
  ): Promise<{ data: T | null; error: PostgrestError | null }> {
    try {
      const { data, error } = await supabase
        .from(table)
        .update(updates as never)
        .eq("id", id)
        .select()
        .single();

      return { data: data as T | null, error };
    } catch (error) {
      console.error(`Update in ${table} error:`, error);
      return { data: null, error: error as PostgrestError };
    }
  }

  /**
   * Usuń rekord
   */
  static async delete(
    table: string,
    id: string
  ): Promise<{ error: PostgrestError | null }> {
    try {
      const { error } = await supabase.from(table).delete().eq("id", id);

      return { error };
    } catch (error) {
      console.error(`Delete from ${table} error:`, error);
      return { error: error as PostgrestError };
    }
  }

  /**
   * Zapytanie z filtrami
   */
  static async query<T>(
    table: string,
    filters: Record<string, unknown>,
    options?: {
      select?: string;
      orderBy?: { column: string; ascending?: boolean };
      limit?: number;
    }
  ): Promise<{ data: T[] | null; error: PostgrestError | null }> {
    try {
      let query = supabase.from(table).select(options?.select || "*");

      // Dodaj filtry
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });

      if (options?.orderBy) {
        query = query.order(options.orderBy.column, {
          ascending: options.orderBy.ascending ?? true,
        });
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;

      return { data: data as T[] | null, error };
    } catch (error) {
      console.error(`Query ${table} error:`, error);
      return { data: null, error: error as PostgrestError };
    }
  }

  /**
   * Policz rekordy spełniające warunek
   */
  static async count(
    table: string,
    filters?: Record<string, unknown>
  ): Promise<{ count: number | null; error: PostgrestError | null }> {
    try {
      let query = supabase
        .from(table)
        .select("*", { count: "exact", head: true });

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      const { count, error } = await query;

      return { count, error };
    } catch (error) {
      console.error(`Count ${table} error:`, error);
      return { count: null, error: error as PostgrestError };
    }
  }
}
