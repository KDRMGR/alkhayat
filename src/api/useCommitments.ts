import { useState, useEffect } from 'react'
import { db } from '../lib/supabase'
import type { Commitment } from '../types/database.types'

interface UseCommitmentsReturn {
  data: Commitment[]
  loading: boolean
  error: Error | null
}

/**
 * Hook to fetch commitments data
 */
export const useCommitments = (): UseCommitmentsReturn => {
  const [data, setData] = useState<Commitment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchCommitments = async () => {
      try {
        setLoading(true)
        const { data: commitmentsData, error: commitmentsError } = await db.commitments()

        if (commitmentsError) throw commitmentsError
        setData(commitmentsData || [])
      } catch (err) {
        setError(err as Error)
        console.error('Error fetching commitments:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCommitments()
  }, [])

  return { data, loading, error }
}
