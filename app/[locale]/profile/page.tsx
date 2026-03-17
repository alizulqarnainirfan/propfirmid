'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaUser, FaEnvelope, FaCalendar, FaComment, FaStar, FaEdit, FaTrash } from 'react-icons/fa'
import { getAuthUser } from '@/lib/auth'
import { Locale } from '@/i18n/translations'

interface Post {
  id: string
  title: string
  content: string
  createdAt: string
  comments: any[]
}

interface Review {
  id: string
  rating: number
  content: string
  status: string
  firm: { name: string }
  createdAt: string
}

export default function ProfilePage({ params }: { params: { locale: Locale } }) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'posts' | 'reviews'>('posts')
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [saving, setSaving] = useState(false)
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [changingPassword, setChangingPassword] = useState(false)
  const authUser = getAuthUser()

  useEffect(() => {
    if (!authUser) {
      router.push(`/${params.locale}/login`)
      return
    }
    fetchUserData()
  }, [authUser, router, params.locale])

  const fetchUserData = async () => {
    if (!authUser) return

    try {
      // Fetch user's posts
      const postsRes = await fetch('/api/posts')
      const allPosts = await postsRes.json()
      const userPosts = allPosts.filter((p: any) => p.author.email === authUser.name || p.authorId === authUser.id)
      setPosts(userPosts)

      // Fetch user's reviews (including all statuses for own reviews)
      const reviewsRes = await fetch('/api/admin/reviews')
      const allReviews = await reviewsRes.json()
      const userReviews = allReviews.filter((r: any) => r.authorId === authUser.id)
      setReviews(userReviews)

      // Set user data
      setUser(authUser)
      setName(authUser.name)
      setEmail(authUser.name) // Using name as email for now
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    setSaving(true)
    // Simulate save (in production, call API to update user)
    setTimeout(() => {
      alert(params.locale === 'id' ? 'Profil berhasil diperbarui!' : 'Profile updated successfully!')
      setEditMode(false)
      setSaving(false)
    }, 1000)
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError('')
    setPasswordSuccess(false)

    // Validation
    if (passwordData.newPassword.length < 6) {
      setPasswordError(params.locale === 'id' ? 'Password baru minimal 6 karakter' : 'New password must be at least 6 characters')
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError(params.locale === 'id' ? 'Password baru tidak cocok' : 'New passwords do not match')
      return
    }

    setChangingPassword(true)

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: authUser?.id,
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setPasswordError(data.error || (params.locale === 'id' ? 'Gagal mengubah password' : 'Failed to change password'))
        return
      }

      setPasswordSuccess(true)
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setTimeout(() => {
        setShowPasswordChange(false)
        setPasswordSuccess(false)
      }, 3000)
    } catch (error) {
      setPasswordError(params.locale === 'id' ? 'Terjadi kesalahan' : 'An error occurred')
    } finally {
      setChangingPassword(false)
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (!confirm(params.locale === 'id' ? 'Hapus post ini?' : 'Delete this post?')) return

    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        setPosts(posts.filter(p => p.id !== postId))
        alert(params.locale === 'id' ? 'Post berhasil dihapus!' : 'Post deleted successfully!')
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      alert(params.locale === 'id' ? 'Gagal menghapus post' : 'Failed to delete post')
    }
  }

  const getTimeAgo = (date: string) => {
    const now = new Date()
    const postDate = new Date(date)
    const diffInDays = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return params.locale === 'id' ? 'Hari ini' : 'Today'
    if (diffInDays === 1) return params.locale === 'id' ? 'Kemarin' : 'Yesterday'
    if (diffInDays < 7) return `${diffInDays} ${params.locale === 'id' ? 'hari lalu' : 'days ago'}`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} ${params.locale === 'id' ? 'minggu lalu' : 'weeks ago'}`
    return `${Math.floor(diffInDays / 30)} ${params.locale === 'id' ? 'bulan lalu' : 'months ago'}`
  }

  if (loading) {
    return (
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">{params.locale === 'id' ? 'Memuat...' : 'Loading...'}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold mb-8">
          {params.locale === 'id' ? 'Profil Saya' : 'My Profile'}
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUser className="text-4xl text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
                <p className="text-gray-600 text-sm">{user.name}</p>
              </div>

              {editMode ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      {params.locale === 'id' ? 'Nama' : 'Name'}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-2 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-2 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                      disabled
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
                    >
                      {saving ? (params.locale === 'id' ? 'Menyimpan...' : 'Saving...') : (params.locale === 'id' ? 'Simpan' : 'Save')}
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
                    >
                      {params.locale === 'id' ? 'Batal' : 'Cancel'}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-600">
                      <FaEnvelope className="text-primary-600" />
                      <span className="text-sm">{user.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <FaCalendar className="text-primary-600" />
                      <span className="text-sm">
                        {params.locale === 'id' ? 'Bergabung' : 'Joined'} {new Date().toLocaleDateString(params.locale === 'id' ? 'id-ID' : 'en-US', { month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setEditMode(true)}
                    className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition flex items-center justify-center gap-2 mb-3"
                  >
                    <FaEdit /> {params.locale === 'id' ? 'Edit Profil' : 'Edit Profile'}
                  </button>

                  <button
                    onClick={() => setShowPasswordChange(!showPasswordChange)}
                    className="w-full border-2 border-primary-600 text-primary-600 py-2 rounded-lg hover:bg-primary-50 transition flex items-center justify-center gap-2"
                  >
                    🔒 {params.locale === 'id' ? 'Ubah Password' : 'Change Password'}
                  </button>

                  {/* Password Change Form */}
                  {showPasswordChange && (
                    <div className="mt-4 p-4 border-2 border-gray-200 rounded-lg bg-gray-50">
                      <h3 className="font-semibold mb-3 text-gray-800">
                        {params.locale === 'id' ? 'Ubah Password' : 'Change Password'}
                      </h3>
                      
                      {passwordSuccess && (
                        <div className="mb-3 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                          {params.locale === 'id' ? 'Password berhasil diubah!' : 'Password changed successfully!'}
                        </div>
                      )}

                      {passwordError && (
                        <div className="mb-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                          {passwordError}
                        </div>
                      )}

                      <form onSubmit={handleChangePassword} className="space-y-3">
                        <div>
                          <label className="block text-sm font-semibold mb-1 text-gray-700">
                            {params.locale === 'id' ? 'Password Saat Ini' : 'Current Password'}
                          </label>
                          <input
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                            className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-1 text-gray-700">
                            {params.locale === 'id' ? 'Password Baru' : 'New Password'}
                          </label>
                          <input
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                            className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                            required
                            minLength={6}
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            {params.locale === 'id' ? 'Minimal 6 karakter' : 'Minimum 6 characters'}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-1 text-gray-700">
                            {params.locale === 'id' ? 'Konfirmasi Password Baru' : 'Confirm New Password'}
                          </label>
                          <input
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                            className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                            required
                          />
                        </div>
                        <div className="flex gap-2 pt-2">
                          <button
                            type="submit"
                            disabled={changingPassword}
                            className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition disabled:opacity-50 text-sm"
                          >
                            {changingPassword 
                              ? (params.locale === 'id' ? 'Mengubah...' : 'Changing...') 
                              : (params.locale === 'id' ? 'Ubah Password' : 'Change Password')}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setShowPasswordChange(false)
                              setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
                              setPasswordError('')
                            }}
                            className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition text-sm"
                          >
                            {params.locale === 'id' ? 'Batal' : 'Cancel'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </>
              )}

              {/* Stats */}
              <div className="mt-6 pt-6 border-t grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary-600">{posts.length}</div>
                  <div className="text-sm text-gray-600">{params.locale === 'id' ? 'Post' : 'Posts'}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary-600">{reviews.length}</div>
                  <div className="text-sm text-gray-600">{params.locale === 'id' ? 'Review' : 'Reviews'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="md:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-lg mb-6">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('posts')}
                  className={`flex-1 py-4 px-6 font-semibold transition ${
                    activeTab === 'posts'
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <FaComment className="inline mr-2" />
                  {params.locale === 'id' ? 'Post Saya' : 'My Posts'} ({posts.length})
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`flex-1 py-4 px-6 font-semibold transition ${
                    activeTab === 'reviews'
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <FaStar className="inline mr-2" />
                  {params.locale === 'id' ? 'Review Saya' : 'My Reviews'} ({reviews.length})
                </button>
              </div>
            </div>

            {/* Posts Tab */}
            {activeTab === 'posts' && (
              <div className="space-y-4">
                {posts.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                    <FaComment className="text-6xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg mb-4">
                      {params.locale === 'id' ? 'Belum ada post' : 'No posts yet'}
                    </p>
                    <Link
                      href={`/${params.locale}/forum/new`}
                      className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
                    >
                      {params.locale === 'id' ? 'Buat Post Pertama' : 'Create First Post'}
                    </Link>
                  </div>
                ) : (
                  posts.map(post => (
                    <div key={post.id} className="bg-white rounded-xl shadow-lg p-6">
                      <div className="flex justify-between items-start mb-3">
                        <Link
                          href={`/${params.locale}/forum/${post.id}`}
                          className="flex-1"
                        >
                          <h3 className="text-xl font-semibold text-gray-800 hover:text-primary-600 transition mb-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 line-clamp-2 mb-3">{post.content}</p>
                        </Link>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="text-red-600 hover:text-red-700 p-2"
                          title={params.locale === 'id' ? 'Hapus' : 'Delete'}
                        >
                          <FaTrash />
                        </button>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <FaCalendar className="text-xs" />
                          {getTimeAgo(post.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaComment className="text-primary-600" />
                          {post.comments.length} {params.locale === 'id' ? 'Balasan' : 'Replies'}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                    <FaStar className="text-6xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg mb-4">
                      {params.locale === 'id' ? 'Belum ada review' : 'No reviews yet'}
                    </p>
                    <Link
                      href={`/${params.locale}/reviews`}
                      className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
                    >
                      {params.locale === 'id' ? 'Tulis Review Pertama' : 'Write First Review'}
                    </Link>
                  </div>
                ) : (
                  reviews.map(review => (
                    <div key={review.id} className="bg-white rounded-xl shadow-lg p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-800">
                              {review.firm.name}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              review.status === 'approved' 
                                ? 'bg-green-100 text-green-700'
                                : review.status === 'rejected'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {review.status === 'approved' 
                                ? (params.locale === 'id' ? 'Disetujui' : 'Approved')
                                : review.status === 'rejected'
                                ? (params.locale === 'id' ? 'Ditolak' : 'Rejected')
                                : (params.locale === 'id' ? 'Menunggu' : 'Pending')}
                            </span>
                          </div>
                          <div className="flex gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                          <p className="text-gray-600">{review.content}</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <FaCalendar className="inline mr-1 text-xs" />
                        {getTimeAgo(review.createdAt)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
