import { redirect } from 'next/navigation'
import { requireUser, getProfile } from '../../lib/auth'
import { WelcomeView } from './WelcomeView'

export const metadata = {
  title: 'Welcome to Burlington Consult',
}

export default async function WelcomePage() {
  const user = await requireUser()
  const profile = await getProfile(user.id)

  if (!profile || profile.status !== 'approved') {
    redirect('/status')
  }

  if (profile.onboarded_at) {
    redirect('/dashboard')
  }

  const displayName = profile.preferred_name || profile.given_name || profile.full_name

  return <WelcomeView displayName={displayName} />
}
