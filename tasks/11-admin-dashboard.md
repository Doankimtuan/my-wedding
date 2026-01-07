# Task 11: Admin Dashboard

## Objective

Create the main admin dashboard with overview statistics and navigation.

## Context

- First page after admin login
- Quick glance at key metrics
- Navigation to all admin sections
- Clean, functional design

## Requirements

### 1. Dashboard Layout

- Sidebar navigation
- Top header with logout
- Main content area
- Responsive (collapsible sidebar on mobile)

### 2. Statistics Cards

Display at-a-glance metrics:

- Total Guests Invited
- RSVPs Received
- Attending (Yes count)
- Not Attending (No count)
- Pending RSVP
- Total Wishes (pending moderation)

### 3. Quick Actions

- Add new guest
- Export guest list (CSV)
- View recent RSVPs
- View pending wishes

### 4. Recent Activity

- Last 5 RSVPs
- Last 5 wishes
- Quick links to full lists

### 5. Navigation Items

- Dashboard (overview)
- Guests (list, add, edit)
- RSVPs (view, export)
- Wishes (moderate)
- Content (edit wedding info)
- Album (manage photos)
- Settings (optional)

### 6. Components

```
app/
  admin/
    page.tsx               # Dashboard page
    layout.tsx             # Admin layout with sidebar
components/
  admin/
    Sidebar.tsx            # Navigation sidebar
    TopBar.tsx             # Header with user info
    StatCard.tsx           # Metric display card
    RecentActivity.tsx     # Activity list
    QuickActions.tsx       # Action buttons
```

### 7. Data Fetching

```typescript
// Server Component data fetch
async function getDashboardStats() {
  const supabase = createClient()

  // Count queries for each metric
  const [guests, rsvps, wishes] = await Promise.all([
    supabase.from('guests').select('id', { count: 'exact' }),
    supabase.from('rsvp').select('*, guests!inner(name)'),
    supabase.from('wishes').select('id', { count: 'exact' }).eq('is_approved', false),
  ])

  return { ... }
}
```

## Acceptance Criteria

- [ ] Dashboard shows correct statistics
- [ ] Navigation works to all sections
- [ ] Responsive sidebar on mobile
- [ ] Recent activity displays correctly
- [ ] Quick actions work

## Design Notes

- Use shadcn/ui components
- Clean, minimal admin aesthetic
- Cards with subtle shadows
- Color-coded metrics (green for attending, red for not)
