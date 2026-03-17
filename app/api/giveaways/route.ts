import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const giveaways = await prisma.giveaway.findMany({
      orderBy: { createdAt: 'desc' }
    })

    // Add status based on end date
    const giveawaysWithStatus = giveaways.map(giveaway => ({
      ...giveaway,
      status: new Date(giveaway.endDate) > new Date() ? 'active' : 'ended'
    }))

    return NextResponse.json(giveawaysWithStatus)
  } catch (error) {
    console.error('Error fetching giveaways:', error)
    return NextResponse.json(
      { error: 'Failed to fetch giveaways' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { title, description, prize, endDate } = await request.json()

    const giveaway = await prisma.giveaway.create({
      data: {
        title,
        description,
        prize,
        endDate: new Date(endDate)
      }
    })

    return NextResponse.json(giveaway, { status: 201 })
  } catch (error) {
    console.error('Error creating giveaway:', error)
    return NextResponse.json(
      { error: 'Failed to create giveaway' },
      { status: 500 }
    )
  }
}
