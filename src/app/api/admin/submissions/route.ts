import { NextRequest, NextResponse } from 'next/server'
import { getAllStartupSubmissions, updateStartupSubmissionStatus } from '@/lib/db'

export async function GET() {
  try {
    const submissions = await getAllStartupSubmissions()
    return NextResponse.json(submissions)
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
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