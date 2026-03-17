'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaGoogle, FaFacebook } from 'react-icons/fa'
import { setAuthCookie } from '@/lib/auth'
import { Locale } from '@/i18n/translations'

export default function RegisterPage({ params }: { params: { locale: Locale } }) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (password !== confirmPassword) {
      setError(params.locale === 'id' ? 'Password tidak cocok' : 'Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError(params.locale === 'id' ? 'Password minimal 6 karakter' : 'Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Registration failed')
        setLoading(false)
        return
      }

      // Auto login after registration
      setAuthCookie(data.user.id, data.user.name)

      // Redirect to homepage
      router.push(`/${params.locale}`)
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
            {params.locale === 'id' ? 'Buat Akun Baru' : 'Create New Account'}
          </h1>
          <p className="text-gray-600">
            {params.locale === 'id' ? 'Bergabung dengan komunitas trader Indonesia' : 'Join the Indonesian trader community'}
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
              <label className="block mb-2 font-semibold">
                {params.locale === 'id' ? 'Nama Lengkap' : 'Full Name'}
              </label>
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                placeholder="John Doe"
                required
              />
            </div>

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
                minLength={6}
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                {params.locale === 'id' ? 'Konfirmasi Password' : 'Confirm Password'}
              </label>
              <input 
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                placeholder="••••••••"
                required
              />
            </div>

            <label className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" required />
              <span className="text-sm text-gray-600">
                {params.locale === 'id' ? 'Saya setuju dengan' : 'I agree to the'}{' '}
                <Link href={`/${params.locale}/terms`} className="text-primary-600 hover:text-primary-700">
                  {params.locale === 'id' ? 'Syarat & Ketentuan' : 'Terms & Conditions'}
                </Link>
                {' '}{params.locale === 'id' ? 'dan' : 'and'}{' '}
                <Link href={`/${params.locale}/privacy`} className="text-primary-600 hover:text-primary-700">
                  {params.locale === 'id' ? 'Kebijakan Privasi' : 'Privacy Policy'}
                </Link>
              </span>
            </label>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold disabled:opacity-50"
            >
              {loading ? (params.locale === 'id' ? 'Memproses...' : 'Processing...') : (params.locale === 'id' ? 'Daftar' : 'Register')}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {params.locale === 'id' ? 'Atau daftar dengan' : 'Or register with'}
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
            {params.locale === 'id' ? 'Sudah punya akun?' : 'Already have an account?'}{' '}
            <Link href={`/${params.locale}/login`} className="text-primary-600 hover:text-primary-700 font-semibold">
              {params.locale === 'id' ? 'Masuk' : 'Login'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
