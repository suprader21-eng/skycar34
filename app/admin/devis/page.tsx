'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type DevisWithItems = {
  id: number
  nom: string
  prenom: string
  email: string
  telephone: string
  marqueVoiture: string
  modeleVoiture: string
  message: string | null
  statut: string
  totalHT: number
  remiseAppliquee: number
  totalFinal: number
  createdAt: string
  updatedAt: string
  items: {
    id: number
    quantite: number
    prixUnit: number
    service: { id: number; nom: string; coutProduit: number }
  }[]
}

const statutOptions = [
  { value: 'en_attente', label: 'En attente', color: 'text-amber-400 bg-amber-400/10 border-amber-400/30' },
  { value: 'accepte', label: 'Accepté', color: 'text-blue-400 bg-blue-400/10 border-blue-400/30' },
  { value: 'termine', label: 'Terminé', color: 'text-green-400 bg-green-400/10 border-green-400/30' },
  { value: 'refuse', label: 'Refusé', color: 'text-red-400 bg-red-400/10 border-red-400/30' },
]

export default function AdminDevisPage() {
  const router = useRouter()
  const [devis, setDevis] = useState<DevisWithItems[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('tous')
  const [selected, setSelected] = useState<DevisWithItems | null>(null)
  const [remiseInput, setRemiseInput] = useState('')
  const [updating, setUpdating] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/devis')
      .then((r) => r.json())
      .then((data) => { setDevis(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = filter === 'tous' ? devis : devis.filter((d) => d.statut === filter)

  const updateStatut = async (id: number, statut: string) => {
    setUpdating(id)
    await fetch(`/api/devis/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ statut }),
    })
    setDevis((prev) => prev.map((d) => (d.id === id ? { ...d, statut } : d)))
    if (selected?.id === id) setSelected((s) => s ? { ...s, statut } : null)
    setUpdating(null)
    router.refresh()
  }

  const applyRemise = async (id: number) => {
    const val = parseFloat(remiseInput)
    if (isNaN(val) || val < 0 || val > 100) return
    setUpdating(id)
    const res = await fetch(`/api/devis/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ remiseAppliquee: val }),
    })
    const updated = await res.json()
    setDevis((prev) => prev.map((d) => (d.id === id ? { ...d, ...updated } : d)))
    if (selected?.id === id) setSelected((s) => s ? { ...s, ...updated } : null)
    setRemiseInput('')
    setUpdating(null)
  }

  const getStatutStyle = (s: string) => statutOptions.find((o) => o.value === s)?.color ?? 'text-[#888]'
  const getStatutLabel = (s: string) => statutOptions.find((o) => o.value === s)?.label ?? s

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-cinzel text-2xl font-bold text-white tracking-wider">Gestion des Devis</h1>
          <p className="text-[#444] text-sm mt-1">{devis.length} devis au total</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['tous', 'en_attente', 'accepte', 'termine', 'refuse'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-xs font-cinzel tracking-wider border transition-all ${
                filter === f ? 'border-gold bg-gold/10 text-gold' : 'border-white/10 text-[#555] hover:border-gold/30 hover:text-[#888]'
              }`}
            >
              {f === 'tous' ? 'Tous' : getStatutLabel(f)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex-1 bg-[#07070f] border border-white/5 overflow-hidden">
          {loading ? (
            <div className="py-16 text-center text-[#444] text-sm">Chargement...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    {['#', 'Date', 'Client', 'Véhicule', 'Services', 'Total', 'Statut', 'Actions'].map((h) => (
                      <th key={h} className="text-left py-3 px-4 text-xs text-[#444] uppercase tracking-wider font-normal whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((d) => (
                    <tr
                      key={d.id}
                      onClick={() => { setSelected(d); setRemiseInput('') }}
                      className={`border-b border-white/3 hover:bg-white/3 cursor-pointer transition-colors ${selected?.id === d.id ? 'bg-gold/5' : ''}`}
                    >
                      <td className="py-3 px-4 text-gold font-cinzel font-semibold">#{d.id}</td>
                      <td className="py-3 px-4 text-[#555] whitespace-nowrap">
                        {new Date(d.createdAt).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="py-3 px-4 text-white whitespace-nowrap">{d.prenom} {d.nom}</td>
                      <td className="py-3 px-4 text-[#666] whitespace-nowrap">{d.marqueVoiture} {d.modeleVoiture}</td>
                      <td className="py-3 px-4 text-[#555]">{d.items.length} service{d.items.length > 1 ? 's' : ''}</td>
                      <td className="py-3 px-4 font-cinzel font-bold text-gold whitespace-nowrap">{d.totalFinal.toFixed(0)}€</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs border ${getStatutStyle(d.statut)}`}>
                          {getStatutLabel(d.statut)}
                        </span>
                      </td>
                      <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          className="bg-[#0a0a14] border border-white/10 text-[#888] text-xs px-2 py-1.5 focus:border-gold focus:outline-none rounded"
                          value={d.statut}
                          onChange={(e) => updateStatut(d.id, e.target.value)}
                          disabled={updating === d.id}
                        >
                          {statutOptions.map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && !loading && (
                    <tr>
                      <td colSpan={8} className="py-16 text-center text-[#333]">Aucun devis</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Panneau détail */}
        {selected && (
          <div className="w-72 flex-shrink-0 bg-[#07070f] border border-white/5 p-5 self-start">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-cinzel font-semibold text-white">Devis #{selected.id}</h3>
              <button onClick={() => setSelected(null)} className="text-[#444] hover:text-white text-xl leading-none">×</button>
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-[#444] text-xs uppercase tracking-wider mb-1">Client</p>
                <p className="text-white">{selected.prenom} {selected.nom}</p>
                <p className="text-[#666] text-xs mt-0.5">{selected.email}</p>
                <p className="text-[#666] text-xs">{selected.telephone}</p>
              </div>
              <div>
                <p className="text-[#444] text-xs uppercase tracking-wider mb-1">Véhicule</p>
                <p className="text-white">{selected.marqueVoiture} {selected.modeleVoiture}</p>
              </div>
              {selected.message && (
                <div>
                  <p className="text-[#444] text-xs uppercase tracking-wider mb-1">Message / Détail</p>
                  <p className="text-[#888] text-xs leading-relaxed bg-white/3 p-2 rounded">{selected.message}</p>
                </div>
              )}
              <div>
                <p className="text-[#444] text-xs uppercase tracking-wider mb-2">Services</p>
                {selected.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-1 border-b border-white/3">
                    <span className="text-[#888] text-xs">{item.service.nom}</span>
                    <span className="text-gold text-xs font-cinzel">{item.prixUnit.toFixed(0)}€</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 space-y-1">
                {selected.remiseAppliquee > 0 && (
                  <div className="flex justify-between text-xs">
                    <span className="text-[#444]">Remise</span>
                    <span className="text-green-400">-{selected.remiseAppliquee}%</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-1">
                  <span className="text-white text-xs font-semibold">Total final</span>
                  <span className="text-gold font-cinzel font-bold text-lg">{selected.totalFinal.toFixed(0)}€</span>
                </div>
              </div>
            </div>

            {/* Remise manuelle */}
            <div className="border-t border-white/5 mt-4 pt-4">
              <p className="text-[#444] text-xs uppercase tracking-wider mb-2">Remise manuelle (%)</p>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={remiseInput}
                  onChange={(e) => setRemiseInput(e.target.value)}
                  placeholder="Ex: 10"
                  className="flex-1 bg-[#0a0a14] border border-white/10 text-white px-3 py-1.5 text-xs focus:border-gold focus:outline-none rounded"
                />
                <button
                  onClick={() => applyRemise(selected.id)}
                  disabled={updating === selected.id || !remiseInput}
                  className="px-3 py-1.5 bg-gold text-[#02020a] font-cinzel text-xs font-semibold hover:bg-gold-light transition-all disabled:opacity-50 rounded"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
