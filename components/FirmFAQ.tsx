'use client'
import { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { Locale } from '@/i18n/translations'

interface FAQItem {
  question: string
  answer: string
}

interface FirmFAQProps {
  firmName: string
  firm: any
  locale: Locale
}

export default function FirmFAQ({ firmName, firm, locale }: FirmFAQProps) {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  // Generate dynamic FAQs based on firm data
  const generateFAQs = (): FAQItem[] => {
    const faqs: FAQItem[] = []

    // Basic firm questions
    faqs.push({
      question: locale === 'id' 
        ? `Apa itu ${firmName} dan bagaimana cara kerjanya?`
        : `What is ${firmName} and how does it work?`,
      answer: locale === 'id'
        ? `${firmName} adalah prop trading firm yang menyediakan akun trading bermodal untuk trader yang telah lulus evaluasi. Trader dapat menggunakan modal dari ${firmName} untuk trading dan mendapatkan bagi hasil dari profit yang dihasilkan. Sistem ini memungkinkan trader untuk trading dengan modal yang lebih besar tanpa risiko kehilangan uang pribadi.`
        : `${firmName} is a prop trading firm that provides funded trading accounts to traders who pass their evaluation process. Traders can use ${firmName}'s capital to trade and receive a profit share from the profits generated. This system allows traders to trade with larger capital without the risk of losing personal money.`
    })

    // Challenge-related questions
    faqs.push({
      question: locale === 'id'
        ? `Berapa biaya untuk mengikuti challenge ${firmName}?`
        : `How much does it cost to take the ${firmName} challenge?`,
      answer: locale === 'id'
        ? `Biaya challenge ${firmName} bervariasi tergantung ukuran akun yang dipilih. Harga dimulai dari $${firm.discounted || '99'} untuk akun terkecil hingga beberapa ratus dollar untuk akun yang lebih besar. ${firmName} sering menawarkan diskon dan promosi khusus untuk mengurangi biaya entry.`
        : `The ${firmName} challenge cost varies depending on the account size you choose. Prices start from $${firm.discounted || '99'} for the smallest account up to several hundred dollars for larger accounts. ${firmName} often offers discounts and special promotions to reduce entry costs.`
    })

    // Profit split questions
    faqs.push({
      question: locale === 'id'
        ? `Berapa bagi hasil yang ditawarkan ${firmName}?`
        : `What profit split does ${firmName} offer?`,
      answer: locale === 'id'
        ? `${firmName} menawarkan bagi hasil yang kompetitif untuk trader. Biasanya trader mendapatkan 70-80% dari profit yang dihasilkan, sementara ${firmName} mengambil 20-30%. Persentase ini dapat meningkat seiring dengan performa trading yang konsisten dan dapat bervariasi berdasarkan jenis akun dan program yang dipilih.`
        : `${firmName} offers competitive profit splits for traders. Typically traders receive 70-80% of the profits generated, while ${firmName} takes 20-30%. This percentage can increase with consistent trading performance and may vary based on the account type and program chosen.`
    })

    // Payout questions
    faqs.push({
      question: locale === 'id'
        ? `Seberapa cepat ${firmName} memproses pembayaran?`
        : `How fast does ${firmName} process payouts?`,
      answer: locale === 'id'
        ? `${firmName} biasanya memproses pembayaran dalam 1-5 hari kerja setelah permintaan withdrawal diajukan. Waktu pemrosesan dapat bervariasi tergantung metode pembayaran yang dipilih dan verifikasi yang diperlukan. Pembayaran melalui cryptocurrency biasanya lebih cepat dibandingkan transfer bank tradisional.`
        : `${firmName} typically processes payouts within 1-5 business days after a withdrawal request is submitted. Processing time may vary depending on the chosen payment method and required verification. Cryptocurrency payments are usually faster than traditional bank transfers.`
    })

    // Trading rules questions
    faqs.push({
      question: locale === 'id'
        ? `Apa saja aturan trading utama di ${firmName}?`
        : `What are the main trading rules at ${firmName}?`,
      answer: locale === 'id'
        ? `Aturan trading utama ${firmName} meliputi: batas drawdown maksimal (biasanya 8-10%), target profit yang harus dicapai, larangan news trading dalam jangka waktu tertentu, dan pembatasan pada strategi trading tertentu seperti scalping atau hedging. Trader juga harus mematuhi aturan konsistensi dan tidak boleh melanggar batas risiko harian.`
        : `Main trading rules at ${firmName} include: maximum drawdown limits (typically 8-10%), profit targets that must be achieved, news trading restrictions during certain periods, and limitations on certain trading strategies like scalping or hedging. Traders must also follow consistency rules and not violate daily risk limits.`
    })

    // Platform questions
    faqs.push({
      question: locale === 'id'
        ? `Platform trading apa yang didukung ${firmName}?`
        : `What trading platforms does ${firmName} support?`,
      answer: locale === 'id'
        ? `${firmName} mendukung platform trading populer seperti ${firm.platforms || 'MetaTrader 4, MetaTrader 5, dan cTrader'}. Platform ini menyediakan akses ke berbagai instrumen trading termasuk forex, indeks, komoditas, dan cryptocurrency. Semua platform dilengkapi dengan tools analisis teknikal yang lengkap dan eksekusi order yang cepat.`
        : `${firmName} supports popular trading platforms including ${firm.platforms || 'MetaTrader 4, MetaTrader 5, and cTrader'}. These platforms provide access to various trading instruments including forex, indices, commodities, and cryptocurrencies. All platforms come with comprehensive technical analysis tools and fast order execution.`
    })

    // Scaling questions
    faqs.push({
      question: locale === 'id'
        ? `Apakah ${firmName} menawarkan program scaling akun?`
        : `Does ${firmName} offer account scaling programs?`,
      answer: locale === 'id'
        ? `Ya, ${firmName} menawarkan program scaling yang memungkinkan trader untuk meningkatkan ukuran akun mereka berdasarkan performa trading yang konsisten. Setelah mencapai target tertentu dan menunjukkan kemampuan manajemen risiko yang baik, trader dapat mengajukan untuk upgrade ke akun dengan modal yang lebih besar.`
        : `Yes, ${firmName} offers scaling programs that allow traders to increase their account size based on consistent trading performance. After reaching certain targets and demonstrating good risk management skills, traders can apply for upgrades to accounts with larger capital.`
    })

    // Refund questions
    faqs.push({
      question: locale === 'id'
        ? `Apakah ${firmName} menawarkan refund jika saya lulus challenge?`
        : `Does ${firmName} offer refunds if I pass the challenge?`,
      answer: locale === 'id'
        ? `${firm.refundable ? 'Ya' : 'Kebijakan refund bervariasi'}, ${firmName} ${firm.refundable ? 'menawarkan refund penuh' : 'memiliki kebijakan refund tertentu'} untuk trader yang berhasil lulus challenge dan mendapatkan akun funded. Refund biasanya diberikan bersama dengan pembayaran profit pertama atau setelah mencapai milestone tertentu dalam trading.`
        : `${firm.refundable ? 'Yes' : 'Refund policies vary'}, ${firmName} ${firm.refundable ? 'offers full refunds' : 'has specific refund policies'} for traders who successfully pass the challenge and receive a funded account. Refunds are typically provided along with the first profit payment or after reaching certain trading milestones.`
    })

    // EA/Bot questions
    faqs.push({
      question: locale === 'id'
        ? `Apakah ${firmName} mengizinkan penggunaan Expert Advisor (EA)?`
        : `Does ${firmName} allow the use of Expert Advisors (EAs)?`,
      answer: locale === 'id'
        ? `${firm.eaAllowed ? 'Ya' : 'Kebijakan EA bervariasi'}, ${firmName} ${firm.eaAllowed ? 'mengizinkan' : 'memiliki aturan khusus mengenai'} penggunaan Expert Advisor dan trading otomatis. ${firm.eaAllowed ? 'Trader dapat menggunakan EA dengan bebas selama mematuhi aturan trading lainnya.' : 'Pastikan untuk memeriksa terms and conditions terkait penggunaan EA sebelum memulai challenge.'}`
        : `${firm.eaAllowed ? 'Yes' : 'EA policies vary'}, ${firmName} ${firm.eaAllowed ? 'allows' : 'has specific rules regarding'} the use of Expert Advisors and automated trading. ${firm.eaAllowed ? 'Traders can use EAs freely as long as they comply with other trading rules.' : 'Make sure to check the terms and conditions regarding EA usage before starting the challenge.'}`
    })

    // Support questions
    faqs.push({
      question: locale === 'id'
        ? `Bagaimana cara menghubungi customer support ${firmName}?`
        : `How can I contact ${firmName} customer support?`,
      answer: locale === 'id'
        ? `${firmName} menyediakan berbagai channel untuk customer support termasuk live chat di website, email support, dan media sosial. Tim support biasanya responsif dan dapat membantu dengan pertanyaan tentang challenge, aturan trading, pembayaran, dan masalah teknis. Waktu respons biasanya dalam 24 jam untuk email dan lebih cepat untuk live chat.`
        : `${firmName} provides various channels for customer support including live chat on their website, email support, and social media. The support team is typically responsive and can help with questions about challenges, trading rules, payments, and technical issues. Response time is usually within 24 hours for emails and faster for live chat.`
    })

    return faqs
  }

  const faqs = generateFAQs()

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          {locale === 'id' ? 'Pertanyaan yang Sering Diajukan' : 'Frequently Asked Questions'}
        </h3>
        <p className="text-gray-600">
          {locale === 'id' 
            ? `Temukan jawaban untuk pertanyaan umum tentang ${firmName}` 
            : `Find answers to common questions about ${firmName}`}
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-800 pr-4">
                {faq.question}
              </span>
              {openItems.includes(index) ? (
                <FaChevronUp className="text-primary-600 flex-shrink-0" />
              ) : (
                <FaChevronDown className="text-primary-600 flex-shrink-0" />
              )}
            </button>
            
            {openItems.includes(index) && (
              <div className="px-6 pb-4">
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-800 text-sm">
          <strong>
            {locale === 'id' ? 'Masih ada pertanyaan?' : 'Still have questions?'}
          </strong>{' '}
          {locale === 'id' 
            ? `Hubungi customer support ${firmName} atau bergabung dengan komunitas trader kami untuk mendapatkan bantuan lebih lanjut.`
            : `Contact ${firmName} customer support or join our trader community for additional help.`}
        </p>
      </div>
    </div>
  )
}