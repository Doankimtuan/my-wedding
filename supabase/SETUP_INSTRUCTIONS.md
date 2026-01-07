# Database Schema Setup Instructions

## Step 1: Run the Migration

You have two options to create the database schema:

### Option A: Using Supabase Dashboard (Recommended for beginners)

1. Go to your Supabase project: https://supabase.com/dashboard/project/lfremgnutasmckuwxeuk
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
5. Paste into the SQL Editor
6. Click **Run** (or press Cmd/Ctrl + Enter)

### Option B: Using Supabase CLI

```bash
# Make sure you're logged in
npx supabase login

# Link your project
npx supabase link --project-ref lfremgnutasmckuwxeuk

# Run the migration
npx supabase db push
```

## Step 2: Create Storage Bucket

1. Go to **Storage** in the Supabase Dashboard
2. Click **Create a new bucket**
3. Name: `wedding-images`
4. Make it **Public**
5. Click **Create bucket**

### Set Storage Policies

After creating the bucket, go to **Policies** tab and add:

**Policy 1: Public Read**

- Policy name: `Public can read wedding images`
- Allowed operation: `SELECT`
- Target roles: `public`
- USING expression: `bucket_id = 'wedding-images'`

**Policy 2: Authenticated Upload**

- Policy name: `Authenticated users can upload`
- Allowed operation: `INSERT`
- Target roles: `authenticated`
- WITH CHECK expression: `bucket_id = 'wedding-images'`

**Policy 3: Authenticated Delete**

- Policy name: `Authenticated users can delete`
- Allowed operation: `DELETE`
- Target roles: `authenticated`
- USING expression: `bucket_id = 'wedding-images'`

## Step 3: Generate TypeScript Types

After the schema is created, generate TypeScript types:

```bash
npm run db:types
```

This will create `lib/supabase/database.types.ts` with all your table types.

## Step 4: Verify

Check that all tables were created:

1. Go to **Table Editor** in Supabase Dashboard
2. You should see:
   - `wedding_info`
   - `guests`
   - `rsvp`
   - `wishes`
   - `album_images`

## What Was Created

### Tables

- ✅ `wedding_info` - Wedding details and content
- ✅ `guests` - Guest list with personalized slugs
- ✅ `rsvp` - Guest responses
- ✅ `wishes` - Guest messages (with moderation)
- ✅ `album_images` - Photo gallery

### Security

- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Public can read wedding info, approved wishes, and album
- ✅ Public can submit RSVP and wishes
- ✅ Authenticated users (admin) have full access

### Features

- ✅ Auto-updating `updated_at` timestamps
- ✅ Indexed columns for performance
- ✅ Foreign key constraints
- ✅ Sample seed data

## Troubleshooting

If you get errors about existing tables, you can drop them first:

```sql
DROP TABLE IF EXISTS album_images CASCADE;
DROP TABLE IF EXISTS wishes CASCADE;
DROP TABLE IF EXISTS rsvp CASCADE;
DROP TABLE IF EXISTS guests CASCADE;
DROP TABLE IF EXISTS wedding_info CASCADE;
```

Then run the migration again.
