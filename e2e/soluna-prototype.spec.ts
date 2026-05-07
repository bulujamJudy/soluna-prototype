import { expect, test } from "@playwright/test";

test("desktop shows narrative and phone stage", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Interactive case-study prototype")).toBeVisible();
  await expect(page.getByLabel("Interactive phone frame")).toBeVisible();
  await expect(page.getByRole("button", { name: "Before" })).toBeVisible();
  await expect(page.getByRole("button", { name: "After" })).toBeVisible();
});

test("wide viewport uses iPhone 17 frame dimensions", async ({ page, isMobile }) => {
  test.skip(isMobile, "Mobile emulation applies viewport scaling; this contract is measured in desktop CSS pixels.");
  await page.setViewportSize({ width: 1280, height: 1100 });
  await page.goto("/");

  const frameBox = await page.getByLabel("Interactive phone frame").boundingBox();
  const screenBox = await page.locator(".phone-screen").boundingBox();

  expect(Math.round(frameBox?.width ?? 0)).toBe(420);
  expect(Math.round(frameBox?.height ?? 0)).toBe(892);
  expect(Math.round(screenBox?.width ?? 0)).toBe(402);
  expect(Math.round(screenBox?.height ?? 0)).toBe(874);
});

test("before-after toggle opens the after prototype", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByAltText("Trust friction before screenshot")).toBeVisible();
  await page.getByRole("button", { name: "After" }).click();
  await expect(page.getByTestId("after-prototype-slot").getByRole("heading", { name: "Coach", exact: true })).toBeVisible();
});

test("feature tabs reset before video labels", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Community Engagement" }).click();
  await expect(page.getByAltText("Community engagement friction before screenshot")).toBeVisible();
  await page.getByRole("button", { name: "Design Accessibility" }).click();
  await expect(page.getByAltText("Design accessibility friction before screenshot")).toBeVisible();
});

test("mobile layout keeps controls usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Trust" })).toBeVisible();
  await expect(page.getByRole("button", { name: "After" })).toBeVisible();
  await page.getByRole("button", { name: "After" }).click();
  await expect(page.getByTestId("after-prototype-slot").getByRole("heading", { name: "Coach", exact: true })).toBeVisible();
});
