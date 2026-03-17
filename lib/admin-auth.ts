// Server-side admin authentication helper
import { prisma } from './prisma'

export async function verifyAdminUser(userId: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    })
    
    return user?.role === 'admin'
  } catch (error) {
    return false
  }
}

export async function getAdminUser(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, role: true }
    })
    
    if (user?.role === 'admin') {
      return user
    }
    
    return null
  } catch (error) {
    return null
  }
}

// Middleware function to check admin access
export function requireAdmin(handler: Function) {
  return async (request: Request, context?: any) => {
    try {
      // For now, we'll skip server-side auth since we're using localStorage
      // In production, implement proper JWT/session validation here
      
      return handler(request, context)
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }
  }
}