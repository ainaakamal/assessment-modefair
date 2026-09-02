# AI Notes

## How AI Was Used

AI was used to help create and improve the Playwright automation test.

### 1. Generate Test Script

Provided the booking flow to AI:

```text
Open GSC
→ Find Chiikawa movie
→ Click Buy Now
→ Select date
→ Select 2D
→ Select cinema
→ Select showtime
→ Login
→ Select seat
→ Confirm
```

AI helped generate the Playwright TypeScript code.

### 2. Find Locators

AI helped create Playwright locators such as:

```typescript
page.getByRole('button', { name: 'Buy Now' })
```

```typescript
page.getByText('F12', { exact: true })
```

### 3. Run in Chrome

AI helped configure Playwright to open Google Chrome:

```typescript
test.use({
    channel: 'chrome',
    headless: false
});
```

### 4. Debugging

When the test fails, the error message or HTML can be given to AI.

AI can help:

* Identify the problem
* Suggest a better locator
* Suggest a fix
* Explain the error

### 5. Documentation

AI was also used to create this `README.md` and `AI_NOTES.md`.

---

## Simple Demo Flow

```text
Requirement
    ↓
Ask AI
    ↓
Generate Playwright Code
    ↓
Run Test in Chrome
    ↓
If Failed → Ask AI to Debug
    ↓
Fix & Run Again
    ↓
Validate Result
```

## Important

AI helps with coding and debugging, but the tester still needs to **review the code and verify the actual test result**.
