'use client'

import { usePathname } from 'next/navigation'
import Sidebar from '@/components/admin/Sidebar'

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen bg-[#02020a]">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-[#02020a]">{children}</main>
    </div>
  )
}
