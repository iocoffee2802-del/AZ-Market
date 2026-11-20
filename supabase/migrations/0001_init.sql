-- AZ MARKET: multi-vendor marketplace base schema
create extension if not exists pgcrypto;
do $$ begin
  create type public.account_role as enum ('buyer','seller','admin');
exception when duplicate_object then null; end $$;
do $$ begin
  create type public.product_status as enum ('pending','active','rejected','archived');
exception when duplicate_object then null; end $$;
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  role public.account_role not null default 'buyer',
  created_at timestamptz not null default now()
);
create table if not exists public.stores (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  slug text unique not null,
  description text,
  status text not null default 'pending' check (status in ('pending','active','suspended')),
  created_at timestamptz not null default now()
);
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  name text not null,
  slug text not null,
  description text,
  price numeric(14,2) not null check (price >= 0),
  stock integer not null default 0 check (stock >= 0),
  image_urls text[] not null default '{}',
  status public.product_status not null default 'pending',
  review_note text,
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  unique(store_id, slug)
);
create index if not exists products_status_created_idx on public.products(status, created_at desc);
create index if not exists products_store_idx on public.products(store_id);
create or replace function public.current_user_role()
returns public.account_role language sql stable security definer set search_path = public
as $$ select role from public.profiles where id = auth.uid() $$;
alter table public.profiles enable row level security;
alter table public.stores enable row level security;
alter table public.products enable row level security;
drop policy if exists "profile read self" on public.profiles;
create policy "profile read self" on public.profiles for select to authenticated using (id = auth.uid() or public.current_user_role() = 'admin');
drop policy if exists "stores visible" on public.stores;
create policy "stores visible" on public.stores for select using (status = 'active' or owner_id = auth.uid() or public.current_user_role() = 'admin');
drop policy if exists "seller creates store" on public.stores;
create policy "seller creates store" on public.stores for insert to authenticated with check (owner_id = auth.uid() and public.current_user_role() in ('seller','admin'));
drop policy if exists "owner updates store" on public.stores;
create policy "owner updates store" on public.stores for update to authenticated using (owner_id = auth.uid() or public.current_user_role() = 'admin') with check (owner_id = auth.uid() or public.current_user_role() = 'admin');
drop policy if exists "public sees approved products" on public.products;
create policy "public sees approved products" on public.products for select using (
  (status = 'active' and exists (select 1 from public.stores s where s.id = store_id and s.status = 'active'))
  or exists (select 1 from public.stores s where s.id = store_id and s.owner_id = auth.uid())
  or public.current_user_role() = 'admin'
);
drop policy if exists "seller submits pending product" on public.products;
create policy "seller submits pending product" on public.products for insert to authenticated with check (
 status = 'pending' and exists (select 1 from public.stores s where s.id = store_id and s.owner_id = auth.uid() and s.status = 'active')
);
drop policy if exists "seller edits own nonapproved product" on public.products;
create policy "seller edits own nonapproved product" on public.products for update to authenticated using (
 exists (select 1 from public.stores s where s.id = store_id and s.owner_id = auth.uid()) and status in ('pending','rejected')
) with check (
 exists (select 1 from public.stores s where s.id = store_id and s.owner_id = auth.uid()) and status in ('pending','rejected')
);
drop policy if exists "admin moderates products" on public.products;
create policy "admin moderates products" on public.products for update to authenticated using (public.current_user_role() = 'admin') with check (public.current_user_role() = 'admin');
-- Create the first admin manually after signing up:
-- update public.profiles set role = 'admin' where id = '<AUTH_USER_UUID>';
-- Do not expose the service-role key in browser code.
