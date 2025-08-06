import { NextRequest, NextResponse } from 'next/server'
import { addStartupSubmission } from '@/lib/db'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client for file uploads
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Extract form fields
    const companyName = formData.get('companyName') as string
    const founderNames = formData.get('founderNames') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const stage = formData.get('stage') as string
    const fundingSought = formData.get('fundingSought') as string
    const problemStatement = formData.get('problemStatement') as string
    const solution = formData.get('solution') as string
    const founderDescription = formData.get('founderDescription') as string
    const additionalMaterials = formData.get('additionalMaterials') as File | null

    // Validate required fields
    if (!companyName || !founderNames || !email || !stage || !fundingSought || !problemStatement || !solution || !founderDescription) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Handle file upload if present
    let fileUrl = null
    if (additionalMaterials && additionalMaterials.size > 0 && supabase) {
      try {
        const fileName = `${Date.now()}-${additionalMaterials.name}`
        const uploadResult = await supabase.storage
          .from('startup-submissions')
          .upload(fileName, additionalMaterials)

        if (uploadResult.error) {
          console.error('File upload error:', uploadResult.error)
        } else {
          const urlResult = supabase.storage
            .from('startup-submissions')
            .getPublicUrl(fileName)
          fileUrl = urlResult.data?.publicUrl
        }
      } catch (fileError) {
        console.error('File upload failed:', fileError)
      }
    }

    // Save to database
    const success = await addStartupSubmission({
      company_name: companyName,
      founder_names: founderNames,
      email: email,
      phone: phone || undefined,
      stage: stage,
      funding_sought: fundingSought,
      problem_statement: problemStatement,
      solution: solution,
      founder_description: founderDescription,
      additional_materials_url: fileUrl || undefined
    })

    if (!success) {
      console.error('Failed to save startup submission')
      return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing submission:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
} 