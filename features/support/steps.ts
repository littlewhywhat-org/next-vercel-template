import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'node:assert/strict';
import type { TodoWorld } from './world.ts';

Given('user is signed in', async function (this: TodoWorld) {
  await this.page.goto('/');
  await this.page.getByTestId('todo-list').waitFor({ timeout: 20_000 });
});

Given('user is on the list', async function (this: TodoWorld) {
  await this.page.getByTestId('todo-list').waitFor();
});

Given('user has a todo', async function (this: TodoWorld) {
  await this.page.getByTestId('todo-input').fill(this.lastLabel);
  await this.page.getByTestId('todo-add').click();
  await this.page.getByTestId('todo-label').filter({ hasText: this.lastLabel }).waitFor();
});

When('user opens the list', async function (this: TodoWorld) {
  await this.page.goto('/');
  await this.page.getByTestId('todo-list').waitFor({ timeout: 20_000 });
});

When('user adds a todo', async function (this: TodoWorld) {
  await this.page.getByTestId('todo-input').fill(this.lastLabel);
  await this.page.getByTestId('todo-add').click();
});

When('user completes it', async function (this: TodoWorld) {
  await this.page.getByTestId('todo-toggle').first().click();
});

When('user deletes it', async function (this: TodoWorld) {
  await this.page.getByTestId('todo-delete').first().click();
});

Then('user sees an empty list', async function (this: TodoWorld) {
  await this.page.getByTestId('todo-empty').waitFor();
});

Then('user sees that todo', async function (this: TodoWorld) {
  await this.page.getByTestId('todo-label').filter({ hasText: this.lastLabel }).waitFor();
});

Then('user sees it marked done', async function (this: TodoWorld) {
  const toggle = this.page.getByTestId('todo-toggle').first();
  await toggle.waitFor();
  const checked = await toggle.getAttribute('data-state');
  assert.equal(checked, 'checked');
});

Then('user does not see that todo', async function (this: TodoWorld) {
  await this.page.getByTestId('todo-empty').waitFor();
});
