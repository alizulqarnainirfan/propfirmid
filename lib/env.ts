// Environment configuration for production
export const env = {
  DATABASE_URL: process.env.DATABASE_URL!,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  NODE_ENV: process.env.NODE_ENV || 'development',
  VERCEL_URL: process.env.VERCEL_URL,
}

// Validate required environment variables
export function validateEnv() {
  const required = ['DATABASE_URL']
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}

// Get the app URL for production or development
export function getAppUrl() {
  if (env.VERCEL_URL) {
    return `https://${env.VERCEL_URL}`
  }
  return env.NEXT_PUBLIC_APP_URL
}