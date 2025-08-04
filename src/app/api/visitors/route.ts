import { NextRequest, NextResponse } from 'next/server';
import { addVisitor, getAllVisitors, deleteVisitor } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.firstName || !body.lastName || !body.email) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const visitorData = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      accredited: body.accredited,
      accreditedSelections: body.accreditedSelections
    };

    const success = await addVisitor(visitorData);
    
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Failed to add visitor' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error adding visitor:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const visitors = await getAllVisitors();
    return NextResponse.json(visitors);
  } catch (error) {
    console.error('Error fetching visitors:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const visitorId = searchParams.get('id');
    
    if (!visitorId) {
      return NextResponse.json({ error: 'Visitor ID required' }, { status: 400 });
    }
    
    const id = parseInt(visitorId);
    if (isNaN(id) || id <= 0) {
      return NextResponse.json({ error: 'Invalid visitor ID' }, { status: 400 });
    }
    
    const success = await deleteVisitor(id);
    
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Failed to delete visitor' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error deleting visitor:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
} 