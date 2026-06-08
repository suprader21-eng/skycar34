import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function PharesPage() {
  return (
    <div className="min-h-screen bg-[#02020a]">
      <Navbar />

      {/* HERO */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#040402]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_60%)]" />

          {/* Faisceaux lumineux via dégradés */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {/* Faisceau gauche */}
            <div className="absolute w-96 h-48 -translate-y-1/2 right-12 origin-right rotate-[-8deg]"
              style={{ background: 'linear-gradient(to left, rgba(201,168,76,0.12), transparent)', filter: 'blur(16px)' }} />
            <div className="absolute w-96 h-48 -translate-y-1/2 right-12 origin-right rotate-[8deg]"
              style={{ background: 'linear-gradient(to left, rgba(201,168,76,0.08), transparent)', filter: 'blur(20px)' }} />
            {/* Faisceau droit */}
            <div className="absolute w-96 h-48 -translate-y-1/2 left-12 origin-left rotate-[8deg]"
              style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.12), transparent)', filter: 'blur(16px)' }} />
            <div className="absolute w-96 h-48 -translate-y-1/2 left-12 origin-left rotate-[-8deg]"
              style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.08), transparent)', filter: 'blur(20px)' }} />
          </div>

          {/* Halos des phares */}
          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex gap-40">
            {[0, 1].map((i) => (
              <div key={i} className="relative flex items-center justify-center">
                <div className="absolute w-32 h-32 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 70%)' }} />
                <div className="w-16 h-16 rounded-full border border-[rgba(201,168,76,0.2)] flex items-center justify-center"
                  style={{ boxShadow: '0 0 40px rgba(201,168,76,0.15)' }}>
                  <div className="w-10 h-10 rounded-full border border-[rgba(201,168,76,0.4)] flex items-center justify-center"
                    style={{ background: 'rgba(201,168,76,0.05)' }}>
                    <div className="w-4 h-4 rounded-full"
                      style={{ background: '#C9A84C', boxShadow: '0 0 20px #C9A84C, 0 0 40px rgba(201,168,76,0.6), 0 0 80px rgba(201,168,76,0.3)' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-80 h-px"
            style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.2), transparent)' }} />
        </div>
        <div className="absolute bottom-0 inset-x-0 h-56 bg-gradient-to-t from-[#02020a] to-transparent" />

        <div className="relative z-10 text-center px-4">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-gold/60" />
            <span className="text-gold text-[10px] tracking-[0.5em] uppercase">Service Premium</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-gold/60" />
          </div>
          <h1 className="font-cinzel text-5xl md:text-6xl font-bold tracking-wider">
            <span className="text-white">Rénovation</span><br />
            <span className="text-gold drop-shadow-[0_0_25px_rgba(201,168,76,0.5)]">Phares</span>
          </h1>
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-gold/25 bg-gold/5 mt-6 rounded-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_6px_#C9A84C] animate-pulse" />
            <span className="text-gold text-[10px] font-cinzel tracking-[0.3em] uppercase">Offre de lancement — 20% de remise</span>
          </div>
        </div>
      </section>

      {/* CONTENU */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="font-cinzel text-2xl font-bold text-white mb-5 tracking-wide leading-snug">
                Clarté cristalline, protection longue durée
              </h2>
              <p className="text-[#666] leading-loose mb-4 text-sm">
                Avec le temps, les optiques jaunissent et se rayent, réduisant jusqu&apos;à 70% de la luminosité. Notre traitement restaure une transparence d&apos;origine et la scelle sous un nano-revêtement UV 9H.
              </p>
              <p className="text-[#666] leading-loose text-sm">
                Résistance maximale aux rayures, aux UV et aux intempéries. Le résultat tient plusieurs années.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { icon: '◈', label: 'Polissage multi-étapes professionnel' },
                { icon: '◉', label: 'Nano-revêtement céramique UV 9H' },
                { icon: '◆', label: 'Option teinté fumé (+40€)' },
                { icon: '◇', label: 'Résultat durable plusieurs années' },
                { icon: '●', label: 'Améliore visibilité & sécurité nocturne' },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-3 p-3.5 bg-[#07070f] border border-white/5 rounded">
                  <span className="text-gold text-xs">{f.icon}</span>
                  <span className="text-[#888] text-sm">{f.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* DEUX OFFRES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {/* Standard */}
            <div className="relative border border-white/10 bg-[#07070f] p-8 text-center rounded overflow-hidden">
              <p className="text-[#444] text-xs uppercase tracking-[0.3em] mb-3">Standard</p>
              <div className="flex items-baseline justify-center gap-3 mb-1">
                <span className="font-cinzel text-5xl font-bold text-gold">40€</span>
                <span className="text-[#333] text-xl line-through font-cinzel">50€</span>
              </div>
              <p className="text-green-400 text-xs mb-1">−20% offre de lancement</p>
              <p className="text-[#333] text-xs mb-6">Polissage + Nano UV 9H</p>
              <Link href="/devis?service=3"
                className="block px-6 py-3 border border-gold/40 text-gold font-cinzel text-xs tracking-widest hover:bg-gold hover:text-[#02020a] transition-all rounded-sm">
                Choisir
              </Link>
            </div>
            {/* Teinté */}
            <div className="relative border border-gold/30 bg-gold/5 p-8 text-center rounded overflow-hidden">
              <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gold text-[#02020a] text-[10px] font-cinzel font-bold tracking-widest whitespace-nowrap rounded-sm">
                OPTION TEINTÉ
              </div>
              <p className="text-[#444] text-xs uppercase tracking-[0.3em] mb-3 mt-1">Teinté fumé</p>
              <div className="flex items-baseline justify-center gap-3 mb-1">
                <span className="font-cinzel text-5xl font-bold text-gold">80€</span>
                <span className="text-[#333] text-xl line-through font-cinzel">90€</span>
              </div>
              <p className="text-green-400 text-xs mb-1">Standard + teinté inclus</p>
              <p className="text-[#333] text-xs mb-6">Polissage + Nano + Teinté fumé</p>
              <Link href="/devis?service=3"
                className="block px-6 py-3 bg-gold text-[#02020a] font-cinzel text-xs font-bold tracking-widest hover:bg-gold-light transition-all rounded-sm">
                Choisir
              </Link>
            </div>
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
