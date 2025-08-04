-- Visitors table for tracking website visitors
CREATE TABLE IF NOT EXISTS visitors (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW(),
  accredited BOOLEAN DEFAULT FALSE,
  accredited_selections JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_visitors_email ON visitors(email);

-- Create index for timestamp queries
CREATE INDEX IF NOT EXISTS idx_visitors_timestamp ON visitors(timestamp);

-- Enable Row Level Security (RLS) for security
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (since this is admin-only)
CREATE POLICY "Allow all operations" ON visitors FOR ALL USING (true); 