import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const PERMISSIONS_FILE = path.resolve(process.cwd(), 'permissions.json');

export async function GET() {
  try {
    const file = await fs.readFile(PERMISSIONS_FILE, 'utf-8');
    const permissions = JSON.parse(file);
    return NextResponse.json(permissions);
  } catch (e) {
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const newPermission = {
      email: body.email.toLowerCase().trim(),
      addedAt: new Date().toISOString(),
      addedBy: 'admin', // You can enhance this to track who added it
    };

    let permissions = [];
    try {
      const file = await fs.readFile(PERMISSIONS_FILE, 'utf-8');
      permissions = JSON.parse(file);
    } catch (e) {
      // File does not exist or is empty
      permissions = [];
    }

    // Check if email already exists
    const emailExists = permissions.some((p: any) => p.email === newPermission.email);
    if (emailExists) {
      return NextResponse.json({ error: 'Email already has permission' }, { status: 400 });
    }

    permissions.push(newPermission);
    await fs.writeFile(PERMISSIONS_FILE, JSON.stringify(permissions, null, 2));
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
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
      return NextResponse.json({ error: 'No permissions found' }, { status: 404 });
    }

    const filteredPermissions = permissions.filter((p: any) => p.email !== body.email);
    
    if (filteredPermissions.length === permissions.length) {
      return NextResponse.json({ error: 'Permission not found' }, { status: 404 });
    }

    await fs.writeFile(PERMISSIONS_FILE, JSON.stringify(filteredPermissions, null, 2));
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
} 