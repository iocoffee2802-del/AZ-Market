# AZ MARKET

Multi-vendor marketplace starter built with Next.js App Router, TypeScript, Tailwind CSS and Supabase.

## Requirements
- Node.js 20.9+
- npm
- Supabase project
- GitHub account (for remote repository)

## 1. Install
```bash
npm install
cp .env.example .env.local
```
Fill in the Supabase URL and anon key from Project Settings -> API.

## 2. Database
Open Supabase SQL Editor and run `supabase/migrations/0001_init.sql`.

In Supabase Authentication -> URL Configuration:
- Site URL: `http://localhost:3000`
- Add redirect URL: `http://localhost:3000/auth/callback`

Enable Email auth. For initial local testing, you may disable email confirmation in Supabase Auth settings.

## 3. Run
```bash
npm run dev
```
Open http://localhost:3000.

## 4. GitHub
Create an empty repository named `az-market`, then:
```bash
git init
git add .
git commit -m "Initial AZ MARKET marketplace"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/az-market.git
git push -u origin main
```

## Current implementation
- Responsive bilingual marketplace landing/catalog
- Supabase email sign-up/sign-in/sign-out
- Seller onboarding/profile creation
- Seller product creation with image upload to Supabase Storage
- Product catalog reads published/active products
- Database schema with seller ownership, orders, order items and commission snapshot
- Row Level Security policies

## Before production
This is a working foundation, not a finished audited marketplace. Add payment provider integration, shipping integrations, order checkout transaction/RPC, email notifications, moderation tools, rate limits, audit logs, legal pages and security review before accepting real payments.
