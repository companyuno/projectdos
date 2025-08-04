-- Permissions table for storing email access permissions
CREATE TABLE IF NOT EXISTS permissions (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  added_at TIMESTAMP DEFAULT NOW(),
  added_by VARCHAR(255) DEFAULT 'admin'
);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_permissions_email ON permissions(email);

-- Enable Row Level Security (RLS) for security
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (since this is admin-only)
CREATE POLICY "Allow all operations" ON permissions FOR ALL USING (true); 