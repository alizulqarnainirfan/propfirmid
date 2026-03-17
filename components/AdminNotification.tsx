'use client'
import { useEffect, useState } from 'react'
import { FaCheck, FaTimes, FaExclamationTriangle, FaInfo } from 'react-icons/fa'

export type NotificationType = 'success' | 'error' | 'warning' | 'info'

interface Notification {
  id: string
  type: NotificationType
  title: string
  message?: string
  duration?: number
}

interface AdminNotificationProps {
  notifications: Notification[]
  onRemove: (id: string) => void
}

export default function AdminNotification({ notifications, onRemove }: AdminNotificationProps) {
  useEffect(() => {
    notifications.forEach((notification) => {
      if (notification.duration !== 0) {
        const timer = setTimeout(() => {
          onRemove(notification.id)
        }, notification.duration || 5000)

        return () => clearTimeout(timer)
      }
    })
  }, [notifications, onRemove])

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return <FaCheck className="text-green-600" />
      case 'error':
        return <FaTimes className="text-red-600" />
      case 'warning':
        return <FaExclamationTriangle className="text-yellow-600" />
      case 'info':
        return <FaInfo className="text-blue-600" />
    }
  }

  const getStyles = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      case 'info':
        return 'bg-blue-50 border-blue-200'
    }
  }

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`max-w-sm w-full border rounded-lg shadow-lg p-4 ${getStyles(notification.type)}`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {getIcon(notification.type)}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-800">
                {notification.title}
              </p>
              {notification.message && (
                <p className="mt-1 text-sm text-gray-600">
                  {notification.message}
                </p>
              )}
            </div>
            <button
              onClick={() => onRemove(notification.id)}
              className="ml-4 text-gray-400 hover:text-gray-600"
            >
              <FaTimes className="text-sm" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

// Hook for managing notifications
export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    setNotifications(prev => [...prev, { ...notification, id }])
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const showSuccess = (title: string, message?: string) => {
    addNotification({ type: 'success', title, message })
  }

  const showError = (title: string, message?: string) => {
    addNotification({ type: 'error', title, message, duration: 0 })
  }

  const showWarning = (title: string, message?: string) => {
    addNotification({ type: 'warning', title, message })
  }

  const showInfo = (title: string, message?: string) => {
    addNotification({ type: 'info', title, message })
  }

  return {
    notifications,
    addNotification,
    removeNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo
  }
}