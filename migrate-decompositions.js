const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const decompositionData = [
  {
    id: 'long-term-care',
    title: 'Long Term Care Industry Decomposition',
    industry: 'Healthcare',
    publish_date: '2025-01-15',
    read_time: 15,
    tags: ['Long Term Care', 'Healthcare', 'Industry Analysis', 'Decomposition'],
    content: { overview: 'Long Term Care industry analysis and opportunities' },
    type: 'decomposition',
    live: true,
    featured: true
  },
  {
    id: 'construction-tech',
    title: 'Construction Technology Industry Decomposition',
    industry: 'Construction',
    publish_date: '2024-06-01',
    read_time: 20,
    tags: ['Construction Tech', 'Industry Analysis', 'Decomposition'],
    content: { overview: 'Construction technology workflows and opportunities' },
    type: 'decomposition',
    live: true,
    featured: false
  },
  {
    id: 'healthcare-e-learning',
    title: 'Healthcare E-Learning Industry Decomposition',
    industry: 'Healthcare',
    publish_date: '2024-06-09',
    read_time: 12,
    tags: ['Healthcare', 'E-Learning', 'Industry Analysis', 'Decomposition'],
    content: { overview: 'Healthcare education technology market analysis' },
    type: 'decomposition',
    live: true,
    featured: false
  },
  {
    id: 'accounting-services',
    title: 'Accounting Services Industry Decomposition',
    industry: 'Professional Services',
    publish_date: '2024-12-01',
    read_time: 10,
    tags: ['Accounting Services', 'Industry Analysis', 'Decomposition'],
    content: { overview: 'Accounting services industry and automation opportunities' },
    type: 'decomposition',
    live: true,
    featured: false
  },
  {
    id: 'b2b-sales-marketing-software',
    title: 'B2B Sales & Marketing Technology Decomposition',
    industry: 'Software',
    publish_date: '2024-12-01',
    read_time: 18,
    tags: ['B2B Sales', 'Marketing Software', 'Industry Analysis', 'Decomposition'],
    content: { overview: 'B2B sales and marketing technology landscape' },
    type: 'decomposition',
    live: true,
    featured: false
  },
  {
    id: 'dtc-healthcare',
    title: 'DTC Healthcare Industry Decomposition',
    industry: 'Healthcare',
    publish_date: '2024-12-01',
    read_time: 14,
    tags: ['DTC Healthcare', 'Industry Analysis', 'Decomposition'],
    content: { overview: 'Direct-to-consumer healthcare market analysis' },
    type: 'decomposition',
    live: true,
    featured: false
  }
];

async function migrateDecompositions() {
  try {
    console.log('Starting decomposition migration...');
    
    // First, check if the featured column exists
    const { data: columns, error: columnError } = await supabase
      .from('thesis_data')
      .select('*')
      .limit(1);
    
    if (columnError) {
      console.error('Error checking table structure:', columnError);
      return;
    }
    
    // Add featured column if it doesn't exist
    console.log('Adding featured column if it doesn\'t exist...');
    await supabase.rpc('exec_sql', { 
      sql: 'ALTER TABLE thesis_data ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT FALSE;' 
    });
    
    // Insert each decomposition
    for (const thesis of decompositionData) {
      console.log(`Inserting ${thesis.title}...`);
      
      const { data, error } = await supabase
        .from('thesis_data')
        .upsert(thesis, { onConflict: 'id' });
      
      if (error) {
        console.error(`Error inserting ${thesis.title}:`, error);
      } else {
        console.log(`✅ Successfully inserted ${thesis.title}`);
      }
    }
    
    // Verify the data was inserted
    console.log('\nVerifying migration...');
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
    
    console.log('\nMigration completed!');
    
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateDecompositions(); 