import { test, expect } from '@playwright/test';

test.use({
    channel: 'chrome',
    headless: false
});

test('Book Chiikawa movie', async ({ page }) => {

    // 1. Open website
    await page.goto('https://www.gsc.com.my/');

    // 2. Find the movie
    const movie = page.getByText(
        'CHIIKAWA THE MOVIE: THE SECRET OF THE MERMAID ISLA',
        { exact: true }
    );

    await expect(movie).toBeVisible();

    // 3. Find the movie card and click its Buy Now
    const movieCard = movie.locator('..');

    await movieCard.getByRole('button', { name: 'Buy Now' }).click();

    // 4. Select date: 02 Sep 2026
    await page.locator('#2026-09-02').click();

    // 5. Select experience: 2D
    await page.locator('.gsc-icon-2d').click();

    // 6. Select location
    await page.getByText(
        'Kuala Lumpur - LaLaport BBCC',
        { exact: true }
    ).click();

    // 7. Select showtime: 10:00AM
    await page.getByRole('button', { name: /10:00AM/ }).click();

    // 8. Enter phone number
    await page.locator('#phoneNo').fill('172883960');

    // 9. Enter password
    await page.locator('input[type="password"]').fill(
        process.env.TEST_PASSWORD!
    );

    // 10. Click Login
    await page.getByRole('button', { name: 'Login' }).click();

    // 11. Verify login successfully
    await expect(
        page.getByText(/login successfully/i)
    ).toBeVisible();

    // 12. Click "I Got It"
    await page.getByRole('button', { name: /I Got It/i }).click();

    // 13. Select seat F12
    await page.getByText('F12', { exact: true }).click();

    // 14. Click Confirm
    await page.getByText('Confirm', { exact: true }).click();
});
