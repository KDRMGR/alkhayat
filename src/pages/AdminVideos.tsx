import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Video } from '../types/database.types'
import { Edit2, Trash2, Eye, EyeOff } from 'lucide-react'

export default function AdminVideos() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    youtube_id: '',
    category: '',
    thumbnail_gradient: 'from-green-600 to-cyan-600',
    is_published: true,
  })

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('display_order')

      if (error) throw error
      setVideos(data || [])
    } catch (error) {
      console.error('Error fetching videos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingId) {
        const { error } = await supabase
          .from('videos')
          .update(formData)
          .eq('id', editingId)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('videos')
          .insert([{ ...formData, display_order: videos.length + 1 }])

        if (error) throw error
      }

      resetForm()
      fetchVideos()
    } catch (error) {
      console.error('Error saving video:', error)
      alert('Error saving video')
    }
  }

  const handleEdit = (video: Video) => {
    setEditingId(video.id)
    setFormData({
      title: video.title,
      description: video.description,
      youtube_id: video.youtube_id,
      category: video.category,
      thumbnail_gradient: video.thumbnail_gradient,
      is_published: video.is_published,
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return

    try {
      const { error } = await supabase.from('videos').delete().eq('id', id)
      if (error) throw error
      fetchVideos()
    } catch (error) {
      console.error('Error deleting video:', error)
    }
  }

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const { error} = await supabase
        .from('videos')
        .update({ is_published: !currentStatus })
        .eq('id', id)

      if (error) throw error
      fetchVideos()
    } catch (error) {
      console.error('Error toggling publish:', error)
    }
  }

  const resetForm = () => {
    setEditingId(null)
    setFormData({
      title: '',
      description: '',
      youtube_id: '',
      category: '',
      thumbnail_gradient: 'from-green-600 to-cyan-600',
      is_published: true,
    })
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Videos</h1>
        <p className="text-gray-600 mt-2">Manage video gallery</p>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {editingId ? 'Edit Video' : 'Add New Video'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">YouTube ID *</label>
              <input
                type="text"
                required
                value={formData.youtube_id}
                onChange={(e) => setFormData({ ...formData, youtube_id: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="dQw4w9WgXcQ"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gradient</label>
              <select
                value={formData.thumbnail_gradient}
                onChange={(e) => setFormData({ ...formData, thumbnail_gradient: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              >
                <option value="from-green-600 to-cyan-600">Green to Cyan</option>
                <option value="from-blue-600 to-cyan-600">Blue to Cyan</option>
                <option value="from-cyan-600 to-green-600">Cyan to Green</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              required
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="video_published"
              checked={formData.is_published}
              onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
              className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="video_published" className="text-sm text-gray-700">Publish immediately</label>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="px-6 py-2 bg-gradient-to-r from-green-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
              {editingId ? 'Update Video' : 'Add Video'}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">YouTube ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {videos.map((video) => (
              <tr key={video.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{video.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600 font-mono">{video.youtube_id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">{video.category}</span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${video.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {video.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-sm space-x-2">
                  <button onClick={() => togglePublish(video.id, video.is_published)} className="text-gray-400 hover:text-gray-600">
                    {video.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button onClick={() => handleEdit(video)} className="text-blue-600 hover:text-blue-800">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(video.id)} className="text-red-600 hover:text-red-800">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {videos.length === 0 && <div className="text-center py-12 text-gray-500">No videos yet.</div>}
      </div>
    </div>
  )
}
