import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Use raw SQL to fetch giveaways including customUrl field
    const giveaways = await prisma.$queryRaw`
      SELECT 
        g.id,
        g.title,
        g.description,
        g.prize,
        g."endDate",
        g."customUrl",
        g."createdAt"
      FROM "Giveaway" g
      ORDER BY g."createdAt" DESC
    `

    // Add status based on end date
    const giveawaysWithStatus = (giveaways as any[]).map(giveaway => ({
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
    const { title, description, prize, endDate, customUrl } = await request.json()

    // Generate a unique ID for the new giveaway
    const giveawayId = `giveaway_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Use raw SQL to insert the new giveaway including customUrl field
    await prisma.$executeRaw`
      INSERT INTO "Giveaway" (
        "id", "title", "description", "prize", "endDate", "customUrl", "createdAt"
      ) VALUES (
        ${giveawayId}, ${title}, ${description}, ${prize}, 
        ${new Date(endDate)}::timestamp, ${customUrl || null}, NOW()
      )
    `

    // Fetch the created giveaway
    const giveaway = await prisma.giveaway.findUnique({
      where: { id: giveawayId }
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
