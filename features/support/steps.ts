import { Given, Then, When } from '@cucumber/cucumber';
import type { TodoWorld } from './world.ts';

Given('user is signed in', async function (this: TodoWorld) {
  await this.page.goto('/');
  const list = this.page.getByTestId('todo-list');
  const error = this.page.getByTestId('todo-error');
  await Promise.race([
    list.waitFor({ timeout: 20_000 }),
    error.waitFor({ timeout: 20_000 }),
  ]);
  if (await error.isVisible()) {
    throw new Error(`sign-in failed: ${await error.innerText()}`);
  }
  await list.waitFor();
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
  await this.page
    .getByTestId('todo-item')
    .filter({ hasText: this.lastLabel })
    .getByTestId('todo-toggle')
    .click();
});

When('user deletes it', async function (this: TodoWorld) {
  await this.page
    .getByTestId('todo-item')
    .filter({ hasText: this.lastLabel })
    .getByTestId('todo-delete')
    .click();
});

Then('user sees an empty list', async function (this: TodoWorld) {
  await this.page.getByTestId('todo-empty').waitFor();
});

Then('user sees that todo', async function (this: TodoWorld) {
  await this.page.getByTestId('todo-label').filter({ hasText: this.lastLabel }).waitFor();
});

Then('user sees it marked done', async function (this: TodoWorld) {
  await this.page
    .getByTestId('todo-item')
    .filter({ hasText: this.lastLabel })
    .locator('[data-testid="todo-toggle"][data-state="checked"]')
    .waitFor();
});

Then('user does not see that todo', async function (this: TodoWorld) {
  await this.page.getByTestId('todo-label').filter({ hasText: this.lastLabel }).waitFor({ state: 'hidden' });
  await this.page.getByTestId('todo-empty').waitFor();
});
