-- Add existing decomposition pages to the database
-- Run this in your Supabase SQL editor

INSERT INTO thesis_data (id, title, industry, publish_date, read_time, tags, content, type, live, featured) VALUES
(
  'long-term-care',
  'Long Term Care Industry Decomposition',
  'Healthcare',
  '2025-01-15',
  '15 min read',
  '["Long Term Care", "Healthcare", "Industry Analysis", "Decomposition"]',
  '{"overview": "Long Term Care industry analysis and opportunities"}',
  'decomposition',
  true,
  true
),
(
  'construction-tech',
  'Construction Technology Industry Decomposition',
  'Construction',
  '2024-06-01',
  '20 min read',
  '["Construction Tech", "Industry Analysis", "Decomposition"]',
  '{"overview": "Construction technology workflows and opportunities"}',
  'decomposition',
  true,
  false
),
(
  'healthcare-e-learning',
  'Healthcare E-Learning Industry Decomposition',
  'Healthcare',
  '2024-06-09',
  '12 min read',
  '["Healthcare", "E-Learning", "Industry Analysis", "Decomposition"]',
  '{"overview": "Healthcare education technology market analysis"}',
  'decomposition',
  true,
  false
),
(
  'accounting-services',
  'Accounting Services Industry Decomposition',
  'Professional Services',
  '2024-12-01',
  '10 min read',
  '["Accounting Services", "Industry Analysis", "Decomposition"]',
  '{"overview": "Accounting services industry and automation opportunities"}',
  'decomposition',
  true,
  false
),
(
  'b2b-sales-marketing-software',
  'B2B Sales & Marketing Technology Decomposition',
  'Software',
  '2024-12-01',
  '18 min read',
  '["B2B Sales", "Marketing Software", "Industry Analysis", "Decomposition"]',
  '{"overview": "B2B sales and marketing technology landscape"}',
  'decomposition',
  true,
  false
),
(
  'dtc-healthcare',
  'DTC Healthcare Industry Decomposition',
  'Healthcare',
  '2024-12-01',
  '14 min read',
  '["DTC Healthcare", "Industry Analysis", "Decomposition"]',
  '{"overview": "Direct-to-consumer healthcare market analysis"}',
  'decomposition',
  true,
  false
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  industry = EXCLUDED.industry,
  publish_date = EXCLUDED.publish_date,
  read_time = EXCLUDED.read_time,
  tags = EXCLUDED.tags,
  content = EXCLUDED.content,
  type = EXCLUDED.type,
  live = EXCLUDED.live,
  featured = EXCLUDED.featured,
  updated_at = NOW(); 