import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500'],
})

export const metadata: Metadata = {
  title: 'Feliz Día de la Madre | KeoIT',
  description: 'Una experiencia especial para celebrar a las madres, con amor desde KeoIT.',
  openGraph: {
    title: 'Feliz Día de la Madre | KeoIT',
    description: 'Dedícale un mensaje especial a tu mamá.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${inter.variable} h-full`}
    >
      <body
        className="h-full overflow-hidden"
        style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
      >
        {children}
      </body>
    </html>
  )
}
