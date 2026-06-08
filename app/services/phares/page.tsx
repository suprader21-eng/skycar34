import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function PharesPage() {
  return (
    <div className="min-h-screen bg-[#02020a]">
      <Navbar />

      {/* HERO */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#040402]">
          {/* Deux faisceaux lumineux */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0">
            {/* Faisceau gauche */}
            <div className="absolute" style={{
              left: '-160px', top: '-8px',
              width: '0', height: '0',
              borderTop: '80px solid transparent',
              borderBottom: '80px solid transparent',
              borderRight: '380px solid rgba(201,168,76,0.04)',
              filter: 'blur(12px)',
              transform: 'rotate(180deg)',
            }} />
            {/* Faisceau droit */}
            <div className="absolute" style={{
              right: '-160px', top: '-8px',
              width: '0', height: '0',
              borderTop: '80px solid transparent',
              borderBottom: '80px solid transparent',
              borderLeft: '380px solid rgba(201,168,76,0.04)',
              filter: 'blur(12px)',
            }} />
          </div>

          {/* Halos des phares */}
          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 flex gap-40 -translate-x-1/2">
            {[0, 1].map((i) => (
              <div key={i} className="relative flex items-center justify-center">
                {/* Lueur externe */}
                <div className="absolute w-28 h-28 rounded-full bg-[radial-gradient(circle,_rgba(201,168,76,0.15)_0%,_transparent_70%)]" />
                {/* Anneau externe */}
                <div className="w-16 h-16 rounded-full border border-gold/20 flex items-center justify-center shadow-[0_0_40px_rgba(201,168,76,0.15)]">
                  {/* Anneau interne */}
                  <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center bg-gold/5">
                    {/* LED centrale */}
                    <div className="w-4 h-4 rounded-full bg-gold shadow-[0_0_20px_rgba(201,168,76,1),0_0_40px_rgba(201,168,76,0.6),0_0_80px_rgba(201,168,76,0.3)]" />
                  </div>
                </div>
                {/* Reflet sol */}
                <div className="absolute top-14 w-8 h-2 bg-gold/10 rounded-full blur-sm" />
              </div>
            ))}
          </div>

          {/* Ligne du capot stylisée */}
          <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-80 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.04)_0%,_transparent_55%)]" />
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
