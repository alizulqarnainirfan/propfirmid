import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { firmId: string } }
) {
  try {
    // Use Prisma client directly
    const firm = await prisma.propFirm.findUnique({
      where: { id: params.firmId },
      include: {
        reviews: {
          include: {
            author: {
              select: { name: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        challenges: {
          orderBy: { price: 'asc' }
        }
      }
    })
    
    if (!firm) {
      return NextResponse.json({ error: 'Firm not found' }, { status: 404 })
    }

    return NextResponse.json(firm)
  } catch (error) {
    console.error('Error fetching firm:', error)
    return NextResponse.json({ error: 'Failed to fetch firm' }, { status: 500 })
  }
}