import { prisma } from '@/lib/prisma'
import ServicesAdmin from './ServicesAdmin'

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { id: 'asc' } })
  return <ServicesAdmin initialServices={services} />
}
