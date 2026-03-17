import { Locale } from '@/i18n/translations'

export default function PrivacyPage({ params }: { params: { locale: Locale } }) {
  const isIndonesian = params.locale === 'id'

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {isIndonesian ? 'Kebijakan Privasi' : 'Privacy Policy'}
          </h1>
          <p className="text-gray-600">
            {isIndonesian ? 'Terakhir diperbarui: Maret 2026' : 'Last updated: March 2026'}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {isIndonesian ? '1. Informasi yang Kami Kumpulkan' : '1. Information We Collect'}
            </h2>
            <p className="text-gray-600 mb-3">
              {isIndonesian
                ? 'Kami mengumpulkan informasi yang Anda berikan secara langsung kepada kami, termasuk:'
                : 'We collect information you provide directly to us, including:'}
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>{isIndonesian ? 'Nama dan alamat email saat registrasi' : 'Name and email address during registration'}</li>
              <li>{isIndonesian ? 'Konten yang Anda posting (forum, review, komentar)' : 'Content you post (forum, reviews, comments)'}</li>
              <li>{isIndonesian ? 'Informasi profil dan preferensi' : 'Profile information and preferences'}</li>
              <li>{isIndonesian ? 'Data komunikasi dengan kami' : 'Communication data with us'}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {isIndonesian ? '2. Penggunaan Informasi' : '2. Use of Information'}
            </h2>
            <p className="text-gray-600 mb-3">
              {isIndonesian
                ? 'Kami menggunakan informasi yang dikumpulkan untuk:'
                : 'We use the collected information to:'}
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>{isIndonesian ? 'Menyediakan dan meningkatkan layanan kami' : 'Provide and improve our services'}</li>
              <li>{isIndonesian ? 'Mengirim notifikasi dan update penting' : 'Send notifications and important updates'}</li>
              <li>{isIndonesian ? 'Menanggapi pertanyaan dan permintaan Anda' : 'Respond to your questions and requests'}</li>
              <li>{isIndonesian ? 'Mencegah penyalahgunaan dan aktivitas ilegal' : 'Prevent abuse and illegal activities'}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {isIndonesian ? '3. Keamanan Data' : '3. Data Security'}
            </h2>
            <p className="text-gray-600">
              {isIndonesian
                ? 'Kami menggunakan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi informasi pribadi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah. Password Anda dienkripsi menggunakan teknologi hashing yang aman.'
                : 'We use appropriate technical and organizational security measures to protect your personal information from unauthorized access, use, or disclosure. Your password is encrypted using secure hashing technology.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {isIndonesian ? '4. Berbagi Informasi' : '4. Information Sharing'}
            </h2>
            <p className="text-gray-600">
              {isIndonesian
                ? 'Kami tidak menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga. Kami hanya membagikan informasi dalam situasi berikut:'
                : 'We do not sell or rent your personal information to third parties. We only share information in the following situations:'}
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mt-3">
              <li>{isIndonesian ? 'Dengan persetujuan Anda' : 'With your consent'}</li>
              <li>{isIndonesian ? 'Untuk mematuhi hukum yang berlaku' : 'To comply with applicable laws'}</li>
              <li>{isIndonesian ? 'Untuk melindungi hak dan keamanan kami' : 'To protect our rights and security'}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {isIndonesian ? '5. Cookies' : '5. Cookies'}
            </h2>
            <p className="text-gray-600">
              {isIndonesian
                ? 'Kami menggunakan cookies dan teknologi pelacakan serupa untuk meningkatkan pengalaman Anda di platform kami. Anda dapat mengatur browser Anda untuk menolak cookies, tetapi beberapa fitur mungkin tidak berfungsi dengan baik.'
                : 'We use cookies and similar tracking technologies to enhance your experience on our platform. You can set your browser to refuse cookies, but some features may not work properly.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {isIndonesian ? '6. Hak Anda' : '6. Your Rights'}
            </h2>
            <p className="text-gray-600 mb-3">
              {isIndonesian ? 'Anda memiliki hak untuk:' : 'You have the right to:'}
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>{isIndonesian ? 'Mengakses dan memperbarui informasi pribadi Anda' : 'Access and update your personal information'}</li>
              <li>{isIndonesian ? 'Menghapus akun Anda' : 'Delete your account'}</li>
              <li>{isIndonesian ? 'Menolak komunikasi marketing' : 'Opt-out of marketing communications'}</li>
              <li>{isIndonesian ? 'Meminta salinan data Anda' : 'Request a copy of your data'}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {isIndonesian ? '7. Perubahan Kebijakan' : '7. Policy Changes'}
            </h2>
            <p className="text-gray-600">
              {isIndonesian
                ? 'Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Kami akan memberi tahu Anda tentang perubahan signifikan melalui email atau notifikasi di platform.'
                : 'We may update this privacy policy from time to time. We will notify you of significant changes via email or notification on the platform.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {isIndonesian ? '8. Hubungi Kami' : '8. Contact Us'}
            </h2>
            <p className="text-gray-600">
              {isIndonesian
                ? 'Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami di:'
                : 'If you have questions about this privacy policy, please contact us at:'}
            </p>
            <p className="text-primary-600 font-semibold mt-2">support@propfirmid.com</p>
          </section>
        </div>
      </div>
    </div>
  )
}
