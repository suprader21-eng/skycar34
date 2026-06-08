import Link from 'next/link'
import Navbar from '@/components/Navbar'
import ServiceCard from '@/components/ServiceCard'
import { prisma } from '@/lib/prisma'

async function getServices() {
  return prisma.service.findMany({ where: { actif: true }, orderBy: { id: 'asc' } })
}

export default async function HomePage() {
  const services = await getServices()

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.08)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,#0a0a0a)]" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-6 font-inter">Hérault · Languedoc</p>
          <h1 className="font-cinzel text-5xl md:text-7xl font-bold text-white leading-tight tracking-wider mb-4">
            SKY<span className="text-gold">CAR</span>34
          </h1>
          <p className="font-cinzel text-lg md:text-2xl text-[#888] tracking-widest mb-2">
            Rénovation Intérieure Haut de Gamme
          </p>
          <div className="w-24 h-px bg-gold mx-auto my-8" />
          <p className="text-[#888] text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10">
            Transformez l&apos;habitacle de votre véhicule en un espace de prestige. Chaque détail compte, chaque finition est pensée pour l&apos;excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/devis"
              className="px-8 py-4 bg-gold text-dark-bg font-cinzel font-semibold text-sm tracking-widest hover:bg-gold-light transition-all duration-300"
            >
              Demander un Devis Gratuit
            </Link>
            <Link
              href="#services"
              className="px-8 py-4 border border-[#333] text-[#888] font-cinzel text-sm tracking-widest hover:border-gold hover:text-gold transition-all duration-300"
            >
              Nos Services
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent mx-auto" />
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">Ce que nous faisons</p>
            <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-white tracking-wider">Nos Services</h2>
            <div className="w-16 h-px bg-gold mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-dark-border">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                nom={service.nom}
                description={service.description}
                prixBase={service.prixBase}
                remise={service.remise}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/devis"
              className="inline-block px-10 py-4 border border-gold text-gold font-cinzel text-sm tracking-widest hover:bg-gold hover:text-dark-bg transition-all duration-300"
            >
              Obtenir Mon Devis Personnalisé
            </Link>
          </div>
        </div>
      </section>

      {/* Pourquoi nous */}
      <section id="pourquoi" className="py-24 px-4 bg-dark-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">Notre engagement</p>
            <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-white tracking-wider">Pourquoi Nous Choisir</h2>
            <div className="w-16 h-px bg-gold mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '◈',
                title: 'Qualité Premium',
                desc: 'Nous utilisons exclusivement des matériaux haut de gamme et des produits professionnels certifiés pour garantir un rendu irréprochable et durable.',
              },
              {
                icon: '◉',
                title: 'Expertise Reconnue',
                desc: 'Des années d\'expérience dans la rénovation intérieure automobile, avec une maîtrise des dernières techniques et technologies du secteur.',
              },
              {
                icon: '◆',
                title: 'Prix Juste & Transparent',
                desc: 'Devis détaillé sans surprise. Nous vous proposons le meilleur rapport qualité-prix avec une totale transparence sur nos tarifs.',
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-8 border border-dark-border hover:border-gold/30 transition-colors">
                <div className="text-gold text-3xl mb-6">{item.icon}</div>
                <h3 className="font-cinzel text-lg font-semibold text-white mb-4 tracking-wide">{item.title}</h3>
                <p className="text-[#888] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="border border-gold/30 p-12 relative">
            <div className="absolute -top-px left-1/2 -translate-x-1/2 w-24 h-px bg-gold" />
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">Passez à l&apos;action</p>
            <h2 className="font-cinzel text-3xl font-bold text-white mb-4 tracking-wider">
              Prêt à Transformer Votre Intérieur ?
            </h2>
            <p className="text-[#888] mb-8 leading-relaxed">
              Remplissez notre formulaire en ligne et recevez un devis personnalisé. Service rapide, réponse sous 24h.
            </p>
            <Link
              href="/devis"
              className="inline-block px-10 py-4 bg-gold text-dark-bg font-cinzel font-semibold text-sm tracking-widest hover:bg-gold-light transition-all duration-300"
            >
              Demander un Devis Gratuit
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-surface border-t border-dark-border py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <span className="font-cinzel text-2xl font-bold text-gold tracking-widest">
                SKYCAR<span className="text-white">34</span>
              </span>
              <p className="text-xs text-[#555] mt-1 tracking-widest uppercase">Rénovation Intérieure Automobile</p>
            </div>
            <div className="flex items-center gap-8">
              <a
                href="https://instagram.com/Skycar34"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#888] hover:text-gold transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                @Skycar34
              </a>
              <a
                href="https://tiktok.com/@Skycar34"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#888] hover:text-gold transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.22 8.22 0 004.84 1.56V6.81a4.85 4.85 0 01-1.07-.12z" />
                </svg>
                @Skycar34
              </a>
              <a
                href="mailto:skycar34@gmail.com"
                className="flex items-center gap-2 text-[#888] hover:text-gold transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                skycar34@gmail.com
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-dark-border text-center">
            <p className="text-xs text-[#444]">© {new Date().getFullYear()} Skycar34 — Tous droits réservés</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
