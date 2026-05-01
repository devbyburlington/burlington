import { NextResponse, type NextRequest } from 'next/server'
import { createMiddlewareClient } from '@burlington/shared/src/supabase/middleware'

const PUBLIC_PATHS = ['/login', '/forgot-password', '/reset-password', '/apply', '/nda', '/status', '/auth']

export async function middleware(request: NextRequest) {
  const { supabase, response } = createMiddlewareClient(request)
  const { data: { user } } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname
  const isPublicPath = PUBLIC_PATHS.some(p => path.startsWith(p))

  if (user && !request.cookies.has('burlington_persist')) {
    await supabase.auth.signOut()
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (!user && !isPublicPath && path !== '/') {
    const loginUrl = new URL('/login', request.url)
    if (path.startsWith('/') && !path.startsWith('//')) {
      loginUrl.searchParams.set('redirect', path)
    }
    return NextResponse.redirect(loginUrl)
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
}
