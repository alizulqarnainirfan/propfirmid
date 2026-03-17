'use client'
import { useState } from 'react'
import { FaGift, FaEnvelope, FaCheckCircle } from 'react-icons/fa'
import { Locale } from '@/i18n/translations'

export default function GiveawaySubscribe({ locale }: { locale: Locale }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/giveaway-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to subscribe')
        setLoading(false)
        return
      }

      setSuccess(true)
      setEmail('')
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 bg-gradient-to-r from-green-500 to-green-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
            <FaGift className="text-4xl text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {locale === 'id' ? 'Ikuti Giveaway & Menangkan Hadiah!' : 'Subscribe to Win Giveaways!'}
          </h2>
          
          <p className="text-xl mb-8 text-white/90">
            {locale === 'id' 
              ? 'Daftarkan email Anda dan dapatkan kesempatan memenangkan akun funded gratis dan hadiah menarik lainnya'
              : 'Subscribe with your email and get a chance to win free funded accounts and other exciting prizes'}
          </p>

          {success ? (
            <div className="bg-white/20 backdrop-blur-sm border-2 border-white/40 rounded-xl p-6 max-w-md mx-auto">
              <FaCheckCircle className="text-5xl text-white mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">
                {locale === 'id' ? 'Berhasil Berlangganan!' : 'Successfully Subscribed!'}
              </h3>
              <p className="text-white/90">
                {locale === 'id' 
                  ? 'Terima kasih! Kami akan mengirimkan informasi giveaway ke email Anda.'
                  : 'Thank you! We will send giveaway information to your email.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={locale === 'id' ? 'Masukkan email Anda' : 'Enter your email'}
                    className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/30"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {loading 
                    ? (locale === 'id' ? 'Memproses...' : 'Processing...') 
                    : (locale === 'id' ? 'Berlangganan' : 'Subscribe')}
                </button>
              </div>
              
              {error && (
                <div className="mt-4 bg-red-500/20 border border-red-300 text-white rounded-lg p-3 text-sm">
                  {error}
                </div>
              )}
            </form>
          )}

          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <FaCheckCircle />
              <span>{locale === 'id' ? 'Gratis' : 'Free'}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle />
              <span>{locale === 'id' ? 'Tanpa Spam' : 'No Spam'}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle />
              <span>{locale === 'id' ? 'Bisa Berhenti Kapan Saja' : 'Unsubscribe Anytime'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
