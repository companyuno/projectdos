import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const thesisId = formData.get('thesisId') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!thesisId) {
      return NextResponse.json({ error: 'No thesis ID provided' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'video/ogg']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only images and videos are allowed.' }, { status: 400 })
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Maximum size is 10MB.' }, { status: 400 })
    }

    // Initialize Supabase client
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Storage not configured' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Generate unique filename with timestamp and random component
    const timestamp = Date.now()
    const randomId = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split('.').pop()
    const fileName = `${timestamp}-${randomId}.${fileExtension}`
    const filePath = `${thesisId}/${fileName}`

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Supabase Storage
    const { error } = await supabase.storage
      .from('thesis-uploads')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false
      })

    if (error) {
      console.error('Supabase upload error:', error)
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('thesis-uploads')
      .getPublicUrl(filePath)

    return NextResponse.json({ 
      success: true, 
      url: urlData.publicUrl,
      fileName: fileName,
      fileType: file.type
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
} 