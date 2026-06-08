'use client'

import { useState } from 'react'
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
  createdAt: Date
  updatedAt: Date
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

export default function DevisAdmin({ initialDevis }: { initialDevis: DevisWithItems[] }) {
  const router = useRouter()
  const [devis, setDevis] = useState(initialDevis)
  const [filter, setFilter] = useState('tous')
  const [selected, setSelected] = useState<DevisWithItems | null>(null)
  const [remiseInput, setRemiseInput] = useState('')
  const [updating, setUpdating] = useState<number | null>(null)

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
    router.refresh()
  }

  const getStatutStyle = (s: string) => statutOptions.find((o) => o.value === s)?.color ?? 'text-[#888]'
  const getStatutLabel = (s: string) => statutOptions.find((o) => o.value === s)?.label ?? s

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-cinzel text-2xl font-bold text-white tracking-wider">Gestion des Devis</h1>
          <p className="text-[#555] text-sm mt-1">{devis.length} devis au total</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['tous', 'en_attente', 'accepte', 'termine', 'refuse'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-xs font-cinzel tracking-wider border transition-all ${
                filter === f ? 'border-gold bg-gold/10 text-gold' : 'border-dark-border text-[#888] hover:border-gold/40'
              }`}
            >
              {f === 'tous' ? 'Tous' : getStatutLabel(f)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex-1 bg-dark-surface border border-dark-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-border">
                  {['#', 'Date', 'Client', 'Véhicule', 'Services', 'Total', 'Statut', 'Actions'].map((h) => (
                    <th key={h} className="text-left py-3 px-3 text-xs text-[#555] uppercase tracking-wider font-normal whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((d) => (
                  <tr
                    key={d.id}
                    className={`border-b border-dark-border/50 hover:bg-white/2 cursor-pointer ${selected?.id === d.id ? 'bg-gold/5' : ''}`}
                    onClick={() => { setSelected(d); setRemiseInput('') }}
                  >
                    <td className="py-3 px-3 text-gold font-cinzel font-semibold">#{d.id}</td>
                    <td className="py-3 px-3 text-[#888] whitespace-nowrap">
                      {new Date(d.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-3 px-3 text-white whitespace-nowrap">{d.prenom} {d.nom}</td>
                    <td className="py-3 px-3 text-[#888] whitespace-nowrap">{d.marqueVoiture} {d.modeleVoiture}</td>
                    <td className="py-3 px-3 text-[#888]">{d.items.length} service{d.items.length > 1 ? 's' : ''}</td>
                    <td className="py-3 px-3 font-cinzel font-bold text-gold whitespace-nowrap">{d.totalFinal.toFixed(0)}€</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-1 text-xs border ${getStatutStyle(d.statut)}`}>
                        {getStatutLabel(d.statut)}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <select
                        className="bg-dark-bg border border-dark-border text-[#888] text-xs px-2 py-1 focus:border-gold focus:outline-none"
                        value={d.statut}
                        onClick={(e) => e.stopPropagation()}
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
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-[#555]">Aucun devis</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {selected && (
          <div className="w-80 flex-shrink-0 bg-dark-surface border border-dark-border p-6 self-start">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-cinzel font-semibold text-white">Devis #{selected.id}</h3>
              <button onClick={() => setSelected(null)} className="text-[#555] hover:text-white text-lg leading-none">×</button>
            </div>
            <div className="space-y-3 text-sm mb-6">
              <div>
                <p className="text-[#555] text-xs uppercase tracking-wider">Client</p>
                <p className="text-white">{selected.prenom} {selected.nom}</p>
              </div>
              <div>
                <p className="text-[#555] text-xs uppercase tracking-wider">Contact</p>
                <p className="text-[#888]">{selected.email}</p>
                <p className="text-[#888]">{selected.telephone}</p>
              </div>
              <div>
                <p className="text-[#555] text-xs uppercase tracking-wider">Véhicule</p>
                <p className="text-white">{selected.marqueVoiture} {selected.modeleVoiture}</p>
              </div>
              {selected.message && (
                <div>
                  <p className="text-[#555] text-xs uppercase tracking-wider">Message</p>
                  <p className="text-[#888] text-xs leading-relaxed">{selected.message}</p>
                </div>
              )}
              <div>
                <p className="text-[#555] text-xs uppercase tracking-wider mb-2">Services</p>
                {selected.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-1">
                    <span className="text-[#888] text-xs">{item.service.nom}</span>
                    <span className="text-gold text-xs font-cinzel">{item.prixUnit.toFixed(0)}€</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-dark-border pt-3 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[#555]">Total HT</span>
                  <span className="text-[#888]">{selected.totalHT.toFixed(0)}€</span>
                </div>
                {selected.remiseAppliquee > 0 && (
                  <div className="flex justify-between text-xs">
                    <span className="text-[#555]">Remise</span>
                    <span className="text-green-400">-{selected.remiseAppliquee}%</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-white text-xs font-semibold">Total final</span>
                  <span className="text-gold font-cinzel font-bold">{selected.totalFinal.toFixed(0)}€</span>
                </div>
              </div>
            </div>
            <div className="border-t border-dark-border pt-4">
              <p className="text-[#555] text-xs uppercase tracking-wider mb-3">Ajouter une remise (%)</p>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={remiseInput}
                  onChange={(e) => setRemiseInput(e.target.value)}
                  placeholder="Ex: 10"
                  className="flex-1 bg-dark-bg border border-dark-border text-white px-3 py-2 text-xs focus:border-gold focus:outline-none"
                />
                <button
                  onClick={() => applyRemise(selected.id)}
                  disabled={updating === selected.id || !remiseInput}
                  className="px-3 py-2 bg-gold text-dark-bg font-cinzel text-xs font-semibold hover:bg-gold-light transition-all disabled:opacity-50"
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
