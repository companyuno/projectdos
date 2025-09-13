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

    // Do not send any emails automatically on add; outbound comms are handled separately
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