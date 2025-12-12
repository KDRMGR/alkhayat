import { useState, useEffect } from 'react'
import { db } from '../lib/supabase'
import type { FAQ } from '../types/database.types'

interface UseFAQsReturn {
  data: FAQ[]
  loading: boolean
  error: Error | null
}

/**
 * Hook to fetch FAQs data
 */
export const useFAQs = (): UseFAQsReturn => {
  const [data, setData] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true)
        const { data: faqsData, error: faqsError } = await db.faqs()

        if (faqsError) throw faqsError
        setData(faqsData || [])
      } catch (err) {
        setError(err as Error)
        console.error('Error fetching FAQs:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchFAQs()
  }, [])

  return { data, loading, error }
}
