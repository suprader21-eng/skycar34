import { prisma } from '@/lib/prisma'
import CoutsAdmin from './CoutsAdmin'

export default async function AdminCoutsPage() {
  const services = await prisma.service.findMany({ orderBy: { id: 'asc' } })
  return <CoutsAdmin initialServices={services} />
}
