'use client'

import { useEffect, useState } from 'react'

type Service = {
  id: number
  nom: string
  prixBase: number
  coutProduit: number
  remise: number
}

export default function CoutsAdmin() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [inputs, setInputs] = useState<Record<number, string>>({})
  const [saving, setSaving] = useState<number | null>(null)
  const [saved, setSaved] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/services/all')
      .then((r) => r.json())
      .then((data) => { setServices(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

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
  }

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="font-cinzel text-2xl font-bold text-white tracking-wider mb-2">Coûts Produits</h1>
        <p className="text-[#444] text-sm mt-8 text-center">Chargement...</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-cinzel text-2xl font-bold text-white tracking-wider">Coûts Produits</h1>
        <p className="text-[#444] text-sm mt-1">Mettez à jour les coûts pour calculer vos marges</p>
      </div>

      <div className="bg-[#07070f] border border-white/5 overflow-hidden rounded">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              {['Service', 'Prix client', 'Coût actuel', 'Marge', 'Nouveau coût', 'Action'].map((h) => (
                <th key={h} className="text-left py-4 px-5 text-xs text-[#444] uppercase tracking-wider font-normal">
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
                ? getMarge(s.prixBase, previewCout) : null

              return (
                <tr key={s.id} className="border-b border-white/3 hover:bg-white/2">
                  <td className="py-4 px-5">
                    <p className="font-cinzel text-white font-semibold text-sm">{s.nom}</p>
                  </td>
                  <td className="py-4 px-5">
                    <span className="text-gold font-cinzel font-bold">{s.prixBase}€</span>
                  </td>
                  <td className="py-4 px-5">
                    <span className="text-[#666]">{s.coutProduit}€</span>
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
                      type="number" min="0" step="0.5"
                      placeholder={String(s.coutProduit)}
                      value={inputs[s.id] ?? ''}
                      onChange={(e) => setInputs((prev) => ({ ...prev, [s.id]: e.target.value }))}
                      className="w-28 bg-[#0a0a14] border border-white/10 text-white px-3 py-2 text-sm focus:border-gold focus:outline-none rounded"
                    />
                  </td>
                  <td className="py-4 px-5">
                    <button
                      onClick={() => handleSave(s.id)}
                      disabled={saving === s.id || !inputs[s.id]}
                      className={`px-4 py-2 font-cinzel text-xs font-semibold tracking-wider transition-all rounded ${
                        saved === s.id
                          ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                          : 'bg-gold text-[#02020a] hover:bg-gold-light disabled:opacity-30 disabled:cursor-not-allowed'
                      }`}
                    >
                      {saving === s.id ? '...' : saved === s.id ? '✓ OK' : 'Mettre à jour'}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-[#333]">
        Formule : <span className="font-mono text-[#444]">((Prix − Coût) / Prix) × 100</span>
      </p>
    </div>
  )
}
