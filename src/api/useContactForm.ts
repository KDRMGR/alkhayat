import { useState } from 'react'
import { db } from '../lib/supabase'

interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
}

interface UseContactFormReturn {
  submit: (data: ContactFormData) => Promise<void>
  loading: boolean
  error: Error | null
  success: boolean
  reset: () => void
}

/**
 * Hook to handle contact form submissions
 */
export const useContactForm = (): UseContactFormReturn => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [success, setSuccess] = useState(false)

  const submit = async (formData: ContactFormData) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      const { error: submitError } = await db.submitContactForm(formData)

      if (submitError) throw submitError

      setSuccess(true)
    } catch (err) {
      setError(err as Error)
      console.error('Error submitting contact form:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setError(null)
    setSuccess(false)
    setLoading(false)
  }

  return { submit, loading, error, success, reset }
}
