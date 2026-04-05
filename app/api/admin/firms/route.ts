import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Use Prisma client directly with proper type conversion
    const firm = await prisma.propFirm.create({
      data: {
        name: data.name || '',
        logo: data.logo || '',
        type: data.type || 'Forex Prop Firm',
        rating: parseFloat(data.rating) || 0,
        trusted: parseInt(data.trusted) || 0,
        discount: data.discount || null,
        showCouponCode: data.showCouponCode ?? true,
        price: parseFloat(data.price) || 0,
        discounted: parseFloat(data.discounted) || 0,
        priceTag: data.priceTag || 'Best Price',
        bonus: data.bonus || null,
        profitSplit: data.profitSplit || null,
        maxDrawdown: data.maxDrawdown || null,
        dailyDrawdown: data.dailyDrawdown || null,
        minTradingDays: parseInt(data.minTradingDays) || 0,
        maxTradingDays: parseInt(data.maxTradingDays) || 0,
        payoutSpeed: data.payoutSpeed || null,
        platforms: data.platforms || null,
        instruments: data.instruments || null,
        leverage: data.leverage || null,
        refundable: data.refundable || false,
        scalingPlan: data.scalingPlan || false,
        newsTrading: data.newsTrading ?? true,
        weekendHolding: data.weekendHolding ?? true,
        eaAllowed: data.eaAllowed ?? true,
        copyTrading: data.copyTrading || false,
        minPayoutAmount: data.minPayoutAmount || null,
        payoutMethods: data.payoutMethods || null,
        trustScore: parseFloat(data.trustScore) || 0,
        verificationStatus: data.verificationStatus || 'Verified',
        buyUrl: data.buyUrl || null
      }
    })

    // Create challenges if provided - no validation
    if (data.challenges && Array.isArray(data.challenges) && data.challenges.length > 0) {
      for (const challenge of data.challenges) {
        await prisma.challenge.create({
          data: {
            firmId: firm.id,
            name: challenge.name || '',
            accountSize: challenge.accountSize || '',
            price: challenge.price || '0',
            discountedPrice: challenge.discountedPrice || challenge.price || '0',
            phase1Target: challenge.phase1Target || null,
            phase2Target: challenge.phase2Target || null,
            maxDrawdown: challenge.maxDrawdown || '',
            dailyDrawdown: challenge.dailyDrawdown || null,
            minDays: challenge.minDays || null,
            maxDays: challenge.maxDays || null,
            profitSplit: challenge.profitSplit || '',
            refundable: challenge.refundable || false
          }
        })
      }
    }

    return NextResponse.json(firm)
  } catch (error) {
    console.error('Create firm error:', error)
    return NextResponse.json({ 
      error: 'Failed to create firm',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// DELETE moved to /api/admin/firms/[id]/route.ts for better REST structure
