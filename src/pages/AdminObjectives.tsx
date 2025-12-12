import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Edit2, Trash2, Plus } from 'lucide-react'

export default function AdminObjectives() {
  const [loading, setLoading] = useState(true)
  const [objectives, setObjectives] = useState<any[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ title: '', description: '', icon_name: '' })

  useEffect(() => {
    fetchObjectives()
  }, [])

  const fetchObjectives = async () => {
    try {
      const { data, error } = await supabase
        .from('objectives')
        .select('*')
        .order('display_order')

      if (error) throw error
      setObjectives(data || [])
    } catch (error) {
      console.error('Error fetching objectives:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        const { error } = await supabase
          .from('objectives')
          .update(formData as any)
          .eq('id', editingId)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('objectives')
          .insert([{ ...formData, display_order: objectives.length + 1 }] as any)
        if (error) throw error
      }
      setEditingId(null)
      setFormData({ title: '', description: '', icon_name: '' })
      fetchObjectives()
    } catch (error) {
      console.error('Error saving objective:', error)
      alert('Error saving objective')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this objective?')) return
    try {
      const { error } = await supabase.from('objectives').delete().eq('id', id)
      if (error) throw error
      fetchObjectives()
    } catch (error) {
      console.error('Error deleting objective:', error)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Objectives</h1>
        <p className="text-gray-600 mt-2">Manage company objectives</p>
      </div>

      {/* Add/Edit Form */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {editingId ? 'Edit' : 'Add'} Objective
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
              placeholder="e.g., Target, Award, Lightbulb"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Optional: Enter a Lucide React icon name (e.g., Target, Award, Lightbulb)
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              {editingId ? 'Update' : 'Add'} Objective
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

      {/* Objectives List */}
      <div className="space-y-4">
        {objectives.map((objective) => (
          <div key={objective.id} className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{objective.title}</h3>
                  {objective.icon_name && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {objective.icon_name}
                    </span>
                  )}
                </div>
                <p className="text-gray-700">{objective.description}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => {
                    setEditingId(objective.id)
                    setFormData({
                      title: objective.title,
                      description: objective.description,
                      icon_name: objective.icon_name || '',
                    })
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(objective.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {objectives.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-200">
            No objectives yet. Add your first objective above.
          </div>
        )}
      </div>
    </div>
  )
}
