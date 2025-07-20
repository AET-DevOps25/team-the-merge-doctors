import type { CreateUserRequest } from '@/api/user';
import { expect, test, type Page } from '@playwright/test';
import { users } from 'tests/resources/users';

async function login(page: Page, user: CreateUserRequest) {
  await page.goto('/login');
  await page.fill('input[id="userName"]', user.userName!);
  await page.fill('input[id="password"]', user.password!);
  await page.click('button[type="submit"]');
}

async function logout(page: Page) {
  const logoutButton = page.locator('span:has-text("Logout")');
  await logoutButton.waitFor({ state: 'visible' });
  await logoutButton.click();
}

async function goToApplications(page: Page) {
  const applicationsButton = page.locator('span:has-text("Applications")');
  await applicationsButton.waitFor({ state: 'visible' });
  await applicationsButton.click();
}

test.describe('Applications and Rating', () => {
  test('Mentee creates application, mentor accepts application, mentee rates mentor', async ({
    page,
  }) => {
    const mentorUsername = 'lorischwartz';
    const menteeUsername = 'kelly14';
    const mentor = users.filter((user) => user.userName === mentorUsername)[0]!;
    const mentee = users.filter((user) => user.userName === menteeUsername)[0]!;

    // Send application as user
    await login(page, mentee);
    await expect(page).toHaveURL('/search');

    const viewProfileButton = page.locator(
      `button[data-testid=view-mentor-profile-${mentor.id}]`,
    );
    await viewProfileButton.scrollIntoViewIfNeeded();
    await viewProfileButton.waitFor({ state: 'visible' });
    await viewProfileButton.click();

    await expect(page).toHaveURL(`/mentor/${mentor.id}`);

    const createApplicationButton = page.locator(
      `button[data-testid=mentorship-application-button]`,
    );
    await createApplicationButton.waitFor({ state: 'visible' });
    await createApplicationButton.click();

    const textArea = page.locator(
      'textarea[data-testid=application-modal-text-area]',
    );
    await textArea.waitFor({ state: 'visible' });
    await textArea.fill('Hello, I want to be your padawan.');

    const submitApplicationButton = page.locator(
      'button:has-text("Submit Application")',
    );
    await submitApplicationButton.waitFor({ state: 'visible' });
    await submitApplicationButton.click();

    const successMessage = page.locator('text=Application created');
    await successMessage.waitFor({ state: 'visible', timeout: 120000 });

    await logout(page);

    // Accept Application as mentor
    await login(page, mentor);

    const acceptApplicationButton = page
      .locator(`button[data-testid=accept-application-button-${mentee.id}]`)
      .first();
    await acceptApplicationButton.waitFor({ state: 'visible' });
    await acceptApplicationButton.click();

    await logout(page);

    // Rate mentor
    await login(page, mentee);
    await goToApplications(page);

    const rateMentorButton = page.locator(
      `button[data-testid=rate-mentor-button-${mentor.id}]`,
    );
    await rateMentorButton.waitFor({ state: 'visible' });
    await rateMentorButton.click();

    const ratingInput = page.locator(`input[data-testid=rating-input]`);
    await ratingInput.waitFor({ state: 'visible' });
    await ratingInput.fill('4');

    const reviewTextArea = page.locator(
      `textarea[data-testid=review-text-area]`,
    );
    await reviewTextArea.waitFor({ state: 'visible' });
    await reviewTextArea.fill('Very good master Jedi.');

    const submitRatingButton = page.locator(`button:has-text("Submit Rating")`);
    await submitRatingButton.waitFor({ state: 'visible' });
    await submitRatingButton.click();
  });
});
