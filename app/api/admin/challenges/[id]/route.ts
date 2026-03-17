import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()

    const challenge = await prisma.challenge.update({
      where: { id: params.id },
      data: {
        name: data.name,
        accountSize: data.accountSize,
        price: parseFloat(data.price),
        discountedPrice: parseFloat(data.discountedPrice),
        phase1Target: data.phase1Target,
        phase2Target: data.phase2Target,
        maxDrawdown: data.maxDrawdown,
        dailyDrawdown: data.dailyDrawdown,
        minDays: parseInt(data.minDays),
        maxDays: parseInt(data.maxDays),
        profitSplit: data.profitSplit,
        refundable: data.refundable
      },
      include: {
        firm: {
          select: { name: true, logo: true }
        }
      }
    })

    return NextResponse.json(challenge)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update challenge' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.challenge.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Challenge deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete challenge' }, { status: 500 })
  }
}
