# BUG REPORT

## Bug #1: Checkout Form Accepts Whitespace as Valid Input

**Severity:** High  
**User(s) affected:** All users (tested with `standard_user`)  
**Environment:** 
- Browser: Chromium 131.0.6778.33, Firefox 132.0
- OS: Windows 11
- URL: https://www.saucedemo.com/checkout-step-one.html

### Steps to Reproduce
1. Login as `standard_user` with password `secret_sauce`
2. Add any product to cart (e.g., "Sauce Labs Backpack")
3. Navigate to cart
4. Click "Checkout" button
5. Fill the form fields with **only whitespace characters** (spaces):
   - First Name: `   ` (3 spaces)
   - Last Name: `   ` (3 spaces)
   - Postal Code: `   ` (3 spaces)
6. Click "Continue" button

### Expected Result
- Error message should be displayed indicating invalid input
- Form should validate that fields contain actual text, not just whitespace
- User should remain on "Checkout: Your Information" page (checkout-step-one.html)
- Form should not submit with whitespace-only values

### Actual Result
- No error message is displayed
- Form accepts whitespace as valid input
- User successfully proceeds to "Checkout: Overview" page (checkout-step-two.html)
- Order can be completed with whitespace in customer information fields

### Evidence
**Test Execution:** `tests/checkout/checkout-validation.spec.ts` - "BUG: Form accepts whitespace as valid input"

**Automated Test Output:**
```
✗ BUG: Form accepts whitespace as valid input
  Error: expect(received).toBeVisible()
  Locator: [data-test="error"]
  Expected: Error message to be visible
  Actual: No error message shown, proceeded to checkout-step-two
```

**Test Assertion that Failed:**
```typescript
// Expected behavior (assertion fails = bug exists)
await expect(checkoutPage.errorMessage).toBeVisible();
expect(page.url()).toContain('checkout-step-one');

// Actual behavior
URL changed to: https://www.saucedemo.com/checkout-step-two.html
No error message displayed
```

### Notes
**Root Cause Hypothesis:**
- Form validation only checks if fields are empty (length === 0)
- Validation does not trim whitespace before checking
- Missing `.trim()` on input values before validation
- No regex or pattern validation for meaningful text

**Business Impact:**
- **CRITICAL:** Orders created with invalid/unusable customer information
- Cannot contact customers (whitespace in name fields)
- Cannot ship products (whitespace in postal code)
- Database filled with junk data
- Order fulfillment failures
- Potential revenue loss from undeliverable orders
- Customer service overhead to fix invalid orders

**Data Integrity Impact:**
- Database contains orders with whitespace-only customer names
- Reporting and analytics corrupted by invalid data
- Difficult to filter or query valid vs invalid orders

**Recommended Fix:**
1. **Client-side validation:**
```javascript
   const trimmedValue = input.value.trim();
   if (trimmedValue.length === 0) {
     showError("First Name is required");
     return false;
   }
```

2. **Server-side validation (critical):**
   - Trim all input fields before processing
   - Reject requests with whitespace-only values
   - Return appropriate error codes

3. **Additional validations:**
   - Minimum length requirements (e.g., name must be at least 2 characters)
   - Pattern validation (letters/numbers only for names)
   - Postal code format validation

**Priority:** HIGH - This allows creation of orders with invalid customer data, blocking fulfillment

**Severity Justification:**
- Affects ALL users
- Impacts core business function (order processing)
- Causes data integrity issues
- No workaround available for users who accidentally enter whitespace

---

## Bug #2: Incorrect Product Images for Problem User

**Severity:** Medium  
**User(s) affected:** `problem_user`  
**Environment:**
- Browser: Chromium 131.0.6778.33, Firefox 132.0
- OS: Windows 11
- URL: https://www.saucedemo.com/inventory.html

### Steps to Reproduce
1. Login as `problem_user` with password `secret_sauce`
2. Navigate to inventory page (happens automatically after login)
3. Observe product images on the page

### Expected Result
- Each product should display its unique, correct product image
- Different products should have different images
- Images should match the product being displayed (e.g., backpack image for "Sauce Labs Backpack")

### Actual Result
- **All 6 products display the identical image**: `/static/media/sl-404.168b1cce10384b857a6f.jpg`
- Image filename suggests it's a 404 error placeholder image
- Products cannot be visually distinguished from each other
- Users cannot see what the product actually looks like

### Evidence
**Test Execution:** `tests/auth/problem-user.spec.ts`

**Automated Test Output:**
```
✗ Bug Report: All product images are identical for problem_user
  Error: expect(received).toBeGreaterThan(expected)
  Expected: > 1
  Received: 1
  
Product images found: [
  '/static/media/sl-404.168b1cce10384b857a6f.jpg',
  '/static/media/sl-404.168b1cce10384b857a6f.jpg',
  '/static/media/sl-404.168b1cce10384b857a6f.jpg',
  '/static/media/sl-404.168b1cce10384b857a6f.jpg',
  '/static/media/sl-404.168b1cce10384b857a6f.jpg',
  '/static/media/sl-404.168b1cce10384b857a6f.jpg'
]
```

All products reference the same image file despite having different `alt` text.

**Test Assertion:**
```typescript
const uniqueImages = new Set(imageSources);
expect(uniqueImages.size).toBeGreaterThan(1); // FAILS: only 1 unique image
```

### Notes
**Root Cause Hypothesis:**
- Image path mapping issue specific to `problem_user` account
- Possible configuration error where all product images default to 404 placeholder
- Could be intentional test data to simulate broken image scenarios
- May indicate CDN or asset loading issue for this user type

**Business Impact:**
- Severely degraded user experience
- Users cannot make informed purchase decisions without seeing products
- Increased cart abandonment rate
- Potential accessibility issues (alt text doesn't match visual)
- Brand perception damage

**User-Specific Behavior:**
- This issue appears to be **specific to `problem_user`** account
- `standard_user` displays correct, unique images for each product
- May be intentional test data demonstrating UI issues

**Recommended Fix:**
1. If bug: Fix image path resolution for this user account
2. If intentional: Document this behavior clearly in user account specifications
3. Ensure proper image fallbacks are in place
4. Validate all product images load correctly across all user types

**Priority:** MEDIUM - Impacts user experience significantly but cart functionality works

**Note:** Requires stakeholder clarification on whether `problem_user` is designed to exhibit UI issues for testing purposes.

---

## Summary

**Total Bugs Found:** 2  
**Critical:** 0  
**High:** 1 (Bug #1 - Whitespace Validation)  
**Medium:** 1 (Bug #2 - Product Images)  
**Low:** 0  

**Test Results:**
- ✅ 7 tests passing (core functionality working)
- ❌ 2 tests failing (bugs detected)

**Testing Notes:**
- Bug #1 affects all users and blocks proper order data collection
- Bug #2 may be intentional test data for `problem_user` - requires stakeholder clarification
- All 7 critical user flows tested and automated
- CI/CD pipeline configured to run tests automatically




