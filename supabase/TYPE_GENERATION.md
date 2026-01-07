# How to Generate Database Types

## Quick Setup

### Step 1: Get Your Supabase Access Token

1. Go to: https://supabase.com/dashboard/account/tokens
2. Click **Generate New Token**
3. Give it a name (e.g., "Type Generation")
4. Copy the token

### Step 2: Add Token to Environment

Add this line to your `.env.local`:

```env
SUPABASE_ACCESS_TOKEN=your_token_here
```

### Step 3: Generate Types

```bash
npm run db:types
```

## What This Does

The script will:

- ✅ Connect to Supabase API using your access token
- ✅ Fetch the TypeScript types for your database schema
- ✅ Save them to `lib/supabase/database.types.ts`

## Troubleshooting

### Error: "SUPABASE_ACCESS_TOKEN environment variable is not set"

Make sure you added the token to `.env.local` and restart your terminal or dev server.

### Error: "401 Unauthorized"

Your access token may be invalid or expired. Generate a new one from the dashboard.

## Alternative: Manual Type Generation

If you prefer not to use an access token, you can:

1. Go to your Supabase project settings
2. Navigate to API settings
3. Copy the auto-generated TypeScript types
4. Paste them into `lib/supabase/database.types.ts`

Or use the Supabase CLI (requires login):

```bash
npx supabase login
npx supabase gen types typescript --project-id lfremgnutasmckuwxeuk > lib/supabase/database.types.ts
```
