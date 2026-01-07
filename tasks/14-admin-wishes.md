# Task 14: Admin Wishes Moderation

## Objective

Moderate guest wishes before they appear publicly.

## Context

- Wishes are submitted publicly, need approval
- Simple approve/reject workflow
- View all wishes including rejected

## Requirements

### 1. Wishes Queue

- List pending wishes (is_approved: false)
- Show: Guest Name, Message, Submitted At
- Quick approve/reject buttons
- Preview how it will look

### 2. Approved Wishes

- Separate tab or filter
- Can unapprove (hide from public)
- Edit capability (fix typos)

### 3. Bulk Actions

- Select multiple wishes
- Bulk approve
- Bulk delete

### 4. Moderation Actions

- **Approve**: Set is_approved: true, shows publicly
- **Reject/Delete**: Remove from database
- **Edit**: Modify message (admin only)

### 5. Preview

- Show wish card as it appears on public site
- Toggle between pending and live view

### 6. Components

```
app/
  admin/
    wishes/
      page.tsx             # Wishes list
components/
  admin/
    wishes/
      WishesQueue.tsx      # Pending list
      WishCard.tsx         # Individual wish
      WishActions.tsx      # Approve/Reject buttons
      WishEditor.tsx       # Edit modal
      BulkActions.tsx      # Bulk selection tools
```

### 7. Server Actions

```typescript
// app/actions/wishes.ts
export async function approveWish(id: string);
export async function approveWishes(ids: string[]); // bulk
export async function rejectWish(id: string);
export async function updateWish(id: string, message: string);
export async function deleteWish(id: string);
```

## Acceptance Criteria

- [ ] Pending wishes displayed in queue
- [ ] Approve action makes wish public
- [ ] Reject removes wish
- [ ] Bulk approve works
- [ ] Edit updates message
- [ ] Approved list shows published wishes

## UI/UX Notes

- Color coding: pending (yellow), approved (green)
- Confirmation for destructive actions
- Keyboard shortcuts for power users (optional)
- Real-time updates when new wishes arrive
