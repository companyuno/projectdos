-- Investor Updates MVP table
create table if not exists investor_updates (
  slug text primary key,
  title text not null,
  content text default '' not null,
  audience text not null default 'investors' check (audience in ('public','investors')),
  live boolean not null default true,
  publish_date date null,
  linked_slug text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Upsert-friendly updated_at trigger
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_timestamp_investor_updates on investor_updates;
create trigger set_timestamp_investor_updates
before update on investor_updates
for each row execute procedure set_updated_at();

-- Helpful indexes
create index if not exists investor_updates_updated_at_idx on investor_updates (updated_at desc);
create index if not exists investor_updates_publish_date_idx on investor_updates (publish_date desc);
create index if not exists investor_updates_live_idx on investor_updates (live);
create index if not exists investor_updates_audience_idx on investor_updates (audience); 