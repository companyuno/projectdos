import { NextRequest, NextResponse } from 'next/server';
import { checkPermission } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const hasPermission = await checkPermission(body.email);
    return NextResponse.json({ hasPermission });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
} 