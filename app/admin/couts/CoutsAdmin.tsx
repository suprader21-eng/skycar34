'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Service = {
  id: number
  nom: string
  prixBase: number
  coutProduit: number
  remise: number
}

export default function CoutsAdmin({ initialServices }: { initialServices: Service[] }) {
  const router = useRouter()
  const [services, setServices] = useState(initialServices)
  const [inputs, setInputs] = useState<Record<number, string>>({})
  const [saving, setSaving] = useState<number | null>(null)
  const [saved, setSaved] = useState<number | null>(null)

  const getMarge = (prixBase: number, cout: number) =>
    prixBase > 0 ? (((prixBase - cout) / prixBase) * 100).toFixed(1) : '0.0'

  const handleSave = async (id: number) => {
    const val = parseFloat(inputs[id] ?? '')
    if (isNaN(val) || val < 0) return
    setSaving(id)
    await fetch('/api/couts', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, coutProduit: val }),
    })
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, coutProduit: val } : s)))
    setInputs((prev) => { const n = { ...prev }; delete n[id]; return n })
    setSaving(null)
    setSaved(id)
    setTimeout(() => setSaved(null), 2000)
    router.refresh()
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-cinzel text-2xl font-bold text-white tracking-wider">Coûts Produits</h1>
        <p className="text-[#555] text-sm mt-1">Mettez à jour le coût des produits pour calculer vos marges</p>
      </div>

      <div className="bg-dark-surface border border-dark-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-dark-border">
              {['Service', 'Prix client', 'Coût actuel', 'Marge actuelle', 'Nouveau coût', 'Action'].map((h) => (
                <th key={h} className="text-left py-4 px-5 text-xs text-[#555] uppercase tracking-wider font-normal">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {services.map((s) => {
              const margeActuelle = getMarge(s.prixBase, s.coutProduit)
              const previewCout = inputs[s.id] !== undefined ? parseFloat(inputs[s.id]) : null
              const margePreview = previewCout !== null && !isNaN(previewCout)
                ? getMarge(s.prixBase, previewCout)
                : null

              return (
                <tr key={s.id} className="border-b border-dark-border/50 hover:bg-white/2">
                  <td className="py-4 px-5">
                    <p className="font-cinzel text-white font-semibold">{s.nom}</p>
                  </td>
                  <td className="py-4 px-5">
                    <span className="text-gold font-cinzel font-bold">{s.prixBase}€</span>
                  </td>
                  <td className="py-4 px-5">
                    <span className="text-[#888]">{s.coutProduit}€</span>
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <span className="font-cinzel font-bold text-gold">{margeActuelle}%</span>
                      {margePreview !== null && (
                        <span className={`text-xs ${parseFloat(margePreview) > parseFloat(margeActuelle) ? 'text-green-400' : 'text-red-400'}`}>
                          → {margePreview}%
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      placeholder={String(s.coutProduit)}
                      value={inputs[s.id] ?? ''}
                      onChange={(e) => setInputs((prev) => ({ ...prev, [s.id]: e.target.value }))}
                      className="w-28 bg-dark-bg border border-dark-border text-white px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </td>
                  <td className="py-4 px-5">
                    <button
                      onClick={() => handleSave(s.id)}
                      disabled={saving === s.id || inputs[s.id] === undefined || inputs[s.id] === ''}
                      className={`px-4 py-2 font-cinzel text-xs font-semibold tracking-wider transition-all ${
                        saved === s.id
                          ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                          : 'bg-gold text-dark-bg hover:bg-gold-light disabled:opacity-30 disabled:cursor-not-allowed'
                      }`}
                    >
                      {saving === s.id ? '...' : saved === s.id ? '✓' : 'Mettre à jour'}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 border border-dark-border bg-dark-surface/50 text-xs text-[#555]">
        <p>Formule marge : <span className="text-[#888] font-mono">((Prix client − Coût produit) / Prix client) × 100</span></p>
        <p className="mt-1">Ces coûts ne sont pas affichés aux clients — ils servent uniquement au calcul de vos bénéfices dans le tableau de bord.</p>
      </div>
    </div>
  )
}
