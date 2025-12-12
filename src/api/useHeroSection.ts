import { useState, useEffect } from 'react'
import { db } from '../lib/supabase'
import type { HeroSection } from '../types/database.types'

interface UseHeroSectionReturn {
  data: HeroSection | null
  loading: boolean
  error: Error | null
}

/**
 * Hook to fetch hero section data
 */
export const useHeroSection = (): UseHeroSectionReturn => {
  const [data, setData] = useState<HeroSection | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchHeroSection = async () => {
      try {
        setLoading(true)
        const { data: heroData, error: heroError } = await db.heroSection()

        if (heroError) throw heroError
        setData(heroData)
      } catch (err) {
        setError(err as Error)
        console.error('Error fetching hero section:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchHeroSection()
  }, [])

  return { data, loading, error }
}
