# QA Assessment - E2E Test Suite Setup

## Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher
- Git

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/Psynth-AI/qa-assessment.git
cd qa-assessment
```

### 2. Install dependencies
```bash
npm install
```

### 3. Install Playwright browsers
```bash
npx playwright install
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

### Run tests with UI mode (interactive)
```bash
npm run test:ui
```

### Run specific test file
```bash
npx playwright test tests/auth/login.spec.ts
```

### Run tests in specific browser
```bash
npm run test:chrome
npm run test:firefox
```

### Debug mode
```bash
npm run test:debug
```

## View Test Reports

### Open HTML report
```bash
npm run report
```

This opens the Playwright HTML report in your browser showing:
- Test results
- Screenshots on failure
- Videos of test execution
- Trace files for debugging

## Test Structure
```
qa-assessment/
├── pages/              # Page Object Model
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/              # Test specifications
│   ├── auth/
│   ├── cart/
│   ├── checkout/
│   └── inventory/
├── playwright.config.ts
├── package.json
└── TEST_PLAN.md
```

## CI/CD

Tests run automatically on:
- Push to `main` branch
- Pull requests to `main`

GitHub Actions uploads test artifacts:
- HTML reports
- Screenshots (on failure)
- Videos (on failure)
- Trace files (on failure)

## Test Coverage

- ✅ TC-001: Successful Login
- ✅ TC-002: Login Rejection (Locked Out User)
- ✅ TC-004: Complete Purchase Flow
- ✅ TC-005: Add Multiple Items to Cart
- ✅ TC-006: Checkout Form Validation
- ✅ TC-007: Checkout Payment Overview
- ✅ TC-008: Remove Item from Cart
- ✅ TC-011: Product Sorting

## Known Issues

See `BUG_REPORT.md` for documented bugs discovered during testing.