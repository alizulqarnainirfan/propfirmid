// @ts-ignore - Prisma Client is generated at build time
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

// @ts-ignore - Prisma Client is generated, TypeScript server needs refresh
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 10)
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@propfirm.com',
      name: 'Admin',
      password: hashedPassword,
      role: 'admin',
    },
  })
  
  const user1 = await prisma.user.create({
    data: {
      email: 'trader1@example.com',
      name: 'TradingPro',
      password: hashedPassword,
    },
  })

  const user2 = await prisma.user.create({
    data: {
      email: 'trader2@example.com',
      name: 'ForexMaster',
      password: hashedPassword,
    },
  })

  console.log('✅ Users created (Admin: admin@propfirm.com / password123)')

  // Create prop firms with detailed info
  const firms = [
    {
      name: 'Maven Trading',
      logo: 'https://pub-51c71f8fd7954912b8b4f24b379002f8.r2.dev/thetrustedprop/logo/1749482026637-maven_trading_prop_firm_logo_square_1b7ffc90b7.png',
      type: 'Instant Prop Firm',
      rating: 4.3,
      trusted: 3374,
      discount: '8% OFF',
      price: 15,
      discounted: 13.80,
      bonus: 'Akun gratis setelah payout',
      profitSplit: '80%',
      maxDrawdown: '10%',
      dailyDrawdown: '5%',
      minTradingDays: 0,
      maxTradingDays: 0,
      payoutSpeed: '1-3 days',
      platforms: 'MT4, MT5, cTrader',
      instruments: 'Forex, Indices, Commodities, Crypto',
      leverage: '1:100',
      refundable: true,
      scalingPlan: true,
      newsTrading: true,
      weekendHolding: true,
      eaAllowed: true,
      copyTrading: false,
      minPayoutAmount: '$100',
      payoutMethods: 'Bank Transfer, Crypto, PayPal',
      trustScore: 4.3,
      verificationStatus: 'Verified'
    },
    {
      name: 'The5ers',
      logo: 'https://pub-51c71f8fd7954912b8b4f24b379002f8.r2.dev/thetrustedprop/logo/1762777779387-the5ers.jpg',
      type: 'Forex Prop Firm',
      rating: 4.8,
      trusted: 3336,
      discount: '5% OFF',
      price: 39,
      discounted: 37.05,
      bonus: 'Akun GRATIS saat Payout',
      profitSplit: '80%',
      maxDrawdown: '10%',
      dailyDrawdown: '5%',
      minTradingDays: 5,
      maxTradingDays: 60,
      payoutSpeed: '2-5 days',
      platforms: 'MT4, MT5',
      instruments: 'Forex, Indices, Commodities',
      leverage: '1:100',
      refundable: false,
      scalingPlan: true,
      newsTrading: true,
      weekendHolding: true,
      eaAllowed: true,
      copyTrading: false,
      minPayoutAmount: '$50',
      payoutMethods: 'Bank Transfer, Skrill, Neteller',
      trustScore: 4.8,
      verificationStatus: 'Verified'
    },
    {
      name: 'Funding Pips',
      logo: 'https://pub-51c71f8fd7954912b8b4f24b379002f8.r2.dev/thetrustedprop/logo/1749482059493-Fundingpips_logo_e76ba914cb.jpg',
      type: 'Instant Prop Firm',
      rating: 4.5,
      trusted: 1386,
      discount: '20% OFF',
      price: 29,
      discounted: 23.20,
      profitSplit: '80%',
      maxDrawdown: '10%',
      dailyDrawdown: '5%',
      minTradingDays: 0,
      maxTradingDays: 0,
      payoutSpeed: '1-2 days',
      platforms: 'MT4, MT5',
      instruments: 'Forex, Indices, Commodities, Crypto',
      leverage: '1:100',
      refundable: true,
      scalingPlan: true,
      newsTrading: true,
      weekendHolding: true,
      eaAllowed: true,
      copyTrading: true,
      minPayoutAmount: '$50',
      payoutMethods: 'Crypto, Bank Transfer',
      trustScore: 4.5,
      verificationStatus: 'Verified'
    },
    {
      name: 'Blueberry Funded',
      logo: 'https://pub-51c71f8fd7954912b8b4f24b379002f8.r2.dev/thetrustedprop/logo/1767417776125-Blueberry%20logo.png',
      type: 'Broker Prop Firm',
      rating: 3.4,
      trusted: 1121,
      discount: '30% OFF',
      price: 39,
      discounted: 27.30,
      bonus: 'Akun 5k GRATIS saat Payout',
      profitSplit: '80%',
      maxDrawdown: '8%',
      dailyDrawdown: '4%',
      minTradingDays: 3,
      maxTradingDays: 30,
      payoutSpeed: '3-7 days',
      platforms: 'MT4, MT5',
      instruments: 'Forex, Indices',
      leverage: '1:50',
      refundable: false,
      scalingPlan: false,
      newsTrading: false,
      weekendHolding: true,
      eaAllowed: true,
      copyTrading: false,
      minPayoutAmount: '$100',
      payoutMethods: 'Bank Transfer',
      trustScore: 3.4,
      verificationStatus: 'Verified'
    },
    {
      name: 'DNA Funded',
      logo: 'https://pub-51c71f8fd7954912b8b4f24b379002f8.r2.dev/thetrustedprop/logo/1749483374569-dna_funded_logo_cc0406a9e0.png',
      type: 'Forex Prop Firm',
      rating: 4.3,
      trusted: 1009,
      discount: '25% OFF',
      price: 99,
      discounted: 74.25,
      profitSplit: '90%',
      maxDrawdown: '10%',
      dailyDrawdown: '5%',
      minTradingDays: 5,
      maxTradingDays: 60,
      payoutSpeed: '2-4 days',
      platforms: 'MT4, MT5, cTrader',
      instruments: 'Forex, Indices, Commodities',
      leverage: '1:100',
      refundable: true,
      scalingPlan: true,
      newsTrading: true,
      weekendHolding: true,
      eaAllowed: true,
      copyTrading: false,
      minPayoutAmount: '$100',
      payoutMethods: 'Bank Transfer, Crypto',
      trustScore: 4.3,
      verificationStatus: 'Verified'
    },
    {
      name: 'Eightcap Challenges',
      logo: 'https://pub-51c71f8fd7954912b8b4f24b379002f8.r2.dev/thetrustedprop/logo/1761626627425-WhatsApp%20Image%202025-10-28%20at%2010.00.17%20AM.jpeg',
      type: 'Broker Prop Firm',
      rating: 4.2,
      trusted: 997,
      discount: '20% OFF',
      price: 50,
      discounted: 40.00,
      profitSplit: '80%',
      maxDrawdown: '10%',
      dailyDrawdown: '5%',
      minTradingDays: 4,
      maxTradingDays: 45,
      payoutSpeed: '3-5 days',
      platforms: 'MT4, MT5',
      instruments: 'Forex, Indices, Commodities',
      leverage: '1:100',
      refundable: true,
      scalingPlan: true,
      newsTrading: true,
      weekendHolding: true,
      eaAllowed: false,
      copyTrading: false,
      minPayoutAmount: '$50',
      payoutMethods: 'Bank Transfer, Card',
      trustScore: 4.2,
      verificationStatus: 'Verified'
    },
    {
      name: 'Alpha Capital Group',
      logo: 'https://pub-51c71f8fd7954912b8b4f24b379002f8.r2.dev/thetrustedprop/logo/1749482036127-alpha_capital_group_prop_firm_logo_square_8b46b28a59.jpg',
      type: 'Forex Prop Firm',
      rating: 4.4,
      trusted: 906,
      discount: '15% OFF',
      price: 50,
      discounted: 42.50,
      profitSplit: '80%',
      maxDrawdown: '10%',
      dailyDrawdown: '5%',
      minTradingDays: 5,
      maxTradingDays: 60,
      payoutSpeed: '2-5 days',
      platforms: 'MT4, MT5',
      instruments: 'Forex, Indices, Commodities',
      leverage: '1:100',
      refundable: false,
      scalingPlan: true,
      newsTrading: true,
      weekendHolding: true,
      eaAllowed: true,
      copyTrading: false,
      minPayoutAmount: '$100',
      payoutMethods: 'Bank Transfer, Wise',
      trustScore: 4.4,
      verificationStatus: 'Verified'
    },
    {
      name: 'ATFunded',
      logo: 'https://pub-51c71f8fd7954912b8b4f24b379002f8.r2.dev/thetrustedprop/logo/1749483406572-atfunded_logo_64e5ebd771.jpg',
      type: 'Instant Prop Firm',
      rating: 4.1,
      trusted: 113,
      discount: '15% OFF',
      price: 25,
      discounted: 21.25,
      profitSplit: '80%',
      maxDrawdown: '10%',
      dailyDrawdown: '5%',
      minTradingDays: 0,
      maxTradingDays: 0,
      payoutSpeed: '1-3 days',
      platforms: 'MT4, MT5',
      instruments: 'Forex, Indices, Crypto',
      leverage: '1:100',
      refundable: true,
      scalingPlan: false,
      newsTrading: true,
      weekendHolding: true,
      eaAllowed: true,
      copyTrading: false,
      minPayoutAmount: '$50',
      payoutMethods: 'Crypto',
      trustScore: 4.1,
      verificationStatus: 'Pending'
    },
    {
      name: 'ThaurusGuru',
      logo: 'https://pub-51c71f8fd7954912b8b4f24b379002f8.r2.dev/thetrustedprop/logo/1757926649676-TG.gif',
      type: 'Crypto Prop Firm',
      rating: 4.0,
      trusted: 184,
      discount: '20% OFF',
      price: 45,
      discounted: 36.00,
      profitSplit: '80%',
      maxDrawdown: '8%',
      dailyDrawdown: '4%',
      minTradingDays: 0,
      maxTradingDays: 0,
      payoutSpeed: '1-2 days',
      platforms: 'MT5, cTrader',
      instruments: 'Crypto, Forex',
      leverage: '1:50',
      refundable: false,
      scalingPlan: true,
      newsTrading: true,
      weekendHolding: true,
      eaAllowed: true,
      copyTrading: true,
      minPayoutAmount: '$100',
      payoutMethods: 'Crypto',
      trustScore: 4.0,
      verificationStatus: 'Verified'
    },
    {
      name: 'My Crypto Funding',
      logo: 'https://pub-51c71f8fd7954912b8b4f24b379002f8.r2.dev/thetrustedprop/logo/1749483177791-Whats_App_Image_2024_12_04_at_11_40_02_PM_01ec17419c.jpeg',
      type: 'Crypto Prop Firm',
      rating: 4.2,
      trusted: 729,
      discount: '20% OFF',
      price: 50,
      discounted: 40.00,
      profitSplit: '80%',
      maxDrawdown: '10%',
      dailyDrawdown: '5%',
      minTradingDays: 0,
      maxTradingDays: 0,
      payoutSpeed: '2-4 days',
      platforms: 'MT5',
      instruments: 'Crypto',
      leverage: '1:100',
      refundable: true,
      scalingPlan: true,
      newsTrading: true,
      weekendHolding: true,
      eaAllowed: true,
      copyTrading: false,
      minPayoutAmount: '$50',
      payoutMethods: 'Crypto',
      trustScore: 4.2,
      verificationStatus: 'Verified'
    },
    {
      name: 'ThinkCapital',
      logo: 'https://pub-51c71f8fd7954912b8b4f24b379002f8.r2.dev/thetrustedprop/logo/1749482992219-think_capital_logo_eb8c2188ac.jpg',
      type: 'Forex Prop Firm',
      rating: 4.3,
      trusted: 529,
      discount: '25% OFF',
      price: 59,
      discounted: 44.25,
      profitSplit: '80%',
      maxDrawdown: '10%',
      dailyDrawdown: '5%',
      minTradingDays: 5,
      maxTradingDays: 60,
      payoutSpeed: '3-5 days',
      platforms: 'MT4, MT5',
      instruments: 'Forex, Indices, Commodities',
      leverage: '1:100',
      refundable: false,
      scalingPlan: true,
      newsTrading: false,
      weekendHolding: true,
      eaAllowed: true,
      copyTrading: false,
      minPayoutAmount: '$100',
      payoutMethods: 'Bank Transfer',
      trustScore: 4.3,
      verificationStatus: 'Verified'
    },
    {
      name: 'FXIFY',
      logo: 'https://pub-51c71f8fd7954912b8b4f24b379002f8.r2.dev/thetrustedprop/logo/1749482131437-images_b0d556b157.jpg',
      type: 'Forex Prop Firm',
      rating: 4.4,
      trusted: 444,
      discount: '20% OFF',
      price: 59,
      discounted: 47.20,
      profitSplit: '90%',
      maxDrawdown: '10%',
      dailyDrawdown: '5%',
      minTradingDays: 5,
      maxTradingDays: 60,
      payoutSpeed: '2-4 days',
      platforms: 'MT4, MT5, cTrader',
      instruments: 'Forex, Indices, Commodities',
      leverage: '1:100',
      refundable: true,
      scalingPlan: true,
      newsTrading: true,
      weekendHolding: true,
      eaAllowed: true,
      copyTrading: false,
      minPayoutAmount: '$100',
      payoutMethods: 'Bank Transfer, Crypto, Wise',
      trustScore: 4.4,
      verificationStatus: 'Verified'
    },
  ]

  for (const firm of firms) {
    await prisma.propFirm.create({ data: firm })
  }

  console.log('✅ Prop firms created')

  // Get created firms for adding challenges
  const createdFirms = await prisma.propFirm.findMany()
  
  // Create challenges for each firm
  const mavenFirm = createdFirms.find((f: any) => f.name === 'Maven Trading')
  if (mavenFirm) {
    await prisma.challenge.createMany({
      data: [
        {
          firmId: mavenFirm.id,
          name: '$5K Challenge',
          accountSize: '$5,000',
          price: "15",
          discountedPrice: "13.80",
          phase1Target: '8%',
          phase2Target: '5%',
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "0",
          maxDays: "0",
          profitSplit: '80%',
          refundable: true
        },
        {
          firmId: mavenFirm.id,
          name: '$10K Challenge',
          accountSize: '$10,000',
          price: "39",
          discountedPrice: "35.88",
          phase1Target: '8%',
          phase2Target: '5%',
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "0",
          maxDays: "0",
          profitSplit: '80%',
          refundable: true
        },
        {
          firmId: mavenFirm.id,
          name: '$25K Challenge',
          accountSize: '$25,000',
          price: "79",
          discountedPrice: "72.68",
          phase1Target: '8%',
          phase2Target: '5%',
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "0",
          maxDays: "0",
          profitSplit: '80%',
          refundable: true
        },
        {
          firmId: mavenFirm.id,
          name: '$50K Challenge',
          accountSize: '$50,000',
          price: "149",
          discountedPrice: "137.08",
          phase1Target: '8%',
          phase2Target: '5%',
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "0",
          maxDays: "0",
          profitSplit: '80%',
          refundable: true
        },
        {
          firmId: mavenFirm.id,
          name: '$100K Challenge',
          accountSize: '$100,000',
          price: "299",
          discountedPrice: "275.08",
          phase1Target: '8%',
          phase2Target: '5%',
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "0",
          maxDays: "0",
          profitSplit: '80%',
          refundable: true
        }
      ]
    })
  }

  const the5ersFirm = createdFirms.find((f: any) => f.name === 'The5ers')
  if (the5ersFirm) {
    await prisma.challenge.createMany({
      data: [
        {
          firmId: the5ersFirm.id,
          name: '$6K Challenge',
          accountSize: '$6,000',
          price: "39",
          discountedPrice: "37.05",
          phase1Target: '8%',
          phase2Target: '5%',
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "5",
          maxDays: "60",
          profitSplit: '80%',
          refundable: false
        },
        {
          firmId: the5ersFirm.id,
          name: '$12K Challenge',
          accountSize: '$12,000',
          price: "79",
          discountedPrice: "75.05",
          phase1Target: '8%',
          phase2Target: '5%',
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "5",
          maxDays: "60",
          profitSplit: '80%',
          refundable: false
        },
        {
          firmId: the5ersFirm.id,
          name: '$24K Challenge',
          accountSize: '$24,000',
          price: "159",
          discountedPrice: "151.05",
          phase1Target: '8%',
          phase2Target: '5%',
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "5",
          maxDays: "60",
          profitSplit: '80%',
          refundable: false
        },
        {
          firmId: the5ersFirm.id,
          name: '$60K Challenge',
          accountSize: '$60,000',
          price: "399",
          discountedPrice: "379.05",
          phase1Target: '8%',
          phase2Target: '5%',
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "5",
          maxDays: "60",
          profitSplit: '80%',
          refundable: false
        }
      ]
    })
  }

  const fundingPipsFirm = createdFirms.find((f: any) => f.name === 'Funding Pips')
  if (fundingPipsFirm) {
    await prisma.challenge.createMany({
      data: [
        {
          firmId: fundingPipsFirm.id,
          name: '$5K Instant',
          accountSize: '$5,000',
          price: "29",
          discountedPrice: "23.20",
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "0",
          maxDays: "0",
          profitSplit: '80%',
          refundable: true
        },
        {
          firmId: fundingPipsFirm.id,
          name: '$10K Instant',
          accountSize: '$10,000',
          price: "59",
          discountedPrice: "47.20",
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "0",
          maxDays: "0",
          profitSplit: '80%',
          refundable: true
        },
        {
          firmId: fundingPipsFirm.id,
          name: '$25K Instant',
          accountSize: '$25,000',
          price: "149",
          discountedPrice: "119.20",
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "0",
          maxDays: "0",
          profitSplit: '80%',
          refundable: true
        },
        {
          firmId: fundingPipsFirm.id,
          name: '$50K Instant',
          accountSize: '$50,000',
          price: "299",
          discountedPrice: "239.20",
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "0",
          maxDays: "0",
          profitSplit: '80%',
          refundable: true
        },
        {
          firmId: fundingPipsFirm.id,
          name: '$100K Instant',
          accountSize: '$100,000',
          price: "599",
          discountedPrice: "479.20",
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "0",
          maxDays: "0",
          profitSplit: '80%',
          refundable: true
        }
      ]
    })
  }

  const blueberryFirm = createdFirms.find((f: any) => f.name === 'Blueberry Funded')
  if (blueberryFirm) {
    await prisma.challenge.createMany({
      data: [
        {
          firmId: blueberryFirm.id,
          name: '$5K Challenge',
          accountSize: '$5,000',
          price: "39",
          discountedPrice: "27.30",
          phase1Target: '8%',
          phase2Target: '5%',
          maxDrawdown: '8%',
          dailyDrawdown: '4%',
          minDays: "3",
          maxDays: "30",
          profitSplit: '80%',
          refundable: false
        },
        {
          firmId: blueberryFirm.id,
          name: '$10K Challenge',
          accountSize: '$10,000',
          price: "79",
          discountedPrice: "55.30",
          phase1Target: '8%',
          phase2Target: '5%',
          maxDrawdown: '8%',
          dailyDrawdown: '4%',
          minDays: "3",
          maxDays: "30",
          profitSplit: '80%',
          refundable: false
        },
        {
          firmId: blueberryFirm.id,
          name: '$25K Challenge',
          accountSize: '$25,000',
          price: "199",
          discountedPrice: "139.30",
          phase1Target: '8%',
          phase2Target: '5%',
          maxDrawdown: '8%',
          dailyDrawdown: '4%',
          minDays: "3",
          maxDays: "30",
          profitSplit: '80%',
          refundable: false
        }
      ]
    })
  }

  const dnaFirm = createdFirms.find((f: any) => f.name === 'DNA Funded')
  if (dnaFirm) {
    await prisma.challenge.createMany({
      data: [
        {
          firmId: dnaFirm.id,
          name: '$10K Challenge',
          accountSize: '$10,000',
          price: "99",
          discountedPrice: "74.25",
          phase1Target: '8%',
          phase2Target: '5%',
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "5",
          maxDays: "60",
          profitSplit: '90%',
          refundable: true
        },
        {
          firmId: dnaFirm.id,
          name: '$25K Challenge',
          accountSize: '$25,000',
          price: "199",
          discountedPrice: "149.25",
          phase1Target: '8%',
          phase2Target: '5%',
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "5",
          maxDays: "60",
          profitSplit: '90%',
          refundable: true
        },
        {
          firmId: dnaFirm.id,
          name: '$50K Challenge',
          accountSize: '$50,000',
          price: "399",
          discountedPrice: "299.25",
          phase1Target: '8%',
          phase2Target: '5%',
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "5",
          maxDays: "60",
          profitSplit: '90%',
          refundable: true
        },
        {
          firmId: dnaFirm.id,
          name: '$100K Challenge',
          accountSize: '$100,000',
          price: "799",
          discountedPrice: "599.25",
          phase1Target: '8%',
          phase2Target: '5%',
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "5",
          maxDays: "60",
          profitSplit: '90%',
          refundable: true
        }
      ]
    })
  }

  const alphaFirm = createdFirms.find((f: any) => f.name === 'Alpha Capital Group')
  if (alphaFirm) {
    await prisma.challenge.createMany({
      data: [
        {
          firmId: alphaFirm.id,
          name: '$10K Challenge',
          accountSize: '$10,000',
          price: "50",
          discountedPrice: "42.50",
          phase1Target: '8%',
          phase2Target: '5%',
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "5",
          maxDays: "60",
          profitSplit: '80%',
          refundable: false
        },
        {
          firmId: alphaFirm.id,
          name: '$25K Challenge',
          accountSize: '$25,000',
          price: "125",
          discountedPrice: "106.25",
          phase1Target: '8%',
          phase2Target: '5%',
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "5",
          maxDays: "60",
          profitSplit: '80%',
          refundable: false
        },
        {
          firmId: alphaFirm.id,
          name: '$50K Challenge',
          accountSize: '$50,000',
          price: "250",
          discountedPrice: "212.50",
          phase1Target: '8%',
          phase2Target: '5%',
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "5",
          maxDays: "60",
          profitSplit: '80%',
          refundable: false
        },
        {
          firmId: alphaFirm.id,
          name: '$100K Challenge',
          accountSize: '$100,000',
          price: "500",
          discountedPrice: "425.00",
          phase1Target: '8%',
          phase2Target: '5%',
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "5",
          maxDays: "60",
          profitSplit: '80%',
          refundable: false
        }
      ]
    })
  }

  const eightcapFirm = createdFirms.find((f: any) => f.name === 'Eightcap Challenges')
  if (eightcapFirm) {
    await prisma.challenge.createMany({
      data: [
        {
          firmId: eightcapFirm.id,
          name: '$10K Challenge',
          accountSize: '$10,000',
          price: "50",
          discountedPrice: "40.00",
          phase1Target: '8%',
          phase2Target: '5%',
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "4",
          maxDays: "45",
          profitSplit: '80%',
          refundable: true
        },
        {
          firmId: eightcapFirm.id,
          name: '$25K Challenge',
          accountSize: '$25,000',
          price: "125",
          discountedPrice: "100.00",
          phase1Target: '8%',
          phase2Target: '5%',
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "4",
          maxDays: "45",
          profitSplit: '80%',
          refundable: true
        },
        {
          firmId: eightcapFirm.id,
          name: '$50K Challenge',
          accountSize: '$50,000',
          price: "250",
          discountedPrice: "200.00",
          phase1Target: '8%',
          phase2Target: '5%',
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "4",
          maxDays: "45",
          profitSplit: '80%',
          refundable: true
        },
        {
          firmId: eightcapFirm.id,
          name: '$100K Challenge',
          accountSize: '$100,000',
          price: "500",
          discountedPrice: "400.00",
          phase1Target: '8%',
          phase2Target: '5%',
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "4",
          maxDays: "45",
          profitSplit: '80%',
          refundable: true
        }
      ]
    })
  }

  const atfundedFirm = createdFirms.find((f: any) => f.name === 'ATFunded')
  if (atfundedFirm) {
    await prisma.challenge.createMany({
      data: [
        {
          firmId: atfundedFirm.id,
          name: '$5K Instant',
          accountSize: '$5,000',
          price: "25",
          discountedPrice: "21.25",
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "0",
          maxDays: "0",
          profitSplit: '80%',
          refundable: true
        },
        {
          firmId: atfundedFirm.id,
          name: '$10K Instant',
          accountSize: '$10,000',
          price: "50",
          discountedPrice: "42.50",
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "0",
          maxDays: "0",
          profitSplit: '80%',
          refundable: true
        },
        {
          firmId: atfundedFirm.id,
          name: '$25K Instant',
          accountSize: '$25,000',
          price: "125",
          discountedPrice: "106.25",
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "0",
          maxDays: "0",
          profitSplit: '80%',
          refundable: true
        },
        {
          firmId: atfundedFirm.id,
          name: '$50K Instant',
          accountSize: '$50,000',
          price: "250",
          discountedPrice: "212.50",
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "0",
          maxDays: "0",
          profitSplit: '80%',
          refundable: true
        }
      ]
    })
  }

  const thaurusGuruFirm = createdFirms.find((f: any) => f.name === 'ThaurusGuru')
  if (thaurusGuruFirm) {
    await prisma.challenge.createMany({
      data: [
        {
          firmId: thaurusGuruFirm.id,
          name: '$5K Instant',
          accountSize: '$5,000',
          price: "45",
          discountedPrice: "36.00",
          maxDrawdown: '8%',
          dailyDrawdown: '4%',
          minDays: "0",
          maxDays: "0",
          profitSplit: '80%',
          refundable: false
        },
        {
          firmId: thaurusGuruFirm.id,
          name: '$10K Instant',
          accountSize: '$10,000',
          price: "90",
          discountedPrice: "72.00",
          maxDrawdown: '8%',
          dailyDrawdown: '4%',
          minDays: "0",
          maxDays: "0",
          profitSplit: '80%',
          refundable: false
        },
        {
          firmId: thaurusGuruFirm.id,
          name: '$25K Instant',
          accountSize: '$25,000',
          price: "225",
          discountedPrice: "180.00",
          maxDrawdown: '8%',
          dailyDrawdown: '4%',
          minDays: "0",
          maxDays: "0",
          profitSplit: '80%',
          refundable: false
        },
        {
          firmId: thaurusGuruFirm.id,
          name: '$50K Instant',
          accountSize: '$50,000',
          price: "450",
          discountedPrice: "360.00",
          maxDrawdown: '8%',
          dailyDrawdown: '4%',
          minDays: "0",
          maxDays: "0",
          profitSplit: '80%',
          refundable: false
        }
      ]
    })
  }

  const myCryptoFundingFirm = createdFirms.find((f: any) => f.name === 'My Crypto Funding')
  if (myCryptoFundingFirm) {
    await prisma.challenge.createMany({
      data: [
        {
          firmId: myCryptoFundingFirm.id,
          name: '$5K Instant',
          accountSize: '$5,000',
          price: "50",
          discountedPrice: "40.00",
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "0",
          maxDays: "0",
          profitSplit: '80%',
          refundable: true
        },
        {
          firmId: myCryptoFundingFirm.id,
          name: '$10K Instant',
          accountSize: '$10,000',
          price: "100",
          discountedPrice: "80.00",
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "0",
          maxDays: "0",
          profitSplit: '80%',
          refundable: true
        },
        {
          firmId: myCryptoFundingFirm.id,
          name: '$25K Instant',
          accountSize: '$25,000',
          price: "250",
          discountedPrice: "200.00",
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "0",
          maxDays: "0",
          profitSplit: '80%',
          refundable: true
        },
        {
          firmId: myCryptoFundingFirm.id,
          name: '$50K Instant',
          accountSize: '$50,000',
          price: "500",
          discountedPrice: "400.00",
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "0",
          maxDays: "0",
          profitSplit: '80%',
          refundable: true
        }
      ]
    })
  }

  const thinkCapitalFirm = createdFirms.find((f: any) => f.name === 'ThinkCapital')
  if (thinkCapitalFirm) {
    await prisma.challenge.createMany({
      data: [
        {
          firmId: thinkCapitalFirm.id,
          name: '$10K Challenge',
          accountSize: '$10,000',
          price: "59",
          discountedPrice: "44.25",
          phase1Target: '8%',
          phase2Target: '5%',
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "5",
          maxDays: "60",
          profitSplit: '80%',
          refundable: false
        },
        {
          firmId: thinkCapitalFirm.id,
          name: '$25K Challenge',
          accountSize: '$25,000',
          price: "149",
          discountedPrice: "111.75",
          phase1Target: '8%',
          phase2Target: '5%',
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "5",
          maxDays: "60",
          profitSplit: '80%',
          refundable: false
        },
        {
          firmId: thinkCapitalFirm.id,
          name: '$50K Challenge',
          accountSize: '$50,000',
          price: "299",
          discountedPrice: "224.25",
          phase1Target: '8%',
          phase2Target: '5%',
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "5",
          maxDays: "60",
          profitSplit: '80%',
          refundable: false
        },
        {
          firmId: thinkCapitalFirm.id,
          name: '$100K Challenge',
          accountSize: '$100,000',
          price: "599",
          discountedPrice: "449.25",
          phase1Target: '8%',
          phase2Target: '5%',
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "5",
          maxDays: "60",
          profitSplit: '80%',
          refundable: false
        }
      ]
    })
  }

  const fxifyFirm = createdFirms.find((f: any) => f.name === 'FXIFY')
  if (fxifyFirm) {
    await prisma.challenge.createMany({
      data: [
        {
          firmId: fxifyFirm.id,
          name: '$10K Challenge',
          accountSize: '$10,000',
          price: "59",
          discountedPrice: "47.20",
          phase1Target: '8%',
          phase2Target: '5%',
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "5",
          maxDays: "60",
          profitSplit: '90%',
          refundable: true
        },
        {
          firmId: fxifyFirm.id,
          name: '$25K Challenge',
          accountSize: '$25,000',
          price: "149",
          discountedPrice: "119.20",
          phase1Target: '8%',
          phase2Target: '5%',
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "5",
          maxDays: "60",
          profitSplit: '90%',
          refundable: true
        },
        {
          firmId: fxifyFirm.id,
          name: '$50K Challenge',
          accountSize: '$50,000',
          price: "299",
          discountedPrice: "239.20",
          phase1Target: '8%',
          phase2Target: '5%',
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "5",
          maxDays: "60",
          profitSplit: '90%',
          refundable: true
        },
        {
          firmId: fxifyFirm.id,
          name: '$100K Challenge',
          accountSize: '$100,000',
          price: "599",
          discountedPrice: "479.20",
          phase1Target: '8%',
          phase2Target: '5%',
          maxDrawdown: '10%',
          dailyDrawdown: '5%',
          minDays: "5",
          maxDays: "60",
          profitSplit: '90%',
          refundable: true
        }
      ]
    })
  }

  console.log('✅ Challenges created')

  // Create forum posts
  const post1 = await prisma.post.create({
    data: {
      title: 'Pengalaman saya dengan Maven Trading - Worth it!',
      content: 'Halo semua! Saya mau share pengalaman saya menggunakan Maven Trading selama 3 bulan terakhir.',
      authorId: user1.id,
    },
  })

  const post2 = await prisma.post.create({
    data: {
      title: 'Tips lolos challenge The5ers untuk pemula',
      content: 'Berikut beberapa tips yang membantu saya lolos challenge The5ers...',
      authorId: user2.id,
    },
  })

  console.log('✅ Forum posts created')

  // Create comments
  await prisma.comment.create({
    data: {
      content: 'Terima kasih sharingnya! Sangat membantu.',
      postId: post1.id,
      authorId: user2.id,
    },
  })

  console.log('✅ Comments created')

  // Create giveaways
  await prisma.giveaway.create({
    data: {
      title: 'Giveaway Akun $10,000 Maven Trading',
      description: 'Ikuti giveaway dan menangkan akun funded $10,000!',
      prize: 'Akun Funded $10,000',
      endDate: new Date('2026-03-15'),
    },
  })

  console.log('✅ Giveaways created')

  // Create default site settings
  await prisma.siteSettings.create({
    data: {
      communityMembers: '75K+',
      verifiedReviews: '3000+',
      trustedFirms: '20+',
      freeAccountsDistributed: '5000+'
    }
  })

  console.log('✅ Site settings created')

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
