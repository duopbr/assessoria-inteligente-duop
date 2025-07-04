export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      assessores: {
        Row: {
          celular: string
          created_at: string | null
          id: number
          nome: string
        }
        Insert: {
          celular: string
          created_at?: string | null
          id?: number
          nome: string
        }
        Update: {
          celular?: string
          created_at?: string | null
          id?: number
          nome?: string
        }
        Relationships: []
      }
      Calculadoras: {
        Row: {
          calculadora: string | null
          Chatgpt: string | null
          Contato: string | null
          created_at: string
          email: string | null
          id: number
          "Interesse em dados": string | null
          "Média de Mensagens por Conversas": string | null
          Name: string | null
          Nota: string | null
          "Numero de Conversas": string | null
          patrimonio: string | null
          phone: string | null
          "Se sentiu enganado": string | null
          valor_mes: string | null
        }
        Insert: {
          calculadora?: string | null
          Chatgpt?: string | null
          Contato?: string | null
          created_at?: string
          email?: string | null
          id?: number
          "Interesse em dados"?: string | null
          "Média de Mensagens por Conversas"?: string | null
          Name?: string | null
          Nota?: string | null
          "Numero de Conversas"?: string | null
          patrimonio?: string | null
          phone?: string | null
          "Se sentiu enganado"?: string | null
          valor_mes?: string | null
        }
        Update: {
          calculadora?: string | null
          Chatgpt?: string | null
          Contato?: string | null
          created_at?: string
          email?: string | null
          id?: number
          "Interesse em dados"?: string | null
          "Média de Mensagens por Conversas"?: string | null
          Name?: string | null
          Nota?: string | null
          "Numero de Conversas"?: string | null
          patrimonio?: string | null
          phone?: string | null
          "Se sentiu enganado"?: string | null
          valor_mes?: string | null
        }
        Relationships: []
      }
      checkout_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          payment_method: string
          phone: string | null
          plan_price: string
          plan_title: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          payment_method: string
          phone?: string | null
          plan_price: string
          plan_title: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          payment_method?: string
          phone?: string | null
          plan_price?: string
          plan_title?: string
        }
        Relationships: []
      }
      pix_phone_submissions: {
        Row: {
          Chatgpt: string | null
          Email: string | null
          id: number
          "Interesse em dados": string | null
          "Investir Mês": string | null
          "Ja foi contatado?": string | null
          Patrimonio: string | null
          phone_number: string | null
          plan_title: string | null
          "Se sentiu enganado": string | null
          submitted_at: string | null
        }
        Insert: {
          Chatgpt?: string | null
          Email?: string | null
          id?: number
          "Interesse em dados"?: string | null
          "Investir Mês"?: string | null
          "Ja foi contatado?"?: string | null
          Patrimonio?: string | null
          phone_number?: string | null
          plan_title?: string | null
          "Se sentiu enganado"?: string | null
          submitted_at?: string | null
        }
        Update: {
          Chatgpt?: string | null
          Email?: string | null
          id?: number
          "Interesse em dados"?: string | null
          "Investir Mês"?: string | null
          "Ja foi contatado?"?: string | null
          Patrimonio?: string | null
          phone_number?: string | null
          plan_title?: string | null
          "Se sentiu enganado"?: string | null
          submitted_at?: string | null
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
