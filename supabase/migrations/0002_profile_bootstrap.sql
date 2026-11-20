-- Create a buyer profile automatically when a new auth account is created.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name',''), 'buyer')
  on conflict (id) do nothing;
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Seller applications require admin approval. Users cannot promote themselves to seller/admin.
create table if not exists public.seller_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  store_name text not null,
  message text,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);
alter table public.seller_applications enable row level security;
drop policy if exists "seller application own read" on public.seller_applications;
create policy "seller application own read" on public.seller_applications for select to authenticated
using (user_id = auth.uid() or public.current_user_role() = 'admin');
drop policy if exists "user submits seller application" on public.seller_applications;
create policy "user submits seller application" on public.seller_applications for insert to authenticated
with check (user_id = auth.uid() and status = 'pending');
drop policy if exists "admin reviews seller application" on public.seller_applications;
create policy "admin reviews seller application" on public.seller_applications for update to authenticated
using (public.current_user_role() = 'admin') with check (public.current_user_role() = 'admin');

-- IMPORTANT: promote the first administrator manually from Supabase SQL Editor after signup.
-- update public.profiles set role = 'admin' where id = '<AUTH_USER_UUID>';
