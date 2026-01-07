# Task 13: Admin RSVP Management

## Objective

View and manage guest RSVPs with export functionality.

## Context

- Read-only view of RSVPs (guests submit via public form)
- Filter and search
- Export to CSV/Excel
- Summary statistics

## Requirements

### 1. RSVP List View

- Table with columns:
  - Guest Name
  - Attending (Yes/No badge)
  - Number of Guests
  - Dietary Restrictions
  - Message
  - Submitted At
- Sort by date, name, attending
- Filter by: Attending, Not Attending, All
- Search by guest name

### 2. Summary Stats

- Total RSVPs received
- Attending count (with total guests)
- Not Attending count
- Pending (invited but no RSVP)

### 3. Export Functionality

- Export to CSV
- Include all RSVP data
- Filter applied to export (optional)
- Download button

### 4. RSVP Detail View

- Click row to see full details
- Guest information
- RSVP response
- Timestamp
- Option to delete (edge case)

### 5. Pending RSVPs

- List guests who haven't responded
- Quick action to send reminder (future feature)

### 6. Components

```
app/
  admin/
    rsvp/
      page.tsx             # RSVP list
components/
  admin/
    rsvp/
      RSVPTable.tsx        # Data table
      RSVPFilters.tsx      # Search and filters
      RSVPStats.tsx        # Summary cards
      RSVPDetail.tsx       # Detail modal/sheet
      ExportButton.tsx     # CSV export
```

### 7. Data Fetching

```typescript
// Fetch RSVPs with guest info
const { data: rsvps } = await supabase
  .from("rsvp")
  .select(
    `
    *,
    guests ( name, email, phone, group_name )
  `
  )
  .order("created_at", { ascending: false });
```

## Acceptance Criteria

- [ ] RSVP list shows all responses
- [ ] Filters work correctly
- [ ] Search finds by guest name
- [ ] Export generates valid CSV
- [ ] Stats are accurate
- [ ] Detail view shows full info

## Export Format

CSV columns:

- Guest Name
- Email
- Phone
- Group
- Attending
- Number of Guests
- Dietary Restrictions
- Message
- Submitted At
