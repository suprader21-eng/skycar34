'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

interface Service {
  id: number
  nom: string
  description: string
  prixBase: number
  remise: number
}

interface FormData {
  prenom: string
  nom: string
  email: string
  telephone: string
  marqueVoiture: string
  modeleVoiture: string
  message: string
}

const initialForm: FormData = {
  prenom: '',
  nom: '',
  email: '',
  telephone: '',
  marqueVoiture: '',
  modeleVoiture: '',
  message: '',
}

const inputClass =
  'w-full bg-dark-surface border border-dark-border text-white placeholder-[#444] px-4 py-3 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors'

export default function DevisPage() {
  const [step, setStep] = useState(1)
  const [services, setServices] = useState<Service[]>([])
  const [form, setForm] = useState<FormData>(initialForm)
  const [selectedServices, setSelectedServices] = useState<number[]>([])
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [submitting, setSubmitting] = useState(false)
  const [devisId, setDevisId] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/services')
      .then((r) => r.json())
      .then((data) => setServices(data))
  }, [])

  const getPrix = (s: Service) => (s.remise > 0 ? s.prixBase * (1 - s.remise / 100) : s.prixBase)

  const total = selectedServices.reduce((sum, id) => {
    const s = services.find((sv) => sv.id === id)
    return sum + (s ? getPrix(s) : 0)
  }, 0)

  const validateStep1 = () => {
    const e: Partial<FormData> = {}
    if (!form.prenom.trim()) e.prenom = 'Le prénom est requis'
    if (!form.nom.trim()) e.nom = 'Le nom est requis'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Email invalide'
    if (!form.telephone.match(/^[0-9+\s]{8,15}$/)) e.telephone = 'Téléphone invalide'
    if (!form.marqueVoiture.trim()) e.marqueVoiture = 'La marque est requise'
    if (!form.modeleVoiture.trim()) e.modeleVoiture = 'Le modèle est requis'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return
    if (step === 2 && selectedServices.length === 0) return
    setStep((s) => s + 1)
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, serviceIds: selectedServices }),
      })
      const data = await res.json()
      if (res.ok) {
        setDevisId(data.id)
        setStep(4)
      }
    } finally {
      setSubmitting(false)
    }
  }

  const toggleService = (id: number) => {
    setSelectedServices((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  if (step === 4) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-gold text-5xl mb-6">◈</div>
          <h2 className="font-cinzel text-3xl font-bold text-white mb-4 tracking-wider">Devis Envoyé !</h2>
          <p className="text-[#888] mb-2">
            Votre demande de devis <span className="text-gold font-semibold">#{devisId}</span> a bien été reçue.
          </p>
          <p className="text-[#888] mb-8">
            Un email de confirmation a été envoyé à <span className="text-white">{form.email}</span>. Nous vous répondrons sous 24h.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 border border-gold text-gold font-cinzel text-sm tracking-wider hover:bg-gold hover:text-dark-bg transition-all"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">Gratuit & Sans Engagement</p>
            <h1 className="font-cinzel text-3xl font-bold text-white tracking-wider">Demander un Devis</h1>
            <div className="w-16 h-px bg-gold mx-auto mt-4" />
          </div>

          {/* Stepper */}
          <div className="flex items-center justify-center mb-10 gap-0">
            {[
              { n: 1, label: 'Vos Infos' },
              { n: 2, label: 'Services' },
              { n: 3, label: 'Confirmation' },
            ].map(({ n, label }, i) => (
              <div key={n} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 flex items-center justify-center border font-cinzel text-sm font-bold transition-all ${
                      step >= n ? 'border-gold bg-gold text-dark-bg' : 'border-dark-border text-[#555]'
                    }`}
                  >
                    {n}
                  </div>
                  <span className={`text-xs mt-2 tracking-wide ${step >= n ? 'text-gold' : 'text-[#555]'}`}>{label}</span>
                </div>
                {i < 2 && (
                  <div className={`w-16 h-px mb-5 mx-2 ${step > n ? 'bg-gold' : 'bg-dark-border'}`} />
                )}
              </div>
            ))}
          </div>

          <div className="bg-dark-surface border border-dark-border p-8">
            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="font-cinzel text-xl text-white tracking-wide mb-6">Vos Informations</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#888] uppercase tracking-wider block mb-2">Prénom *</label>
                    <input
                      className={inputClass}
                      placeholder="Jean"
                      value={form.prenom}
                      onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                    />
                    {errors.prenom && <p className="text-red-400 text-xs mt-1">{errors.prenom}</p>}
                  </div>
                  <div>
                    <label className="text-xs text-[#888] uppercase tracking-wider block mb-2">Nom *</label>
                    <input
                      className={inputClass}
                      placeholder="Dupont"
                      value={form.nom}
                      onChange={(e) => setForm({ ...form, nom: e.target.value })}
                    />
                    {errors.nom && <p className="text-red-400 text-xs mt-1">{errors.nom}</p>}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[#888] uppercase tracking-wider block mb-2">Email *</label>
                  <input
                    className={inputClass}
                    type="email"
                    placeholder="jean.dupont@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="text-xs text-[#888] uppercase tracking-wider block mb-2">Téléphone *</label>
                  <input
                    className={inputClass}
                    type="tel"
                    placeholder="06 12 34 56 78"
                    value={form.telephone}
                    onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                  />
                  {errors.telephone && <p className="text-red-400 text-xs mt-1">{errors.telephone}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#888] uppercase tracking-wider block mb-2">Marque *</label>
                    <input
                      className={inputClass}
                      placeholder="BMW"
                      value={form.marqueVoiture}
                      onChange={(e) => setForm({ ...form, marqueVoiture: e.target.value })}
                    />
                    {errors.marqueVoiture && <p className="text-red-400 text-xs mt-1">{errors.marqueVoiture}</p>}
                  </div>
                  <div>
                    <label className="text-xs text-[#888] uppercase tracking-wider block mb-2">Modèle *</label>
                    <input
                      className={inputClass}
                      placeholder="Série 3"
                      value={form.modeleVoiture}
                      onChange={(e) => setForm({ ...form, modeleVoiture: e.target.value })}
                    />
                    {errors.modeleVoiture && <p className="text-red-400 text-xs mt-1">{errors.modeleVoiture}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div>
                <h2 className="font-cinzel text-xl text-white tracking-wide mb-6">Sélectionnez vos Services</h2>
                {selectedServices.length === 0 && (
                  <p className="text-amber-400 text-xs mb-4">Veuillez sélectionner au moins un service.</p>
                )}
                <div className="space-y-3">
                  {services.map((s) => {
                    const prix = getPrix(s)
                    const selected = selectedServices.includes(s.id)
                    return (
                      <label
                        key={s.id}
                        className={`flex items-start gap-4 p-4 border cursor-pointer transition-all ${
                          selected ? 'border-gold bg-gold/5' : 'border-dark-border hover:border-gold/40'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleService(s.id)}
                          className="mt-1 accent-[#C9A84C] w-4 h-4 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-cinzel text-sm font-semibold text-white">{s.nom}</p>
                          <p className="text-xs text-[#888] mt-1 leading-relaxed">{s.description}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-cinzel font-bold text-gold">{prix.toFixed(0)}€</p>
                          {s.remise > 0 && (
                            <p className="text-xs text-[#555] line-through">{s.prixBase}€</p>
                          )}
                        </div>
                      </label>
                    )
                  })}
                </div>
                {selectedServices.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-dark-border flex justify-between items-center">
                    <span className="text-[#888] text-sm">Total estimé</span>
                    <span className="font-cinzel text-2xl font-bold text-gold">{total.toFixed(0)}€</span>
                  </div>
                )}
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div>
                <h2 className="font-cinzel text-xl text-white tracking-wide mb-6">Récapitulatif de votre Devis</h2>
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-[#555] text-xs uppercase tracking-wider mb-1">Client</p>
                      <p className="text-white">{form.prenom} {form.nom}</p>
                    </div>
                    <div>
                      <p className="text-[#555] text-xs uppercase tracking-wider mb-1">Véhicule</p>
                      <p className="text-white">{form.marqueVoiture} {form.modeleVoiture}</p>
                    </div>
                    <div>
                      <p className="text-[#555] text-xs uppercase tracking-wider mb-1">Email</p>
                      <p className="text-white">{form.email}</p>
                    </div>
                    <div>
                      <p className="text-[#555] text-xs uppercase tracking-wider mb-1">Téléphone</p>
                      <p className="text-white">{form.telephone}</p>
                    </div>
                  </div>
                  <div className="border-t border-dark-border pt-4">
                    <p className="text-[#555] text-xs uppercase tracking-wider mb-3">Services sélectionnés</p>
                    <div className="space-y-2">
                      {selectedServices.map((id) => {
                        const s = services.find((sv) => sv.id === id)!
                        return (
                          <div key={id} className="flex justify-between items-center text-sm">
                            <span className="text-white">{s.nom}</span>
                            <span className="text-gold font-cinzel font-semibold">{getPrix(s).toFixed(0)}€</span>
                          </div>
                        )
                      })}
                    </div>
                    <div className="flex justify-between items-center pt-3 mt-3 border-t border-dark-border">
                      <span className="font-cinzel font-semibold text-white">Total</span>
                      <span className="font-cinzel text-2xl font-bold text-gold">{total.toFixed(0)}€</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[#888] uppercase tracking-wider block mb-2">Message (optionnel)</label>
                  <textarea
                    className={`${inputClass} resize-none h-24`}
                    placeholder="Informations supplémentaires, questions..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-dark-border">
              {step > 1 ? (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="px-6 py-3 border border-dark-border text-[#888] font-cinzel text-sm tracking-wider hover:border-gold hover:text-gold transition-all"
                >
                  Retour
                </button>
              ) : (
                <div />
              )}
              {step < 3 ? (
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-gold text-dark-bg font-cinzel font-semibold text-sm tracking-widest hover:bg-gold-light transition-all"
                >
                  Étape suivante →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="px-8 py-3 bg-gold text-dark-bg font-cinzel font-semibold text-sm tracking-widest hover:bg-gold-light transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Envoi...' : 'Envoyer le Devis →'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
