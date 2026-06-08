import Link from 'next/link'
import Navbar from '@/components/Navbar'
import StarField from '@/components/StarField'
import { prisma } from '@/lib/prisma'

async function getServices() {
  return prisma.service.findMany({ where: { actif: true }, orderBy: { id: 'asc' } })
}

const servicePages: Record<number, { href: string; visual: React.ReactNode; tagline: string }> = {
  1: {
    href: '/services/ciel-etoile',
    tagline: 'De 200 à 1000 étoiles LED',
    visual: (
      <div className="relative w-full h-full bg-[#01010a] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.1)_0%,_transparent_65%)]" />
        {/* Étoiles fixes */}
        {[
          [15,20],[28,65],[42,35],[55,80],[68,15],[80,55],[90,30],[10,75],[35,50],[72,70],
          [50,10],[20,45],[60,90],[85,20],[45,60],[25,85],[70,40],[38,25],[62,75],[18,55],
          [82,65],[48,85],[32,40],[75,25],[55,50],[12,35],[66,10],[40,70],[78,80],[22,15],
        ].map(([top, left], i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{
              top: `${top}%`, left: `${left}%`,
              width: i % 5 === 0 ? '2px' : '1px',
              height: i % 5 === 0 ? '2px' : '1px',
              opacity: 0.4 + (i % 4) * 0.15,
              boxShadow: i % 5 === 0 ? '0 0 4px rgba(255,255,255,0.8)' : 'none',
            }}
          />
        ))}
        {/* LED centrale */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="absolute -inset-6 bg-[radial-gradient(circle,_rgba(201,168,76,0.15)_0%,_transparent_70%)] rounded-full" />
            <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full border border-gold/50 flex items-center justify-center bg-gold/10">
                <div className="w-2.5 h-2.5 rounded-full bg-gold shadow-[0_0_10px_#C9A84C,0_0_20px_rgba(201,168,76,0.5)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  2: {
    href: '/services/multimedia',
    tagline: 'Écran HD • CarPlay & Android',
    visual: (
      <div className="relative w-full h-full bg-[#040812] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_55%_40%,_rgba(80,120,255,0.1)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#C9A84C 1px,transparent 1px),linear-gradient(90deg,#C9A84C 1px,transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="relative">
          <div className="w-44 h-28 rounded-xl border border-gold/20 bg-[#040915] shadow-[0_0_40px_rgba(201,168,76,0.06)] overflow-hidden">
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/5">
              <div className="flex gap-1">{[0,1,2].map(i=><div key={i} className="w-1.5 h-1.5 rounded-full bg-white/10"/>)}</div>
              <div className="w-12 h-1 rounded-full bg-white/10" />
            </div>
            <div className="p-2 grid grid-cols-4 gap-1.5">
              {['♪','◎','☎','⌘','◐','◈','▶','⚙'].map((ic,i)=>(
                <div key={i} className={`rounded-lg flex items-center justify-center h-7 text-xs ${i===0?'bg-gold/20 text-gold':'bg-white/5 text-white/30'}`}>{ic}</div>
              ))}
            </div>
          </div>
          <div className="w-10 h-1.5 bg-gold/15 mx-auto rounded-b" />
          <div className="w-16 h-0.5 bg-gold/8 mx-auto rounded-full" />
        </div>
      </div>
    ),
  },
  3: {
    href: '/services/phares',
    tagline: 'Nano UV 9H • Cristallin',
    visual: (
      <div className="relative w-full h-full bg-[#040401] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.06)_0%,_transparent_60%)]" />
        <div className="flex gap-14 items-center">
          {[0,1].map((i) => (
            <div key={i} className="relative flex items-center justify-center">
              <div className="absolute w-20 h-20 rounded-full bg-[radial-gradient(circle,_rgba(201,168,76,0.12)_0%,_transparent_70%)]" />
              <div className="w-11 h-11 rounded-full border border-gold/20 flex items-center justify-center shadow-[0_0_25px_rgba(201,168,76,0.12)]">
                <div className="w-7 h-7 rounded-full border border-gold/35 flex items-center justify-center bg-gold/5">
                  <div className="w-3 h-3 rounded-full bg-gold shadow-[0_0_12px_rgba(201,168,76,0.9),0_0_25px_rgba(201,168,76,0.4)]" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>
    ),
  },
  6: {
    href: '/services/led',
    tagline: 'Footwell • Sièges • Console',
    visual: (
      <div className="relative w-full h-full bg-[#02020a] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.06)_0%,_transparent_60%)]" />
        {/* Habitacle simplifié avec LEDs */}
        <div className="relative w-44 h-28 flex flex-col gap-2">
          {/* Bandeaux footwell */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 rounded-full bg-gradient-to-r from-gold/60 via-gold/80 to-gold/60 shadow-[0_0_8px_rgba(201,168,76,0.6)]" />
          {/* Bandeau console */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-1 rounded-full bg-gold/50 shadow-[0_0_6px_rgba(201,168,76,0.5)]" />
          {/* Contour siège gauche */}
          <div className="absolute left-2 top-3 bottom-4 w-0.5 rounded-full bg-gradient-to-b from-transparent via-gold/50 to-transparent shadow-[0_0_4px_rgba(201,168,76,0.4)]" />
          {/* Contour siège droit */}
          <div className="absolute right-2 top-3 bottom-4 w-0.5 rounded-full bg-gradient-to-b from-transparent via-gold/50 to-transparent shadow-[0_0_4px_rgba(201,168,76,0.4)]" />
          {/* Points lumineux */}
          {[[20,30],[50,15],[80,30],[20,70],[50,80],[80,70]].map(([l,t],i)=>(
            <div key={i} className="absolute w-1 h-1 rounded-full bg-gold shadow-[0_0_6px_#C9A84C]"
              style={{ left:`${l}%`, top:`${t}%` }} />
          ))}
        </div>
      </div>
    ),
  },
  4: {
    href: '/services/plastiques',
    tagline: 'Nano céramique • Protection UV',
    visual: (
      <div className="relative w-full h-full bg-[#060503] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_50%,_rgba(201,168,76,0.06)_0%,_transparent_60%)]" />
        <div className="relative w-36 h-24 rounded-xl border border-gold/15 overflow-hidden shadow-[0_0_30px_rgba(201,168,76,0.05)]"
          style={{ background: 'linear-gradient(135deg,#1c1a12 0%,#0f0e0a 60%,#0a0a08 100%)' }}>
          <div className="absolute top-6 left-4 right-4 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
          <div className="absolute top-7 left-4 right-4 bottom-6 opacity-15"
            style={{ background: 'repeating-linear-gradient(135deg,#3a3520 0,#3a3520 1px,transparent 1px,transparent 5px),repeating-linear-gradient(45deg,#3a3520 0,#3a3520 1px,transparent 1px,transparent 5px)' }} />
          <div className="absolute bottom-6 left-4 right-4 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
          <div className="absolute bottom-3 left-4 flex gap-1.5">
            {[0,1,2,3].map(i=><div key={i} className={`w-6 h-3.5 rounded border ${i===0?'border-gold/25 bg-gold/8':'border-white/5 bg-white/2'}`}/>)}
          </div>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-10 rounded-full border border-gold/20 bg-gradient-to-b from-gold/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-gold/2 to-transparent rounded-xl" />
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
              const page = servicePages[service.id] ?? null
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

      {/* CONTACT */}
      <section id="contact" className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[#030308]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_60%)]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-10 h-px bg-gradient-to-r from-transparent to-gold/50" />
            <span className="text-gold text-[10px] tracking-[0.5em] uppercase">Contact</span>
            <div className="w-10 h-px bg-gradient-to-l from-transparent to-gold/50" />
          </div>
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-white tracking-wider mb-4">
            Contactez-<span className="text-gold">nous</span>
          </h2>
          <p className="text-[#555] text-sm mb-14 tracking-wide">Basé dans l&apos;Hérault · Déplacement possible</p>

          {/* Cartes contact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
            {/* Téléphone */}
            <a href="tel:0749498034"
              className="group flex flex-col items-center gap-4 p-8 transition-all">
              <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center group-hover:border-gold/40 transition-colors"
                style={{ background: 'rgba(201,168,76,0.05)' }}>
                <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-[#444] text-[10px] uppercase tracking-[0.3em] mb-1">Téléphone</p>
                <p className="font-cinzel text-white text-lg tracking-wider group-hover:text-gold transition-colors">07 49 49 80 34</p>
              </div>
            </a>

            {/* Instagram */}
            <a href="https://instagram.com/skycar_34" target="_blank" rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 p-8 transition-all">
              <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center group-hover:border-gold/40 transition-colors"
                style={{ background: 'rgba(201,168,76,0.05)' }}>
                <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div>
                <p className="text-[#444] text-[10px] uppercase tracking-[0.3em] mb-1">Instagram</p>
                <p className="font-cinzel text-white text-lg tracking-wider group-hover:text-gold transition-colors">@skycar_34</p>
              </div>
            </a>

            {/* TikTok */}
            <a href="https://tiktok.com/@skycar34" target="_blank" rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 p-8 transition-all">
              <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center group-hover:border-gold/40 transition-colors"
                style={{ background: 'rgba(201,168,76,0.05)' }}>
                <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.56V6.79a4.85 4.85 0 01-1.07-.1z"/>
                </svg>
              </div>
              <div>
                <p className="text-[#444] text-[10px] uppercase tracking-[0.3em] mb-1">TikTok</p>
                <p className="font-cinzel text-white text-lg tracking-wider group-hover:text-gold transition-colors">@skycar34</p>
              </div>
            </a>
          </div>

          {/* CTA Devis */}
          <div className="pt-4">
            <p className="text-[#555] text-xs uppercase tracking-[0.4em] mb-3">Prêt à transformer votre intérieur ?</p>
            <h3 className="font-cinzel text-2xl text-white mb-6">Demandez votre devis gratuit</h3>
            <Link href="/devis"
              className="group relative inline-block px-12 py-4 bg-gold text-[#02020a] font-cinzel font-bold text-sm tracking-widest overflow-hidden rounded-sm">
              <span className="relative z-10">Devis Gratuit</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-cinzel text-lg font-bold tracking-widest">
            <span className="text-gold">SKY</span><span className="text-white">CAR</span><span className="text-gold">34</span>
          </span>
          <p className="text-xs text-[#222]">© {new Date().getFullYear()} Skycar34 · Hérault</p>
        </div>
      </footer>
    </div>
  )
}
