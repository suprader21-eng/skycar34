import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/90 backdrop-blur-sm border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-cinzel text-2xl font-bold text-gold tracking-widest">
              SKYCAR<span className="text-white">34</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#services" className="text-sm text-[#888] hover:text-gold transition-colors tracking-wider uppercase">
              Services
            </Link>
            <Link href="/#pourquoi" className="text-sm text-[#888] hover:text-gold transition-colors tracking-wider uppercase">
              À propos
            </Link>
            <Link
              href="/devis"
              className="px-5 py-2 border border-gold text-gold font-cinzel text-sm tracking-wider hover:bg-gold hover:text-dark-bg transition-all duration-300"
            >
              Devis Gratuit
            </Link>
          </div>
          <Link
            href="/devis"
            className="md:hidden px-4 py-2 border border-gold text-gold text-xs font-cinzel tracking-wider hover:bg-gold hover:text-dark-bg transition-all"
          >
            Devis
          </Link>
        </div>
      </div>
    </nav>
  )
}
