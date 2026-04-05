import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    console.log('Fetching firms...')
    
    // Use Prisma client directly instead of raw SQL
    const firms = await prisma.propFirm.findMany({
      include: {
        challenges: {
          orderBy: { createdAt: 'desc' }
        },
        reviews: {
          select: { rating: true }
        }
      },
      orderBy: { rating: 'desc' }
    })

    console.log('Fetched firms:', firms.length)
    return NextResponse.json(firms)
  } catch (error) {
    console.error('Failed to fetch firms:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch firms',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
