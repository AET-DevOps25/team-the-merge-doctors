import test, { expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('display login form', async ({ page }) => {
    await page.goto('/login');
    const title = await page.locator('h2').textContent();
    expect(title).toBe('Login');
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[id="userName"]')).toBeVisible();
    await expect(page.locator('input[id="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('navigate to sign up', async ({ page }) => {
    await page.goto('/login');
    await page.click('button:has-text("Sign Up")');
    await expect(page).toHaveURL('/signup');
  });

  test('failed login with invalid credentials', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[id="userName"]', 'invalidUser');
    await page.fill('input[id="password"]', 'wrongPassword');
    await page.click('button[type="submit"]');
    await expect(page.locator('.ant-alert-error')).toBeVisible();
    const errorMessage = await page.locator('.ant-alert-error').textContent();
    expect(errorMessage).toBe('Invalid credentials');
  });

  test('successfull login with valid credentials as mentor', async ({
    page,
  }) => {
    await page.goto('/login');
    await page.fill('input[id="userName"]', 'umartinez');
    await page.fill('input[id="password"]', 'N3HncEW(!9');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/applications\/mentor\//);
  });

  test('successfull login with valid credentials as mentee', async ({
    page,
  }) => {
    await page.goto('/login');
    await page.fill('input[id="userName"]', 'mooreconnie');
    await page.fill('input[id="password"]', '!ULGI)Mns7');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/search');
  });
});
