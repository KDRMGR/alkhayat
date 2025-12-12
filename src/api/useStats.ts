import { useState, useEffect } from 'react'
import { db } from '../lib/supabase'
import type { Stat } from '../types/database.types'

interface UseStatsReturn {
  data: Stat[]
  loading: boolean
  error: Error | null
}

/**
 * Hook to fetch stats data
 * @param section - Optional section filter ('animated_stats' or 'civil_works')
 */
export const useStats = (section?: string): UseStatsReturn => {
  const [data, setData] = useState<Stat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const { data: statsData, error: statsError } = await db.stats(section)

        if (statsError) throw statsError
        setData(statsData || [])
      } catch (err) {
        setError(err as Error)
        console.error('Error fetching stats:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [section])

  return { data, loading, error }
}
