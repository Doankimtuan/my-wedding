# Task 01: Supabase Setup

## Objective

Set up Supabase project and configure environment variables for the Next.js application.

## Context

- Tech Stack: Next.js 16, Supabase, TypeScript
- This is the foundation task that enables all backend functionality

## Requirements

### 1. Create Supabase Project

- Go to https://supabase.com and create a new project
- Note down: Project URL, Anon Key, Service Role Key
- Ref https://supabase.com/docs/guides/getting-started/quickstarts/nextjs

### 2. Environment Variables

Create `.env.local` with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://lfremgnutasmckuwxeuk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable__qApcIgv4reswj_oMWMuqQ_1XBVU0a3
# Service role key is required for admin tasks (bypass RLS) - find this in Supabase Dashboard > Settings > API
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmcmVtZ251dGFzbWNrdXd4ZXVrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDk4MzQ5MSwiZXhwIjoyMDgwNTU5NDkxfQ.2Y9gjF-4V9TlB_euNGKgg9EhTm9LhQso_nMUH6QHHNg
```

> **Note:** The key provided (`sb_publishable_...`) is your Anon/Public key. We map it to `NEXT_PUBLIC_SUPABASE_ANON_KEY` for standard library usage.

### 3. Supabase Client Setup

Create the following files:

#### `lib/supabase/client.ts`

- Browser client for client-side operations
- Use `createBrowserClient` from `@supabase/ssr`

#### `lib/supabase/server.ts`

- Server client for Server Components and Server Actions
- Use `createServerClient` from `@supabase/ssr`
- Handle cookies properly for Next.js App Router

#### `lib/supabase/middleware.ts`

- Middleware helper for auth session refresh
- Export function to create middleware client

### 4. Middleware Setup

Create `middleware.ts` at project root:

- Refresh auth tokens on each request
- Protect admin routes (redirect to login if not authenticated)

### 5. Type Generation

- Install Supabase CLI: `npm install supabase --save-dev`
- Add script to package.json: `"db:types": "supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/supabase/database.types.ts"`

## Acceptance Criteria

- [ ] Supabase client works in both client and server components
- [ ] Environment variables are properly configured
- [ ] Middleware protects `/admin/*` routes
- [ ] TypeScript types are generated for database

## Files to Create

- `lib/supabase/client.ts`
- `lib/supabase/server.ts`
- `lib/supabase/middleware.ts`
- `middleware.ts`
- `.env.local` (template)
- `.env.example`
