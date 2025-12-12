/**
 * Supabase Client Configuration
 *
 * This file initializes the Supabase client for database operations.
 * Uses environment variables for secure credential management.
 */

import { createClient } from '@supabase/supabase-js'
import type { Database, InsertDto } from '../types/database.types'

// Validate environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if Supabase is configured
const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)

if (!isSupabaseConfigured) {
  console.warn('⚠️ Supabase environment variables not configured')
  console.warn('The app will work without Supabase, but admin features will be unavailable')
  console.warn('To enable admin features, add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local')
}

// Create typed Supabase client (only if configured)
export const supabase = isSupabaseConfigured
  ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
      db: {
        schema: 'public',
      },
      global: {
        headers: {
          'x-application-name': 'alkhayat-website',
        },
      },
    })
  : null as any // Fallback for when Supabase is not configured

// Export the configuration status so other files can check
export { isSupabaseConfigured }

/**
 * Helper function to check if user is authenticated
 */
export const isAuthenticated = async (): Promise<boolean> => {
  if (!isSupabaseConfigured || !supabase) return false
  const { data: { session } } = await supabase.auth.getSession()
  return !!session
}

/**
 * Helper function to get current user
 */
export const getCurrentUser = async () => {
  if (!isSupabaseConfigured || !supabase) return null
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

/**
 * Sign in with email and password
 */
export const signIn = async (email: string, password: string) => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Please add environment variables.')
  }
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

/**
 * Sign out current user
 */
export const signOut = async () => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Please add environment variables.')
  }
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

/**
 * Type-safe database query helpers
 * Note: These will throw errors if Supabase is not configured
 */
export const db = {
  // Site Settings
  siteSettings: () => {
    if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured')
    return supabase.from('site_settings').select('*').single()
  },

  // Hero Section
  heroSection: () => supabase.from('hero_section').select('*').eq('is_published', true).single(),

  // About Section
  aboutSection: () => supabase.from('about_section').select('*').eq('is_published', true).single(),
  highlights: () => supabase.from('highlights').select('*').eq('is_active', true).order('display_order'),
  achievements: () => supabase.from('achievements').select('*').eq('is_active', true).order('display_order'),
  bottomFeatures: () => supabase.from('bottom_features').select('*').eq('is_active', true).order('display_order'),

  // Stats (can filter by section: 'animated_stats' or 'civil_works')
  stats: (section?: string) => {
    let query = supabase.from('stats').select('*').eq('is_active', true)
    if (section) query = query.eq('section', section)
    return query.order('display_order')
  },

  // Objectives, Commitments, Core Values
  objectives: () => supabase.from('objectives').select('*').eq('is_active', true).order('display_order'),
  commitments: () => supabase.from('commitments').select('*').eq('is_active', true).order('display_order'),
  coreValues: () => supabase.from('core_values').select('*').eq('is_active', true).order('display_order'),

  // Features (Interactive Showcase)
  features: () => supabase.from('features').select('*').eq('is_active', true).order('display_order'),

  // Services
  services: () => supabase.from('services').select('*, service_items(*)').eq('is_active', true).order('display_order'),

  // Projects
  projects: (category?: string) => {
    let query = supabase.from('projects').select('*').eq('is_published', true)
    if (category) query = query.eq('category', category)
    return query.order('display_order')
  },

  // Videos
  videos: (category?: string) => {
    let query = supabase.from('videos').select('*').eq('is_published', true)
    if (category) query = query.eq('category', category)
    return query.order('display_order')
  },

  // FAQs
  faqs: () => supabase.from('faqs').select('*').eq('is_published', true).order('display_order'),

  // Partners
  partners: () => supabase.from('partners').select('*').eq('is_active', true).order('display_order'),

  // Civil Works
  civilWorksSection: () => supabase.from('civil_works_section').select('*').eq('is_published', true).single(),
  civilWorksFeatures: () => supabase.from('civil_works_features').select('*').eq('is_active', true).order('display_order'),

  // Contact Info
  contactInfo: () => supabase.from('contact_info').select('*').single(),

  // Form Submissions (for contact form)
  submitContactForm: (data: InsertDto<'form_submissions'>) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    supabase.from('form_submissions').insert(data as any),
}

export default supabase
