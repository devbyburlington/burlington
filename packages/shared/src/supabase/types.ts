export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          address_line_1: string
          address_line_2: string | null
          administrative_area: string | null
          city: string
          country_iso: string
          created_at: string | null
          id: string
          postal_code: string | null
          profile_id: string | null
        }
        Insert: {
          address_line_1: string
          address_line_2?: string | null
          administrative_area?: string | null
          city: string
          country_iso: string
          created_at?: string | null
          id?: string
          postal_code?: string | null
          profile_id?: string | null
        }
        Update: {
          address_line_1?: string
          address_line_2?: string | null
          administrative_area?: string | null
          city?: string
          country_iso?: string
          created_at?: string | null
          id?: string
          postal_code?: string | null
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "addresses_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_leads: {
        Row: {
          country: string | null
          created_at: string | null
          criteria_met: number | null
          criteria_total: number | null
          email: string
          field_id: string | null
          id: string
          linkedin_url: string | null
          marketing_consent: boolean | null
          name: string
          score_pct: number | null
          tier: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string | null
          criteria_met?: number | null
          criteria_total?: number | null
          email: string
          field_id?: string | null
          id?: string
          linkedin_url?: string | null
          marketing_consent?: boolean | null
          name: string
          score_pct?: number | null
          tier?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string | null
          criteria_met?: number | null
          criteria_total?: number | null
          email?: string
          field_id?: string | null
          id?: string
          linkedin_url?: string | null
          marketing_consent?: boolean | null
          name?: string
          score_pct?: number | null
          tier?: string | null
        }
        Relationships: []
      }
      pending_jobs: {
        Row: {
          attempts: number | null
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          failed_at: string | null
          id: string
          max_attempts: number | null
          payload: Json
          run_after: string | null
          started_at: string | null
          status: string | null
          type: string
        }
        Insert: {
          attempts?: number | null
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          failed_at?: string | null
          id?: string
          max_attempts?: number | null
          payload?: Json
          run_after?: string | null
          started_at?: string | null
          status?: string | null
          type: string
        }
        Update: {
          attempts?: number | null
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          failed_at?: string | null
          id?: string
          max_attempts?: number | null
          payload?: Json
          run_after?: string | null
          started_at?: string | null
          status?: string | null
          type?: string
        }
        Relationships: []
      }
      processed_webhooks: {
        Row: {
          error_message: string | null
          event_id: string
          event_type: string
          id: string
          processed_at: string | null
          provider: string
          result: string
        }
        Insert: {
          error_message?: string | null
          event_id: string
          event_type: string
          id?: string
          processed_at?: string | null
          provider: string
          result: string
        }
        Update: {
          error_message?: string | null
          event_id?: string
          event_type?: string
          id?: string
          processed_at?: string | null
          provider?: string
          result?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address_id: string | null
          ambition_statement: string | null
          assigned_adviser: string | null
          auth_provider: string | null
          client_ref: string | null
          country_citizenship_iso: string | null
          country_residence_iso: string | null
          created_at: string | null
          email: string
          employer: string | null
          family_name: string | null
          field_industry: string | null
          full_name: string
          given_name: string | null
          has_set_password: boolean | null
          highest_education: string | null
          how_heard: string | null
          id: string
          immigration_goal: string | null
          interested_product: string | null
          is_founder: boolean | null
          job_title: string | null
          linkedin_url: string | null
          marketing_consent: boolean | null
          nda_signature_ip: string | null
          nda_signature_name: string | null
          nda_signature_ua: string | null
          nda_signed_at: string | null
          onboarded_at: string | null
          phone_e164: string | null
          preferred_currency: string | null
          preferred_name: string | null
          referral_source: string | null
          role: string | null
          status: string | null
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          address_id?: string | null
          ambition_statement?: string | null
          assigned_adviser?: string | null
          auth_provider?: string | null
          client_ref?: string | null
          country_citizenship_iso?: string | null
          country_residence_iso?: string | null
          created_at?: string | null
          email: string
          employer?: string | null
          family_name?: string | null
          field_industry?: string | null
          full_name: string
          given_name?: string | null
          has_set_password?: boolean | null
          highest_education?: string | null
          how_heard?: string | null
          id: string
          immigration_goal?: string | null
          interested_product?: string | null
          is_founder?: boolean | null
          job_title?: string | null
          linkedin_url?: string | null
          marketing_consent?: boolean | null
          nda_signature_ip?: string | null
          nda_signature_name?: string | null
          nda_signature_ua?: string | null
          nda_signed_at?: string | null
          onboarded_at?: string | null
          phone_e164?: string | null
          preferred_currency?: string | null
          preferred_name?: string | null
          referral_source?: string | null
          role?: string | null
          status?: string | null
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          address_id?: string | null
          ambition_statement?: string | null
          assigned_adviser?: string | null
          auth_provider?: string | null
          client_ref?: string | null
          country_citizenship_iso?: string | null
          country_residence_iso?: string | null
          created_at?: string | null
          email?: string
          employer?: string | null
          family_name?: string | null
          field_industry?: string | null
          full_name?: string
          given_name?: string | null
          has_set_password?: boolean | null
          highest_education?: string | null
          how_heard?: string | null
          id?: string
          immigration_goal?: string | null
          interested_product?: string | null
          is_founder?: boolean | null
          job_title?: string | null
          linkedin_url?: string | null
          marketing_consent?: boolean | null
          nda_signature_ip?: string | null
          nda_signature_name?: string | null
          nda_signature_ua?: string | null
          nda_signed_at?: string | null
          onboarded_at?: string | null
          phone_e164?: string | null
          preferred_currency?: string | null
          preferred_name?: string | null
          referral_source?: string | null
          role?: string | null
          status?: string | null
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_assigned_adviser_fkey"
            columns: ["assigned_adviser"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
