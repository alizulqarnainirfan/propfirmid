'use client'
import { useState } from 'react'
import Link from 'next/link'
import SafeImage from './SafeImage'
import FirmFAQ from './FirmFAQ'
import { FaStar, FaUsers, FaCheck, FaTimes, FaArrowLeft, FaExternalLinkAlt, FaInfoCircle, FaExclamationTriangle, FaChartLine, FaMoneyBillWave, FaCreditCard, FaBuilding, FaCopy } from 'react-icons/fa'
import { Locale } from '@/i18n/translations'
import { getFirmUrl, hasFirmUrl } from '@/utils/firmUrls'

interface FirmDetailProps {
  firm: {
    id: string
    name: string
    logo: string
    type: string
    rating: number
    trusted: number
    discount?: string | null
    price: number
    discounted: number
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
  locale: Locale
}

// Removed firmUrls mapping - no longer using external links to maintain user retention

export default function FirmDetailContent({ firm, locale }: FirmDetailProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [firmContent, setFirmContent] = useState<string | null>(null)
  const [contentLoading, setContentLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const firmUrl = getFirmUrl(firm.name)
  const hasOfficialUrl = hasFirmUrl(firm.name)

  const handleCopyCoupon = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    try {
      await navigator.clipboard.writeText('PROPINDO')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy coupon code:', err)
    }
  }

  const fetchFirmContent = async (firmName: string) => {
    // Get the firm URL mapping for this specific firm
    const firmKey = firmName.toLowerCase().replace(/\s+/g, '-')
    const firmKeyNoSpaces = firmName.toLowerCase().replace(/\s+/g, '')
    const firmKeySpaces = firmName.toLowerCase()
    
    // Map firm names to their thetrustedprop URLs for content fetching only
    const firmContentUrls: { [key: string]: string } = {
      'the5ers': 'https://thetrustedprop.com/prop-firms/the5ers/overview',
      'the-5ers': 'https://thetrustedprop.com/prop-firms/the5ers/overview',
      'dna-funded': 'https://thetrustedprop.com/prop-firms/dna-funded/overview',
      'dna funded': 'https://thetrustedprop.com/prop-firms/dna-funded/overview',
      'funding-pips': 'https://thetrustedprop.com/prop-firms/funding-pips/overview',
      'funding pips': 'https://thetrustedprop.com/prop-firms/funding-pips/overview',
      'fundingpips': 'https://thetrustedprop.com/prop-firms/funding-pips/overview',
      'fxify': 'https://thetrustedprop.com/prop-firms/fxify/overview',
      'alpha-capital-group': 'https://thetrustedprop.com/prop-firms/alpha-capital-group/overview',
      'alpha capital group': 'https://thetrustedprop.com/prop-firms/alpha-capital-group/overview',
      'alpha capital': 'https://thetrustedprop.com/prop-firms/alpha-capital-group/overview',
      'maven-trading': 'https://thetrustedprop.com/prop-firms/maven-trading/overview',
      'maven trading': 'https://thetrustedprop.com/prop-firms/maven-trading/overview',
      'maven': 'https://thetrustedprop.com/prop-firms/maven-trading/overview',
      'thinkcapital': 'https://thetrustedprop.com/prop-firms/thinkcapital/overview',
      'think capital': 'https://thetrustedprop.com/prop-firms/thinkcapital/overview',
      'eightcap-challenges': 'https://thetrustedprop.com/prop-firms/eightcap-challenges/overview',
      'eightcap challenges': 'https://thetrustedprop.com/prop-firms/eightcap-challenges/overview',
      'eightcap': 'https://thetrustedprop.com/prop-firms/eightcap-challenges/overview',
      'my-crypto-funding': 'https://thetrustedprop.com/prop-firms/my-crypto-funding/overview',
      'my crypto funding': 'https://thetrustedprop.com/prop-firms/my-crypto-funding/overview',
      'mycryptofunding': 'https://thetrustedprop.com/prop-firms/my-crypto-funding/overview',
      'atfunded': 'https://thetrustedprop.com/prop-firms/ATFunded/overview',
      'at funded': 'https://thetrustedprop.com/prop-firms/ATFunded/overview',
      'thaurus-guru': 'https://thetrustedprop.com/prop-firms/thaurus-guru/overview',
      'thaurus guru': 'https://thetrustedprop.com/prop-firms/thaurus-guru/overview',
      'thaurusguru': 'https://thetrustedprop.com/prop-firms/thaurus-guru/overview',
      'blueberry-funded': 'https://thetrustedprop.com/prop-firms/blueberry-funded/overview',
      'blueberry funded': 'https://thetrustedprop.com/prop-firms/blueberry-funded/overview',
      'blueberryfunded': 'https://thetrustedprop.com/prop-firms/blueberry-funded/overview'
    }
    
    // Try different variations of the firm name
    const possibleKeys = [firmKey, firmKeyNoSpaces, firmKeySpaces, firmName.toLowerCase()]
    let url = null
    
    for (const key of possibleKeys) {
      if (firmContentUrls[key]) {
        url = firmContentUrls[key]
        break
      }
    }
    
    if (!url) {
      console.log('No URL found for firm:', firmName, 'Tried keys:', possibleKeys)
      return null
    }

    setContentLoading(true)
    try {
      const response = await fetch(`/api/fetch-content?url=${encodeURIComponent(url)}`)
      if (response.ok) {
        const data = await response.json()
        setFirmContent(data.content)
      }
    } catch (error) {
      console.error('Failed to fetch firm content:', error)
    } finally {
      setContentLoading(false)
    }
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (tab === 'detailed-review' && !firmContent) {
      fetchFirmContent(firm.name)
    }
  }

  const tabs = [
    { id: 'overview', label: locale === 'id' ? 'Ringkasan' : 'Overview' },
    { id: 'challenges', label: locale === 'id' ? 'Tantangan' : 'Challenges' },
    { id: 'reviews', label: locale === 'id' ? 'Ulasan' : 'Reviews' },
    { id: 'detailed-review', label: locale === 'id' ? 'Review Lengkap' : 'Detailed Review' }
  ]

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link 
          href={`/${locale}/firms`}
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6"
        >
          <FaArrowLeft />
          {locale === 'id' ? 'Kembali ke Semua Firms' : 'Back to All Firms'}
        </Link>

        {/* Firm Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden relative">
                  <SafeImage 
                    src={firm.logo} 
                    alt={firm.name}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h1 className="text-3xl font-bold">{firm.name}</h1>
                    {firm.discount && (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {firm.discount}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-lg mb-4">{firm.type}</p>
                  
                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <FaStar className="text-yellow-400" />
                      <span className="font-semibold text-lg">{firm.rating}</span>
                      <span className="text-gray-500">({firm.reviews.length} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaUsers />
                      <span>{firm.trusted.toLocaleString()} {locale === 'id' ? 'pengguna' : 'users'}</span>
                    </div>
                  </div>

                  {firm.bonus && (
                    <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 mb-4">
                      <p className="text-primary-700">🎁 {firm.bonus}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:w-80">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-gray-400 line-through text-lg">${firm.price}</span>
                    <span className="text-3xl font-bold text-primary-600">${firm.discounted}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {locale === 'id' ? 'Mulai dari' : 'Starting from'}
                  </p>
                </div>
                
                <div className="space-y-3">
                  {hasOfficialUrl ? (
                    <a 
                      href={firmUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold text-center block"
                    >
                      {locale === 'id' ? 'Beli Sekarang' : 'Buy Now'}
                    </a>
                  ) : (
                    <Link 
                      href={`/${locale}/checkout/${firm.id}`}
                      className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold text-center block"
                    >
                      {locale === 'id' ? 'Beli Sekarang' : 'Buy Now'}
                    </Link>
                  )}
                  <Link 
                    href={`/${locale}/reviews/${firm.id}`}
                    className="w-full border-2 border-primary-600 text-primary-600 py-3 rounded-lg hover:bg-primary-50 transition font-semibold text-center block"
                  >
                    {locale === 'id' ? 'Lihat Review' : 'View Reviews'}
                  </Link>
                  
                  {/* Coupon Code Section */}
                  <div className="bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">
                          {locale === 'id' ? 'Kode Kupon:' : 'Coupon Code:'}
                        </span>
                        <span className="font-bold text-primary-700 bg-white px-3 py-1 rounded text-sm">
                          PROPINDO
                        </span>
                      </div>
                      <button
                        onClick={handleCopyCoupon}
                        className="flex items-center justify-center w-9 h-9 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all duration-200 hover:scale-105"
                        title={locale === 'id' ? 'Salin kode kupon' : 'Copy coupon code'}
                      >
                        {copied ? (
                          <FaCheck size={14} className="text-green-200" />
                        ) : (
                          <FaCopy size={14} />
                        )}
                      </button>
                    </div>
                    {copied && (
                      <div className="mt-2 text-xs text-green-600 font-medium">
                        {locale === 'id' ? '✓ Kode berhasil disalin!' : '✓ Code copied successfully!'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b">
            <nav className="flex space-x-8 px-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'overview' && (
              <OverviewTab firm={firm} locale={locale} />
            )}
            {activeTab === 'challenges' && (
              <ChallengesTab challenges={firm.challenges} locale={locale} />
            )}
            {activeTab === 'reviews' && (
              <ReviewsTab reviews={firm.reviews} locale={locale} />
            )}
            {activeTab === 'detailed-review' && (
              <DetailedReviewTab 
                content={firmContent} 
                loading={contentLoading} 
                locale={locale}
                firmName={firm.name}
                firmId={firm.id}
                firm={firm}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Overview Tab Component
function OverviewTab({ firm, locale }: { firm: any, locale: Locale }) {
  const features = [
    { key: 'profitSplit', label: locale === 'id' ? 'Bagi Hasil' : 'Profit Split', value: firm.profitSplit },
    { key: 'maxDrawdown', label: locale === 'id' ? 'Max Drawdown' : 'Max Drawdown', value: firm.maxDrawdown },
    { key: 'dailyDrawdown', label: locale === 'id' ? 'Daily Drawdown' : 'Daily Drawdown', value: firm.dailyDrawdown },
    { key: 'payoutSpeed', label: locale === 'id' ? 'Kecepatan Payout' : 'Payout Speed', value: firm.payoutSpeed },
    { key: 'platforms', label: locale === 'id' ? 'Platform' : 'Platforms', value: firm.platforms },
    { key: 'instruments', label: locale === 'id' ? 'Instrumen' : 'Instruments', value: firm.instruments },
    { key: 'leverage', label: locale === 'id' ? 'Leverage' : 'Leverage', value: firm.leverage },
    { key: 'minPayoutAmount', label: locale === 'id' ? 'Min Payout' : 'Min Payout', value: firm.minPayoutAmount },
    { key: 'payoutMethods', label: locale === 'id' ? 'Metode Payout' : 'Payout Methods', value: firm.payoutMethods }
  ]

  const booleanFeatures = [
    { key: 'refundable', label: locale === 'id' ? 'Dapat Dikembalikan' : 'Refundable', value: firm.refundable },
    { key: 'scalingPlan', label: locale === 'id' ? 'Rencana Scaling' : 'Scaling Plan', value: firm.scalingPlan },
    { key: 'newsTrading', label: locale === 'id' ? 'News Trading' : 'News Trading', value: firm.newsTrading },
    { key: 'weekendHolding', label: locale === 'id' ? 'Weekend Holding' : 'Weekend Holding', value: firm.weekendHolding },
    { key: 'eaAllowed', label: locale === 'id' ? 'EA Diizinkan' : 'EA Allowed', value: firm.eaAllowed },
    { key: 'copyTrading', label: locale === 'id' ? 'Copy Trading' : 'Copy Trading', value: firm.copyTrading }
  ]

  return (
    <div className="space-y-8">
      {/* Key Features */}
      <div>
        <h3 className="text-xl font-bold mb-4">
          {locale === 'id' ? 'Fitur Utama' : 'Key Features'}
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.filter(f => f.value).map((feature) => (
            <div key={feature.key} className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">{feature.label}</div>
              <div className="font-semibold">{feature.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Trading Conditions */}
      <div>
        <h3 className="text-xl font-bold mb-4">
          {locale === 'id' ? 'Kondisi Trading' : 'Trading Conditions'}
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {booleanFeatures.map((feature) => (
            <div key={feature.key} className="flex items-center gap-3 bg-gray-50 rounded-lg p-4">
              {feature.value ? (
                <FaCheck className="text-green-500" />
              ) : (
                <FaTimes className="text-red-500" />
              )}
              <span className={feature.value ? 'text-green-700' : 'text-red-700'}>
                {feature.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Trading Days */}
      {(firm.minTradingDays || firm.maxTradingDays) && (
        <div>
          <h3 className="text-xl font-bold mb-4">
            {locale === 'id' ? 'Hari Trading' : 'Trading Days'}
          </h3>
          <div className="bg-gray-50 rounded-lg p-4">
            {firm.minTradingDays && (
              <p className="mb-2">
                <span className="font-semibold">
                  {locale === 'id' ? 'Minimum:' : 'Minimum:'}
                </span> {firm.minTradingDays} {locale === 'id' ? 'hari' : 'days'}
              </p>
            )}
            {firm.maxTradingDays && (
              <p>
                <span className="font-semibold">
                  {locale === 'id' ? 'Maksimum:' : 'Maximum:'}
                </span> {firm.maxTradingDays} {locale === 'id' ? 'hari' : 'days'}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Challenges Tab Component
function ChallengesTab({ challenges, locale }: { challenges: any[], locale: Locale }) {
  if (!challenges || challenges.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          {locale === 'id' ? 'Tidak ada tantangan tersedia' : 'No challenges available'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">
        {locale === 'id' ? 'Tantangan Tersedia' : 'Available Challenges'}
      </h3>
      <div className="grid gap-4">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="border rounded-lg p-6 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-semibold">{challenge.name}</h4>
                <p className="text-gray-600">{challenge.accountSize}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 line-through">${challenge.price}</span>
                  <span className="text-xl font-bold text-primary-600">${challenge.discountedPrice}</span>
                </div>
                {challenge.refundable && (
                  <span className="text-sm text-green-600">
                    {locale === 'id' ? 'Dapat dikembalikan' : 'Refundable'}
                  </span>
                )}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              {challenge.phase1Target && (
                <div>
                  <span className="text-gray-600">
                    {locale === 'id' ? 'Target Fase 1:' : 'Phase 1 Target:'}
                  </span>
                  <div className="font-semibold">{challenge.phase1Target}</div>
                </div>
              )}
              {challenge.phase2Target && (
                <div>
                  <span className="text-gray-600">
                    {locale === 'id' ? 'Target Fase 2:' : 'Phase 2 Target:'}
                  </span>
                  <div className="font-semibold">{challenge.phase2Target}</div>
                </div>
              )}
              <div>
                <span className="text-gray-600">
                  {locale === 'id' ? 'Max Drawdown:' : 'Max Drawdown:'}
                </span>
                <div className="font-semibold">{challenge.maxDrawdown}</div>
              </div>
              <div>
                <span className="text-gray-600">
                  {locale === 'id' ? 'Bagi Hasil:' : 'Profit Split:'}
                </span>
                <div className="font-semibold">{challenge.profitSplit}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Reviews Tab Component
function ReviewsTab({ reviews, locale }: { reviews: any[], locale: Locale }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          {locale === 'id' ? 'Belum ada ulasan' : 'No reviews yet'}
        </p>
      </div>
    )
  }

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-3xl font-bold">{averageRating.toFixed(1)}</div>
          <div>
            <div className="flex items-center gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar 
                  key={star} 
                  className={star <= averageRating ? 'text-yellow-400' : 'text-gray-300'} 
                />
              ))}
            </div>
            <p className="text-sm text-gray-600">
              {locale === 'id' ? 'Berdasarkan' : 'Based on'} {reviews.length} {locale === 'id' ? 'ulasan' : 'reviews'}
            </p>
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {reviews.slice(0, 10).map((review) => (
          <div key={review.id} className="border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{review.author?.name || 'Anonymous'}</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar 
                        key={star} 
                        className={star <= review.rating ? 'text-yellow-400' : 'text-gray-300'} 
                        size={12}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-2 py-1 rounded text-xs ${
                review.status === 'approved' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {review.status}
              </span>
            </div>
            <p className="text-gray-700">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Detailed Review Tab Component
function DetailedReviewTab({
  content,
  loading,
  locale,
  firmName,
  firmId,
  firm
}: {
  content: string | null,
  loading: boolean,
  locale: Locale,
  firmName: string,
  firmId: string,
  firm: any
}) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">
          {locale === 'id' ? 'Memuat review lengkap...' : 'Loading detailed review...'}
        </p>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <FaExclamationTriangle className="text-gray-500 text-3xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            {locale === 'id' ? 'Review Lengkap Tidak Tersedia' : 'Detailed Review Not Available'}
          </h3>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {locale === 'id'
              ? 'Review lengkap untuk firm ini sedang dalam proses atau belum tersedia. Silakan cek kembali nanti atau lihat review pengguna lainnya.'
              : 'The detailed review for this firm is being processed or not yet available. Please check back later or view other user reviews.'}
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href={`/${locale}/reviews/${firmId}`}
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-semibold shadow-lg hover:shadow-xl"
            >
              {locale === 'id' ? 'Lihat Review Pengguna' : 'View User Reviews'}
              <FaStar size={14} />
            </Link>
            <Link
              href={`/${locale}/forum`}
              className="inline-flex items-center gap-2 border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition font-semibold"
            >
              {locale === 'id' ? 'Diskusi Forum' : 'Forum Discussion'}
              <FaUsers size={14} />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Enhanced content processing for professional appearance
  const processedContent = content
    // Remove unwanted widgets and sections
    .replace(/<div[^>]*class="[^"]*rating[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
    .replace(/<div[^>]*class="[^"]*social[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
    .replace(/<div[^>]*class="[^"]*share[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
    .replace(/<div[^>]*class="[^"]*advertisement[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
    .replace(/<div[^>]*class="[^"]*comment[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
    .replace(/<div[^>]*class="[^"]*review-form[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
    .replace(/<div[^>]*class="[^"]*sidebar[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
    .replace(/<div[^>]*class="[^"]*widget[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
    // Remove FAQ sections from external content since we have our own
    .replace(/<h[1-6][^>]*>\s*FAQs?\s*<\/h[1-6]>[\s\S]*?(?=<h[1-6]|$)/gi, '')
    .replace(/<h[1-6][^>]*>\s*Frequently\s+Asked\s+Questions?\s*<\/h[1-6]>[\s\S]*?(?=<h[1-6]|$)/gi, '')
    .replace(/<div[^>]*class="[^"]*faq[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
    .replace(/<section[^>]*class="[^"]*faq[^"]*"[^>]*>[\s\S]*?<\/section>/gi, '')
    // Remove empty elements and clean up spacing - enhanced
    .replace(/<p[^>]*>(\s|&nbsp;|&#160;)*<\/p>/gi, '')
    .replace(/<div[^>]*>(\s|&nbsp;|&#160;)*<\/div>/gi, '')
    .replace(/<span[^>]*>(\s|&nbsp;|&#160;)*<\/span>/gi, '')
    .replace(/<h[1-6][^>]*>(\s|&nbsp;|&#160;)*<\/h[1-6]>/gi, '')
    // Remove excessive line breaks and blank spaces
    .replace(/(<br\s*\/?>[\s\n]*){3,}/gi, '<br><br>')
    .replace(/(<br\s*\/?>){2,}/gi, '<br><br>')
    .replace(/\n\s*\n\s*\n+/g, '\n\n')
    .replace(/\s{4,}/g, ' ')
    .replace(/>\s{2,}</g, '><')
    // Clean up duplicate content patterns
    .replace(/(<h[1-6][^>]*>[^<]*<\/h[1-6]>)\s*\1/gi, '$1')
    .replace(/(<p[^>]*>[^<]*<\/p>)\s*\1/gi, '$1')
    // Remove empty sections that might cause blank spaces
    .replace(/<section[^>]*>\s*<\/section>/gi, '')
    .replace(/<article[^>]*>\s*<\/article>/gi, '')
    .replace(/<main[^>]*>\s*<\/main>/gi, '')
    // Clean up spacing between HTML elements
    .replace(/(<\/[^>]+>)\s{2,}(<[^>]+>)/g, '$1 $2')
    .replace(/(<\/[^>]+>)\n\s*\n\s*(<[^>]+>)/g, '$1\n$2')
    // Final cleanup for professional appearance
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\s*\n\s*/g, '\n')
    .trim()

  // Extract the main heading and content
  const headingMatch = processedContent.match(/<h1[^>]*>(.*?)<\/h1>/i)
  const mainHeading = headingMatch ? headingMatch[1].replace(/<[^>]*>/g, '').trim() : `${firmName} Review 2026`

  // Remove the first h1 from content to avoid duplication and apply final cleanup
  const contentWithoutMainHeading = processedContent
    .replace(/<h1[^>]*>.*?<\/h1>/i, '')
    // Additional cleanup for blank lines and spacing issues
    .replace(/(<\/[^>]+>)\s*\n\s*\n\s*(<[^>]+>)/g, '$1\n$2')
    .replace(/\n\s*\n\s*\n+/g, '\n\n')
    .replace(/(<br\s*\/?>)\s*\n\s*(<br\s*\/?>)/g, '$1$2')
    .replace(/(<br\s*\/?>){3,}/g, '<br><br>')
    // Remove any remaining empty elements that might cause spacing
    .replace(/<p[^>]*>(\s|&nbsp;|&#160;|\u00A0)*<\/p>/gi, '')
    .replace(/<div[^>]*>(\s|&nbsp;|&#160;|\u00A0)*<\/div>/gi, '')
    // Final trim and normalize
    .replace(/^\s+|\s+$/g, '')
    .trim()

  return (
    <div className="space-y-8">
      {/* Professional Header Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-white">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {mainHeading}
          </h1>
          <p className="text-primary-100 text-lg max-w-3xl mx-auto leading-relaxed">
            {locale === 'id'
              ? `Baca review lengkap ${firmName} kami, termasuk breakdown detail tentang jenis Challenge, aturan Drawdown, strategi yang dilarang, dan proses Payout.`
              : `Read our comprehensive ${firmName} review, including detailed breakdown of Challenge types, Drawdown rules, Prohibited Strategies, and Payout process.`}
          </p>
        </div>
      </div>

      {/* Professional Two-column layout for firm info cards */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Card - Firm Basic Info */}
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center overflow-hidden shadow-sm">
              <SafeImage
                src={firm.logo}
                alt={firm.name}
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{firmName}</h3>
              <p className="text-primary-600 font-medium mb-3">{firm.type}</p>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-full">
                  <FaStar className="text-yellow-500 text-sm" />
                  <span className="font-bold text-gray-900">{firm.rating}</span>
                </div>
                <span className="text-gray-600 text-sm">
                  {locale === 'id' ? 'Dipercaya oleh' : 'Trusted by'} <strong>{firm.trusted.toLocaleString()}+</strong> {locale === 'id' ? 'pengguna' : 'users'}
                </span>
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <p><strong>{locale === 'id' ? 'Tahun Berdiri:' : 'Established:'}</strong> 2024</p>
                <p><strong>{locale === 'id' ? 'Lokasi:' : 'Location:'}</strong> {firm.location || 'Global'}</p>
              </div>
            </div>
          </div>

          {firm.bonus && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎉</span>
                <p className="text-green-800 font-semibold">{firm.bonus}</p>
              </div>
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>{locale === 'id' ? 'Kode Kupon:' : 'Coupon Code:'}</strong>
              <span className="ml-2 bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-xs font-bold">
                {locale === 'id' ? 'DISKON20' : 'SAVE20'}
              </span>
            </p>
          </div>
        </div>

        {/* Right Card - Trading Details */}
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <h4 className="text-xl font-bold text-gray-900 mb-6">
            {locale === 'id' ? 'Detail Trading' : 'Trading Details'}
          </h4>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaChartLine className="text-blue-600" />
              </div>
              <div>
                <h5 className="font-semibold text-gray-800 mb-1">
                  {locale === 'id' ? 'Platform Trading' : 'Trading Platforms'}
                </h5>
                <p className="text-gray-600 text-sm">{firm.platforms || 'MetaTrader 4/5, DXTrade, cTrader'}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaMoneyBillWave className="text-green-600" />
              </div>
              <div>
                <h5 className="font-semibold text-gray-800 mb-1">
                  {locale === 'id' ? 'Metode Penarikan' : 'Withdrawal Methods'}
                </h5>
                <p className="text-gray-600 text-sm">
                  {firm.payoutMethods || (locale === 'id' ? 'Transfer Bank, Wire Transfer, Rise' : 'Bank Transfer, Wire Transfer, Rise')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaCreditCard className="text-purple-600" />
              </div>
              <div>
                <h5 className="font-semibold text-gray-800 mb-1">
                  {locale === 'id' ? 'Metode Pembayaran' : 'Payment Methods'}
                </h5>
                <p className="text-gray-600 text-sm">
                  {locale === 'id' ? 'Transfer Bank, PayPal, Crypto, Kartu Kredit' : 'Bank Transfer, PayPal, Crypto, Credit Card'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaBuilding className="text-orange-600" />
              </div>
              <div>
                <h5 className="font-semibold text-gray-800 mb-1">
                  {locale === 'id' ? 'Broker Partner' : 'Partner Brokers'}
                </h5>
                <p className="text-gray-600 text-sm">FXPIG, Purple Trading</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Info Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <FaInfoCircle className="text-blue-600 text-xl" />
          </div>
          <div>
            <h4 className="text-blue-900 font-bold text-lg mb-2">
              {locale === 'id' ? 'Review Komprehensif & Terpercaya' : 'Comprehensive & Trusted Review'}
            </h4>
            <p className="text-blue-800 leading-relaxed">
              {locale === 'id'
                ? 'Review ini berisi analisis mendalam tentang semua aspek dari prop firm ini berdasarkan penelitian ekstensif, pengalaman pengguna nyata, dan evaluasi objektif dari tim ahli kami.'
                : 'This review contains in-depth analysis of all aspects of this prop firm based on extensive research, real user experiences, and objective evaluation from our expert team.'}
            </p>
          </div>
        </div>
      </div>

      {/* Professional Content Section */}
      {contentWithoutMainHeading && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-8 py-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">
              {locale === 'id' ? 'Analisis Detail' : 'Detailed Analysis'}
            </h3>
          </div>
          <div
            className="prose prose-lg max-w-none p-8 prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-p:mb-4 prose-headings:mb-4 prose-headings:mt-6 prose-ul:mb-4 prose-ol:mb-4 detailed-review-content"
            dangerouslySetInnerHTML={{ __html: contentWithoutMainHeading }}
            style={{
              lineHeight: '1.6',
            }}
          />
        </div>
      )}

      {/* FAQ Section */}
      <FirmFAQ
        firmName={firmName}
        firm={firm}
        locale={locale}
      />

      {/* Professional Call-to-Action Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200">
        <div className="text-center max-w-2xl mx-auto">
          <h4 className="text-2xl font-bold text-gray-900 mb-4">
            {locale === 'id' ? 'Bagikan Pengalaman Trading Anda' : 'Share Your Trading Experience'}
          </h4>
          <p className="text-gray-700 mb-8 text-lg leading-relaxed">
            {locale === 'id'
              ? 'Sudah pernah trading dengan firm ini? Bagikan review dan pengalaman Anda untuk membantu komunitas trader lainnya membuat keputusan yang tepat.'
              : 'Have you traded with this firm? Share your review and experience to help other traders in our community make informed decisions.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/reviews/${firmId}`}
              className="inline-flex items-center justify-center gap-3 bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition font-bold shadow-lg hover:shadow-xl text-lg"
            >
              <FaStar size={16} />
              {locale === 'id' ? 'Tulis Review' : 'Write Review'}
            </Link>
            <Link
              href={`/${locale}/forum/new`}
              className="inline-flex items-center justify-center gap-3 border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-lg hover:bg-primary-50 transition font-bold text-lg"
            >
              <FaUsers size={16} />
              {locale === 'id' ? 'Diskusi Forum' : 'Forum Discussion'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}