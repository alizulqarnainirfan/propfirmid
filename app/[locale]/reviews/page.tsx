'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Script from 'next/script'
import { FaStar, FaUser } from 'react-icons/fa'
import { getAuthUser } from '@/lib/auth'
import { Locale } from '@/i18n/translations'

interface Review {
  id: string
  rating: number
  content: string
  firm: { name: string }
  author: { name: string }
  createdAt: string
}

interface PropFirm {
  id: string
  name: string
}

export default function ReviewsPage({ params }: { params: { locale: Locale } }) {
  const router = useRouter()
  const [reviews, setReviews] = useState<Review[]>([])
  const [firms, setFirms] = useState<PropFirm[]>([])
  const [selectedFirm, setSelectedFirm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [reviewsRes, firmsRes] = await Promise.all([
        fetch('/api/reviews'),
        fetch('/api/firms')
      ])
      
      const reviewsData = await reviewsRes.json()
      const firmsData = await firmsRes.json()
      
      setReviews(reviewsData)
      setFirms(firmsData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
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

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">
          {params.locale === 'id' ? 'Review Prop Firm' : 'Prop Firm Reviews'}
        </h1>
        <p className="text-center text-gray-600 mb-12">
          {params.locale === 'id' 
            ? 'Baca pengalaman nyata dari trader Indonesia' 
            : 'Read real experiences from Indonesian traders'}
        </p>

        {/* Write Review - Redirect to Firm Page */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg p-8 mb-8 text-white text-center">
          <h2 className="text-2xl font-semibold mb-3">
            {params.locale === 'id' ? 'Tulis Review' : 'Write Review'}
          </h2>
          <p className="mb-6 text-primary-100">
            {params.locale === 'id' 
              ? 'Pilih prop firm untuk menulis review dengan bukti pembelian akun' 
              : 'Select a prop firm to write a review with proof of account purchase'}
          </p>
          <select 
            value={selectedFirm}
            onChange={(e) => {
              if (e.target.value) {
                router.push(`/${params.locale}/reviews/${e.target.value}`)
              }
            }}
            className="w-full max-w-md mx-auto border rounded-lg p-3 text-gray-800"
          >
            <option value="">
              {params.locale === 'id' ? '-- Pilih Firm untuk Review --' : '-- Select Firm to Review --'}
            </option>
            {firms.map(firm => (
              <option key={firm.id} value={firm.id}>{firm.name}</option>
            ))}
          </select>
        </div>

        {/* Reviews List */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          {params.locale === 'id' ? 'Semua Review' : 'All Reviews'} ({reviews.length})
        </h2>
        
        {reviews.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-gray-500 text-lg">
              {params.locale === 'id' ? 'Belum ada review. Jadilah yang pertama!' : 'No reviews yet. Be the first!'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map(review => (
              <div key={review.id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaUser className="text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{review.author.name}</h3>
                    <p className="text-sm text-gray-600 truncate">{review.firm.name}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'} 
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 flex-1">{review.content}</p>
                <span className="text-sm text-gray-500">{getTimeAgo(review.createdAt)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Trustpilot Reviews Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {params.locale === 'id' ? 'Review dari Trustpilot' : 'Reviews from Trustpilot'}
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div id="shapo-widget-e2a37f9860e114b648be"></div>
          </div>
        </div>
      </div>
      
      {/* Load Trustpilot Script */}
      <Script 
        id="shapo-embed-js"
        src="https://cdn.shapo.io/js/embed.js"
        strategy="lazyOnload"
      />
    </div>
  )
}
