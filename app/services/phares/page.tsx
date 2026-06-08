import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function PharesPage() {
  return (
    <div className="min-h-screen bg-[#02020a]">
      <Navbar />

      {/* HERO */}
      <section className="relative h-[60vh] min-h-[440px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#040402]">
          {/* Headlight beam effect */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1">
            {/* Left beam */}
            <div className="absolute -translate-x-full -translate-y-1/2 w-0 h-0"
              style={{
                background: 'conic-gradient(from -15deg at 0% 50%, transparent 0deg, rgba(201,168,76,0.08) 15deg, rgba(255,240,180,0.12) 25deg, rgba(201,168,76,0.08) 35deg, transparent 50deg)',
                width: '500px',
                height: '300px',
                filter: 'blur(8px)',
              }}
            />
          </div>
          {/* Two headlights */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-32">
            {[0, 1].map((i) => (
              <div key={i} className="relative">
                {/* Outer ring */}
                <div className="w-16 h-16 rounded-full border-2 border-gold/30 flex items-center justify-center shadow-[0_0_60px_rgba(201,168,76,0.3)]">
                  <div className="w-10 h-10 rounded-full border border-gold/50 flex items-center justify-center bg-gold/5">
                    <div className="w-5 h-5 rounded-full bg-gold/80 shadow-[0_0_20px_rgba(201,168,76,1),0_0_40px_rgba(201,168,76,0.5)]" />
                  </div>
                </div>
                {/* Beam */}
                <div className="absolute top-1/2 -translate-y-1/2 left-full ml-2 w-48 h-px"
                  style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.4), transparent)', filter: 'blur(2px)', height: '40px', marginTop: '-20px' }}
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_60%)]" />
        </div>
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#02020a] to-transparent" />

        <div className="relative z-10 text-center px-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-gold/50" />
            <span className="text-gold text-xs tracking-[0.5em] uppercase">Service Premium</span>
            <div className="w-8 h-px bg-gold/50" />
          </div>
          <h1 className="font-cinzel text-5xl md:text-6xl font-bold text-white tracking-wider mb-3">
            Rénovation<br /><span className="text-gold">Phares</span>
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
                Clarté cristalline retrouvée
              </h2>
              <p className="text-[#777] leading-loose mb-4">
                Avec le temps, les optiques de phare jaunissent et se rayent, réduisant jusqu&apos;à 70% de la luminosité. Notre traitement restaure une transparence d&apos;origine et la protège durablement.
              </p>
              <p className="text-[#777] leading-loose">
                Nano-revêtement UV 9H appliqué en finition : résistance aux rayures, aux UV et aux intempéries. Résultat visible et durable.
              </p>
            </div>
            <div className="space-y-3">
              {[
                'Polissage multi-étapes professionnel',
                'Traitement nano céramique UV 9H',
                'Option vitrage teinté (+40€)',
                'Résultat durable plusieurs années',
                'Améliore visibilité & sécurité',
              ].map((feat) => (
                <div key={feat} className="flex items-center gap-3 p-3 bg-[#07070f] border border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_6px_#C9A84C] flex-shrink-0" />
                  <span className="text-[#888] text-sm">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            <div className="border border-gold/20 p-6 text-center">
              <p className="text-[#555] text-xs uppercase tracking-widest mb-2">Standard</p>
              <div className="flex items-baseline justify-center gap-2 mb-1">
                <span className="font-cinzel text-4xl font-bold text-gold">40€</span>
                <span className="text-[#444] line-through">50€</span>
              </div>
              <p className="text-green-400 text-xs mb-4">-20% offre de lancement</p>
              <p className="text-[#555] text-xs">Polissage + nano UV 9H</p>
            </div>
            <div className="border border-gold/40 p-6 text-center bg-gold/5 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gold text-[#02020a] text-xs font-cinzel font-bold tracking-wider">
                OPTION
              </div>
              <p className="text-[#555] text-xs uppercase tracking-widest mb-2">Teinté</p>
              <div className="flex items-baseline justify-center gap-2 mb-1">
                <span className="font-cinzel text-4xl font-bold text-gold">80€</span>
                <span className="text-[#444] line-through">90€</span>
              </div>
              <p className="text-green-400 text-xs mb-4">Standard + teinté</p>
              <p className="text-[#555] text-xs">+40€ pour le vitrage teinté</p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/devis?service=3"
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
