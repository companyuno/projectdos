-- Add detail_route column to deals for single-card navigation
ALTER TABLE public.deals
  ADD COLUMN IF NOT EXISTS detail_route text; 