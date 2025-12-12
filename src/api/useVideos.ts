import { useState, useEffect } from 'react'
import { db } from '../lib/supabase'
import type { Video } from '../types/database.types'

interface UseVideosReturn {
  data: Video[]
  loading: boolean
  error: Error | null
}

/**
 * Hook to fetch videos data
 * @param category - Optional category filter
 */
export const useVideos = (category?: string): UseVideosReturn => {
  const [data, setData] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true)
        const { data: videosData, error: videosError } = await db.videos(category)

        if (videosError) throw videosError
        setData(videosData || [])
      } catch (err) {
        setError(err as Error)
        console.error('Error fetching videos:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [category])

  return { data, loading, error }
}
