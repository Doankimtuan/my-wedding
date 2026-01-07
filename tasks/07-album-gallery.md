# Task 07: Album Gallery

## Objective

Create a beautiful photo gallery showcasing the couple's pre-wedding photos.

## Context

- Use Next.js Image optimization
- Lightbox for full-screen viewing
- Lazy loading for performance
- Images stored in Supabase Storage

## Requirements

### 1. Gallery Layout

- Masonry or grid layout
- Responsive columns (1 on mobile, 2-3 on tablet, 4 on desktop)
- Smooth loading animations
- Hover effects with slight zoom or overlay

### 2. Lightbox Feature

- Click image to open fullscreen
- Navigate with arrows or swipe
- Keyboard navigation (arrow keys, ESC)
- Image counter (3/12)
- Caption display
- Close button

### 3. Image Optimization

- Use `next/image` for automatic optimization
- Blur placeholder while loading
- Proper srcSet for responsive images
- WebP format when supported

### 4. Data Fetching

- Fetch images from Supabase `album_images` table
- Order by `display_order`
- Cache images on CDN

### 5. Components

```
components/
  album/
    AlbumSection.tsx       # Main section with title
    PhotoGallery.tsx       # Grid/masonry container
    PhotoCard.tsx          # Individual photo with hover
    Lightbox.tsx           # Fullscreen viewer
```

### 6. Animation Ideas

- Fade-in on scroll into view
- Staggered reveal for grid items
- Smooth zoom transition to lightbox
- Pan/zoom gestures on lightbox

### 7. Data Structure

```typescript
interface AlbumImage {
  id: string;
  imageUrl: string;
  thumbnailUrl?: string;
  caption?: string;
  displayOrder: number;
}
```

## Acceptance Criteria

- [ ] Gallery displays all images in attractive layout
- [ ] Lightbox opens and navigates correctly
- [ ] Images are optimized and load quickly
- [ ] Keyboard navigation works
- [ ] Mobile swipe gestures work
- [ ] Lazy loading implemented

## Performance Considerations

- Use thumbnail for grid, full-size for lightbox
- Implement virtual scrolling if many images
- Preload adjacent images in lightbox
- BlurHash or LQIP placeholders

## Optional Enhancements

- Filter by category/album
- Download original option
- Share image button
- Pinch to zoom on mobile
