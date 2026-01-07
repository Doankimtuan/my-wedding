# Task 04: Main Invitation Page

## Objective

Create the main wedding invitation section with couple information and love story.

## Context

- This is the second section after the landing hero
- Should feel like unfolding a physical invitation card
- Smooth scroll from landing page

## Requirements

### 1. Section Layout

- Full-width section with decorative borders
- Card-like design with shadow and subtle animations
- Background: textured paper or elegant pattern

### 2. Content Elements

#### Couple Introduction

- Groom and Bride names in elegant typography
- Profile photos or illustrated avatars
- Brief introduction text
- Family parents' names (optional)

#### Love Story Timeline

- Vertical or horizontal timeline
- Key milestones: "First Met", "First Date", "Engagement"
- Animated reveal on scroll
- Each milestone with date and short description

#### Wedding Announcement

- Formal invitation text
- "Together with their families..."
- Request for the honor of your presence

### 3. Animations

- Scroll-triggered reveal animations
- Parallax effect on background
- Staggered timeline animation
- Card flip or unfold effect

### 4. Components

```
components/
  invitation/
    InvitationCard.tsx      # Main invitation wrapper
    CoupleSection.tsx       # Names and photos
    LoveStoryTimeline.tsx   # Timeline component
    TimelineItem.tsx        # Individual milestone
    InvitationText.tsx      # Formal invitation wording
```

### 5. Data Structure

```typescript
interface WeddingInfo {
  groomName: string;
  brideName: string;
  groomParents?: string;
  brideParents?: string;
  storyText?: string;
  heroImageUrl?: string;
}

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  imageUrl?: string;
}
```

## Acceptance Criteria

- [ ] Elegant card design with decorative elements
- [ ] Couple names and photos displayed
- [ ] Love story timeline animates on scroll
- [ ] Responsive design for all screen sizes
- [ ] Smooth transition from landing section

## Design Notes

- Use serif fonts for formal text
- Include decorative flourishes and dividers
- Maintain consistent color palette
- Consider light/dark mode support
