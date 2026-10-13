# FlowPay SaaS MVP

FlowPay is a multi-page Next.js, TypeScript, Tailwind, and Supabase SaaS MVP for a calm fintech workflow platform. It keeps the public marketing site and adds authenticated company workspaces, server-side onboarding, protected app routes, and payment workflow records.

## Getting Started

Run the development server:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Supabase setup

1. Create a Supabase project.
2. Apply the SQL files in `supabase/migrations` in timestamp order with the Supabase CLI. The FlowPay project in Hadi Org already has both migrations applied.
3. Copy `.env.example` to `.env.local`.
4. Fill:

```sh
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
```

The secret key is used only by server-side onboarding and public lead storage. Never expose it as a `NEXT_PUBLIC_` variable.
Find it in the Supabase dashboard under **Project Settings → API Keys → Secret keys**. Keep `.env.local` out of Git.

In Supabase Auth settings, add these redirect URLs for local development:

```txt
http://localhost:3000/auth/callback
http://localhost:3000/app
```

## Routes

- `/` home
- `/product`
- `/workflow`
- `/security`
- `/pricing`
- `/about`
- `/start` sign up, sign in, password reset
- `/onboarding` first workspace setup
- `/app` authenticated dashboard
- `/app/workflows`
- `/app/workflows/[id]`
- `/app/settings`
- `POST /api/trial`

The original single-file demo is archived at `archive/flecto_style_animation_demo-original.html`.

## Checks

```sh
npm run lint
npm run build
```

The trial API validates a payload and stores it in Supabase when admin credentials are configured. Without Supabase env vars, it logs locally so development builds still run.

## Git note

If `git status` reports that this folder is not a repository, repair or initialize Git before deployment:

```sh
git init
git add .
git commit -m "Build FlowPay SaaS MVP"
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
