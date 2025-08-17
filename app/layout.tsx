import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UmrahCheck - Die erste KI-Beratung für deine Umrah',
  description: 'Unsere KI prüft dein Angebot, vergleicht Alternativen und zeigt dir in unter 2 Minuten, wie du Geld sparst und besser reist.',
  keywords: 'Umrah, Makkah, Medina, Hotel, Preisvergleich, Halal, Islamic, Reisen',
  authors: [{ name: 'UmrahCheck' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={inter.className}>{children}</body>
    </html>
  )
}