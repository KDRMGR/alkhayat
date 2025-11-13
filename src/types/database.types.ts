/**
 * Supabase Database Types
 * Auto-generated from database schema
 */

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
      site_settings: {
        Row: {
          id: number
          site_title: string
          site_tagline: string
          logo_url: string | null
          company_name: string
          established_year: number
          commercial_registration: string | null
          vision_statement: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          site_title: string
          site_tagline: string
          logo_url?: string | null
          company_name: string
          established_year: number
          commercial_registration?: string | null
          vision_statement?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          site_title?: string
          site_tagline?: string
          logo_url?: string | null
          company_name?: string
          established_year?: number
          commercial_registration?: string | null
          vision_statement?: string | null
          is_active?: boolean
          updated_at?: string
        }
      }
      hero_section: {
        Row: {
          id: number
          youtube_video_id: string
          main_title: string
          tagline: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          youtube_video_id: string
          main_title: string
          tagline: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          youtube_video_id?: string
          main_title?: string
          tagline?: string
          is_active?: boolean
          updated_at?: string
        }
      }
      about_section: {
        Row: {
          id: number
          title: string
          description: string
          image_url: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          title: string
          description: string
          image_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          description?: string
          image_url?: string | null
          is_active?: boolean
          updated_at?: string
        }
      }
      highlights: {
        Row: {
          id: number
          text: string
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          text: string
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          text?: string
          display_order?: number
          is_active?: boolean
          updated_at?: string
        }
      }
      achievements: {
        Row: {
          id: number
          title: string
          description: string
          icon_name: string
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          title: string
          description: string
          icon_name: string
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          description?: string
          icon_name?: string
          display_order?: number
          is_active?: boolean
          updated_at?: string
        }
      }
      bottom_features: {
        Row: {
          id: number
          title: string
          description: string
          icon_name: string
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          title: string
          description: string
          icon_name: string
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          description?: string
          icon_name?: string
          display_order?: number
          is_active?: boolean
          updated_at?: string
        }
      }
      stats: {
        Row: {
          id: number
          section: string
          icon_name: string
          title: string
          value: number
          suffix: string | null
          color_from: string
          color_to: string
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          section: string
          icon_name: string
          title: string
          value: number
          suffix?: string | null
          color_from?: string
          color_to?: string
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          section?: string
          icon_name?: string
          title?: string
          value?: number
          suffix?: string | null
          color_from?: string
          color_to?: string
          display_order?: number
          is_active?: boolean
          updated_at?: string
        }
      }
      objectives: {
        Row: {
          id: number
          title: string
          description: string
          icon_name: string
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          title: string
          description: string
          icon_name: string
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          description?: string
          icon_name?: string
          display_order?: number
          is_active?: boolean
          updated_at?: string
        }
      }
      commitments: {
        Row: {
          id: number
          title: string
          description: string
          icon_name: string
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          title: string
          description: string
          icon_name: string
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          description?: string
          icon_name?: string
          display_order?: number
          is_active?: boolean
          updated_at?: string
        }
      }
      core_values: {
        Row: {
          id: number
          title: string
          description: string
          icon_name: string
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          title: string
          description: string
          icon_name: string
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          description?: string
          icon_name?: string
          display_order?: number
          is_active?: boolean
          updated_at?: string
        }
      }
      features: {
        Row: {
          id: number
          title: string
          description: string
          icon_name: string
          color_from: string
          color_to: string
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          title: string
          description: string
          icon_name: string
          color_from?: string
          color_to?: string
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          description?: string
          icon_name?: string
          color_from?: string
          color_to?: string
          display_order?: number
          is_active?: boolean
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: number
          title: string
          description: string
          icon_name: string
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          title: string
          description: string
          icon_name: string
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          description?: string
          icon_name?: string
          display_order?: number
          is_active?: boolean
          updated_at?: string
        }
      }
      service_items: {
        Row: {
          id: number
          service_id: number
          item_text: string
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          service_id: number
          item_text: string
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          service_id?: number
          item_text?: string
          display_order?: number
          is_active?: boolean
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: number
          title: string
          location: string
          category: string
          image_url: string | null
          description: string | null
          completion_date: string | null
          client_name: string | null
          display_order: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          title: string
          location: string
          category: string
          image_url?: string | null
          description?: string | null
          completion_date?: string | null
          client_name?: string | null
          display_order?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          location?: string
          category?: string
          image_url?: string | null
          description?: string | null
          completion_date?: string | null
          client_name?: string | null
          display_order?: number
          is_published?: boolean
          updated_at?: string
        }
      }
      videos: {
        Row: {
          id: number
          youtube_id: string
          title: string
          description: string | null
          category: string
          thumbnail_gradient_from: string
          thumbnail_gradient_to: string
          display_order: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          youtube_id: string
          title: string
          description?: string | null
          category: string
          thumbnail_gradient_from?: string
          thumbnail_gradient_to?: string
          display_order?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          youtube_id?: string
          title?: string
          description?: string | null
          category?: string
          thumbnail_gradient_from?: string
          thumbnail_gradient_to?: string
          display_order?: number
          is_published?: boolean
          updated_at?: string
        }
      }
      faqs: {
        Row: {
          id: number
          question: string
          answer: string
          display_order: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          question: string
          answer: string
          display_order?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          question?: string
          answer?: string
          display_order?: number
          is_published?: boolean
          updated_at?: string
        }
      }
      partners: {
        Row: {
          id: number
          name: string
          logo_url: string | null
          website_url: string | null
          description: string | null
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          name: string
          logo_url?: string | null
          website_url?: string | null
          description?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          logo_url?: string | null
          website_url?: string | null
          description?: string | null
          display_order?: number
          is_active?: boolean
          updated_at?: string
        }
      }
      civil_works_section: {
        Row: {
          id: number
          title: string
          subtitle: string
          description: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          title: string
          subtitle: string
          description: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          subtitle?: string
          description?: string
          is_active?: boolean
          updated_at?: string
        }
      }
      civil_works_features: {
        Row: {
          id: number
          feature_text: string
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          feature_text: string
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          feature_text?: string
          display_order?: number
          is_active?: boolean
          updated_at?: string
        }
      }
      contact_info: {
        Row: {
          id: number
          phone_primary: string
          phone_secondary: string | null
          email: string
          address: string
          map_url: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          phone_primary: string
          phone_secondary?: string | null
          email: string
          address: string
          map_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          phone_primary?: string
          phone_secondary?: string | null
          email?: string
          address?: string
          map_url?: string | null
          is_active?: boolean
          updated_at?: string
        }
      }
      form_submissions: {
        Row: {
          id: number
          name: string
          email: string
          phone: string | null
          message: string
          is_read: boolean
          responded_at: string | null
          created_at: string
        }
        Insert: {
          id?: never
          name: string
          email: string
          phone?: string | null
          message: string
          is_read?: boolean
          responded_at?: string | null
          created_at?: string
        }
        Update: {
          name?: string
          email?: string
          phone?: string | null
          message?: string
          is_read?: boolean
          responded_at?: string | null
        }
      }
      media_assets: {
        Row: {
          id: number
          file_name: string
          file_path: string
          file_type: string
          file_size: number
          alt_text: string | null
          used_in_section: string | null
          uploaded_by: string | null
          created_at: string
        }
        Insert: {
          id?: never
          file_name: string
          file_path: string
          file_type: string
          file_size: number
          alt_text?: string | null
          used_in_section?: string | null
          uploaded_by?: string | null
          created_at?: string
        }
        Update: {
          file_name?: string
          file_path?: string
          file_type?: string
          file_size?: number
          alt_text?: string | null
          used_in_section?: string | null
          uploaded_by?: string | null
        }
      }
      audit_log: {
        Row: {
          id: number
          table_name: string
          record_id: number
          action: string
          changed_by: string | null
          changes: Json | null
          created_at: string
        }
        Insert: {
          id?: never
          table_name: string
          record_id: number
          action: string
          changed_by?: string | null
          changes?: Json | null
          created_at?: string
        }
        Update: {
          table_name?: string
          record_id?: number
          action?: string
          changed_by?: string | null
          changes?: Json | null
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
  }
}

// Helper types for easier usage
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]
export type InsertDto<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateDto<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Specific table types for convenience
export type SiteSettings = Tables<'site_settings'>
export type HeroSection = Tables<'hero_section'>
export type AboutSection = Tables<'about_section'>
export type Highlight = Tables<'highlights'>
export type Achievement = Tables<'achievements'>
export type BottomFeature = Tables<'bottom_features'>
export type Stat = Tables<'stats'>
export type Objective = Tables<'objectives'>
export type Commitment = Tables<'commitments'>
export type CoreValue = Tables<'core_values'>
export type Feature = Tables<'features'>
export type Service = Tables<'services'>
export type ServiceItem = Tables<'service_items'>
export type Project = Tables<'projects'>
export type Video = Tables<'videos'>
export type FAQ = Tables<'faqs'>
export type Partner = Tables<'partners'>
export type CivilWorksSection = Tables<'civil_works_section'>
export type CivilWorksFeature = Tables<'civil_works_features'>
export type ContactInfo = Tables<'contact_info'>
export type FormSubmission = Tables<'form_submissions'>
export type MediaAsset = Tables<'media_assets'>
export type AuditLog = Tables<'audit_log'>
