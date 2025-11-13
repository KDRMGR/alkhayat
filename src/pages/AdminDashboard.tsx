import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { FolderKanban, Video, HelpCircle, Users, MessageSquare, TrendingUp } from 'lucide-react'

interface Stats {
  projects: number
  videos: number
  faqs: number
  partners: number
  messages: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    videos: 0,
    faqs: 0,
    partners: 0,
    messages: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [projects, videos, faqs, partners, messages] = await Promise.all([
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('videos').select('*', { count: 'exact', head: true }),
        supabase.from('faqs').select('*', { count: 'exact', head: true }),
        supabase.from('partners').select('*', { count: 'exact', head: true }),
        supabase.from('form_submissions').select('*', { count: 'exact', head: true }),
      ])

      setStats({
        projects: projects.count || 0,
        videos: videos.count || 0,
        faqs: faqs.count || 0,
        partners: partners.count || 0,
        messages: messages.count || 0,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    { name: 'Projects', value: stats.projects, icon: FolderKanban, href: '/admin/projects', color: 'from-blue-600 to-blue-500' },
    { name: 'Videos', value: stats.videos, icon: Video, href: '/admin/videos', color: 'from-purple-600 to-purple-500' },
    { name: 'FAQs', value: stats.faqs, icon: HelpCircle, href: '/admin/faqs', color: 'from-green-600 to-green-500' },
    { name: 'Partners', value: stats.partners, icon: Users, href: '/admin/partners', color: 'from-cyan-600 to-cyan-500' },
    { name: 'Messages', value: stats.messages, icon: MessageSquare, href: '/admin/messages', color: 'from-orange-600 to-orange-500' },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Link
              key={stat.name}
              to={stat.href}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.name}</div>
            </Link>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { label: 'Add New Project', href: '/admin/projects', icon: FolderKanban },
              { label: 'Add New Video', href: '/admin/videos', icon: Video },
              { label: 'Add New FAQ', href: '/admin/faqs', icon: HelpCircle },
              { label: 'Add New Partner', href: '/admin/partners', icon: Users },
            ].map((action) => {
              const Icon = action.icon
              return (
                <Link
                  key={action.label}
                  to={action.href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Icon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{action.label}</span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* System Info */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">System Information</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Database</span>
              <span className="text-green-600 font-semibold">Connected</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Total Content Items</span>
              <span className="text-gray-900 font-semibold">
                {stats.projects + stats.videos + stats.faqs + stats.partners}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Unread Messages</span>
              <span className="text-orange-600 font-semibold">{stats.messages}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
