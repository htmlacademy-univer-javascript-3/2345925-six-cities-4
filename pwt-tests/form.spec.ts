import { test, expect } from '@playwright/test';

test('should not show review form to an unauthorized user', async ({ page }) => {
    await page.goto('./');

    await page.locator('.cities__card').first().click();
    await expect(page.locator('.reviews__form')).not.toBeVisible();
});

test('should show review form to an authorized user', async ({ page }) => {
    await page.goto('./login');

    await page.fill('input[name=email]', 'qwe@mail.com');
    await page.fill('input[name=password]', '1e');
    await page.click('button[type=submit]');
    await page.waitForURL('./');

    await page.locator('.cities__card').first().click();

    await page.waitForSelector('.offer__gallery');
    await expect(page.locator('.reviews__form')).toBeVisible();
});

test('should send form by authorized user', async ({ page }) => {
    await page.goto('./login');

    await page.fill('input[name=email]', 'qwe@mail.com');
    await page.fill('input[name=password]', '1e');
    await page.click('button[type=submit]');
    await page.waitForURL('./');

    await page.locator('.cities__card').first().click();

    await page.waitForSelector('.offer__gallery');
    await expect(page.locator('.reviews__form')).toBeVisible();

    const numReviews = await page.locator('.reviews__info').count()

    const reviewText = `
    Somebody once told me
    The world is gonna roll me
    I ain't the sharpest tool in the shed
    She was looking kind of dumb
    With her finger and her thumb
    In the shape of an "L" on her forehead
    `
    await page.locator('form svg').nth(2).click();
    await page.fill('[name="review"]', reviewText);

    await Promise.all([
        page.waitForResponse(
            (response) => response.url().includes('/comments') && response.status() === 201
        ),
        page.click('button[type="submit"]')
    ]);

    await page.waitForSelector('.offer__gallery');

    await expect(page.locator('.reviews__info')).toHaveCount(Math.min(numReviews + 1, 10));
    await expect(page.locator('.reviews__text').first()).toHaveText(reviewText)

});
