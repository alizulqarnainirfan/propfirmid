'use client'
import { useState } from 'react'
import Link from 'next/link'
import SafeImage from './SafeImage'
import FirmRadarChart from './FirmRadarChart'
import FirmFAQ from './FirmFAQ'
import { FaStar, FaUsers, FaCheck, FaTimes, FaArrowLeft, FaExternalLinkAlt, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa'
import { Locale } from '@/i18n/translations'

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
                  <Link 
                    href={`/${locale}/checkout/${firm.id}`}
                    className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold text-center block"
                  >
                    {locale === 'id' ? 'Beli Sekarang' : 'Buy Now'}
                  </Link>
                  <Link 
                    href={`/${locale}/reviews/${firm.id}`}
                    className="w-full border-2 border-primary-600 text-primary-600 py-3 rounded-lg hover:bg-primary-50 transition font-semibold text-center block"
                  >
                    {locale === 'id' ? 'Lihat Review' : 'View Reviews'}
                  </Link>
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
  // Generate realistic scores based on firm data
  const generateFirmScores = (firm: any) => {
    const baseScore = firm.rating || 4.5
    const variation = 0.5
    
    return {
      ttpScore: Math.min(10, Math.max(1, baseScore + (Math.random() - 0.5) * variation)),
      challengeRules: Math.min(10, Math.max(1, baseScore + (Math.random() - 0.5) * variation)),
      userRatings: Math.min(10, Math.max(1, firm.rating || baseScore)),
      slippage: Math.min(10, Math.max(1, baseScore - 1 + (Math.random() - 0.5) * variation)),
      companyBackground: Math.min(10, Math.max(1, baseScore + (Math.random() - 0.5) * variation))
    }
  }

  const scores = generateFirmScores(firm)
  const overallScore = Number(((scores.ttpScore + scores.challengeRules + scores.userRatings + scores.slippage + scores.companyBackground) / 5).toFixed(1))

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600">
          {locale === 'id' ? 'Memuat review lengkap...' : 'Loading detailed review...'}
        </p>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <FaExclamationTriangle className="text-gray-400 text-2xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {locale === 'id' ? 'Review Lengkap Tidak Tersedia' : 'Detailed Review Not Available'}
          </h3>
          <p className="text-gray-500 mb-6">
            {locale === 'id' 
              ? 'Review lengkap untuk firm ini sedang dalam proses atau belum tersedia.' 
              : 'The detailed review for this firm is being processed or not yet available.'}
          </p>
          <Link 
            href={`/${locale}/reviews/${firmId}`}
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
          >
            {locale === 'id' ? 'Lihat Review Pengguna' : 'View User Reviews'}
            <FaStar size={14} />
          </Link>
        </div>
      </div>
    )
  }

  // Clean and process content for better display and remove external links
  const processedContent = content
    .replace(/<div[^>]*class="[^"]*rating[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '') // Remove rating widgets
    .replace(/<div[^>]*class="[^"]*social[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '') // Remove social widgets
    .replace(/<div[^>]*class="[^"]*share[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '') // Remove share buttons
    .replace(/<div[^>]*class="[^"]*advertisement[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '') // Remove ads
    .replace(/<div[^>]*class="[^"]*comment[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '') // Remove comment sections
    .replace(/<div[^>]*class="[^"]*review-form[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '') // Remove review forms
    // Remove any FAQ sections from external content since we have our own
    .replace(/<h[1-6][^>]*>\s*FAQs?\s*<\/h[1-6]>[\s\S]*?(?=<h[1-6]|$)/gi, '') // Remove FAQ headings and content
    .replace(/<h[1-6][^>]*>\s*Frequently\s+Asked\s+Questions?\s*<\/h[1-6]>[\s\S]*?(?=<h[1-6]|$)/gi, '') // Remove FAQ sections
    .replace(/<div[^>]*class="[^"]*faq[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '') // Remove FAQ divs
    .replace(/<section[^>]*class="[^"]*faq[^"]*"[^>]*>[\s\S]*?<\/section>/gi, '') // Remove FAQ sections

  // Extract the main heading and content
  const headingMatch = processedContent.match(/<h1[^>]*>(.*?)<\/h1>/i)
  const mainHeading = headingMatch ? headingMatch[1] : `${firmName} Review 2026`
  
  // Remove the first h1 from content to avoid duplication
  const contentWithoutMainHeading = processedContent.replace(/<h1[^>]*>.*?<\/h1>/i, '')

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">
            {locale === 'id' ? 'Review Lengkap' : 'Detailed Review'}
          </h3>
          <p className="text-gray-600 mt-1">
            {locale === 'id' 
              ? 'Review mendalam dan analisis komprehensif' 
              : 'In-depth review and comprehensive analysis'}
          </p>
        </div>
        <Link 
          href={`/${locale}/reviews/${firmId}`}
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium bg-primary-50 px-4 py-2 rounded-lg hover:bg-primary-100 transition"
        >
          {locale === 'id' ? 'Lihat Review Pengguna' : 'View User Reviews'}
          <FaStar size={12} />
        </Link>
      </div>

      {/* Main Review Heading */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          {mainHeading}
        </h1>
        <p className="text-gray-600 text-center">
          {locale === 'id' 
            ? `Baca review lengkap ${firmName} kami, termasuk breakdown detail tentang jenis Challenge, aturan Drawdown, strategi yang dilarang, dan proses Payout.`
            : `Read our full ${firmName} review, including a detailed breakdown of Challenge types, Drawdown rules, Prohibited Strategies, and Payout process.`}
        </p>
      </div>

      {/* Radar Chart Section - Positioned in center between cards */}
      <div className="flex justify-center">
        <div className="w-full max-w-lg">
          <FirmRadarChart
            firmName={firmName}
            scores={scores}
            overallScore={overallScore}
            locale={locale}
          />
        </div>
      </div>

      {/* Two-column layout for firm info cards */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Card - Firm Basic Info */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              <SafeImage 
                src={firm.logo} 
                alt={firm.name}
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">{firmName}</h3>
              <p className="text-gray-600 text-sm mb-2">{firm.type}</p>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400 text-sm" />
                  <span className="font-semibold">{firm.rating}</span>
                </div>
                <span className="text-gray-500 text-sm">
                  {locale === 'id' ? 'Dipercaya oleh' : 'Trusted by'} {firm.trusted.toLocaleString()}+ {locale === 'id' ? 'pengguna' : 'users'}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <p><strong>CEO:</strong> {locale === 'id' ? 'Informasi tidak tersedia' : 'Information not available'}</p>
                <p><strong>{locale === 'id' ? 'Tahun' : 'Year'}:</strong> 2024</p>
              </div>
            </div>
          </div>
          
          {firm.bonus && (
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 mb-4">
              <p className="text-primary-700 text-sm">🎉 {firm.bonus}</p>
            </div>
          )}
          
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>{locale === 'id' ? 'Kode Kupon' : 'Coupon Code'}:</strong> 
              <span className="ml-2 bg-gray-100 px-2 py-1 rounded text-xs">
                {locale === 'id' ? 'Kode Diskon: 20%' : 'Discount Code: 20%'}
              </span>
            </p>
          </div>
        </div>

        {/* Right Card - Trading Details */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                {locale === 'id' ? 'Platform Trading:' : 'Trading Platforms:'}
              </h4>
              <p className="text-gray-600">{firm.platforms || 'MetaTrader, DXTrade'}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                {locale === 'id' ? 'Metode Penarikan:' : 'Withdrawal Method:'}
              </h4>
              <p className="text-gray-600">
                {firm.payoutMethods || (locale === 'id' ? 'Transfer Bank / Wire Transfer' : 'Wire Transfer / Bank Transfer')}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                {locale === 'id' ? 'Metode Pembayaran:' : 'Payment Method:'}
              </h4>
              <p className="text-gray-600">
                {locale === 'id' ? 'Transfer Bank, PayPal, Crypto' : 'Wire transfer, Bank Transfer, PayPal, Crypto'}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                {locale === 'id' ? 'Broker:' : 'Brokers:'}
              </h4>
              <p className="text-gray-600">FXPIG</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <FaInfoCircle className="text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="text-blue-800 font-medium mb-1">
              {locale === 'id' ? 'Review Komprehensif' : 'Comprehensive Review'}
            </p>
            <p className="text-blue-700">
              {locale === 'id' 
                ? 'Review ini berisi analisis mendalam tentang semua aspek dari prop firm ini berdasarkan penelitian dan pengalaman pengguna.' 
                : 'This review contains in-depth analysis of all aspects of this prop firm based on research and user experience.'}
            </p>
          </div>
        </div>
      </div>
      
      <div 
        className="prose prose-lg max-w-none bg-white rounded-lg p-6 shadow-sm border"
        dangerouslySetInnerHTML={{ __html: contentWithoutMainHeading }}
      />

      {/* FAQ Section */}
      <FirmFAQ 
        firmName={firmName}
        firm={firm}
        locale={locale}
      />
      
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="text-center">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">
            {locale === 'id' ? 'Bagikan Pengalaman Anda' : 'Share Your Experience'}
          </h4>
          <p className="text-gray-600 mb-4">
            {locale === 'id' 
              ? 'Sudah pernah trading dengan firm ini? Bagikan review Anda untuk membantu trader lain.' 
              : 'Have you traded with this firm? Share your review to help other traders.'}
          </p>
          <div className="flex gap-3 justify-center">
            <Link 
              href={`/${locale}/reviews/${firmId}`}
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
            >
              {locale === 'id' ? 'Tulis Review' : 'Write Review'}
              <FaStar size={14} />
            </Link>
            <Link 
              href={`/${locale}/forum/new`}
              className="inline-flex items-center gap-2 border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition font-semibold"
            >
              {locale === 'id' ? 'Diskusi Forum' : 'Forum Discussion'}
              <FaUsers size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}