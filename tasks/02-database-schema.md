# Task 02: Database Schema

## Objective

Create the database schema in Supabase for the wedding invitation system.

## Context

- Database: PostgreSQL via Supabase
- Need tables for: wedding info, guests, RSVPs, wishes, album images
- Use Row Level Security (RLS) for data protection

## Requirements

### 1. Tables to Create

#### `wedding_info` (single row for wedding details)

```sql
- id: uuid (primary key, default gen_random_uuid())
- groom_name: text (not null)
- bride_name: text (not null)
- wedding_date: date (not null)
- wedding_time: time
- venue_name: text
- venue_address: text
- venue_map_url: text
- hero_image_url: text
- story_text: text
- bank_name: text
- bank_account_number: text
- bank_account_name: text
- bank_qr_image_url: text
- created_at: timestamptz (default now())
- updated_at: timestamptz (default now())
```

#### `guests`

```sql
- id: uuid (primary key, default gen_random_uuid())
- name: text (not null)
- slug: text (unique, not null) -- for URL personalization
- email: text
- phone: text
- group_name: text -- e.g., "Family", "Friends", "Work"
- invitation_sent: boolean (default false)
- created_at: timestamptz (default now())
- updated_at: timestamptz (default now())
```

#### `rsvp`

```sql
- id: uuid (primary key)
- guest_id: uuid (references guests.id, unique)
- attending: boolean (not null)
- number_of_guests: integer (default 1)
- dietary_restrictions: text
- message: text
- created_at: timestamptz (default now())
- updated_at: timestamptz (default now())
```

#### `wishes`

```sql
- id: uuid (primary key)
- guest_name: text (not null)
- message: text (not null)
- is_approved: boolean (default true) -- admin moderation
- created_at: timestamptz (default now())
```

#### `album_images`

```sql
- id: uuid (primary key)
- image_url: text (not null)
- caption: text
- display_order: integer (default 0)
- created_at: timestamptz (default now())
```

### 2. Row Level Security (RLS)

- Enable RLS on all tables
- Public can READ: wedding_info, approved wishes, album_images
- Public can INSERT: rsvp (with guest_id validation), wishes
- Authenticated (admin) can do everything

### 3. Storage Bucket

- Create bucket: `wedding-images`
- Policies: Public read, authenticated write

### 4. Database Functions

Create function for updating `updated_at`:

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';
```

### 5. TypeScript Types

After creating tables, regenerate types:

```bash
npm run db:types
```

## Acceptance Criteria

- [ ] All tables created with correct columns
- [ ] RLS policies protect data appropriately
- [ ] Storage bucket created for images
- [ ] TypeScript types generated and usable

## Deliverables

- SQL migration file or Supabase dashboard setup
- Updated `lib/supabase/database.types.ts`
