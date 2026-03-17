import Link from 'next/link'
import SafeImage from './SafeImage'
import { FaStar, FaUsers } from 'react-icons/fa'
import { Locale } from '@/i18n/translations'

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
  }
  rank?: number
  locale: Locale
}

export default function FirmCard({ firm, rank, locale }: FirmCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition p-6 relative">
      {rank && (
        <div className="absolute -top-3 -left-3 bg-primary-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
          #{rank}
        </div>
      )}
      
      {firm.discount && (
        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {firm.discount}
        </div>
      )}

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
          <h3 className="font-bold text-lg">{firm.name}</h3>
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
          <span className="text-sm">{firm.trusted.toLocaleString()} pengguna</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 line-through">${firm.price}</span>
          <span className="text-2xl font-bold text-primary-600">${firm.discounted}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Link 
          href={`/${locale}/reviews/${firm.id}`}
          className="flex-1 text-center border-2 border-primary-600 text-primary-600 py-2 rounded-lg hover:bg-primary-50 transition font-semibold text-sm"
        >
          Review
        </Link>
        <Link 
          href={`/${locale}/checkout/${firm.id}`}
          className="flex-1 text-center bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition font-semibold text-sm"
        >
          {locale === 'id' ? 'Beli' : 'Buy'}
        </Link>
      </div>
    </div>
  )
}
