// Simple auth helper (in production, use NextAuth.js or JWT)
export function setAuthCookie(userId: string, userName: string, userRole: string = 'user') {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userId', userId)
    localStorage.setItem('userName', userName)
    localStorage.setItem('userRole', userRole)
  }
}

export function getAuthUser() {
  if (typeof window !== 'undefined') {
    const userId = localStorage.getItem('userId')
    const userName = localStorage.getItem('userName')
    const userRole = localStorage.getItem('userRole') || 'user'
    
    if (userId && userName) {
      return { id: userId, name: userName, role: userRole }
    }
  }
  return null
}

export function clearAuth() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('userId')
    localStorage.removeItem('userName')
    localStorage.removeItem('userRole')
  }
}

export function isAuthenticated() {
  return getAuthUser() !== null
}

export function isAdmin() {
  const user = getAuthUser()
  return user?.role === 'admin'
}
