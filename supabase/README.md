# Supabase setup

## Fresh development project

1. In Supabase Dashboard, open **SQL Editor**.
2. Run `migrations/0001_init.sql` first.
3. Run `migrations/0002_profile_bootstrap.sql` second.
4. In **Authentication → Providers**, enable Email/password.
5. In **Authentication → URL Configuration**, set the local Site URL to `http://localhost:3000` and add `http://localhost:3000/**` to Redirect URLs.
6. In **Project Settings → API**, copy the Project URL and the publishable key (or legacy anon key) into the local `.env.local` file. Never use the service_role/secret key in the browser or commit it to GitHub.

## First administrator

1. Register your own account through the AZ MARKET website.
2. In **Authentication → Users**, copy that user's UUID.
3. In SQL Editor, run the following after replacing the placeholder with the verified UUID:

```sql
update public.profiles
set role = 'admin'
where id = '<AUTH_USER_UUID>';
```

Do not expose an admin-role selector in public registration. Keep the first admin promotion as a manual, controlled operation.

## Security notes

- Both migrations enable Row Level Security on marketplace tables.
- New registrations are assigned the `buyer` role by the database trigger.
- Sellers may only submit products for stores they own; submitted products start as `pending`.
- Public product visibility requires an approved product and an active store.
- Only admins can review products and seller applications.
- Test policies using separate buyer, seller, and admin accounts before real sales.
