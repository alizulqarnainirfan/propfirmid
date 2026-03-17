import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const giveaways = await prisma.giveaway.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(giveaways)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch giveaways' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { title, description, prize, endDate } = data

    const giveaway = await prisma.giveaway.create({
      data: {
        title,
        description,
        prize,
        endDate: new Date(endDate)
      }
    })

    return NextResponse.json(giveaway)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create giveaway' }, { status: 500 })
  }
}

// DELETE moved to /api/admin/giveaways/[id]/route.ts for better REST structure
