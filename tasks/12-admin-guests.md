# Task 12: Admin Guest Management

## Objective

CRUD interface for managing wedding guests.

## Context

- Add, edit, delete guests
- Generate personalized invitation links
- Bulk import from CSV
- Filter and search

## Requirements

### 1. Guest List View

- Sortable table with columns:
  - Name
  - Slug (link identifier)
  - Group
  - Email
  - Phone
  - RSVP Status
  - Invitation Sent
  - Actions
- Search by name
- Filter by group, RSVP status
- Pagination

### 2. Add Guest Form

- Name (required)
- Slug (auto-generated from name, editable)
- Email
- Phone
- Group (dropdown or input)
- Save button

### 3. Edit Guest

- Same form as add, pre-filled
- Update button
- Delete button with confirmation

### 4. Personalized Link Generator

- Display: `{domain}/?guest={slug}`
- Copy link button
- QR code for link (optional)

### 5. Bulk Import

- CSV upload
- Map columns to fields
- Preview before import
- Handle duplicates

### 6. Mark Invitation Sent

- Checkbox or button
- Bulk action for multiple guests

### 7. Components

```
app/
  admin/
    guests/
      page.tsx             # Guest list
      new/
        page.tsx           # Add guest form
      [id]/
        edit/
          page.tsx         # Edit guest form
components/
  admin/
    guests/
      GuestTable.tsx       # Data table
      GuestForm.tsx        # Add/Edit form
      GuestFilters.tsx     # Search and filters
      BulkImport.tsx       # CSV import modal
      InvitationLink.tsx   # Link generator
```

### 8. Server Actions

```typescript
// app/actions/guests.ts
export async function createGuest(data: GuestForm);
export async function updateGuest(id: string, data: GuestForm);
export async function deleteGuest(id: string);
export async function bulkImportGuests(guests: GuestForm[]);
export async function markInvitationSent(ids: string[]);
```

## Acceptance Criteria

- [ ] Guest list displays with all columns
- [ ] Search and filter work correctly
- [ ] Add guest creates new record
- [ ] Edit updates existing record
- [ ] Delete removes with confirmation
- [ ] Invitation link copies correctly
- [ ] Bulk import works for CSV

## Slug Generation

- Normalize name to lowercase
- Replace spaces with hyphens
- Remove special characters
- Handle duplicates (add number suffix)
