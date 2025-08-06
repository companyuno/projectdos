-- Create startup_submissions table
CREATE TABLE IF NOT EXISTS startup_submissions (
  id SERIAL PRIMARY KEY,
  company_name TEXT NOT NULL,
  founder_names TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  stage TEXT NOT NULL,
  funding_sought TEXT NOT NULL,
  problem_statement TEXT NOT NULL,
  solution TEXT NOT NULL,
  founder_description TEXT NOT NULL,
  additional_materials_url TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed BOOLEAN DEFAULT FALSE,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected')),
  notes TEXT
);

-- Create index on email for quick lookups
CREATE INDEX IF NOT EXISTS idx_startup_submissions_email ON startup_submissions(email);

-- Create index on submitted_at for sorting
CREATE INDEX IF NOT EXISTS idx_startup_submissions_submitted_at ON startup_submissions(submitted_at);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_startup_submissions_status ON startup_submissions(status);

-- Add RLS (Row Level Security) policies
ALTER TABLE startup_submissions ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert (for form submissions)
CREATE POLICY "Allow authenticated users to insert startup submissions" ON startup_submissions
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to view their own submissions
CREATE POLICY "Allow users to view their own submissions" ON startup_submissions
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Allow admins to view all submissions
CREATE POLICY "Allow admins to view all submissions" ON startup_submissions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM permissions 
      WHERE email = auth.jwt() ->> 'email' 
      AND added_at IS NOT NULL
    )
  ); 