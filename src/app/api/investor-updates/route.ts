import { NextRequest, NextResponse } from 'next/server'
import { getAllInvestorUpdates, getInvestorUpdate, createInvestorUpdate, updateInvestorUpdate, deleteInvestorUpdate, type InvestorUpdateRecord } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')
    const linkedSlug = searchParams.get('linkedSlug')
    if (slug) {
      const upd = await getInvestorUpdate(slug)
      if (!upd) return NextResponse.json({ error: 'Not found' }, { status: 404 })
      return NextResponse.json(upd)
    }
    if (linkedSlug) {
      const list = await getAllInvestorUpdates()
      const matches = list.filter((u) => (u.linkedSlug || '').trim() === linkedSlug.trim())
      return NextResponse.json(matches)
    }
    const list = await getAllInvestorUpdates()
    return NextResponse.json(list)
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as InvestorUpdateRecord
    if (!body?.slug || !body?.title) {
      return NextResponse.json({ error: 'Missing slug/title' }, { status: 400 })
    }
    const ok = await createInvestorUpdate({
      slug: body.slug,
      title: body.title,
      audience: body.audience || 'investors',
      live: body.live ?? true,
      publishDate: body.publishDate ?? null,
      linkedSlug: body.linkedSlug ?? null,
    } as InvestorUpdateRecord)
    if (!ok) return NextResponse.json({ error: 'Create failed' }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<InvestorUpdateRecord> & { slug?: string }
    if (!body?.slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
    const { slug, ...patch } = body
    const ok = await updateInvestorUpdate(slug!, patch)
    if (!ok) return NextResponse.json({ error: 'Update failed' }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = (await req.json()) as { slug?: string }
    if (!body?.slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
    const ok = await deleteInvestorUpdate(body.slug)
    if (!ok) return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
} 