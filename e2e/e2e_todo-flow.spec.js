// e2e/todo-flow.spec.js
import { test, expect } from '@playwright/test';

// Updated Todo flow test
test('Todo flow: login, add todos, delete one, verify filter, logout', async ({ page }) => {
  // Navigate to login page
  await page.goto('/login');
  
  // Perform login
  await page.fill('input[placeholder="Username"]', 'testuser');
  await page.click('button');
  
  // Wait for navigation to complete - more robust than just waiting for URL
  await page.waitForSelector('input[placeholder="Add a todo"]');
  
  // Add first todo
  await page.fill('input[placeholder="Add a todo"]', 'Short');
  await page.press('input[placeholder="Add a todo"]', 'Enter');
  await page.waitForTimeout(2000); // Wait for 2 seconds cause of Delete Bug

  // Add second todo
  await page.fill('input[placeholder="Add a todo"]', 'Medium todo');
  await page.press('input[placeholder="Add a todo"]', 'Enter');
    await page.waitForTimeout(2000); // Wait for 2 seconds cause of Delete Bug

  // Add third todo
  await page.fill('input[placeholder="Add a todo"]', 'This is a long todo');
  await page.press('input[placeholder="Add a todo"]', 'Enter');
  await page.waitForTimeout(2000); // Wait for 2 seconds cause of Delete Bug
  
  // Verify all todos are visible initially
  await expect(page.locator('li:has-text("Short")')).toBeVisible();
  await expect(page.locator('li:has-text("Medium todo")')).toBeVisible();
  await expect(page.locator('li:has-text("This is a long todo")')).toBeVisible();
  
  // Test short filter (≤ 10 chars)
  await page.selectOption('select', 'short');
  await expect(page.locator('li:has-text("Short")')).toBeVisible();
  // Medium todo is longer than 10 chars, so it should not be visible
  await expect(page.locator('li:has-text("Medium todo")')).not.toBeVisible();
  await expect(page.locator('li:has-text("This is a long todo")')).not.toBeVisible();
  
  // Test long filter (> 10 chars)
  await page.selectOption('select', 'long');
  await expect(page.locator('li:has-text("Short")')).not.toBeVisible();
  await expect(page.locator('li:has-text("Medium todo")')).toBeVisible();
  await expect(page.locator('li:has-text("This is a long todo")')).toBeVisible();
  
  // Switch back to all filter before deleting
  await page.selectOption('select', 'all');
  
  // Delete the Short todo and verify it's gone
  const shortTodoDeleteButton = page.locator('li:has-text("Short") button');
  await shortTodoDeleteButton.click();
  await expect(page.locator('li:has-text("Short")')).not.toBeVisible();
  
  // Make sure the remaining todos are still visible
  await expect(page.locator('li:has-text("Medium todo")')).toBeVisible();
  await expect(page.locator('li:has-text("This is a long todo")')).toBeVisible();
  
  // Navigate back to login page
  await page.goto('/login');
});
