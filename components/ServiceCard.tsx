interface ServiceCardProps {
  nom: string
  description: string
  prixBase: number
  remise: number
}

export default function ServiceCard({ nom, description, prixBase, remise }: ServiceCardProps) {
  const prixFinal = remise > 0 ? prixBase * (1 - remise / 100) : prixBase

  return (
    <div className="group relative bg-dark-surface border border-dark-border hover:border-gold transition-all duration-500 p-6 flex flex-col gap-4">
      <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative">
        <div className="w-8 h-px bg-gold mb-4" />
        <h3 className="font-cinzel text-lg font-semibold text-white tracking-wide">{nom}</h3>
        <p className="mt-2 text-sm text-[#888] leading-relaxed">{description}</p>
      </div>
      <div className="relative mt-auto">
        {remise > 0 ? (
          <div className="flex items-center gap-3">
            <span className="font-cinzel text-2xl font-bold text-gold">{prixFinal.toFixed(0)}€</span>
            <div className="flex flex-col">
              <span className="text-xs text-[#555] line-through">{prixBase}€</span>
              <span className="text-xs text-green-400">-{remise}%</span>
            </div>
          </div>
        ) : (
          <span className="font-cinzel text-2xl font-bold text-gold">{prixBase}€</span>
        )}
        <p className="text-xs text-[#555] mt-1">À partir de</p>
      </div>
    </div>
  )
}
