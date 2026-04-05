'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAuthUser } from '@/lib/auth'
import { ADMIN_CONFIG } from '@/lib/admin-config'
import { FaPlus, FaTrash, FaGift } from 'react-icons/fa'
import { Locale } from '@/i18n/translations'

export default function AdminGiveawaysPage({ params }: { params: { locale: Locale } }) {
  const router = useRouter()
  const [giveaways, setGiveaways] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null)
  const [flyerDataUrl, setFlyerDataUrl] = useState<string>('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    prize: '',
    endDate: '',
    customUrl: ''
  })

  useEffect(() => {
    const authUser = getAuthUser()
    if (!authUser || authUser.role !== 'admin') {
      window.location.href = `/${params.locale}/login`
      return
    }
    fetchGiveaways()
  }, [])

  const fetchGiveaways = async () => {
    try {
      const response = await fetch('/api/admin/giveaways')
      const data = await response.json()
      setGiveaways(data)
    } catch (error) {
      console.error('Failed to fetch giveaways:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const flyerHtml = flyerDataUrl
        ? `<div class="mb-4"><img src="${flyerDataUrl}" alt="Giveaway flyer" style="width:100%;height:auto;border-radius:12px;" /></div>`
        : ''

      const requestData = {
        ...formData,
        // Save as HTML so we can support rich formatting + flyer image.
        description: `${flyerHtml}${formData.description || ''}`
      }

      console.log('Submitting giveaway data:', requestData)

      const response = await fetch('/api/admin/giveaways', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      })

      if (response.ok) {
        const newGiveaway = await response.json()
        console.log('Created giveaway:', newGiveaway)
        setGiveaways([newGiveaway, ...giveaways])
        setFormData({ title: '', description: '', prize: '', endDate: '', customUrl: '' })
        setFlyerDataUrl('')
        setShowForm(false)
        alert('Giveaway created successfully!')
      } else {
        const errorData = await response.json()
        console.error('Failed to create giveaway:', errorData)
        alert(`Failed to create giveaway: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Failed to create giveaway:', error)
      alert('Failed to create giveaway. Please check the console for details.')
    }
  }

  const stripHtml = (html: string) => {
    if (!html) return ''
    return html
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  }

  const getFullDescriptionHtml = () => {
    if (!flyerDataUrl) return formData.description
    return `<div class="mb-4"><img src="${flyerDataUrl}" alt="Giveaway flyer" style="width:100%;height:auto;border-radius:12px;" /></div>${formData.description || ''}`
  }

  const applyWrapAtCursor = (wrapStart: string, wrapEnd: string, placeholder: string) => {
    const textarea = descriptionRef.current
    if (!textarea) return

    const value = formData.description || ''
    const start = textarea.selectionStart ?? value.length
    const end = textarea.selectionEnd ?? start
    const selected = value.slice(start, end)

    const hasSelection = start !== end
    const before = value.slice(0, start)
    const after = value.slice(end)

    const inner = hasSelection ? selected : placeholder
    const replacement = `${wrapStart}${inner}${wrapEnd}`
    const nextValue = `${before}${replacement}${after}`

    setFormData({ ...formData, description: nextValue })

    setTimeout(() => {
      textarea.focus()
      const cursor = before.length + wrapStart.length + inner.length
      textarea.setSelectionRange(cursor, cursor)
    }, 0)
  }

  const insertHtmlAtCursor = (html: string) => {
    const textarea = descriptionRef.current
    if (!textarea) return

    const value = formData.description || ''
    const start = textarea.selectionStart ?? value.length
    const end = textarea.selectionEnd ?? start

    const before = value.slice(0, start)
    const after = value.slice(end)
    const nextValue = `${before}${html}${after}`

    setFormData({ ...formData, description: nextValue })

    setTimeout(() => {
      textarea.focus()
      const cursor = before.length + html.length
      textarea.setSelectionRange(cursor, cursor)
    }, 0)
  }

  const handleBold = () => applyWrapAtCursor('<strong>', '</strong>', 'Bold text')
  const handleHeading = () => applyWrapAtCursor('<h2>', '</h2>', 'Heading')
  const handleBullets = () => {
    const textarea = descriptionRef.current
    if (!textarea) return

    const value = formData.description || ''
    const start = textarea.selectionStart ?? value.length
    const end = textarea.selectionEnd ?? start
    const selected = value.slice(start, end)

    const hasSelection = start !== end
    const items = hasSelection
      ? selected
          .split('\n')
          .map(s => s.trim())
          .filter(Boolean)
          .map(s => `<li>${s}</li>`)
          .join('')
      : `<li>Item 1</li><li>Item 2</li>`

    insertHtmlAtCursor(`<ul>${items}</ul>`)
  }

  const handleFlyerUpload = (file: File | null) => {
    if (!file) {
      setFlyerDataUrl('')
      return
    }

    if (file.size > ADMIN_CONFIG.MAX_IMAGE_SIZE) {
      alert(`File too large. Max ${Math.round(ADMIN_CONFIG.MAX_IMAGE_SIZE / 1024 / 1024)}MB.`)
      return
    }

    if (!ADMIN_CONFIG.ALLOWED_IMAGE_TYPES.includes(file.type)) {
      alert('Invalid file type. Allowed: JPG/PNG/WebP.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setFlyerDataUrl(String(reader.result || ''))
    }
    reader.onerror = () => {
      alert('Failed to read file')
    }
    reader.readAsDataURL(file)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this giveaway?')) return

    try {
      const response = await fetch(`/api/admin/giveaways/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setGiveaways(giveaways.filter(g => g.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete giveaway:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            {params.locale === 'id' ? 'Kelola Giveaways' : 'Manage Giveaways'}
          </h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition flex items-center gap-2"
          >
            <FaPlus />
            {params.locale === 'id' ? 'Tambah Giveaway' : 'Add Giveaway'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-8 space-y-4">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Description (HTML)</label>

              <div className="flex flex-wrap gap-2 mb-2">
                <button
                  type="button"
                  onClick={handleBold}
                  className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold transition"
                >
                  Bold
                </button>
                <button
                  type="button"
                  onClick={handleHeading}
                  className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold transition"
                >
                  Heading
                </button>
                <button
                  type="button"
                  onClick={handleBullets}
                  className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold transition"
                >
                  Bullet List
                </button>
              </div>

              <textarea
                ref={descriptionRef}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600 font-mono text-sm"
                rows={6}
                required
              />

              <div className="mt-3">
                <div className="text-sm font-semibold text-gray-700 mb-2">Preview</div>
                <div
                  className="prose prose-sm max-w-none border border-gray-100 rounded-lg p-4 bg-gray-50"
                  dangerouslySetInnerHTML={{ __html: getFullDescriptionHtml() || '' }}
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Flyer (optional)</label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => handleFlyerUpload(e.target.files?.[0] || null)}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3"
              />
              {flyerDataUrl && (
                <div className="mt-3">
                  <img
                    src={flyerDataUrl}
                    alt="Flyer preview"
                    className="w-full h-auto rounded-lg border border-gray-200"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Prize</label>
              <input
                type="text"
                value={formData.prize}
                onChange={(e) => setFormData({ ...formData, prize: e.target.value })}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Custom Join URL (optional)
              </label>
              <input
                type="url"
                value={formData.customUrl}
                onChange={(e) => setFormData({ ...formData, customUrl: e.target.value })}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                placeholder="https://example.com/giveaway-entry"
              />
              <p className="text-sm text-gray-600 mt-1">
                If provided, users will be redirected to this URL when they click "Join Giveaway". 
                Leave empty to use the default email subscription.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
              >
                Create Giveaway
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {giveaways.map((giveaway) => (
            <div key={giveaway.id} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <FaGift className="text-yellow-600 text-xl" />
                </div>
                <button
                  onClick={() => handleDelete(giveaway.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                >
                  <FaTrash />
                </button>
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">{giveaway.title}</h3>
              <p className="text-gray-600 text-sm mb-3">
                {stripHtml(giveaway.description).slice(0, 160)}
                {stripHtml(giveaway.description).length > 160 ? '...' : ''}
              </p>
              <div className="border-t pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Prize:</span>
                  <span className="font-semibold text-primary-600">{giveaway.prize}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ends:</span>
                  <span className="font-semibold text-gray-800">
                    {new Date(giveaway.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
