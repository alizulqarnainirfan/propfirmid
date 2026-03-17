import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const challenges = await prisma.challenge.findMany({
      include: {
        firm: {
          select: { name: true, logo: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(challenges)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch challenges' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const challenge = await prisma.challenge.create({
      data: {
        firmId: data.firmId,
        name: data.name,
        accountSize: data.accountSize,
        price: parseFloat(data.price),
        discountedPrice: parseFloat(data.discountedPrice),
        phase1Target: data.phase1Target,
        phase2Target: data.phase2Target,
        maxDrawdown: data.maxDrawdown,
        dailyDrawdown: data.dailyDrawdown,
        minDays: parseInt(data.minDays) || 0,
        maxDays: parseInt(data.maxDays) || 0,
        profitSplit: data.profitSplit,
        refundable: data.refundable || false
      }
    })

    return NextResponse.json(challenge)
  } catch (error) {
    console.error('Create challenge error:', error)
    return NextResponse.json({ error: 'Failed to create challenge' }, { status: 500 })
  }
}
