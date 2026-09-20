import { After, Before, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import type { TodoWorld } from './world.ts';

setDefaultTimeout(30_000);

const baseURL = process.env.BASE_URL ?? 'http://127.0.0.1:3000';

Before(async function (this: TodoWorld) {
  this.browser = await chromium.launch({ headless: true });
  this.context = await this.browser.newContext({ baseURL });
  this.page = await this.context.newPage();
});

After(async function (this: TodoWorld) {
  await this.context?.close();
  await this.browser?.close();
});
