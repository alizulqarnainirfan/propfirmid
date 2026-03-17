import { Locale } from '@/i18n/translations'

export default function TermsPage({ params }: { params: { locale: Locale } }) {
  const isIndonesian = params.locale === 'id'

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {isIndonesian ? 'Syarat & Ketentuan' : 'Terms & Conditions'}
          </h1>
          <p className="text-gray-600">
            {isIndonesian ? 'Terakhir diperbarui: Maret 2026' : 'Last updated: March 2026'}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {isIndonesian ? '1. Penerimaan Syarat' : '1. Acceptance of Terms'}
            </h2>
            <p className="text-gray-600">
              {isIndonesian
                ? 'Dengan mengakses dan menggunakan PropFirmID, Anda setuju untuk terikat oleh syarat dan ketentuan ini. Jika Anda tidak setuju dengan syarat ini, mohon untuk tidak menggunakan platform kami.'
                : 'By accessing and using PropFirmID, you agree to be bound by these terms and conditions. If you do not agree to these terms, please do not use our platform.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {isIndonesian ? '2. Penggunaan Platform' : '2. Platform Usage'}
            </h2>
            <p className="text-gray-600 mb-3">
              {isIndonesian ? 'Anda setuju untuk:' : 'You agree to:'}
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>{isIndonesian ? 'Memberikan informasi yang akurat dan terkini' : 'Provide accurate and current information'}</li>
              <li>{isIndonesian ? 'Menjaga kerahasiaan akun dan password Anda' : 'Maintain the confidentiality of your account and password'}</li>
              <li>{isIndonesian ? 'Tidak menggunakan platform untuk tujuan ilegal' : 'Not use the platform for illegal purposes'}</li>
              <li>{isIndonesian ? 'Tidak mengirim spam atau konten yang menyesatkan' : 'Not send spam or misleading content'}</li>
              <li>{isIndonesian ? 'Menghormati hak kekayaan intelektual' : 'Respect intellectual property rights'}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {isIndonesian ? '3. Konten Pengguna' : '3. User Content'}
            </h2>
            <p className="text-gray-600 mb-3">
              {isIndonesian
                ? 'Dengan memposting konten di platform kami, Anda:'
                : 'By posting content on our platform, you:'}
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>{isIndonesian ? 'Menjamin bahwa Anda memiliki hak untuk memposting konten tersebut' : 'Warrant that you have the right to post such content'}</li>
              <li>{isIndonesian ? 'Memberikan kami lisensi untuk menggunakan, menampilkan, dan mendistribusikan konten' : 'Grant us a license to use, display, and distribute the content'}</li>
              <li>{isIndonesian ? 'Bertanggung jawab penuh atas konten yang Anda posting' : 'Are fully responsible for the content you post'}</li>
              <li>{isIndonesian ? 'Setuju bahwa kami dapat menghapus konten yang melanggar aturan' : 'Agree that we may remove content that violates the rules'}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {isIndonesian ? '4. Review dan Rating' : '4. Reviews and Ratings'}
            </h2>
            <p className="text-gray-600">
              {isIndonesian
                ? 'Review dan rating yang Anda berikan harus berdasarkan pengalaman pribadi yang jujur. Kami berhak menghapus review yang dianggap palsu, menyesatkan, atau melanggar pedoman kami.'
                : 'Reviews and ratings you provide must be based on honest personal experience. We reserve the right to remove reviews deemed fake, misleading, or violating our guidelines.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {isIndonesian ? '5. Disclaimer' : '5. Disclaimer'}
            </h2>
            <p className="text-gray-600 mb-3">
              {isIndonesian
                ? 'PropFirmID adalah platform informasi dan komunitas. Kami TIDAK:'
                : 'PropFirmID is an information and community platform. We DO NOT:'}
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>{isIndonesian ? 'Memberikan nasihat keuangan atau investasi' : 'Provide financial or investment advice'}</li>
              <li>{isIndonesian ? 'Menjamin keakuratan informasi dari pihak ketiga' : 'Guarantee the accuracy of third-party information'}</li>
              <li>{isIndonesian ? 'Bertanggung jawab atas kerugian trading Anda' : 'Take responsibility for your trading losses'}</li>
              <li>{isIndonesian ? 'Berafiliasi dengan prop firm yang ditampilkan' : 'Affiliate with the displayed prop firms'}</li>
            </ul>
            <p className="text-gray-600 mt-3 font-semibold">
              {isIndonesian
                ? 'Selalu lakukan riset sendiri sebelum membuat keputusan investasi.'
                : 'Always do your own research before making investment decisions.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {isIndonesian ? '6. Batasan Tanggung Jawab' : '6. Limitation of Liability'}
            </h2>
            <p className="text-gray-600">
              {isIndonesian
                ? 'PropFirmID tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan platform kami atau ketidakmampuan untuk menggunakannya.'
                : 'PropFirmID is not liable for any direct, indirect, incidental, or consequential damages arising from the use of our platform or inability to use it.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {isIndonesian ? '7. Penangguhan dan Penghentian' : '7. Suspension and Termination'}
            </h2>
            <p className="text-gray-600">
              {isIndonesian
                ? 'Kami berhak untuk menangguhkan atau menghentikan akses Anda ke platform jika Anda melanggar syarat dan ketentuan ini atau terlibat dalam aktivitas yang merugikan platform atau pengguna lain.'
                : 'We reserve the right to suspend or terminate your access to the platform if you violate these terms and conditions or engage in activities harmful to the platform or other users.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {isIndonesian ? '8. Perubahan Syarat' : '8. Changes to Terms'}
            </h2>
            <p className="text-gray-600">
              {isIndonesian
                ? 'Kami dapat mengubah syarat dan ketentuan ini kapan saja. Perubahan akan berlaku segera setelah diposting di platform. Penggunaan berkelanjutan Anda setelah perubahan berarti Anda menerima syarat yang diperbarui.'
                : 'We may change these terms and conditions at any time. Changes will be effective immediately upon posting on the platform. Your continued use after changes means you accept the updated terms.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {isIndonesian ? '9. Hukum yang Berlaku' : '9. Governing Law'}
            </h2>
            <p className="text-gray-600">
              {isIndonesian
                ? 'Syarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia.'
                : 'These terms and conditions are governed by and construed in accordance with the laws of the Republic of Indonesia.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {isIndonesian ? '10. Hubungi Kami' : '10. Contact Us'}
            </h2>
            <p className="text-gray-600">
              {isIndonesian
                ? 'Jika Anda memiliki pertanyaan tentang syarat dan ketentuan ini, silakan hubungi kami di:'
                : 'If you have questions about these terms and conditions, please contact us at:'}
            </p>
            <p className="text-primary-600 font-semibold mt-2">support@propfirmid.com</p>
          </section>
        </div>
      </div>
    </div>
  )
}
