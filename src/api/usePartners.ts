import { useState, useEffect } from 'react'
import { db } from '../lib/supabase'
import type { Partner } from '../types/database.types'

interface UsePartnersReturn {
  data: Partner[]
  loading: boolean
  error: Error | null
}

/**
 * Hook to fetch partners data
 */
export const usePartners = (): UsePartnersReturn => {
  const [data, setData] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true)
        const { data: partnersData, error: partnersError } = await db.partners()

        if (partnersError) throw partnersError
        setData(partnersData || [])
      } catch (err) {
        setError(err as Error)
        console.error('Error fetching partners:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPartners()
  }, [])

  return { data, loading, error }
}
