import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { AstBuilder, compile, GherkinClassicTokenMatcher, Parser } from '@cucumber/gherkin';
import { IdGenerator } from '@cucumber/messages';

const dir = join(dirname(fileURLToPath(import.meta.url)), '../docs/flows');
const files = readdirSync(dir)
  .filter((f) => f.endsWith('.feature'))
  .sort();

let failed = 0;
for (const file of files) {
  const path = join(dir, file);
  const source = readFileSync(path, 'utf8');
  try {
    const uuid = IdGenerator.uuid();
    const parser = new Parser(new AstBuilder(uuid), new GherkinClassicTokenMatcher());
    const gherkinDocument = parser.parse(source);
    const pickles = compile(gherkinDocument, file, uuid);
    const scenarios = pickles.length;
    const feature = gherkinDocument.feature?.name ?? '?';
    console.log(`OK  ${file}  Feature: ${feature}  (${scenarios} scenarios)`);
  } catch (err) {
    failed += 1;
    console.error(`FAIL ${file}`);
    console.error(err instanceof Error ? err.message : err);
  }
}

if (failed) {
  process.exit(1);
}
console.log(`OK  ${files.length} feature files`);
