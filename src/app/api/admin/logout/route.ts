export const runtime = 'nodejs'
import { NextResponse } from 'next/server'

export async function POST() {
  const res = NextResponse.json({ success: true })
  const secure = process.env.NODE_ENV === 'production'
  res.cookies.set('admin_session', '', {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
    expires: new Date(0),
  })
  return res
} 