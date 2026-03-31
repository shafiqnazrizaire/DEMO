# Booking Form Payment Rate Implementation

## Overview
This document details the auto-calculated payment rate system implemented for the booking form. The system dynamically calculates and displays pricing based on selected package, transportation, and duration.

---

## Extracted Package Pricing

### Standard Packages (Fixed Rates)

#### Package A - Penang Heritage Discovery
- **Car**: RM 299 (Max 4 people)
- **MPV**: RM 449 (Max 6 people)
- **Van**: RM 599 (Max 12 people)
- **Duration**: 1 Day (8 hours)

#### Package B - Penang 1-Day Itinerary
- **Car**: RM 350-380 (varies by tour option)
- **MPV**: RM 450-480 (varies by tour option)
- **Van**: RM 570-600 (varies by tour option)
- **Duration**: 1 Day
- **Tour Options**:
  - Culture & Heritage Tour: Car RM 350, MPV RM 450, Van RM 570
  - Nature & Coastal Tour: Car RM 380, MPV RM 480, Van RM 600

#### Package C - 3D2N Cameron Highlands Tour
- **Car**: RM 500 (Max 4 people)
- **MPV**: RM 700 (Max 6 people)
- **Van**: RM 900 (Max 12 people)
- **Duration**: 3 Days, 2 Nights

#### Package D - 2D1N Genting Highlands Package
- **Car**: RM 1,299 (Max 4 people)
- **MPV**: RM 1,599 (Max 6 people)
- **Van**: RM 1,999 (Max 12 people)
- **Duration**: 2 Days, 1 Night

#### Package E - 1-Day Bukit Merah Tour
- **Car**: RM 300 (Max 4 people)
- **MPV**: RM 450 (Max 6 people)
- **Van**: RM 600 (Max 12 people)
- **Duration**: 1 Day (10 hours)

#### Package F - Water Activities (Batu Feringgi Beach)
**Variable pricing based on activity**:
- Jet Ski (Single Rider): RM 100
- Jet Ski (Double Rider): RM 200
- Parasailing (Single): RM 130
- Parasailing (Double): RM 260
- Banana Boat Ride: RM 35 per person (Max 4 people)
- Boat Ride: RM 180 per person (Max 2 people)
- Boat Ride + Fishing: RM 275 per person (Max 2 people)

#### Package G - Airport Transfer
**Pricing varies by route**:

**Route 1: Penang Hotel ↔ Penang Airport**
- Car: RM 90 (Max 4 people)
- MPV: RM 160 (Max 7 people)
- Van: RM 120 (Max 12 people)

**Route 2: Penang Hotel ↔ KLIA**
- Car: RM 750 (Max 4 people)
- MPV: RM 850 (Max 7 people)
- Van: RM 980 (Max 12 people)

#### Package I - Penang 2-Day Itinerary
- **Car**: RM 650-750 (varies by tour option)
- **MPV**: RM 850-950 (varies by tour option)
- **Van**: RM 1,100-1,200 (varies by tour option)
- **Duration**: 2 Days (18 hours total)
- **Tour Options**:
  - Heritage & Culture Tour: Car RM 650, MPV RM 850, Van RM 1,100
  - Nature & Adventure Tour: Car RM 750, MPV RM 950, Van RM 1,200

---

### Customized Packages (Hourly Rates)

#### Package K - Customized Penang Package
**Hourly rates**:
- **Car**: RM 30/hour (Max 4 people)
- **Van**: RM 60/hour (Max 12 people)
- **Duration**: 1-7 days or more (Flexible)
- **Calculation**: Days × 8 hours/day × Hourly rate

**Examples**:
- 1 Day with Car: 1 × 8 × RM 30 = **RM 240**
- 3 Days with Car: 3 × 8 × RM 30 = **RM 720**
- 1 Day with Van: 1 × 8 × RM 60 = **RM 480**
- 5 Days with Van: 5 × 8 × RM 60 = **RM 2,400**

#### Custom Tour - Custom Itinerary
**Same pricing structure as Package K**:
- **Car**: RM 30/hour (Max 4 people)
- **Van**: RM 60/hour (Max 12 people)
- Flexible duration and destinations

---

## Implementation Details

### New Form Fields Added

1. **Number of Days** (Dropdown)
   - Only visible for Package K and Custom Tour
   - Options: 1-7 days, or "More than 7 days"
   - Required for customized packages

2. **Transportation** (Dropdown)
   - Visible for all packages except Package F
   - Options vary by package (Car, MPV, Van)
   - Required field

3. **Estimated Payment Rate** (Read-only)
   - Dynamically calculated based on selections
   - Styled with blue gradient background
   - Includes helper text with calculation details

### Calculation Logic

#### For Standard Packages (A, B, C, D, E, G, I):
```
Payment = Fixed Rate[transportation]
```

#### For Package K & Custom Tour:
```
If days < 8:
    Payment = days × 8 hours × hourly_rate[transportation]

If days = "custom":
    Show hourly rate and prompt for details in description
```

#### For Package F (Water Activities):
```
Payment = "From RM 35 (varies by activity)"
Note: User must specify activity in description
```

#### For Package G (Airport Transfer):
```
Payment = "From RM [base_rate]"
Note: Price varies by route selection
```

### Auto-Calculation Triggers

The payment rate is automatically recalculated when:
1. User selects or changes tour type
2. User selects or changes transportation
3. User selects or changes number of days (for customized packages)

### Form Validation

- Transportation field is required for all packages except Package F
- Days field is required for Package K and Custom Tour
- Payment rate field is always read-only (auto-populated)

---

## User Experience Features

### Visual Indicators
- **Read-only field**: Blue gradient background with lock cursor
- **Helper text**: Italic gray text explaining calculation
- **Dynamic visibility**: Fields show/hide based on package selection

### Informative Notes
Different packages show contextual notes:
- **Standard packages**: "All-inclusive package rate with professional guide and transportation"
- **Packages with options (B, I)**: "Price may vary based on selected tour option"
- **Airport transfer (G)**: "Price varies by route (Penang Airport or KLIA)"
- **Customized (K, Custom)**: Shows calculation breakdown
- **Water activities (F)**: "Final price depends on activity selection"

---

## File Modifications

### 1. index.html
- Added `daysSelectionGroup` (Number of Days dropdown)
- Added `transportationGroup` (Transportation dropdown)
- Added `paymentRateGroup` (Read-only payment field with helper text)

### 2. styles.css
- Added `.readonly-field` styles (blue gradient background)
- Added `.form-helper-text` styles (italic gray text)

### 3. script.js
Added new functions:
- `initializeBookingPaymentCalculator()` - Initializes event listeners
- `handleTourTypeChange()` - Shows/hides relevant fields
- `configureBookingTransportOptions()` - Configures transport dropdown options
- `calculateBookingPaymentRate()` - Main calculation logic

---

## Testing Scenarios

### Test Case 1: Standard Package
1. Select "Package A - Penang Heritage Discovery"
2. Select "Car" from transportation
3. **Expected**: Payment shows "RM 299"

### Test Case 2: Customized Package
1. Select "Package K - Customized Package"
2. Select "3 Days" from days
3. Select "Van" from transportation
4. **Expected**: Payment shows "RM 1440" (3 × 8 × 60)

### Test Case 3: Package with Tour Options
1. Select "Package B - Penang 1-Day Itinerary"
2. Select "MPV" from transportation
3. **Expected**: Payment shows "RM 450-480" range with note

### Test Case 4: Water Activities
1. Select "Package F - Water Activities"
2. **Expected**: Transportation field hidden, payment shows "From RM 35 (varies by activity)"

---

## Benefits

1. **Transparency**: Users see estimated costs before booking
2. **Clarity**: Calculation breakdown provided for customized packages
3. **Guidance**: Helper text explains pricing variations
4. **Efficiency**: Automatic calculation reduces confusion
5. **Professional**: Polished, read-only presentation prevents tampering

---

## Future Enhancements (Optional)

1. Add route selection dropdown for Package G in booking form
2. Add activity selection dropdown for Package F in booking form
3. Implement currency conversion for international visitors
4. Add discount code functionality
5. Show price comparison between transportation options

---

**Implementation Date**: February 5, 2026  
**Status**: ✅ Complete and Tested  
**Linter Status**: ✅ No errors
