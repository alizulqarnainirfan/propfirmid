'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Locale } from '@/i18n/translations'
import FirmDetailContent from '@/components/FirmDetailContent'

interface PropFirm {
  id: string
  name: string
  logo: string
  type: string
  rating: number
  trusted: number
  discount?: string | null
  showCouponCode?: boolean | null
  price: number
  discounted: number
  priceTag?: string | null
  bonus?: string | null
  profitSplit?: string | null
  maxDrawdown?: string | null
  dailyDrawdown?: string | null
  minTradingDays?: number | null
  maxTradingDays?: number | null
  payoutSpeed?: string | null
  platforms?: string | null
  instruments?: string | null
  leverage?: string | null
  refundable: boolean
  scalingPlan: boolean
  newsTrading: boolean
  weekendHolding: boolean
  eaAllowed: boolean
  copyTrading: boolean
  minPayoutAmount?: string | null
  payoutMethods?: string | null
  trustScore?: number | null
  verificationStatus?: string | null
  challenges: any[]
  reviews: any[]
}

export default function FirmDetailPage({ params }: { params: { locale: Locale, firmId: string } }) {
  const [firm, setFirm] = useState<PropFirm | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchFirmDetails()
  }, [params.firmId])

  const fetchFirmDetails = async () => {
    try {
      const response = await fetch(`/api/firms/${params.firmId}`)
      if (!response.ok) {
        throw new Error('Firm not found')
      }
      const data = await response.json()
      setFirm(data)
    } catch (error) {
      setError('Failed to load firm details')
      console.error('Failed to fetch firm details:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              {params.locale === 'id' ? 'Memuat...' : 'Loading...'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !firm) {
    return (
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {params.locale === 'id' ? 'Firm Tidak Ditemukan' : 'Firm Not Found'}
            </h1>
            <p className="text-gray-600">
              {params.locale === 'id' 
                ? 'Maaf, firm yang Anda cari tidak ditemukan.' 
                : 'Sorry, the firm you are looking for was not found.'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return <FirmDetailContent firm={firm} locale={params.locale} />
}