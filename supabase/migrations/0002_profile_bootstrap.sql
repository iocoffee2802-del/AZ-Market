-- AZ MARKET: profile bootstrap and seller onboarding
-- Safe to apply after 0001_init.sql on a fresh Supabase project.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    'buyer'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create table if not exists public.seller_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  business_name text not null,
  description text,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  review_note text,
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists seller_applications_status_created_idx
  on public.seller_applications(status, created_at desc);

alter table public.seller_applications enable row level security;

drop policy if exists "seller application read own or admin" on public.seller_applications;
create policy "seller application read own or admin"
  on public.seller_applications
  for select to authenticated
  using (user_id = auth.uid() or public.current_user_role() = 'admin');

drop policy if exists "buyer submits own seller application" on public.seller_applications;
create policy "buyer submits own seller application"
  on public.seller_applications
  for insert to authenticated
  with check (user_id = auth.uid() and status = 'pending');

drop policy if exists "admin reviews seller applications" on public.seller_applications;
create policy "admin reviews seller applications"
  on public.seller_applications
  for update to authenticated
  using (public.current_user_role() = 'admin')
  with check (public.current_user_role() = 'admin');

-- New public registrations always receive the buyer role.
-- Promote the first admin manually only after verifying the correct Auth user UUID.
-- update public.profiles set role = 'admin' where id = '<AUTH_USER_UUID>';
