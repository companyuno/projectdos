export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import { createAdminSessionToken } from '@/lib/adminAuth'
import crypto from 'crypto'

function constantTimeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a)
  const bBuf = Buffer.from(b)
  if (aBuf.length !== bBuf.length) return false
  return crypto.timingSafeEqual(aBuf, bBuf)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const password = (body?.password as string) || ''
    const adminPassword = (process.env.ADMIN_PASSWORD || '').trim()
    const secret = (process.env.ADMIN_SESSION_SECRET || '').trim()

    if (!adminPassword || !secret) {
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
    }

    const ok = constantTimeEqual(password, adminPassword)
    if (!ok) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const token = createAdminSessionToken()
    const res = NextResponse.json({ success: true })
    const secure = process.env.NODE_ENV === 'production'
    res.cookies.set('admin_session', token, {
      httpOnly: true,
      secure,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    })
    return res
  } catch (e: any) {
    console.error('Admin login error:', e)
    const message = process.env.NODE_ENV === 'production' ? 'Server error' : (e?.message || 'Server error')
    return NextResponse.json({ error: message }, { status: 500 })
  }
} 