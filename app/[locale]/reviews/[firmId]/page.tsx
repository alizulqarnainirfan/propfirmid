'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { FaStar, FaUser } from 'react-icons/fa'
import { getAuthUser } from '@/lib/auth'
import { Locale } from '@/i18n/translations'

interface Review {
  id: string
  rating: number
  content: string
  firm: { name: string; logo: string }
  author: { name: string }
  createdAt: string
}

interface PropFirm {
  id: string
  name: string
  logo: string
  rating: number
  trusted: number
}

export default function FirmReviewsPage({ 
  params 
}: { 
  params: { locale: Locale; firmId: string } 
}) {
  const router = useRouter()
  const [reviews, setReviews] = useState<Review[]>([])
  const [firm, setFirm] = useState<PropFirm | null>(null)
  const [rating, setRating] = useState(0)
  const [content, setContent] = useState('')
  const [proofImage, setProofImage] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const user = getAuthUser()

  useEffect(() => {
    fetchData()
  }, [params.firmId])

  const fetchData = async () => {
    try {
      const [reviewsRes, firmRes] = await Promise.all([
        fetch(`/api/reviews?firmId=${params.firmId}`),
        fetch(`/api/firms`)
      ])
      
      const reviewsData = await reviewsRes.json()
      const firmsData = await firmRes.json()
      
      const currentFirm = firmsData.find((f: PropFirm) => f.id === params.firmId)
      
      setReviews(reviewsData)
      setFirm(currentFirm)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!user) {
      alert(params.locale === 'id' ? 'Silakan login terlebih dahulu' : 'Please login first')
      router.push(`/${params.locale}/login`)
      return
    }

    if (rating === 0) {
      setError(params.locale === 'id' ? 'Berikan rating' : 'Give a rating')
      return
    }

    if (!proofImage) {
      setError(params.locale === 'id' ? 'Upload bukti pembelian akun (screenshot)' : 'Upload proof of account purchase (screenshot)')
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating,
          content,
          proofImage,
          firmId: params.firmId,
          authorId: user.id
        })
      })

      if (res.ok) {
        setSuccess(params.locale === 'id' 
          ? 'Review berhasil dikirim! Menunggu persetujuan admin.' 
          : 'Review submitted successfully! Waiting for admin approval.')
        setRating(0)
        setContent('')
        setProofImage('')
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to submit review')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const getTimeAgo = (date: string) => {
    const now = new Date()
    const reviewDate = new Date(date)
    const diffInDays = Math.floor((now.getTime() - reviewDate.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return params.locale === 'id' ? 'Hari ini' : 'Today'
    if (diffInDays === 1) return params.locale === 'id' ? 'Kemarin' : 'Yesterday'
    if (diffInDays < 7) return `${diffInDays} ${params.locale === 'id' ? 'hari lalu' : 'days ago'}`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} ${params.locale === 'id' ? 'minggu lalu' : 'weeks ago'}`
    return `${Math.floor(diffInDays / 30)} ${params.locale === 'id' ? 'bulan lalu' : 'months ago'}`
  }

  if (loading) {
    return (
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">{params.locale === 'id' ? 'Memuat...' : 'Loading...'}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!firm) {
    return (
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <p className="text-gray-600">{params.locale === 'id' ? 'Firm tidak ditemukan' : 'Firm not found'}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Firm Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Image
              src={firm.logo}
              alt={firm.name}
              width={80}
              height={80}
              className="rounded-lg"
            />
            <div>
              <h1 className="text-3xl font-bold">{firm.name}</h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <span className="font-semibold">{firm.rating}</span>
                </div>
                <span className="text-gray-600">
                  {firm.trusted.toLocaleString()} {params.locale === 'id' ? 'pengguna' : 'users'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Write Review */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {params.locale === 'id' ? 'Tulis Review' : 'Write Review'}
          </h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 font-semibold">Rating</label>
              <div className="flex gap-2">
                {[1,2,3,4,5].map(star => (
                  <FaStar 
                    key={star}
                    className={`text-3xl cursor-pointer transition ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <label className="block mb-2 font-semibold">
                {params.locale === 'id' ? 'Review Anda' : 'Your Review'}
              </label>
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 h-32 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                placeholder={params.locale === 'id' ? 'Ceritakan pengalaman Anda...' : 'Share your experience...'}
                required
              />
            </div>
            
            <div>
              <label className="block mb-2 font-semibold">
                {params.locale === 'id' ? 'Bukti Pembelian (Screenshot) *' : 'Proof of Purchase (Screenshot) *'}
              </label>
              <input 
                type="url"
                value={proofImage}
                onChange={(e) => setProofImage(e.target.value)}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                placeholder={params.locale === 'id' ? 'URL gambar bukti pembelian' : 'Proof image URL'}
                required
              />
              <p className="text-sm text-gray-600 mt-1">
                {params.locale === 'id' 
                  ? 'Upload screenshot bukti pembelian akun ke layanan hosting gambar (seperti imgur.com) dan paste URL-nya di sini'
                  : 'Upload screenshot of account purchase proof to an image hosting service (like imgur.com) and paste the URL here'}
              </p>
              {proofImage && (
                <div className="mt-2">
                  <img src={proofImage} alt="Preview" className="max-w-xs rounded border" />
                </div>
              )}
            </div>
            
            <button 
              type="submit"
              disabled={submitting}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
            >
              {submitting 
                ? (params.locale === 'id' ? 'Mengirim...' : 'Submitting...') 
                : (params.locale === 'id' ? 'Kirim Review' : 'Submit Review')}
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <h2 className="text-2xl font-bold mb-6">
          {params.locale === 'id' ? 'Review' : 'Reviews'} ({reviews.length})
        </h2>
        
        {reviews.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-gray-500 text-lg">
              {params.locale === 'id' ? 'Belum ada review. Jadilah yang pertama!' : 'No reviews yet. Be the first!'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map(review => (
              <div key={review.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <FaUser className="text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{review.author.name}</h3>
                      </div>
                      <span className="text-sm text-gray-500">{getTimeAgo(review.createdAt)}</span>
                    </div>
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'} 
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
