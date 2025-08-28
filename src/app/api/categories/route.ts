import { NextRequest, NextResponse } from 'next/server'
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '@/lib/db'

interface Category {
  slug: string
  name: string
  order?: number
  active?: boolean
  iconKey?: string
}

const defaultCategories: Category[] = [
  { slug: 'build-process', name: 'InVitro Builder', order: 1, active: true, iconKey: 'rocket' },
  { slug: 'whitepapers', name: 'White Papers', order: 2, active: true, iconKey: 'bar-chart' },
  { slug: 'industry-theses', name: 'Industry Theses', order: 3, active: true, iconKey: 'graduation-cap' },
  { slug: 'industry-decompositions', name: 'Industry Decompositions', order: 4, active: true, iconKey: 'search' },
]

export async function GET() {
  try {
    const list = await getAllCategories()
    const categories: Category[] = list.length > 0
      ? list.map((c) => ({ slug: c.slug, name: c.name, order: c.orderIndex ?? undefined, active: c.active, iconKey: c.iconKey ?? undefined }))
      : defaultCategories
    const active = categories
      .filter((c) => c.active !== false)
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.name.localeCompare(b.name))
    return NextResponse.json(active)
  } catch (err) {
    return NextResponse.json(defaultCategories)
  }
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<Category>
  const { slug, name, order, iconKey, active } = body

  if (!slug || typeof slug !== 'string' || !/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: 'Invalid slug. Use lowercase letters, numbers, and dashes.' }, { status: 400 })
  }
  if (!name || typeof name !== 'string') {
    return NextResponse.json({ error: 'Invalid name.' }, { status: 400 })
  }

  const ok = await createCategory({ slug, name, orderIndex: typeof order === 'number' ? order : null, iconKey: typeof iconKey === 'string' ? iconKey : null, active: active !== false })
  if (!ok) return NextResponse.json({ error: 'Create failed' }, { status: 500 })
  return NextResponse.json({ success: true, category: { slug, name, order, iconKey, active: active !== false } })
}

export async function PUT(req: NextRequest) {
  const body = (await req.json()) as Partial<Category> & { slug?: string }
  const { slug, name, order, iconKey, active } = body
  if (!slug || typeof slug !== 'string') {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
  }
  const ok = await updateCategory(slug, {
    name: typeof name === 'string' ? name : undefined,
    orderIndex: typeof order === 'number' ? order : undefined,
    iconKey: typeof iconKey === 'string' ? iconKey : undefined,
    active: typeof active === 'boolean' ? active : undefined,
  })
  if (!ok) return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest) {
  const body = (await req.json()) as { slug?: string }
  const { slug } = body
  if (!slug || typeof slug !== 'string') {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
  }
  const ok = await deleteCategory(slug)
  if (!ok) return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  return NextResponse.json({ success: true })
} 