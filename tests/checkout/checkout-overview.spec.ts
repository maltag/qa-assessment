import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Checkout Part 2 - Payment Overview', () => {

  test('TC-007: Checkout Part 2 - Payment Information Overview', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Step 1: Login as standard_user
    await loginPage.navigate();
    await loginPage.loginAs('standard_user');
    await expect(inventoryPage.inventoryContainer).toBeVisible();

    // Step 2: Add "Sauce Labs Backpack" ($29.99) to cart
    await inventoryPage.addToCartByProductName('Sauce Labs Backpack');

    // Step 3: Click cart icon
    await inventoryPage.goToCart();

    // Step 4: Click Checkout
    await cartPage.proceedToCheckout();

    // Step 5: Fill form
    await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
    
    // Step 6: Click Continue
    await checkoutPage.clickContinue();

    // Verify Checkout: Overview page displayed
    await expect(checkoutPage.summarySubtotal).toBeVisible();
    expect(page.url()).toContain('checkout-step-two');

    // Verify Payment Information section visible
    await expect(checkoutPage.summaryTax).toBeVisible();
    await expect(checkoutPage.summaryTotal).toBeVisible();

    // Verify Item Total matches product price
    const subtotal = await checkoutPage.getSubtotal();
    expect(subtotal).toBe(29.99);

    // Verify Tax is calculated and displayed
    const tax = await checkoutPage.getTax();
    expect(tax).toBeGreaterThan(0);

    // Verify Total = Item Total + Tax
    const total = await checkoutPage.getTotal();
    expect(total).toBeCloseTo(subtotal + tax, 2);

    // Verify "Finish" button is enabled
    await expect(checkoutPage.finishButton).toBeEnabled();
  });
});