import { useState, useEffect } from 'react'
import { db } from '../lib/supabase'
import type { ContactInfo } from '../types/database.types'

interface UseContactInfoReturn {
  data: ContactInfo | null
  loading: boolean
  error: Error | null
}

/**
 * Hook to fetch contact info data
 */
export const useContactInfo = (): UseContactInfoReturn => {
  const [data, setData] = useState<ContactInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setLoading(true)
        const { data: contactData, error: contactError } = await db.contactInfo()

        if (contactError) throw contactError
        setData(contactData)
      } catch (err) {
        setError(err as Error)
        console.error('Error fetching contact info:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchContactInfo()
  }, [])

  return { data, loading, error }
}
