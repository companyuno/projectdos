const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

async function testStorage() {
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables')
    return
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    // Test if we can list buckets
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
    
    if (bucketsError) {
      console.error('Error listing buckets:', bucketsError)
      return
    }

    console.log('Available buckets:', buckets.map(b => b.name))

    // Check if thesis-uploads bucket exists
    const thesisUploadsBucket = buckets.find(b => b.name === 'thesis-uploads')
    
    if (!thesisUploadsBucket) {
      console.error('thesis-uploads bucket not found!')
      console.log('Available buckets:', buckets.map(b => b.name))
      return
    }

    console.log('thesis-uploads bucket found:', thesisUploadsBucket)

    // Test if we can list files in the bucket
    const { data: files, error: filesError } = await supabase.storage
      .from('thesis-uploads')
      .list()

    if (filesError) {
      console.error('Error listing files:', filesError)
      return
    }

    console.log('Files in thesis-uploads:', files)

  } catch (error) {
    console.error('Test failed:', error)
  }
}

testStorage() 