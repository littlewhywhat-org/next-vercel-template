import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'node:assert/strict';
import type { TodoWorld } from './world.ts';

async function addTodo(world: TodoWorld, label: string) {
  await world.page.getByTestId('todo-input').fill(label);
  await world.page.getByTestId('todo-add').click();
  await world.page.getByTestId('todo-label').filter({ hasText: label }).waitFor();
}

async function completeTodo(world: TodoWorld, label: string) {
  const row = world.page.getByTestId('todo-item').filter({ hasText: label });
  await row.getByTestId('todo-toggle').click();
  await row.locator('[data-testid="todo-toggle"][data-state="checked"]').waitFor();
}

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
  await addTodo(this, this.lastLabel);
});

Given('user has an open todo', async function (this: TodoWorld) {
  await addTodo(this, this.lastOpenLabel);
});

Given('user has a done todo', async function (this: TodoWorld) {
  await addTodo(this, this.lastDoneLabel);
  await completeTodo(this, this.lastDoneLabel);
});

Given('user has no open todos', async function (this: TodoWorld) {
  await completeTodo(this, this.lastOpenLabel);
});

Given('user is filtering to {word}', async function (this: TodoWorld, filter: string) {
  await this.page.getByTestId(`todo-filter-${filter}`).click();
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

When('user filters to {word}', async function (this: TodoWorld, filter: string) {
  await this.page.getByTestId(`todo-filter-${filter}`).click();
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

Then('user sees only the open todo', async function (this: TodoWorld) {
  await this.page.getByTestId('todo-label').filter({ hasText: this.lastOpenLabel }).waitFor();
  await this.page.getByTestId('todo-label').filter({ hasText: this.lastDoneLabel }).waitFor({ state: 'hidden' });
  assert.equal(await this.page.getByTestId('todo-item').count(), 1);
});

Then('user sees only the done todo', async function (this: TodoWorld) {
  await this.page.getByTestId('todo-label').filter({ hasText: this.lastDoneLabel }).waitFor();
  await this.page.getByTestId('todo-label').filter({ hasText: this.lastOpenLabel }).waitFor({ state: 'hidden' });
  assert.equal(await this.page.getByTestId('todo-item').count(), 1);
  await this.page
    .getByTestId('todo-item')
    .filter({ hasText: this.lastDoneLabel })
    .locator('[data-testid="todo-toggle"][data-state="checked"]')
    .waitFor();
});

Then('user sees both todos', async function (this: TodoWorld) {
  await this.page.getByTestId('todo-label').filter({ hasText: this.lastOpenLabel }).waitFor();
  await this.page.getByTestId('todo-label').filter({ hasText: this.lastDoneLabel }).waitFor();
  assert.equal(await this.page.getByTestId('todo-item').count(), 2);
});

Then('user sees an empty open list', async function (this: TodoWorld) {
  await this.page.getByTestId('todo-empty').filter({ hasText: 'No open todos' }).waitFor();
});
