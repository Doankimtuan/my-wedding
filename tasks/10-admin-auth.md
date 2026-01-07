# Task 10: Admin Authentication

## Objective

Set up admin authentication using Supabase Auth.

## Context

- Only admin can access `/admin/*` routes
- Email/password login (simple)
- Protected by middleware
- Session persists across refreshes

## Requirements

### 1. Login Page

- Route: `/admin/login`
- Email input
- Password input
- Submit button with loading state
- Error message display
- Redirect to dashboard on success

### 2. Supabase Auth Setup

- Use email/password authentication
- Create admin user in Supabase Auth dashboard
- Handle session management

### 3. Middleware Protection

Update `middleware.ts`:

- Check auth session for `/admin/*` routes (except `/admin/login`)
- Redirect unauthenticated users to `/admin/login`
- Redirect authenticated users from login to dashboard

### 4. Auth Utilities

```typescript
// lib/auth.ts
export async function signIn(email: string, password: string);
export async function signOut();
export async function getSession();
export async function requireAuth(); // Server Component helper
```

### 5. Components

```
app/
  admin/
    login/
      page.tsx             # Login page
    layout.tsx             # Admin layout with auth check
components/
  admin/
    LoginForm.tsx          # Login form component
    LogoutButton.tsx       # Logout action
```

### 6. Session Handling

- Store session in cookies (handled by Supabase SSR)
- Auto-refresh tokens
- Logout clears session

## Acceptance Criteria

- [ ] Login page renders correctly
- [ ] Valid credentials log in successfully
- [ ] Invalid credentials show error
- [ ] Unauthenticated access redirects to login
- [ ] Logout clears session
- [ ] Session persists on refresh

## Security Notes

- Use HTTPS in production
- Rate limit login attempts (Supabase handles this)
- Consider adding 2FA later
- Don't expose service role key client-side
