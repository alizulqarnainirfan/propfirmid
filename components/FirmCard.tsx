'use client'
import { useState } from 'react'
import Link from 'next/link'
import SafeImage from './SafeImage'
import { FaStar, FaUsers, FaCopy, FaCheck } from 'react-icons/fa'
import { Locale } from '@/i18n/translations'
import { getFirmUrl, hasFirmUrl } from '@/utils/firmUrls'

interface FirmCardProps {
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
    buyUrl?: string | null
  }
  rank?: number
  locale: Locale
}

export default function FirmCard({ firm, rank, locale }: FirmCardProps) {
  // Use database buyUrl if available, otherwise fall back to utils
  const firmUrl = firm.buyUrl || getFirmUrl(firm.name)
  const hasOfficialUrl = firm.buyUrl || hasFirmUrl(firm.name)
  const [copied, setCopied] = useState(false)

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

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition p-6 relative group">
      {rank && (
        <div className="absolute -top-3 -left-3 bg-primary-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg z-10">
          #{rank}
        </div>
      )}
      
      {firm.discount && (
        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
          {firm.discount}
        </div>
      )}

      {/* Make the entire card clickable */}
      <Link href={`/${locale}/firms/${firm.id}`} className="block">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden relative">
            <SafeImage 
              src={firm.logo} 
              alt={firm.name}
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
          <div>
            <h3 className="font-bold text-lg group-hover:text-primary-600 transition">{firm.name}</h3>
            <p className="text-sm text-gray-600">{firm.type}</p>
          </div>
        </div>

        {firm.bonus && (
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-2 mb-4">
            <p className="text-xs text-primary-700">🎁 {firm.bonus}</p>
          </div>
        )}

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400" />
            <span className="font-semibold">{firm.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <FaUsers />
            <span className="text-sm">{firm.trusted.toLocaleString()} {locale === 'id' ? 'pengguna' : 'users'}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 line-through">${firm.price}</span>
            <span className="text-2xl font-bold text-primary-600">${firm.discounted}</span>
          </div>
        </div>
      </Link>

      {/* Coupon Code Section */}
      <div className="mb-4">
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                {locale === 'id' ? 'Kode Kupon:' : 'Coupon Code:'}
              </span>
              <span className="font-bold text-primary-700 bg-white px-2 py-1 rounded text-sm">
                PROPINDO
              </span>
            </div>
            <button
              onClick={handleCopyCoupon}
              className="flex items-center justify-center w-8 h-8 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all duration-200 hover:scale-105"
              title={locale === 'id' ? 'Salin kode kupon' : 'Copy coupon code'}
            >
              {copied ? (
                <FaCheck size={12} className="text-green-200" />
              ) : (
                <FaCopy size={12} />
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

      {/* Action buttons */}
      <div className="flex gap-2">
        <Link 
          href={`/${locale}/firms/${firm.id}`}
          className="flex-1 text-center border-2 border-primary-600 text-primary-600 py-2 rounded-lg hover:bg-primary-50 transition font-semibold text-sm"
        >
          {locale === 'id' ? 'Detail' : 'Details'}
        </Link>
        {hasOfficialUrl ? (
          <a 
            href={firmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition font-semibold text-sm"
          >
            {locale === 'id' ? 'Beli' : 'Buy'}
          </a>
        ) : (
          <Link 
            href={`/${locale}/checkout/${firm.id}`}
            className="flex-1 text-center bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition font-semibold text-sm"
          >
            {locale === 'id' ? 'Beli' : 'Buy'}
          </Link>
        )}
      </div>
    </div>
  )
}
