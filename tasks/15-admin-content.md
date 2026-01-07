# Task 15: Admin Content Management

## Objective

Allow admin to edit wedding information and content.

## Context

- Single form for all wedding details
- Image upload for hero, album, QR
- Preview changes before saving

## Requirements

### 1. Wedding Info Form

Edit all `wedding_info` fields:

**Couple Information**

- Groom Name
- Bride Name
- Love Story Text

**Event Details**

- Wedding Date
- Wedding Time
- Venue Name
- Venue Address
- Map URL

**Bank Information**

- Bank Name
- Account Number
- Account Holder Name
- QR Code Image

**Media**

- Hero Image
- Album Images (managed separately)

### 2. Image Upload

- Drag and drop or file picker
- Upload to Supabase Storage
- Show preview after upload
- Delete/replace existing

### 3. Rich Text Editor

- For story text and other long content
- Basic formatting: bold, italic, links
- Consider: TipTap or Lexical

### 4. Preview

- Show changes in real-time
- Mobile preview mode
- Side-by-side preview

### 5. Album Management

- Upload multiple images
- Drag to reorder
- Add captions
- Delete images

### 6. Components

```
app/
  admin/
    content/
      page.tsx             # Content editor
    album/
      page.tsx             # Album manager
components/
  admin/
    content/
      ContentForm.tsx      # Main form
      ImageUpload.tsx      # Upload component
      RichTextEditor.tsx   # Text editor
      PreviewPane.tsx      # Live preview
    album/
      AlbumManager.tsx     # Image grid
      ImageUploadZone.tsx  # Drag and drop
      SortableImage.tsx    # Draggable image item
```

### 7. Server Actions

```typescript
// app/actions/content.ts
export async function updateWeddingInfo(data: WeddingInfoForm);
export async function uploadImage(formData: FormData);
export async function deleteImage(path: string);

// app/actions/album.ts
export async function addAlbumImage(imageUrl: string, caption?: string);
export async function updateAlbumOrder(images: { id: string; order: number }[]);
export async function deleteAlbumImage(id: string);
```

## Acceptance Criteria

- [ ] All wedding info fields editable
- [ ] Images upload successfully
- [ ] Album images can be reordered
- [ ] Changes save correctly
- [ ] Preview shows accurate representation

## Libraries

- Image upload: native FormData + Supabase Storage
- Drag and drop: `@dnd-kit/core`
- Rich text: TipTap or simple textarea
