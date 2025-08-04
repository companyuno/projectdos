const fs = require('fs');
const path = require('path');

// Read the existing thesis data
const thesisDataPath = path.resolve(process.cwd(), 'thesis-data.json');
const thesisData = JSON.parse(fs.readFileSync(thesisDataPath, 'utf-8'));

console.log('Existing theses found:');
Object.keys(thesisData).forEach(id => {
  console.log(`- ${id}: ${thesisData[id].title}`);
});

console.log('\nTo migrate these to Supabase, you can:');
console.log('1. Go to your Supabase dashboard');
console.log('2. Navigate to Table Editor → thesis_data');
console.log('3. Click "Insert row" for each thesis');
console.log('4. Or use the SQL below to insert them all at once:');

console.log('\n--- SQL TO RUN IN SUPABASE ---');
console.log('INSERT INTO thesis_data (id, title, industry, publish_date, read_time, tags, content, contact, sources) VALUES');

const values = Object.entries(thesisData).map(([id, thesis]) => {
  const tags = thesis.tags ? JSON.stringify(thesis.tags) : '[]';
  const content = JSON.stringify(thesis.content || {});
  const contact = thesis.contact ? JSON.stringify(thesis.contact) : 'null';
  const sources = thesis.sources ? JSON.stringify(thesis.sources) : 'null';
  
  return `('${id}', '${thesis.title.replace(/'/g, "''")}', '${thesis.industry || ''}', '${thesis.publishDate || ''}', '${thesis.readTime || ''}', '${tags}'::jsonb, '${content}'::jsonb, ${contact ? `'${contact}'::jsonb` : 'null'}, ${sources ? `'${sources}'::jsonb` : 'null'})`;
});

console.log(values.join(',\n') + ';');
console.log('--- END SQL ---');

console.log('\nAfter running this SQL, your theses will be safely stored in the database!'); 