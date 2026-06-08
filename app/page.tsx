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
  'Intégration multimédia': {
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
  'Rénovation phares': {
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
  'Rénovation plastiques intérieurs': {
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
