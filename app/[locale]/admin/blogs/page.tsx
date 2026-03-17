'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getAuthUser } from '@/lib/auth'
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa'
import { Locale } from '@/i18n/translations'

interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  published: boolean
  createdAt: string
  author: {
    name: string
  }
}

export default function AdminBlogsPage({ params }: { params: { locale: Locale } }) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const authUser = getAuthUser()
    if (!authUser || authUser.role !== 'admin') {
      window.location.href = `/${params.locale}/login`
      return
    }
    setUser(authUser)
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/admin/blogs')
      const data = await response.json()
      setBlogs(data)
    } catch (error) {
      console.error('Failed to fetch blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return

    try {
      const response = await fetch(`/api/admin/blogs/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setBlogs(blogs.filter(blog => blog.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete blog:', error)
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {params.locale === 'id' ? 'Kelola Blog' : 'Manage Blogs'}
            </h1>
            <p className="text-gray-600">
              {params.locale === 'id' ? 'Buat dan kelola artikel blog' : 'Create and manage blog articles'}
            </p>
          </div>
          <Link
            href={`/${params.locale}/admin/blogs/new`}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition flex items-center gap-2"
          >
            <FaPlus />
            {params.locale === 'id' ? 'Buat Blog Baru' : 'Create New Blog'}
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Author</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-800">{blog.title}</div>
                      <div className="text-sm text-gray-500">{blog.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{blog.author.name}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        blog.published 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/${params.locale}/blogs/${blog.slug}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                          title="View"
                        >
                          <FaEye />
                        </Link>
                        <Link
                          href={`/${params.locale}/admin/blogs/${blog.id}/edit`}
                          className="p-2 text-green-600 hover:bg-green-50 rounded transition"
                          title="Edit"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
