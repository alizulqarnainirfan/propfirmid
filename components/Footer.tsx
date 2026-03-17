import Link from 'next/link'
import { FaFacebook, FaTwitter, FaInstagram, FaTelegram } from 'react-icons/fa'
import { Locale } from '@/i18n/translations'

export default function Footer({ locale }: { locale: Locale }) {
  const isIndonesian = locale === 'id'
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">PropFirmID</h3>
            <p className="text-sm">
              {isIndonesian 
                ? 'Platform diskusi dan review prop firm terpercaya untuk trader Indonesia'
                : 'Trusted prop firm discussion and review platform for Indonesian traders'}
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">{isIndonesian ? 'Menu' : 'Menu'}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}`} className="hover:text-primary-400">{isIndonesian ? 'Beranda' : 'Home'}</Link></li>
              <li><Link href={`/${locale}/firms`} className="hover:text-primary-400">{isIndonesian ? 'Semua Firms' : 'All Firms'}</Link></li>
              <li><Link href={`/${locale}/compare`} className="hover:text-primary-400">{isIndonesian ? 'Bandingkan Firm' : 'Compare Firms'}</Link></li>
              <li><Link href={`/${locale}/blogs`} className="hover:text-primary-400">{isIndonesian ? 'Blog' : 'Blog'}</Link></li>
              {/* <li><Link href={`/${locale}/forum`} className="hover:text-primary-400">Forum</Link></li> */}
              <li><Link href={`/${locale}/reviews`} className="hover:text-primary-400">Review</Link></li>
              <li><Link href={`/${locale}/giveaways`} className="hover:text-primary-400">Giveaway</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">{isIndonesian ? 'Bantuan' : 'Help'}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}/about`} className="hover:text-primary-400">{isIndonesian ? 'Tentang Kami' : 'About Us'}</Link></li>
              <li><Link href={`/${locale}/contact`} className="hover:text-primary-400">{isIndonesian ? 'Kontak' : 'Contact'}</Link></li>
              <li><Link href={`/${locale}/privacy`} className="hover:text-primary-400">{isIndonesian ? 'Kebijakan Privasi' : 'Privacy Policy'}</Link></li>
              <li><Link href={`/${locale}/terms`} className="hover:text-primary-400">{isIndonesian ? 'Syarat & Ketentuan' : 'Terms & Conditions'}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">{isIndonesian ? 'Ikuti Kami' : 'Follow Us'}</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-400"><FaFacebook size={24} /></a>
              <a href="#" className="hover:text-primary-400"><FaTwitter size={24} /></a>
              <a href="#" className="hover:text-primary-400"><FaInstagram size={24} /></a>
              <a href="#" className="hover:text-primary-400"><FaTelegram size={24} /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>© 2026 PropFirmID. {isIndonesian ? 'Semua hak dilindungi.' : 'All rights reserved.'}</p>
          <p className="mt-2 text-xs">
            {isIndonesian 
              ? 'Disclaimer: Kami bukan penasihat keuangan. Lakukan riset sendiri sebelum berinvestasi.'
              : 'Disclaimer: We are not financial advisors. Do your own research before investing.'}
          </p>
        </div>
      </div>
    </footer>
  )
}
