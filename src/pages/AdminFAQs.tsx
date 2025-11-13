import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { FAQ } from '../types/database.types'
import { Edit2, Trash2, Eye, EyeOff } from 'lucide-react'

export default function AdminFAQs() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    is_published: true,
  })

  useEffect(() => {
    fetchFAQs()
  }, [])

  const fetchFAQs = async () => {
    try {
      const { data, error } = await supabase.from('faqs').select('*').order('display_order')
      if (error) throw error
      setFaqs(data || [])
    } catch (error) {
      console.error('Error fetching FAQs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        const { error } = await supabase.from('faqs').update(formData).eq('id', editingId)
        if (error) throw error
      } else {
        const { error } = await supabase.from('faqs').insert([{ ...formData, display_order: faqs.length + 1 }])
        if (error) throw error
      }
      resetForm()
      fetchFAQs()
    } catch (error) {
      console.error('Error saving FAQ:', error)
      alert('Error saving FAQ')
    }
  }

  const handleEdit = (faq: FAQ) => {
    setEditingId(faq.id)
    setFormData({ question: faq.question, answer: faq.answer, is_published: faq.is_published })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return
    try {
      const { error } = await supabase.from('faqs').delete().eq('id', id)
      if (error) throw error
      fetchFAQs()
    } catch (error) {
      console.error('Error deleting FAQ:', error)
    }
  }

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase.from('faqs').update({ is_published: !currentStatus }).eq('id', id)
      if (error) throw error
      fetchFAQs()
    } catch (error) {
      console.error('Error toggling publish:', error)
    }
  }

  const resetForm = () => {
    setEditingId(null)
    setFormData({ question: '', answer: '', is_published: true })
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">FAQs</h1>
        <p className="text-gray-600 mt-2">Manage frequently asked questions</p>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{editingId ? 'Edit FAQ' : 'Add New FAQ'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Question *</label>
            <input
              type="text"
              required
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Answer *</label>
            <textarea
              required
              rows={4}
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="faq_published"
              checked={formData.is_published}
              onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
              className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="faq_published" className="text-sm text-gray-700">Publish immediately</label>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="px-6 py-2 bg-gradient-to-r from-green-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
              {editingId ? 'Update FAQ' : 'Add FAQ'}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600 mb-3">{faq.answer}</p>
                <span className={`px-2 py-1 rounded-full text-xs ${faq.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                  {faq.is_published ? 'Published' : 'Draft'}
                </span>
              </div>
              <div className="flex gap-2 ml-4">
                <button onClick={() => togglePublish(faq.id, faq.is_published)} className="text-gray-400 hover:text-gray-600">
                  {faq.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button onClick={() => handleEdit(faq)} className="text-blue-600 hover:text-blue-800">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(faq.id)} className="text-red-600 hover:text-red-800">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {faqs.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-200">
            No FAQs yet.
          </div>
        )}
      </div>
    </div>
  )
}
