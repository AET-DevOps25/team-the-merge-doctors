import type { CreateUserRequest } from '@/api/user';
import { expect, test, type Page } from '@playwright/test';
import { users } from 'tests/resources/users';

// login as mentee, send application to mentor, wait for confirm, go to applications and check that it is under pending

// login as mentor, accept application, logout, login as mentee that the application was from, go to applications, rate mentor

async function login(page: Page, user: CreateUserRequest) {
  await page.fill('input[id="userName"]', user.userName!);
  await page.fill('input[id="password"]', user.password!);
  await page.click('button[type="submit"]');
}

async function logout(page: Page) {
  const logoutButton = page.locator('Logout');
  await logoutButton.waitFor({ state: 'visible' });
  await logoutButton.click();
}

async function goToApplications(page: Page) {
  const applicationsButton = page.locator('Logout');
  await applicationsButton.waitFor({ state: 'visible' });
  await applicationsButton.click();
}

test.describe('Application and rating', () => {
  test('Test application and ', async ({ page }) => {
    const mentorUsername = 'maria_garcia';
    const menteeUsername = 'kelly14';
    const mentor = users.filter((user) => user.userName === mentorUsername)[0]!;
    const mentee = users.filter((user) => user.userName === menteeUsername)[0]!;

    await page.goto('/login');
    await login(page, mentee);
    await expect(page).toHaveURL('/search');

    const viewProfileButton = page.locator(
      `button[data-testid=view-mentor-profile-${mentor.id}]`,
    );
    await viewProfileButton.waitFor({ state: 'visible' });
    await viewProfileButton.click();

    await expect(page).toHaveURL(`/mentor/${mentor.id}`);

    const createApplicationButton = page.locator(
      `button[data-testid=mentorship-application-button]`,
    );
    await createApplicationButton.waitFor({ state: 'visible' });
    await createApplicationButton.click();

    const textArea = page.locator('application-modal-text-area');
    await textArea.waitFor({ state: 'visible' });
    await textArea.fill('Hello, I want to be your padawan');

    // wait for message
    const submitApplicationButton = page.locator(
      'button:has-text("Submit Application")',
    );
    await submitApplicationButton.waitFor({ state: 'visible' });
    await submitApplicationButton.click();

    const successMessage = page.locator('text=Application created');
    await successMessage.waitFor({ state: 'visible', timeout: 120000 });
    // todo ;

    // logout
    // await logout()
    await logout(page);
    await login(page, mentor);

    await goToApplications(page);

    // TODO: accept application
    await logout(page);
    await login(page, mentee);
  });
});
