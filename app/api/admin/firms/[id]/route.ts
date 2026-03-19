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
    console.log('Received data:', data)

    const firm = await prisma.propFirm.update({
      where: { id: params.id },
      data: {
        name: data.name,
        logo: data.logo,
        type: data.type,
        rating: parseFloat(data.rating) || 0,
        trusted: parseInt(data.trusted) || 0,
        discount: data.discount || null,
        price: parseFloat(data.price) || 0,
        discounted: parseFloat(data.discounted) || 0,
        bonus: data.bonus || null,
        profitSplit: data.profitSplit || null,
        maxDrawdown: data.maxDrawdown || null,
        dailyDrawdown: data.dailyDrawdown || null,
        minTradingDays: data.minTradingDays ? parseInt(data.minTradingDays) : null,
        maxTradingDays: data.maxTradingDays ? parseInt(data.maxTradingDays) : null,
        payoutSpeed: data.payoutSpeed || null,
        platforms: data.platforms || null,
        instruments: data.instruments || null,
        leverage: data.leverage || null,
        refundable: Boolean(data.refundable),
        scalingPlan: Boolean(data.scalingPlan),
        newsTrading: Boolean(data.newsTrading),
        weekendHolding: Boolean(data.weekendHolding),
        eaAllowed: Boolean(data.eaAllowed),
        copyTrading: Boolean(data.copyTrading),
        minPayoutAmount: data.minPayoutAmount || null,
        payoutMethods: data.payoutMethods || null,
        trustScore: data.trustScore ? parseFloat(data.trustScore) : null,
        verificationStatus: data.verificationStatus || 'Verified',
        buyUrl: data.buyUrl || null
      }
    })

    return NextResponse.json(firm)
  } catch (error) {
    console.error('Error updating firm:', error)
    return NextResponse.json({ 
      error: 'Failed to update firm', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
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