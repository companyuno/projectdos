import { NextRequest, NextResponse } from 'next/server'
import { getAllStartupSubmissions, updateStartupSubmissionStatus } from '@/lib/db'
import { verifyAdminSessionToken } from '@/lib/adminAuth'

function isAuthed(request: NextRequest): boolean {
  const token = request.cookies.get('admin_session')?.value || ''
  return verifyAdminSessionToken(token)
}

export async function GET(request: NextRequest) {
  try {
    if (!isAuthed(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const submissions = await getAllStartupSubmissions()
    return NextResponse.json(submissions)
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!isAuthed(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const body = await request.json()
    const { submissionId, status, notes } = body

    if (!submissionId || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const success = await updateStartupSubmissionStatus(submissionId, status, notes)
    
    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Failed to update submission' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error updating submission:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
} 