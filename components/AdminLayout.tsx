'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getAuthUser, clearAuth } from '@/lib/auth'
import { FaBlog, FaBuilding, FaUsers, FaGift, FaDollarSign, FaStar, FaSignOutAlt, FaTachometerAlt, FaChartLine, FaCog } from 'react-icons/fa'
import { Locale } from '@/i18n/translations'

interface AdminLayoutProps {
  children: React.ReactNode
  locale: Locale
  title?: string
}

export default function AdminLayout({ children, locale, title }: AdminLayoutProps) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const authUser = getAuthUser()
    if (!authUser || authUser.role !== 'admin') {
      window.location.href = `/${locale}/login`
      return
    }
    setUser(authUser)
    setLoading(false)
  }, [locale])

  const handleLogout = () => {
    clearAuth()
    window.location.href = `/${locale}/login`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const navigation = [
    { name: 'Dashboard', href: `/${locale}/admin`, icon: FaTachometerAlt },
    { name: 'Blogs', href: `/${locale}/admin/blogs`, icon: FaBlog },
    { name: 'Firms', href: `/${locale}/admin/firms`, icon: FaBuilding },
    { name: 'Challenges', href: `/${locale}/admin/challenges`, icon: FaDollarSign },
    { name: 'Reviews', href: `/${locale}/admin/reviews`, icon: FaStar },
    { name: 'Users', href: `/${locale}/admin/users`, icon: FaUsers },
    { name: 'Giveaways', href: `/${locale}/admin/giveaways`, icon: FaGift },
    { name: 'Subscribers', href: `/${locale}/admin/subscribers`, icon: FaChartLine },
    { name: 'Site Settings', href: `/${locale}/admin/site-settings`, icon: FaCog },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href={`/${locale}/admin`} className="text-xl font-bold text-primary-600">
                Admin Panel
              </Link>
              {title && (
                <>
                  <span className="mx-3 text-gray-400">/</span>
                  <span className="text-gray-700">{title}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="mt-8">
            <div className="px-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition"
                >
                  <item.icon className="text-lg" />
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}