import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Checkout Part 1 - Form Validation', () => {

  test('TC-006: Checkout Part 1 - Form Validation with Empty Fields', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Setup
    await loginPage.navigate();
    await loginPage.loginAs('standard_user');
    await expect(inventoryPage.inventoryContainer).toBeVisible();
    await inventoryPage.addToCartByProductName('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    // Test 1: Completely empty fields
    await checkoutPage.clickContinue();
    
    await expect(checkoutPage.errorMessage).toBeVisible();
    let errorText = await checkoutPage.getErrorMessage();
    expect(errorText).toContain('First Name is required');
    expect(page.url()).toContain('checkout-step-one');
  });

  test('BUG: Form accepts whitespace as valid input', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Setup
    await loginPage.navigate();
    await loginPage.loginAs('standard_user');
    await expect(inventoryPage.inventoryContainer).toBeVisible();
    await inventoryPage.addToCartByProductName('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    // BUG: Fill fields with only whitespace (spaces)
    await checkoutPage.fillCheckoutInformation('   ', '   ', '   ');
    await checkoutPage.clickContinue();

    // Expected: Should show error for invalid input
    // Actual: Form accepts whitespace and proceeds to next step
    
    // This assertion SHOULD FAIL (bug detected)
    await expect(checkoutPage.errorMessage).toBeVisible({
      timeout: 2000
    });
    
    // If no error, we're on step 2 (bug confirmed)
    expect(page.url()).toContain('checkout-step-one');
    expect(page.url()).not.toContain('checkout-step-two');
  });
});