-- Create authors table
CREATE TABLE IF NOT EXISTS authors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  linkedin TEXT,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create thesis_authors junction table for many-to-many relationship
CREATE TABLE IF NOT EXISTS thesis_authors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  thesis_id TEXT NOT NULL,
  author_id UUID NOT NULL REFERENCES authors(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(thesis_id, author_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_authors_email ON authors(email);
CREATE INDEX IF NOT EXISTS idx_thesis_authors_thesis_id ON thesis_authors(thesis_id);
CREATE INDEX IF NOT EXISTS idx_thesis_authors_author_id ON thesis_authors(author_id);

-- Enable Row Level Security
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE thesis_authors ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your auth setup)
CREATE POLICY "Allow all operations on authors" ON authors FOR ALL USING (true);
CREATE POLICY "Allow all operations on thesis_authors" ON thesis_authors FOR ALL USING (true); 