'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getAuthUser } from '@/lib/auth'
import { Locale } from '@/i18n/translations'

export default function NewPostPage({ params }: { params: { locale: Locale } }) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const user = getAuthUser()

  useEffect(() => {
    if (!user) {
      router.push(`/${params.locale}/login`)
    }
  }, [user, router, params.locale])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!user) {
      setError(params.locale === 'id' ? 'Silakan login terlebih dahulu' : 'Please login first')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          authorId: user.id
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to create post')
        setLoading(false)
        return
      }

      // Redirect to the new post
      router.push(`/${params.locale}/forum/${data.id}`)
    } catch (err) {
      setError('An error occurred. Please try again.')
      setLoading(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">
          {params.locale === 'id' ? 'Buat Diskusi Baru' : 'Create New Discussion'}
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-semibold text-lg">
                {params.locale === 'id' ? 'Judul Diskusi' : 'Discussion Title'}
              </label>
              <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 text-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                placeholder={params.locale === 'id' ? 'Tulis judul yang menarik...' : 'Write an interesting title...'}
                required
                maxLength={200}
              />
              <p className="text-sm text-gray-500 mt-1">{title.length}/200</p>
            </div>

            <div>
              <label className="block mb-2 font-semibold text-lg">
                {params.locale === 'id' ? 'Isi Diskusi' : 'Discussion Content'}
              </label>
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 h-64 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                placeholder={params.locale === 'id' ? 'Ceritakan pengalaman atau tanyakan sesuatu...' : 'Share your experience or ask something...'}
                required
              />
            </div>

            <div className="flex gap-4">
              <button 
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold disabled:opacity-50"
              >
                {loading 
                  ? (params.locale === 'id' ? 'Memposting...' : 'Posting...') 
                  : (params.locale === 'id' ? 'Posting Diskusi' : 'Post Discussion')}
              </button>
              <button 
                type="button"
                onClick={() => router.back()}
                className="px-8 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                {params.locale === 'id' ? 'Batal' : 'Cancel'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
