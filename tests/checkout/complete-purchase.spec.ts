import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Complete Purchase Flow', () => {

  test('TC-004: Complete Purchase Flow - Happy Path', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Step 1: Login as standard_user
    await loginPage.navigate();
    await loginPage.loginAs('standard_user');
    await expect(inventoryPage.inventoryContainer).toBeVisible();

    // Step 2: Add "Sauce Labs Backpack" to cart
    await inventoryPage.addToCartByProductName('Sauce Labs Backpack');
    expect(await inventoryPage.getCartItemCount()).toBe(1);

    // Step 3: Click cart icon
    await inventoryPage.goToCart();
    await expect(cartPage.cartItems).toHaveCount(1);

    // Step 4: Click Checkout
    await cartPage.proceedToCheckout();

    // Step 5: Fill form
    await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
    
    // Step 6: Click Continue
    await checkoutPage.clickContinue();

    // Step 7: Verify order summary
    await expect(checkoutPage.summarySubtotal).toBeVisible();
    const itemNames = await checkoutPage.getOverviewItemNames();
    expect(itemNames).toContain('Sauce Labs Backpack');

    // Step 8: Click Finish
    await checkoutPage.finishCheckout();

    // Verify order completion
    await expect(checkoutPage.completeHeader).toBeVisible();
    const confirmationText = await checkoutPage.getConfirmationHeader();
    expect(confirmationText).toContain('Thank you for your order');
  });
});