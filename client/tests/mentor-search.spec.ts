import { test, expect, type Page } from '@playwright/test';

async function login(page: Page) {
  await page.goto('/login');
  await page.fill('input[id="userName"]', 'mooreconnie');
  await page.fill('input[id="password"]', '!ULGI)Mns7');
  await page.click('button[type="submit"]');
}

test.describe('Search Page', () => {
  test('filter by categories', async ({ page }) => {
    await login(page);

    const categoryInput = page.locator(
      'input[placeholder="Search for categories"]',
    );
    await categoryInput.waitFor({ state: 'visible' });
    await categoryInput.fill('Technical');

    const checkbox = page.locator('label.ant-checkbox-wrapper', {
      hasText: 'Technical',
    });
    await checkbox.waitFor({ state: 'visible' });
    await checkbox.click();

    const tags = page.locator('span[data-testid=mentor-category-pill]', {
      hasText: 'Technical',
    });

    const tagCount = await tags.count();
    for (let i = 0; i < tagCount; i++) {
      await tags.nth(i).waitFor({ state: 'visible' });
    }

    await expect(tags).toHaveCount(4);
  });

  test('filter by skills', async ({ page }) => {
    await login(page);

    const skillInput = page.locator('input[placeholder="Search for skills"]');
    await skillInput.waitFor({ state: 'visible' });
    await skillInput.fill('React');

    const checkbox = page.locator('label.ant-checkbox-wrapper', {
      hasText: 'React',
    });
    await checkbox.waitFor({ state: 'visible' });
    await checkbox.click();

    const tag = page
      .locator('span[data-testid=skill-pill]', {
        hasText: 'React',
      })
      .first();
    await tag.waitFor({ state: 'visible' });
  });

  test('filter by years of experience', async ({ page }) => {
    await login(page);

    await page
      .locator('label.ant-checkbox-wrapper', { hasText: '10 years' })
      .click();
    await expect(
      page.locator('span[data-testid=mentor-category-pill]', {
        hasText: '10+ years',
      }),
    ).toBeVisible();
    await expect(
      page.locator('span[data-testid=mentor-category-pill]', {
        hasText: '12+ years',
      }),
    ).toBeVisible();
    await expect(
      page.locator('span[data-testid=mentor-category-pill]', {
        hasText: '15+ years',
      }),
    ).toBeVisible();
  });

  test('show no mentors found', async ({ page }) => {
    await login(page);

    const categoryInput = page.locator(
      'input[placeholder="Search for categories"]',
    );
    await categoryInput.waitFor({ state: 'visible' });
    await categoryInput.fill('Engineering');

    const checkbox = page.locator('label.ant-checkbox-wrapper', {
      hasText: 'Software Engineering',
    });
    await checkbox.waitFor({ state: 'visible' });
    await checkbox.click();

    const noMentorsFound = page.locator('text=No mentors found');
    await expect(noMentorsFound).toBeVisible();
  });

  test('navigate to mentor profile', async ({ page }) => {
    await login(page);

    const mentorCardButton = page
      .locator('button:has-text("View Profile")')
      .first();
    await mentorCardButton.waitFor({ state: 'visible' });
    await mentorCardButton.first().click();

    await expect(page).toHaveURL(/\/mentor\//);
  });
});
