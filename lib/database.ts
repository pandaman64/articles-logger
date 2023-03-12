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
          content: string
          id: number
          inserted_at: string
          title: string
          updated_at: string
          url: string
          user_id: string
        }
        Insert: {
          content: string
          id?: number
          inserted_at?: string
          title: string
          updated_at?: string
          url: string
          user_id: string
        }
        Update: {
          content?: string
          id?: number
          inserted_at?: string
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
