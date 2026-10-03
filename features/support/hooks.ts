import { After, Before, setDefaultTimeout } from '@cucumber/cucumber';
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';
import type { TodoWorld } from './world.ts';

setDefaultTimeout(30_000);

const baseURL = process.env.BASE_URL ?? 'http://127.0.0.1:3000';

function isDryRun(): boolean {
  return process.argv.includes('--dry-run') || process.argv.includes('-d');
}

Before(async function (this: TodoWorld) {
  const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  this.lastLabel = `Buy milk ${stamp}`;
  this.lastOpenLabel = `Open ${stamp}`;
  this.lastDoneLabel = `Done ${stamp}`;
  if (isDryRun()) {
    return;
  }
  this.browser = await chromium.launch({ headless: true });
  this.context = await this.browser.newContext({ baseURL });
  this.page = await this.context.newPage();
});

After(async function (this: TodoWorld, { pickle, result }) {
  if (result?.status === 'FAILED' && this.page) {
    const slug = pickle.name.replace(/\s+/g, '-').toLowerCase();
    mkdirSync('e2e-artifacts', { recursive: true });
    const err = await this.page
      .getByTestId('todo-error')
      .textContent()
      .catch(() => null);
    const body = await this.page
      .locator('body')
      .innerText()
      .catch(() => '');
    console.error(`FAIL ${pickle.name} url=${this.page.url()}`);
    if (err) {
      console.error(`todo-error: ${err}`);
    }
    console.error(body.slice(0, 2000));
    await this.page.screenshot({ path: `e2e-artifacts/${slug}.png`, fullPage: true }).catch(() => {});
  }
  await this.context?.close();
  await this.browser?.close();
});
