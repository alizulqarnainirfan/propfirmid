'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getAuthUser } from '@/lib/auth'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import { Locale } from '@/i18n/translations'

export default function AdminFirmsPage({ params }: { params: { locale: Locale } }) {
  const router = useRouter()
  const [firms, setFirms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const authUser = getAuthUser()
    if (!authUser || authUser.role !== 'admin') {
      window.location.href = `/${params.locale}/login`
      return
    }
    fetchFirms()
  }, [])

  const fetchFirms = async () => {
    try {
      const response = await fetch('/api/firms')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      console.log('Fetched firms data:', data)
      
      // Ensure data is an array
      if (Array.isArray(data)) {
        setFirms(data)
      } else {
        console.error('Expected array but got:', typeof data, data)
        setFirms([])
      }
    } catch (error) {
      console.error('Failed to fetch firms:', error)
      setFirms([]) // Set empty array as fallback
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure? This will delete all associated challenges and reviews.')) return

    try {
      const response = await fetch(`/api/admin/firms/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setFirms(firms.filter(firm => firm.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete firm:', error)
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
            {params.locale === 'id' ? 'Kelola Firms' : 'Manage Firms'}
          </h1>
          <Link
            href={`/${params.locale}/admin/firms/new`}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition flex items-center gap-2"
          >
            <FaPlus />
            {params.locale === 'id' ? 'Tambah Firm' : 'Add Firm'}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(firms) && firms.length > 0 ? (
            firms.map((firm) => (
              <div key={firm.id} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <Image src={firm.logo} alt={firm.name} width={60} height={60} className="rounded-lg" />
                <div className="flex gap-2">
                  <Link
                    href={`/${params.locale}/admin/firms/${firm.id}/edit`}
                    className="p-2 text-green-600 hover:bg-green-50 rounded transition"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(firm.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">{firm.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{firm.type}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Rating: {firm.rating}</span>
                <span className="text-gray-600">{firm.challenges?.length || 0} challenges</span>
              </div>
            </div>
          ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                {loading ? 'Loading firms...' : 'No firms found. Create your first firm!'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
