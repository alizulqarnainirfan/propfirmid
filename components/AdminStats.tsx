'use client'
import { useEffect, useState } from 'react'
import { FaBlog, FaBuilding, FaUsers, FaGift, FaStar, FaEye } from 'react-icons/fa'

interface StatsData {
  blogs: number
  firms: number
  users: number
  giveaways: number
  reviews: number
  pendingReviews: number
}

export default function AdminStats() {
  const [stats, setStats] = useState<StatsData>({
    blogs: 0,
    firms: 0,
    users: 0,
    giveaways: 0,
    reviews: 0,
    pendingReviews: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [blogsRes, firmsRes, usersRes, giveawaysRes, reviewsRes] = await Promise.all([
        fetch('/api/admin/blogs'),
        fetch('/api/firms'),
        fetch('/api/admin/users'),
        fetch('/api/admin/giveaways'),
        fetch('/api/admin/reviews')
      ])

      const [blogs, firms, users, giveaways, reviews] = await Promise.all([
        blogsRes.json(),
        firmsRes.json(),
        usersRes.json(),
        giveawaysRes.json(),
        reviewsRes.json()
      ])

      setStats({
        blogs: blogs.length || 0,
        firms: firms.length || 0,
        users: users.length || 0,
        giveaways: giveaways.length || 0,
        reviews: reviews.length || 0,
        pendingReviews: reviews.filter((r: any) => r.status === 'pending').length || 0
      })
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      name: 'Total Blogs',
      value: stats.blogs,
      icon: FaBlog,
      color: 'blue',
      change: '+12%'
    },
    {
      name: 'Total Firms',
      value: stats.firms,
      icon: FaBuilding,
      color: 'green',
      change: '+5%'
    },
    {
      name: 'Total Users',
      value: stats.users,
      icon: FaUsers,
      color: 'purple',
      change: '+18%'
    },
    {
      name: 'Active Giveaways',
      value: stats.giveaways,
      icon: FaGift,
      color: 'yellow',
      change: '+2%'
    },
    {
      name: 'Total Reviews',
      value: stats.reviews,
      icon: FaStar,
      color: 'orange',
      change: '+25%'
    },
    {
      name: 'Pending Reviews',
      value: stats.pendingReviews,
      icon: FaEye,
      color: 'red',
      change: stats.pendingReviews > 0 ? 'Needs attention' : 'All clear'
    }
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statCards.map((stat) => (
        <div key={stat.name} className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">{stat.name}</p>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              <p className={`text-sm mt-1 ${
                stat.color === 'red' && stat.value > 0 
                  ? 'text-red-600' 
                  : 'text-green-600'
              }`}>
                {stat.change}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              stat.color === 'blue' ? 'bg-blue-100' :
              stat.color === 'green' ? 'bg-green-100' :
              stat.color === 'purple' ? 'bg-purple-100' :
              stat.color === 'yellow' ? 'bg-yellow-100' :
              stat.color === 'orange' ? 'bg-orange-100' :
              'bg-red-100'
            }`}>
              <stat.icon className={`text-xl ${
                stat.color === 'blue' ? 'text-blue-600' :
                stat.color === 'green' ? 'text-green-600' :
                stat.color === 'purple' ? 'text-purple-600' :
                stat.color === 'yellow' ? 'text-yellow-600' :
                stat.color === 'orange' ? 'text-orange-600' :
                'text-red-600'
              }`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}