# FitZone

React + Vite gym site with a Supabase-backed `/admin` panel.

## Install & run
```
npm install
cp .env.example .env   # fill in values
npm run dev
npm run build          # production build to dist/
```

## Supabase setup
1. Create a project at supabase.com.
2. SQL Editor: run `supabase/schema.sql` (tables, RLS policies, sample rows for programs/plans).
3. Authentication â†’ Users â†’ Add user (email + password) for each admin.
4. Make that user an admin (SQL editor): `insert into admins (user_id) select id from auth.users where email = 'you@example.com';`
5. In Project Connect, copy the Project URL and a publishable key into `.env` as `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`. Legacy anon keys are supported. Never put a secret or `service_role` key in this app.

## Environment (`.env`)
`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (or legacy `VITE_SUPABASE_ANON_KEY`), `VITE_WHATSAPP_NUMBER` (digits only, with country code).

## Deploy to Vercel
Import the repo, framework Vite, add the three env vars, deploy. `vercel.json` rewrites routes so `/admin` works on refresh. In Supabase â†’ Auth â†’ URL Configuration, add your Vercel URL.

## Notes
- Admin routes require a signed-in user whose ID has a row in `admins`. The route guard improves navigation; database RLS remains the security boundary. The `is_admin()` helper runs with invoker privileges.
- Public visitors can read active plans/trainers/programs and content, and insert enquiries only.
- No payments are implemented; plan selection leads to an enquiry.
- No images are bundled: the hero is a CSS gradient. Add your own photos to `public/`.



