'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    setLoading(false)
    if (res?.ok) {
      router.push('/admin/dashboard')
    } else {
      setError('Email ou mot de passe incorrect.')
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <span className="font-cinzel text-3xl font-bold text-gold tracking-widest">
            SKYCAR<span className="text-white">34</span>
          </span>
          <p className="text-xs text-[#555] mt-2 tracking-[0.3em] uppercase">Espace Administration</p>
        </div>
        <div className="bg-dark-surface border border-dark-border p-8">
          <h1 className="font-cinzel text-xl font-semibold text-white tracking-wide mb-8">Connexion</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs text-[#888] uppercase tracking-wider block mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-dark-bg border border-dark-border text-white placeholder-[#444] px-4 py-3 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
                placeholder="admin@skycar34.fr"
              />
            </div>
            <div>
              <label className="text-xs text-[#888] uppercase tracking-wider block mb-2">Mot de passe</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-dark-bg border border-dark-border text-white placeholder-[#444] px-4 py-3 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
                placeholder="••••••••"
              />
            </div>
            {error && (
              <div className="p-3 border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gold text-dark-bg font-cinzel font-semibold text-sm tracking-widest hover:bg-gold-light transition-all disabled:opacity-50"
            >
              {loading ? 'Connexion...' : 'Se Connecter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
