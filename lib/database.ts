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
          already_read: boolean | null
          content: string
          id: number
          inserted_at: string
          rating: number | null
          title: string
          updated_at: string
          url: string
          user_id: string
        }
        Insert: {
          already_read?: boolean | null
          content: string
          id?: number
          inserted_at?: string
          rating?: number | null
          title: string
          updated_at?: string
          url: string
          user_id: string
        }
        Update: {
          already_read?: boolean | null
          content?: string
          id?: number
          inserted_at?: string
          rating?: number | null
          title?: string
          updated_at?: string
          url?: string
          user_id?: string
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
