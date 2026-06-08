import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const devis = await prisma.devis.findMany({
    include: { items: { include: { service: true } } },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(devis)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const {
    prenom, nom, email, telephone,
    marqueVoiture, modeleVoiture, message,
    serviceIds,
    cielEtoile, // { etoiles, pack, prixFinal, alcantara }
  } = body

  if (!prenom || !nom || !email || !telephone || !marqueVoiture || !modeleVoiture) {
    return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 })
  }

  const hasCielEtoile = cielEtoile && cielEtoile.etoiles > 0
  const hasServices = serviceIds && serviceIds.length > 0

  if (!hasCielEtoile && !hasServices) {
    return NextResponse.json({ error: 'Aucun service sélectionné' }, { status: 400 })
  }

  const items: { serviceId: number; quantite: number; prixUnit: number }[] = []
  let totalHT = 0

  // Ciel étoilé custom
  if (hasCielEtoile) {
    const prixEtoiles = Math.round(cielEtoile.etoiles * 0.8) // -20%
    const prixAlcantara = cielEtoile.alcantara ? 150 : 0
    const prixTotal = prixEtoiles + prixAlcantara

    items.push({
      serviceId: 1, // service ciel étoilé en DB
      quantite: 1,
      prixUnit: prixTotal,
    })
    totalHT += prixTotal
  }

  // Services supplémentaires
  if (hasServices) {
    const services = await prisma.service.findMany({
      where: { id: { in: serviceIds }, actif: true },
    })
    for (const s of services) {
      const prix = s.remise > 0 ? s.prixBase * (1 - s.remise / 100) : s.prixBase
      items.push({ serviceId: s.id, quantite: 1, prixUnit: prix })
      totalHT += prix
    }
  }

  // Construction du message final
  let messageFinal = message || ''
  if (hasCielEtoile) {
    const detail = `[Ciel Étoilé — Pack ${cielEtoile.pack} (${cielEtoile.etoiles} étoiles)${cielEtoile.alcantara ? ' + Alcantara Noir' : ''} — ${Math.round(cielEtoile.etoiles * 0.8) + (cielEtoile.alcantara ? 150 : 0)}€ (offre -20%)]`
    messageFinal = messageFinal ? `${detail}\n${messageFinal}` : detail
  }

  const devis = await prisma.devis.create({
    data: {
      prenom,
      nom,
      email,
      telephone,
      marqueVoiture,
      modeleVoiture,
      message: messageFinal || null,
      totalHT,
      remiseAppliquee: 0,
      totalFinal: totalHT,
      items: { create: items },
    },
  })

  return NextResponse.json({ id: devis.id }, { status: 201 })
}
