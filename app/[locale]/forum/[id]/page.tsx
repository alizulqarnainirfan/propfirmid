'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaUser, FaClock, FaReply } from 'react-icons/fa'
import { getAuthUser } from '@/lib/auth'
import { Locale } from '@/i18n/translations'

interface Comment {
  id: string
  content: string
  author: { id: string; name: string }
  createdAt: string
  replies: Comment[]
}

interface Post {
  id: string
  title: string
  content: string
  author: { id: string; name: string; email: string }
  createdAt: string
  comments: Comment[]
}

export default function ForumDetailPage({ params }: { params: { locale: Locale; id: string } }) {
  const router = useRouter()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [commentContent, setCommentContent] = useState('')
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const user = getAuthUser()

  useEffect(() => {
    fetchPost()
  }, [params.id])

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/posts/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        setPost(data)
      }
    } catch (error) {
      console.error('Error fetching post:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      alert(params.locale === 'id' ? 'Silakan login terlebih dahulu' : 'Please login first')
      router.push(`/${params.locale}/login`)
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: commentContent,
          postId: params.id,
          authorId: user.id,
          parentId: replyTo
        })
      })

      if (res.ok) {
        setCommentContent('')
        setReplyTo(null)
        fetchPost() // Refresh post with new comment
      }
    } catch (error) {
      console.error('Error submitting comment:', error)
    } finally {
      setSubmitting(false)
    }
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

  const renderComment = (comment: Comment, depth: number = 0) => (
    <div key={comment.id} className={`${depth > 0 ? 'ml-8 mt-4 border-l-2 border-primary-200 pl-4' : 'mb-4'}`}>
      <div className="bg-white rounded-lg p-4 shadow">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
            <FaUser className="text-primary-600" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-semibold">{comment.author.name}</span>
                <span className="text-sm text-gray-500 ml-2">{getTimeAgo(comment.createdAt)}</span>
              </div>
            </div>
            <p className="text-gray-700 mb-2">{comment.content}</p>
            <button 
              onClick={() => setReplyTo(comment.id)}
              className="text-primary-600 text-sm flex items-center gap-1 hover:text-primary-700"
            >
              <FaReply /> {params.locale === 'id' ? 'Balas' : 'Reply'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Render replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2">
          {comment.replies.map(reply => renderComment(reply, depth + 1))}
        </div>
      )}
      
      {/* Reply form */}
      {replyTo === comment.id && (
        <div className="mt-4 ml-8">
          <form onSubmit={handleSubmitComment} className="bg-gray-50 rounded-lg p-4">
            <textarea 
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 h-24 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
              placeholder={params.locale === 'id' ? 'Tulis balasan...' : 'Write a reply...'}
              required
            />
            <div className="flex gap-2 mt-2">
              <button 
                type="submit"
                disabled={submitting}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition text-sm disabled:opacity-50"
              >
                {submitting ? (params.locale === 'id' ? 'Mengirim...' : 'Sending...') : (params.locale === 'id' ? 'Kirim' : 'Send')}
              </button>
              <button 
                type="button"
                onClick={() => {
                  setReplyTo(null)
                  setCommentContent('')
                }}
                className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition text-sm"
              >
                {params.locale === 'id' ? 'Batal' : 'Cancel'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )

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

  if (!post) {
    return (
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">
            {params.locale === 'id' ? 'Diskusi tidak ditemukan' : 'Discussion not found'}
          </h1>
          <button 
            onClick={() => router.push(`/${params.locale}/forum`)}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
          >
            {params.locale === 'id' ? 'Kembali ke Forum' : 'Back to Forum'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Post */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <FaUser />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock />
              <span>{getTimeAgo(post.createdAt)}</span>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{post.content}</p>
        </div>

        {/* Comments Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">
            {params.locale === 'id' ? 'Balasan' : 'Replies'} ({post.comments.length})
          </h2>
          
          {post.comments.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <p className="text-gray-500">
                {params.locale === 'id' ? 'Belum ada balasan. Jadilah yang pertama!' : 'No replies yet. Be the first!'}
              </p>
            </div>
          ) : (
            post.comments.map(comment => renderComment(comment))
          )}
        </div>

        {/* Main Comment Form */}
        {!replyTo && (
          <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
            <h3 className="text-xl font-semibold mb-4">
              {params.locale === 'id' ? 'Tulis Balasan' : 'Write a Reply'}
            </h3>
            <form onSubmit={handleSubmitComment}>
              <textarea 
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 h-32 mb-4 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                placeholder={params.locale === 'id' ? 'Tulis balasan Anda...' : 'Write your reply...'}
                required
              />
              <button 
                type="submit"
                disabled={submitting}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
              >
                {submitting 
                  ? (params.locale === 'id' ? 'Mengirim...' : 'Sending...') 
                  : (params.locale === 'id' ? 'Kirim Balasan' : 'Send Reply')}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
