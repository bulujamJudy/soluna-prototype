import { expect, test } from "@playwright/test";

test("desktop shows narrative and phone stage", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Interactive case-study prototype")).toBeVisible();
  await expect(page.getByLabel("Interactive phone frame")).toBeVisible();
  await expect(page.getByRole("button", { name: "Before" })).toBeVisible();
  await expect(page.getByRole("button", { name: "After" })).toBeVisible();
});

test("before-after toggle opens the after prototype", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Replace with recorded before video: Trust friction demo")).toBeVisible();
  await page.getByRole("button", { name: "After" }).click();
  await expect(page.getByRole("heading", { name: "Coach", exact: true })).toBeVisible();
});

test("feature tabs reset before video labels", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Community Engagement" }).click();
  await expect(page.getByText("Replace with recorded before video: Community engagement friction demo")).toBeVisible();
  await page.getByRole("button", { name: "Design Accessibility" }).click();
  await expect(page.getByText("Replace with recorded before video: Design accessibility friction demo")).toBeVisible();
});

test("mobile layout keeps controls usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Trust" })).toBeVisible();
  await expect(page.getByRole("button", { name: "After" })).toBeVisible();
  await page.getByRole("button", { name: "After" }).click();
  await expect(page.getByRole("heading", { name: "Coach", exact: true })).toBeVisible();
});
