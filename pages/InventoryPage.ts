import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly inventoryContainer: Locator;
  readonly inventoryItems: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;
  readonly hamburgerMenu: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.hamburgerMenu = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async isInventoryPageDisplayed(): Promise<boolean> {
    return await this.inventoryContainer.isVisible();
  }

  async addToCartByProductName(productName: string) {
    const formattedName = this.formatProductName(productName);
    const addButton = this.page.locator(`[data-test="add-to-cart-${formattedName}"]`);
    await addButton.click();
  }

  async removeFromCartByProductName(productName: string) {
    const formattedName = this.formatProductName(productName);
    const removeButton = this.page.locator(`[data-test="remove-${formattedName}"]`);
    await removeButton.click();
  }

  async getCartItemCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      const text = await this.cartBadge.textContent();
      return parseInt(text || '0');
    }
    return 0;
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async sortProducts(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async getAllProductPrices(): Promise<number[]> {
    const priceTexts = await this.page.locator('[data-test="inventory-item-price"]').allTextContents();
    return priceTexts.map(price => parseFloat(price.replace('$', '')));
  }

  async logout() {
    await this.hamburgerMenu.click();
    await this.logoutLink.click();
  }

  private formatProductName(productName: string): string {
    return productName.toLowerCase().replace(/\s+/g, '-');
  }
}