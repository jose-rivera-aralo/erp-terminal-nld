import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Rutas públicas
  if (pathname.startsWith('/login')) {
    return NextResponse.next()
  }

  // Cookie de Supabase (auth)
  const hasSession =
    req.cookies.get('sb-access-token') ||
    req.cookies.get('sb-refresh-token')

  // Si NO hay sesión → login
  if (!hasSession) {
    const loginUrl = new URL('/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  // Todo OK
  return NextResponse.next()
}

// Protegemos todo menos login y assets
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
