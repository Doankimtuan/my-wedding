# Task 03: Guest Landing Page

## Objective

Create a beautiful, animated landing page that greets guests with their personalized name.

## Context

- Mobile-first design
- Reference: cinelove.me/template/pc/thiep-cuoi-42
- Use Framer Motion for smooth animations
- Guest name from URL: `/?guest=nguyen-van-a`

## Requirements

### 1. Route Structure

- Path: `app/page.tsx` (main landing)
- This page should read query params and display personalized greeting

### 2. Query Parameter Handling

- Read `guest` or `to` from URL search params
- Use `nuqs` or native `useSearchParams` for URL state
- If no guest param, show generic greeting

### 3. UI Components

#### Hero Section

- Full-screen hero with background image/video
- Couple's names displayed elegantly
- Personalized greeting: "Dear [Guest Name]"
- Wedding date with countdown timer
- Animated scroll indicator

#### Visual Style

- Elegant typography (use Google Fonts: Playfair Display, Great Vibes, or similar)
- Soft color palette (rose gold, cream, sage green)
- Glassmorphism effects for cards
- Parallax scrolling effects

### 4. Animations (Framer Motion)

- Fade-in on page load
- Staggered text animations
- Floating decorative elements (flowers, hearts)
- Smooth scroll transitions

### 5. Data Fetching

- Fetch wedding_info from Supabase
- Lookup guest by slug if `guest` param provided
- Use Server Components for initial data

### 6. SEO & Social Sharing

- Dynamic OpenGraph images with guest name
- Proper meta tags
- `generateMetadata` function

## Component Structure

```
app/
  page.tsx                 # Main landing (Server Component)
  components/
    hero/
      HeroSection.tsx      # Full-screen hero
      CountdownTimer.tsx   # Days until wedding
      ScrollIndicator.tsx  # Animated scroll arrow
    decorations/
      FloatingElements.tsx # Animated decorative elements
```

## Acceptance Criteria

- [ ] Page loads with smooth animations
- [ ] Guest name displayed if provided in URL
- [ ] Countdown timer works correctly
- [ ] Fully responsive (mobile-first)
- [ ] SEO meta tags render correctly
- [ ] Smooth scroll to next section

## Design Reference

- Elegant, romantic aesthetic
- Soft gradients and shadows
- High-quality typography
- Subtle micro-animations
