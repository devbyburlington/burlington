import { NextRequest } from 'next/server'
import { createAdminClient } from '@burlington/shared/src/supabase/admin'
import { checkAuthMethodSchema } from '../../../lib/schemas/auth'

export async function POST(req: NextRequest) {
  const parsed = checkAuthMethodSchema.safeParse(await req.json())
  if (!parsed.success) {
    return Response.json({ error: 'Invalid input' }, { status: 400 })
  }

  const { email } = parsed.data
  const supabase = createAdminClient()
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .ilike('email', email)
    .maybeSingle()

  if (!profile) {
    return Response.json({ isOAuthOnly: false })
  }

  const { data: authUser } = await supabase.auth.admin.getUserById(profile.id)
  if (!authUser?.user) {
    return Response.json({ isOAuthOnly: false })
  }

  const hasGoogle = authUser.user.identities?.some(i => i.provider === 'google')
  const hasEmail = authUser.user.identities?.some(i => i.provider === 'email')

  return Response.json({
    isOAuthOnly: !!hasGoogle && !hasEmail,
  })
}
