import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test.describe('Product Sorting', () => {

  test('TC-011: Product Sorting Functionality - Price Low to High', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // Step 1: Login as standard_user
    await loginPage.navigate();
    await loginPage.loginAs('standard_user');
    await expect(inventoryPage.inventoryContainer).toBeVisible();

    // Step 2: Select "Price (low to high)" from sort dropdown
    await inventoryPage.sortProducts('lohi');

    // Wait for sorting to apply
    await page.waitForTimeout(500);

    // Get all product prices after sorting
    const prices = await inventoryPage.getAllProductPrices();

    // Verify products reorder by price ascending
    // Check that each price is less than or equal to the next
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }

    // Verify cheapest product appears first
    const minPrice = Math.min(...prices);
    expect(prices[0]).toBe(minPrice);

    // Verify most expensive product appears last
    const maxPrice = Math.max(...prices);
    expect(prices[prices.length - 1]).toBe(maxPrice);
  });
});