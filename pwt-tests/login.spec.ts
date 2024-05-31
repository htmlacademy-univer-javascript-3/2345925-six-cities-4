import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
  await page.goto('./login');
});

test('should render the login page', async ({ page }) => {
  await page.goto('./login')
  await expect(page.locator('h1.login__title')).toHaveText('Sign in');
  await expect(page.getByPlaceholder('Email')).toBeVisible();
  await expect(page.getByPlaceholder('Password')).toBeVisible();
  await expect(page.getByRole('button')).toHaveText('Sign in');
});

test('should show validation error when submitting empty form', async ({ page }) => {
  await page.goto('./login')
  await page.click('button[type="submit"]');

  await expect(page.locator('input[name="email"]:invalid')).toBeVisible();
  await expect(page.locator('input[name="password"]:invalid')).toBeVisible();
});

test('should successful login', async ({ page }) => {
  await page.goto('./');
  await page.getByText('Sign in').click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('qwe@mail.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('1e');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL('./');
  await expect(page.getByRole('link', { name: 'qwe' })).toHaveCount(1);
});
