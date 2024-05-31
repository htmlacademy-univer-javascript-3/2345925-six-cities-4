import { test, expect } from '@playwright/test';

const getFavouriteCount = async (page) => parseInt(await page.locator('.header__favorite-count').textContent()|| '0');

const checkCount = async (page, count) => {
    await page.waitForFunction((toBe) => 
        +document.querySelector('.header__favorite-count')?.innerHTML!! === toBe, 
        count, 
        { timeout: 1000}
    );
    
};

const checkIfFavouriteWasRemoved = async (page, countToBe) => {
    await checkCount(page, countToBe);
    await page.locator('.header__favorite-count').click();
    await page.waitForURL('./favourites');
    await page.waitForFunction(() => document.querySelector('.place-card__name') === null, {} , { timeout: 1000 });
    await page.goto('./');
};

const checkIfFavouriteWasAdded = async (page, countToBe, nameToBe) => {
    await checkCount(page, countToBe);
    await page.locator('.header__favorite-count').click();
    await page.waitForURL('./favourites');
    await page.waitForFunction((name) => document.querySelector('.place-card__name')?.querySelector('a')?.innerHTML === name, nameToBe, { timeout: 1000 });
    await page.goto('./');
};

function getRandomInt() {
    const min = Math.ceil(0);
    const max = Math.floor(1e9);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const login = async (page) => {
    await page.goto('./');
    await page.getByText('Sign in').click();
    await page.getByPlaceholder('Email').click();
    const dateNow = Date.now();
    await page.getByPlaceholder('Email').fill(`${dateNow}}${getRandomInt()}${getRandomInt()}@mail.com`);
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('1e');
    await page.getByPlaceholder('Password').press('Enter');
    await page.waitForURL('./');
};

test('should navigate to login page from main page if user is anauthorized', async ({ page }) => {
    await page.goto('./');
    const card = await page.locator('.cities__card').first();
    await card.locator('.place-card__bookmark-icon').click();
    await page.waitForURL('./login');
    expect(`${page.url()}`).toBe('http://localhost:5173/login');
});

test('should add and remove favourite from main page if user is authorized', async ({ page }) => {
    await login(page);

    const favoutiteCount = await getFavouriteCount(page);
    const card = await page.locator('.cities__card').first()
    const button = await card.locator('.place-card__bookmark-icon');
    const name = await card.locator('.place-card__name').locator('a').innerText();

    //check add
    await button.click();
    await checkIfFavouriteWasAdded(page, favoutiteCount + 1, name);

    // check remove
    await button.click();
    await checkIfFavouriteWasRemoved(page, favoutiteCount);
});

test('should navigate to login page from offer page if user is anauthorized', async ({ page }) => {
    await page.goto('./');
    const card = await page.locator('.cities__card').first();  
    await card.click();
    
    await page.waitForSelector('.offer__wrapper');
    const offerWrapper = page.locator('.offer__wrapper');
    await offerWrapper.locator('.place-card__bookmark-icon').click();
    await page.waitForURL('./login');
    expect(`${page.url()}`).toBe('http://localhost:5173/login');
});

test('should add and remove favourite from offer page if user is authorized', async ({ page }) => {
    await login(page);

    const favoutiteCount = await getFavouriteCount(page);
    const card = await page.locator('.cities__card').first();
    const name = await card.locator('.place-card__name').locator('a').innerText();

    //check add
    await card.click();
    await page.waitForSelector('.offer__wrapper');
    const offerWrapper = page.locator('.offer__wrapper');
    await offerWrapper.locator('.place-card__bookmark-icon').click();

    await checkIfFavouriteWasAdded(page, favoutiteCount + 1, name);

    // check remove
    await card.click();
    await page.waitForSelector('.offer__wrapper');
    await offerWrapper.locator('.place-card__bookmark-icon').click();
    
    await checkIfFavouriteWasRemoved(page, favoutiteCount);
});

test('should navigate to login page from offer page nearby offers if user is anauthorized', async ({ page }) => {
    await page.goto('./');
    const card = await page.locator('.cities__card').first();  
    await card.click();
    
    await page.waitForSelector('.near-places__card');
    const nearPlaces = page.locator('.near-places__card').first();
    await nearPlaces.locator('.place-card__bookmark-icon').click();
    await page.waitForURL('./login');
    expect(`${page.url()}`).toBe('http://localhost:5173/login');
});

test('should add and remove favourite from offer page nearby offers if user is authorized', async ({ page }) => {
    await login(page);

    const favoutiteCount = await getFavouriteCount(page);
    const card = await page.locator('.cities__card').first()

    //check add
    await card.click();
    await page.waitForSelector('.near-places__card');
    const nearPlaces = page.locator('.near-places__card').first();
    await nearPlaces.locator('.place-card__bookmark-icon').click();
    const name = await nearPlaces.locator('.place-card__name').locator('a').innerText();

    await checkIfFavouriteWasAdded(page, favoutiteCount + 1, name);
    
    // check remove
    await card.click();
    await page.waitForSelector('.near-places__card');
    await nearPlaces.locator('.place-card__bookmark-icon').click();
    
    await checkIfFavouriteWasRemoved(page, favoutiteCount);
});

test('should redirect to main page if user is unauthprized', async ({ page }) => {
    await page.goto('./');
    await page.goto('./favourites');
    await page.waitForURL('./login');
    expect(`${page.url()}`).toBe('http://localhost:5173/login');
});

test('should remove favourite from favourite page', async ({ page }) => {
    await login(page);

    const favoutiteCount = await getFavouriteCount(page);
    const card = await page.locator('.cities__card').first();

    //check add
    await card.click();
    await page.waitForSelector('.near-places__card');
    const nearPlaces = page.locator('.near-places__card').first();
    await nearPlaces.locator('.place-card__bookmark-icon').click();
    const name = await nearPlaces.locator('.place-card__name').locator('a').innerText();

    await checkIfFavouriteWasAdded(page, favoutiteCount + 1, name);
    
    //check remove 
    await page.locator('.header__favorite-count').click();
    const favouriteCard = await page.locator('.favorites__card').first();
    await favouriteCard.locator('.place-card__bookmark-icon').click();
    await checkIfFavouriteWasRemoved(page, favoutiteCount);

});
