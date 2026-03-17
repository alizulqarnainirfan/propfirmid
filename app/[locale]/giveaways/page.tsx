'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaGift, FaClock, FaUsers } from 'react-icons/fa'
import { getAuthUser } from '@/lib/auth'
import { Locale } from '@/i18n/translations'

interface Giveaway {
  id: string
  title: string
  description: string
  prize: string
  endDate: string
  status: 'active' | 'ended'
}

export default function GiveawaysPage({ params }: { params: { locale: Locale } }) {
  const router = useRouter()
  const [giveaways, setGiveaways] = useState<Giveaway[]>([])
  const [loading, setLoading] = useState(true)
  const [joining, setJoining] = useState<string | null>(null)
  const user = getAuthUser()

  useEffect(() => {
    fetchGiveaways()
  }, [])

  const fetchGiveaways = async () => {
    try {
      const res = await fetch('/api/giveaways')
      const data = await res.json()
      setGiveaways(data)
    } catch (error) {
      console.error('Error fetching giveaways:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleJoin = async (giveawayId: string) => {
    if (!user) {
      alert(params.locale === 'id' ? 'Silakan login terlebih dahulu' : 'Please login first')
      router.push(`/${params.locale}/login`)
      return
    }

    setJoining(giveawayId)

    // Simulate joining (in production, you'd have a join endpoint)
    setTimeout(() => {
      alert(params.locale === 'id' 
        ? 'Berhasil bergabung! Kami akan menghubungi Anda jika menang.' 
        : 'Successfully joined! We will contact you if you win.')
      setJoining(null)
    }, 1000)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(params.locale === 'id' ? 'id-ID' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getDaysRemaining = (endDate: string) => {
    const now = new Date()
    const end = new Date(endDate)
    const diffTime = end.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return params.locale === 'id' ? 'Berakhir' : 'Ended'
    if (diffDays === 0) return params.locale === 'id' ? 'Berakhir hari ini' : 'Ends today'
    if (diffDays === 1) return params.locale === 'id' ? 'Berakhir besok' : 'Ends tomorrow'
    return `${diffDays} ${params.locale === 'id' ? 'hari lagi' : 'days left'}`
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

  const activeGiveaways = giveaways.filter(g => g.status === 'active')
  const endedGiveaways = giveaways.filter(g => g.status === 'ended')

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">
          {params.locale === 'id' ? 'Giveaway Gratis' : 'Free Giveaways'}
        </h1>
        <p className="text-center text-gray-600 mb-12">
          {params.locale === 'id' 
            ? 'Ikuti giveaway dan menangkan akun funded gratis!' 
            : 'Join giveaways and win free funded accounts!'}
        </p>

        {/* Active Giveaways */}
        {activeGiveaways.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-6">
              {params.locale === 'id' ? 'Giveaway Aktif' : 'Active Giveaways'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {activeGiveaways.map(giveaway => (
                <div key={giveaway.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="p-4 bg-primary-600 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <FaGift className="text-2xl" />
                      <span className="font-semibold">
                        {params.locale === 'id' ? 'AKTIF' : 'ACTIVE'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold">{giveaway.title}</h3>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{giveaway.description}</p>
                    
                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-1">
                        {params.locale === 'id' ? 'Hadiah:' : 'Prize:'}
                      </div>
                      <div className="text-2xl font-bold text-primary-600">{giveaway.prize}</div>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaClock />
                        <span>{getDaysRemaining(giveaway.endDate)}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {params.locale === 'id' ? 'Berakhir:' : 'Ends:'} {formatDate(giveaway.endDate)}
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleJoin(giveaway.id)}
                      disabled={joining === giveaway.id}
                      className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold disabled:opacity-50"
                    >
                      {joining === giveaway.id 
                        ? (params.locale === 'id' ? 'Bergabung...' : 'Joining...') 
                        : (params.locale === 'id' ? 'Ikut Giveaway' : 'Join Giveaway')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Ended Giveaways */}
        {endedGiveaways.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-6">
              {params.locale === 'id' ? 'Giveaway Berakhir' : 'Ended Giveaways'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {endedGiveaways.map(giveaway => (
                <div key={giveaway.id} className="bg-white rounded-xl shadow-lg overflow-hidden opacity-75">
                  <div className="p-4 bg-gray-400 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <FaGift className="text-2xl" />
                      <span className="font-semibold">
                        {params.locale === 'id' ? 'BERAKHIR' : 'ENDED'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold">{giveaway.title}</h3>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{giveaway.description}</p>
                    
                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-1">
                        {params.locale === 'id' ? 'Hadiah:' : 'Prize:'}
                      </div>
                      <div className="text-2xl font-bold text-gray-600">{giveaway.prize}</div>
                    </div>
                    
                    <button 
                      disabled
                      className="w-full bg-gray-300 text-gray-600 py-3 rounded-lg cursor-not-allowed font-semibold"
                    >
                      {params.locale === 'id' ? 'Sudah Berakhir' : 'Already Ended'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {giveaways.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <FaGift className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {params.locale === 'id' 
                ? 'Belum ada giveaway saat ini. Periksa kembali nanti!' 
                : 'No giveaways available at the moment. Check back later!'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
