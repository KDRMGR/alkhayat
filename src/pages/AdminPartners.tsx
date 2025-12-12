import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Partner } from '../types/database.types'
import { Edit2, Trash2, Eye, EyeOff } from 'lucide-react'

export default function AdminPartners() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', logo_url: '', website_url: '', is_active: true })

  useEffect(() => {
    fetchPartners()
  }, [])

  const fetchPartners = async () => {
    try {
      const { data, error } = await supabase.from('partners').select('*').order('display_order')
      if (error) throw error
      setPartners(data || [])
    } catch (error) {
      console.error('Error fetching partners:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        const { error } = await supabase.from('partners').update(formData).eq('id', editingId)
        if (error) throw error
      } else {
        const { error } = await supabase.from('partners').insert([{ ...formData, display_order: partners.length + 1 }])
        if (error) throw error
      }
      setEditingId(null)
      setFormData({ name: '', logo_url: '', website_url: '', is_active: true })
      fetchPartners()
    } catch (error) {
      console.error('Error saving partner:', error)
      alert('Error saving partner')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return
    try {
      const { error } = await supabase.from('partners').delete().eq('id', id)
      if (error) throw error
      fetchPartners()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Partners</h1>
        <p className="text-gray-600 mt-2">Manage partner companies</p>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{editingId ? 'Edit' : 'Add'} Partner</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
              <input type="text" value={formData.logo_url} onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
              <input type="text" value={formData.website_url} onChange={(e) => setFormData({ ...formData, website_url: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="px-6 py-2 bg-gradient-to-r from-green-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">{editingId ? 'Update' : 'Add'} Partner</button>
            {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({ name: '', logo_url: '', website_url: '', is_active: true }) }} className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg">Cancel</button>}
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {partners.map((partner) => (
          <div key={partner.id} className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900">{partner.name}</h3>
              <div className="flex gap-2">
                <button onClick={() => { setEditingId(partner.id); setFormData({ name: partner.name, logo_url: partner.logo_url || '', website_url: partner.website_url || '', is_active: partner.is_active }) }} className="text-blue-600 hover:text-blue-800"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(partner.id)} className="text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            {partner.website_url && <p className="text-sm text-gray-600 truncate">{partner.website_url}</p>}
            <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs ${partner.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{partner.is_active ? 'Active' : 'Inactive'}</span>
          </div>
        ))}
        {partners.length === 0 && <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-200">No partners yet.</div>}
      </div>
    </div>
  )
}
