import test, { expect } from '@playwright/test';

test.describe('Signup Page', () => {
  test('display signup form', async ({ page }) => {
    await page.goto('/signup');
    const title = await page.locator('h2').textContent();
    expect(title).toBe('Sign Up');
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[id="userName"]')).toBeVisible();
    await expect(page.locator('input[id="password"]')).toBeVisible();
    await expect(page.locator('input[id="firstName"]')).toBeVisible();
    await expect(page.locator('input[id="lastName"]')).toBeVisible();
    await expect(page.locator('input[id="email"]')).toBeVisible();
    await expect(page.locator('input[id="mobileNumber"]')).toBeVisible();
    await expect(page.locator('input[id="city"]')).toBeVisible();
    await expect(page.locator('input[id="country"]')).toBeVisible();
    await expect(page.locator('input[id="roleType"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('sign up as mentee', async ({ page }) => {
    await page.goto('/signup');
    await page.fill('input[id="userName"]', 'newMentee');
    await page.fill('input[id="password"]', 'securePassword');
    await page.fill('input[id="firstName"]', 'John');
    await page.fill('input[id="lastName"]', 'Doe');
    await page.fill('input[id="email"]', 'john.doe@example.com');
    await page.fill('input[id="mobileNumber"]', '1234567890');
    await page.fill('input[id="city"]', 'New York');
    await page.fill('input[id="country"]', 'USA');

    await page.locator('div.ant-select').click();
    await page
      .locator('div.ant-select-item-option', { hasText: 'Mentee' })
      .click();

    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/search');
  });

  test('sign up as mentor', async ({ page }) => {
    // Sign Up
    await page.goto('/signup');
    await page.fill('input[id="userName"]', 'newMentor123456');
    await page.fill('input[id="password"]', 'securePassword');
    await page.fill('input[id="firstName"]', 'Jane');
    await page.fill('input[id="lastName"]', 'Smith');
    await page.fill('input[id="email"]', 'jane.smith@example.com');
    await page.fill('input[id="mobileNumber"]', '0987654321');
    await page.fill('input[id="city"]', 'Los Angeles');
    await page.fill('input[id="country"]', 'USA');

    await page.locator('div.ant-select').click();
    await page
      .locator('div.ant-select-item-option', { hasText: 'Mentor' })
      .click();

    await page.click('button[type="submit"]');

    // Mentor Profile Creation
    await expect(page).toHaveURL('/mentor-profile');
    await page.fill(
      'textarea[id="bio"]',
      'Experienced software engineer with expertise in DevOps.',
    );

    const skills = page.locator('input[id="skills"]');
    await skills.waitFor({ state: 'visible' });
    await skills.click();

    const javaOption = page.locator('div.ant-select-item-option', {
      hasText: 'Java',
    });
    await javaOption.waitFor({ state: 'visible' });
    await javaOption.click();

    const categoryInput = page.locator('input[id="category"]');
    await categoryInput.waitFor({ state: 'visible' });
    await categoryInput.click();

    const careeDevelopmentOption = page.locator('div.ant-select-item-option', {
      hasText: 'Career Development',
    });
    await careeDevelopmentOption.waitFor({ state: 'visible' });
    await careeDevelopmentOption.click();

    await page.fill('input[id="yearsOfExperience"]', '5');
    await page.locator('button[type="submit"]').click();
    await expect(page).toHaveURL(/\/applications\/mentor\//);
  });

  test('error message for missing sign up fields', async ({ page }) => {
    await page.goto('/signup');
    await page.click('button[type="submit"]');
    await expect(page.locator('.ant-form-item-explain-error')).toHaveText([
      'Please input your username!',
      'Please input your password!',
      'Required',
      'Required',
      'Required',
      'Required',
      'Required',
      'Required',
      'Please select a role!',
    ]);
  });
});
