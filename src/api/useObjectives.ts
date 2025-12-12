import { useState, useEffect } from 'react'
import { db } from '../lib/supabase'
import type { Objective } from '../types/database.types'

interface UseObjectivesReturn {
  data: Objective[]
  loading: boolean
  error: Error | null
}

/**
 * Hook to fetch objectives data
 */
export const useObjectives = (): UseObjectivesReturn => {
  const [data, setData] = useState<Objective[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchObjectives = async () => {
      try {
        setLoading(true)
        const { data: objectivesData, error: objectivesError } = await db.objectives()

        if (objectivesError) throw objectivesError
        setData(objectivesData || [])
      } catch (err) {
        setError(err as Error)
        console.error('Error fetching objectives:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchObjectives()
  }, [])

  return { data, loading, error }
}
