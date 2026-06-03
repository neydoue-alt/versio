export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          full_name: string | null
          avatar_url: string | null
          username: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          username?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          username?: string | null
        }
      }
      struggles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          title: string
          description: string | null
          category: string | null
          resolved: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          title: string
          description?: string | null
          category?: string | null
          resolved?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          title?: string
          description?: string | null
          category?: string | null
          resolved?: boolean
        }
      }
      goals: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          title: string
          description: string | null
          target_date: string | null
          completed: boolean
          progress: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          title: string
          description?: string | null
          target_date?: string | null
          completed?: boolean
          progress?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          title?: string
          description?: string | null
          target_date?: string | null
          completed?: boolean
          progress?: number
        }
      }
      check_ins: {
        Row: {
          id: string
          created_at: string
          user_id: string
          mood: number
          notes: string | null
          date: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          mood: number
          notes?: string | null
          date: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          mood?: number
          notes?: string | null
          date?: string
        }
      }
      streaks: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          current_streak: number
          longest_streak: number
          last_check_in: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          current_streak?: number
          longest_streak?: number
          last_check_in?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          current_streak?: number
          longest_streak?: number
          last_check_in?: string | null
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
