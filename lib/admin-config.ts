// Admin configuration and constants
export const ADMIN_CONFIG = {
  // Pagination
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,

  // File upload limits
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],

  // Validation limits
  MAX_TITLE_LENGTH: 200,
  MAX_CONTENT_LENGTH: 50000,
  MAX_EXCERPT_LENGTH: 500,
  MIN_PASSWORD_LENGTH: 8,

  // Default values
  DEFAULT_FIRM_RATING: 4.0,
  DEFAULT_CHALLENGE_PROFIT_SPLIT: '80%',
  DEFAULT_CHALLENGE_MAX_DRAWDOWN: '10%',
  DEFAULT_CHALLENGE_DAILY_DRAWDOWN: '5%',

  // Status options
  REVIEW_STATUSES: ['pending', 'approved', 'rejected'] as const,
  USER_ROLES: ['user', 'admin'] as const,
  FIRM_TYPES: [
    'Forex Prop Firm',
    'Instant Prop Firm', 
    'Broker Prop Firm',
    'Crypto Prop Firm'
  ] as const,
  VERIFICATION_STATUSES: ['Verified', 'Pending', 'Unverified'] as const,

  // API endpoints
  API_ENDPOINTS: {
    blogs: '/api/admin/blogs',
    firms: '/api/admin/firms',
    challenges: '/api/admin/challenges',
    reviews: '/api/admin/reviews',
    users: '/api/admin/users',
    giveaways: '/api/admin/giveaways',
    subscribers: '/api/giveaway-subscribe',
    siteSettings: '/api/admin/site-settings'
  }
}

export type ReviewStatus = typeof ADMIN_CONFIG.REVIEW_STATUSES[number]
export type UserRole = typeof ADMIN_CONFIG.USER_ROLES[number]
export type FirmType = typeof ADMIN_CONFIG.FIRM_TYPES[number]
export type VerificationStatus = typeof ADMIN_CONFIG.VERIFICATION_STATUSES[number]

// Helper functions
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date))
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'approved':
    case 'verified':
    case 'active':
      return 'green'
    case 'pending':
      return 'yellow'
    case 'rejected':
    case 'unverified':
    case 'inactive':
      return 'red'
    default:
      return 'gray'
  }
}