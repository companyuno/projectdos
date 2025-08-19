import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// GET /api/thesis-authors?thesisId=... - Get authors for a specific thesis
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const thesisId = searchParams.get('thesisId')

    if (!thesisId) {
      return NextResponse.json(
        { error: 'Thesis ID is required' },
        { status: 400 }
      )
    }

    const { data: thesisAuthors, error } = await supabase
      .from('thesis_authors')
      .select(`
        author_id,
        authors (
          id,
          name,
          title,
          company,
          email,
          linkedin,
          photo_url
        )
      `)
      .eq('thesis_id', thesisId)

    if (error) throw error

    // Transform the data to match the expected format
    type AuthorRow = { id: string; name: string; title: string; company: string; email: string; linkedin: string | null; photo_url: string | null }
    type ThesisAuthorRow = { author_id: string; authors: AuthorRow }
    const rows = (thesisAuthors ?? []) as unknown as ThesisAuthorRow[]
    const authors = rows.map((ta) => ({
      id: ta.authors.id,
      name: ta.authors.name,
      title: ta.authors.title,
      company: ta.authors.company,
      email: ta.authors.email,
      linkedin: ta.authors.linkedin,
      photoUrl: ta.authors.photo_url ?? null
    }))

    return NextResponse.json(authors)
  } catch (error) {
    console.error('Error fetching thesis authors:', error)
    return NextResponse.json(
      { error: 'Failed to fetch thesis authors' },
      { status: 500 }
    )
  }
}

// POST /api/thesis-authors - Assign author to thesis
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { thesisId, authorId } = body

    if (!thesisId || !authorId) {
      return NextResponse.json(
        { error: 'Thesis ID and Author ID are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('thesis_authors')
      .upsert({
        thesis_id: thesisId,
        author_id: authorId
      }, { onConflict: 'thesis_id,author_id', ignoreDuplicates: true })
      .select()

    if (error) throw error

    return NextResponse.json({ success: true, rows: data })
  } catch (error) {
    console.error('Error assigning author to thesis:', error)
    return NextResponse.json(
      { error: 'Failed to assign author to thesis' },
      { status: 500 }
    )
  }
}

// DELETE /api/thesis-authors - Remove author from thesis
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const thesisId = searchParams.get('thesisId')
    const authorId = searchParams.get('authorId')

    if (!thesisId || !authorId) {
      return NextResponse.json(
        { error: 'Thesis ID and Author ID are required' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('thesis_authors')
      .delete()
      .eq('thesis_id', thesisId)
      .eq('author_id', authorId)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error removing author from thesis:', error)
    return NextResponse.json(
      { error: 'Failed to remove author from thesis' },
      { status: 500 }
    )
  }
} 