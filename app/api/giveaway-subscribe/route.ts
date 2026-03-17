import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existing = await prisma.giveawaySubscriber.findUnique({
      where: { email }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 400 }
      )
    }

    // Create new subscriber
    const subscriber = await prisma.giveawaySubscriber.create({
      data: { email }
    })

    return NextResponse.json({
      message: 'Successfully subscribed to giveaway!',
      subscriber
    })
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const subscribers = await prisma.giveawaySubscriber.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(subscribers)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 })
  }
}
