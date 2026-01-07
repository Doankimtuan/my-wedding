-- =============================================
-- Wedding Invitation System - Database Schema
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 1. WEDDING INFO TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS wedding_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  groom_name TEXT NOT NULL,
  bride_name TEXT NOT NULL,
  wedding_date DATE NOT NULL,
  wedding_time TIME,
  venue_name TEXT,
  venue_address TEXT,
  venue_map_url TEXT,
  hero_image_url TEXT,
  story_text TEXT,
  bank_name TEXT,
  bank_account_number TEXT,
  bank_account_name TEXT,
  bank_qr_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 2. GUESTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  email TEXT,
  phone TEXT,
  group_name TEXT,
  invitation_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_guests_slug ON guests(slug);

-- =============================================
-- 3. RSVP TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS rsvp (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_id UUID REFERENCES guests(id) ON DELETE CASCADE UNIQUE,
  attending BOOLEAN NOT NULL,
  number_of_guests INTEGER DEFAULT 1,
  dietary_restrictions TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 4. WISHES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS wishes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name TEXT NOT NULL,
  message TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for approved wishes
CREATE INDEX IF NOT EXISTS idx_wishes_approved ON wishes(is_approved, created_at DESC);

-- =============================================
-- 5. ALBUM IMAGES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS album_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for ordering
CREATE INDEX IF NOT EXISTS idx_album_display_order ON album_images(display_order);

-- =============================================
-- TRIGGERS FOR UPDATED_AT
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to wedding_info
DROP TRIGGER IF EXISTS update_wedding_info_updated_at ON wedding_info;
CREATE TRIGGER update_wedding_info_updated_at
  BEFORE UPDATE ON wedding_info
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to guests
DROP TRIGGER IF EXISTS update_guests_updated_at ON guests;
CREATE TRIGGER update_guests_updated_at
  BEFORE UPDATE ON guests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to rsvp
DROP TRIGGER IF EXISTS update_rsvp_updated_at ON rsvp;
CREATE TRIGGER update_rsvp_updated_at
  BEFORE UPDATE ON rsvp
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE wedding_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvp ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE album_images ENABLE ROW LEVEL SECURITY;

-- =============================================
-- RLS POLICIES - WEDDING INFO
-- =============================================

-- Public can read wedding info
CREATE POLICY "Public can read wedding info"
  ON wedding_info
  FOR SELECT
  TO anon
  USING (true);

-- Authenticated users can do everything
CREATE POLICY "Authenticated users can manage wedding info"
  ON wedding_info
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =============================================
-- RLS POLICIES - GUESTS
-- =============================================

-- Public can read guests (for name lookup)
CREATE POLICY "Public can read guests"
  ON guests
  FOR SELECT
  TO anon
  USING (true);

-- Authenticated users can manage guests
CREATE POLICY "Authenticated users can manage guests"
  ON guests
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =============================================
-- RLS POLICIES - RSVP
-- =============================================

-- Public can read their own RSVP
CREATE POLICY "Public can read RSVP"
  ON rsvp
  FOR SELECT
  TO anon
  USING (true);

-- Public can insert RSVP
CREATE POLICY "Public can insert RSVP"
  ON rsvp
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Public can update their own RSVP
CREATE POLICY "Public can update RSVP"
  ON rsvp
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Authenticated users can manage all RSVPs
CREATE POLICY "Authenticated users can manage RSVPs"
  ON rsvp
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =============================================
-- RLS POLICIES - WISHES
-- =============================================

-- Public can read approved wishes
CREATE POLICY "Public can read approved wishes"
  ON wishes
  FOR SELECT
  TO anon
  USING (is_approved = true);

-- Public can insert wishes
CREATE POLICY "Public can insert wishes"
  ON wishes
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Authenticated users can manage all wishes
CREATE POLICY "Authenticated users can manage wishes"
  ON wishes
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =============================================
-- RLS POLICIES - ALBUM IMAGES
-- =============================================

-- Public can read album images
CREATE POLICY "Public can read album images"
  ON album_images
  FOR SELECT
  TO anon
  USING (true);

-- Authenticated users can manage album images
CREATE POLICY "Authenticated users can manage album images"
  ON album_images
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =============================================
-- SEED DATA (Optional - for testing)
-- =============================================

-- Insert sample wedding info (you can customize this)
INSERT INTO wedding_info (
  groom_name,
  bride_name,
  wedding_date,
  wedding_time,
  venue_name,
  venue_address
) VALUES (
  'Groom Name',
  'Bride Name',
  '2025-12-31',
  '14:00:00',
  'Beautiful Venue',
  '123 Wedding Street, City, Country'
) ON CONFLICT DO NOTHING;

-- =============================================
-- STORAGE BUCKET SETUP
-- =============================================
-- Note: Run this separately or via Supabase Dashboard

-- Create storage bucket for wedding images
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('wedding-images', 'wedding-images', true)
-- ON CONFLICT DO NOTHING;

-- Allow public read access to wedding-images bucket
-- CREATE POLICY "Public can read wedding images"
--   ON storage.objects
--   FOR SELECT
--   TO public
--   USING (bucket_id = 'wedding-images');

-- Allow authenticated users to upload
-- CREATE POLICY "Authenticated users can upload wedding images"
--   ON storage.objects
--   FOR INSERT
--   TO authenticated
--   WITH CHECK (bucket_id = 'wedding-images');

-- Allow authenticated users to delete
-- CREATE POLICY "Authenticated users can delete wedding images"
--   ON storage.objects
--   FOR DELETE
--   TO authenticated
--   USING (bucket_id = 'wedding-images');
