import { redirect } from 'next/navigation'
import { createServerClient } from '@burlington/shared/src/supabase/server'

export async function getUser() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function requireUser() {
  const user = await getUser()
  if (!user) redirect('/login')
  return user
}

export async function getProfile(userId: string) {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('[getProfile] Failed to fetch profile', { userId })
    return null
  }

  return data
}

export async function requireAdmin() {
  const user = await requireUser()
  const profile = await getProfile(user.id)
  if (!profile || !['admin', 'super_admin'].includes(profile.role)) {
    redirect('/unauthorized')
  }
  return { user, profile }
}

export async function requireSuperAdmin() {
  const user = await requireUser()
  const profile = await getProfile(user.id)
  if (!profile || profile.role !== 'super_admin') {
    redirect('/unauthorized')
  }
  return { user, profile }
}
