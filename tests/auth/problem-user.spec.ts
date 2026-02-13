import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test.describe('Problem User - Image Display Bug', () => {

  test('Bug Report: All product images are identical for problem_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // Login as problem_user
    await loginPage.navigate();
    await loginPage.loginAs('problem_user');
    await expect(inventoryPage.inventoryContainer).toBeVisible();

    // Get all product images
    const images = await page.locator('[data-test="inventory-item"] img').all();
    const imageSources = [];
    
    for (const image of images) {
      const src = await image.getAttribute('src');
      imageSources.push(src);
    }

    console.log('Product images found:', imageSources);

    // Expected: Each product should have a UNIQUE image
    // Actual: All products use the same image (bug)
    
    // Create a Set to find unique images
    const uniqueImages = new Set(imageSources);
    
    // This assertion SHOULD FAIL because all images are the same
    expect(uniqueImages.size).toBeGreaterThan(1);
    
    // Additional assertion: No image should be a 404 placeholder
    for (const src of imageSources) {
      expect(src).not.toContain('sl-404');
    }
  });
});