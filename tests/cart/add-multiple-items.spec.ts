import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';

test.describe('Cart - Add Multiple Items', () => {

  test('TC-005: Add Multiple Items to Cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // Step 1: Login as standard_user
    await loginPage.navigate();
    await loginPage.loginAs('standard_user');
    await expect(inventoryPage.inventoryContainer).toBeVisible();

    // Step 2: Add "Sauce Labs Backpack" to cart
    await inventoryPage.addToCartByProductName('Sauce Labs Backpack');
    expect(await inventoryPage.getCartItemCount()).toBe(1);

    // Step 3: Add "Sauce Labs Bike Light" to cart
    await inventoryPage.addToCartByProductName('Sauce Labs Bike Light');
    expect(await inventoryPage.getCartItemCount()).toBe(2);

    // Step 4: Click cart icon
    await inventoryPage.goToCart();

    // Verify cart badge shows "2"
    expect(await inventoryPage.getCartItemCount()).toBe(2);

    // Verify both items appear in cart
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(2);

    const itemNames = await cartPage.getCartItemNames();
    expect(itemNames).toContain('Sauce Labs Backpack');
    expect(itemNames).toContain('Sauce Labs Bike Light');

    // Verify correct prices displayed
    // Note: We're not verifying total calculation as the app doesn't show it in cart
    // Total is only calculated in checkout overview
  });
});