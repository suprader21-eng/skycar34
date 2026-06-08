'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

const links = [
  { href: '/admin/dashboard', label: 'Tableau de bord', icon: '◈' },
  { href: '/admin/devis', label: 'Devis', icon: '◉' },
  { href: '/admin/services', label: 'Services & Prix', icon: '◆' },
  { href: '/admin/couts', label: 'Coûts produits', icon: '◇' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen bg-dark-surface border-r border-dark-border flex flex-col">
      <div className="p-6 border-b border-dark-border">
        <Link href="/" className="font-cinzel text-xl font-bold text-gold tracking-widest">
          SKYCAR<span className="text-white">34</span>
        </Link>
        <p className="text-xs text-[#555] mt-1 tracking-widest uppercase">Administration</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-gold/10 text-gold border-l-2 border-gold pl-3.5'
                  : 'text-[#888] hover:text-white hover:bg-white/5 border-l-2 border-transparent'
              }`}
            >
              <span className="text-xs">{link.icon}</span>
              <span className="tracking-wide">{link.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-dark-border">
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#555] hover:text-red-400 transition-colors"
        >
          <span className="text-xs">⊗</span>
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  )
}
