import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const giveaway = await prisma.giveaway.findUnique({
      where: { id: params.id }
    })

    if (!giveaway) {
      return NextResponse.json({ error: 'Giveaway not found' }, { status: 404 })
    }

    return NextResponse.json(giveaway)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch giveaway' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    const { title, description, prize, endDate } = data

    const giveaway = await prisma.giveaway.update({
      where: { id: params.id },
      data: {
        title,
        description,
        prize,
        endDate: new Date(endDate)
      }
    })

    return NextResponse.json(giveaway)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update giveaway' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.giveaway.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Giveaway deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete giveaway' }, { status: 500 })
  }
}