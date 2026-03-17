'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getAuthUser } from '@/lib/auth'
import { FaBlog, FaBuilding, FaUsers, FaGift, FaDollarSign, FaChartLine, FaStar, FaCog } from 'react-icons/fa'
import { Locale } from '@/i18n/translations'
import AdminStats from '@/components/AdminStats'
import AdminErrorBoundary from '@/components/AdminErrorBoundary'

export default function AdminDashboard({ params }: { params: { locale: Locale } }) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const authUser = getAuthUser()
    if (!authUser || authUser.role !== 'admin') {
      window.location.href = `/${params.locale}/login`
      return
    }
    setUser(authUser)
    setLoading(false)
  }, [])

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
    <AdminErrorBoundary>
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {params.locale === 'id' ? 'Dashboard Admin' : 'Admin Dashboard'}
            </h1>
            <p className="text-gray-600">
              {params.locale === 'id' ? 'Kelola konten dan data website' : 'Manage website content and data'}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-8">
            <AdminStats />
          </div>

          {/* Management Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href={`/${params.locale}/admin/blogs`} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition">
                  <FaBlog className="text-blue-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {params.locale === 'id' ? 'Kelola Blog' : 'Manage Blogs'}
                </h3>
              </div>
              <p className="text-gray-600">
                {params.locale === 'id' ? 'Buat, edit, dan hapus artikel blog' : 'Create, edit, and delete blog articles'}
              </p>
            </Link>

            <Link href={`/${params.locale}/admin/firms`} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition">
                  <FaBuilding className="text-green-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {params.locale === 'id' ? 'Kelola Firms' : 'Manage Firms'}
                </h3>
              </div>
              <p className="text-gray-600">
                {params.locale === 'id' ? 'Tambah, edit, dan hapus prop firms' : 'Add, edit, and delete prop firms'}
              </p>
            </Link>

            <Link href={`/${params.locale}/admin/challenges`} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-200 transition">
                  <FaDollarSign className="text-indigo-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {params.locale === 'id' ? 'Kelola Harga' : 'Manage Prices'}
                </h3>
              </div>
              <p className="text-gray-600">
                {params.locale === 'id' ? 'Edit harga dan tipe akun challenge' : 'Edit challenge prices and account types'}
              </p>
            </Link>

            <Link href={`/${params.locale}/admin/reviews`} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition">
                  <FaStar className="text-orange-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {params.locale === 'id' ? 'Kelola Review' : 'Manage Reviews'}
                </h3>
              </div>
              <p className="text-gray-600">
                {params.locale === 'id' ? 'Setujui atau tolak review pengguna' : 'Approve or reject user reviews'}
              </p>
            </Link>

            <Link href={`/${params.locale}/admin/users`} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition">
                  <FaUsers className="text-purple-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {params.locale === 'id' ? 'Kelola Users' : 'Manage Users'}
                </h3>
              </div>
              <p className="text-gray-600">
                {params.locale === 'id' ? 'Lihat dan hapus pengguna' : 'View and remove users'}
              </p>
            </Link>

            <Link href={`/${params.locale}/admin/giveaways`} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center group-hover:bg-yellow-200 transition">
                  <FaGift className="text-yellow-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {params.locale === 'id' ? 'Kelola Giveaways' : 'Manage Giveaways'}
                </h3>
              </div>
              <p className="text-gray-600">
                {params.locale === 'id' ? 'Tambah dan kelola giveaway' : 'Add and manage giveaways'}
              </p>
            </Link>

            <Link href={`/${params.locale}/admin/subscribers`} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition">
                  <FaChartLine className="text-green-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {params.locale === 'id' ? 'Subscriber Giveaway' : 'Giveaway Subscribers'}
                </h3>
              </div>
              <p className="text-gray-600">
                {params.locale === 'id' ? 'Lihat daftar email subscriber' : 'View email subscriber list'}
              </p>
            </Link>

            <Link href={`/${params.locale}/admin/site-settings`} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-200 transition">
                  <FaCog className="text-indigo-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {params.locale === 'id' ? 'Pengaturan Website' : 'Site Settings'}
                </h3>
              </div>
              <p className="text-gray-600">
                {params.locale === 'id' ? 'Kelola statistik homepage dan pengaturan website' : 'Manage homepage statistics and site settings'}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </AdminErrorBoundary>
  )
}
