---
description: Hướng dẫn setup database và login admin page
---

# Hướng dẫn Setup Database và Login Admin Page

## 📋 Tổng quan

Dự án đang sử dụng:

- **Frontend**: Next.js 16 với React 19
- **Backend/Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **UI Components**: Radix UI + Tailwind CSS

## 🔧 Bước 1: Cài đặt Supabase Project

### 1.1. Tạo Supabase Project

1. Truy cập [https://supabase.com](https://supabase.com)
2. Đăng nhập hoặc tạo tài khoản mới
3. Click **"New Project"**
4. Điền thông tin:
   - **Name**: `my-wedding` (hoặc tên bạn muốn)
   - **Database Password**: Tạo mật khẩu mạnh và lưu lại
   - **Region**: Chọn region gần bạn nhất (ví dụ: Singapore)
5. Click **"Create new project"** và đợi ~2 phút

### 1.2. Lấy API Keys

1. Trong Supabase Dashboard, vào **Settings** → **API**
2. Copy các giá trị sau:
   - **Project URL** (ví dụ: `https://xxxxx.supabase.co`)
   - **anon/public key** (key dài bắt đầu bằng `eyJ...`)

### 1.3. Tạo file Environment Variables

Tạo file `.env.local` trong thư mục root của project:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**⚠️ Lưu ý**: File `.env.local` không được commit lên Git. Đảm bảo nó đã có trong `.gitignore`

## 🗄️ Bước 2: Setup Database Schema

### 2.1. Tạo Tables cho Wedding App

Truy cập **SQL Editor** trong Supabase Dashboard và chạy các câu lệnh sau:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: Guests (Khách mời)
CREATE TABLE guests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  number_of_guests INTEGER DEFAULT 1,
  rsvp_status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, declined
  dietary_restrictions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: RSVP Responses
CREATE TABLE rsvp_responses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  guest_id UUID REFERENCES guests(id) ON DELETE CASCADE,
  attending BOOLEAN NOT NULL,
  message TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: Wishes (Lời chúc)
CREATE TABLE wishes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  guest_name VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: Gallery Images
CREATE TABLE gallery_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: Admin Users (cho authentication)
CREATE TABLE admin_users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_guests_email ON guests(email);
CREATE INDEX idx_wishes_approved ON wishes(is_approved);
CREATE INDEX idx_gallery_order ON gallery_images(display_order);
CREATE INDEX idx_rsvp_guest ON rsvp_responses(guest_id);

-- Enable Row Level Security (RLS)
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
```

### 2.2. Tạo RLS Policies (Row Level Security)

```sql
-- Policies cho Guests table
-- Admin có thể làm mọi thứ
CREATE POLICY "Admin can do everything on guests"
  ON guests
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Public có thể đọc
CREATE POLICY "Public can read guests"
  ON guests
  FOR SELECT
  USING (true);

-- Policies cho Wishes
-- Public có thể tạo wishes mới
CREATE POLICY "Public can create wishes"
  ON wishes
  FOR INSERT
  WITH CHECK (true);

-- Public chỉ đọc được wishes đã approved
CREATE POLICY "Public can read approved wishes"
  ON wishes
  FOR SELECT
  USING (is_approved = true);

-- Admin có thể làm mọi thứ với wishes
CREATE POLICY "Admin can do everything on wishes"
  ON wishes
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Policies cho Gallery
-- Public có thể đọc active images
CREATE POLICY "Public can read active gallery images"
  ON gallery_images
  FOR SELECT
  USING (is_active = true);

-- Admin có thể làm mọi thứ với gallery
CREATE POLICY "Admin can do everything on gallery"
  ON gallery_images
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Policies cho RSVP
CREATE POLICY "Public can create RSVP"
  ON rsvp_responses
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin can do everything on RSVP"
  ON rsvp_responses
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Policies cho Admin Users
CREATE POLICY "Admin can read admin_users"
  ON admin_users
  FOR SELECT
  USING (auth.role() = 'authenticated');
```

### 2.3. Tạo Functions và Triggers

```sql
-- Function để tự động update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger cho guests table
CREATE TRIGGER update_guests_updated_at
  BEFORE UPDATE ON guests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## 👤 Bước 3: Tạo Admin User

### 3.1. Tạo Admin User trong Supabase Auth

Có 2 cách:

**Cách 1: Qua Supabase Dashboard (Khuyên dùng)**

1. Vào **Authentication** → **Users** trong Supabase Dashboard
2. Click **"Add user"** → **"Create new user"**
3. Điền thông tin:
   - **Email**: `admin@yourdomain.com` (hoặc email bạn muốn)
   - **Password**: Tạo mật khẩu mạnh
   - **Auto Confirm User**: ✅ Bật option này
4. Click **"Create user"**

**Cách 2: Qua SQL**

```sql
-- Chạy trong SQL Editor
-- Lưu ý: Thay YOUR_EMAIL và YOUR_PASSWORD
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  uuid_generate_v4(),
  'authenticated',
  'authenticated',
  'admin@yourdomain.com',
  crypt('YOUR_PASSWORD', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);
```

### 3.2. Thêm Admin vào bảng admin_users

```sql
-- Lấy user_id từ auth.users vừa tạo
INSERT INTO admin_users (id, email, full_name, role)
SELECT id, email, 'Admin User', 'admin'
FROM auth.users
WHERE email = 'admin@yourdomain.com';
```

## 🔐 Bước 4: Test Authentication

### 4.1. Khởi động Development Server

```bash
bun dev
```

### 4.2. Truy cập Admin Login Page

Mở trình duyệt và truy cập:

```
http://localhost:3000/admin/login
```

### 4.3. Đăng nhập

Sử dụng thông tin admin đã tạo ở Bước 3:

- **Email**: `admin@yourdomain.com`
- **Password**: Mật khẩu bạn đã tạo

Nếu thành công, bạn sẽ được redirect đến `/admin` dashboard.

## 📊 Bước 5: Generate TypeScript Types (Optional nhưng khuyên dùng)

### 5.1. Cài đặt Supabase CLI (nếu chưa có)

```bash
npm install -g supabase
```

### 5.2. Login vào Supabase CLI

```bash
supabase login
```

### 5.3. Link Project

```bash
supabase link --project-ref your-project-ref
```

**Lấy project-ref**: Vào Supabase Dashboard → Settings → General → Reference ID

### 5.4. Generate Types

```bash
bun run db:types
```

Hoặc chạy trực tiếp:

```bash
supabase gen types typescript --project-id your-project-ref > lib/supabase/database.types.ts
```

File `database.types.ts` sẽ được tạo/cập nhật với TypeScript types từ database schema.

## 🧪 Bước 6: Test Database Connection

### 6.1. Tạo Test Script

Tạo file `scripts/test-db.ts`:

```typescript
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function testConnection() {
  console.log("🔍 Testing Supabase connection...");

  // Test 1: Fetch guests
  const { data: guests, error: guestsError } = await supabase
    .from("guests")
    .select("*")
    .limit(5);

  if (guestsError) {
    console.error("❌ Error fetching guests:", guestsError);
  } else {
    console.log(
      "✅ Guests fetched successfully:",
      guests?.length || 0,
      "records"
    );
  }

  // Test 2: Fetch wishes
  const { data: wishes, error: wishesError } = await supabase
    .from("wishes")
    .select("*")
    .limit(5);

  if (wishesError) {
    console.error("❌ Error fetching wishes:", wishesError);
  } else {
    console.log(
      "✅ Wishes fetched successfully:",
      wishes?.length || 0,
      "records"
    );
  }

  console.log("✨ Database connection test completed!");
}

testConnection();
```

### 6.2. Chạy Test

```bash
bun run scripts/test-db.ts
```

## 🎨 Bước 7: Customize Admin Dashboard (Optional)

Các file admin components đã có sẵn:

- `components/admin/LoginForm.tsx` - Form đăng nhập
- `components/admin/Sidebar.tsx` - Sidebar navigation
- `components/admin/TopBar.tsx` - Top bar
- `components/admin/StatCard.tsx` - Statistics cards
- `components/admin/guests/` - Guest management
- `components/admin/rsvp/` - RSVP management
- `components/admin/wishes/` - Wishes management

Bạn có thể customize các components này theo nhu cầu.

## 🔒 Bước 8: Security Best Practices

### 8.1. Bảo vệ Admin Routes

File middleware đã có sẵn tại `lib/supabase/middleware.ts`. Đảm bảo nó được sử dụng trong `middleware.ts` ở root:

```typescript
// middleware.ts (root level)
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

### 8.2. Environment Variables

Đảm bảo `.env.local` không được commit:

```bash
# .gitignore
.env*.local
.env
```

### 8.3. RLS Policies

Luôn kiểm tra RLS policies để đảm bảo:

- Public chỉ có thể đọc dữ liệu công khai
- Admin (authenticated users) có full access
- Sensitive data được bảo vệ

## 📝 Bước 9: Seed Data (Optional)

Nếu muốn thêm dữ liệu mẫu để test:

```sql
-- Insert sample guests
INSERT INTO guests (name, email, phone, number_of_guests, rsvp_status) VALUES
('Nguyễn Văn A', 'nguyenvana@example.com', '0901234567', 2, 'confirmed'),
('Trần Thị B', 'tranthib@example.com', '0912345678', 1, 'pending'),
('Lê Văn C', 'levanc@example.com', '0923456789', 3, 'confirmed');

-- Insert sample wishes
INSERT INTO wishes (guest_name, message, is_approved) VALUES
('Nguyễn Văn A', 'Chúc hai bạn trăm năm hạnh phúc!', true),
('Trần Thị B', 'Hạnh phúc mãi mãi bên nhau!', true),
('Lê Văn C', 'Chúc mừng đám cưới!', false);

-- Insert sample gallery images
INSERT INTO gallery_images (title, description, image_url, display_order) VALUES
('Ảnh cưới 1', 'Ảnh chụp tại biển', 'https://example.com/image1.jpg', 1),
('Ảnh cưới 2', 'Ảnh chụp tại studio', 'https://example.com/image2.jpg', 2);
```

## ✅ Checklist

- [ ] Tạo Supabase project
- [ ] Lấy API keys và tạo `.env.local`
- [ ] Chạy SQL để tạo tables
- [ ] Tạo RLS policies
- [ ] Tạo admin user
- [ ] Test login tại `/admin/login`
- [ ] Generate TypeScript types
- [ ] Test database connection
- [ ] Setup middleware cho protected routes
- [ ] (Optional) Seed sample data

## 🆘 Troubleshooting

### Lỗi: "Invalid login credentials"

- Kiểm tra email/password đã đúng chưa
- Kiểm tra user đã được confirm trong Supabase Auth chưa
- Kiểm tra `.env.local` có đúng API keys không

### Lỗi: "Failed to fetch"

- Kiểm tra `NEXT_PUBLIC_SUPABASE_URL` có đúng không
- Kiểm tra internet connection
- Kiểm tra Supabase project có đang active không

### Lỗi: "Row Level Security policy violation"

- Kiểm tra RLS policies đã được tạo đúng chưa
- Kiểm tra user đã authenticated chưa
- Thử disable RLS tạm thời để debug: `ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;`

### Không redirect sau khi login

- Kiểm tra middleware có được setup đúng không
- Kiểm tra cookies có được set không (check browser DevTools)
- Clear cookies và thử lại

## 📚 Tài liệu tham khảo

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Authentication](https://nextjs.org/docs/app/building-your-application/authentication)
- [Supabase Auth with Next.js](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
