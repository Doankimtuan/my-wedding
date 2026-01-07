# Task 05: Event Information Page

## Objective

Display wedding ceremony and reception details with venue information and map.

## Context

- Clear, scannable information
- Include interactive map
- Multiple events support (ceremony, reception, after-party)

## Requirements

### 1. Event Cards

Each event should display:

- Event name (Ceremony, Reception, etc.)
- Date and time with timezone
- Venue name
- Full address
- Dress code (optional)
- Special notes

### 2. Interactive Map

- Embed Google Maps or Mapbox
- Show venue marker
- "Get Directions" button
- Consider static map image for performance

### 3. Calendar Integration

- "Add to Calendar" button
- Support: Google Calendar, Apple Calendar, Outlook
- Generate .ics file download

### 4. Schedule/Timeline

- Visual timeline of the day
- Time blocks showing activities:
  - Guest arrival
  - Ceremony
  - Cocktail hour
  - Reception
  - First dance, etc.

### 5. Components

```
components/
  events/
    EventSection.tsx       # Main section wrapper
    EventCard.tsx          # Individual event card
    VenueMap.tsx           # Map component
    AddToCalendar.tsx      # Calendar button dropdown
    DayTimeline.tsx        # Schedule visualization
    TimeBlock.tsx          # Individual time slot
```

### 6. Data Structure

```typescript
interface Event {
  id: string;
  name: string;
  date: Date;
  startTime: string;
  endTime?: string;
  venueName: string;
  venueAddress: string;
  mapUrl?: string;
  dressCode?: string;
  notes?: string;
}
```

## Acceptance Criteria

- [ ] All event details clearly displayed
- [ ] Map shows venue location correctly
- [ ] Add to Calendar generates correct event
- [ ] Timeline visually shows day schedule
- [ ] Mobile-friendly layout

## Libraries to Consider

- `@react-google-maps/api` or static map image
- `add-to-calendar-button` npm package
- Or build custom calendar file generator
