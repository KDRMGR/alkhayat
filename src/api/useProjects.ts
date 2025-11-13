import { useState, useEffect } from 'react'
import { db } from '../lib/supabase'
import type { Project } from '../types/database.types'

interface UseProjectsReturn {
  data: Project[]
  loading: boolean
  error: Error | null
}

/**
 * Hook to fetch projects data
 * @param category - Optional category filter
 */
export const useProjects = (category?: string): UseProjectsReturn => {
  const [data, setData] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const { data: projectsData, error: projectsError } = await db.projects(category)

        if (projectsError) throw projectsError
        setData(projectsData || [])
      } catch (err) {
        setError(err as Error)
        console.error('Error fetching projects:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [category])

  return { data, loading, error }
}
