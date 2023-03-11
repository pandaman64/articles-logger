export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          content: string | null
          id: number
          inserted_at: string
          title: string | null
          updated_at: string
          url: string | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          id?: number
          inserted_at?: string
          title?: string | null
          updated_at?: string
          url?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          id?: number
          inserted_at?: string
          title?: string | null
          updated_at?: string
          url?: string | null
          user_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
