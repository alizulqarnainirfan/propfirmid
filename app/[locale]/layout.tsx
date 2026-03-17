import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'
import { Locale } from '@/i18n/translations'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PropFirm Forum Indonesia',
  description: 'Platform diskusi dan review prop firm untuk trader Indonesia',
  icons: {
    icon: [
      { url: '/logo-raw.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    shortcut: '/favicon.ico',
    apple: '/logo-raw.svg',
  },
}

export async function generateStaticParams() {
  return [{ locale: 'id' }, { locale: 'en' }]
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  return (
    <html lang={params.locale}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1ABC9C" />
      </head>
      <body className={inter.className}>
        <Navbar locale={params.locale} />
        <main className="min-h-screen">{children}</main>
        <Footer locale={params.locale} />
        {/* <Chatbot /> */}
      </body>
    </html>
  )
}
