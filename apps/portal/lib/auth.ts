import { cache } from 'react'
import { redirect } from 'next/navigation'
import { createServerClient } from '@burlington/shared/src/supabase/server'

export const getUser = cache(async () => {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
})

export async function requireUser() {
  const user = await getUser()
  if (!user) redirect('/login')
  return user
}

export const getProfile = cache(async (userId: string) => {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('[getProfile] Failed to fetch profile', { userId, code: error.code, message: error.message })
    return null
  }

  return data
})

export async function requireApprovedClient() {
  const user = await requireUser()
  const profile = await getProfile(user.id)
  if (!profile || profile.status !== 'approved') redirect('/status')
  return { user, profile }
}
