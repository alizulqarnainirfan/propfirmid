import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Check if admin user exists
    const admin = await prisma.user.findUnique({
      where: { email: 'admin@propfirm.com' }
    })

    if (!admin) {
      return NextResponse.json({ 
        error: 'Admin user not found',
        message: 'Please run: npx prisma db seed'
      }, { status: 404 })
    }

    // Check if role field exists and is set correctly
    if (!admin.role || admin.role !== 'admin') {
      // Update the admin user to have admin role
      const updated = await prisma.user.update({
        where: { email: 'admin@propfirm.com' },
        data: { role: 'admin' }
      })

      return NextResponse.json({
        message: 'Admin role was missing, now fixed!',
        user: {
          id: updated.id,
          email: updated.email,
          name: updated.name,
          role: updated.role
        }
      })
    }

    return NextResponse.json({
      message: 'Admin user is correctly configured',
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    })
  } catch (error: any) {
    console.error('Check setup error:', error)
    return NextResponse.json({ 
      error: 'Failed to check setup',
      details: error.message 
    }, { status: 500 })
  }
}
