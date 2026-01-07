# Task 08: Wishes Section

## Objective

Create a wishbook where guests can leave messages for the couple.

## Context

- Simple form to submit wishes
- Display approved wishes (admin moderation)
- Real-time updates optional
- Guest doesn't need to log in

## Requirements

### 1. Wish Submission Form

- Guest name (required)
- Message (required, max 500 chars)
- Character counter
- Submit with loading state
- Success confirmation

### 2. Wishes Display

- Card or speech bubble design
- Show guest name and message
- Timestamp (relative: "2 hours ago")
- Animated reveal on scroll
- Pagination or infinite scroll

### 3. Moderation

- New wishes have `is_approved: false`
- Only display approved wishes publicly
- Admin approves via admin panel

### 4. Optional: Real-time Updates

- Use Supabase Realtime
- New approved wishes appear automatically
- Subtle animation for new entries

### 5. Components

```
components/
  wishes/
    WishesSection.tsx      # Main section
    WishForm.tsx           # Submission form
    WishesList.tsx         # List container
    WishCard.tsx           # Individual wish
    WishSubmitSuccess.tsx  # Success message
```

### 6. Data Structure

```typescript
interface Wish {
  id: string;
  guestName: string;
  message: string;
  isApproved: boolean;
  createdAt: Date;
}
```

### 7. Server Actions

```typescript
// app/actions/wishes.ts
"use server";

export async function submitWish(data: { guestName: string; message: string }) {
  // Validate input
  // Insert to wishes table with is_approved: false
  // Return success
}
```

## Acceptance Criteria

- [ ] Guests can submit wishes without login
- [ ] Form validates and shows errors
- [ ] Success message after submission
- [ ] Only approved wishes are displayed
- [ ] Wishes animate on scroll
- [ ] Character count shows remaining

## Design Ideas

- Handwritten-style font for wishes
- Speech bubble or card layout
- Background texture (paper, fabric)
- Decorative elements (flowers, hearts)

## Spam Prevention

- Rate limiting (1 wish per minute per IP)
- Profanity filter (optional)
- Admin moderation as primary defense
