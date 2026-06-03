import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { signOut } from '@/app/actions/auth'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')
  // user is guaranteed non-null past this point
  const authedUser = user!

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', authedUser.id)
    .maybeSingle() as { data: { full_name: string | null } | null }

  const { data: streak } = await supabase
    .from('streaks')
    .select('*')
    .eq('user_id', authedUser.id)
    .maybeSingle() as { data: { current_streak: number; longest_streak: number } | null }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Welcome back, {profile?.full_name ?? authedUser.email}
          </h1>
          <form action={signOut}>
            <button
              type="submit"
              className="text-sm text-gray-600 hover:text-black underline"
            >
              Sign out
            </button>
          </form>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-sm text-gray-500">Current streak</p>
            <p className="text-4xl font-bold mt-1">{streak?.current_streak ?? 0}</p>
            <p className="text-sm text-gray-400 mt-1">days</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-sm text-gray-500">Longest streak</p>
            <p className="text-4xl font-bold mt-1">{streak?.longest_streak ?? 0}</p>
            <p className="text-sm text-gray-400 mt-1">days</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">
            Your Versio journey starts here. Goals, struggles, and check-ins coming soon.
          </p>
        </div>
      </div>
    </main>
  )
}
