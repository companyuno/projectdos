import { NextRequest, NextResponse } from 'next/server';
import { getAllDeals, createDeal, updateDeal, deleteDeal, getDeal, type DealRecord } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (id) {
      const deal = await getDeal(id);
      if (!deal) return NextResponse.json({ error: 'Deal not found' }, { status: 404 });
      return NextResponse.json(deal);
    }

    const deals = await getAllDeals();
    return NextResponse.json(deals);
  } catch (e) {
    console.error('Error fetching deals:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const record = body as DealRecord;
    if (!record?.id || !record?.transactionName) {
      return NextResponse.json({ error: 'Missing id or transactionName' }, { status: 400 });
    }
    const success = await createDeal(record);
    if (!success) return NextResponse.json({ error: 'Failed to create deal' }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Error creating deal:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body as Partial<DealRecord> & { id?: string };
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    const success = await updateDeal(id, updates);
    if (!success) return NextResponse.json({ error: 'Failed to update deal' }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Error updating deal:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body as { id?: string };
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    const success = await deleteDeal(id);
    if (!success) return NextResponse.json({ error: 'Failed to delete deal' }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Error deleting deal:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
} 