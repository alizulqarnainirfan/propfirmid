'use client'
import { useState, useEffect } from 'react'
import FirmCard from '@/components/FirmCard'
import { Locale } from '@/i18n/translations'

interface PropFirm {
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

export default function AllFirmsPage({ params }: { params: { locale: Locale } }) {
  const [firms, setFirms] = useState<PropFirm[]>([])
  const [filteredFirms, setFilteredFirms] = useState<PropFirm[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [sortBy, setSortBy] = useState('rating')

  useEffect(() => {
    fetchFirms()
  }, [])

  useEffect(() => {
    filterAndSortFirms()
  }, [firms, searchTerm, filterType, sortBy])

  const fetchFirms = async () => {
    try {
      const response = await fetch('/api/firms')
      const data = await response.json()
      setFirms(data)
    } catch (error) {
      console.error('Failed to fetch firms:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortFirms = () => {
    let result = [...firms]

    // Search filter
    if (searchTerm) {
      result = result.filter(firm =>
        firm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        firm.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Type filter
    if (filterType !== 'all') {
      result = result.filter(firm => firm.type === filterType)
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'trusted':
          return b.trusted - a.trusted
        case 'price-low':
          return a.discounted - b.discounted
        case 'price-high':
          return b.discounted - a.discounted
        case 'name':
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    setFilteredFirms(result)
  }

  const firmTypes = ['all', ...Array.from(new Set(firms.map(f => f.type)))]

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

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            {params.locale === 'id' ? 'Semua Prop Firms' : 'All Prop Firms'}
          </h1>
          <p className="text-gray-600 text-lg">
            {params.locale === 'id' 
              ? `Temukan ${firms.length}+ prop firm terpercaya untuk trading Anda` 
              : `Discover ${firms.length}+ trusted prop firms for your trading`}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                {params.locale === 'id' ? 'Cari Firm' : 'Search Firm'}
              </label>
              <input
                type="text"
                placeholder={params.locale === 'id' ? 'Cari nama firm...' : 'Search firm name...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                {params.locale === 'id' ? 'Tipe Firm' : 'Firm Type'}
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {firmTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' 
                      ? (params.locale === 'id' ? 'Semua Tipe' : 'All Types')
                      : type}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                {params.locale === 'id' ? 'Urutkan' : 'Sort By'}
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="rating">
                  {params.locale === 'id' ? 'Rating Tertinggi' : 'Highest Rating'}
                </option>
                <option value="trusted">
                  {params.locale === 'id' ? 'Paling Dipercaya' : 'Most Trusted'}
                </option>
                <option value="price-low">
                  {params.locale === 'id' ? 'Harga Terendah' : 'Lowest Price'}
                </option>
                <option value="price-high">
                  {params.locale === 'id' ? 'Harga Tertinggi' : 'Highest Price'}
                </option>
                <option value="name">
                  {params.locale === 'id' ? 'Nama (A-Z)' : 'Name (A-Z)'}
                </option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t">
            <p className="text-gray-600">
              {params.locale === 'id' 
                ? `Menampilkan ${filteredFirms.length} dari ${firms.length} prop firms`
                : `Showing ${filteredFirms.length} of ${firms.length} prop firms`}
            </p>
          </div>
        </div>

        {/* Firms Grid */}
        {filteredFirms.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-gray-500 text-lg">
              {params.locale === 'id' 
                ? 'Tidak ada firm yang ditemukan. Coba ubah filter Anda.' 
                : 'No firms found. Try changing your filters.'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFirms.map((firm, index) => (
              <FirmCard 
                key={firm.id} 
                firm={firm} 
                rank={sortBy === 'rating' ? index + 1 : undefined}
                locale={params.locale} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
