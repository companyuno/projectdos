-- Insert thesis 1: invitro-investment-build-process
INSERT INTO thesis_data (id, title, industry, publish_date, read_time, tags, content, contact, sources) 
VALUES (
  'invitro-investment-build-process', 
  'InVitro Capital Investment & Build Process', 
  'Venture Building', 
  '2025-05-30', 
  '15 min read', 
  '["Investment Process","Venture Studio","Company Building"]'::jsonb, 
  '{"executiveSummary":{"title":"I. Executive Summary","content":"Our comprehensive methodology for identifying, building, and scaling high-growth companies from ideation to exit"}}'::jsonb, 
  null, 
  null
);

-- Insert thesis 2: invitro-private-markets-whitepaper
INSERT INTO thesis_data (id, title, industry, publish_date, read_time, tags, content, contact, sources) 
VALUES (
  'invitro-private-markets-whitepaper', 
  'InVitro Capital Private Markets White Paper', 
  'Private Markets', 
  '2025-07-10', 
  '20 min read', 
  '["Private Markets","Investment Strategy","Market Analysis"]'::jsonb, 
  '{"executiveSummary":{"title":"I. Executive Summary","content":"A comparative analysis of private company ownership models: private equity, venture capital & venture builders"}}'::jsonb, 
  null, 
  null
);

-- Insert thesis 3: healthcare-elearning-thesis
INSERT INTO thesis_data (id, title, industry, publish_date, read_time, tags, content, contact, sources) 
VALUES (
  'healthcare-elearning-thesis', 
  'Healthcare E-Learning', 
  'Healthcare Education', 
  '2024-01-01', 
  '10 min read', 
  '["Healthcare","E-Learning","Digital Education"]'::jsonb, 
  '{"executiveSummary":{"title":"I. Executive Summary","content":""}}'::jsonb, 
  null, 
  null
);

-- Insert thesis 4: healthcare-prescription-dtc-thesis
INSERT INTO thesis_data (id, title, industry, publish_date, read_time, tags, content, contact, sources) 
VALUES (
  'healthcare-prescription-dtc-thesis', 
  'Healthcare Prescription DTC', 
  'Healthcare DTC', 
  '2023-11-01', 
  '12 min read', 
  '["Healthcare","DTC","Telehealth","Prescription"]'::jsonb, 
  '{"executiveSummary":{"title":"I. Executive Summary","content":""}}'::jsonb, 
  null, 
  null
);

-- Insert thesis 5: build-thesis-long-term-care-test (basic content only)
INSERT INTO thesis_data (id, title, industry, publish_date, read_time, tags, content, contact, sources) 
VALUES (
  'build-thesis-long-term-care-test', 
  'Industry Build Thesis: Long Term Care', 
  'Healthcare', 
  '2025-07-30', 
  '23 min read', 
  '["Long Term Care","Healthcare","SaaS"]'::jsonb, 
  '{"executiveSummary":{"title":"I. Executive Summary","content":"Long-Term Care thesis content"}}'::jsonb, 
  null, 
  null
); 