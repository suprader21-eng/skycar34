import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function PlastiquesPage() {
  return (
    <div className="min-h-screen bg-[#02020a]">
      <Navbar />

      {/* HERO */}
      <section className="relative h-[60vh] min-h-[440px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#050503]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_50%,_rgba(201,168,76,0.07)_0%,_transparent_60%)]" />
          {/* Interior panel mockup */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-64 h-44 md:w-80 md:h-56">
              {/* Door panel */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1810] to-[#0a0a08] border border-gold/20 rounded-lg shadow-[inset_0_1px_0_rgba(201,168,76,0.15)]">
                {/* Trim line */}
                <div className="absolute top-8 left-4 right-4 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                {/* Texture stripes */}
                <div className="absolute top-10 left-4 right-4 bottom-10 flex flex-col gap-1.5 opacity-30">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                  ))}
                </div>
                {/* Window button cluster */}
                <div className="absolute bottom-4 left-5 flex gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`rounded w-6 h-4 border ${i === 0 ? 'border-gold/40 bg-gold/10' : 'border-white/10 bg-white/5'}`} />
                  ))}
                </div>
                {/* Door handle */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-10 bg-gradient-to-b from-gold/30 to-gold/10 border border-gold/20 rounded" />
                {/* After treatment glow */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-gold/5 to-transparent" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#02020a] to-transparent" />

        <div className="relative z-10 text-center px-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-gold/50" />
            <span className="text-gold text-xs tracking-[0.5em] uppercase">Service Premium</span>
            <div className="w-8 h-px bg-gold/50" />
          </div>
          <h1 className="font-cinzel text-5xl md:text-6xl font-bold text-white tracking-wider mb-3">
            Plastiques<br /><span className="text-gold">Intérieurs</span>
          </h1>
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-gold/30 bg-gold/5 mt-4">
            <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_6px_#C9A84C] animate-pulse" />
            <span className="text-gold text-xs font-cinzel tracking-widest">OFFRE DE LANCEMENT — 20% DE REMISE</span>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="font-cinzel text-2xl font-bold text-white mb-5 tracking-wide">
                Un intérieur comme neuf, protégé durablement
              </h2>
              <p className="text-[#777] leading-loose mb-4">
                Les plastiques intérieurs se rayent, se ternissent et s&apos;encrassent avec le temps. Notre traitement combine un nettoyage professionnel en profondeur avec une protection nano-céramique et anti-UV longue durée.
              </p>
              <p className="text-[#777] leading-loose">
                Résultat : un aspect satiné premium, une résistance accrue aux salissures et une protection durable contre les rayons UV qui causent le craquèlement.
              </p>
            </div>
            <div className="space-y-3">
              {[
                'Nettoyage profond toutes surfaces',
                'Traitement nano céramique',
                'Protection anti-UV longue durée',
                'Finition satinée premium',
                'Compatible tous types de plastiques',
              ].map((feat) => (
                <div key={feat} className="flex items-center gap-3 p-3 bg-[#07070f] border border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_6px_#C9A84C] flex-shrink-0" />
                  <span className="text-[#888] text-sm">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-gold/20 p-8 text-center relative">
            <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
            <p className="text-[#555] text-xs uppercase tracking-widest mb-2">Tarif</p>
            <div className="flex items-baseline justify-center gap-3 mb-1">
              <span className="font-cinzel text-5xl font-bold text-gold">40€</span>
              <span className="text-[#444] text-lg line-through">50€</span>
            </div>
            <p className="text-green-400 text-xs mb-6">Offre de lancement -20%</p>
            <p className="text-[#555] text-xs mb-8">Nettoyage + Nano céramique + Protection UV</p>
            <Link
              href="/devis?service=4"
              className="inline-block px-12 py-4 bg-gold text-[#02020a] font-cinzel font-bold text-sm tracking-widest hover:bg-gold-light transition-all"
            >
              Demander ce Service →
            </Link>
          </div>
        </div>
      </section>

      <div className="py-8 text-center border-t border-white/5">
        <Link href="/" className="text-[#444] text-xs hover:text-gold transition-colors tracking-widest uppercase">
          ← Retour aux services
        </Link>
      </div>
    </div>
  )
}
