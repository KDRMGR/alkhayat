import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Edit2, Trash2, Plus, ChevronDown, ChevronUp } from 'lucide-react'

export default function AdminServices() {
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState<any[]>([])
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null)
  const [serviceForm, setServiceForm] = useState({ title: '', description: '', icon_name: '' })
  const [expandedService, setExpandedService] = useState<string | null>(null)

  // Service items management
  const [serviceItems, setServiceItems] = useState<Record<string, any[]>>({})
  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const [itemForm, setItemForm] = useState({ title: '', description: '' })
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order')

      if (error) throw error
      setServices(data || [])

      // Fetch service items for all services
      if (data) {
        for (const service of data) {
          await fetchServiceItems(service.id)
        }
      }
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchServiceItems = async (serviceId: string) => {
    try {
      const { data, error } = await supabase
        .from('service_items')
        .select('*')
        .eq('service_id', serviceId)
        .order('display_order')

      if (error) throw error
      setServiceItems(prev => ({ ...prev, [serviceId]: data || [] }))
    } catch (error) {
      console.error('Error fetching service items:', error)
    }
  }

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingServiceId) {
        const { error } = await supabase
          .from('services')
          .update(serviceForm as any)
          .eq('id', editingServiceId)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('services')
          .insert([{ ...serviceForm, display_order: services.length + 1 }] as any)
        if (error) throw error
      }
      setEditingServiceId(null)
      setServiceForm({ title: '', description: '', icon_name: '' })
      fetchServices()
    } catch (error) {
      console.error('Error saving service:', error)
      alert('Error saving service')
    }
  }

  const handleServiceDelete = async (id: string) => {
    if (!confirm('Delete this service? All related service items will also be deleted.')) return
    try {
      const { error } = await supabase.from('services').delete().eq('id', id)
      if (error) throw error
      fetchServices()
    } catch (error) {
      console.error('Error deleting service:', error)
    }
  }

  const handleItemSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!activeServiceId) return

    try {
      if (editingItemId) {
        const { error } = await supabase
          .from('service_items')
          .update(itemForm as any)
          .eq('id', editingItemId)
        if (error) throw error
      } else {
        const currentItems = serviceItems[activeServiceId] || []
        const { error } = await supabase
          .from('service_items')
          .insert([{
            ...itemForm,
            service_id: activeServiceId,
            display_order: currentItems.length + 1
          }] as any)
        if (error) throw error
      }
      setEditingItemId(null)
      setItemForm({ title: '', description: '' })
      setActiveServiceId(null)
      fetchServiceItems(activeServiceId)
    } catch (error) {
      console.error('Error saving service item:', error)
      alert('Error saving service item')
    }
  }

  const handleItemDelete = async (serviceId: string, itemId: string) => {
    if (!confirm('Delete this service item?')) return
    try {
      const { error } = await supabase.from('service_items').delete().eq('id', itemId)
      if (error) throw error
      fetchServiceItems(serviceId)
    } catch (error) {
      console.error('Error deleting service item:', error)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Services</h1>
        <p className="text-gray-600 mt-2">Manage company services and service items</p>
      </div>

      {/* Add/Edit Service Form */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {editingServiceId ? 'Edit' : 'Add'} Service
        </h2>
        <form onSubmit={handleServiceSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input
              type="text"
              required
              value={serviceForm.title}
              onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              required
              rows={3}
              value={serviceForm.description}
              onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Icon Name (Lucide React icon name)
            </label>
            <input
              type="text"
              value={serviceForm.icon_name}
              onChange={(e) => setServiceForm({ ...serviceForm, icon_name: e.target.value })}
              placeholder="e.g., Wrench, Building, Truck"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              {editingServiceId ? 'Update' : 'Add'} Service
            </button>
            {editingServiceId && (
              <button
                type="button"
                onClick={() => {
                  setEditingServiceId(null)
                  setServiceForm({ title: '', description: '', icon_name: '' })
                }}
                className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-xl border border-gray-200">
            {/* Service Header */}
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                    {service.icon_name && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {service.icon_name}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700">{service.description}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                    className="text-gray-600 hover:text-gray-800"
                    title="Toggle service items"
                  >
                    {expandedService === service.id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setEditingServiceId(service.id)
                      setServiceForm({
                        title: service.title,
                        description: service.description,
                        icon_name: service.icon_name || '',
                      })
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleServiceDelete(service.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Service Items Section (Collapsible) */}
            {expandedService === service.id && (
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <h4 className="font-semibold text-gray-900 mb-4">Service Items</h4>

                {/* Add/Edit Item Form */}
                {(activeServiceId === service.id || editingItemId) && (
                  <form onSubmit={handleItemSubmit} className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Item Title *</label>
                        <input
                          type="text"
                          required
                          value={itemForm.title}
                          onChange={(e) => setItemForm({ ...itemForm, title: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={itemForm.description}
                          onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none text-sm"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-all"
                        >
                          {editingItemId ? 'Update' : 'Add'} Item
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingItemId(null)
                            setItemForm({ title: '', description: '' })
                            setActiveServiceId(null)
                          }}
                          className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-300 transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {/* Add Item Button */}
                {!activeServiceId && !editingItemId && (
                  <button
                    onClick={() => setActiveServiceId(service.id)}
                    className="mb-4 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-all flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Service Item
                  </button>
                )}

                {/* Items List */}
                <div className="space-y-2">
                  {(serviceItems[service.id] || []).map((item) => (
                    <div key={item.id} className="flex items-start justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900 text-sm">{item.title}</h5>
                        {item.description && (
                          <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => {
                            setEditingItemId(item.id)
                            setActiveServiceId(service.id)
                            setItemForm({
                              title: item.title,
                              description: item.description || '',
                            })
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleItemDelete(service.id, item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {(serviceItems[service.id] || []).length === 0 && (
                    <p className="text-center py-4 text-gray-500 text-sm">No service items yet.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        {services.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-200">
            No services yet. Add your first service above.
          </div>
        )}
      </div>
    </div>
  )
}
