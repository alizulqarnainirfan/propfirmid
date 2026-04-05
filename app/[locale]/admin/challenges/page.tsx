'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { getAuthUser } from '@/lib/auth'
import { FaEdit, FaTrash, FaDollarSign } from 'react-icons/fa'
import { Locale } from '@/i18n/translations'

export default function AdminChallengesPage({ params }: { params: { locale: Locale } }) {
  const router = useRouter()
  const [challenges, setChallenges] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<any>({})
  const [firms, setFirms] = useState<any[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [newChallenge, setNewChallenge] = useState({
    firmId: '',
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
    fetchChallenges()
    fetchFirms()
  }, [])

  const fetchFirms = async () => {
    try {
      const response = await fetch('/api/firms')
      const data = await response.json()
      setFirms(data)
    } catch (error) {
      console.error('Failed to fetch firms:', error)
    }
  }

  const fetchChallenges = async () => {
    try {
      const response = await fetch('/api/admin/challenges')
      const data = await response.json()
      setChallenges(data)
    } catch (error) {
      console.error('Failed to fetch challenges:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (challenge: any) => {
    setEditingId(challenge.id)
    setEditData(challenge)
  }

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/admin/challenges/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData)
      })

      if (response.ok) {
        const updated = await response.json()
        setChallenges(challenges.map(c => c.id === editingId ? updated : c))
        setEditingId(null)
      }
    } catch (error) {
      console.error('Failed to update challenge:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this challenge?')) return

    try {
      const response = await fetch(`/api/admin/challenges/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setChallenges(challenges.filter(c => c.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete challenge:', error)
    }
  }

  const handleAddChallenge = async () => {
    // All validations removed - allow any input
    try {
      const response = await fetch('/api/admin/challenges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newChallenge)
      })

      if (response.ok) {
        await fetchChallenges()
        setShowAddModal(false)
        setNewChallenge({
          firmId: '',
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
    } catch (error) {
      console.error('Failed to add challenge:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  // Group challenges by firm
  const challengesByFirm = challenges.reduce((acc, challenge) => {
    const firmName = challenge.firm.name
    if (!acc[firmName]) {
      acc[firmName] = {
        logo: challenge.firm.logo,
        challenges: []
      }
    }
    acc[firmName].challenges.push(challenge)
    return acc
  }, {} as any)

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            {params.locale === 'id' ? 'Kelola Harga Challenge' : 'Manage Challenge Prices'}
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
          >
            + Add New Challenge
          </button>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Challenge</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">Select Firm</label>
                  <select
                    value={newChallenge.firmId}
                    onChange={(e) => setNewChallenge({ ...newChallenge, firmId: e.target.value })}
                    className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                  >
                    <option value="">-- Select Firm --</option>
                    {firms.map((firm) => (
                      <option key={firm.id} value={firm.id}>{firm.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Challenge Name</label>
                    <input
                      type="text"
                      value={newChallenge.name}
                      onChange={(e) => setNewChallenge({ ...newChallenge, name: e.target.value })}
                      className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                      placeholder="e.g., Standard Challenge"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Account Size</label>
                    <input
                      type="text"
                      value={newChallenge.accountSize}
                      onChange={(e) => setNewChallenge({ ...newChallenge, accountSize: e.target.value })}
                      className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                      placeholder="e.g., $10,000"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Price</label>
                    <input
                      type="text"
                      value={newChallenge.price}
                      onChange={(e) => setNewChallenge({ ...newChallenge, price: e.target.value })}
                      className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                      placeholder="e.g., $99 or Free or Contact Us"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Discounted Price</label>
                    <input
                      type="text"
                      value={newChallenge.discountedPrice}
                      onChange={(e) => setNewChallenge({ ...newChallenge, discountedPrice: e.target.value })}
                      className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                      placeholder="e.g., $79 or Special Offer or N/A"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Profit Split</label>
                    <input
                      type="text"
                      value={newChallenge.profitSplit}
                      onChange={(e) => setNewChallenge({ ...newChallenge, profitSplit: e.target.value })}
                      className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                      placeholder="e.g., 80%"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Max Drawdown</label>
                    <input
                      type="text"
                      value={newChallenge.maxDrawdown}
                      onChange={(e) => setNewChallenge({ ...newChallenge, maxDrawdown: e.target.value })}
                      className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                      placeholder="e.g., 10%"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Daily Drawdown</label>
                    <input
                      type="text"
                      value={newChallenge.dailyDrawdown}
                      onChange={(e) => setNewChallenge({ ...newChallenge, dailyDrawdown: e.target.value })}
                      className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                      placeholder="e.g., 5%"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Phase 1 Target</label>
                    <input
                      type="text"
                      value={newChallenge.phase1Target}
                      onChange={(e) => setNewChallenge({ ...newChallenge, phase1Target: e.target.value })}
                      className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                      placeholder="e.g., 8%"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Phase 2 Target</label>
                    <input
                      type="text"
                      value={newChallenge.phase2Target}
                      onChange={(e) => setNewChallenge({ ...newChallenge, phase2Target: e.target.value })}
                      className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                      placeholder="e.g., 5%"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Min Days</label>
                    <input
                      type="text"
                      value={newChallenge.minDays}
                      onChange={(e) => setNewChallenge({ ...newChallenge, minDays: e.target.value })}
                      className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                      placeholder="e.g., 5 or No Minimum or Flexible"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Max Days</label>
                    <input
                      type="text"
                      value={newChallenge.maxDays}
                      onChange={(e) => setNewChallenge({ ...newChallenge, maxDays: e.target.value })}
                      className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                      placeholder="e.g., 30 or Unlimited or Varies"
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newChallenge.refundable}
                        onChange={(e) => setNewChallenge({ ...newChallenge, refundable: e.target.checked })}
                      />
                      <span>Refundable</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleAddChallenge}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
                >
                  Add Challenge
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {Object.entries(challengesByFirm).map(([firmName, data]: [string, any]) => (
            <div key={firmName} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 flex items-center gap-3 border-b">
                <Image src={data.logo} alt={firmName} width={40} height={40} className="rounded" />
                <h2 className="text-xl font-bold text-gray-800">{firmName}</h2>
                <span className="text-gray-600">({data.challenges.length} challenges)</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Account Size</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Discounted</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Profit Split</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Max DD</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {data.challenges.map((challenge: any) => (
                      <tr key={challenge.id} className="hover:bg-gray-50">
                        {editingId === challenge.id ? (
                          <>
                            <td className="px-6 py-3">
                              <input
                                type="text"
                                value={editData.accountSize}
                                onChange={(e) => setEditData({ ...editData, accountSize: e.target.value })}
                                className="w-full border rounded p-2"
                              />
                            </td>
                            <td className="px-6 py-3">
                              <input
                                type="text"
                                value={editData.price}
                                onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                                className="w-full border rounded p-2"
                                placeholder="e.g., $99 or Free"
                              />
                            </td>
                            <td className="px-6 py-3">
                              <input
                                type="text"
                                value={editData.discountedPrice}
                                onChange={(e) => setEditData({ ...editData, discountedPrice: e.target.value })}
                                className="w-full border rounded p-2"
                                placeholder="e.g., $79 or Special"
                              />
                            </td>
                            <td className="px-6 py-3">
                              <input
                                type="text"
                                value={editData.profitSplit}
                                onChange={(e) => setEditData({ ...editData, profitSplit: e.target.value })}
                                className="w-full border rounded p-2"
                              />
                            </td>
                            <td className="px-6 py-3">
                              <input
                                type="text"
                                value={editData.maxDrawdown}
                                onChange={(e) => setEditData({ ...editData, maxDrawdown: e.target.value })}
                                className="w-full border rounded p-2"
                              />
                            </td>
                            <td className="px-6 py-3">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={handleSave}
                                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingId(null)}
                                  className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm"
                                >
                                  Cancel
                                </button>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="px-6 py-3 font-semibold text-gray-800">{challenge.accountSize}</td>
                            <td className="px-6 py-3 text-gray-700">${challenge.price}</td>
                            <td className="px-6 py-3 text-primary-600 font-semibold">${challenge.discountedPrice}</td>
                            <td className="px-6 py-3 text-gray-700">{challenge.profitSplit}</td>
                            <td className="px-6 py-3 text-gray-700">{challenge.maxDrawdown}</td>
                            <td className="px-6 py-3">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => handleEdit(challenge)}
                                  className="p-2 text-green-600 hover:bg-green-50 rounded transition"
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  onClick={() => handleDelete(challenge.id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
