import { test, expect, Locator } from '@playwright/test';

test('should render cards and right number of cards', async ({ page }) => {
  await page.goto('./');
  const text = await page.getByText('places to stay in').textContent();

  const numberOfCards = Number(text?.split(' ')[1])

  await expect(page.locator('.cities__card')).toHaveCount(numberOfCards);
});

test('should check active city tabs and places found text', async ({ page }) => {
  await page.goto('./');

  const isActive = async (locator: Locator) => {
    return locator.evaluate(el => el.classList.contains('tabs__item--active'));
  };

  await page.waitForSelector('.locations__item-link');

  const cities = await page.locator('.locations__item-link').all();

  for (const city of cities) {
    await city.click();

    const currentCity = await city.textContent();

    await page.waitForSelector('.cities__card', {
      state: 'attached',
      timeout: 5000,
    });

    const hasActiveClass = await isActive(city);
    expect(hasActiveClass).toBeTruthy();

    const placesFoundText = await page.locator('.places__found').textContent();
    const lastWord = placesFoundText?.split(' ').pop();

    expect(currentCity).toBe(lastWord);
  }
});

test('should sort cards', async ({ page }) => {
  await page.goto('./');
  await page.getByText('Popular').click();
  await page.getByText('Price: high to low').click();

  const getPrices = async () => {
    const prices = await page.locator('.place-card__price-value').allTextContents();
    const pricesTrimmed: Array<number> = [];

    for (let i = 0; i < prices.length; i++) {
      let price = +(prices[i].slice(1));
      pricesTrimmed.push(price);
    }
    return pricesTrimmed;
  }

  await page.waitForSelector('.cities__card', {
    state: 'attached',
    timeout: 5000,
  });

  const highToLow = await getPrices();
  
  for (let i = 0; i < highToLow.length - 1; i++) {
    expect(highToLow[i + 1]).toBeLessThanOrEqual(highToLow[i]);
  }

  await page.getByText('Price: high to low').click();
  await page.getByText('Price: low to high').click();

  const lowToHigh = await getPrices();

  for (let i = 0; i < lowToHigh.length - 1; i++) {
    expect(lowToHigh[i + 1]).toBeGreaterThanOrEqual(lowToHigh[i]);
  }
});