'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Service = {
  id: number
  nom: string
  description: string
  prixBase: number
  coutProduit: number
  remise: number
  actif: boolean
}

export default function ServicesAdmin({ initialServices }: { initialServices: Service[] }) {
  const router = useRouter()
  const [services, setServices] = useState(initialServices)
  const [saving, setSaving] = useState<number | null>(null)
  const [saved, setSaved] = useState<number | null>(null)

  const update = (id: number, field: keyof Service, value: string | number | boolean) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    )
  }

  const save = async (id: number) => {
    const s = services.find((sv) => sv.id === id)!
    setSaving(id)
    await fetch('/api/services', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, nom: s.nom, description: s.description, prixBase: s.prixBase, remise: s.remise, actif: s.actif }),
    })
    setSaving(null)
    setSaved(id)
    setTimeout(() => setSaved(null), 2000)
    router.refresh()
  }

  const inputClass = 'bg-dark-bg border border-dark-border text-white px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold w-full'

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-cinzel text-2xl font-bold text-white tracking-wider">Services & Prix</h1>
        <p className="text-[#555] text-sm mt-1">Gérez les services affichés sur le site</p>
      </div>

      <div className="space-y-4">
        {services.map((s) => {
          const marge = s.prixBase > 0 ? (((s.prixBase - s.coutProduit) / s.prixBase) * 100).toFixed(1) : '0.0'
          const prixRemise = s.remise > 0 ? s.prixBase * (1 - s.remise / 100) : null

          return (
            <div key={s.id} className={`bg-dark-surface border p-6 transition-colors ${s.actif ? 'border-dark-border' : 'border-dark-border/40 opacity-60'}`}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                <div className="lg:col-span-3 space-y-3">
                  <div>
                    <label className="text-xs text-[#555] uppercase tracking-wider block mb-1">Nom du service</label>
                    <input
                      className={inputClass}
                      value={s.nom}
                      onChange={(e) => update(s.id, 'nom', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#555] uppercase tracking-wider block mb-1">Description</label>
                    <textarea
                      className={`${inputClass} resize-none h-20 text-xs`}
                      value={s.description}
                      onChange={(e) => update(s.id, 'description', e.target.value)}
                    />
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-3">
                  <div>
                    <label className="text-xs text-[#555] uppercase tracking-wider block mb-1">Prix client (€)</label>
                    <input
                      type="number"
                      min="0"
                      className={inputClass}
                      value={s.prixBase}
                      onChange={(e) => update(s.id, 'prixBase', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#555] uppercase tracking-wider block mb-1">Remise active (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className={inputClass}
                      value={s.remise}
                      onChange={(e) => update(s.id, 'remise', parseFloat(e.target.value) || 0)}
                    />
                    {prixRemise && (
                      <p className="text-xs text-green-400 mt-1">→ Prix affiché : {prixRemise.toFixed(0)}€</p>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-3 flex flex-col gap-3">
                  <div>
                    <p className="text-xs text-[#555] uppercase tracking-wider mb-1">Coût produit</p>
                    <p className="text-[#888] text-sm py-2">{s.coutProduit}€ <span className="text-xs text-[#555]">(modifiable dans Coûts)</span></p>
                  </div>
                  <div>
                    <p className="text-xs text-[#555] uppercase tracking-wider mb-1">Marge estimée</p>
                    <p className="text-gold font-cinzel font-bold text-xl">{marge}%</p>
                  </div>
                </div>

                <div className="lg:col-span-2 flex flex-col gap-3">
                  <div>
                    <p className="text-xs text-[#555] uppercase tracking-wider mb-2">Visibilité</p>
                    <button
                      onClick={() => update(s.id, 'actif', !s.actif)}
                      className={`flex items-center gap-2 px-3 py-2 border text-xs font-cinzel tracking-wider transition-all ${
                        s.actif
                          ? 'border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/20'
                          : 'border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${s.actif ? 'bg-green-400' : 'bg-red-400'}`} />
                      {s.actif ? 'Actif' : 'Inactif'}
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-2 flex items-end">
                  <button
                    onClick={() => save(s.id)}
                    disabled={saving === s.id}
                    className={`w-full py-2 font-cinzel text-sm font-semibold tracking-wider transition-all ${
                      saved === s.id
                        ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                        : 'bg-gold text-dark-bg hover:bg-gold-light disabled:opacity-50'
                    }`}
                  >
                    {saving === s.id ? 'Sauvegarde...' : saved === s.id ? '✓ Sauvegardé' : 'Sauvegarder'}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
