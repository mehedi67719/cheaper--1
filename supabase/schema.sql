-- Run this in your Supabase SQL editor (Dashboard → SQL Editor → New query)
-- This creates all tables Cheaper needs. Safe to re-run (uses IF NOT EXISTS).

-- ── Products ──────────────────────────────────────────────────────────────────
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

create policy "vendors_manage_own" on public.products
  for all to authenticated
  using (auth.uid() = vendor_id)
  with check (auth.uid() = vendor_id);

create policy "public_read_active" on public.products
  for select
  using (status = 'active' or auth.uid() = vendor_id);

-- ── Orders ────────────────────────────────────────────────────────────────────
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  buyer_id uuid references auth.users(id) on delete set null,
  buyer_email text,
  buyer_name text,
  status text default 'processing' check (status in ('processing', 'shipped', 'delivered', 'cancelled')),
  total numeric(10,2) not null,
  shipping_name text,
  shipping_address text,
  shipping_city text,
  shipping_zip text,
  shipping_country text default 'US',
  created_at timestamptz default now()
);

alter table public.orders enable row level security;

create policy "orders_buyer_select" on public.orders
  for select to authenticated using (auth.uid() = buyer_id);

create policy "orders_buyer_insert" on public.orders
  for insert to authenticated with check (auth.uid() = buyer_id);

-- ── Order Items ───────────────────────────────────────────────────────────────
create table if not exists public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id text not null,
  product_name text not null,
  vendor_id uuid,
  vendor_name text,
  price numeric(10,2) not null,
  qty integer not null default 1,
  subtotal numeric(10,2) not null
);

alter table public.order_items enable row level security;

create policy "order_items_buyer" on public.order_items
  for select to authenticated
  using (exists (
    select 1 from public.orders where id = order_id and buyer_id = auth.uid()
  ));

create policy "order_items_vendor" on public.order_items
  for select to authenticated
  using (vendor_id = auth.uid());

create policy "order_items_insert" on public.order_items
  for insert to authenticated
  with check (exists (
    select 1 from public.orders where id = order_id and buyer_id = auth.uid()
  ));

-- ── Auto-update timestamps ────────────────────────────────────────────────────
create or replace function public.handle_updated_at()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

create or replace trigger products_updated_at
  before update on public.products
  for each row execute procedure public.handle_updated_at();
