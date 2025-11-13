import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { FormSubmission } from '../types/database.types'
import { Trash2, Mail, Check } from 'lucide-react'

export default function AdminMessages() {
  const [messages, setMessages] = useState<FormSubmission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setMessages(data || [])
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('form_submissions')
        .update({ is_read: true })
        .eq('id', id)

      if (error) throw error
      fetchMessages()
    } catch (error) {
      console.error('Error marking as read:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return
    try {
      const { error } = await supabase.from('form_submissions').delete().eq('id', id)
      if (error) throw error
      fetchMessages()
    } catch (error) {
      console.error('Error deleting message:', error)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-600 mt-2">Contact form submissions</p>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`bg-white rounded-xl p-6 border ${message.is_read ? 'border-gray-200' : 'border-green-300 bg-green-50/50'}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-cyan-600 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{message.name}</h3>
                  <p className="text-sm text-gray-600">{message.email}</p>
                  {message.phone && <p className="text-sm text-gray-600">{message.phone}</p>}
                </div>
              </div>
              <div className="flex gap-2">
                {!message.is_read && (
                  <button
                    onClick={() => markAsRead(message.id)}
                    className="text-green-600 hover:text-green-800"
                    title="Mark as read"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button onClick={() => handleDelete(message.id)} className="text-red-600 hover:text-red-800">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-gray-700 mb-3">{message.message}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{new Date(message.created_at).toLocaleString()}</span>
              {!message.is_read && <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">New</span>}
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-200">
            No messages yet.
          </div>
        )}
      </div>
    </div>
  )
}
