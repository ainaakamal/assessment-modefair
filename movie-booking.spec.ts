import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test.use({
    channel: 'chrome',
    headless: false
});

test.setTimeout(120000);

test('Book Chiikawa movie', async ({ page }) => {

    // ============================================
    // 1. Open Chiikawa movie booking page
    // ============================================

    console.log('STEP 1: Opening Chiikawa movie...');

    await page.goto(
        'https://epaymentwebapp.gsc.com.my/showtime-by-movies/6286/chiikawa-the-movie%253Athe-secret-of-the-mermaid-isla?id=6286',
        {
            waitUntil: 'domcontentloaded',
            timeout: 30000
        }
    );

    await page.waitForTimeout(5000);

    console.log('Movie page loaded');
    console.log('URL:', page.url());


    // ============================================
    // 2. Verify movie page
    // ============================================

    console.log('STEP 2: Verifying Chiikawa movie...');

    await expect(page).toHaveURL(
        /showtime-by-movies\/6286/i
    );

    console.log('Chiikawa movie page confirmed');


    // ============================================
    // 3. Select DATE
    // ============================================

    console.log('STEP 3: Selecting date...');

    const date = page.locator(
        '[id="2026-09-02"]'
    );

    await expect(date).toBeVisible({
        timeout: 20000
    });

    await date.scrollIntoViewIfNeeded();
    await date.click();

    console.log('Date selected: 2026-09-02');

    await page.waitForTimeout(2000);


    // ============================================
    // 4. Select 2D
    // ============================================

    console.log('STEP 4: Selecting 2D...');

    const twoD = page.locator(
        'div.gsc-icon-0.bg-gsc-icon-2d'
    );

    await expect(twoD).toBeVisible({
        timeout: 20000
    });

    await twoD.scrollIntoViewIfNeeded();
    await twoD.click();

    console.log('2D selected');

    await page.waitForTimeout(2000);


    // ============================================
    // 5. Find and expand cinema
    // ============================================

    console.log(
        'STEP 5: Finding Kuala Lumpur - LaLaport BBCC...'
    );

    const location = page.getByText(
        'Kuala Lumpur - LaLaport BBCC',
        {
            exact: true
        }
    );

    await expect(location).toBeVisible({
        timeout: 20000
    });

    await location.scrollIntoViewIfNeeded();
    await location.click();

    console.log(
        'Kuala Lumpur - LaLaport BBCC expanded'
    );

    await page.waitForTimeout(2000);


    // ============================================
    // 6. Select showtime
    // Prefer 10:00AM
    // Otherwise select first available showtime
    // ============================================

    console.log(
        'STEP 6: Looking for showtime...'
    );

    const showtimes = page.locator(
        'div.showtime-option-container'
    );

    const showtimeCount =
        await showtimes.count();

    console.log(
        `Available showtime containers: ${showtimeCount}`
    );

    if (showtimeCount === 0) {
        throw new Error(
            'No showtime is available for Kuala Lumpur - LaLaport BBCC on 2026-09-02.'
        );
    }


    // ============================================
    // Look for 10:00AM
    // ============================================

    let selectedShowtime = null;

    for (let i = 0; i < showtimeCount; i++) {

        const showtime = showtimes.nth(i);

        const timeText = await showtime
            .locator('p.showtime')
            .textContent();

        const time = timeText?.trim();

        console.log(
            `Showtime ${i + 1}: ${time}`
        );

        if (
            time &&
            time
                .replace(/\s/g, '')
                .toUpperCase() === '10:00AM'
        ) {
            selectedShowtime = showtime;

            console.log(
                '10:00AM found!'
            );

            break;
        }
    }


    // ============================================
    // If 10:00AM not available
    // Select first available showtime
    // ============================================

    if (!selectedShowtime) {

        console.log(
            '10:00AM not available.'
        );

        console.log(
            'Selecting first available showtime...'
        );

        selectedShowtime = showtimes.first();

        const fallbackTime =
            await selectedShowtime
                .locator('p.showtime')
                .textContent();

        console.log(
            `Fallback showtime: ${fallbackTime?.trim()}`
        );
    }


    // ============================================
    // Click selected showtime
    // ============================================

    await selectedShowtime.scrollIntoViewIfNeeded();

    const finalTime =
        await selectedShowtime
            .locator('p.showtime')
            .textContent();

    console.log(
        `Selecting showtime: ${finalTime?.trim()}`
    );

    await selectedShowtime.click();

    console.log(
        'Showtime selected'
    );

    await page.waitForTimeout(2000);


    // ============================================
    // 7. Enter phone number
    // ============================================

    console.log(
        'STEP 7: Entering phone number...'
    );

    const phone = page.locator(
        '#phoneNo'
    );

    await expect(phone).toBeVisible({
        timeout: 20000
    });

    await phone.fill(
        '172883960'
    );

    console.log(
        'Phone number entered'
    );


    // ============================================
    // 8. Enter password
    // ============================================

    console.log(
        'STEP 8: Entering password...'
    );

    const password = page.locator(
        'input[type="password"]'
    );

    await expect(password).toBeVisible({
        timeout: 20000
    });

    const testPassword = process.env.TEST_PASSWORD;

    if (!testPassword) {
        throw new Error(
            'TEST_PASSWORD is not set. Please add it to your .env file.'
        );
    }

    await password.fill(
        testPassword
    );

    console.log(
        'Password entered'
    );


    // ============================================
    // 9. Login
    // ============================================

    console.log(
        'STEP 9: Clicking Login...'
    );

    const loginButton = page.getByRole(
        'button',
        {
            name: 'Login'
        }
    );

    await expect(loginButton).toBeVisible({
        timeout: 20000
    });

    await loginButton.click();

    console.log(
        'Login button clicked'
    );


    // ============================================
    // 10. Verify login
    // ============================================

    console.log(
        'STEP 10: Verifying login...'
    );

    await expect(
        page.getByText(
            /login successfully/i
        )
    ).toBeVisible({
        timeout: 20000
    });

    console.log(
        'Login successful'
    );


    // ============================================
    // 11. Click I Got It
    // ============================================

    console.log(
        'STEP 11: Clicking I Got It...'
    );

    const gotIt = page.getByRole(
        'button',
        {
            name: /I Got It/i
        }
    );

    await expect(gotIt).toBeVisible({
        timeout: 20000
    });

    await gotIt.click();

    console.log(
        'I Got It clicked'
    );


    // ============================================
    // 12. Select seat F12
    // ============================================

    console.log(
        'STEP 12: Selecting F12...'
    );

    const seat = page.getByText(
        'F12',
        {
            exact: true
        }
    );

    await expect(seat).toBeVisible({
        timeout: 20000
    });

    await seat.scrollIntoViewIfNeeded();
    await seat.click();

    console.log(
        'F12 selected'
    );


    // ============================================
    // 13. Confirm
    // ============================================

    console.log(
        'STEP 13: Clicking Confirm...'
    );

    const confirm = page.getByText(
        'Confirm',
        {
            exact: true
        }
    );

    await expect(confirm).toBeVisible({
        timeout: 20000
    });

    await confirm.scrollIntoViewIfNeeded();
    await confirm.click();

    console.log(
        'Booking flow completed'
    );
});
