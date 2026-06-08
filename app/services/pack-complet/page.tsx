import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function PackCompletPage() {
  const inclus = [
    { service: 'Rénovation Phares', prix: 50, remise: 40 },
    { service: 'Plastiques Intérieurs', prix: 50, remise: 40 },
  ]

  return (
    <div className="min-h-screen bg-[#02020a]">
      <Navbar />

      {/* HERO */}
      <section className="relative h-[60vh] min-h-[440px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#030308]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,_rgba(201,168,76,0.08)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,_rgba(100,140,255,0.04)_0%,_transparent_50%)]" />
          {/* Combined visual */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center gap-8">
              {/* Phares */}
              <div className="flex gap-6">
                {[0, 1].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center shadow-[0_0_30px_rgba(201,168,76,0.3)]">
                    <div className="w-6 h-6 rounded-full bg-gold/60 shadow-[0_0_15px_rgba(201,168,76,0.8)]" />
                  </div>
                ))}
              </div>
              {/* Divider */}
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
              {/* Interior */}
              <div className="w-24 h-16 border border-gold/20 bg-gradient-to-br from-[#1a1810] to-[#080808] rounded flex items-center justify-center shadow-[inset_0_1px_0_rgba(201,168,76,0.1)]">
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
              </div>
            </div>
            <div className="flex justify-center mt-4 gap-1">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-gold/40 shadow-[0_0_3px_#C9A84C]" />
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#02020a] to-transparent" />

        <div className="relative z-10 text-center px-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-gold/50" />
            <span className="text-gold text-xs tracking-[0.5em] uppercase">Meilleure Valeur</span>
            <div className="w-8 h-px bg-gold/50" />
          </div>
          <h1 className="font-cinzel text-5xl md:text-6xl font-bold text-white tracking-wider mb-3">
            Pack Complet<br /><span className="text-gold">Intérieur</span>
          </h1>
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-gold/30 bg-gold/5 mt-4">
            <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_6px_#C9A84C] animate-pulse" />
            <span className="text-gold text-xs font-cinzel tracking-widest">OFFRE DE LANCEMENT — 20% DE REMISE</span>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-12">
            <p className="text-[#777] max-w-xl mx-auto leading-loose">
              Le Pack Complet regroupe nos deux services les plus populaires à un tarif avantageux. Phares rénovés et plastiques traités : votre intérieur retrouve son éclat d&apos;origine en une seule intervention.
            </p>
          </div>

          {/* Inclus */}
          <div className="mb-12">
            <h2 className="font-cinzel text-xl font-bold text-white mb-6 tracking-wide text-center">Ce qui est inclus</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {inclus.map((item) => (
                <div key={item.service} className="p-6 bg-[#07070f] border border-white/5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_6px_#C9A84C] mt-1.5" />
                    <div className="flex-1 ml-3">
                      <p className="font-cinzel text-white font-semibold">{item.service}</p>
                      <p className="text-[#555] text-xs mt-0.5">Valeur : {item.remise}€ <span className="line-through">{item.prix}€</span></p>
                    </div>
                    <span className="text-gold font-cinzel font-bold">{item.remise}€</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 p-4 border-t border-dashed border-white/10 flex justify-between items-center">
              <span className="text-[#555] text-sm">Valeur totale des services séparément</span>
              <span className="text-[#555] text-sm line-through">100€</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="border border-gold/30 bg-gold/5 p-8 text-center relative">
            <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-[#02020a] text-xs font-cinzel font-bold tracking-wider">
              PACK ÉCONOMIQUE
            </div>
            <p className="text-[#555] text-xs uppercase tracking-widest mb-2 mt-2">Prix du pack</p>
            <div className="flex items-baseline justify-center gap-3 mb-1">
              <span className="font-cinzel text-6xl font-bold text-gold">96€</span>
              <span className="text-[#444] text-xl line-through">120€</span>
            </div>
            <p className="text-green-400 text-sm mb-2">Offre de lancement -20%</p>
            <p className="text-[#444] text-xs mb-8">Économisez par rapport aux services séparément</p>
            <Link
              href="/devis?service=5"
              className="inline-block px-12 py-4 bg-gold text-[#02020a] font-cinzel font-bold text-sm tracking-widest hover:bg-gold-light transition-all"
            >
              Commander ce Pack →
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
