'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa'
import { Locale } from '@/i18n/translations'

interface Firm {
  id: string
  name: string
  logo: string
  rating: number
  type: string
}

export default function ComparePage({ params }: { params: { locale: Locale } }) {
  const [allFirms, setAllFirms] = useState<Firm[]>([])
  const [selectedFirms, setSelectedFirms] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFirms()
  }, [])

  const fetchFirms = async () => {
    try {
      const res = await fetch('/api/firms')
      const data = await res.json()
      setAllFirms(data)
    } catch (error) {
      console.error('Error fetching firms:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleFirm = (firmId: string) => {
    if (selectedFirms.includes(firmId)) {
      setSelectedFirms(selectedFirms.filter(id => id !== firmId))
    } else if (selectedFirms.length < 3) {
      setSelectedFirms([...selectedFirms, firmId])
    }
  }

  const comparedFirms = allFirms.filter(f => selectedFirms.includes(f.id))

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
          {params.locale === 'id' ? 'Bandingkan Prop Firms' : 'Compare Prop Firms'}
        </h1>
        <p className="text-center text-gray-600 mb-12">
          {params.locale === 'id' 
            ? 'Pilih hingga 3 prop firm untuk dibandingkan' 
            : 'Select up to 3 prop firms to compare'}
        </p>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {params.locale === 'id' ? 'Pilih Firm' : 'Select Firms'} ({selectedFirms.length}/3)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {allFirms.map(firm => (
              <button
                key={firm.id}
                onClick={() => toggleFirm(firm.id)}
                disabled={!selectedFirms.includes(firm.id) && selectedFirms.length >= 3}
                className={`p-4 rounded-lg border-2 transition ${
                  selectedFirms.includes(firm.id)
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                } ${!selectedFirms.includes(firm.id) && selectedFirms.length >= 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-2 flex items-center justify-center overflow-hidden">
                    <Image 
                      src={firm.logo} 
                      alt={firm.name}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  <p className="text-sm font-semibold">{firm.name}</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <FaStar className="text-yellow-400 text-xs" />
                    <span className="text-xs">{firm.rating}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {comparedFirms.length > 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {params.locale === 'id' ? 'Perbandingan' : 'Comparison'}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {comparedFirms.map(firm => (
                <div key={firm.id} className="border rounded-lg p-4">
                  <div className="text-center mb-4">
                    <Image 
                      src={firm.logo} 
                      alt={firm.name}
                      width={80}
                      height={80}
                      className="mx-auto object-contain"
                    />
                    <h3 className="font-bold text-lg mt-2">{firm.name}</h3>
                    <p className="text-sm text-gray-600">{firm.type}</p>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <FaStar className="text-yellow-400" />
                      <span className="font-semibold">{firm.rating}</span>
                    </div>
                  </div>
                  <button className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition">
                    {params.locale === 'id' ? 'Pilih' : 'Choose'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-gray-500 text-lg">
              {params.locale === 'id' 
                ? 'Pilih minimal 1 prop firm untuk mulai membandingkan' 
                : 'Select at least 1 prop firm to start comparing'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
