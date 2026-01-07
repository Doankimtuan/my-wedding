# Task 09: QR Banking Section

## Objective

Create a section for guests to send monetary gifts via bank transfer with QR code.

## Context

- Common in Vietnamese weddings
- Display bank account details
- QR code for easy mobile banking
- Optional: multiple bank options

## Requirements

### 1. Section Layout

- Elegant card design
- Clear heading ("Gift")
- Couple's photo or icon
- Thank you message

### 2. Bank Information Display

- Bank name
- Account number (with copy button)
- Account holder name
- Branch (optional)

### 3. QR Code

- Display QR image from Supabase or generate
- VietQR format for Vietnamese banks
- Size optimized for mobile scanning
- Caption: "Scan to transfer"

### 4. Copy to Clipboard

- Click to copy account number
- Toast notification: "Copied!"
- Works on mobile

### 5. Multiple Accounts (Optional)

- Tabs or cards for Groom/Bride accounts
- Each with own bank info and QR

### 6. Components

```
components/
  banking/
    BankingSection.tsx     # Main section
    BankAccountCard.tsx    # Individual account card
    QRCodeDisplay.tsx      # QR code with caption
    CopyButton.tsx         # Copy to clipboard button
```

### 7. Data Structure

```typescript
interface BankAccount {
  name: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  qrImageUrl: string;
}
```

## Acceptance Criteria

- [ ] Bank details clearly displayed
- [ ] QR code displays correctly
- [ ] Copy button copies account number
- [ ] Toast shows confirmation
- [ ] Mobile-friendly layout
- [ ] Loads fast (QR image optimized)

## Design Notes

- Consider subtle gold/rose gold accents
- Icon for gift/money
- Keep it tasteful (not too prominent)
- Optional: animate QR on scroll into view

## VietQR Information

- Vietnamese banks support VietQR format
- Can generate via VietQR.io API or use pre-made images
- Consider fallback static image
