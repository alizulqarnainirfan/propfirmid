import { Locale } from '@/i18n/translations'
import { FaUsers, FaShieldAlt, FaChartLine, FaHeart } from 'react-icons/fa'

export default function AboutPage({ params }: { params: { locale: Locale } }) {
  const isIndonesian = params.locale === 'id'

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {isIndonesian ? 'Tentang Kami' : 'About Us'}
          </h1>
          <p className="text-xl text-gray-600">
            {isIndonesian 
              ? 'Platform terpercaya untuk trader Indonesia'
              : 'Trusted platform for Indonesian traders'}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {isIndonesian ? 'Siapa Kami?' : 'Who We Are?'}
          </h2>
          <p className="text-gray-600 mb-4">
            {isIndonesian
              ? 'PropFirmID adalah platform komunitas terpercaya yang didedikasikan untuk membantu trader Indonesia menemukan dan membandingkan prop firm terbaik. Kami menyediakan informasi lengkap, review jujur, dan forum diskusi untuk membantu Anda membuat keputusan trading yang tepat.'
              : 'PropFirmID is a trusted community platform dedicated to helping Indonesian traders find and compare the best prop firms. We provide comprehensive information, honest reviews, and discussion forums to help you make the right trading decisions.'}
          </p>
          <p className="text-gray-600">
            {isIndonesian
              ? 'Dengan ribuan trader aktif dan ratusan review terverifikasi, kami berkomitmen untuk menjadi sumber informasi prop firm paling lengkap dan terpercaya di Indonesia.'
              : 'With thousands of active traders and hundreds of verified reviews, we are committed to being the most comprehensive and trusted source of prop firm information in Indonesia.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <FaUsers className="text-2xl text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {isIndonesian ? 'Komunitas Aktif' : 'Active Community'}
            </h3>
            <p className="text-gray-600">
              {isIndonesian
                ? 'Bergabung dengan ribuan trader Indonesia yang saling berbagi pengalaman dan strategi.'
                : 'Join thousands of Indonesian traders sharing experiences and strategies.'}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <FaShieldAlt className="text-2xl text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {isIndonesian ? 'Review Terverifikasi' : 'Verified Reviews'}
            </h3>
            <p className="text-gray-600">
              {isIndonesian
                ? 'Semua review diverifikasi untuk memastikan keaslian dan membantu Anda membuat keputusan yang tepat.'
                : 'All reviews are verified to ensure authenticity and help you make the right decisions.'}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FaChartLine className="text-2xl text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {isIndonesian ? 'Perbandingan Lengkap' : 'Comprehensive Comparison'}
            </h3>
            <p className="text-gray-600">
              {isIndonesian
                ? 'Bandingkan fitur, harga, dan kondisi trading dari berbagai prop firm dalam satu tempat.'
                : 'Compare features, prices, and trading conditions from various prop firms in one place.'}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <FaHeart className="text-2xl text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {isIndonesian ? 'Gratis Selamanya' : 'Free Forever'}
            </h3>
            <p className="text-gray-600">
              {isIndonesian
                ? 'Semua fitur kami gratis untuk digunakan. Tidak ada biaya tersembunyi atau langganan.'
                : 'All our features are free to use. No hidden fees or subscriptions.'}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            {isIndonesian ? 'Bergabunglah dengan Kami' : 'Join Us'}
          </h2>
          <p className="mb-6">
            {isIndonesian
              ? 'Mulai perjalanan trading Anda bersama komunitas trader Indonesia terbesar'
              : 'Start your trading journey with the largest Indonesian trader community'}
          </p>
          <a
            href={`/${params.locale}/register`}
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            {isIndonesian ? 'Daftar Sekarang' : 'Register Now'}
          </a>
        </div>
      </div>
    </div>
  )
}
