import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';

test.describe('Cart - Remove Items', () => {

  test('TC-008: Remove Single Item from Cart', async ({ page }) => {
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

    // Step 3: Click cart icon
    await inventoryPage.goToCart();
    await expect(cartPage.cartItems).toHaveCount(1);

    // Step 4: Click "Remove" button next to the item
    await cartPage.removeItemByName('Sauce Labs Backpack');

    // Verify item removed from cart
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(0);

    // Verify cart badge shows "0" or disappears
    const badgeCount = await inventoryPage.getCartItemCount();
    expect(badgeCount).toBe(0);

    // Verify cart is empty
    const isEmpty = await cartPage.isCartEmpty();
    expect(isEmpty).toBeTruthy();

    // Verify can continue shopping
    await expect(cartPage.continueShoppingButton).toBeVisible();
    await expect(cartPage.continueShoppingButton).toBeEnabled();
  });
});