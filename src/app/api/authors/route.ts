import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) {
    throw new Error('Supabase environment variables are missing. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  }
  return createClient(url, serviceKey)
}

// GET /api/authors - Get all authors
export async function GET() {
  try {
    const supabase = getSupabase()
    const { data: authors, error } = await supabase
      .from('authors')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(authors)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch authors'
    console.error('Error fetching authors:', err)
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}

// POST /api/authors - Create new author
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, title, company, email, linkedin, photoUrl } = body

    if (!name || !title || !company || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const supabase = getSupabase()
    const { data: author, error } = await supabase
      .from('authors')
      .insert({
        name,
        title,
        company,
        email,
        linkedin,
        photo_url: photoUrl
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(author)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create author'
    console.error('Error creating author:', err)
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}

// PUT /api/authors - Update author
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, name, title, company, email, linkedin, photoUrl } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Author ID is required' },
        { status: 400 }
      )
    }

    const supabase = getSupabase()
    const { data: author, error } = await supabase
      .from('authors')
      .update({
        name,
        title,
        company,
        email,
        linkedin,
        photo_url: photoUrl,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(author)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update author'
    console.error('Error updating author:', err)
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}

// DELETE /api/authors - Delete author
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Author ID is required' },
        { status: 400 }
      )
    }

    const supabase = getSupabase()
    const { error } = await supabase
      .from('authors')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete author'
    console.error('Error deleting author:', err)
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
} 