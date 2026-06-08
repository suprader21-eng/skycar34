import type { Metadata } from 'next'
import { Inter, Cinzel } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel', weight: ['400', '600', '700'] })

export const metadata: Metadata = {
  title: 'Skycar34 — Rénovation Intérieure Haut de Gamme',
  description: 'Spécialiste de la rénovation intérieure automobile. Ciel étoilé, multimédia, phares, plastiques. Devis gratuit.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${cinzel.variable}`}>
      <body className="bg-dark-bg text-[#F5F5F5] font-inter antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
