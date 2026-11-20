# Supabase setup

1. Create a Supabase project.
2. Open SQL Editor and run `migrations/0001_init.sql`.
3. Configure Auth email provider and redirect URLs for your deployed site.
4. Create the first user account, then promote it to admin in SQL Editor:
   `update public.profiles set role = 'admin' where id = '<AUTH_USER_UUID>';`
5. Add the Supabase URL and anon key to deployment environment variables.

New products are inserted with status `pending`. Public catalog queries must filter to `status = 'active'`. Only admins can approve or reject products. Review and test all policies in a staging project before production.
