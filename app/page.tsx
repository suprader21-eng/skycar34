import Link from 'next/link'
import Navbar from '@/components/Navbar'
import StarField from '@/components/StarField'
import { prisma } from '@/lib/prisma'

async function getServices() {
  return prisma.service.findMany({ where: { actif: true }, orderBy: { id: 'asc' } })
}

const servicePages: Record<string, { href: string; visual: React.ReactNode; tagline: string }> = {
  'Ciel étoilé': {
    href: '/services/ciel-etoile',
    tagline: 'De 200 à 1000 étoiles LED',
    visual: (
      <div className="relative w-full h-full bg-[#02020f] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.15)_0%,_transparent_65%)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(80)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.8 + 0.2,
                boxShadow: `0 0 ${Math.random() * 4 + 2}px rgba(255,255,255,0.8)`,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-gold/30 border border-gold/50 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-gold shadow-[0_0_12px_#C9A84C]" />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  'Intégration multimédia': {
    href: '/services/multimedia',
    tagline: 'Écran HD • iOS & Android',
    visual: (
      <div className="relative w-full h-full bg-[#050810] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,_rgba(100,150,255,0.1)_0%,_transparent_60%)]" />
        <div className="border-2 border-[#C9A84C]/40 rounded-lg w-36 h-24 relative flex items-center justify-center shadow-[0_0_30px_rgba(201,168,76,0.15)]">
          <div className="absolute inset-1 rounded bg-[#0a1020] flex items-center justify-center">
            <div className="grid grid-cols-3 gap-1">
              {[...Array(9)].map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-sm ${i === 4 ? 'bg-gold/60' : 'bg-white/10'}`} />
              ))}
            </div>
          </div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-2 bg-[#C9A84C]/30 border-t-0 border border-[#C9A84C]/20 rounded-b" />
        </div>
      </div>
    ),
  },
  'Rénovation phares': {
    href: '/services/phares',
    tagline: 'Nano UV 9H • Cristallin',
    visual: (
      <div className="relative w-full h-full bg-[#04040a] flex items-center justify-center overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1">
          <div className="absolute w-40 h-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(201,168,76,0.5)_0%,_rgba(201,168,76,0.1)_30%,_transparent_70%)]" />
          <div className="absolute -translate-x-1/2 -translate-y-1/2 w-72 h-20 origin-left bg-[linear-gradient(to_right,_rgba(201,168,76,0.15),_transparent)] -rotate-12 blur-sm" />
          <div className="absolute -translate-x-1/2 -translate-y-1/2 w-72 h-20 origin-left bg-[linear-gradient(to_right,_rgba(201,168,76,0.1),_transparent)] rotate-12 blur-sm" />
        </div>
        <div className="relative w-10 h-10 rounded-full border border-gold/50 bg-gold/10 shadow-[0_0_30px_rgba(201,168,76,0.6),inset_0_0_15px_rgba(201,168,76,0.2)]" />
      </div>
    ),
  },
  'Rénovation plastiques intérieurs': {
    href: '/services/plastiques',
    tagline: 'Nano céramique • Protection UV',
    visual: (
      <div className="relative w-full h-full bg-[#050505] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)]" />
        <div className="relative w-28 h-20 border border-gold/20 rounded bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] flex flex-col items-center justify-center gap-2 shadow-[inset_0_1px_0_rgba(201,168,76,0.1)]">
          <div className="w-20 h-1 rounded-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          <div className="w-16 h-1 rounded-full bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
          <div className="w-20 h-1 rounded-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          <div className="absolute top-1 right-2 w-5 h-5 rounded-full border border-gold/30 bg-gold/5" />
        </div>
      </div>
    ),
  },
  'Pack complet intérieur': {
    href: '/services/pack-complet',
    tagline: 'Plastiques + Phares • Tout inclus',
    visual: (
      <div className="relative w-full h-full bg-[#02020a] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,_rgba(201,168,76,0.08)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,_rgba(100,150,255,0.05)_0%,_transparent_50%)]" />
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-gold/40 bg-gold/10 shadow-[0_0_20px_rgba(201,168,76,0.4)]" />
          <div className="w-12 h-8 border border-gold/30 rounded bg-[#0a0a15] flex items-center justify-center">
            <div className="w-6 h-4 border border-gold/20 rounded bg-gold/5" />
          </div>
          <div className="w-8 h-8 rounded-full border border-gold/40 bg-gold/10 shadow-[0_0_20px_rgba(201,168,76,0.4)]" />
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-gold/60 shadow-[0_0_4px_#C9A84C]" />
          ))}
        </div>
      </div>
    ),
  },
}

export default async function HomePage() {
  const services = await getServices()

  return (
    <div className="min-h-screen bg-[#02020a]">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <StarField count={400} className="z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.06)_0%,_transparent_60%)] z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#02020a] to-transparent z-10" />

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold" />
            <span className="text-gold text-xs tracking-[0.5em] uppercase font-inter">Rénovation Intérieure</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold" />
          </div>

          <h1 className="font-cinzel text-6xl md:text-8xl font-bold tracking-widest mb-4">
            <span className="text-white">SKY</span>
            <span className="text-gold drop-shadow-[0_0_30px_rgba(201,168,76,0.5)]">CAR</span>
            <span className="text-white">34</span>
          </h1>

          <p className="font-cinzel text-base md:text-xl text-[#888] tracking-[0.3em] mb-2 uppercase">
            L&apos;Univers à bord de votre véhicule
          </p>

          <div className="flex items-center justify-center gap-4 my-8">
            <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_#C9A84C]" />
            <div className="w-1 h-1 rounded-full bg-gold/50" />
            <div className="w-32 h-px bg-gradient-to-r from-gold/80 via-gold/30 to-transparent" />
            <div className="w-1 h-1 rounded-full bg-gold/50" />
            <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_#C9A84C]" />
          </div>

          <p className="text-[#777] text-sm md:text-base max-w-lg mx-auto leading-loose mb-10">
            Ciel étoilé LED sur mesure, intégration multimédia, rénovation phares et plastiques. Chaque intervention est une signature de prestige.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/devis"
              className="group relative px-10 py-4 bg-gold text-[#02020a] font-cinzel font-bold text-sm tracking-widest overflow-hidden"
            >
              <span className="relative z-10">Devis Gratuit</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
            </Link>
            <Link
              href="#services"
              className="px-10 py-4 border border-gold/30 text-gold/80 font-cinzel text-sm tracking-widest hover:border-gold hover:text-gold transition-all duration-300"
            >
              Nos Créations →
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-28 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-gold/50" />
              <span className="text-gold text-xs tracking-[0.4em] uppercase">Nos Créations</span>
              <div className="w-8 h-px bg-gold/50" />
            </div>
            <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-white tracking-wider">
              Services & Tarifs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const meta = Object.entries(servicePages).find(([key]) =>
                service.nom.toLowerCase().includes(key.toLowerCase().slice(0, 6))
              )
              const page = meta ? meta[1] : null
              const prixFinal = service.remise > 0 ? service.prixBase * (1 - service.remise / 100) : service.prixBase

              return (
                <Link
                  key={service.id}
                  href={page?.href ?? '/devis'}
                  className="group block bg-[#07070f] border border-white/5 hover:border-gold/40 transition-all duration-500 overflow-hidden"
                >
                  {/* Visual */}
                  <div className="h-44 relative overflow-hidden">
                    {page?.visual ?? (
                      <div className="w-full h-full bg-[#0a0a14]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07070f] via-transparent to-transparent" />
                    {service.remise > 0 && (
                      <div className="absolute top-3 right-3 px-2 py-1 bg-gold text-[#02020a] text-xs font-cinzel font-bold tracking-wider">
                        -{service.remise}%
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-[#555] text-xs tracking-widest uppercase mb-1">{page?.tagline ?? 'Service premium'}</p>
                    <h3 className="font-cinzel text-lg font-semibold text-white mb-3 group-hover:text-gold transition-colors">
                      {service.nom}
                    </h3>
                    <p className="text-[#666] text-sm leading-relaxed mb-4 line-clamp-2">{service.description}</p>
                    <div className="flex items-end justify-between pt-3 border-t border-white/5">
                      <div>
                        {service.remise > 0 ? (
                          <div className="flex items-baseline gap-2">
                            <span className="font-cinzel text-2xl font-bold text-gold">{prixFinal.toFixed(0)}€</span>
                            <span className="text-sm text-[#444] line-through">{service.prixBase}€</span>
                          </div>
                        ) : (
                          <span className="font-cinzel text-2xl font-bold text-gold">{service.prixBase}€</span>
                        )}
                        <p className="text-xs text-[#444] mt-0.5">À partir de</p>
                      </div>
                      <span className="text-gold/50 text-xs tracking-widest group-hover:text-gold transition-colors">
                        Voir →
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* POURQUOI */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,168,76,0.04)_0%,_transparent_60%)]" />
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-gold/50" />
              <span className="text-gold text-xs tracking-[0.4em] uppercase">Notre Engagement</span>
              <div className="w-8 h-px bg-gold/50" />
            </div>
            <h2 className="font-cinzel text-4xl font-bold text-white tracking-wider">Pourquoi Skycar34 ?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {[
              {
                n: '01',
                title: 'Qualité Premium',
                desc: 'Composants LED professionnels, produits nano-céramiques certifiés. Chaque installation est garantie dans le temps.',
              },
              {
                n: '02',
                title: 'Expertise & Précision',
                desc: 'Des centaines d\'installations réalisées. Chaque étoile, chaque câble, placés avec une rigueur d\'orfèvre.',
              },
              {
                n: '03',
                title: 'Prix Justes',
                desc: 'Tarification transparente, devis détaillé sans surprise. Offres de lancement disponibles sur tous nos services.',
              },
            ].map((item) => (
              <div key={item.n} className="bg-[#07070f] p-8 text-center hover:bg-[#0a0a14] transition-colors">
                <p className="font-cinzel text-4xl font-bold text-gold/20 mb-4">{item.n}</p>
                <h3 className="font-cinzel text-base font-semibold text-white mb-3 tracking-wide">{item.title}</h3>
                <p className="text-[#666] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative border border-gold/20 p-12">
            <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
            <div className="absolute -bottom-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
            <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_#C9A84C] mx-auto mb-6" />
            <h2 className="font-cinzel text-3xl font-bold text-white mb-4 tracking-wider">
              Transformez votre Intérieur
            </h2>
            <p className="text-[#666] mb-8 text-sm leading-loose">
              Réponse sous 24h · Devis gratuit · Sans engagement
            </p>
            <Link
              href="/devis"
              className="group relative inline-block px-12 py-4 bg-gold text-[#02020a] font-cinzel font-bold text-sm tracking-widest overflow-hidden"
            >
              <span className="relative z-10">Demander un Devis</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-cinzel text-xl font-bold tracking-widest">
              <span className="text-gold">SKY</span><span className="text-white">CAR</span><span className="text-gold">34</span>
            </span>
            <p className="text-xs text-[#333] mt-1 tracking-widest uppercase">Rénovation Intérieure Automobile</p>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://instagram.com/Skycar34" target="_blank" rel="noopener noreferrer" className="text-[#444] hover:text-gold transition-colors text-sm">Instagram</a>
            <a href="https://tiktok.com/@Skycar34" target="_blank" rel="noopener noreferrer" className="text-[#444] hover:text-gold transition-colors text-sm">TikTok</a>
            <a href="mailto:skycar34@gmail.com" className="text-[#444] hover:text-gold transition-colors text-sm">skycar34@gmail.com</a>
          </div>
          <p className="text-xs text-[#222]">© {new Date().getFullYear()} Skycar34</p>
        </div>
      </footer>
    </div>
  )
}
