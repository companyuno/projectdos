-- Thesis data table for storing thesis content
CREATE TABLE IF NOT EXISTS thesis_data (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  industry VARCHAR(255),
  publish_date VARCHAR(50),
  read_time VARCHAR(50),
  tags JSONB,
  content JSONB NOT NULL,
  contact JSONB,
  sources JSONB,
  live BOOLEAN DEFAULT FALSE,
  type VARCHAR(50) DEFAULT 'thesis', -- 'thesis' or 'decomposition'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_thesis_data_id ON thesis_data(id);

-- Enable Row Level Security (RLS) for security
ALTER TABLE thesis_data ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (since this is admin-only)
CREATE POLICY "Allow all operations" ON thesis_data FOR ALL USING (true);

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_thesis_data_updated_at 
    BEFORE UPDATE ON thesis_data 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 