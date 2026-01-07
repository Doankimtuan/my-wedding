# Task 06: RSVP Form

## Objective

Create a beautiful, validated RSVP form that saves responses to Supabase.

## Context

- Use React Hook Form + Zod for validation
- Pre-fill guest name if accessed via personalized link
- Good UX with immediate feedback
- Handle both attending and not attending responses

## Requirements

### 1. Form Fields

- **Guest Name** (pre-filled if from personalized link, required)
- **Attending?** (Yes/No radio buttons, required)
- **Number of Guests** (shown only if attending, min 1, max 5)
- **Dietary Restrictions** (text area, optional)
- **Message for the Couple** (text area, optional)
- **Email** (optional, for updates)
- **Phone** (optional)

### 2. Validation with Zod

```typescript
const rsvpSchema = z.object({
  guestName: z.string().min(2, "Name is required"),
  attending: z.boolean(),
  numberOfGuests: z.number().min(1).max(5).optional(),
  dietaryRestrictions: z.string().optional(),
  message: z.string().max(500).optional(),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
});
```

### 3. Conditional Logic

- If "Not Attending": hide numberOfGuests, show optional message
- If "Attending": show numberOfGuests selector
- Show confirmation message after submission

### 4. Supabase Integration

- Check if guest exists (by slug from URL)
- Insert or update RSVP record
- Use Server Actions for form submission
- Handle duplicate submissions gracefully

### 5. UI/UX

- Animated form reveals
- Loading state during submission
- Success animation (confetti optional)
- Error handling with user-friendly messages
- Progress indicator if multi-step

### 6. Components

```
components/
  rsvp/
    RSVPSection.tsx        # Main section wrapper
    RSVPForm.tsx           # Form component
    AttendanceToggle.tsx   # Yes/No selection
    GuestCounter.tsx       # Number of guests selector
    SuccessMessage.tsx     # Post-submission confirmation
```

### 7. Server Action

```typescript
// app/actions/rsvp.ts
"use server";

export async function submitRSVP(formData: RSVPFormData) {
  // Validate
  // Check existing guest
  // Insert RSVP
  // Return success/error
}
```

## Acceptance Criteria

- [ ] Form validates correctly with helpful error messages
- [ ] RSVP saves to Supabase
- [ ] Guest name pre-fills from URL
- [ ] Conditional fields show/hide correctly
- [ ] Success message displays after submission
- [ ] Handles duplicate submissions
- [ ] Fully accessible (keyboard navigation, screen readers)

## Error Handling

- Network errors: retry option
- Duplicate RSVP: show update confirmation
- Invalid guest: allow new submission
