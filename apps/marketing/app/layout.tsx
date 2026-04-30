import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Burlington Consult',
    template: '%s | Burlington Consult',
  },
  description:
    'Burlington Consult develops and files Einstein Visa (EB-1A) and NIW (EB-2) petitions for high-achieving professionals — enabling permanent U.S. residency without an employer sponsor.',
  openGraph: {
    title: 'Burlington Consult',
    description: 'The fastest path to a U.S. green card for exceptional professionals.',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} bg-[#0A141A]`} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col overflow-x-hidden bg-off-white font-sans text-burl-gray-700 antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
