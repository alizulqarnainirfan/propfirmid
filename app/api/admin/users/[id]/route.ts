import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            posts: true,
            comments: true,
            reviews: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    const { name, email, role } = data

    // Check if user is trying to change admin role
    const existingUser = await prisma.user.findUnique({
      where: { id: params.id }
    })

    if (existingUser?.role === 'admin' && role !== 'admin') {
      return NextResponse.json({ error: 'Cannot remove admin role' }, { status: 403 })
    }

    const user = await prisma.user.update({
      where: { id: params.id },
      data: { name, email, role },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: params.id }
    })

    if (user?.role === 'admin') {
      return NextResponse.json({ error: 'Cannot delete admin user' }, { status: 403 })
    }

    await prisma.user.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}