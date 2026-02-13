# TEST PLAN - SauceDemo E2E Testing

## 1. SCOPE

### 1.1 In Scope
This test plan covers end-to-end testing of the SauceDemo e-commerce application, focusing on critical user journeys:

- **Authentication flows**: Login with different user types, logout, password management
- **Product browsing**: Inventory display, product details, sorting/filtering
- **Shopping cart operations**: Add/remove items, cart persistence, multi-item management
- **Checkout process**: Information form (Part 1), payment overview (Part 2), order completion

### 1.2 Why These Areas?
These flows represent the core business value of an e-commerce application. Any failure in authentication, cart management, or checkout directly impacts revenue and user experience.

### 1.3 User Types Covered
- `standard_user` - Baseline happy path scenarios
- `locked_out_user` - Security validation
- `problem_user` - Error handling and UI issues
- `error_user` - Application error scenarios
- `performance_glitch_user` - Performance edge cases
- `visual_user` - Visual/layout inconsistencies

---

## 2. TEST CASES (Prioritized)

### Priority: CRITICAL (P0)

#### TC-001: Successful Login - Standard User
**Objective**: Verify standard user can log in successfully  
**User**: `standard_user`  
**Steps**:
1. Navigate to https://www.saucedemo.com
2. Enter username: `standard_user`
3. Enter password: `secret_sauce`
4. Click Login button

**Expected Result**:
- User is redirected to inventory page
- Products are displayed
- Cart icon is visible


---

#### TC-002: Login Rejection - Locked Out User
**Objective**: Verify locked out user cannot access the system  
**User**: `locked_out_user`  
**Steps**:
1. Navigate to https://www.saucedemo.com
2. Enter username: `locked_out_user`
3. Enter password: `secret_sauce`
4. Click Login button

**Expected Result**:
- Error message displayed: "Epic sadface: Sorry, this user has been locked out."
- User remains on login page
- No access to inventory

---

#### TC-003: Invalid Login Credentials
**Objective**: Verify system rejects invalid credentials  
**User**: N/A  
**Steps**:
1. Navigate to https://www.saucedemo.com
2. Enter username: `invalid_user`
3. Enter password: `wrong_password`
4. Click Login button

**Expected Result**:
- Error message displayed: "Epic sadface: Username and password do not match"
- User remains on login page
- No access granted


#### TC-004: Complete Purchase Flow - Happy Path
**Objective**: Verify complete end-to-end purchase workflow  
**User**: `standard_user`  
**Steps**:
1. Login as `standard_user`
2. Add "Sauce Labs Backpack" to cart
3. Click cart icon
4. Click Checkout
5. Fill form: First Name: "John", Last Name: "Doe", Zip: "12345"
6. Click Continue
7. Verify order summary
8. Click Finish

**Expected Result**:
- Success message displayed: "Thank you for your order!"
- Order confirmation page shown
- Cart badge shows 0 items


---

#### TC-005: Add Multiple Items to Cart
**Objective**: Verify multiple products can be added to cart  
**User**: `standard_user`  
**Steps**:
1. Login as `standard_user`
2. Add "Sauce Labs Backpack" to cart
3. Add "Sauce Labs Bike Light" to cart
4. Click cart icon

**Expected Result**:
- Cart badge shows "2"
- Both items appear in cart
- Correct prices displayed
- Total is calculated correctly


---

#### TC-006: Checkout Part 1 - Your Information Form Validation
**Objective**: Verify checkout information form validates all required fields  
**User**: `standard_user`  
**Steps**:
1. Login as `standard_user`
2. Add "Sauce Labs Backpack" to cart
3. Click cart icon
4. Click Checkout button
5. Attempt to continue with empty form

**Expected Result**:
- Error message displayed: "Error: First Name is required"
- User cannot proceed to Checkout Part 2
- Form highlights missing field
- User remains on Checkout: Your Information page


---

#### TC-007: Checkout Part 2 - Payment Information Overview
**Objective**: Verify checkout overview displays correct payment summary  
**User**: `standard_user`  
**Steps**:
1. Login as `standard_user`
2. Add "Sauce Labs Backpack" ($29.99) to cart
3. Click cart icon
4. Click Checkout
5. Fill form: First Name: "John", Last Name: "Doe", Zip: "12345"
6. Click Continue

**Expected Result**:
- Checkout: Overview page displayed
- Payment Information section visible
- Item Total matches product price
- Tax is calculated and displayed
- Total = Item Total + Tax
- "Finish" button is enabled


---

### Priority: HIGH (P1)

#### TC-008: Remove Single Item from Cart
**Objective**: Verify items can be removed from cart individually  
**User**: `standard_user`  
**Steps**:
1. Login as `standard_user`
2. Add "Sauce Labs Backpack" to cart
3. Click cart icon
4. Click "Remove" button next to the item

**Expected Result**:
- Item removed from cart
- Cart badge shows "0" or disappears
- Cart page shows empty state
- Can continue shopping


---

#### TC-009: Add and Remove Multiple Items from Cart
**Objective**: Verify cart correctly handles adding and removing multiple items  
**User**: `standard_user`  
**Steps**:
1. Login as `standard_user`
2. Add "Sauce Labs Backpack" to cart
3. Add "Sauce Labs Bike Light" to cart
4. Add "Sauce Labs Bolt T-Shirt" to cart
5. Click cart icon
6. Remove "Sauce Labs Bike Light"
7. Verify cart contents

**Expected Result**:
- Cart initially shows 3 items
- After removal, cart shows 2 items
- Only "Backpack" and "T-Shirt" remain
- Cart badge updates to "2"
- Prices update correctly


---

#### TC-010: Checkout with Missing Information - Individual Fields
**Objective**: Verify form validation for each required field on Checkout Part 1  
**User**: `standard_user`  
**Scenarios**:

**Scenario A - Missing First Name:**
1. Login and add item to cart
2. Proceed to checkout
3. Leave First Name empty, fill Last Name: "Doe", Zip: "12345"
4. Click Continue

**Expected**: Error: "First Name is required"

**Scenario B - Missing Last Name:**
1. Fill First Name: "John", leave Last Name empty, fill Zip: "12345"
2. Click Continue

**Expected**: Error: "Last Name is required"

**Scenario C - Missing Zip Code:**
1. Fill First Name: "John", Last Name: "Doe", leave Zip empty
2. Click Continue

**Expected**: Error: "Postal Code is required"


#### TC-011: Product Sorting Functionality
**Objective**: Verify product sorting works correctly  
**User**: `standard_user`  
**Steps**:
1. Login as `standard_user`
2. Select "Price (low to high)" from sort dropdown

**Expected Result**:
- Products reorder by price ascending
- Cheapest product appears first
- Most expensive product appears last


---



### Priority: MEDIUM (P2)

#### TC-012: Logout Functionality
**Objective**: Verify user can logout successfully  
**User**: `standard_user`  
**Steps**:
1. Login as `standard_user`
2. Click hamburger menu
3. Click "Logout"

**Expected Result**:
- User redirected to login page
- Session cleared
- Cannot access inventory without re-login

---

#### TC-013: Cross-User Comparison - Problem User vs Standard User
**Objective**: Verify problem user exhibits known UI issues  
**Users**: `problem_user` vs `standard_user`  
**Steps**:
1. Login as `standard_user` - note product images
2. Logout
3. Login as `problem_user` - note product images

**Expected Result**:
- `standard_user`: All product images load correctly
- `problem_user`: Images are broken or incorrect
- This validates problem user behavior is intentional


---

#### TC-014: Cart Persistence During Shopping
**Objective**: Verify cart retains items when user continues shopping  
**User**: `standard_user`  
**Steps**:
1. Login as `standard_user`
2. Add "Sauce Labs Backpack" to cart
3. Click cart icon
4. Click "Continue Shopping"
5. Add "Sauce Labs Bike Light" to cart
6. Return to cart

**Expected Result**:
- First item still in cart
- Second item added successfully
- Cart badge shows "2"
- Both items visible in cart


---

#### TC-015: Attempt to Add Same Product Multiple Times
**Objective**: Verify application behavior when user attempts to purchase multiple units of same product  
**User**: `standard_user`  
**Steps**:
1. Login as `standard_user`
2. Add "Sauce Labs Backpack" to cart
3. Click "Add to cart" button again for the same product
4. Navigate to cart

**Expected Result**:
- Application does NOT support quantity increase
- Cart shows only 1 unit of "Sauce Labs Backpack"
- Cart badge shows "1" (not "2")
- No quantity selector available



### Priority: MEDIUM (P2)

#### TC-016: Continue Shopping from Cart
**Objective**: Verify "Continue Shopping" button works  
**User**: `standard_user`  
**Steps**:
1. Login as `standard_user`
2. Add item to cart
3. Click cart icon
4. Click "Continue Shopping"

**Expected Result**:
- User returned to inventory page
- Cart retains items (badge still shows count)
- Can add more items


### Priority: LOW (P3)

#### TC-017: Product Detail Navigation
**Objective**: Verify users can view product details  
**User**: `standard_user`  
**Steps**:
1. Login as `standard_user`
2. Click on "Sauce Labs Backpack" product name or image
3. Verify product detail page loads

**Expected Result**:
- Product detail page displayed
- Product name, description, price visible
- "Add to cart" / "Remove" button present
- Back button returns to inventory



## 3. OUT OF SCOPE

The following are intentionally excluded:

### 3.1 Excluded Test Areas
- **Password management**: SauceDemo does not include change password, forgot password, or password reset functionality
- **Payment gateway integration**: No real payment processing - only mock checkout flow available
- **Quantity selectors**: Application does not support purchasing multiple units of the same product
- **Performance testing**: Beyond basic smoke tests with `performance_glitch_user`
- **Mobile responsive testing**: Focus is on desktop web functionality
- **Cross-browser matrix**: Will test on Chrome primarily, maybe one additional browser
- **Real payment processing**: Mock checkout only, no actual payment integration
- **Account management**: No profile editing, address book, or user preferences
- **Order history**: No post-purchase tracking or order management
- **Inventory management**: No stock levels or out-of-stock scenarios
- **Shipping options**: No shipping method selection or calculation



---

## 4. RISK ASSESSMENT

### 4.1 High-Risk Areas

#### Authentication System
**Risk Level**: CRITICAL  
**Why**: Single point of failure - if login breaks, entire app is unusable  
**Mitigation**: Multiple test cases covering valid, invalid, and locked out scenarios

#### Checkout Flow - Part 1 (Information Collection)
**Risk Level**: CRITICAL  
**Why**: Data validation failures lead to incomplete orders or bad data  
**Mitigation**: Comprehensive form validation tests for all required fields

#### Checkout Flow - Part 2 (Payment Overview)
**Risk Level**: CRITICAL  
**Why**: Incorrect pricing or tax calculation = financial losses and customer distrust  
**Mitigation**: Verify all calculations, totals, and item summaries

#### Cart Management
**Risk Level**: HIGH  
**Why**: Core e-commerce functionality - cart bugs frustrate users and block purchases  
**Mitigation**: Tests for add, remove, multiple items, persistence scenarios

#### **Payment Gateway Integration - NOT IMPLEMENTED**
**Risk Level**: CRITICAL  
**Why**: Application lacks real payment terminal integration  
**Impact**: 
- No validation of actual payment processing
- Cannot test credit card validation, payment failures, or transaction errors
- Cannot verify PCI compliance or secure payment handling
- No testing of payment provider failures or timeout scenarios
- Cannot validate refund/chargeback processes

**Business Impact**:
- In production, this would be a blocker for go-live
- High risk of payment failures going undetected until production
- Potential revenue loss from failed transactions
- Customer trust issues if payment flow is broken

**Testing Limitation**: 
- Only mock checkout flow can be tested
- Payment calculations can be verified, but no real transaction processing
- Recommend integration testing with payment sandbox before production deployment

**Mitigation Strategy**:
- Document that payment integration is OUT OF SCOPE for this demo
- Verify all pre-payment steps work correctly
- Validate order summary and pricing calculations
- Recommend thorough payment gateway testing in staging environment

---

#### **Quantity Management - Single Unit Limitation**
**Risk Level**: HIGH  
**Why**: Application does not support purchasing multiple units of the same product  
**Impact**:
- Users cannot buy 2+ of the same item in one transaction
- No quantity selector on product pages or cart
- Limits legitimate bulk purchase scenarios
- Poor user experience compared to standard e-commerce expectations

**Business Impact**:
- Lost sales opportunities (bulk buyers, gift purchases)
- Competitive disadvantage vs. standard e-commerce platforms
- Customer frustration when trying to buy multiple units
- Workaround: Users must place multiple separate orders (inefficient)

**Testing Implications**:
- Cannot test quantity increase/decrease functionality
- Cannot test inventory depletion scenarios
- Cannot validate quantity-based pricing (volume discounts)
- Cart total calculations only testable for single units

**Expected Behavior**:
- Each product can only be added once to cart
- Clicking "Add to Cart" multiple times should have no additional effect

**Test Coverage**:
- Verify adding same product twice doesn't create duplicate entries
- Verify cart badge accurately reflects unique product count (not total quantity)
- Document this limitation in bug report as potential feature gap

**Recommendation**: 
- Flag this as a feature request for product team
- In real e-commerce app, this would be considered a critical missing feature

---

### 4.2 Medium-Risk Areas

#### Product Sorting/Filtering
**Risk Level**: MEDIUM  
**Why**: Affects product discovery but doesn't block purchases  
**Impact**: User experience degradation  
**Mitigation**: Basic sorting validation test

#### Session Management
**Risk Level**: MEDIUM  
**Why**: Security and UX concern but workarounds exist  
**Impact**: Users may need to re-login frequently  
**Mitigation**: Logout test validates session clearing

#### Cart Persistence
**Risk Level**: MEDIUM  
**Why**: Users expect cart to persist during shopping session  
**Impact**: Frustration if items disappear  
**Mitigation**: Test cart retention across navigation

### 4.3 Areas Requiring Specific User Testing

#### User-Specific Behaviors
**Risk Level**: MEDIUM  
**Why**: Different user types may exhibit different application responses  
**Impact**: Need to validate that core functionality works across all user types  
**Testing Approach**: 
- Test critical flows with multiple user types
- Document any behavioral differences
- Assess whether differences are acceptable or indicate defects

**Users to Test**:
- `problem_user`: May exhibit different UI or functional behavior
- `visual_user`: May show different rendering or layout characteristics
- `performance_glitch_user`: May experience different response times
- `error_user`: May trigger different error states

**Test Strategy**: 
- Execute same test scenarios across different users
- Compare results to identify patterns
- Flag unexpected behaviors for investigation

### 4.4 User-Specific Test Considerations

Different user accounts in the application may exhibit varying behaviors:

**User Types Requiring Special Attention**:
- `locked_out_user`: Expected to be denied access
- `problem_user`: Behavior to be validated and documented
- `error_user`: Error handling scenarios to be tested
- `performance_glitch_user`: Response time variations to be measured
- `visual_user`: UI rendering to be validated

**Testing Strategy**: 
- Document baseline behavior with `standard_user`
- Compare other user types against baseline
- Determine if variations are acceptable or defects
- Create separate test cases for user-specific behaviors
- Do not assume any behavior is "intentional" without validation

---

### 4.5 Application Limitations Summary

| Limitation | Risk Level | Impact | Production Blocker? |
|------------|------------|--------|-------------------|
| No payment gateway integration | CRITICAL | Cannot process real payments | ✅ YES |
| No quantity selector (single unit only) | HIGH | Limits sales, poor UX | ⚠️ MAJOR FEATURE GAP |
| No password management | MEDIUM | Cannot test security flows | ⚠️ Feature limitation |
| Mock checkout only | CRITICAL | Cannot validate end-to-end payment | ✅ YES |
| No inventory tracking | MEDIUM | Cannot test out-of-stock scenarios | ⚠️ Feature limitation |
| No order history | LOW | Cannot test post-purchase flows | ❌ Nice to have |
| No shipping options | MEDIUM | Simplified checkout only | ⚠️ Feature limitation |

**Testing Approach**: 
- Document all limitations clearly
- Test what IS available thoroughly
- Flag gaps for product/business stakeholders
- Recommend full integration testing in staging with real payment sandbox

---

### 4.6 Risk Mitigation Plan

#### For Payment Integration Gap:
1. ✅ Document limitation in test plan
2. ✅ Verify all pre-payment steps (cart, checkout form, order summary)
3. ✅ Validate pricing calculations 
4. ⚠️ Recommend payment gateway integration testing in next phase
5. ⚠️ Suggest using Stripe/PayPal sandbox for integration tests

#### For Quantity Limitation:
1. ✅ Test that adding same product multiple times doesn't break cart
2. ✅ Verify cart badge shows unique product count correctly
3. ✅ Document behavior in test cases
4. ⚠️ Flag as feature request for product roadmap
5. ⚠️ Recommend adding quantity selector in future iterations

#### For User-Specific Behaviors:
1. ✅ Create cross-user comparison tests
2. ✅ Validate expected behaviors for each user type
3. ✅ Document actual bugs vs. new bugs
4. ✅ Use consistent test data across user types for fair comparison



### 4.7 Risk Priority Matrix

CRITICAL (P0) - Must Address Before Production:
├── Payment gateway integration (NOT AVAILABLE - BLOCKER)
├── Authentication failures (NEEDS TESTING)
├── Checkout flow breaks (NEEDS TESTING - with known limitations)
└── Cart calculation errors (NEEDS TESTING)

HIGH (P1) - Significant Business Impact:
├── Quantity selector missing (DOCUMENTED - feature gap)
├── Cart item removal failures (NEEDS TESTING)
├── Form validation bypass (NEEDS TESTING)
└── Cross-user behavior inconsistencies (NEEDS TESTING)

MEDIUM (P2) - User Experience Issues:
├── Sorting/filtering bugs (NEEDS TESTING)
├── Session management issues (NEEDS TESTING)
├── Cart persistence problems (NEEDS TESTING)
└── Navigation bugs (NEEDS TESTING)

LOW (P3) - Minor Issues:
├── Visual inconsistencies (EXPECTED for visual_user)
├── Image loading issues (EXPECTED for problem_user)
└── Performance delays (EXPECTED for performance_glitch_user)




### 4.8 Out of Scope Risks (Due to Application Limitations)

The following risks **CANNOT** be tested due to application:

❌ **Payment Processing Risks**:
- Credit card validation errors
- Payment gateway timeouts
- Transaction declined scenarios
- Fraud detection triggers
- Compliance validation
- Refund/chargeback processing

❌ **Inventory Management Risks**:
- Out of stock scenarios
- Low inventory warnings
- Backorder handling
- Product availability across locations

❌ **Quantity-Related Risks**:
- Bulk purchase validation
- Quantity limit enforcement
- Cart quantity updates
- Volume-based pricing

❌ **Advanced User Flows**:
- Order history access
- Saved payment methods
- Shipping address management
- Account preferences

**Recommendation**: Document these gaps and ensure they are covered in future test phases when functionality becomes available.

---

## 5. TEST ENVIRONMENT

- **URL**: https://www.saucedemo.com
- **Browsers**: Chrome (primary), Firefox (secondary if time permits)
- **Test Data**: Provided user credentials 
- **Test Framework**: Playwright 
- **CI/CD**: GitHub Actions

---

## 6. ENTRY & EXIT CRITERIA

### Entry Criteria
- Test framework installed and configured
- Access to SauceDemo application confirmed
- User credentials validated
- Page Object Model structure created

### Exit Criteria
- Tests implemented properly
- CI/CD pipeline configured and running tests successfully
- Bug reports documented for discovered issues
- Test coverage meets minimum requirements (auth, cart, checkout parts 1 & 2)
- All critical test cases (P0) executed and passed
- Test execution report generated




 
