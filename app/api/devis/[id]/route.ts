import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const id = parseInt(params.id)
  if (isNaN(id)) return NextResponse.json({ error: 'ID invalide' }, { status: 400 })

  const body = await req.json()
  const { statut, remiseAppliquee } = body

  const existing = await prisma.devis.findUnique({ where: { id } })
  if (!existing) return NextResponse.json({ error: 'Devis introuvable' }, { status: 404 })

  const validStatuts = ['en_attente', 'accepte', 'termine', 'refuse']
  if (statut !== undefined && !validStatuts.includes(statut)) {
    return NextResponse.json({ error: 'Statut invalide' }, { status: 400 })
  }

  const updateData: Record<string, unknown> = {}

  if (statut !== undefined) updateData.statut = statut

  if (remiseAppliquee !== undefined) {
    const remise = parseFloat(remiseAppliquee)
    if (isNaN(remise) || remise < 0 || remise > 100) {
      return NextResponse.json({ error: 'Remise invalide' }, { status: 400 })
    }
    updateData.remiseAppliquee = remise
    updateData.totalFinal = existing.totalHT * (1 - remise / 100)
  }

  const updated = await prisma.devis.update({ where: { id }, data: updateData })
  return NextResponse.json(updated)
}
