const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ygqjesunsynojufzfrtz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlncWplc3Vuc3lub2p1ZnpmcnR6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDMyOTE0OCwiZXhwIjoyMDY5OTA1MTQ4fQ.Ypcao8jgmmPOQXIezKiK4LLJo6xxovOXl3D2JtXzdrE';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSubtitleUpdate() {
  try {
    // First, let's check the current data
    console.log('Current data:');
    const { data: currentData, error: currentError } = await supabase
      .from('thesis_data')
      .select('*')
      .eq('id', 'long-term-care')
      .single();
    
    if (currentError) {
      console.error('Error fetching current data:', currentError);
      return;
    }
    
    console.log('Current subtitle:', currentData.subtitle);
    
    // Now let's try to update the subtitle
    console.log('\nUpdating subtitle...');
    const { data: updateData, error: updateError } = await supabase
      .from('thesis_data')
      .update({ 
        subtitle: 'TEST SUBTITLE UPDATE - ' + new Date().toISOString()
      })
      .eq('id', 'long-term-care')
      .select();
    
    if (updateError) {
      console.error('Error updating subtitle:', updateError);
      return;
    }
    
    console.log('Update successful:', updateData);
    
    // Check the data again
    console.log('\nChecking updated data:');
    const { data: newData, error: newError } = await supabase
      .from('thesis_data')
      .select('*')
      .eq('id', 'long-term-care')
      .single();
    
    if (newError) {
      console.error('Error fetching new data:', newError);
      return;
    }
    
    console.log('New subtitle:', newData.subtitle);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

testSubtitleUpdate(); 