# AZ MARKET

Multi-vendor marketplace foundation built with Next.js App Router, TypeScript, Tailwind CSS and Supabase.

## Requirements
- Node.js 20.9+
- npm
- Supabase project

## Local setup
1. Clone this repository and run `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` from Supabase Project Settings → API.
4. Run the SQL migrations in order in Supabase SQL Editor: `supabase/migrations/0001_init.sql`, then `0002_profile_bootstrap.sql`.
5. In Supabase Authentication → URL Configuration, set Site URL to your local URL and add `http://localhost:3000/**` to Redirect URLs.
6. Run `npm run dev`.

## Deploy on Vercel
Import this GitHub repository into Vercel. Add the two environment variables above to Project Settings → Environment Variables for Production, Preview and Development, then redeploy.

## Authentication
Email/password sign-up, sign-in, session refresh and sign-out use Supabase Auth. A database trigger creates a buyer profile. Do not allow a public registration form to set the admin role. Promote the first administrator manually in Supabase SQL Editor.

## Important
Never put a Supabase service-role key in a browser-exposed variable or commit it to GitHub. The current project is a development foundation; complete product management, seller onboarding approval, admin moderation UI, checkout/payment, shipping, notifications and security testing before production sales.
