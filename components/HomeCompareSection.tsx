'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaExchangeAlt, FaPlus, FaTimes, FaStar, FaArrowRight } from 'react-icons/fa'
import { Locale } from '@/i18n/translations'

interface PropFirm {
  id: string
  name: string
  logo: string
  type: string
  rating: number
  trusted: number
  price: number
  discounted: number
  priceTag?: string | null
  profitSplit?: string | null
  maxDrawdown?: string | null
}

interface HomeCompareSectionProps {
  locale: Locale
}

export default function HomeCompareSection({ locale }: HomeCompareSectionProps) {
  const [firms, setFirms] = useState<PropFirm[]>([])
  const [selectedFirms, setSelectedFirms] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFirms()
  }, [])

  const fetchFirms = async () => {
    try {
      const response = await fetch('/api/firms')
      const data = await response.json()
      setFirms(data.slice(0, 20)) // Limit to top 20 for homepage
    } catch (error) {
      console.error('Failed to fetch firms:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectFirm = (firmId: string) => {
    if (selectedFirms.includes(firmId)) {
      setSelectedFirms(selectedFirms.filter(id => id !== firmId))
    } else if (selectedFirms.length < 3) { // Limit to 3 for homepage
      setSelectedFirms([...selectedFirms, firmId])
    }
    setShowDropdown(false)
    setSearchTerm('')
  }

  const handleRemoveFirm = (firmId: string) => {
    setSelectedFirms(selectedFirms.filter(id => id !== firmId))
  }

  const filteredFirms = firms.filter(firm => 
    firm.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedFirms.includes(firm.id)
  )

  const selectedFirmData = selectedFirms.map(id => firms.find(f => f.id === id)).filter(Boolean) as PropFirm[]

  const t = {
    title: locale === 'id' ? 'Bandingkan Prop Firms' : 'Compare Prop Firms',
    subtitle: locale === 'id' 
      ? 'Pilih hingga 3 prop firm dan bandingkan fitur, harga, dan kondisi trading mereka secara berdampingan'
      : 'Select up to 3 prop firms and compare their features, pricing, and trading conditions side by side',
    searchPlaceholder: locale === 'id' 
      ? 'Cari dan tambahkan firm untuk dibandingkan (maks 3)...'
      : 'Search and add firms to compare (max 3)...',
    rating: locale === 'id' ? 'Rating' : 'Rating',
    trustedBy: locale === 'id' ? 'Dipercaya oleh' : 'Trusted by',
    startingPrice: locale === 'id' ? 'Harga Mulai' : 'Starting Price',
    profitSplit: locale === 'id' ? 'Bagi Hasil' : 'Profit Split',
    maxDrawdown: locale === 'id' ? 'Max Drawdown' : 'Max Drawdown',
    viewFullComparison: locale === 'id' ? 'Lihat Perbandingan Lengkap' : 'View Full Comparison',
    selectFirms: locale === 'id' ? 'Pilih Firm untuk Dibandingkan' : 'Select Firms to Compare',
    selectFirmsDesc: locale === 'id' 
      ? 'Gunakan pencarian di atas untuk memilih hingga 3 prop firm dan melihat perbandingan cepat'
      : 'Use the search above to select up to 3 prop firms and see a quick comparison'
  }

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            <FaExchangeAlt className="text-2xl text-primary-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t.title}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Search and Selection */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="relative">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 transition"
                disabled={selectedFirms.length >= 3}
              />
              
              {showDropdown && searchTerm && filteredFirms.length > 0 && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-64 overflow-y-auto">
                  {filteredFirms.slice(0, 8).map(firm => (
                    <button
                      key={firm.id}
                      onClick={() => handleSelectFirm(firm.id)}
                      className="w-full px-6 py-3 flex items-center gap-4 hover:bg-gray-50 transition text-left border-b last:border-b-0"
                    >
                      <Image
                        src={firm.logo}
                        alt={firm.name}
                        width={40}
                        height={40}
                        className="rounded-lg"
                      />
                      <div>
                        <div className="font-semibold text-gray-800">{firm.name}</div>
                        <div className="text-gray-500 text-sm">{firm.type}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Firms Pills */}
            {selectedFirms.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {selectedFirmData.map(firm => (
                  <div
                    key={firm.id}
                    className="flex items-center gap-2 bg-primary-50 border border-primary-200 text-primary-700 px-4 py-2 rounded-full"
                  >
                    <span className="font-medium">{firm.name}</span>
                    <button
                      onClick={() => handleRemoveFirm(firm.id)}
                      className="hover:bg-primary-100 rounded-full p-1 transition"
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Comparison */}
        {selectedFirms.length > 0 ? (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {selectedFirmData.map(firm => (
                <div key={firm.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-6 text-white">
                    <div className="flex justify-between items-start mb-4">
                      <Image
                        src={firm.logo}
                        alt={firm.name}
                        width={50}
                        height={50}
                        className="rounded-lg bg-white p-1"
                      />
                      <button
                        onClick={() => handleRemoveFirm(firm.id)}
                        className="text-white hover:bg-white/20 rounded-full p-2 transition"
                      >
                        <FaTimes size={14} />
                      </button>
                    </div>
                    <h3 className="font-bold text-lg mb-1">{firm.name}</h3>
                    <p className="text-primary-100 text-sm">{firm.type}</p>
                  </div>
                  
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-sm">{t.rating}</span>
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400 text-sm" />
                        <span className="font-bold text-gray-800">{firm.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-sm">{t.trustedBy}</span>
                      <span className="font-semibold text-gray-800 text-sm">{firm.trusted.toLocaleString()}</span>
                    </div>
                    
                    {firm.profitSplit && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 text-sm">{t.profitSplit}</span>
                        <span className="font-semibold text-primary-600 text-sm">{firm.profitSplit}</span>
                      </div>
                    )}
                    
                    {firm.maxDrawdown && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 text-sm">{t.maxDrawdown}</span>
                        <span className="font-semibold text-gray-800 text-sm">{firm.maxDrawdown}</span>
                      </div>
                    )}
                    
                    <div className="pt-3 border-t">
                      <div className="text-gray-600 text-xs mb-1">{t.startingPrice}</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-primary-600">${firm.discounted}</span>
                        <span className="text-gray-400 line-through text-xs">${firm.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <Link 
                href={`/${locale}/compare`}
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition shadow-lg hover:shadow-xl text-lg"
              >
                {t.viewFullComparison}
                <FaArrowRight />
              </Link>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{t.selectFirms}</h3>
            <p className="text-gray-600 mb-6">
              {t.selectFirmsDesc}
            </p>
            <Link
              href={`/${locale}/compare`}
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
            >
              {t.viewFullComparison}
              <FaArrowRight />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}