const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Load environment variables
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  try {
    console.log('Running decomposition migration...');
    
    // Read the migration SQL
    const migrationSQL = fs.readFileSync('migrate-decompositions.sql', 'utf-8');
    
    // Execute the migration
    const { data, error } = await supabase.rpc('exec_sql', { sql: migrationSQL });
    
    if (error) {
      console.error('Migration failed:', error);
      process.exit(1);
    }
    
    console.log('Migration completed successfully!');
    
    // Verify the data was inserted
    const { data: theses, error: fetchError } = await supabase
      .from('thesis_data')
      .select('*')
      .eq('type', 'decomposition');
    
    if (fetchError) {
      console.error('Error fetching decompositions:', fetchError);
    } else {
      console.log(`Found ${theses.length} decomposition entries in database:`);
      theses.forEach(thesis => {
        console.log(`- ${thesis.title} (${thesis.id})`);
      });
    }
    
  } catch (error) {
    console.error('Migration script error:', error);
    process.exit(1);
  }
}

runMigration(); 