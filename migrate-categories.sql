-- Create categories table for research folders
create table if not exists public.categories (
  slug text primary key,
  name text not null,
  order_index int,
  active boolean not null default true,
  icon_key text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Helpful index for ordering
create index if not exists categories_order_idx on public.categories(order_index nulls last, updated_at desc);

-- Seed defaults if empty
insert into public.categories (slug, name, order_index, active, icon_key)
select * from (values
  ('build-process','InVitro Builder',1,true,'rocket'),
  ('whitepapers','White Papers',2,true,'bar-chart'),
  ('industry-theses','Industry Theses',3,true,'graduation-cap'),
  ('industry-decompositions','Industry Decompositions',4,true,'search')
) as t(slug,name,order_index,active,icon_key)
on conflict (slug) do nothing;

-- Trigger to keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_categories_updated_at on public.categories;
create trigger set_categories_updated_at
before update on public.categories
for each row
execute function public.set_updated_at(); 