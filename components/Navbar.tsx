'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { FaBars, FaTimes, FaGlobe, FaUser } from 'react-icons/fa'
import Logo from './Logo'
import { translations, Locale } from '@/i18n/translations'
import { getAuthUser, clearAuth } from '@/lib/auth'

export default function Navbar({ locale }: { locale: Locale }) {
  const [isOpen, setIsOpen] = useState(false)
  const [showLangMenu, setShowLangMenu] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [user, setUser] = useState<{ id: string; name: string; role?: string } | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const t = translations[locale] || translations['en']

  useEffect(() => {
    setUser(getAuthUser())
  }, [pathname])

  const switchLocale = (newLocale: Locale) => {
    const currentPath = pathname.replace(`/${locale}`, '')
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`
    window.location.href = `/${newLocale}${currentPath}`
  }

  const handleLogout = () => {
    clearAuth()
    setUser(null)
    setShowUserMenu(false)
    router.push(`/${locale}`)
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Logo width={120} height={40} />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href={`/${locale}`} className="text-gray-700 hover:text-primary-600 transition">
              {t.nav.home}
            </Link>
            <Link href={`/${locale}/firms`} className="text-gray-700 hover:text-primary-600 transition">
              {locale === 'id' ? 'Semua Firms' : 'All Firms'}
            </Link>
            <Link href={`/${locale}/compare`} className="text-gray-700 hover:text-primary-600 transition">
              {t.nav.compare}
            </Link>
            <Link href={`/${locale}/blogs`} className="text-gray-700 hover:text-primary-600 transition">
              {locale === 'id' ? 'Blog' : 'Blog'}
            </Link>
            {/* <Link href={`/${locale}/forum`} className="text-gray-700 hover:text-primary-600 transition">
              {t.nav.forum}
            </Link> */}
            <Link href={`/${locale}/reviews`} className="text-gray-700 hover:text-primary-600 transition">
              {t.nav.reviews}
            </Link>
            <Link href={`/${locale}/giveaways`} className="text-gray-700 hover:text-primary-600 transition">
              {t.nav.giveaways}
            </Link>
            {user?.role === 'admin' && (
              <Link href={`/${locale}/admin`} className="text-primary-600 hover:text-primary-700 transition font-semibold">
                {locale === 'id' ? 'Admin' : 'Admin'}
              </Link>
            )}
          </div>

          <div className="hidden md:flex space-x-4 items-center">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition"
              >
                <FaGlobe />
                <span className="uppercase">{locale}</span>
              </button>
              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg py-2 z-50">
                  <button
                    onClick={() => switchLocale('id')}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    🇮🇩 Indonesia
                  </button>
                  <button
                    onClick={() => switchLocale('en')}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    🇬🇧 English
                  </button>
                </div>
              )}
            </div>
            
            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <FaUser className="text-primary-600" />
                  </div>
                  <span>{user.name}</span>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <Link
                      href={`/${locale}/profile`}
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      {locale === 'id' ? 'Profil' : 'Profile'}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                      {locale === 'id' ? 'Keluar' : 'Logout'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link 
                  href={`/${locale}/login`}
                  className="text-primary-600 hover:text-primary-700 font-semibold transition"
                >
                  {t.nav.login}
                </Link>
                <Link 
                  href={`/${locale}/register`}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
                >
                  {t.nav.register}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href={`/${locale}`} className="text-gray-700 hover:text-primary-600">
                {t.nav.home}
              </Link>
              <Link href={`/${locale}/firms`} className="text-gray-700 hover:text-primary-600">
                {locale === 'id' ? 'Semua Firms' : 'All Firms'}
              </Link>
              <Link href={`/${locale}/compare`} className="text-gray-700 hover:text-primary-600">
                {t.nav.compare}
              </Link>
              <Link href={`/${locale}/blogs`} className="text-gray-700 hover:text-primary-600">
                {locale === 'id' ? 'Blog' : 'Blog'}
              </Link>
              {/* <Link href={`/${locale}/forum`} className="text-gray-700 hover:text-primary-600">
                {t.nav.forum}
              </Link> */}
              <Link href={`/${locale}/reviews`} className="text-gray-700 hover:text-primary-600">
                {t.nav.reviews}
              </Link>
              <Link href={`/${locale}/giveaways`} className="text-gray-700 hover:text-primary-600">
                {t.nav.giveaways}
              </Link>
              {user?.role === 'admin' && (
                <Link href={`/${locale}/admin`} className="text-primary-600 hover:text-primary-700 font-semibold">
                  {locale === 'id' ? 'Admin' : 'Admin'}
                </Link>
              )}
              
              {/* Mobile Language Switcher */}
              <div className="pt-4 border-t">
                <div className="flex gap-4">
                  <button
                    onClick={() => switchLocale('id')}
                    className={`px-4 py-2 rounded ${locale === 'id' ? 'bg-primary-600 text-white' : 'bg-gray-100'}`}
                  >
                    🇮🇩 ID
                  </button>
                  <button
                    onClick={() => switchLocale('en')}
                    className={`px-4 py-2 rounded ${locale === 'en' ? 'bg-primary-600 text-white' : 'bg-gray-100'}`}
                  >
                    🇬🇧 EN
                  </button>
                </div>
              </div>
              
              <div className="pt-4 border-t flex gap-4">
                {user ? (
                  <>
                    <div className="flex items-center gap-2 text-gray-700">
                      <FaUser className="text-primary-600" />
                      <span>{user.name}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-red-600 font-semibold"
                    >
                      {locale === 'id' ? 'Keluar' : 'Logout'}
                    </button>
                  </>
                ) : (
                  <>
                    <Link href={`/${locale}/login`} className="text-primary-600 font-semibold">
                      {t.nav.login}
                    </Link>
                    <Link href={`/${locale}/register`} className="bg-primary-600 text-white px-4 py-2 rounded-lg">
                      {t.nav.register}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
