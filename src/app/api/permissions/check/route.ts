import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const PERMISSIONS_FILE = path.resolve(process.cwd(), 'permissions.json');

// Define a type for permission objects
interface Permission {
  email: string;
  [key: string]: unknown;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    let permissions = [];
    try {
      const file = await fs.readFile(PERMISSIONS_FILE, 'utf-8');
      permissions = JSON.parse(file);
    } catch (e) {
      // No permissions file exists, so no one has access
      return NextResponse.json({ hasPermission: false });
    }

    // Use Permission instead of any
    const hasPermission = permissions.some((p: Permission) => p.email === body.email.toLowerCase().trim());
    return NextResponse.json({ hasPermission });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
} 