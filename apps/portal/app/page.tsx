import { redirect } from 'next/navigation'
import { getUser, getProfile } from '../lib/auth'

export default async function PortalHome() {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  let profile = null
  try {
    profile = await getProfile(user.id)
  } catch (err) {
    console.error('[PortalHome] Failed to fetch profile', err)
  }

  if (!profile || profile.status !== 'approved') {
    redirect('/status')
  }

  if (!profile.onboarded_at) {
    redirect('/welcome')
  }

  redirect('/dashboard')
}
