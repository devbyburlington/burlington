import { NextResponse } from 'next/server'
import { createServerClient } from '@burlington/shared/src/supabase/server'

function safePath(raw: string | null, fallback: string): string {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return fallback
  return raw
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = safePath(searchParams.get('next'), '/')

  if (code) {
    const supabase = await createServerClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const { data: { user } } = await supabase.auth.getUser()

      let destination = next

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('field_industry, nda_signed_at, status')
          .eq('id', user.id)
          .single()

        if (!profile?.field_industry) {
          destination = '/apply'
        } else if (!profile.nda_signed_at) {
          destination = '/nda'
        } else if (profile.status !== 'approved') {
          destination = '/status'
        }
      }

      const response = NextResponse.redirect(`${origin}${destination}`)
      response.cookies.set('burlington_persist', '1', {
        path: '/',
        maxAge: 24 * 60 * 60,
        sameSite: 'lax',
        secure: origin.startsWith('https'),
        httpOnly: true,
      })
      return response
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`)
}
