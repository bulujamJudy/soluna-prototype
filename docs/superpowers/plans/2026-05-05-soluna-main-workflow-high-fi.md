# Soluna Main Workflow High-Fi Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the main Soluna phone workflow from low-fidelity light UI to a high-fidelity purple/pink/yellow ambient glass app, without changing the outer demo website layout.

**Architecture:** Keep the React route structure intact and implement the visual system mostly through shared CSS tokens/classes in `src/styles.css`. Add only small TSX class hooks where inline styles currently prevent consistent glass styling. Preserve current navigation behavior and existing copy from the approved annotation work.

**Tech Stack:** React 19, TypeScript, Vite, CSS, lucide-react, Vitest, Testing Library, Playwright.

---

## File Structure

- Modify `src/styles.css`: app-only high-fi tokens, ambient phone backgrounds, glass primitives, main workflow page styling, no-scrollbar rules, responsive polish.
- Modify `src/components/phone/UiPrimitives.tsx`: add optional app background/style hooks only if needed; preserve public API.
- Modify `src/components/phone/PhoneHeader.tsx`: keep structure, ensure app header can render as glass over dark app background.
- Modify `src/components/phone/BottomNav.tsx`: keep routes and labels, ensure glass/dark active states.
- Modify `src/pages/HomePage.tsx`: add class names or remove conflicting inline styles only where needed for glass/high-fi home content.
- Modify `src/pages/CoachPages.tsx`: add class names for coach avatar, schedule calendar, time chips, booking review, expectation timeline, sticky CTA, booking success, and sessions cards; preserve navigation.
- Modify `src/pages/CommunityPages.tsx`: apply shared app glass treatment only for the main tab screen if required by shared bottom-nav route polish.
- Modify `src/pages/ProfilePages.tsx`: apply shared app glass treatment only for the main tab screen if required by shared bottom-nav route polish.
- Add `src/tests/highFiMainWorkflow.test.tsx`: regression checks for main workflow content/navigation and no-green CSS constraint.
- Modify `e2e/soluna-prototype.spec.ts`: add a high-fi smoke check that outer demo layout remains available and the after phone uses ambient/glass classes.

## Task 1: Add High-Fi App Tokens And Glass Primitives

**Files:**
- Modify: `src/styles.css`
- Test: `src/tests/highFiMainWorkflow.test.tsx`

- [ ] **Step 1: Write the no-green CSS regression test**

Create `src/tests/highFiMainWorkflow.test.tsx` with this initial content:

```tsx
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SolunaPrototype } from "../prototype/SolunaPrototype";

describe("high-fi main workflow visual constraints", () => {
  it("keeps the app redesign off green tones", () => {
    const css = readFileSync(join(process.cwd(), "src/styles.css"), "utf8").toLowerCase();
    expect(css).not.toContain("#4ade80");
    expect(css).not.toContain("green");
    expect(css).not.toContain("mint");
    expect(css).not.toContain("teal");
  });

  it("renders the phone app without removing the main workflow entry points", () => {
    render(<SolunaPrototype startRoute={{ name: "home" }} />);
    expect(screen.getByText("Add a Soluna widget")).toBeInTheDocument();
    expect(screen.getByText("Mental health practice")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Coach/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the focused test and verify it fails before implementation**

Run:

```bash
npm test -- src/tests/highFiMainWorkflow.test.tsx
```

Expected: fail on the no-green assertion if old design-system green tokens are still present, or pass only if the repo is already green-free.

- [ ] **Step 3: Add app-only high-fi tokens**

In `src/styles.css`, update root tokens to support the high-fi app while leaving the outer demo classes unchanged. Use this token set as the target:

```css
:root {
  --page-bg: #f7f7f8;
  --text: #fbf7ff;
  --text-strong: #ffffff;
  --muted: rgba(243, 231, 255, 0.72);
  --muted-strong: rgba(255, 255, 255, 0.84);
  --line: rgba(255, 255, 255, 0.18);
  --line-strong: rgba(255, 255, 255, 0.32);
  --surface: rgba(255, 255, 255, 0.13);
  --surface-muted: rgba(255, 255, 255, 0.08);
  --surface-strong: rgba(255, 255, 255, 0.2);
  --strong: #ffd166;
  --strong-ink: #1b0b3b;
  --dark: #12091f;
  --dark-glass: rgba(18, 9, 31, 0.72);
  --pink: #ff6ec7;
  --violet: #7c3cff;
  --gold: #ffd166;
  --radius-card: 22px;
  --glass-blur: blur(22px) saturate(1.22);
}
```

Keep existing body/demo layout values if they are used outside the phone; when a variable affects the website shell unexpectedly, scope the darker value to `.phone-page` instead of `:root`.

- [ ] **Step 4: Add the ambient phone page background**

Replace the current `.phone-page` light background with an app-level background using only purple, pink, and yellow:

```css
.phone-page {
  position: relative;
  overflow: hidden;
  color: var(--text);
  background:
    radial-gradient(circle at 82% 10%, rgba(255, 209, 102, 0.28), transparent 28%),
    radial-gradient(circle at 12% 18%, rgba(255, 110, 199, 0.35), transparent 32%),
    radial-gradient(circle at 72% 72%, rgba(124, 60, 255, 0.38), transparent 34%),
    linear-gradient(145deg, #12091f 0%, #241045 44%, #4d148c 100%);
}

.phone-page::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 45% 34%, rgba(255, 255, 255, 0.08), transparent 24%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.08), transparent 32%);
}

.phone-page > * {
  position: relative;
  z-index: 1;
}
```

- [ ] **Step 5: Convert shared primitives to glass**

Update existing primitive selectors in `src/styles.css`:

```css
.phone-card,
.phone-row,
.coach-line-card,
.coach-history-row,
.coach-list-card,
.coach-list-row,
.info-block {
  color: var(--text);
  background: var(--surface);
  border: 1px solid var(--line);
  box-shadow: 0 18px 48px rgba(10, 4, 24, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.16);
  backdrop-filter: var(--glass-blur);
}

.phone-card small,
.phone-row small,
.subtle-copy,
.eyebrow {
  color: var(--muted);
}
```

Do not add gradients to `.phone-card`, `.primary-button`, `.secondary-button`, or `.chip`.

- [ ] **Step 6: Run the focused test**

Run:

```bash
npm test -- src/tests/highFiMainWorkflow.test.tsx
```

Expected: pass.

## Task 2: Polish Shared Header, Bottom Nav, Buttons, Chips, And Scroll Areas

**Files:**
- Modify: `src/styles.css`
- Modify: `src/components/phone/PhoneHeader.tsx` only if class hooks are missing
- Modify: `src/components/phone/BottomNav.tsx` only if class hooks are missing
- Test: `src/tests/phoneFlows.test.tsx`

- [ ] **Step 1: Run existing phone-flow tests**

Run:

```bash
npm test -- src/tests/phoneFlows.test.tsx
```

Expected: pass before styling changes; if failures already exist, capture exact failing test names before editing.

- [ ] **Step 2: Style the phone header as glass**

In `src/styles.css`, update `.phone-header` and icon button styling so the header floats over the ambient background:

```css
.phone-header {
  background: rgba(18, 9, 31, 0.46);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--text-strong);
  backdrop-filter: blur(24px) saturate(1.18);
}

.icon-button {
  color: var(--text-strong);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.14);
}
```

- [ ] **Step 3: Style buttons and chips as glass**

Update `.primary-button`, `.secondary-button`, and `.chip`:

```css
.primary-button {
  color: var(--strong-ink);
  background: rgba(255, 209, 102, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.36);
  box-shadow: 0 14px 32px rgba(255, 110, 199, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.42);
}

.secondary-button,
.chip {
  color: var(--text-strong);
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: var(--glass-blur);
}

.chip.is-active {
  color: var(--strong-ink);
  background: rgba(255, 209, 102, 0.9);
  border-color: rgba(255, 255, 255, 0.38);
}
```

- [ ] **Step 4: Style the bottom nav without changing routes**

Update `.bottom-nav`:

```css
.bottom-nav {
  background: rgba(18, 9, 31, 0.66);
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(28px) saturate(1.24);
}

.bottom-nav button {
  color: rgba(243, 231, 255, 0.62);
}

.bottom-nav button.is-active {
  color: var(--gold);
}
```

- [ ] **Step 5: Preserve hidden scrollbars**

Confirm these rules exist in `src/styles.css`:

```css
* {
  scrollbar-width: none;
}

*::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;
}
```

- [ ] **Step 6: Run phone-flow tests**

Run:

```bash
npm test -- src/tests/phoneFlows.test.tsx
```

Expected: pass.

## Task 3: High-Fi Home Screen Main Workflow

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/styles.css`
- Test: `src/tests/highFiMainWorkflow.test.tsx`

- [ ] **Step 1: Add a Home-specific regression check**

Extend `src/tests/highFiMainWorkflow.test.tsx`:

```tsx
it("keeps the Home practice and topics workflow visible", () => {
  render(<SolunaPrototype startRoute={{ name: "home" }} />);
  expect(screen.getByText("Your daily movement, within reach")).toBeInTheDocument();
  expect(screen.getByText("Space Bunny Buddy")).toBeInTheDocument();
  expect(screen.getByText("Topics of the week")).toBeInTheDocument();
  expect(screen.getByText("Sleep Awareness")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /See all Blog/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Remove Home inline styles that force light surfaces**

In `src/pages/HomePage.tsx`, replace any inline `background`, `borderColor`, or `color` values that force light UI with class names. Preserve layout styles such as `display`, `gap`, `gridTemplateColumns`, and sizing.

- [ ] **Step 3: Add Home high-fi CSS**

In `src/styles.css`, update Home selectors:

```css
.widget-card,
.bunny-card,
.weekly-progress-card,
.article-card,
.exercise-rail .phone-card,
.card-rail .phone-card {
  background: var(--surface);
  border-color: var(--line);
  color: var(--text);
}

.widget-card .secondary-button {
  width: 100%;
}

.bunny-stage,
.image-slot {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.18);
  color: var(--muted);
}

.weekly-progress-track,
.progress-track {
  background: rgba(255, 255, 255, 0.16);
}

.weekly-progress-fill,
.progress-fill {
  background: var(--gold);
}
```

- [ ] **Step 4: Ensure Home text contrast is app-safe**

Audit Home selectors in `src/styles.css` and replace dark text colors inside the phone app with `var(--text)`, `var(--text-strong)`, or `var(--muted)`.

- [ ] **Step 5: Run focused high-fi tests**

Run:

```bash
npm test -- src/tests/highFiMainWorkflow.test.tsx
```

Expected: pass.

## Task 4: High-Fi Coach Landing And Coach Profile

**Files:**
- Modify: `src/pages/CoachPages.tsx`
- Modify: `src/styles.css`
- Test: `src/tests/highFiMainWorkflow.test.tsx`
- Test: `src/tests/phoneFlows.test.tsx`

- [ ] **Step 1: Add coach workflow regression checks**

Extend `src/tests/highFiMainWorkflow.test.tsx`:

```tsx
it("keeps coach landing links routed to the requested destinations", async () => {
  const user = (await import("@testing-library/user-event")).default.setup();
  render(<SolunaPrototype startRoute={{ name: "coach" }} />);
  await user.click(screen.getByRole("button", { name: /Upcoming Session/i }));
  expect(screen.getByRole("heading", { name: "My Sessions" })).toBeInTheDocument();
});

it("keeps coach profile identity and availability visible", () => {
  render(<SolunaPrototype startRoute={{ name: "coachProfile" }} />);
  expect(screen.getByText("Dr. Sarah Chen")).toBeInTheDocument();
  expect(screen.getByText("she/her")).toBeInTheDocument();
  expect(screen.getByText(/Hispanic\/Latina/i)).toBeInTheDocument();
  expect(screen.getByText(/Next available/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Check Availability/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Convert CoachAvatar to class-based glass initials**

In `src/pages/CoachPages.tsx`, replace the inline style block in `CoachAvatar` with:

```tsx
return (
  <div aria-hidden="true" className="coach-avatar">
    {name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")}
  </div>
);
```

- [ ] **Step 3: Add coach landing glass styling**

In `src/styles.css`, update coach landing selectors:

```css
.coach-dropin-row,
.coach-line-card,
.coach-history-row,
.coach-list-card,
.coach-booking-hero {
  background: var(--surface);
  border: 1px solid var(--line);
  color: var(--text);
  backdrop-filter: var(--glass-blur);
}

.coach-icon-tile,
.coach-avatar {
  background: rgba(255, 255, 255, 0.14);
  color: var(--text-strong);
  border: 1px solid rgba(255, 255, 255, 0.16);
}

.coach-icon-tile.is-strong {
  background: rgba(255, 209, 102, 0.92);
  color: var(--strong-ink);
}
```

- [ ] **Step 4: Add coach profile high-fi styling**

In `src/styles.css`, update profile selectors:

```css
.coach-profile-hero {
  color: var(--text);
}

.coach-profile-avatar {
  background: rgba(255, 255, 255, 0.18);
  color: var(--text-strong);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.24);
}

.coach-profile-meta,
.coach-next-available {
  color: var(--muted);
}

.coach-bio-card,
.coach-session-callout {
  background: var(--surface);
  border-color: var(--line);
  color: var(--text);
}

.coach-specialty-chip {
  background: rgba(255, 255, 255, 0.12);
  color: var(--muted);
}

.coach-specialty-chip.is-matched {
  background: rgba(255, 209, 102, 0.9);
  color: var(--strong-ink);
}
```

- [ ] **Step 5: Keep Check Availability fixed and expectation callout unstuck**

Confirm `CoachProfilePage` keeps `coach-session-callout` inside normal `PhoneScroll` and `PrimaryButton` inside `StickyFooter`. Do not move `coach-session-callout` into `StickyFooter`.

- [ ] **Step 6: Run tests**

Run:

```bash
npm test -- src/tests/highFiMainWorkflow.test.tsx src/tests/phoneFlows.test.tsx
```

Expected: pass.

## Task 5: High-Fi Schedule, Confirm Booking, Booking Success, And My Sessions

**Files:**
- Modify: `src/pages/CoachPages.tsx`
- Modify: `src/styles.css`
- Test: `src/tests/highFiMainWorkflow.test.tsx`
- Test: `src/tests/phoneFlows.test.tsx`

- [ ] **Step 1: Add booking path regression checks**

Extend `src/tests/highFiMainWorkflow.test.tsx`:

```tsx
it("keeps the booking path complete through success and my sessions", async () => {
  const user = (await import("@testing-library/user-event")).default.setup();
  render(<SolunaPrototype startRoute={{ name: "coachProfile" }} />);
  await user.click(screen.getByRole("button", { name: /Check Availability/i }));
  expect(screen.getByRole("heading", { name: "Schedule" })).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "30" }));
  await user.click(screen.getByRole("button", { name: "11:00 AM" }));
  await user.click(screen.getByRole("button", { name: "Continue" }));
  await user.click(screen.getByRole("button", { name: "Review & Confirm" }));
  expect(screen.getByRole("heading", { name: "Confirm Booking" })).toBeInTheDocument();
  expect(screen.getByText("What to expect from your chat")).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Confirm the Session" }));
  expect(screen.getByRole("heading", { name: "Booking Confirmed!" })).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: /Go to My Sessions/i }));
  expect(screen.getByRole("heading", { name: "My Sessions" })).toBeInTheDocument();
});
```

- [ ] **Step 2: Add class names for schedule controls if needed**

In `src/pages/CoachPages.tsx`, add class names to schedule elements while preserving state logic:

```tsx
<Card className="schedule-card">
```

For date buttons, set:

```tsx
className={active ? "schedule-day is-selected" : "schedule-day"}
```

For disabled date buttons, include:

```tsx
className={active ? "schedule-day is-selected" : disabled ? "schedule-day is-disabled" : "schedule-day"}
```

- [ ] **Step 3: Add schedule and time glass styling**

In `src/styles.css`:

```css
.schedule-card {
  background: var(--surface);
  border-color: var(--line);
}

.schedule-day {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: var(--text);
}

.schedule-day.is-selected {
  background: rgba(255, 209, 102, 0.92);
  color: var(--strong-ink);
}

.schedule-day.is-disabled {
  opacity: 0.34;
  cursor: not-allowed;
}
```

- [ ] **Step 4: Style booking review and expectation timeline**

In `src/styles.css`:

```css
.booking-review-card,
.booking-expect-card {
  background: var(--surface);
  border-color: var(--line);
}

.booking-expect-list li {
  color: var(--text);
}

.booking-expect-list li::before {
  border-color: var(--gold);
  background: rgba(255, 255, 255, 0.08);
}

.booking-expect-list li:not(:last-child)::after {
  background: rgba(255, 209, 102, 0.72);
}
```

- [ ] **Step 5: Style booking success and my sessions**

In `src/styles.css`:

```css
.booking-success-hero {
  display: grid;
  min-height: 260px;
  place-items: center;
}

.booking-success-message {
  border: 0;
  background: transparent;
  color: var(--text-strong);
  text-align: center;
}

.booking-success-message svg {
  color: var(--gold);
}

.ghost-link-button {
  border-color: transparent;
  background: transparent;
  color: var(--muted);
  box-shadow: none;
}
```

- [ ] **Step 6: Run tests**

Run:

```bash
npm test -- src/tests/highFiMainWorkflow.test.tsx src/tests/phoneFlows.test.tsx
```

Expected: pass.

## Task 6: Visual Smoke Verification And Full Build

**Files:**
- Modify: `e2e/soluna-prototype.spec.ts`
- Verify: local browser at `http://127.0.0.1:5175/`

- [ ] **Step 1: Add Playwright smoke check for high-fi app shell**

Append to `e2e/soluna-prototype.spec.ts`:

```ts
test("after phone keeps demo shell while showing high-fi app styling", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "After" }).click();
  await expect(page.getByText("Interactive case-study prototype")).toBeVisible();
  await expect(page.getByLabel("Interactive phone frame")).toBeVisible();
  await expect(page.locator(".phone-page")).toBeVisible();

  const phoneBackground = await page.locator(".phone-page").evaluate((node) => {
    return window.getComputedStyle(node).backgroundImage;
  });

  expect(phoneBackground).toContain("radial-gradient");
  expect(phoneBackground.toLowerCase()).not.toContain("green");
});
```

- [ ] **Step 2: Run unit tests**

Run:

```bash
npm test
```

Expected: all Vitest suites pass.

- [ ] **Step 3: Run build**

Run:

```bash
npm run build
```

Expected: TypeScript and Vite build pass.

- [ ] **Step 4: Run e2e**

Run:

```bash
npm run e2e
```

Expected: all Playwright tests pass.

- [ ] **Step 5: Browser visual check**

Open or refresh `http://127.0.0.1:5175/` in the in-app browser and verify:

- Outer website layout is unchanged.
- After phone has purple/pink/yellow ambient background.
- Cards and buttons are glass without internal gradients.
- Home, Coach, Coach Profile, Schedule, Confirm Booking, Booking Success, and My Sessions are readable.
- No green is visible in the app.
- Scrollbars are hidden.

## Self-Review Checklist

- Spec coverage: Tasks cover Home, Coach landing, Coach profile, Schedule, Confirm booking, Booking confirmed, My Sessions, shared header, bottom nav, glass styling, ambient background, no green, hidden scrollbars, and no outer website changes.
- Placeholder scan: This plan avoids placeholder implementation language and includes exact commands and code snippets for every code-producing step.
- Type consistency: New TSX class names are plain `className` strings and do not introduce new TypeScript types. Test imports match the existing Vitest/Testing Library setup.
