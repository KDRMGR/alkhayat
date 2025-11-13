import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Settings } from 'lucide-react'

export default function AdminSettings() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    company_name: '',
    company_tagline: '',
    logo_url: '',
    commercial_registration: '',
    founded_year: 2011,
    vision_statement: '',
    copyright_text: '',
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single()

      if (error) throw error
      if (data) {
        setFormData({
          company_name: data.company_name || '',
          company_tagline: data.company_tagline || '',
          logo_url: data.logo_url || '',
          commercial_registration: data.commercial_registration || '',
          founded_year: data.founded_year || 2011,
          vision_statement: data.vision_statement || '',
          copyright_text: data.copyright_text || '',
        })
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const { error } = await supabase
        .from('site_settings')
        .update(formData as any)
        .eq('id', (await supabase.from('site_settings').select('id').single()).data?.id)

      if (error) throw error
      alert('Settings saved successfully!')
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Error saving settings')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
        <p className="text-gray-600 mt-2">Manage global site settings</p>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="w-6 h-6 text-green-600" />
          <h2 className="text-lg font-semibold text-gray-900">General Information</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
              <input
                type="text"
                required
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Tagline</label>
              <input
                type="text"
                value={formData.company_tagline}
                onChange={(e) => setFormData({ ...formData, company_tagline: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
              <input
                type="text"
                value={formData.logo_url}
                onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Founded Year</label>
              <input
                type="number"
                value={formData.founded_year}
                onChange={(e) => setFormData({ ...formData, founded_year: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Commercial Registration</label>
              <input
                type="text"
                value={formData.commercial_registration}
                onChange={(e) => setFormData({ ...formData, commercial_registration: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Vision Statement</label>
              <input
                type="text"
                value={formData.vision_statement}
                onChange={(e) => setFormData({ ...formData, vision_statement: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Copyright Text</label>
            <input
              type="text"
              value={formData.copyright_text}
              onChange={(e) => setFormData({ ...formData, copyright_text: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-gradient-to-r from-green-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </form>
      </div>
    </div>
  )
}
