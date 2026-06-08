'use client'

import { useEffect, useState } from 'react'
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

export default function ServicesAdmin({ initialServices }: { initialServices?: Service[] }) {
  const router = useRouter()
  const [services, setServices] = useState<Service[]>(initialServices ?? [])
  const [loading, setLoading] = useState(!initialServices)
  const [saving, setSaving] = useState<number | null>(null)
  const [saved, setSaved] = useState<number | null>(null)

  useEffect(() => {
    if (!initialServices) {
      fetch('/api/services/all')
        .then((r) => r.json())
        .then((data) => { setServices(Array.isArray(data) ? data : []); setLoading(false) })
        .catch(() => setLoading(false))
    }
  }, [initialServices])

  const update = (id: number, field: keyof Service, value: string | number | boolean) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }

  const saveField = async (id: number, data: Partial<Service>) => {
    setSaving(id)
    await fetch('/api/services', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...data }),
    })
    setSaving(null)
    setSaved(id)
    setTimeout(() => setSaved(null), 2000)
    router.refresh()
  }

  const toggleRemise = async (id: number, current: number) => {
    const newRemise = current > 0 ? 0 : 20
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, remise: newRemise } : s)))
    await saveField(id, { remise: newRemise })
  }

  const toggleActif = async (id: number, current: boolean) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, actif: !current } : s)))
    await saveField(id, { actif: !current })
  }

  const inputClass = 'bg-[#0a0a14] border border-white/10 text-white px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold w-full rounded'

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="font-cinzel text-2xl font-bold text-white tracking-wider mb-2">Services & Prix</h1>
        <p className="text-[#444] text-sm mt-8 text-center">Chargement...</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-cinzel text-2xl font-bold text-white tracking-wider">Services & Prix</h1>
        <p className="text-[#444] text-sm mt-1">Gérez les services affichés sur le site</p>
      </div>

      <div className="space-y-4">
        {services.map((s) => {
          const marge = s.prixBase > 0 ? (((s.prixBase - s.coutProduit) / s.prixBase) * 100).toFixed(1) : '0.0'
          const prixRemise = s.remise > 0 ? s.prixBase * (1 - s.remise / 100) : null
          const isSaving = saving === s.id
          const isSaved = saved === s.id

          return (
            <div key={s.id} className={`bg-[#07070f] border p-6 transition-all rounded ${
              !s.actif ? 'border-white/3 opacity-50' : s.remise > 0 ? 'border-gold/20' : 'border-white/5'
            }`}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

                {/* Nom + description */}
                <div className="lg:col-span-4 space-y-3">
                  <div>
                    <label className="text-xs text-[#444] uppercase tracking-wider block mb-1">Nom</label>
                    <input className={inputClass} value={s.nom} onChange={(e) => update(s.id, 'nom', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs text-[#444] uppercase tracking-wider block mb-1">Description</label>
                    <textarea
                      className={`${inputClass} resize-none h-20 text-xs`}
                      value={s.description}
                      onChange={(e) => update(s.id, 'description', e.target.value)}
                    />
                  </div>
                </div>

                {/* Prix + marge */}
                <div className="lg:col-span-2 space-y-3">
                  <div>
                    <label className="text-xs text-[#444] uppercase tracking-wider block mb-1">Prix client (€)</label>
                    <input
                      type="number" min="0"
                      className={inputClass}
                      value={s.prixBase}
                      onChange={(e) => update(s.id, 'prixBase', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-[#444] uppercase tracking-wider mb-1">Marge</p>
                    <p className="font-cinzel text-2xl font-bold text-gold">{marge}%</p>
                  </div>
                </div>

                {/* Toggle -20% */}
                <div className="lg:col-span-3">
                  <p className="text-xs text-[#444] uppercase tracking-wider mb-3">Offre de lancement</p>
                  <button
                    onClick={() => toggleRemise(s.id, s.remise)}
                    disabled={isSaving}
                    className={`w-full flex items-center justify-between px-4 py-3 border font-cinzel text-sm tracking-wider transition-all duration-300 rounded ${
                      s.remise > 0
                        ? 'border-gold/40 bg-gold/10 text-gold hover:bg-gold/15'
                        : 'border-white/10 text-[#444] hover:border-gold/20 hover:text-[#666]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-5 rounded-full border-2 relative transition-all duration-300 ${
                        s.remise > 0 ? 'bg-gold border-gold' : 'bg-transparent border-[#333]'
                      }`}>
                        <div className={`absolute top-0.5 w-3 h-3 rounded-full transition-all duration-300 ${
                          s.remise > 0 ? 'left-5 bg-[#02020a]' : 'left-0.5 bg-[#444]'
                        }`} />
                      </div>
                      <span className="text-sm">{s.remise > 0 ? '-20% ACTIF' : '-20% inactif'}</span>
                    </div>
                    <span className={`text-xs ${s.remise > 0 ? 'text-gold/70' : 'text-[#333]'}`}>
                      {s.remise > 0 ? `${prixRemise?.toFixed(0)}€ affiché` : `${s.prixBase}€ affiché`}
                    </span>
                  </button>
                  {s.remise > 0 && prixRemise && (
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <span className="line-through text-[#333]">{s.prixBase}€</span>
                      <span className="text-gold">→ {prixRemise.toFixed(0)}€</span>
                      <span className="text-green-400">(-20%)</span>
                    </div>
                  )}
                </div>

                {/* Actif + Save */}
                <div className="lg:col-span-3 flex flex-col gap-3">
                  <div>
                    <p className="text-xs text-[#444] uppercase tracking-wider mb-2">Visibilité</p>
                    <button
                      onClick={() => toggleActif(s.id, s.actif)}
                      disabled={isSaving}
                      className={`flex items-center gap-2 px-4 py-2 border text-xs font-cinzel tracking-wider transition-all rounded ${
                        s.actif
                          ? 'border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/15'
                          : 'border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/15'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${s.actif ? 'bg-green-400' : 'bg-red-400'}`} />
                      {s.actif ? 'Visible sur le site' : 'Masqué'}
                    </button>
                  </div>
                  <button
                    onClick={() => saveField(s.id, { nom: s.nom, description: s.description, prixBase: s.prixBase, remise: s.remise, actif: s.actif })}
                    disabled={isSaving}
                    className={`py-2.5 font-cinzel text-sm font-semibold tracking-wider transition-all rounded mt-auto ${
                      isSaved
                        ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                        : 'bg-gold text-[#02020a] hover:bg-gold-light disabled:opacity-50'
                    }`}
                  >
                    {isSaving ? 'Sauvegarde...' : isSaved ? '✓ Sauvegardé' : 'Sauvegarder'}
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
