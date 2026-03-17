'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import SafeImage from '@/components/SafeImage'
import { FaCalendar, FaUser, FaArrowRight } from 'react-icons/fa'
import { Locale } from '@/i18n/translations'

interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  coverImage: string
  createdAt: string
  author: {
    name: string
  }
}

export default function BlogsPage({ params }: { params: { locale: Locale } }) {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs')
      const data = await response.json()
      setBlogs(data)
    } catch (error) {
      console.error('Failed to fetch blogs:', error)
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {params.locale === 'id' ? 'Blog & Artikel' : 'Blog & Articles'}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {params.locale === 'id' 
              ? 'Baca artikel terbaru tentang prop trading, tips, dan strategi trading'
              : 'Read the latest articles about prop trading, tips, and trading strategies'}
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {params.locale === 'id' ? 'Belum ada artikel' : 'No articles yet'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/${params.locale}/blogs/${blog.slug}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group"
              >
                {blog.coverImage && (
                  <div className="relative h-48 overflow-hidden">
                    <SafeImage
                      src={blog.coverImage}
                      alt={blog.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary-600 transition">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <FaUser className="text-primary-600" />
                      <span>{blog.author.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendar className="text-primary-600" />
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-primary-600 font-semibold group-hover:gap-3 transition-all">
                    <span>{params.locale === 'id' ? 'Baca Selengkapnya' : 'Read More'}</span>
                    <FaArrowRight />
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
