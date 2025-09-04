import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Admin protection (Edge-safe):
  if (pathname.startsWith('/admin')) {
    // Allow login page
    if (pathname === '/admin/login') {
      return NextResponse.next()
    }
    // Allow admin auth endpoints to proceed
    if (pathname.startsWith('/api/admin/login') || pathname.startsWith('/api/admin/logout') || pathname.startsWith('/api/admin/session')) {
      return NextResponse.next()
    }
    const token = req.cookies.get('admin_session')?.value || ''
    // Basic presence check at the Edge. Full signature verification happens in server routes/APIs.
    if (!token || token.split('.').length !== 2) {
      const url = req.nextUrl.clone()
      url.pathname = '/admin/login'
      url.searchParams.set('from', pathname)
      return NextResponse.redirect(url)
    }
  }

  // Investor updates gating (existing behavior)
  const investor = req.cookies.get('iv_investor')?.value
  if (pathname.startsWith('/investor-updates')) {
    if (!investor) {
      return NextResponse.next()
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/investor-updates/:path*',
  ],
} 