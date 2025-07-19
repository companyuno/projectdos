import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.resolve(process.cwd(), 'visitors.json');

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.firstName || !body.lastName || !body.email) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const newVisitor = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      timestamp: new Date().toISOString(),
      ...(body.accredited !== undefined && { accredited: body.accredited }),
      ...(body.accreditedSelections && { accreditedSelections: body.accreditedSelections }),
    };
    let visitors = [];
    try {
      const file = await fs.readFile(DATA_FILE, 'utf-8');
      visitors = JSON.parse(file);
    } catch (e) {
      // File does not exist or is empty
      visitors = [];
    }
    visitors.push(newVisitor);
    await fs.writeFile(DATA_FILE, JSON.stringify(visitors, null, 2));
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const file = await fs.readFile(DATA_FILE, 'utf-8');
    const visitors = JSON.parse(file);
    return NextResponse.json(visitors);
  } catch (e) {
    return NextResponse.json([]);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const index = searchParams.get('index');
    
    if (!index) {
      return NextResponse.json({ error: 'Index parameter required' }, { status: 400 });
    }
    
    const indexNum = parseInt(index);
    if (isNaN(indexNum) || indexNum < 0) {
      return NextResponse.json({ error: 'Invalid index' }, { status: 400 });
    }
    
    let visitors = [];
    try {
      const file = await fs.readFile(DATA_FILE, 'utf-8');
      visitors = JSON.parse(file);
    } catch (e) {
      return NextResponse.json({ error: 'No visitors file found' }, { status: 404 });
    }
    
    if (indexNum >= visitors.length) {
      return NextResponse.json({ error: 'Index out of bounds' }, { status: 400 });
    }
    
    // Remove the visitor at the specified index
    visitors.splice(indexNum, 1);
    
    // Write back to file
    await fs.writeFile(DATA_FILE, JSON.stringify(visitors, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
} 