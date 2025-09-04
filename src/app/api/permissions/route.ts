import { NextRequest, NextResponse } from 'next/server';
import { getPermissions, addPermission, removePermission } from '@/lib/db';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    const permissions = await getPermissions();
    return NextResponse.json(permissions);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body?.email;
    const group = (body?.group as string | undefined) || 'investor-login';
    const from = (body?.from as string | undefined) || '/investor-updates';
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const success = await addPermission(email, group);
    if (!success) {
      return NextResponse.json({ error: 'Email already has permission' }, { status: 400 });
    }

    // Attempt to send a magic link via Supabase
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
      const supabaseKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY) as string;
      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const baseUrl = req.nextUrl.origin;
        const emailRedirectTo = `${baseUrl}/auth/callback?from=${encodeURIComponent(from)}&group=${encodeURIComponent(group)}`;
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: { emailRedirectTo },
        });
        if (error) {
          // Don't fail the request; just report that email wasn't sent
          return NextResponse.json({ success: true, emailSent: false, message: 'Permission added but email not sent' });
        }
        return NextResponse.json({ success: true, emailSent: true });
      }
    } catch {
      // Ignore email send failure
      return NextResponse.json({ success: true, emailSent: false });
    }

    return NextResponse.json({ success: true, emailSent: false });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body?.email;
    const group = body?.group as string | undefined;
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const success = await removePermission(email, group);
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Permission not found' }, { status: 404 });
    }
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
} 