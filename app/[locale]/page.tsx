// test deploy - April 5, 2026
import Link from 'next/link'
import { FaStar, FaUsers, FaChartLine, FaGift } from 'react-icons/fa'
import FirmCard from '@/components/FirmCard'
import HomeCompareSection from '@/components/HomeCompareSection'
import { translations, Locale } from '@/i18n/translations'
import { prisma } from '@/lib/prisma'
import GiveawaySubscribe from '@/components/GiveawaySubscribe'

async function getTopFirms() {
  const firms = await prisma.propFirm.findMany({
    orderBy: { rating: 'desc' },
    take: 7
  })
  return firms
}

async function getSiteSettings() {
  try {
    // @ts-ignore - Prisma client types will be available after build
    let settings = await prisma.siteSettings.findFirst()
    
    // If no settings exist, return defaults
    if (!settings) {
      return {
        communityMembers: '75K+',
        verifiedReviews: '3000+',
        trustedFirms: '20+',
        freeAccountsDistributed: '5000+'
      }
    }
    
    return settings
  } catch (error) {
    console.error('Failed to fetch site settings:', error)
    // Return defaults on error
    return {
      communityMembers: '75K+',
      verifiedReviews: '3000+',
      trustedFirms: '20+',
      freeAccountsDistributed: '5000+'
    }
  }
}

export default async function Home({ params }: { params: { locale: Locale } }) {
  const t = translations[params.locale] || translations['en']
  const topFirms = await getTopFirms()
  const siteSettings = await getSiteSettings()
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t.home.hero.title}
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            {t.home.hero.subtitle}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            {/* <Link 
              href={`/${params.locale}/forum`}
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              {t.home.hero.startDiscussion}
            </Link> */}
            <Link 
              href={`/${params.locale}/compare`}
              className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition border-2 border-white"
            >
              {t.home.hero.compareFirms}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <FaUsers className="text-4xl text-primary-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-800">{siteSettings.communityMembers}</div>
              <div className="text-gray-600">{t.home.stats.community}</div>
            </div>
            <div>
              <FaStar className="text-4xl text-primary-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-800">{siteSettings.verifiedReviews}</div>
              <div className="text-gray-600">{t.home.stats.reviews}</div>
            </div>
            <div>
              <FaChartLine className="text-4xl text-primary-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-800">{siteSettings.trustedFirms}</div>
              <div className="text-gray-600">{t.home.stats.firms}</div>
            </div>
            <div>
              <FaGift className="text-4xl text-primary-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-800">{siteSettings.freeAccountsDistributed}</div>
              <div className="text-gray-600">{t.home.stats.accounts}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Top 7 Firms */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            {t.home.topFirms}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topFirms.map((firm: any, index: number) => (
              <FirmCard key={firm.id} firm={firm} rank={index + 1} locale={params.locale} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              href={`/${params.locale}/firms`}
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              {t.home.viewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* Compare Firms Section */}
      <HomeCompareSection locale={params.locale} />

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            {t.home.whyJoin}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaStar className="text-2xl text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t.home.features.verified.title}</h3>
              <p className="text-gray-600">
                {t.home.features.verified.desc}
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-2xl text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t.home.features.community.title}</h3>
              <p className="text-gray-600">
                {t.home.features.community.desc}
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaGift className="text-2xl text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t.home.features.giveaway.title}</h3>
              <p className="text-gray-600">
                {t.home.features.giveaway.desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Giveaway Subscribe Section */}
      <GiveawaySubscribe locale={params.locale} />
    </div>
  )
}
