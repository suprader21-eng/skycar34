import { prisma } from '@/lib/prisma'
import DashboardCharts from './DashboardCharts'
import Link from 'next/link'

async function getStats() {
  const [allDevis, termines] = await Promise.all([
    prisma.devis.findMany({
      include: { items: { include: { service: true } } },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.devis.findMany({
      where: { statut: 'termine' },
      include: { items: { include: { service: true } } },
    }),
  ])

  const ca = termines.reduce((sum, d) => sum + d.totalFinal, 0)
  const coutTotal = termines.reduce(
    (sum, d) => sum + d.items.reduce((s, i) => s + i.service.coutProduit * i.quantite, 0),
    0
  )
  const benefice = ca - coutTotal
  const marge = ca > 0 ? ((benefice / ca) * 100).toFixed(1) : '0.0'

  const now = new Date()
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1)
    const label = d.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' })
    const monthDevis = termines.filter((dv) => {
      const cd = new Date(dv.createdAt)
      return cd.getFullYear() === d.getFullYear() && cd.getMonth() === d.getMonth()
    })
    const ca = monthDevis.reduce((s, dv) => s + dv.totalFinal, 0)
    return { label, ca }
  })

  return {
    total: allDevis.length,
    enAttente: allDevis.filter((d) => d.statut === 'en_attente').length,
    acceptes: allDevis.filter((d) => d.statut === 'accepte').length,
    termines: termines.length,
    refuses: allDevis.filter((d) => d.statut === 'refuse').length,
    ca,
    benefice,
    marge,
    monthlyData,
    derniers: allDevis.slice(0, 5),
  }
}

const statutLabel: Record<string, { label: string; color: string }> = {
  en_attente: { label: 'En attente', color: 'text-amber-400 bg-amber-400/10 border-amber-400/30' },
  accepte: { label: 'Accepté', color: 'text-blue-400 bg-blue-400/10 border-blue-400/30' },
  termine: { label: 'Terminé', color: 'text-green-400 bg-green-400/10 border-green-400/30' },
  refuse: { label: 'Refusé', color: 'text-red-400 bg-red-400/10 border-red-400/30' },
}

export default async function DashboardPage() {
  const stats = await getStats()

  const kpis = [
    { label: 'Devis reçus', value: stats.total, sub: 'total' },
    { label: 'En attente', value: stats.enAttente, sub: 'à traiter' },
    { label: 'Terminés', value: stats.termines, sub: 'projets réalisés' },
    { label: "Chiffre d'affaires", value: `${stats.ca.toFixed(0)}€`, sub: 'devis terminés' },
    { label: 'Bénéfice net', value: `${stats.benefice.toFixed(0)}€`, sub: 'après coûts' },
    { label: 'Marge moyenne', value: `${stats.marge}%`, sub: 'sur les terminés' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-cinzel text-2xl font-bold text-white tracking-wider">Tableau de Bord</h1>
        <p className="text-[#555] text-sm mt-1">Vue d&apos;ensemble de votre activité</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-dark-surface border border-dark-border p-5">
            <p className="text-xs text-[#555] uppercase tracking-wider mb-2">{kpi.label}</p>
            <p className="font-cinzel text-3xl font-bold text-gold">{kpi.value}</p>
            <p className="text-xs text-[#555] mt-1">{kpi.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-dark-surface border border-dark-border p-6 mb-8">
        <h2 className="font-cinzel text-lg font-semibold text-white mb-6 tracking-wide">
          Chiffre d&apos;affaires — 6 derniers mois
        </h2>
        <DashboardCharts data={stats.monthlyData} />
      </div>

      <div className="bg-dark-surface border border-dark-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-cinzel text-lg font-semibold text-white tracking-wide">Derniers Devis</h2>
          <Link href="/admin/devis" className="text-xs text-gold hover:underline tracking-wider">
            Voir tout →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dark-border">
                {['#', 'Date', 'Client', 'Véhicule', 'Total', 'Statut'].map((h) => (
                  <th key={h} className="text-left py-3 px-3 text-xs text-[#555] uppercase tracking-wider font-normal">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stats.derniers.map((d) => {
                const s = statutLabel[d.statut] ?? { label: d.statut, color: 'text-[#888]' }
                return (
                  <tr key={d.id} className="border-b border-dark-border/50 hover:bg-white/2">
                    <td className="py-3 px-3 text-gold font-cinzel font-semibold">#{d.id}</td>
                    <td className="py-3 px-3 text-[#888]">
                      {new Date(d.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-3 px-3 text-white">
                      {d.prenom} {d.nom}
                    </td>
                    <td className="py-3 px-3 text-[#888]">
                      {d.marqueVoiture} {d.modeleVoiture}
                    </td>
                    <td className="py-3 px-3 font-cinzel font-bold text-gold">{d.totalFinal.toFixed(0)}€</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-1 text-xs border ${s.color}`}>{s.label}</span>
                    </td>
                  </tr>
                )
              })}
              {stats.derniers.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#555]">
                    Aucun devis pour le moment
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
