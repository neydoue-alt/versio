'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signUp, signInWithGoogle } from '@/app/actions/auth'

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)
    const result = await signUp(new FormData(e.currentTarget))
    if (result?.error) setError(result.error)
    else if (result?.success) setSuccess(result.success)
    setLoading(false)
  }

  async function handleGoogle() {
    setError(null)
    const result = await signInWithGoogle()
    if (result?.error) setError(result.error)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-3xl font-bold text-center">Create your account</h1>

        {success ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 text-sm">
            {success}
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="full_name"
                type="text"
                placeholder="Full name"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                name="password"
                type="password"
                placeholder="Password (min 8 characters)"
                minLength={8}
                required
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white rounded-lg py-2 font-medium hover:bg-gray-800 disabled:opacity-50"
              >
                {loading ? 'Creating account…' : 'Create account'}
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-gray-50 px-2 text-gray-500">or</span>
              </div>
            </div>

            <form action={handleGoogle}>
              <button
                type="submit"
                className="w-full border rounded-lg py-2 font-medium hover:bg-gray-100 flex items-center justify-center gap-2"
              >
                Continue with Google
              </button>
            </form>
          </>
        )}

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}
