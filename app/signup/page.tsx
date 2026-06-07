'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signUp, signInWithGoogle } from '@/app/actions/auth'

export default function SignupPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const form = e.currentTarget
    const data = new FormData(form)
    const name = (data.get('name') as string)?.trim() || 'Friend'
    data.set('full_name', name)
    const result = await signUp(data)
    setLoading(false)
    if (result?.error) { setError(result.error); return }
    router.push(`/onboarding?name=${encodeURIComponent(name)}`)
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
        <main className="m-main" style={{ padding: '40px 48px 80px' }}>
          <div className="m-container" style={{ maxWidth: 480 }}>
            <div className="m-kicker">START FREE</div>
            <h1 className="font-display" style={{ fontSize: 'clamp(40px,5vw,64px)', lineHeight: 0.9, letterSpacing: '-0.03em', textTransform: 'uppercase', margin: '0 0 18px' }}>CREATE YOUR<br/>VERSIO.</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', margin: '0 0 32px', lineHeight: 1.7 }}>A 60-second onboarding. Tell us what you&apos;re working through and we&apos;ll build the dashboard around it.</p>
            <div className="m-glass" style={{ padding: 30 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button type="button" onClick={handleGoogle} className="social-btn google" style={socialBase('#fff', '#0b0612')}>
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4-5.5 4-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.3 14.6 2.3 12 2.3 6.7 2.3 2.5 6.6 2.5 12s4.2 9.7 9.5 9.7c5.5 0 9.1-3.9 9.1-9.3 0-.6-.1-1.1-.2-1.6H12z"/>
                  </svg>
                  Continue with Google
                </button>
              </div>

              <div className="or" style={orStyle}>or with email</div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <Field label="Name"><input name="name" type="text" placeholder="Your name" required style={inputStyle} /></Field>
                <Field label="Email"><input name="email" type="email" placeholder="you@example.com" required style={inputStyle} /></Field>
                <Field label="Password"><input name="password" type="password" placeholder="•••••••••" required minLength={8} style={inputStyle} /></Field>
                {error && <p style={{ color: '#ff9bb3', fontSize: 13, margin: 0 }}>{error}</p>}
                <button type="submit" disabled={loading} className="m-nt primary" style={{ marginTop: 14, justifyContent: 'center' }}>
                  {loading ? 'Creating account…' : 'Create account →'}
                </button>
              </form>
              <div style={{ textAlign: 'center', marginTop: 20, color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
                Already have an account? <Link href="/login" style={{ color: '#fff', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)' }}>Log in</Link>
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
  display: 'flex', alignItems: 'center', gap: 14, margin: '24px 0',
  color: 'rgba(255,255,255,0.45)', fontSize: 11, letterSpacing: '0.30em', textTransform: 'uppercase',
}

function socialBase(bg: string, color: string): React.CSSProperties {
  return {
    height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
    borderRadius: 999, border: 0, cursor: 'pointer', width: '100%',
    fontFamily: 'inherit', fontWeight: 600, fontSize: 14,
    background: bg, color,
    boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.08), 0 14px 32px -16px rgba(255,255,255,0.30)',
  }
}
