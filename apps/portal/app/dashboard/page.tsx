import { redirect } from 'next/navigation'
import { requireUser, getProfile } from '../../lib/auth'
import { SignOutButton } from './SignOutButton'

export const metadata = {
  title: 'Dashboard',
}

export default async function DashboardPage() {
  const user = await requireUser()
  const profile = await getProfile(user.id)

  if (!profile || profile.status !== 'approved') {
    redirect('/status')
  }

  if (!profile.onboarded_at) {
    redirect('/welcome')
  }

  return (
    <main className="flex min-h-dvh items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <h1 className="mb-3 font-serif text-2xl font-medium tracking-tight text-burl-gray-700">
          Welcome, {profile.preferred_name || profile.full_name}.
        </h1>
        <p className="mb-8 text-[0.875rem] leading-relaxed text-burl-gray-400">
          Your dashboard is being built. We will notify you when your full client portal is ready.
        </p>
        <SignOutButton />
      </div>
    </main>
  )
}
