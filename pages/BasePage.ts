import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly baseURL: string = 'https://www.saucedemo.com';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string = '') {
    await this.page.goto(`${this.baseURL}${path}`);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }
}