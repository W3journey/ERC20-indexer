export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      arbitrum_spam_tokens: {
        Row: {
          contractAddress: string
          created_at: string
          id: string
          name: string | null
          possible_spam: boolean
          symbol: string | null
        }
        Insert: {
          contractAddress: string
          created_at?: string
          id?: string
          name?: string | null
          possible_spam?: boolean
          symbol?: string | null
        }
        Update: {
          contractAddress?: string
          created_at?: string
          id?: string
          name?: string | null
          possible_spam?: boolean
          symbol?: string | null
        }
        Relationships: []
      }
      ethereum_spam_tokens: {
        Row: {
          contractAddress: string
          created_at: string
          id: string
          name: string | null
          possible_spam: boolean
          symbol: string | null
        }
        Insert: {
          contractAddress: string
          created_at?: string
          id?: string
          name?: string | null
          possible_spam?: boolean
          symbol?: string | null
        }
        Update: {
          contractAddress?: string
          created_at?: string
          id?: string
          name?: string | null
          possible_spam?: boolean
          symbol?: string | null
        }
        Relationships: []
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
