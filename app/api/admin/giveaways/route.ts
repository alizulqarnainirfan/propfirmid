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
    console.log('Received giveaway data:', data)
    
    const { title, description, prize, endDate, customUrl } = data

    if (!title || !description || !prize || !endDate) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, prize, endDate' },
        { status: 400 }
      )
    }

    // Use Prisma client directly
    const giveaway = await prisma.giveaway.create({
      data: {
        title,
        description,
        prize,
        endDate: new Date(endDate),
        customUrl: customUrl || null
      }
    })

    console.log('Created giveaway:', giveaway)
    return NextResponse.json(giveaway)
  } catch (error) {
    console.error('Error creating giveaway:', error)
    return NextResponse.json({ 
      error: 'Failed to create giveaway',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// DELETE moved to /api/admin/giveaways/[id]/route.ts for better REST structure
