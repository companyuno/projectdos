-- Replace unique(email) with unique(email, group_name) to allow multiple groups per email
-- Drop old unique constraint if present
alter table if exists permissions
  drop constraint if exists permissions_email_key;

-- Ensure group_name exists and is defaulted
alter table if exists permissions
  add column if not exists group_name text default 'investments';

-- Backfill nulls just in case
update permissions set group_name = 'investments' where group_name is null;

-- Add composite unique constraint
alter table if exists permissions
  add constraint permissions_email_group_unique unique (email, group_name); 