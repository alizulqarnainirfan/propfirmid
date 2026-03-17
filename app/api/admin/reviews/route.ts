import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        author: {
          select: { name: true, email: true }
        },
        firm: {
          select: { name: true, logo: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(reviews)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
  }
}

// Actions moved to /api/admin/reviews/[id]/route.ts for better REST structure
