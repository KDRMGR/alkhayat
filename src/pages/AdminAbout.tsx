import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Edit2, Trash2, Plus } from 'lucide-react'

export default function AdminAbout() {
  const [loading, setLoading] = useState(true)
  const [about, setAbout] = useState<any>(null)
  const [highlights, setHighlights] = useState<any[]>([])
  const [editingHighlight, setEditingHighlight] = useState<string | null>(null)
  const [highlightForm, setHighlightForm] = useState({ title: '' })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [aboutRes, highlightsRes] = await Promise.all([
        supabase.from('about_section').select('*').single(),
        supabase.from('highlights').select('*').order('display_order'),
      ])

      if (aboutRes.data) setAbout(aboutRes.data)
      if (highlightsRes.data) setHighlights(highlightsRes.data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveAbout = async () => {
    try {
      const { error } = await supabase
        .from('about_section')
        .update(about as any)
        .eq('id', about.id)

      if (error) throw error
      alert('About section saved!')
    } catch (error) {
      console.error('Error:', error)
      alert('Error saving')
    }
  }

  const saveHighlight = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingHighlight) {
        const { error } = await supabase
          .from('highlights')
          .update(highlightForm as any)
          .eq('id', editingHighlight)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('highlights')
          .insert([{ ...highlightForm, display_order: highlights.length + 1 }] as any)
        if (error) throw error
      }
      setEditingHighlight(null)
      setHighlightForm({ title: '' })
      fetchData()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const deleteHighlight = async (id: string) => {
    if (!confirm('Delete?')) return
    try {
      await supabase.from('highlights').delete().eq('id', id)
      fetchData()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">About Section</h1>
        <p className="text-gray-600 mt-2">Manage about page content</p>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">About Content</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Badge Text</label>
            <input
              type="text"
              value={about?.badge_text || ''}
              onChange={(e) => setAbout({ ...about, badge_text: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Main Heading</label>
              <input
                type="text"
                value={about?.main_heading || ''}
                onChange={(e) => setAbout({ ...about, main_heading: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gradient Heading</label>
              <input
                type="text"
                value={about?.gradient_heading || ''}
                onChange={(e) => setAbout({ ...about, gradient_heading: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
            <input
              type="text"
              value={about?.subtitle || ''}
              onChange={(e) => setAbout({ ...about, subtitle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Intro Paragraph</label>
            <textarea
              rows={3}
              value={about?.intro_paragraph || ''}
              onChange={(e) => setAbout({ ...about, intro_paragraph: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none"
            />
          </div>
          <button
            onClick={saveAbout}
            className="px-6 py-2 bg-gradient-to-r from-green-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            Save About Section
          </button>
        </div>
      </div>

      {/* Highlights */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Highlights</h2>
        <form onSubmit={saveHighlight} className="mb-4">
          <div className="flex gap-3">
            <input
              type="text"
              required
              placeholder="Highlight text"
              value={highlightForm.title}
              onChange={(e) => setHighlightForm({ title: e.target.value })}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              {editingHighlight ? 'Update' : <Plus className="w-5 h-5" />}
            </button>
            {editingHighlight && (
              <button
                type="button"
                onClick={() => { setEditingHighlight(null); setHighlightForm({ title: '' }) }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
        <div className="space-y-2">
          {highlights.map((h) => (
            <div key={h.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-900">{h.title}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => { setEditingHighlight(h.id); setHighlightForm({ title: h.title }) }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => deleteHighlight(h.id)} className="text-red-600 hover:text-red-800">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
