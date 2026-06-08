import { prisma } from '@/lib/prisma'
import DevisAdmin from './DevisAdmin'

async function getDevis() {
  return prisma.devis.findMany({
    include: { items: { include: { service: true } } },
    orderBy: { createdAt: 'desc' },
  })
}

export default async function AdminDevisPage() {
  const devis = await getDevis()
  return <DevisAdmin initialDevis={devis} />
}
