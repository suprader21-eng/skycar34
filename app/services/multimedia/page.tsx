import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function MultimediaPage() {
  return (
    <div className="min-h-screen bg-[#02020a]">
      <Navbar />

      {/* HERO */}
      <section className="relative h-[60vh] min-h-[440px] flex items-center justify-center overflow-hidden">
        {/* Animated screen visual */}
        <div className="absolute inset-0 bg-[#030610]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,_rgba(100,140,255,0.12)_0%,_transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_70%,_rgba(201,168,76,0.06)_0%,_transparent_50%)]" />
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: 'linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
          />
          {/* Screen mockup */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-72 h-48 md:w-96 md:h-64 border-2 border-gold/30 rounded-xl bg-[#040810] shadow-[0_0_60px_rgba(201,168,76,0.1),inset_0_0_40px_rgba(100,140,255,0.05)] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent" />
              <div className="grid grid-cols-4 gap-3 p-4 relative z-10">
                {['📱', '🎵', '🗺️', '📷', '⚙️', '🔊', '📞', '🏠'].map((icon, i) => (
                  <div key={i} className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg
                    ${i === 0 ? 'bg-gold/20 border border-gold/40' : 'bg-white/5 border border-white/10'}`}>
                    {icon}
                  </div>
                ))}
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-gold/40" />
            </div>
            <div className="w-12 h-3 bg-gold/20 mx-auto rounded-b border-x border-b border-gold/20" />
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
            Intégration<br /><span className="text-gold">Multimédia</span>
          </h1>
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-gold/30 bg-gold/5 mt-4">
            <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_6px_#C9A84C] animate-pulse" />
            <span className="text-gold text-xs font-cinzel tracking-widest">OFFRE DE LANCEMENT — 20% DE REMISE</span>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="font-cinzel text-2xl font-bold text-white mb-5 tracking-wide">
                Votre habitacle devient un cockpit connecté
              </h2>
              <p className="text-[#777] leading-loose mb-4">
                Nous intégrons un écran haute définition compatible iOS (CarPlay) et Android (Auto) dans votre tableau de bord, pour une navigation, une musique et des communications mains-libres entièrement fluides.
              </p>
              <p className="text-[#777] leading-loose">
                L&apos;installation est invisible et propre — aucun câble apparent, finition soignée pour un rendu d&apos;origine constructeur.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon: '◈', label: 'Écran HD tactile', desc: 'Résolution premium, réactivité optimale' },
                { icon: '◉', label: 'Apple CarPlay & Android Auto', desc: 'Connexion sans fil disponible' },
                { icon: '◆', label: 'Caméra de recul intégrée', desc: 'Vision arrière HD en option' },
                { icon: '◇', label: 'Interface personnalisée', desc: 'Thème adapté à votre intérieur' },
              ].map((f) => (
                <div key={f.label} className="flex gap-4 items-start p-4 bg-[#07070f] border border-white/5">
                  <span className="text-gold mt-0.5">{f.icon}</span>
                  <div>
                    <p className="text-white text-sm font-semibold font-cinzel">{f.label}</p>
                    <p className="text-[#555] text-xs mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PRICING */}
          <div className="border border-gold/20 p-8 text-center relative">
            <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
            <p className="text-[#555] text-xs uppercase tracking-widest mb-2">Tarif</p>
            <div className="flex items-baseline justify-center gap-3 mb-1">
              <span className="font-cinzel text-5xl font-bold text-gold">160€</span>
              <span className="text-[#444] text-lg line-through">200€</span>
            </div>
            <p className="text-green-400 text-xs mb-6">Offre de lancement -20%</p>
            <p className="text-[#555] text-xs mb-8">Pose incluse · Câblage invisible · Garantie</p>
            <Link
              href="/devis?service=2"
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
