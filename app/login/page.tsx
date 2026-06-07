'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signIn, signInWithGoogle } from '@/app/actions/auth'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const result = await signIn(new FormData(e.currentTarget))
    if (result?.error) setError(result.error)
    setLoading(false)
  }

  async function handleGoogle() {
    setError(null)
    const result = await signInWithGoogle()
    if (result?.error) setError(result.error)
  }

  return (
    <div style={{ background: '#000' }}>
      <div className="scene" aria-hidden="true" />
      <div className="m-halo" aria-hidden="true"><div className="l l1" /><div className="l l2" /><div className="l l3" /></div>
      <div className="m-wrap">
        <nav className="m-nav">
          <div className="m-nav-pill"><Link href="/" className="m-brand"><span className="dot" />VERSIO</Link></div>
          <Link href="/" className="m-back">← Back home</Link>
        </nav>
        <main className="m-main">
          <div className="m-container" style={{ maxWidth: 480 }}>
            <div className="m-kicker">WELCOME BACK</div>
            <h1 className="font-display" style={{ fontSize: 'clamp(40px,5vw,64px)', lineHeight: 0.9, letterSpacing: '-0.03em', textTransform: 'uppercase', margin: '0 0 20px' }}>LOG IN.</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: 36, lineHeight: 1.7 }}>Pick up exactly where you left off.</p>
            <div className="m-glass" style={{ padding: 32 }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <Field label="Email"><input name="email" type="email" placeholder="you@example.com" required style={inputStyle} /></Field>
                <Field label="Password"><input name="password" type="password" placeholder="•••••••••" required style={inputStyle} /></Field>
                {error && <p style={{ color: '#ff9bb3', fontSize: 13, margin: 0 }}>{error}</p>}
                <button type="submit" disabled={loading} className="m-nt primary" style={{ marginTop: 14, justifyContent: 'center' }}>
                  {loading ? 'Logging in…' : 'Log in →'}
                </button>
              </form>
              <div className="or" style={orStyle}>or</div>
              <button type="button" onClick={handleGoogle} className="m-nt" style={{ width: '100%', justifyContent: 'center' }}>
                Continue with Google
              </button>
              <div style={{ textAlign: 'center', marginTop: 20, color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
                No account yet? <Link href="/signup" style={{ color: '#fff', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)' }}>Sign up free</Link>
              </div>
            </div>
          </div>
        </main>
        <footer className="m-footer">© 2026 VERSIO. ALL RIGHTS RESERVED.</footer>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={{ fontSize: 11, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>{label}</label>
      {children}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  height: 48, padding: '0 18px', borderRadius: 999, border: 0,
  background: 'rgba(255,255,255,0.06)', color: '#fff', font: 'inherit', outline: 'none',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10), inset 0 0 0 1px rgba(255,255,255,0.08)',
}

const orStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 14, margin: '20px 0',
  color: 'rgba(255,255,255,0.45)', fontSize: 11, letterSpacing: '0.30em', textTransform: 'uppercase',
}
