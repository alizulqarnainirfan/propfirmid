'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaComment, FaUser, FaClock, FaPlus } from 'react-icons/fa'
import { getAuthUser } from '@/lib/auth'
import { Locale } from '@/i18n/translations'

interface Post {
  id: string
  title: string
  content: string
  author: { name: string }
  createdAt: string
  comments: any[]
}

export default function ForumPage({ params }: { params: { locale: Locale } }) {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const categories = ['Semua', 'Review', 'Tips & Trik', 'Diskusi', 'Strategi', 'Tanya Jawab']
  const user = getAuthUser()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts')
      const data = await res.json()
      setPosts(data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePost = () => {
    if (!user) {
      alert(params.locale === 'id' ? 'Silakan login terlebih dahulu' : 'Please login first')
      router.push(`/${params.locale}/login`)
      return
    }
    router.push(`/${params.locale}/forum/new`)
  }

  const getTimeAgo = (date: string) => {
    const now = new Date()
    const postDate = new Date(date)
    const diffInHours = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return params.locale === 'id' ? 'Baru saja' : 'Just now'
    if (diffInHours < 24) return `${diffInHours} ${params.locale === 'id' ? 'jam lalu' : 'hours ago'}`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} ${params.locale === 'id' ? 'hari lalu' : 'days ago'}`
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

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              {params.locale === 'id' ? 'Forum Diskusi' : 'Discussion Forum'}
            </h1>
            <p className="text-gray-600">
              {params.locale === 'id' 
                ? 'Berbagi pengalaman dan strategi dengan komunitas trader' 
                : 'Share experiences and strategies with the trader community'}
            </p>
          </div>
          <button 
            onClick={handleCreatePost}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition flex items-center gap-2"
          >
            <FaPlus /> {params.locale === 'id' ? 'Buat Diskusi' : 'Create Discussion'}
          </button>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedCategory === cat
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts List */}
        {posts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-gray-500 text-lg">
              {params.locale === 'id' ? 'Belum ada diskusi. Jadilah yang pertama!' : 'No discussions yet. Be the first!'}
            </p>
            <button 
              onClick={handleCreatePost}
              className="mt-4 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
            >
              {params.locale === 'id' ? 'Buat Diskusi Pertama' : 'Create First Discussion'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map(post => (
              <Link 
                key={post.id}
                href={`/${params.locale}/forum/${post.id}`}
                className="block bg-white rounded-xl shadow-lg hover:shadow-xl transition p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaUser className="text-primary-600" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 hover:text-primary-600 transition mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">{post.content}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <FaUser className="text-xs" /> {post.author.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="text-xs" /> {getTimeAgo(post.createdAt)}
                      </span>
                      <span className="flex items-center gap-2">
                        <FaComment className="text-primary-600" />
                        {post.comments.length} {params.locale === 'id' ? 'Balasan' : 'Replies'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
