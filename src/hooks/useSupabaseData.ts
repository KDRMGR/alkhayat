import { useState, useEffect } from 'react'
import { isSupabaseConfigured } from '../lib/supabase'

/**
 * Custom hook to fetch data from Supabase with loading and error states
 * Falls back gracefully when Supabase is not configured
 */
export function useSupabaseData<T>(
  fetchFunction: () => Promise<{ data: T | null; error: any }>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Skip if Supabase is not configured
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await fetchFunction()

        if (result.error) {
          console.error('Supabase query error:', result.error)
          setError(result.error.message || 'Failed to fetch data')
        } else {
          setData(result.data)
        }
      } catch (err) {
        console.error('Error fetching data:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, dependencies)

  return { data, loading, error, isConfigured: isSupabaseConfigured }
}
