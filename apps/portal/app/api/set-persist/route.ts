import { NextResponse, type NextRequest } from 'next/server'
import { setPersistSchema } from '../../../lib/schemas/auth'

export async function POST(request: NextRequest) {
  const parsed = setPersistSchema.safeParse(await request.json())
  const maxAge = parsed.success ? parsed.data.maxAge : undefined
  const age = maxAge === 7 * 24 * 60 * 60 ? maxAge : 24 * 60 * 60

  const response = NextResponse.json({ ok: true })
  response.cookies.set('burlington_persist', '1', {
    path: '/',
    maxAge: age,
    sameSite: 'lax',
    secure: request.nextUrl.protocol === 'https:',
    httpOnly: true,
  })
  return response
}

export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({ ok: true })
  response.cookies.set('burlington_persist', '', {
    path: '/',
    maxAge: 0,
    sameSite: 'lax',
    secure: request.nextUrl.protocol === 'https:',
    httpOnly: true,
  })
  return response
}
