import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function MultimediaPage() {
  return (
    <div className="min-h-screen bg-[#02020a]">
      <Navbar />

      {/* HERO */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#030610]">
          {/* Grille tech */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'linear-gradient(#C9A84C 1px,transparent 1px),linear-gradient(90deg,#C9A84C 1px,transparent 1px)', backgroundSize: '80px 80px' }} />
          {/* Lueur centrale */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_55%_45%,_rgba(80,120,255,0.12)_0%,_transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_45%_55%,_rgba(201,168,76,0.06)_0%,_transparent_50%)]" />

          {/* Écran central */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              {/* Halo */}
              <div className="absolute -inset-8 bg-[radial-gradient(circle,_rgba(201,168,76,0.08)_0%,_transparent_70%)] rounded-full" />
              {/* Écran */}
              <div className="w-80 h-52 md:w-96 md:h-60 rounded-2xl border border-gold/25 bg-[#040915] shadow-[0_0_80px_rgba(201,168,76,0.08),inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden relative">
                {/* Barre de statut */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/60" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                    <div className="w-2 h-2 rounded-full bg-green-500/60" />
                  </div>
                  <div className="w-20 h-1.5 rounded-full bg-white/10" />
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-white/20" />)}
                  </div>
                </div>
                {/* Interface */}
                <div className="p-4 grid grid-cols-4 gap-2.5">
                  {[
                    { label: 'Musique', color: 'from-purple-500/30', icon: '♪' },
                    { label: 'Maps', color: 'from-blue-500/30', icon: '◎' },
                    { label: 'Tél.', color: 'from-green-500/30', icon: '☎' },
                    { label: 'Apple', color: 'from-gold/30', icon: '⌘' },
                    { label: 'Météo', color: 'from-sky-500/30', icon: '◐' },
                    { label: 'Radio', color: 'from-orange-500/30', icon: '◈' },
                    { label: 'Video', color: 'from-red-500/30', icon: '▶' },
                    { label: 'Config', color: 'from-slate-500/30', icon: '⚙' },
                  ].map((app, i) => (
                    <div key={i} className={`rounded-xl bg-gradient-to-b ${app.color} to-transparent border border-white/5 flex flex-col items-center justify-center py-2 gap-1`}>
                      <span className="text-white/60 text-sm">{app.icon}</span>
                      <span className="text-white/30 text-[9px]">{app.label}</span>
                    </div>
                  ))}
                </div>
                {/* Barre du bas */}
                <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-black/40 to-transparent flex items-center justify-center">
                  <div className="w-24 h-1 rounded-full bg-white/20" />
                </div>
              </div>
              {/* Pied écran */}
              <div className="w-14 h-2 bg-gradient-to-b from-gold/20 to-transparent mx-auto border-x border-gold/10" />
              <div className="w-24 h-1 bg-gold/10 mx-auto rounded-full" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-56 bg-gradient-to-t from-[#02020a] to-transparent" />

        <div className="relative z-10 text-center px-4">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-gold/60" />
            <span className="text-gold text-[10px] tracking-[0.5em] uppercase">Service Premium</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-gold/60" />
          </div>
          <h1 className="font-cinzel text-5xl md:text-6xl font-bold tracking-wider">
            <span className="text-white">Intégration</span><br />
            <span className="text-gold drop-shadow-[0_0_25px_rgba(201,168,76,0.4)]">Multimédia</span>
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
                Votre voiture devient un cockpit connecté
              </h2>
              <p className="text-[#666] leading-loose mb-4 text-sm">
                Nous intégrons un écran haute définition compatible Apple CarPlay et Android Auto dans votre tableau de bord — navigation, musique, appels mains-libres, tout en fluidité.
              </p>
              <p className="text-[#666] leading-loose text-sm">
                Zéro câble apparent. Finition soignée, rendu constructeur. L&apos;installation ne se voit pas, elle se ressent.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { icon: '◈', label: 'Écran HD tactile haute réactivité' },
                { icon: '◉', label: 'Apple CarPlay & Android Auto sans fil' },
                { icon: '◆', label: 'Caméra de recul HD (en option)' },
                { icon: '◇', label: 'Intégration invisible, finition soignée' },
                { icon: '●', label: 'Compatible tous véhicules' },
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
              <span className="font-cinzel text-6xl font-bold text-gold">160€</span>
              <span className="text-[#333] text-2xl line-through font-cinzel">200€</span>
            </div>
            <p className="text-green-400 text-xs mb-1">Offre de lancement −20%</p>
            <p className="text-[#333] text-xs mb-8">Pose · Câblage · Garantie inclus</p>
            <Link href="/devis?service=2"
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
