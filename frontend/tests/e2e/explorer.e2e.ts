import { test, expect } from '@playwright/test';

test('should display folders correctly', async ({ page }) => {
  await page.goto('/');

  const folder = await page.locator('text=Documents');
  await expect(folder).toBeVisible();
});

test('should allow creating a new folder', async ({ page }) => {
  await page.goto('/');

  await page.fill('input[name="folderName"]', 'New Folder');
  await page.click('button:has-text("Create")');

  const newFolder = await page.locator('text=New Folder');
  await expect(newFolder).toBeVisible();
});
