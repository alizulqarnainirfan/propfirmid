import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get the first (and should be only) site settings record
    let settings = await prisma.siteSettings.findFirst()
    
    // If no settings exist, create default ones
    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          communityMembers: '75K+',
          verifiedReviews: '3000+',
          trustedFirms: '20+',
          freeAccountsDistributed: '5000+'
        }
      })
    }
    
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Failed to fetch site settings:', error)
    return NextResponse.json({ error: 'Failed to fetch site settings' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const { communityMembers, verifiedReviews, trustedFirms, freeAccountsDistributed } = data

    // Get existing settings or create new ones
    let settings = await prisma.siteSettings.findFirst()
    
    if (settings) {
      // Update existing settings
      settings = await prisma.siteSettings.update({
        where: { id: settings.id },
        data: {
          communityMembers,
          verifiedReviews,
          trustedFirms,
          freeAccountsDistributed
        }
      })
    } else {
      // Create new settings
      settings = await prisma.siteSettings.create({
        data: {
          communityMembers,
          verifiedReviews,
          trustedFirms,
          freeAccountsDistributed
        }
      })
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Failed to update site settings:', error)
    return NextResponse.json({ error: 'Failed to update site settings' }, { status: 500 })
  }
}