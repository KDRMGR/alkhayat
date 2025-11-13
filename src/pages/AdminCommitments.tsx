import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Edit2, Trash2, Plus } from 'lucide-react'

export default function AdminCommitments() {
  const [loading, setLoading] = useState(true)
  const [commitments, setCommitments] = useState<any[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ title: '', description: '', icon_name: '' })

  useEffect(() => {
    fetchCommitments()
  }, [])

  const fetchCommitments = async () => {
    try {
      const { data, error } = await supabase
        .from('commitments')
        .select('*')
        .order('display_order')

      if (error) throw error
      setCommitments(data || [])
    } catch (error) {
      console.error('Error fetching commitments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        const { error } = await supabase
          .from('commitments')
          .update(formData as any)
          .eq('id', editingId)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('commitments')
          .insert([{ ...formData, display_order: commitments.length + 1 }] as any)
        if (error) throw error
      }
      setEditingId(null)
      setFormData({ title: '', description: '', icon_name: '' })
      fetchCommitments()
    } catch (error) {
      console.error('Error saving commitment:', error)
      alert('Error saving commitment')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this commitment?')) return
    try {
      const { error } = await supabase.from('commitments').delete().eq('id', id)
      if (error) throw error
      fetchCommitments()
    } catch (error) {
      console.error('Error deleting commitment:', error)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Commitments</h1>
        <p className="text-gray-600 mt-2">Manage company commitments</p>
      </div>

      {/* Add/Edit Form */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {editingId ? 'Edit' : 'Add'} Commitment
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Icon Name (Lucide React icon name)
            </label>
            <input
              type="text"
              value={formData.icon_name}
              onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
              placeholder="e.g., Shield, Heart, CheckCircle"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Optional: Enter a Lucide React icon name (e.g., Shield, Heart, CheckCircle)
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              {editingId ? 'Update' : 'Add'} Commitment
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null)
                  setFormData({ title: '', description: '', icon_name: '' })
                }}
                className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Commitments List */}
      <div className="space-y-4">
        {commitments.map((commitment) => (
          <div key={commitment.id} className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{commitment.title}</h3>
                  {commitment.icon_name && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {commitment.icon_name}
                    </span>
                  )}
                </div>
                <p className="text-gray-700">{commitment.description}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => {
                    setEditingId(commitment.id)
                    setFormData({
                      title: commitment.title,
                      description: commitment.description,
                      icon_name: commitment.icon_name || '',
                    })
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(commitment.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {commitments.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-200">
            No commitments yet. Add your first commitment above.
          </div>
        )}
      </div>
    </div>
  )
}
