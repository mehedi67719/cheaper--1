-- Run this in your Supabase SQL editor (Dashboard → SQL Editor → New query)

create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  vendor_id uuid references auth.users(id) on delete cascade not null,
  vendor_name text,
  name text not null,
  description text,
  category text,
  price numeric(10,2) not null,
  original_price numeric(10,2),
  stock integer default 0 not null,
  status text default 'active' check (status in ('active', 'draft', 'out_of_stock')),
  features text[] default array[]::text[],
  specs jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.products enable row level security;

-- Vendors can manage their own products
create policy "vendors_manage_own" on public.products
  for all to authenticated
  using (auth.uid() = vendor_id)
  with check (auth.uid() = vendor_id);

-- Anyone (including anonymous) can read active products
create policy "public_read_active" on public.products
  for select
  using (status = 'active' or auth.uid() = vendor_id);

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create or replace trigger products_updated_at
  before update on public.products
  for each row execute procedure public.handle_updated_at();
