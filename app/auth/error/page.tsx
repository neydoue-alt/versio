import Link from 'next/link'

export default function AuthErrorPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Authentication error</h1>
        <p className="text-gray-600">
          Something went wrong during sign-in. Please try again.
        </p>
        <Link href="/login" className="inline-block underline font-medium">
          Back to login
        </Link>
      </div>
    </main>
  )
}
