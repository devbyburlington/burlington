import { NextRequest } from 'next/server'
import { createAdminClient } from '@burlington/shared/src/supabase/admin'
import { checkDuplicateSchema } from '../../../lib/schemas/auth'

export async function POST(req: NextRequest) {
  const parsed = checkDuplicateSchema.safeParse(await req.json())
  if (!parsed.success) {
    return Response.json({ error: 'Invalid input' }, { status: 400 })
  }

  const { email, phone } = parsed.data

  if (!email && !phone) {
    return Response.json({ error: 'Provide email or phone' }, { status: 400 })
  }

  const supabase = createAdminClient()
  const result: { emailTaken: boolean; emailIsOAuth: boolean; phoneTaken: boolean } = {
    emailTaken: false,
    emailIsOAuth: false,
    phoneTaken: false,
  }

  if (email) {
    const { data } = await supabase
      .from('profiles')
      .select('id')
      .ilike('email', email)
      .maybeSingle()

    if (data) {
      result.emailTaken = true

      const { data: authUser } = await supabase.auth.admin.getUserById(data.id)
      if (authUser?.user) {
        const hasGoogleIdentity = authUser.user.identities?.some(
          i => i.provider === 'google'
        )
        const hasEmailIdentity = authUser.user.identities?.some(
          i => i.provider === 'email'
        )
        result.emailIsOAuth = !!hasGoogleIdentity && !hasEmailIdentity
      }
    }
  }

  if (phone) {
    const { data } = await supabase
      .from('profiles')
      .select('id')
      .eq('phone_e164', phone)
      .maybeSingle()
    result.phoneTaken = !!data
  }

  return Response.json(result)
}
