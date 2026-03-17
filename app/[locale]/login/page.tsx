'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaGoogle, FaFacebook } from 'react-icons/fa'
import { setAuthCookie } from '@/lib/auth'
import { Locale } from '@/i18n/translations'

export default function LoginPage({ params }: { params: { locale: Locale } }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Login failed')
        setLoading(false)
        return
      }

      console.log('Login response:', data)
      console.log('User role:', data.user.role)

      // Save auth data
      setAuthCookie(data.user.id, data.user.name, data.user.role)

      // Verify it was saved
      const savedRole = localStorage.getItem('userRole')
      console.log('Saved role in localStorage:', savedRole)

      // Redirect to homepage or admin dashboard
      if (data.user.role === 'admin') {
        console.log('Redirecting to admin dashboard')
        window.location.href = `/${params.locale}/admin`
      } else {
        console.log('Redirecting to homepage')
        window.location.href = `/${params.locale}`
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {params.locale === 'id' ? 'Masuk ke Akun' : 'Login to Account'}
          </h1>
          <p className="text-gray-600">
            {params.locale === 'id' ? 'Selamat datang kembali!' : 'Welcome back!'}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 font-semibold">Email</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                placeholder="email@example.com"
                required
              />
            </div>
            
            <div>
              <label className="block mb-2 font-semibold">Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="text-sm">
                  {params.locale === 'id' ? 'Ingat saya' : 'Remember me'}
                </span>
              </label>
              <Link href={`/${params.locale}/forgot-password`} className="text-sm text-primary-600 hover:text-primary-700">
                {params.locale === 'id' ? 'Lupa password?' : 'Forgot password?'}
              </Link>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold disabled:opacity-50"
            >
              {loading ? (params.locale === 'id' ? 'Memproses...' : 'Processing...') : (params.locale === 'id' ? 'Masuk' : 'Login')}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {params.locale === 'id' ? 'Atau masuk dengan' : 'Or login with'}
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition">
                <FaGoogle className="text-red-500" />
                Google
              </button>
              <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition">
                <FaFacebook className="text-blue-600" />
                Facebook
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            {params.locale === 'id' ? 'Belum punya akun?' : "Don't have an account?"}{' '}
            <Link href={`/${params.locale}/register`} className="text-primary-600 hover:text-primary-700 font-semibold">
              {params.locale === 'id' ? 'Daftar sekarang' : 'Register now'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
