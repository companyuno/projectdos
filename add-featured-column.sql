-- Add featured column to thesis_data table
ALTER TABLE thesis_data ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT FALSE;

-- Update existing decomposition entries to have featured status
UPDATE thesis_data 
SET featured = true 
WHERE id = 'long-term-care' AND type = 'decomposition';

-- Update other decomposition entries to have featured = false (they're already false by default)
-- No need to explicitly set them since the default is false 