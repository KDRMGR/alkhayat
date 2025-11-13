import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function AdminContact() {
  const [loading, setLoading] = useState(true)
  const [contactId, setContactId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    phone_primary: '',
    phone_secondary: '',
    email: '',
    address: '',
    map_coordinates: '',
  })

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
        setFormData({
          phone_primary: data.phone_primary || '',
          phone_secondary: data.phone_secondary || '',
          email: data.email || '',
          address: data.address || '',
          map_coordinates: data.map_coordinates || '',
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
    try {
      if (contactId) {
        const { error } = await supabase
          .from('contact_info')
          .update(formData as any)
          .eq('id', contactId)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('contact_info')
          .insert([formData] as any)
        if (error) throw error
      }
      alert('Contact information saved successfully!')
      fetchContactInfo()
    } catch (error) {
      console.error('Error saving contact info:', error)
      alert('Error saving contact information')
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Contact Information</h1>
        <p className="text-gray-600 mt-2">Manage company contact details</p>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="info@company.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Map Coordinates
            </label>
            <input
              type="text"
              value={formData.map_coordinates}
              onChange={(e) => setFormData({ ...formData, map_coordinates: e.target.value })}
              placeholder="latitude,longitude (e.g., 24.7136,46.6753)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Optional: Enter coordinates as latitude,longitude for map integration
            </p>
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-green-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            Save Contact Information
          </button>
        </form>
      </div>
    </div>
  )
}
