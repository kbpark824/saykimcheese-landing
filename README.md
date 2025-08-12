# saykimcheese — NYC Charcuterie Landing (Astro + Tailwind + Supabase + Resend + Plausible)

A fast, SEO-friendly landing page to showcase charcuterie/grazing boards and capture leads.

## Quick start
```bash
npm i
npm run dev
```

## Environment
Copy `.env.example` to `.env` and fill values.

## Deploy to Vercel
- Build command: `astro build`
- Output dir: `dist`
- Add env vars in Vercel → Settings → Environment Variables.

## Supabase table
```sql
create extension if not exists pgcrypto; -- for gen_random_uuid()
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  event_date date,
  message text,
  source text,
  created_at timestamp with time zone default now()
);
```

## Resend
Verify your domain (saykimcheese.com), set `LEAD_NOTIFY_FROM`, and add `LEAD_NOTIFY_TO=skim@saykimcheese.com`.

## Images
Place images in `public/images/boards/` and update `index.astro` / `gallery.astro` arrays if filenames differ.
