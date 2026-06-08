import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function PlastiquesPage() {
  return (
    <div className="min-h-screen bg-[#02020a]">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[560px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[#050503]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,_rgba(201,168,76,0.07)_0%,_transparent_55%)]" />
        </div>
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#02020a] to-transparent" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Texte */}
          <div className="flex-1 text-left">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-gold/60" />
              <span className="text-gold text-[10px] tracking-[0.5em] uppercase">Service Premium</span>
            </div>
            <h1 className="font-cinzel text-5xl md:text-6xl font-bold tracking-wider mb-6">
              <span className="text-white">Plastiques</span><br />
              <span className="text-gold drop-shadow-[0_0_25px_rgba(201,168,76,0.4)]">Intérieurs</span>
            </h1>
            <p className="text-[#555] text-sm leading-relaxed mb-8 max-w-sm">
              Nano céramique longue durée · Protection anti-UV · Finition satinée showroom
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-gold/25 bg-gold/5 rounded-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_6px_#C9A84C] animate-pulse" />
              <span className="text-gold text-[10px] font-cinzel tracking-[0.3em] uppercase">Offre de lancement — 20% de remise</span>
            </div>
          </div>

          {/* Visuel panneau de porte */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-72 h-52 md:w-80 md:h-60">
              <div className="absolute inset-0 rounded-2xl border border-gold/15 overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1c1a12 0%, #0f0e0a 50%, #0a0a08 100%)', boxShadow: '0 0 80px rgba(201,168,76,0.06)' }}>
                <div className="absolute top-10 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
                <div className="absolute top-12 left-6 right-6 bottom-10 rounded opacity-20"
                  style={{ background: 'repeating-linear-gradient(135deg, #2a2820 0px, #2a2820 1px, transparent 1px, transparent 6px), repeating-linear-gradient(45deg, #2a2820 0px, #2a2820 1px, transparent 1px, transparent 6px)' }} />
                <div className="absolute bottom-10 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
                <div className="absolute bottom-4 left-6 flex gap-2">
                  {[0,1,2,3].map((i) => (
                    <div key={i} className={`rounded w-8 h-5 border flex items-center justify-center ${i===0 ? 'border-gold/30 bg-gold/10' : 'border-white/5'}`}>
                      <div className="w-3 h-2 rounded-sm border border-current opacity-40" />
                    </div>
                  ))}
                </div>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 w-2.5 h-14 rounded-full border border-gold/25 bg-gradient-to-b from-gold/15 to-gold/5 shadow-[0_0_15px_rgba(201,168,76,0.1)]" />
                <div className="absolute top-4 right-5 w-6 h-6 rounded-full border border-gold/15 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-gold/30" />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/3 via-transparent to-blue-500/3 pointer-events-none" />
              </div>
              <div className="absolute -bottom-3 left-8 right-8 h-4 bg-gold/5 blur-xl rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* CONTENU */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="font-cinzel text-2xl font-bold text-white mb-5 tracking-wide leading-snug">
                Un intérieur comme neuf, protégé durablement
              </h2>
              <p className="text-[#666] leading-loose mb-4 text-sm">
                Les plastiques intérieurs se ternissent, se rayent et perdent leur éclat avec le temps. Notre traitement combine un dégraissage professionnel, un polissage soigné et une protection nano-céramique longue durée.
              </p>
              <p className="text-[#666] leading-loose text-sm">
                Résultat : un aspect satiné premium, une résistance accrue aux salissures, et une protection anti-UV qui prévient le craquèlement.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { icon: '◈', label: 'Dégraissage & nettoyage professionnel' },
                { icon: '◉', label: 'Traitement nano céramique certifié' },
                { icon: '◆', label: 'Protection anti-UV longue durée' },
                { icon: '◇', label: 'Finition satinée effet showroom' },
                { icon: '●', label: 'Planche de bord, portières, console' },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-3 p-3.5 bg-[#07070f] border border-white/5 rounded">
                  <span className="text-gold text-xs">{f.icon}</span>
                  <span className="text-[#888] text-sm">{f.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* PRIX */}
          <div className="relative border border-gold/20 bg-[#07070f] p-10 text-center rounded overflow-hidden">
            <div className="absolute -top-px left-16 right-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
            <div className="absolute -bottom-px left-16 right-16 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            <p className="text-[#444] text-xs uppercase tracking-[0.3em] mb-3">Tarif tout inclus</p>
            <div className="flex items-baseline justify-center gap-4 mb-1">
              <span className="font-cinzel text-6xl font-bold text-gold">80€</span>
              <span className="text-[#333] text-2xl line-through font-cinzel">100€</span>
            </div>
            <p className="text-green-400 text-xs mb-1">Offre de lancement −20%</p>
            <p className="text-[#333] text-xs mb-8">Nettoyage · Nano céramique · Protection UV</p>
            <Link href="/devis?service=4"
              className="group relative inline-block px-12 py-4 bg-gold text-[#02020a] font-cinzel font-bold text-sm tracking-widest overflow-hidden rounded-sm">
              <span className="relative z-10">Demander ce Service</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
            </Link>
          </div>
        </div>
      </section>

      <div className="py-8 text-center border-t border-white/5">
        <Link href="/" className="text-[#333] text-xs hover:text-gold transition-colors tracking-[0.3em] uppercase">
          ← Retour aux services
        </Link>
      </div>
    </div>
  )
}
