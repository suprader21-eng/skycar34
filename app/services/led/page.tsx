import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function LedPage() {
  return (
    <div className="min-h-screen bg-[#02020a]">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[560px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[#02020a]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_50%,_rgba(201,168,76,0.08)_0%,_transparent_60%)]" />
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
              <span className="text-white">Installation</span><br />
              <span className="text-gold drop-shadow-[0_0_25px_rgba(201,168,76,0.5)]">LED Complète</span>
            </h1>
            <p className="text-[#555] text-sm leading-relaxed mb-8 max-w-sm">
              Footwell · Sièges · Console · Portières — Ambiance sur mesure, luminosité réglable
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-gold/25 bg-gold/5 rounded-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_6px_#C9A84C] animate-pulse" />
              <span className="text-gold text-[10px] font-cinzel tracking-[0.3em] uppercase">Câblage 100% invisible</span>
            </div>
          </div>

          {/* Visuel habitacle LED */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-80 h-52 md:w-96 md:h-60">
              <div className="absolute inset-0 border border-white/5 rounded-3xl"
                style={{ background: 'linear-gradient(160deg,#0e0d0a 0%,#080806 60%,#050504 100%)', boxShadow: '0 0 60px rgba(201,168,76,0.05)' }}>
                <div className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r from-transparent via-gold to-transparent"
                  style={{ boxShadow: '0 0 12px rgba(201,168,76,0.8), 0 0 25px rgba(201,168,76,0.3)' }} />
                <div className="absolute left-0 top-8 bottom-4 w-0.5 rounded-full bg-gradient-to-b from-transparent via-gold/70 to-transparent"
                  style={{ boxShadow: '0 0 8px rgba(201,168,76,0.6)' }} />
                <div className="absolute right-0 top-8 bottom-4 w-0.5 rounded-full bg-gradient-to-b from-transparent via-gold/70 to-transparent"
                  style={{ boxShadow: '0 0 8px rgba(201,168,76,0.6)' }} />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-20 h-0.5 rounded-full bg-gold/60"
                  style={{ boxShadow: '0 0 10px rgba(201,168,76,0.7)' }} />
                {[{ side: 'left-8' }, { side: 'right-8' }].map((s, idx) => (
                  <div key={idx} className={`absolute ${s.side} top-10 w-14 h-20 border border-white/10 rounded-xl flex items-center justify-center`}
                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <div className="w-10 h-12 border border-white/5 rounded-lg relative overflow-hidden"
                      style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent"
                        style={{ boxShadow: '0 0 6px rgba(201,168,76,0.5)' }} />
                      <div className="absolute left-0 top-2 bottom-1 w-0.5 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
                      <div className="absolute right-0 top-2 bottom-1 w-0.5 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
                    </div>
                  </div>
                ))}
                <div className="absolute bottom-0 left-1/4 right-1/4 h-3 blur-md rounded-full" style={{ background: 'rgba(201,168,76,0.05)' }} />
              </div>
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
                Chaque recoin illuminé avec précision
              </h2>
              <p className="text-[#666] leading-loose mb-4 text-sm">
                Nous installons des bandeaux LED haute densité dans les zones stratégiques de votre habitacle : footwell, contours de sièges, console centrale, portières. Le résultat est une ambiance lumineuse douce et sophistiquée.
              </p>
              <p className="text-[#666] leading-loose text-sm">
                Coloris et intensité entièrement réglables. Câblage invisible, pose propre, rendu showroom.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { icon: '◈', label: 'Bandeaux LED haute densité' },
                { icon: '◉', label: 'Footwell avant & arrière' },
                { icon: '◆', label: 'Contours de sièges' },
                { icon: '◇', label: 'Console centrale & portières' },
                { icon: '●', label: 'Intensité & coloris réglables' },
                { icon: '◈', label: 'Câblage 100% invisible' },
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
              <span className="font-cinzel text-6xl font-bold text-gold">150€</span>
            </div>
            <p className="text-[#333] text-xs mb-8">Pose · Câblage invisible · Garantie inclus</p>
            <Link href="/devis?service=6"
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
