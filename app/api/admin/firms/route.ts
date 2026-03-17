import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const firm = await prisma.propFirm.create({
      data: {
        name: data.name,
        logo: data.logo,
        type: data.type,
        rating: parseFloat(data.rating) || 0,
        trusted: parseInt(data.trusted) || 0,
        discount: data.discount,
        price: parseFloat(data.price),
        discounted: parseFloat(data.discounted),
        bonus: data.bonus,
        profitSplit: data.profitSplit,
        maxDrawdown: data.maxDrawdown,
        dailyDrawdown: data.dailyDrawdown,
        minTradingDays: parseInt(data.minTradingDays) || 0,
        maxTradingDays: parseInt(data.maxTradingDays) || 0,
        payoutSpeed: data.payoutSpeed,
        platforms: data.platforms,
        instruments: data.instruments,
        leverage: data.leverage,
        refundable: data.refundable || false,
        scalingPlan: data.scalingPlan || false,
        newsTrading: data.newsTrading || true,
        weekendHolding: data.weekendHolding || true,
        eaAllowed: data.eaAllowed || true,
        copyTrading: data.copyTrading || false,
        minPayoutAmount: data.minPayoutAmount,
        payoutMethods: data.payoutMethods,
        trustScore: parseFloat(data.trustScore) || 0,
        verificationStatus: data.verificationStatus
      }
    })

    // Create challenges if provided
    if (data.challenges && Array.isArray(data.challenges) && data.challenges.length > 0) {
      for (const challenge of data.challenges) {
        await prisma.challenge.create({
          data: {
            firmId: firm.id,
            name: challenge.name || '',
            accountSize: challenge.accountSize,
            price: parseFloat(challenge.price),
            discountedPrice: parseFloat(challenge.discountedPrice) || parseFloat(challenge.price),
            phase1Target: challenge.phase1Target || null,
            phase2Target: challenge.phase2Target || null,
            maxDrawdown: challenge.maxDrawdown || '',
            dailyDrawdown: challenge.dailyDrawdown || null,
            minDays: parseInt(challenge.minDays) || 0,
            maxDays: parseInt(challenge.maxDays) || 0,
            profitSplit: challenge.profitSplit || '',
            refundable: challenge.refundable || false
          }
        })
      }
    }

    return NextResponse.json(firm)
  } catch (error) {
    console.error('Create firm error:', error)
    return NextResponse.json({ error: 'Failed to create firm' }, { status: 500 })
  }
}

// DELETE moved to /api/admin/firms/[id]/route.ts for better REST structure
