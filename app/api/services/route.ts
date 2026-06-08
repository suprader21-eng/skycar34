import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const services = await prisma.service.findMany({
    where: { actif: true },
    orderBy: { id: 'asc' },
  })
  return NextResponse.json(services)
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const body = await req.json()
  const { id, nom, description, prixBase, remise, actif } = body

  if (!id) return NextResponse.json({ error: 'ID manquant' }, { status: 400 })

  const updated = await prisma.service.update({
    where: { id: parseInt(id) },
    data: {
      ...(nom !== undefined && { nom }),
      ...(description !== undefined && { description }),
      ...(prixBase !== undefined && { prixBase: parseFloat(prixBase) }),
      ...(remise !== undefined && { remise: parseFloat(remise) }),
      ...(actif !== undefined && { actif: Boolean(actif) }),
    },
  })

  return NextResponse.json(updated)
}
