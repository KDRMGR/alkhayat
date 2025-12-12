import { useState, useEffect } from 'react'
import { db } from '../lib/supabase'
import type { Feature } from '../types/database.types'

interface UseFeaturesReturn {
  data: Feature[]
  loading: boolean
  error: Error | null
}

/**
 * Hook to fetch features data (Interactive Showcase)
 */
export const useFeatures = (): UseFeaturesReturn => {
  const [data, setData] = useState<Feature[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        setLoading(true)
        const { data: featuresData, error: featuresError } = await db.features()

        if (featuresError) throw featuresError
        setData(featuresData || [])
      } catch (err) {
        setError(err as Error)
        console.error('Error fetching features:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchFeatures()
  }, [])

  return { data, loading, error }
}
