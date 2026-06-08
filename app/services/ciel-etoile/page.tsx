'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import StarField from '@/components/StarField'

const TIERS = [
  { stars: 200, label: 'Constellation', desc: 'Ambiance discrète et élégante, idéale pour les petits véhicules.', popular: false },
  { stars: 400, label: 'Galaxie', desc: 'Un ciel étoilé généreux pour un voyage immersif au quotidien.', popular: false },
  { stars: 600, label: 'Nébuleuse', desc: 'Densité premium, effet voûte céleste saisissant.', popular: true },
  { stars: 800, label: 'Cosmos', desc: 'Expérience de prestige absolue, proche des grandes berlines de luxe.', popular: false },
  { stars: 1000, label: 'Infini', desc: 'Le summum — habituellement réservé aux Rolls Royce et Bentley.', popular: false },
]

const REMISE = 20

export default function CielEtoilePage() {
  const [selected, setSelected] = useState<number | null>(null)
  const [custom, setCustom] = useState(false)

  const getPrix = (stars: number) => {
    const base = stars // 1€ par étoile
    return base * (1 - REMISE / 100)
  }

  return (
    <div className="min-h-screen bg-[#02020a]">
      <Navbar />

      {/* HERO */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <StarField count={600} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.08)_0%,_transparent_65%)] z-10" />
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#02020a] to-transparent z-10" />

        <div className="relative z-20 text-center px-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-gold/50" />
            <span className="text-gold text-xs tracking-[0.5em] uppercase">Service Signature</span>
            <div className="w-8 h-px bg-gold/50" />
          </div>
          <h1 className="font-cinzel text-5xl md:text-7xl font-bold text-white tracking-wider mb-4">
            Ciel Étoilé
            <span className="text-gold drop-shadow-[0_0_20px_rgba(201,168,76,0.5)]"> LED</span>
          </h1>
          <p className="text-[#888] text-lg tracking-widest mb-6">L&apos;univers à portée de main</p>

          <div className="inline-flex items-center gap-2 px-4 py-2 border border-gold/30 bg-gold/5">
            <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_6px_#C9A84C] animate-pulse" />
            <span className="text-gold text-xs font-cinzel tracking-widest">OFFRE DE LANCEMENT — 20% DE REMISE</span>
          </div>
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-cinzel text-3xl font-bold text-white mb-6 tracking-wide">
              Une expérience unique en son genre
            </h2>
            <p className="text-[#777] leading-loose mb-4">
              Les LED amphibies de Skycar34 reproduisent fidèlement le ciel nocturne dans l&apos;habitacle de votre véhicule. Chaque point lumineux est positionné à la main, un à un, pour créer une voûte étoilée d&apos;une densité et d&apos;une fluidité incomparables.
            </p>
            <p className="text-[#777] leading-loose">
              Luminosité entièrement ajustable, compatible avec tous types de véhicules. Discret le jour, magique la nuit.
            </p>
          </div>
          <div className="space-y-3">
            {[
              'LEDs amphibies haute durabilité',
              'Luminosité ajustable (variateur)',
              'Installation propre & invisible',
              'Compatible tous véhicules',
              'Garantie pose incluse',
            ].map((feat) => (
              <div key={feat} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_6px_#C9A84C] flex-shrink-0" />
                <span className="text-[#888] text-sm">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIERS */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-cinzel text-3xl font-bold text-white tracking-wider mb-2">Choisissez votre Densité</h2>
            <p className="text-[#555] text-sm">1€ par étoile — <span className="text-gold">-20% offre de lancement</span></p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {TIERS.map((tier) => {
              const prixFinal = getPrix(tier.stars)
              const isSelected = selected === tier.stars
              return (
                <button
                  key={tier.stars}
                  onClick={() => { setSelected(tier.stars); setCustom(false) }}
                  className={`relative text-left p-6 border transition-all duration-300 ${
                    isSelected
                      ? 'border-gold bg-gold/10 shadow-[0_0_30px_rgba(201,168,76,0.1)]'
                      : 'border-white/10 bg-[#07070f] hover:border-gold/40'
                  } ${tier.popular ? 'ring-1 ring-gold/30' : ''}`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gold text-[#02020a] text-xs font-cinzel font-bold tracking-wider whitespace-nowrap">
                      LE PLUS CHOISI
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-[#555] text-xs uppercase tracking-widest mb-1">{tier.label}</p>
                      <p className="font-cinzel text-2xl font-bold text-white">{tier.stars}
                        <span className="text-sm font-normal text-[#555] ml-1">étoiles</span>
                      </p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 mt-1 flex-shrink-0 transition-all ${
                      isSelected ? 'border-gold bg-gold' : 'border-white/20'
                    }`} />
                  </div>
                  <p className="text-[#666] text-xs leading-relaxed mb-4">{tier.desc}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-cinzel text-2xl font-bold text-gold">{prixFinal.toFixed(0)}€</span>
                    <span className="text-sm text-[#444] line-through">{tier.stars}€</span>
                  </div>
                  {/* Mini starfield preview */}
                  <div className="mt-3 flex flex-wrap gap-0.5 h-6 overflow-hidden opacity-40">
                    {[...Array(Math.floor(tier.stars / 20))].map((_, i) => (
                      <div key={i} className="w-0.5 h-0.5 rounded-full bg-white" style={{ opacity: Math.random() * 0.7 + 0.3 }} />
                    ))}
                  </div>
                </button>
              )
            })}

            {/* Custom */}
            <button
              onClick={() => { setCustom(true); setSelected(null) }}
              className={`text-left p-6 border transition-all duration-300 ${
                custom
                  ? 'border-gold bg-gold/10'
                  : 'border-white/10 bg-[#07070f] hover:border-gold/40 border-dashed'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[#555] text-xs uppercase tracking-widest mb-1">Sur mesure</p>
                  <p className="font-cinzel text-2xl font-bold text-white">Devis
                    <span className="text-sm font-normal text-[#555] ml-1">personnalisé</span>
                  </p>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 mt-1 flex-shrink-0 transition-all ${
                  custom ? 'border-gold bg-gold' : 'border-white/20'
                }`} />
              </div>
              <p className="text-[#666] text-xs leading-relaxed mb-4">
                Véhicule hors-gabarit, combinaison spéciale, ou plus de 1000 étoiles ? On s&apos;adapte à votre projet.
              </p>
              <span className="text-gold text-sm font-cinzel">Nous contacter →</span>
            </button>
          </div>

          {/* CTA */}
          {(selected || custom) && (
            <div className="mt-8 text-center">
              <div className="inline-block border border-gold/20 bg-gold/5 px-8 py-5">
                {selected && (
                  <p className="text-[#888] text-sm mb-3">
                    Pack sélectionné : <span className="text-white font-cinzel font-semibold">{TIERS.find(t => t.stars === selected)?.label} — {selected} étoiles</span>
                    <span className="text-gold font-cinzel font-bold ml-3">{getPrix(selected).toFixed(0)}€</span>
                  </p>
                )}
                <Link
                  href={`/devis?service=ciel-etoile${selected ? `&etoiles=${selected}` : ''}`}
                  className="inline-block px-10 py-4 bg-gold text-[#02020a] font-cinzel font-bold text-sm tracking-widest hover:bg-gold-light transition-all"
                >
                  {custom ? 'Demander un Devis Personnalisé' : 'Commander ce Pack →'}
                </Link>
              </div>
            </div>
          )}
          {!selected && !custom && (
            <div className="mt-8 text-center">
              <Link
                href="/devis"
                className="inline-block px-10 py-4 border border-gold/40 text-gold font-cinzel text-sm tracking-widest hover:bg-gold hover:text-[#02020a] transition-all"
              >
                Demander un Devis →
              </Link>
            </div>
          )}
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
