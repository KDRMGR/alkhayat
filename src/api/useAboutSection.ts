import { useState, useEffect } from 'react'
import { db } from '../lib/supabase'
import type { AboutSection, Highlight, Achievement, BottomFeature } from '../types/database.types'

interface UseAboutSectionReturn {
  about: AboutSection | null
  highlights: Highlight[]
  achievements: Achievement[]
  bottomFeatures: BottomFeature[]
  loading: boolean
  error: Error | null
}

/**
 * Hook to fetch all About section data
 */
export const useAboutSection = (): UseAboutSectionReturn => {
  const [about, setAbout] = useState<AboutSection | null>(null)
  const [highlights, setHighlights] = useState<Highlight[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [bottomFeatures, setBottomFeatures] = useState<BottomFeature[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true)

        // Fetch all about-related data in parallel
        const [aboutResult, highlightsResult, achievementsResult, bottomFeaturesResult] = await Promise.all([
          db.aboutSection(),
          db.highlights(),
          db.achievements(),
          db.bottomFeatures(),
        ])

        if (aboutResult.error) throw aboutResult.error
        if (highlightsResult.error) throw highlightsResult.error
        if (achievementsResult.error) throw achievementsResult.error
        if (bottomFeaturesResult.error) throw bottomFeaturesResult.error

        setAbout(aboutResult.data)
        setHighlights(highlightsResult.data || [])
        setAchievements(achievementsResult.data || [])
        setBottomFeatures(bottomFeaturesResult.data || [])
      } catch (err) {
        setError(err as Error)
        console.error('Error fetching about section:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAboutData()
  }, [])

  return { about, highlights, achievements, bottomFeatures, loading, error }
}
