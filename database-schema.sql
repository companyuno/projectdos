-- Permissions table for storing email access permissions
CREATE TABLE IF NOT EXISTS permissions (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  added_at TIMESTAMP DEFAULT NOW(),
  added_by VARCHAR(255) DEFAULT 'admin'
);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_permissions_email ON permissions(email); 