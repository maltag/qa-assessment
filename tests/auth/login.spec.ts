import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test.describe('Authentication Tests', () => {
  
  test('TC-001: Successful Login - Standard User', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // Navigate to login page
    await loginPage.navigate();

    // Login as standard user
    await loginPage.loginAs('standard_user');

    // Verify user is redirected to inventory page
    await expect(inventoryPage.inventoryContainer).toBeVisible();
    
    // Verify products are displayed
    await expect(inventoryPage.inventoryItems.first()).toBeVisible();
    
    // Verify cart icon is visible
    await expect(inventoryPage.cartLink).toBeVisible();
    
    // Verify URL contains inventory
    expect(page.url()).toContain('/inventory.html');
  });

  test('TC-002: Login Rejection - Locked Out User', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to login page
    await loginPage.navigate();

    // Attempt to login as locked out user
    await loginPage.loginAs('locked_out_user');

    // Verify error message is displayed
    await expect(loginPage.errorMessage).toBeVisible();
    
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Epic sadface: Sorry, this user has been locked out');
    
    // Verify user remains on login page
    expect(page.url()).not.toContain('inventory');
    
    // Verify login button is still visible
    await expect(loginPage.loginButton).toBeVisible();
  });
});