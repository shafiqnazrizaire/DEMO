# Testing Guide for Auto-Calculated Payment Rate System

## Quick Test Steps

### 1. Test Standard Package (Package A)
1. Open the website and navigate to the **Bookings** page
2. Select **Package A - Penang Heritage Discovery**
3. Observe:
   - Transportation dropdown appears
   - Days selection remains hidden
4. Select **Car** from transportation
5. **Expected Result**: Payment rate shows "RM 299" with note "All-inclusive package rate with professional guide and transportation"

### 2. Test Customized Package (Package K)
1. Navigate to **Bookings** page
2. Select **Package K - Customized Package**
3. Observe:
   - Both "Number of Days" and "Transportation" dropdowns appear
   - Payment rate field remains hidden until both are selected
4. Select **3 Days** from days dropdown
5. Select **Van** from transportation
6. **Expected Result**: 
   - Payment rate shows "RM 1440"
   - Note shows "Based on 3 day(s) × 8 hours/day × RM 60/hour for Van"

### 3. Test Water Activities (Package F)
1. Navigate to **Bookings** page
2. Select **Package F - Water Activities Package**
3. **Expected Result**:
   - Transportation dropdown is hidden
   - Days dropdown is hidden
   - Payment rate immediately shows "From RM 35 (varies by activity)"
   - Note shows "Final price depends on activity selection. Please specify in description."

### 4. Test Airport Transfer (Package G)
1. Navigate to **Bookings** page
2. Select **Package G - Airport Transfer**
3. Observe transportation dropdown appears
4. Select **Car** from transportation
5. **Expected Result**:
   - Payment rate shows "From RM 90"
   - Note shows "Price varies by route (Penang Airport or KLIA). Please specify route in description."

### 5. Test Package with Tour Options (Package B)
1. Navigate to **Bookings** page
2. Select **Package B - Penang 1-Day Itinerary**
3. Select **MPV** from transportation
4. **Expected Result**:
   - Payment rate shows "RM 450"
   - Note shows "Price may vary based on selected tour option. Please specify your preference in description."

### 6. Test Custom Tour
1. Navigate to **Bookings** page
2. Select **Custom Tour - Custom Itinerary**
3. Select **5 Days**
4. Select **Car**
5. **Expected Result**:
   - Payment rate shows "RM 1200"
   - Note shows "Based on 5 day(s) × 8 hours/day × RM 30/hour for Car"

### 7. Test "More than 7 days" Option
1. Select **Package K**
2. Select **More than 7 days** from days dropdown
3. Select **Van**
4. **Expected Result**:
   - Payment rate shows "RM 60/hour"
   - Note shows "Please specify exact number of days and hours in description for accurate quote."

### 8. Test Field Switching
1. Select **Package A**
2. Select **Car** (observe payment appears)
3. Switch to **Package K**
4. **Expected Result**:
   - Transportation selection is retained
   - Days dropdown appears
   - Payment rate field disappears until days is selected
5. Select **2 Days**
6. **Expected Result**: Payment recalculates to "RM 480"

### 9. Test Transportation Options Availability
1. Select **Package A** (has MPV option)
2. Observe transportation options: Car, MPV, Van
3. Switch to **Package K** (no MPV option)
4. **Expected Result**: Transportation options show only Car and Van

### 10. Visual Inspection
1. Verify the payment rate field has:
   - Blue gradient background
   - Bold, larger font
   - Lock/disabled cursor on hover
   - Smooth animations when appearing
2. Verify helper text is:
   - Gray color
   - Italic style
   - Properly spaced below the input

## Expected Calculations Reference

### Standard Packages
| Package | Car | MPV | Van |
|---------|-----|-----|-----|
| Package A | RM 299 | RM 449 | RM 599 |
| Package C | RM 500 | RM 700 | RM 900 |
| Package D | RM 1,299 | RM 1,599 | RM 1,999 |
| Package E | RM 300 | RM 450 | RM 600 |

### Customized Packages (8 hours/day)
| Days | Car (RM 30/hr) | Van (RM 60/hr) |
|------|----------------|----------------|
| 1 Day | RM 240 | RM 480 |
| 2 Days | RM 480 | RM 960 |
| 3 Days | RM 720 | RM 1,440 |
| 4 Days | RM 960 | RM 1,920 |
| 5 Days | RM 1,200 | RM 2,400 |
| 7 Days | RM 1,680 | RM 3,360 |

### Package B Options
- Culture & Heritage: Car RM 350, MPV RM 450, Van RM 570
- Nature & Coastal: Car RM 380, MPV RM 480, Van RM 600

### Package I Options
- Heritage & Culture: Car RM 650, MPV RM 850, Van RM 1,100
- Nature & Adventure: Car RM 750, MPV RM 950, Van RM 1,200

## Common Issues to Check

### Issue 1: Payment rate doesn't appear
- **Cause**: Required fields not selected
- **Solution**: Ensure tour type and transportation are selected (and days for Package K)

### Issue 2: Wrong price displayed
- **Cause**: Incorrect package pricing configuration
- **Solution**: Verify packagePricing object in script.js matches this guide

### Issue 3: Fields don't hide/show properly
- **Cause**: JavaScript not loaded or errors in console
- **Solution**: Check browser console for errors

### Issue 4: Transportation options wrong for package
- **Cause**: configureBookingTransportOptions() not working
- **Solution**: Verify package name matches exactly in the function

## Browser Compatibility
Test on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Success Criteria
All tests pass when:
1. ✅ Payment rates calculate correctly for all packages
2. ✅ Fields show/hide appropriately based on package selection
3. ✅ Helper text provides clear guidance
4. ✅ Read-only field is styled distinctly
5. ✅ No console errors appear
6. ✅ Responsive design works on mobile devices

---

**Last Updated**: February 5, 2026  
**Status**: ✅ Ready for Testing
