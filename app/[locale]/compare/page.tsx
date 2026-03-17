'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaStar, FaCheck, FaTimes, FaExchangeAlt } from 'react-icons/fa'

interface Challenge {
  id: string
  name: string
  accountSize: string
  price: number
  discountedPrice: number
  phase1Target?: string
  phase2Target?: string
  maxDrawdown: string
  dailyDrawdown?: string
  minDays?: number
  maxDays?: number
  profitSplit: string
  refundable: boolean
}

interface PropFirm {
  id: string
  name: string
  logo: string
  type: string
  rating: number
  trusted: number
  discount?: string
  price: number
  discounted: number
  bonus?: string
  profitSplit?: string
  maxDrawdown?: string
  dailyDrawdown?: string
  minTradingDays?: number
  maxTradingDays?: number
  payoutSpeed?: string
  platforms?: string
  instruments?: string
  leverage?: string
  refundable: boolean
  scalingPlan: boolean
  newsTrading: boolean
  weekendHolding: boolean
  eaAllowed: boolean
  copyTrading: boolean
  minPayoutAmount?: string
  payoutMethods?: string
  trustScore?: number
  verificationStatus?: string
  challenges: Challenge[]
}

export default function ComparePage() {
  const [firms, setFirms] = useState<PropFirm[]>([])
  const [selectedFirms, setSelectedFirms] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [expandedChallenges, setExpandedChallenges] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    fetchFirms()
  }, [])

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

  const handleSelectFirm = (firmId: string) => {
    if (selectedFirms.includes(firmId)) {
      setSelectedFirms(selectedFirms.filter(id => id !== firmId))
    } else if (selectedFirms.length < 4) {
      setSelectedFirms([...selectedFirms, firmId])
    }
    setShowDropdown(false)
    setSearchTerm('')
  }

  const handleRemoveFirm = (firmId: string) => {
    setSelectedFirms(selectedFirms.filter(id => id !== firmId))
  }

  const toggleChallenges = (firmId: string) => {
    setExpandedChallenges(prev => ({
      ...prev,
      [firmId]: !prev[firmId]
    }))
  }

  const filteredFirms = firms.filter(firm => 
    firm.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedFirms.includes(firm.id)
  )

  const selectedFirmData = selectedFirms.map(id => firms.find(f => f.id === id)).filter(Boolean) as PropFirm[]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            <FaExchangeAlt className="text-3xl text-primary-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Compare Prop Firms
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Select up to 4 prop firms and compare their features, pricing, and trading conditions side by side
          </p>
        </div>

        {/* Firm Selector */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search and add firms to compare (max 4)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 transition"
              disabled={selectedFirms.length >= 4}
            />
            
            {showDropdown && searchTerm && filteredFirms.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto">
                {filteredFirms.slice(0, 10).map(firm => (
                  <button
                    key={firm.id}
                    onClick={() => handleSelectFirm(firm.id)}
                    className="w-full px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition text-left border-b last:border-b-0"
                  >
                    <Image
                      src={firm.logo}
                      alt={firm.name}
                      width={48}
                      height={48}
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
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Comparison Content */}
        {selectedFirms.length > 0 ? (
          <div className="space-y-6">
            {/* Firms Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {selectedFirmData.map(firm => (
                <div key={firm.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-6 text-white">
                    <div className="flex justify-between items-start mb-4">
                      <Image
                        src={firm.logo}
                        alt={firm.name}
                        width={60}
                        height={60}
                        className="rounded-lg bg-white p-1"
                      />
                      <button
                        onClick={() => handleRemoveFirm(firm.id)}
                        className="text-white hover:bg-white/20 rounded-full p-2 transition"
                      >
                        <FaTimes />
                      </button>
                    </div>
                    <h3 className="font-bold text-xl mb-1">{firm.name}</h3>
                    <p className="text-primary-100 text-sm">{firm.type}</p>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Rating</span>
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" />
                        <span className="font-bold text-gray-800">{firm.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Trusted By</span>
                      <span className="font-semibold text-gray-800">{firm.trusted.toLocaleString()}</span>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="text-gray-600 text-sm mb-1">Starting Price</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-primary-600">${firm.discounted}</span>
                        <span className="text-gray-400 line-through text-sm">${firm.price}</span>
                      </div>
                      {firm.discount && (
                        <span className="inline-block mt-2 bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded">
                          {firm.discount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Comparison Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 sticky left-0 bg-gray-50 z-10">
                        Feature
                      </th>
                      {selectedFirmData.map(firm => (
                        <th key={firm.id} className="px-6 py-4 text-center min-w-[200px]">
                          <div className="font-semibold text-gray-800">{firm.name}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {/* Trading Conditions */}
                    <ComparisonRow
                      label="Profit Split"
                      values={selectedFirmData.map(f => (
                        <span className="text-primary-600 font-bold text-lg">{f.profitSplit || 'N/A'}</span>
                      ))}
                    />
                    
                    <ComparisonRow
                      label="Max Drawdown"
                      values={selectedFirmData.map(f => (
                        <span className="font-semibold text-gray-800">{f.maxDrawdown || 'N/A'}</span>
                      ))}
                    />

                    <ComparisonRow
                      label="Daily Drawdown"
                      values={selectedFirmData.map(f => (
                        <span className="font-semibold text-gray-800">{f.dailyDrawdown || 'N/A'}</span>
                      ))}
                    />

                    <ComparisonRow
                      label="Min Trading Days"
                      values={selectedFirmData.map(f => (
                        <span className="text-gray-700">{f.minTradingDays || 0} days</span>
                      ))}
                    />

                    <ComparisonRow
                      label="Max Trading Days"
                      values={selectedFirmData.map(f => (
                        <span className="text-gray-700">{f.maxTradingDays || 'Unlimited'}</span>
                      ))}
                    />

                    {/* Platforms & Instruments */}
                    <ComparisonRow
                      label="Trading Platforms"
                      values={selectedFirmData.map(f => (
                        <span className="text-gray-700 text-sm">{f.platforms || 'N/A'}</span>
                      ))}
                    />

                    <ComparisonRow
                      label="Instruments"
                      values={selectedFirmData.map(f => (
                        <span className="text-gray-700 text-sm">{f.instruments || 'N/A'}</span>
                      ))}
                    />

                    <ComparisonRow
                      label="Leverage"
                      values={selectedFirmData.map(f => (
                        <span className="font-semibold text-gray-800">{f.leverage || 'N/A'}</span>
                      ))}
                    />

                    {/* Payout Info */}
                    <ComparisonRow
                      label="Payout Speed"
                      values={selectedFirmData.map(f => (
                        <span className="text-gray-700">{f.payoutSpeed || 'N/A'}</span>
                      ))}
                    />

                    <ComparisonRow
                      label="Min Payout"
                      values={selectedFirmData.map(f => (
                        <span className="text-gray-700">{f.minPayoutAmount || 'N/A'}</span>
                      ))}
                    />

                    <ComparisonRow
                      label="Payout Methods"
                      values={selectedFirmData.map(f => (
                        <span className="text-gray-700 text-sm">{f.payoutMethods || 'N/A'}</span>
                      ))}
                    />

                    {/* Trading Rules */}
                    <ComparisonRow
                      label="Refundable"
                      values={selectedFirmData.map(f => (
                        <span className={`inline-flex items-center gap-1 ${f.refundable ? 'text-green-600' : 'text-red-600'}`}>
                          {f.refundable ? <FaCheck /> : <FaTimes />}
                          {f.refundable ? 'Yes' : 'No'}
                        </span>
                      ))}
                    />

                    <ComparisonRow
                      label="Scaling Plan"
                      values={selectedFirmData.map(f => (
                        <span className={`inline-flex items-center gap-1 ${f.scalingPlan ? 'text-green-600' : 'text-red-600'}`}>
                          {f.scalingPlan ? <FaCheck /> : <FaTimes />}
                          {f.scalingPlan ? 'Yes' : 'No'}
                        </span>
                      ))}
                    />

                    <ComparisonRow
                      label="News Trading"
                      values={selectedFirmData.map(f => (
                        <span className={`inline-flex items-center gap-1 ${f.newsTrading ? 'text-green-600' : 'text-red-600'}`}>
                          {f.newsTrading ? <FaCheck /> : <FaTimes />}
                          {f.newsTrading ? 'Allowed' : 'Not Allowed'}
                        </span>
                      ))}
                    />

                    <ComparisonRow
                      label="Weekend Holding"
                      values={selectedFirmData.map(f => (
                        <span className={`inline-flex items-center gap-1 ${f.weekendHolding ? 'text-green-600' : 'text-red-600'}`}>
                          {f.weekendHolding ? <FaCheck /> : <FaTimes />}
                          {f.weekendHolding ? 'Allowed' : 'Not Allowed'}
                        </span>
                      ))}
                    />

                    <ComparisonRow
                      label="EA/Bots Allowed"
                      values={selectedFirmData.map(f => (
                        <span className={`inline-flex items-center gap-1 ${f.eaAllowed ? 'text-green-600' : 'text-red-600'}`}>
                          {f.eaAllowed ? <FaCheck /> : <FaTimes />}
                          {f.eaAllowed ? 'Yes' : 'No'}
                        </span>
                      ))}
                    />

                    <ComparisonRow
                      label="Copy Trading"
                      values={selectedFirmData.map(f => (
                        <span className={`inline-flex items-center gap-1 ${f.copyTrading ? 'text-green-600' : 'text-red-600'}`}>
                          {f.copyTrading ? <FaCheck /> : <FaTimes />}
                          {f.copyTrading ? 'Allowed' : 'Not Allowed'}
                        </span>
                      ))}
                    />

                    {/* Bonus */}
                    {selectedFirmData.some(f => f.bonus) && (
                      <ComparisonRow
                        label="Bonus/Perks"
                        values={selectedFirmData.map(f => (
                          <span className="text-primary-600 text-sm font-medium">{f.bonus || '-'}</span>
                        ))}
                      />
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Account Types Comparison */}
            {selectedFirmData.some(f => f.challenges && f.challenges.length > 0) && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Types Comparison</h2>
                
                <div className="space-y-6">
                  {selectedFirmData.map(firm => (
                    firm.challenges && firm.challenges.length > 0 && (
                      <div key={firm.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleChallenges(firm.id)}
                          className="w-full bg-gray-50 px-6 py-4 flex items-center justify-between hover:bg-gray-100 transition"
                        >
                          <div className="flex items-center gap-3">
                            <Image src={firm.logo} alt={firm.name} width={32} height={32} className="rounded" />
                            <span className="font-semibold text-gray-800">{firm.name} - Account Types ({firm.challenges.length})</span>
                          </div>
                          <span className="text-gray-500">
                            {expandedChallenges[firm.id] ? '▼' : '▶'}
                          </span>
                        </button>
                        
                        {expandedChallenges[firm.id] && (
                          <div className="p-6">
                            <div className="overflow-x-auto">
                              <table className="w-full">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Account Size</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                                    {firm.challenges[0].phase1Target && (
                                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Phase 1</th>
                                    )}
                                    {firm.challenges[0].phase2Target && (
                                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Phase 2</th>
                                    )}
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Max DD</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Profit Split</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Refundable</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                  {firm.challenges.map(challenge => (
                                    <tr key={challenge.id} className="hover:bg-gray-50">
                                      <td className="px-4 py-3 font-semibold text-gray-800">{challenge.accountSize}</td>
                                      <td className="px-4 py-3">
                                        <div className="text-gray-400 line-through text-sm">${challenge.price}</div>
                                        <div className="text-primary-600 font-bold">${challenge.discountedPrice}</div>
                                      </td>
                                      {challenge.phase1Target && (
                                        <td className="px-4 py-3 text-gray-700">{challenge.phase1Target}</td>
                                      )}
                                      {challenge.phase2Target && (
                                        <td className="px-4 py-3 text-gray-700">{challenge.phase2Target}</td>
                                      )}
                                      <td className="px-4 py-3 text-gray-700">{challenge.maxDrawdown}</td>
                                      <td className="px-4 py-3 text-primary-600 font-semibold">{challenge.profitSplit}</td>
                                      <td className="px-4 py-3">
                                        <span className={challenge.refundable ? 'text-green-600' : 'text-red-600'}>
                                          {challenge.refundable ? <FaCheck className="inline" /> : <FaTimes className="inline" />}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Firms Selected</h2>
            <p className="text-gray-600 mb-6">
              Search and select up to 4 prop firms above to start comparing their features
            </p>
            <Link
              href="/en/firms"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
            >
              Browse All Firms
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

interface ComparisonRowProps {
  label: string
  values: React.ReactNode[]
}

function ComparisonRow({ label, values }: ComparisonRowProps) {
  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-6 py-4 font-semibold text-gray-700 sticky left-0 bg-white">
        {label}
      </td>
      {values.map((value, index) => (
        <td key={index} className="px-6 py-4 text-center">
          {value}
        </td>
      ))}
    </tr>
  )
}
