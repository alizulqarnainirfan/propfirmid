import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    console.log('Updating challenge with data:', data)

    const challenge = await prisma.challenge.update({
      where: { id: params.id },
      data: {
        name: data.name || '',
        accountSize: data.accountSize || '',
        price: data.price || '0',
        discountedPrice: data.discountedPrice || '0',
        phase1Target: data.phase1Target || null,
        phase2Target: data.phase2Target || null,
        maxDrawdown: data.maxDrawdown || '',
        dailyDrawdown: data.dailyDrawdown || null,
        minDays: data.minDays || null,
        maxDays: data.maxDays || null,
        profitSplit: data.profitSplit || '',
        refundable: data.refundable || false
      },
      include: {
        firm: {
          select: {
            name: true,
            logo: true
          }
        }
      }
    })

    return NextResponse.json(challenge)
  } catch (error) {
    console.error('Update challenge error:', error)
    return NextResponse.json({ 
      error: 'Failed to update challenge',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
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
