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
  const { prenom, nom, email, telephone, marqueVoiture, modeleVoiture, message, serviceIds } = body

  if (!prenom || !nom || !email || !telephone || !marqueVoiture || !modeleVoiture) {
    return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 })
  }
  if (!serviceIds || serviceIds.length === 0) {
    return NextResponse.json({ error: 'Aucun service sélectionné' }, { status: 400 })
  }

  const services = await prisma.service.findMany({
    where: { id: { in: serviceIds }, actif: true },
  })

  if (services.length === 0) {
    return NextResponse.json({ error: 'Services introuvables' }, { status: 400 })
  }

  const items = services.map((s) => ({
    serviceId: s.id,
    quantite: 1,
    prixUnit: s.remise > 0 ? s.prixBase * (1 - s.remise / 100) : s.prixBase,
  }))

  const totalHT = items.reduce((sum, i) => sum + i.prixUnit, 0)
  const totalFinal = totalHT

  const devis = await prisma.devis.create({
    data: {
      prenom,
      nom,
      email,
      telephone,
      marqueVoiture,
      modeleVoiture,
      message: message || null,
      totalHT,
      remiseAppliquee: 0,
      totalFinal,
      items: {
        create: items,
      },
    },
  })

  return NextResponse.json({ id: devis.id }, { status: 201 })
}
