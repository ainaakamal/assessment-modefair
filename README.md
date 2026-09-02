# Playwright GSC Cinema Booking Test

## Overview

This project contains an automated Playwright test using **TypeScript** to test the movie booking flow on the GSC website.

The test will:

1. Open the GSC website using **Google Chrome**
2. Search for **CHIIKAWA THE MOVIE: THE SECRET OF THE MERMAID ISLA**
3. Click **Buy Now**
4. Select the movie date
5. Select **2D** experience
6. Select **Kuala Lumpur - LaLaport BBCC**
7. Select the **10:00 AM** showtime
8. Enter the registered phone number
9. Enter the password from an environment variable
10. Login
11. Verify successful login
12. Dismiss the **I Got It** popup
13. Select seat **F12**
14. Click **Confirm**

---

## Prerequisites

Make sure the following are installed:

* Node.js
* Visual Studio Code
* Playwright
* Playwright Test
* Google Chrome

---

## Project Setup

### 1. Install dependencies

Open the project folder in Visual Studio Code.

Open the terminal:

```bash
Terminal > New Terminal
```

Install Playwright:

```bash
npm install
```

If Playwright has not been installed yet:

```bash
npm init playwright@latest
```

---

## Test File

Create the test file:

```text
tests/book-chiikawa.spec.ts
```

Example project structure:

```text
playwright-project/
│
├── tests/
│   └── book-chiikawa.spec.ts
│
├── playwright.config.ts
├── package.json
├── package-lock.json
└── README.md
```

---

## Chrome Configuration

The test is configured to run using the installed **Google Chrome** browser:

```typescript
test.use({
    channel: 'chrome',
    headless: false
});
```

### `channel: 'chrome'`

This tells Playwright to use the installed Google Chrome browser instead of Playwright's bundled Chromium browser.

### `headless: false`

This makes the browser visible while the test is running.

Therefore, when the test starts, a Chrome window will open and you can watch the automation steps.

---

## Environment Variable

The test does not store the password directly in the source code.

The password is retrieved using:

```typescript
process.env.TEST_PASSWORD
```

Set the environment variable before running the test.

### Windows PowerShell

```powershell
$env:TEST_PASSWORD="your_password"
```

Then run the test:

```bash
npx playwright test tests/book-chiikawa.spec.ts
```

> Do not commit your actual password into Git or put it directly inside the test script.

---

## Running the Test

### Run the specific test

From the VS Code terminal:

```bash
npx playwright test tests/book-chiikawa.spec.ts
```

Because the test uses:

```typescript
headless: false
```

Chrome will open automatically.

---

## Run in UI Mode

For easier debugging, you can use Playwright UI Mode:

```bash
npx playwright test --ui
```

Then select:

```text
Book Chiikawa movie
```

and click **Run**.

---

## Test Flow

| Step | Action               | Expected Result                      |
| ---- | -------------------- | ------------------------------------ |
| 1    | Open GSC website     | GSC homepage is displayed            |
| 2    | Find Chiikawa movie  | Movie is visible                     |
| 3    | Click Buy Now        | Movie booking page opens             |
| 4    | Select 02 Sep 2026   | Date is selected                     |
| 5    | Select 2D            | 2D experience is selected            |
| 6    | Select LaLaport BBCC | Location is selected                 |
| 7    | Select 10:00 AM      | Showtime is selected                 |
| 8    | Enter phone number   | Phone number is entered              |
| 9    | Enter password       | Password is entered                  |
| 10   | Click Login          | Login is performed                   |
| 11   | Verify login         | "Login Successfully" message appears |
| 12   | Click I Got It       | Popup is closed                      |
| 13   | Select F12           | Seat F12 is selected                 |
| 14   | Click Confirm        | Seat selection is confirmed          |

---

## Test Script

The main test is located at:

```text
tests/book-chiikawa.spec.ts
```

The test uses Playwright locators such as:

```typescript
page.getByText()
page.getByRole()
page.locator()
```

Assertions are performed using:

```typescript
expect()
```

For example:

```typescript
await expect(movie).toBeVisible();
```

This verifies that the Chiikawa movie is displayed before continuing with the booking flow.

---

## Important Notes

### Movie Availability

The test depends on the movie being available on the GSC website.

The following are also dependent on current availability:

* Date: **02 September 2026**
* Experience: **2D**
* Location: **Kuala Lumpur - LaLaport BBCC**
* Showtime: **10:00 AM**
* Seat: **F12**

If any of these are no longer available, the test may fail.

### Login

A valid GSC account is required.

The phone number is currently specified in the test:

```typescript
await page.locator('#phoneNo').fill('172883960');
```

The password should be provided through:

```text
TEST_PASSWORD
```

### Booking Confirmation

The test currently stops after clicking **Confirm**.

It does not perform the final payment or verify that a booking/payment has been successfully completed.

---

## Troubleshooting

### Chrome does not open

Make sure Google Chrome is installed.

Also verify that the test contains:

```typescript
test.use({
    channel: 'chrome',
    headless: false
});
```

Then run:

```bash
npx playwright test tests/book-chiikawa.spec.ts
```

### Password is undefined

Check that `TEST_PASSWORD` has been set in the terminal.

PowerShell:

```powershell
$env:TEST_PASSWORD="your_password"
```

Then run the test again.

### Test cannot find the movie

The movie title may have changed or the GSC website structure may have changed.

Check the locator:

```typescript
page.getByText(
    'CHIIKAWA THE MOVIE: THE SECRET OF THE MERMAID ISLA',
    { exact: true }
);
```

### Showtime cannot be found

The **10:00 AM** showtime may no longer be available.

Check:

```typescript
await page.getByRole('button', { name: /10:00AM/ }).click();
```

### Seat F12 cannot be selected

The seat may already be occupied or unavailable.

Check:

```typescript
await page.getByText('F12', { exact: true }).click();
```

---

## Recommended Command

For normal execution:

```bash
npx playwright test tests/book-chiikawa.spec.ts
```

For debugging with the Playwright UI:

```bash
npx playwright test --ui
```

For debugging with the browser inspector:

```bash
npx playwright test tests/book-chiikawa.spec.ts --debug
```

---

## Technologies

* **Playwright**
* **TypeScript**
* **Node.js**
* **Visual Studio Code**
* **Google Chrome**

---

## Test Name

```text
Book Chiikawa movie
```

The test is designed as an end-to-end UI automation test for the GSC movie booking flow.
