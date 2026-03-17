import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PropFirm Forum Indonesia',
  description: 'Platform diskusi dan review prop firm untuk trader Indonesia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  )
}