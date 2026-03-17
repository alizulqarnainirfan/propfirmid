import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const firm = await prisma.propFirm.findUnique({
      where: { id: params.id },
      include: {
        challenges: true
      }
    })

    if (!firm) {
      return NextResponse.json({ error: 'Firm not found' }, { status: 404 })
    }

    return NextResponse.json(firm)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch firm' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()

    const firm = await prisma.propFirm.update({
      where: { id: params.id },
      data: {
        name: data.name,
        logo: data.logo,
        type: data.type,
        rating: parseFloat(data.rating),
        trusted: parseInt(data.trusted),
        discount: data.discount,
        price: parseFloat(data.price),
        discounted: parseFloat(data.discounted),
        bonus: data.bonus,
        profitSplit: data.profitSplit,
        maxDrawdown: data.maxDrawdown,
        dailyDrawdown: data.dailyDrawdown,
        minTradingDays: parseInt(data.minTradingDays),
        maxTradingDays: parseInt(data.maxTradingDays),
        payoutSpeed: data.payoutSpeed,
        platforms: data.platforms,
        instruments: data.instruments,
        leverage: data.leverage,
        refundable: data.refundable,
        scalingPlan: data.scalingPlan,
        newsTrading: data.newsTrading,
        weekendHolding: data.weekendHolding,
        eaAllowed: data.eaAllowed,
        copyTrading: data.copyTrading,
        minPayoutAmount: data.minPayoutAmount,
        payoutMethods: data.payoutMethods,
        trustScore: parseFloat(data.trustScore),
        verificationStatus: data.verificationStatus
      }
    })

    return NextResponse.json(firm)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update firm' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Delete associated challenges first
    await prisma.challenge.deleteMany({
      where: { firmId: params.id }
    })

    // Delete associated reviews
    await prisma.review.deleteMany({
      where: { firmId: params.id }
    })

    // Delete the firm
    await prisma.propFirm.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Firm deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete firm' }, { status: 500 })
  }
}