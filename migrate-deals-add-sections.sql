-- Add sections JSONB to deals for rich editor content
alter table if exists public.deals
  add column if not exists sections jsonb;

-- Optional: create a GIN index if querying by sections keys later (safe to skip)
-- create index if not exists deals_sections_gin on public.deals using gin (sections); 