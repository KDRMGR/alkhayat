import { useState, useEffect } from 'react'
import { db } from '../lib/supabase'
import type { CoreValue } from '../types/database.types'

interface UseCoreValuesReturn {
  data: CoreValue[]
  loading: boolean
  error: Error | null
}

/**
 * Hook to fetch core values data
 */
export const useCoreValues = (): UseCoreValuesReturn => {
  const [data, setData] = useState<CoreValue[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchCoreValues = async () => {
      try {
        setLoading(true)
        const { data: coreValuesData, error: coreValuesError } = await db.coreValues()

        if (coreValuesError) throw coreValuesError
        setData(coreValuesData || [])
      } catch (err) {
        setError(err as Error)
        console.error('Error fetching core values:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCoreValues()
  }, [])

  return { data, loading, error }
}
