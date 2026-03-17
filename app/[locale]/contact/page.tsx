import { Locale } from '@/i18n/translations'
import { FaEnvelope, FaTelegram, FaInstagram, FaTwitter } from 'react-icons/fa'

export default function ContactPage({ params }: { params: { locale: Locale } }) {
  const isIndonesian = params.locale === 'id'

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {isIndonesian ? 'Hubungi Kami' : 'Contact Us'}
          </h1>
          <p className="text-xl text-gray-600">
            {isIndonesian 
              ? 'Kami siap membantu Anda'
              : 'We are here to help you'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {isIndonesian ? 'Kirim Pesan' : 'Send Message'}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  {isIndonesian ? 'Nama' : 'Name'}
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                  placeholder={isIndonesian ? 'Nama Anda' : 'Your Name'}
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                  placeholder={isIndonesian ? 'email@example.com' : 'email@example.com'}
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  {isIndonesian ? 'Subjek' : 'Subject'}
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                  placeholder={isIndonesian ? 'Subjek pesan' : 'Message subject'}
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  {isIndonesian ? 'Pesan' : 'Message'}
                </label>
                <textarea
                  className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                  rows={5}
                  placeholder={isIndonesian ? 'Tulis pesan Anda...' : 'Write your message...'}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
              >
                {isIndonesian ? 'Kirim Pesan' : 'Send Message'}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <FaEnvelope className="text-2xl text-primary-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Email</h3>
                  <p className="text-gray-600">support@propfirmid.com</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {isIndonesian
                  ? 'Kirim email kepada kami untuk pertanyaan atau bantuan'
                  : 'Send us an email for questions or assistance'}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">
                {isIndonesian ? 'Media Sosial' : 'Social Media'}
              </h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-primary-600 transition">
                  <FaTelegram className="text-2xl" />
                  <span>@PropFirmID</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-primary-600 transition">
                  <FaInstagram className="text-2xl" />
                  <span>@propfirmid</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-primary-600 transition">
                  <FaTwitter className="text-2xl" />
                  <span>@PropFirmID</span>
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg p-6 text-white">
              <h3 className="font-bold mb-2">
                {isIndonesian ? 'Jam Operasional' : 'Operating Hours'}
              </h3>
              <p className="text-sm text-white/90">
                {isIndonesian
                  ? 'Senin - Jumat: 09:00 - 18:00 WIB'
                  : 'Monday - Friday: 09:00 - 18:00 WIB'}
              </p>
              <p className="text-sm text-white/90">
                {isIndonesian
                  ? 'Sabtu - Minggu: Tutup'
                  : 'Saturday - Sunday: Closed'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
