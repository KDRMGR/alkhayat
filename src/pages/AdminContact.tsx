import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Plus, Trash2 } from 'lucide-react'

export default function AdminContact() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [contactId, setContactId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    phone_primary: '',
    phone_secondary: '',
    email: '',
    address: '',
  })
  const [emailList, setEmailList] = useState<string[]>(['']) // Array of emails

  useEffect(() => {
    fetchContactInfo()
  }, [])

  const fetchContactInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .single()

      if (error) throw error
      if (data) {
        setContactId(data.id)

        // Split emails by comma if multiple exist
        const emails = data.email ? data.email.split(',').map(e => e.trim()).filter(e => e) : ['']
        setEmailList(emails.length > 0 ? emails : [''])

        setFormData({
          phone_primary: data.phone_primary || '',
          phone_secondary: data.phone_secondary || '',
          email: data.email || '',
          address: data.address || '',
        })
      }
    } catch (error) {
      console.error('Error fetching contact info:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setSaving(true)

    // Filter out empty emails and validate format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const validEmails = emailList.filter(email => email.trim() !== '')

    // Validate at least one email
    if (validEmails.length === 0) {
      setError('Please enter at least one email address')
      setSaving(false)
      return
    }

    // Validate each email format
    for (const email of validEmails) {
      if (!emailRegex.test(email)) {
        setError(`Invalid email format: ${email}`)
        setSaving(false)
        return
      }
    }

    // Combine emails into comma-separated string
    const combinedEmail = validEmails.join(', ')

    try {
      const dataToSave = {
        ...formData,
        email: combinedEmail
      }

      if (contactId) {
        const { error: updateError } = await supabase
          .from('contact_info')
          .update(dataToSave as any)
          .eq('id', contactId)
        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase
          .from('contact_info')
          .insert([dataToSave] as any)
        if (insertError) throw insertError
      }
      setSuccess('Contact information saved successfully!')
      fetchContactInfo()
    } catch (err) {
      console.error('Error saving contact info:', err)
      setError(err instanceof Error ? err.message : 'Error saving contact information')
    } finally {
      setSaving(false)
    }
  }

  const addEmail = () => {
    setEmailList([...emailList, ''])
  }

  const removeEmail = (index: number) => {
    if (emailList.length > 1) {
      const newList = emailList.filter((_, i) => i !== index)
      setEmailList(newList)
    }
  }

  const updateEmail = (index: number, value: string) => {
    const newList = [...emailList]
    newList[index] = value
    setEmailList(newList)
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Contact Information</h1>
        <p className="text-gray-600 mt-2">Manage company contact details</p>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        {/* Success Message */}
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-600">{success}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Phone *
              </label>
              <input
                type="text"
                required
                value={formData.phone_primary}
                onChange={(e) => setFormData({ ...formData, phone_primary: e.target.value })}
                placeholder="+966 XXX XXX XXX"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Phone
              </label>
              <input
                type="text"
                value={formData.phone_secondary}
                onChange={(e) => setFormData({ ...formData, phone_secondary: e.target.value })}
                placeholder="+966 XXX XXX XXX"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Email Addresses *</label>
              <button
                type="button"
                onClick={addEmail}
                className="flex items-center gap-1 px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Email
              </button>
            </div>
            <div className="space-y-2">
              {emailList.map((email, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="email"
                    required={index === 0}
                    value={email}
                    onChange={(e) => updateEmail(index, e.target.value)}
                    placeholder={`email${index + 1}@company.com`}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  />
                  {emailList.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEmail(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove email"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Add multiple email addresses for your company contact
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
            <textarea
              required
              rows={3}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Street address, City, Postal Code, Country"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-gradient-to-r from-green-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Contact Information'}
          </button>
        </form>
      </div>
    </div>
  )
}
