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
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          created_at: string
          email: string | null
          full_name: string
          id: string
          notes: string | null
          organisation: string | null
          phone: string
          preferred_date: string | null
          preferred_time: string | null
          session_type: string
          status: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          notes?: string | null
          organisation?: string | null
          phone: string
          preferred_date?: string | null
          preferred_time?: string | null
          session_type?: string
          status?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          notes?: string | null
          organisation?: string | null
          phone?: string
          preferred_date?: string | null
          preferred_time?: string | null
          session_type?: string
          status?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string
          display_name: string
          id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          display_name: string
          id?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          display_name?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      comments: {
        Row: {
          approved: boolean
          author_name: string
          content: string
          created_at: string
          id: string
          target: string
          user_id: string | null
        }
        Insert: {
          approved?: boolean
          author_name: string
          content: string
          created_at?: string
          id?: string
          target?: string
          user_id?: string | null
        }
        Update: {
          approved?: boolean
          author_name?: string
          content?: string
          created_at?: string
          id?: string
          target?: string
          user_id?: string | null
        }
        Relationships: []
      }
      live_links: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_live: boolean
          platform: string
          published: boolean
          title: string
          url: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_live?: boolean
          platform?: string
          published?: boolean
          title: string
          url: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_live?: boolean
          platform?: string
          published?: boolean
          title?: string
          url?: string
        }
        Relationships: []
      }
      news_posts: {
        Row: {
          author: string
          body: string
          category: string
          created_at: string
          excerpt: string
          id: string
          image_url: string | null
          published: boolean
          slug: string
          title: string
        }
        Insert: {
          author?: string
          body?: string
          category?: string
          created_at?: string
          excerpt?: string
          id?: string
          image_url?: string | null
          published?: boolean
          slug: string
          title: string
        }
        Update: {
          author?: string
          body?: string
          category?: string
          created_at?: string
          excerpt?: string
          id?: string
          image_url?: string | null
          published?: boolean
          slug?: string
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          username?: string | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          category: string
          created_at: string
          details: string
          email: string | null
          id: string
          location: string | null
          media_kind: string | null
          media_urls: string[]
          phone: string | null
          reporter_name: string
          status: string
          title: string
        }
        Insert: {
          category?: string
          created_at?: string
          details: string
          email?: string | null
          id?: string
          location?: string | null
          media_kind?: string | null
          media_urls?: string[]
          phone?: string | null
          reporter_name: string
          status?: string
          title: string
        }
        Update: {
          category?: string
          created_at?: string
          details?: string
          email?: string | null
          id?: string
          location?: string | null
          media_kind?: string | null
          media_urls?: string[]
          phone?: string | null
          reporter_name?: string
          status?: string
          title?: string
        }
        Relationships: []
      }
      show_posts: {
        Row: {
          category: string
          created_at: string
          days: string
          description: string
          host: string
          id: string
          image_url: string | null
          language: string
          name: string
          published: boolean
          slug: string
          time_slot: string
        }
        Insert: {
          category?: string
          created_at?: string
          days?: string
          description?: string
          host?: string
          id?: string
          image_url?: string | null
          language?: string
          name: string
          published?: boolean
          slug: string
          time_slot?: string
        }
        Update: {
          category?: string
          created_at?: string
          days?: string
          description?: string
          host?: string
          id?: string
          image_url?: string | null
          language?: string
          name?: string
          published?: boolean
          slug?: string
          time_slot?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
