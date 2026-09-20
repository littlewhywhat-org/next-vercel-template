import { setWorldConstructor, World } from '@cucumber/cucumber';
import type { Browser, BrowserContext, Page } from 'playwright';

export class TodoWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  lastLabel = 'Buy milk';
  lastOpenLabel = 'Open task';
  lastDoneLabel = 'Done task';
}

setWorldConstructor(TodoWorld);
