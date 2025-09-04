export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSessionToken } from '@/lib/adminAuth'

export async function GET(req: NextRequest) {
  const token = req.cookies.get('admin_session')?.value || ''
  const ok = verifyAdminSessionToken(token)
  return NextResponse.json({ ok })
} 