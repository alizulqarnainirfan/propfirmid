'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAuthUser } from '@/lib/auth'
import { Locale } from '@/i18n/translations'

export default function NewFirmPage({ params }: { params: { locale: Locale } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    type: 'Forex Prop Firm',
    rating: '4.0',
    trusted: '0',
    discount: '',
    showCouponCode: true,
    price: '0',
    discounted: '0',
    priceTag: 'Best Price',
    bonus: '',
    profitSplit: '80%',
    maxDrawdown: '10%',
    dailyDrawdown: '5%',
    minTradingDays: '0',
    maxTradingDays: '0',
    payoutSpeed: '2-5 days',
    platforms: 'MT4, MT5',
    instruments: 'Forex, Indices, Commodities',
    leverage: '1:100',
    refundable: false,
    scalingPlan: false,
    newsTrading: true,
    weekendHolding: true,
    eaAllowed: true,
    copyTrading: false,
    minPayoutAmount: '$100',
    payoutMethods: 'Bank Transfer',
    trustScore: '4.0',
    verificationStatus: 'Verified'
  })

  const [challenges, setChallenges] = useState<any[]>([])
  const [newChallenge, setNewChallenge] = useState({
    name: '',
    accountSize: '',
    price: '',
    discountedPrice: '',
    phase1Target: '',
    phase2Target: '',
    maxDrawdown: '',
    dailyDrawdown: '',
    minDays: '',
    maxDays: '',
    profitSplit: '',
    refundable: false
  })

  useEffect(() => {
    const authUser = getAuthUser()
    if (!authUser || authUser.role !== 'admin') {
      window.location.href = `/${params.locale}/login`
      return
    }
  }, [])

  const addChallenge = () => {
    // Validation removed - allow any input
    setChallenges([...challenges, { ...newChallenge, id: Date.now().toString() }])
    setNewChallenge({
      name: '',
      accountSize: '',
      price: '',
      discountedPrice: '',
      phase1Target: '',
      phase2Target: '',
      maxDrawdown: '',
      dailyDrawdown: '',
      minDays: '',
      maxDays: '',
      profitSplit: '',
      refundable: false
    })
  }

  const removeChallenge = (id: string) => {
    setChallenges(challenges.filter(c => c.id !== id))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/firms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, challenges })
      })

      if (response.ok) {
        router.push(`/${params.locale}/admin/firms`)
      } else {
        alert('Failed to create firm')
      }
    } catch (error) {
      console.error('Failed to create firm:', error)
      alert('Failed to create firm')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          {params.locale === 'id' ? 'Tambah Firm Baru' : 'Add New Firm'}
        </h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Firm Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Logo URL</label>
              <input
                type="text"
                value={formData.logo}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
              >
                <option>Forex Prop Firm</option>
                <option>Instant Prop Firm</option>
                <option>Broker Prop Firm</option>
                <option>Crypto Prop Firm</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Rating</label>
              <input
                type="number"
                step="0.1"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Trusted By</label>
              <input
                type="number"
                value={formData.trusted}
                onChange={(e) => setFormData({ ...formData, trusted: e.target.value })}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Discount</label>
              <input
                type="text"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                placeholder="e.g., 20% OFF"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Show Coupon Code</label>
              <label className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg p-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.showCouponCode !== false}
                  onChange={(e) => setFormData({ ...formData, showCouponCode: e.target.checked })}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-600 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">
                  {params.locale === 'id' ? 'Tampilkan kode kupon' : 'Show coupon code'}
                </span>
              </label>
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Price</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Discounted Price</label>
              <input
                type="number"
                value={formData.discounted}
                onChange={(e) => setFormData({ ...formData, discounted: e.target.value })}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Price Tag</label>
              <input
                type="text"
                value={formData.priceTag}
                onChange={(e) => setFormData({ ...formData, priceTag: e.target.value })}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                placeholder="e.g., Cheapest Price, Best Deal, Limited Offer"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Profit Split</label>
              <input
                type="text"
                value={formData.profitSplit}
                onChange={(e) => setFormData({ ...formData, profitSplit: e.target.value })}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Max Drawdown</label>
              <input
                type="text"
                value={formData.maxDrawdown}
                onChange={(e) => setFormData({ ...formData, maxDrawdown: e.target.value })}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Daily Drawdown</label>
              <input
                type="text"
                value={formData.dailyDrawdown}
                onChange={(e) => setFormData({ ...formData, dailyDrawdown: e.target.value })}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Leverage</label>
              <input
                type="text"
                value={formData.leverage}
                onChange={(e) => setFormData({ ...formData, leverage: e.target.value })}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Platforms</label>
              <input
                type="text"
                value={formData.platforms}
                onChange={(e) => setFormData({ ...formData, platforms: e.target.value })}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Instruments</label>
              <input
                type="text"
                value={formData.instruments}
                onChange={(e) => setFormData({ ...formData, instruments: e.target.value })}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Payout Speed</label>
              <input
                type="text"
                value={formData.payoutSpeed}
                onChange={(e) => setFormData({ ...formData, payoutSpeed: e.target.value })}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Min Payout Amount</label>
              <input
                type="text"
                value={formData.minPayoutAmount}
                onChange={(e) => setFormData({ ...formData, minPayoutAmount: e.target.value })}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Payout Methods</label>
              <input
                type="text"
                value={formData.payoutMethods}
                onChange={(e) => setFormData({ ...formData, payoutMethods: e.target.value })}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Verification Status</label>
              <select
                value={formData.verificationStatus}
                onChange={(e) => setFormData({ ...formData, verificationStatus: e.target.value })}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
              >
                <option>Verified</option>
                <option>Pending</option>
                <option>Unverified</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">Bonus/Perks</label>
            <textarea
              value={formData.bonus}
              onChange={(e) => setFormData({ ...formData, bonus: e.target.value })}
              className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.refundable}
                onChange={(e) => setFormData({ ...formData, refundable: e.target.checked })}
              />
              <span>Refundable</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.scalingPlan}
                onChange={(e) => setFormData({ ...formData, scalingPlan: e.target.checked })}
              />
              <span>Scaling Plan</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.newsTrading}
                onChange={(e) => setFormData({ ...formData, newsTrading: e.target.checked })}
              />
              <span>News Trading</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.weekendHolding}
                onChange={(e) => setFormData({ ...formData, weekendHolding: e.target.checked })}
              />
              <span>Weekend Holding</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.eaAllowed}
                onChange={(e) => setFormData({ ...formData, eaAllowed: e.target.checked })}
              />
              <span>EA Allowed</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.copyTrading}
                onChange={(e) => setFormData({ ...formData, copyTrading: e.target.checked })}
              />
              <span>Copy Trading</span>
            </label>
          </div>

          <div className="border-t pt-6 mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {params.locale === 'id' ? 'Challenges' : 'Challenges'}
            </h2>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-gray-700 mb-3">Add Challenge</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Challenge Name"
                  value={newChallenge.name}
                  onChange={(e) => setNewChallenge({ ...newChallenge, name: e.target.value })}
                  className="border rounded-lg p-2"
                />
                <input
                  type="text"
                  placeholder="Account Size (e.g., $10,000)"
                  value={newChallenge.accountSize}
                  onChange={(e) => setNewChallenge({ ...newChallenge, accountSize: e.target.value })}
                  className="border rounded-lg p-2"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={newChallenge.price}
                  onChange={(e) => setNewChallenge({ ...newChallenge, price: e.target.value })}
                  className="border rounded-lg p-2"
                />
                <input
                  type="number"
                  placeholder="Discounted Price"
                  value={newChallenge.discountedPrice}
                  onChange={(e) => setNewChallenge({ ...newChallenge, discountedPrice: e.target.value })}
                  className="border rounded-lg p-2"
                />
                <input
                  type="text"
                  placeholder="Profit Split (e.g., 80%)"
                  value={newChallenge.profitSplit}
                  onChange={(e) => setNewChallenge({ ...newChallenge, profitSplit: e.target.value })}
                  className="border rounded-lg p-2"
                />
                <input
                  type="text"
                  placeholder="Max Drawdown (e.g., 10%)"
                  value={newChallenge.maxDrawdown}
                  onChange={(e) => setNewChallenge({ ...newChallenge, maxDrawdown: e.target.value })}
                  className="border rounded-lg p-2"
                />
                <input
                  type="text"
                  placeholder="Daily Drawdown (e.g., 5%)"
                  value={newChallenge.dailyDrawdown}
                  onChange={(e) => setNewChallenge({ ...newChallenge, dailyDrawdown: e.target.value })}
                  className="border rounded-lg p-2"
                />
                <input
                  type="text"
                  placeholder="Phase 1 Target"
                  value={newChallenge.phase1Target}
                  onChange={(e) => setNewChallenge({ ...newChallenge, phase1Target: e.target.value })}
                  className="border rounded-lg p-2"
                />
                <input
                  type="text"
                  placeholder="Phase 2 Target"
                  value={newChallenge.phase2Target}
                  onChange={(e) => setNewChallenge({ ...newChallenge, phase2Target: e.target.value })}
                  className="border rounded-lg p-2"
                />
                <input
                  type="number"
                  placeholder="Min Days"
                  value={newChallenge.minDays}
                  onChange={(e) => setNewChallenge({ ...newChallenge, minDays: e.target.value })}
                  className="border rounded-lg p-2"
                />
                <input
                  type="number"
                  placeholder="Max Days"
                  value={newChallenge.maxDays}
                  onChange={(e) => setNewChallenge({ ...newChallenge, maxDays: e.target.value })}
                  className="border rounded-lg p-2"
                />
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newChallenge.refundable}
                    onChange={(e) => setNewChallenge({ ...newChallenge, refundable: e.target.checked })}
                  />
                  <span>Refundable</span>
                </label>
              </div>
              <button
                type="button"
                onClick={addChallenge}
                className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Add Challenge
              </button>
            </div>

            {challenges.length > 0 && (
              <div className="bg-white border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-semibold">Account Size</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold">Price</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold">Discounted</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold">Profit Split</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold">Max DD</th>
                      <th className="px-4 py-2 text-right text-sm font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {challenges.map((challenge) => (
                      <tr key={challenge.id}>
                        <td className="px-4 py-2">{challenge.accountSize}</td>
                        <td className="px-4 py-2">${challenge.price}</td>
                        <td className="px-4 py-2">${challenge.discountedPrice}</td>
                        <td className="px-4 py-2">{challenge.profitSplit}</td>
                        <td className="px-4 py-2">{challenge.maxDrawdown}</td>
                        <td className="px-4 py-2 text-right">
                          <button
                            type="button"
                            onClick={() => removeChallenge(challenge.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Firm'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
