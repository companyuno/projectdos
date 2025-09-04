import { NextRequest, NextResponse } from 'next/server';
import { checkPermission, checkPermissionForGroup } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body?.email as string | undefined;
    const group = body?.group as string | undefined;
    const logout = Boolean(body?.logout);

    // Handle logout: clear cookie session
    if (logout) {
      const res = NextResponse.json({ success: true });
      res.cookies.set('iv_investor', '', { path: '/', maxAge: 0 });
      res.cookies.set('iv_group', '', { path: '/', maxAge: 0 });
      res.cookies.set('iv_email', '', { path: '/', maxAge: 0 });
      return res;
    }

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    let hasPermission = false;
    if (group && typeof group === 'string' && group.trim() !== '') {
      hasPermission = await checkPermissionForGroup(email, group);
    } else {
      hasPermission = await checkPermission(email);
    }

    const res = NextResponse.json({ hasPermission });
    if (hasPermission) {
      const secure = process.env.NODE_ENV === 'production';
      const maxAge = 60 * 60 * 24 * 30; // 30 days
      res.cookies.set('iv_investor', '1', {
        httpOnly: true,
        secure,
        sameSite: 'lax',
        path: '/',
        maxAge,
      });
      res.cookies.set('iv_email', email.toLowerCase().trim(), {
        httpOnly: true,
        secure,
        sameSite: 'lax',
        path: '/',
        maxAge,
      });
      if (group) {
        res.cookies.set('iv_group', group, {
          httpOnly: true,
          secure,
          sameSite: 'lax',
          path: '/',
          maxAge,
        });
      }
    }
    return res;
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
} 