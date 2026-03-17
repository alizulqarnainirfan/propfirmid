import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const firms = await prisma.propFirm.findMany({
      include: {
        reviews: {
          select: { rating: true }
        },
        challenges: {
          orderBy: {
            price: 'asc'
          }
        }
      },
      orderBy: { rating: 'desc' }
    })
    return NextResponse.json(firms)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch firms' }, { status: 500 })
  }
}
