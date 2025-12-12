import { useState, useEffect } from 'react'
import { db } from '../lib/supabase'
import type { CivilWorksSection, CivilWorksFeature, Stat } from '../types/database.types'

interface UseCivilWorksReturn {
  section: CivilWorksSection | null
  features: CivilWorksFeature[]
  stats: Stat[]
  loading: boolean
  error: Error | null
}

/**
 * Hook to fetch civil works section data
 */
export const useCivilWorks = (): UseCivilWorksReturn => {
  const [section, setSection] = useState<CivilWorksSection | null>(null)
  const [features, setFeatures] = useState<CivilWorksFeature[]>([])
  const [stats, setStats] = useState<Stat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchCivilWorks = async () => {
      try {
        setLoading(true)

        // Fetch civil works section, features, and stats in parallel
        const [sectionResult, featuresResult, statsResult] = await Promise.all([
          db.civilWorksSection(),
          db.civilWorksFeatures(),
          db.stats('civil_works'),
        ])

        if (sectionResult.error) throw sectionResult.error
        if (featuresResult.error) throw featuresResult.error
        if (statsResult.error) throw statsResult.error

        setSection(sectionResult.data)
        setFeatures(featuresResult.data || [])
        setStats(statsResult.data || [])
      } catch (err) {
        setError(err as Error)
        console.error('Error fetching civil works:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCivilWorks()
  }, [])

  return { section, features, stats, loading, error }
}
