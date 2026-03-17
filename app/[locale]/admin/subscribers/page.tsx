'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAuthUser } from '@/lib/auth'
import { FaEnvelope, FaDownload } from 'react-icons/fa'
import { Locale } from '@/i18n/translations'

export default function AdminSubscribersPage({ params }: { params: { locale: Locale } }) {
  const router = useRouter()
  const [subscribers, setSubscribers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const authUser = getAuthUser()
    if (!authUser || authUser.role !== 'admin') {
      window.location.href = `/${params.locale}/login`
      return
    }
    fetchSubscribers()
  }, [])

  const fetchSubscribers = async () => {
    try {
      const response = await fetch('/api/giveaway-subscribe')
      const data = await response.json()
      setSubscribers(data)
    } catch (error) {
      console.error('Failed to fetch subscribers:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = () => {
    const csv = [
      ['Email', 'Subscribed Date'],
      ...subscribers.map(sub => [
        sub.email,
        new Date(sub.createdAt).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `giveaway-subscribers-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
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
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {params.locale === 'id' ? 'Subscriber Giveaway' : 'Giveaway Subscribers'}
            </h1>
            <p className="text-gray-600">
              {params.locale === 'id' 
                ? `Total ${subscribers.length} subscriber` 
                : `Total ${subscribers.length} subscribers`}
            </p>
          </div>
          <button
            onClick={exportToCSV}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
          >
            <FaDownload />
            {params.locale === 'id' ? 'Export CSV' : 'Export CSV'}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">#</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Subscribed Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {subscribers.map((subscriber, index) => (
                  <tr key={subscriber.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-700">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <FaEnvelope className="text-green-600" />
                        </div>
                        <span className="font-semibold text-gray-800">{subscriber.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {new Date(subscriber.createdAt).toLocaleDateString()} {new Date(subscriber.createdAt).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {subscribers.length === 0 && (
            <div className="text-center py-12">
              <FaEnvelope className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
                {params.locale === 'id' ? 'Belum ada subscriber' : 'No subscribers yet'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
