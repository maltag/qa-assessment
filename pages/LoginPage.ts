import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export type UserType = 
  | 'standard_user'
  | 'locked_out_user'
  | 'problem_user'
  | 'performance_glitch_user'
  | 'error_user'
  | 'visual_user';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  private readonly userCredentials: Record<UserType, { username: string; password: string }> = {
    standard_user: { username: 'standard_user', password: 'secret_sauce' },
    locked_out_user: { username: 'locked_out_user', password: 'secret_sauce' },
    problem_user: { username: 'problem_user', password: 'secret_sauce' },
    performance_glitch_user: { username: 'performance_glitch_user', password: 'secret_sauce' },
    error_user: { username: 'error_user', password: 'secret_sauce' },
    visual_user: { username: 'visual_user', password: 'secret_sauce' }
  };

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async loginAs(userType: UserType) {
    const credentials = this.userCredentials[userType];
    await this.usernameInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
    await this.loginButton.click();
  }

  async loginWithCustomCredentials(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }

  async isErrorMessageVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }
}