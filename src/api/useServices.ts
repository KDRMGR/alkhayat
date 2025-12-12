import { useState, useEffect } from 'react'
import { db } from '../lib/supabase'
import type { Service, ServiceItem } from '../types/database.types'

interface ServiceWithItems extends Service {
  service_items: ServiceItem[]
}

interface UseServicesReturn {
  data: ServiceWithItems[]
  loading: boolean
  error: Error | null
}

/**
 * Hook to fetch services with their service items
 */
export const useServices = (): UseServicesReturn => {
  const [data, setData] = useState<ServiceWithItems[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        const { data: servicesData, error: servicesError } = await db.services()

        if (servicesError) throw servicesError
        setData(servicesData || [])
      } catch (err) {
        setError(err as Error)
        console.error('Error fetching services:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  return { data, loading, error }
}
