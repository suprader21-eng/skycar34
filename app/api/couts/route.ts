import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const services = await prisma.service.findMany({ orderBy: { id: 'asc' } })
  return NextResponse.json(services)
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const body = await req.json()
  const { id, coutProduit } = body

  if (!id || coutProduit === undefined) {
    return NextResponse.json({ error: 'Paramètres manquants' }, { status: 400 })
  }

  const cout = parseFloat(coutProduit)
  if (isNaN(cout) || cout < 0) {
    return NextResponse.json({ error: 'Coût invalide' }, { status: 400 })
  }

  const updated = await prisma.service.update({
    where: { id: parseInt(id) },
    data: { coutProduit: cout },
  })

  return NextResponse.json(updated)
}
