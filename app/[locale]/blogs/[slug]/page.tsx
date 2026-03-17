'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import SafeImage from '@/components/SafeImage'
import Link from 'next/link'
import { FaCalendar, FaUser, FaArrowLeft } from 'react-icons/fa'
import { Locale } from '@/i18n/translations'

interface Blog {
  id: string
  title: string
  content: string
  coverImage: string
  createdAt: string
  author: {
    name: string
  }
}

export default function BlogDetailPage({ params }: { params: { locale: Locale; slug: string } }) {
  const router = useRouter()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlog()
  }, [params.slug])

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blogs/${params.slug}`)
      if (!response.ok) {
        router.push(`/${params.locale}/blogs`)
        return
      }
      const data = await response.json()
      setBlog(data)
    } catch (error) {
      console.error('Failed to fetch blog:', error)
      router.push(`/${params.locale}/blogs`)
    } finally {
      setLoading(false)
    }
  }

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

  if (!blog) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href={`/${params.locale}/blogs`}
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8"
        >
          <FaArrowLeft />
          <span>{params.locale === 'id' ? 'Kembali ke Blog' : 'Back to Blogs'}</span>
        </Link>

        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          {blog.coverImage && (
            <div className="relative h-96">
              <SafeImage
                src={blog.coverImage}
                alt={blog.title}
                width={800}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              {blog.title}
            </h1>

            <div className="flex items-center gap-6 text-gray-600 mb-8 pb-8 border-b">
              <div className="flex items-center gap-2">
                <FaUser className="text-primary-600" />
                <span>{blog.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendar className="text-primary-600" />
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </article>
      </div>
    </div>
  )
}
