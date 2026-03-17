import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const firmId = searchParams.get('firmId')
  const status = searchParams.get('status') || 'approved'

  try {
    const where: any = { status }
    if (firmId) {
      where.firmId = firmId
    }
    
    const reviews = await prisma.review.findMany({
      where,
      include: {
        author: {
          select: { name: true }
        },
        firm: {
          select: { name: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(reviews)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { rating, content, proofImage, firmId, authorId } = body

    if (!proofImage) {
      return NextResponse.json(
        { error: 'Proof image is required' },
        { status: 400 }
      )
    }

    const review = await prisma.review.create({
      data: { 
        rating, 
        content, 
        proofImage,
        firmId, 
        authorId,
        status: 'pending'
      }
    })

    return NextResponse.json(review, { status: 201 })
  } catch (error) {
    console.error('Create review error:', error)
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 })
  }
}
