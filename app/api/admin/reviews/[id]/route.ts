import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const review = await prisma.review.findUnique({
      where: { id: params.id },
      include: {
        author: {
          select: { name: true, email: true }
        },
        firm: {
          select: { name: true, logo: true }
        }
      }
    })

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 })
    }

    return NextResponse.json(review)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch review' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    const { action } = data

    if (action !== 'approve' && action !== 'reject') {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      )
    }

    const review = await prisma.review.update({
      where: { id: params.id },
      data: { status: action === 'approve' ? 'approved' : 'rejected' }
    })

    // If approved, update firm average rating
    if (action === 'approve') {
      const avgRating = await prisma.review.aggregate({
        where: { 
          firmId: review.firmId,
          status: 'approved'
        },
        _avg: { rating: true }
      })

      await prisma.propFirm.update({
        where: { id: review.firmId },
        data: { rating: avgRating._avg.rating || 0 }
      })
    }

    return NextResponse.json(review)
  } catch (error) {
    console.error('Update review error:', error)
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.review.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Review deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 })
  }
}