'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { getAuthUser } from '@/lib/auth'
import { FaStar, FaCheck, FaTimes, FaEye, FaTrash } from 'react-icons/fa'
import { Locale } from '@/i18n/translations'

export default function AdminReviewsPage({ params }: { params: { locale: Locale } }) {
  const router = useRouter()
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending')
  const [viewingProof, setViewingProof] = useState<string | null>(null)

  useEffect(() => {
    const authUser = getAuthUser()
    if (!authUser || authUser.role !== 'admin') {
      window.location.href = `/${params.locale}/login`
      return
    }
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/admin/reviews')
      const data = await response.json()
      setReviews(data)
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAction = async (reviewId: string, action: 'approve' | 'reject') => {
    try {
      const response = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      })

      if (response.ok) {
        setReviews(reviews.map(r => 
          r.id === reviewId 
            ? { ...r, status: action === 'approve' ? 'approved' : 'rejected' }
            : r
        ))
      }
    } catch (error) {
      console.error('Failed to update review:', error)
    }
  }

  const handleDelete = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return

    try {
      const response = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setReviews(reviews.filter(r => r.id !== reviewId))
      }
    } catch (error) {
      console.error('Failed to delete review:', error)
    }
  }

  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter(r => r.status === filter)

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
            {params.locale === 'id' ? 'Kelola Review' : 'Manage Reviews'}
          </h1>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6 p-2 flex gap-2">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                filter === status
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} 
              ({reviews.filter(r => status === 'all' || r.status === status).length})
            </button>
          ))}
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <p className="text-gray-600 text-lg">
                {params.locale === 'id' ? 'Tidak ada review' : 'No reviews'}
              </p>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex gap-6">
                  {/* Firm Info */}
                  <div className="flex-shrink-0">
                    <Image
                      src={review.firm.logo}
                      alt={review.firm.name}
                      width={80}
                      height={80}
                      className="rounded-lg"
                    />
                  </div>

                  {/* Review Content */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{review.firm.name}</h3>
                        <p className="text-gray-600 text-sm">
                          By {review.author.name} ({review.author.email})
                        </p>
                        <p className="text-gray-500 text-xs">
                          {new Date(review.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        review.status === 'approved' 
                          ? 'bg-green-100 text-green-700'
                          : review.status === 'rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-700 mb-4">{review.content}</p>

                    {/* Proof Image */}
                    <div className="mb-4">
                      <button
                        onClick={() => setViewingProof(review.proofImage)}
                        className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
                      >
                        <FaEye /> {params.locale === 'id' ? 'Lihat Bukti' : 'View Proof'}
                      </button>
                    </div>

                    {/* Actions */}
                    {review.status === 'pending' && (
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleAction(review.id, 'approve')}
                          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                        >
                          <FaCheck /> {params.locale === 'id' ? 'Setujui' : 'Approve'}
                        </button>
                        <button
                          onClick={() => handleAction(review.id, 'reject')}
                          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                        >
                          <FaTimes /> {params.locale === 'id' ? 'Tolak' : 'Reject'}
                        </button>
                      </div>
                    )}

                    {review.status !== 'pending' && (
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold"
                      >
                        <FaTrash /> {params.locale === 'id' ? 'Hapus' : 'Delete'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Proof Image Modal */}
        {viewingProof && (
          <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setViewingProof(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh]">
              <button
                onClick={() => setViewingProof(null)}
                className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
              >
                <FaTimes />
              </button>
              <img
                src={viewingProof}
                alt="Proof"
                className="max-w-full max-h-[90vh] rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
