# Task 16: Deployment

## Objective

Deploy the wedding invitation system to production.

## Context

- Frontend: Vercel
- Backend: Supabase (already hosted)
- Domain: Custom domain configuration

## Requirements

### 1. Pre-deployment Checklist

- [ ] All environment variables set
- [ ] Build passes without errors
- [ ] Supabase production project created
- [ ] Database migrations applied
- [ ] RLS policies tested
- [ ] Admin user created in Supabase Auth

### 2. Vercel Deployment

#### Connect Repository

- Link GitHub repository to Vercel
- Set framework: Next.js
- Set root directory: (default)

#### Environment Variables

Add in Vercel dashboard:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

#### Build Settings

- Build command: `npm run build`
- Output directory: `.next`
- Install command: `npm install`

### 3. Custom Domain (Optional)

- Add domain in Vercel
- Configure DNS records:
  - A record or CNAME
- Enable HTTPS (automatic)

### 4. Supabase Production Setup

- Create production project
- Run SQL migrations
- Set up RLS policies
- Configure auth email templates
- Create admin user
- Set up storage bucket

### 5. Performance Optimization

- Enable Vercel Edge caching
- Configure image optimization
- Set cache headers
- Enable ISR for static content

### 6. Monitoring

- Vercel Analytics (free tier)
- Error tracking (Sentry optional)
- Uptime monitoring

### 7. Post-deployment Verification

- [ ] Landing page loads correctly
- [ ] Personalized links work
- [ ] RSVP form submits successfully
- [ ] Wishes submit and appear (after approval)
- [ ] Admin login works
- [ ] All admin functions work
- [ ] Mobile responsiveness verified

## Acceptance Criteria

- [ ] Site accessible at production URL
- [ ] HTTPS enabled
- [ ] All features work in production
- [ ] Environment variables secured
- [ ] Performance acceptable (<3s load time)

## Deployment Commands

```bash
# Verify build locally
npm run build

# Deploy to Vercel (if using CLI)
vercel --prod
```

## Rollback Plan

- Vercel auto-stores previous deployments
- One-click rollback in dashboard
- Database has Supabase backups
