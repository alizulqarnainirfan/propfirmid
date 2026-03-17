'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAuthUser } from '@/lib/auth'
import { FaPlus, FaTrash, FaGift } from 'react-icons/fa'
import { Locale } from '@/i18n/translations'

export default function AdminGiveawaysPage({ params }: { params: { locale: Locale } }) {
  const router = useRouter()
  const [giveaways, setGiveaways] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    prize: '',
    endDate: ''
  })

  useEffect(() => {
    const authUser = getAuthUser()
    if (!authUser || authUser.role !== 'admin') {
      window.location.href = `/${params.locale}/login`
      return
    }
    fetchGiveaways()
  }, [])

  const fetchGiveaways = async () => {
    try {
      const response = await fetch('/api/admin/giveaways')
      const data = await response.json()
      setGiveaways(data)
    } catch (error) {
      console.error('Failed to fetch giveaways:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/admin/giveaways', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const newGiveaway = await response.json()
        setGiveaways([newGiveaway, ...giveaways])
        setFormData({ title: '', description: '', prize: '', endDate: '' })
        setShowForm(false)
      }
    } catch (error) {
      console.error('Failed to create giveaway:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this giveaway?')) return

    try {
      const response = await fetch(`/api/admin/giveaways/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setGiveaways(giveaways.filter(g => g.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete giveaway:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            {params.locale === 'id' ? 'Kelola Giveaways' : 'Manage Giveaways'}
          </h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition flex items-center gap-2"
          >
            <FaPlus />
            {params.locale === 'id' ? 'Tambah Giveaway' : 'Add Giveaway'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-8 space-y-4">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Prize</label>
              <input
                type="text"
                value={formData.prize}
                onChange={(e) => setFormData({ ...formData, prize: e.target.value })}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                required
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
              >
                Create Giveaway
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {giveaways.map((giveaway) => (
            <div key={giveaway.id} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <FaGift className="text-yellow-600 text-xl" />
                </div>
                <button
                  onClick={() => handleDelete(giveaway.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                >
                  <FaTrash />
                </button>
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">{giveaway.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{giveaway.description}</p>
              <div className="border-t pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Prize:</span>
                  <span className="font-semibold text-primary-600">{giveaway.prize}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ends:</span>
                  <span className="font-semibold text-gray-800">
                    {new Date(giveaway.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
