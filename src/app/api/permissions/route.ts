import { NextRequest, NextResponse } from 'next/server';
import { getPermissions, addPermission, removePermission } from '@/lib/db';

// Define a type for permission objects
interface Permission {
  email: string;
  added_at: string;
  added_by: string;
}

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
    if (!body.email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const success = await addPermission(body.email);
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Email already has permission' }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const success = await removePermission(body.email);
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Permission not found' }, { status: 404 });
    }
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
} 