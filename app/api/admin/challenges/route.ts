import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const challenges = await prisma.challenge.findMany({
      include: {
        firm: {
          select: {
            name: true,
            logo: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json(challenges)
  } catch (error) {
    console.error('Fetch challenges error:', error)
    return NextResponse.json({ error: 'Failed to fetch challenges' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log('Received challenge data:', data)

    // Use Prisma client directly with string fields
    const challenge = await prisma.challenge.create({
      data: {
        firmId: data.firmId || '',
        name: data.name || '',
        accountSize: data.accountSize || '',
        price: data.price || '0',
        discountedPrice: data.discountedPrice || data.price || '0',
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

    console.log('Created challenge:', challenge)
    return NextResponse.json(challenge)
  } catch (error) {
    console.error('Create challenge error:', error)
    return NextResponse.json({ 
      error: 'Failed to create challenge',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
