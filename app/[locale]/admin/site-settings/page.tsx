'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAuthUser } from '@/lib/auth'
import { FaUsers, FaStar, FaChartLine, FaGift, FaSave } from 'react-icons/fa'
import { Locale } from '@/i18n/translations'
import AdminErrorBoundary from '@/components/AdminErrorBoundary'

interface SiteSettings {
  id: string
  communityMembers: string
  verifiedReviews: string
  trustedFirms: string
  freeAccountsDistributed: string
}

export default function AdminSiteSettingsPage({ params }: { params: { locale: Locale } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [settings, setSettings] = useState<SiteSettings>({
    id: '',
    communityMembers: '75K+',
    verifiedReviews: '3000+',
    trustedFirms: '20+',
    freeAccountsDistributed: '5000+'
  })

  useEffect(() => {
    const authUser = getAuthUser()
    if (!authUser || authUser.role !== 'admin') {
      window.location.href = `/${params.locale}/login`
      return
    }
    fetchSettings()
  }, [])

  // Auto-hide notification after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const showSuccess = (message: string) => {
    setNotification({ type: 'success', message })
  }

  const showError = (message: string) => {
    setNotification({ type: 'error', message })
  }

  useEffect(() => {
    const authUser = getAuthUser()
    if (!authUser || authUser.role !== 'admin') {
      window.location.href = `/${params.locale}/login`
      return
    }
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/site-settings')
      if (response.ok) {
        const data = await response.json()
        setSettings(data)
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error)
      showError('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch('/api/admin/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })

      if (response.ok) {
        showSuccess('Homepage statistics updated successfully!')
      } else {
        showError('Failed to update settings')
      }
    } catch (error) {
      console.error('Failed to update settings:', error)
      showError('Failed to update settings')
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field: keyof SiteSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <AdminErrorBoundary>
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          <div className="flex items-center gap-2">
            <span>{notification.message}</span>
            <button 
              onClick={() => setNotification(null)}
              className="ml-2 text-lg font-bold hover:opacity-70"
            >
              ×
            </button>
          </div>
        </div>
      )}
      
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {params.locale === 'id' ? 'Pengaturan Statistik Homepage' : 'Homepage Statistics Settings'}
            </h1>
            <p className="text-gray-600">
              {params.locale === 'id' 
                ? 'Kelola statistik yang ditampilkan di homepage website' 
                : 'Manage the statistics displayed on the website homepage'}
            </p>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {params.locale === 'id' ? 'Preview Statistik' : 'Statistics Preview'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <FaUsers className="text-4xl text-primary-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-800">{settings.communityMembers}</div>
                <div className="text-gray-600">
                  {params.locale === 'id' ? 'Anggota Komunitas' : 'Community Members'}
                </div>
              </div>
              <div>
                <FaStar className="text-4xl text-primary-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-800">{settings.verifiedReviews}</div>
                <div className="text-gray-600">
                  {params.locale === 'id' ? 'Review Terverifikasi' : 'Verified Reviews'}
                </div>
              </div>
              <div>
                <FaChartLine className="text-4xl text-primary-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-800">{settings.trustedFirms}</div>
                <div className="text-gray-600">
                  {params.locale === 'id' ? 'Prop Firm Terpercaya' : 'Trusted Prop Firms'}
                </div>
              </div>
              <div>
                <FaGift className="text-4xl text-primary-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-800">{settings.freeAccountsDistributed}</div>
                <div className="text-gray-600">
                  {params.locale === 'id' ? 'Akun Gratis Dibagikan' : 'Free Accounts Distributed'}
                </div>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {params.locale === 'id' ? 'Edit Statistik' : 'Edit Statistics'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  <FaUsers className="inline mr-2" />
                  {params.locale === 'id' ? 'Anggota Komunitas' : 'Community Members'}
                </label>
                <input
                  type="text"
                  value={settings.communityMembers}
                  onChange={(e) => handleInputChange('communityMembers', e.target.value)}
                  className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                  placeholder="e.g., 75K+"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  {params.locale === 'id' 
                    ? 'Contoh: 75K+, 100K+, 50,000+' 
                    : 'Examples: 75K+, 100K+, 50,000+'}
                </p>
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  <FaStar className="inline mr-2" />
                  {params.locale === 'id' ? 'Review Terverifikasi' : 'Verified Reviews'}
                </label>
                <input
                  type="text"
                  value={settings.verifiedReviews}
                  onChange={(e) => handleInputChange('verifiedReviews', e.target.value)}
                  className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                  placeholder="e.g., 3000+"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  {params.locale === 'id' 
                    ? 'Contoh: 3000+, 5K+, 10,000+' 
                    : 'Examples: 3000+, 5K+, 10,000+'}
                </p>
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  <FaChartLine className="inline mr-2" />
                  {params.locale === 'id' ? 'Prop Firm Terpercaya' : 'Trusted Prop Firms'}
                </label>
                <input
                  type="text"
                  value={settings.trustedFirms}
                  onChange={(e) => handleInputChange('trustedFirms', e.target.value)}
                  className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                  placeholder="e.g., 20+"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  {params.locale === 'id' 
                    ? 'Contoh: 20+, 50+, 100+' 
                    : 'Examples: 20+, 50+, 100+'}
                </p>
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  <FaGift className="inline mr-2" />
                  {params.locale === 'id' ? 'Akun Gratis Dibagikan' : 'Free Accounts Distributed'}
                </label>
                <input
                  type="text"
                  value={settings.freeAccountsDistributed}
                  onChange={(e) => handleInputChange('freeAccountsDistributed', e.target.value)}
                  className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                  placeholder="e.g., 5000+"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  {params.locale === 'id' 
                    ? 'Contoh: 5000+, 10K+, 25,000+' 
                    : 'Examples: 5000+, 10K+, 25,000+'}
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-6 border-t">
              <button
                type="submit"
                disabled={saving}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition disabled:opacity-50 flex items-center gap-2"
              >
                <FaSave />
                {saving 
                  ? (params.locale === 'id' ? 'Menyimpan...' : 'Saving...') 
                  : (params.locale === 'id' ? 'Simpan Perubahan' : 'Save Changes')
                }
              </button>
              <button
                type="button"
                onClick={() => router.push(`/${params.locale}/admin`)}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
              >
                {params.locale === 'id' ? 'Kembali' : 'Back'}
              </button>
            </div>
          </form>

          {/* Tips Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              💡 {params.locale === 'id' ? 'Tips Penggunaan' : 'Usage Tips'}
            </h3>
            <ul className="text-blue-700 space-y-2">
              <li>• {params.locale === 'id' 
                ? 'Gunakan format yang mudah dibaca seperti "75K+" atau "5,000+"' 
                : 'Use readable formats like "75K+" or "5,000+"'}
              </li>
              <li>• {params.locale === 'id' 
                ? 'Perubahan akan langsung terlihat di homepage setelah disimpan' 
                : 'Changes will be immediately visible on the homepage after saving'}
              </li>
              <li>• {params.locale === 'id' 
                ? 'Pastikan angka yang ditampilkan akurat dan dapat dipercaya' 
                : 'Ensure displayed numbers are accurate and trustworthy'}
              </li>
              <li>• {params.locale === 'id' 
                ? 'Update statistik secara berkala untuk menjaga kredibilitas' 
                : 'Update statistics regularly to maintain credibility'}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AdminErrorBoundary>
  )
}