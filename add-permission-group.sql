-- Add group_name to permissions and supporting index
alter table if exists permissions
  add column if not exists group_name text default 'investments';

create index if not exists idx_permissions_email_group
  on permissions (email, group_name);

-- Backfill null group_name to default
update permissions set group_name = 'investments' where group_name is null; 