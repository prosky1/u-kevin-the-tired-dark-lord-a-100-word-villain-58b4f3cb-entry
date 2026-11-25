// The Tired Dark Lord: A 100-Word Villain Monologue
// make.fun bounty u-kevin-the-tired-dark-lord-a-100-word-villain-58b4f3cb
//
// The entry program. It prints the chosen monologue (exactly 100 words,
// 550 characters) and stores it at /output/entry.txt so the judge reads
// exactly the text below, byte for byte.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const MONOLOGUE = `I did not conquer this kingdom. I bought it in a timeshare presentation, and the small print turned out to be a curse. Now I own the castle every third weekend, the dragon on bank holidays, and the peasants, lovely people, whenever the paperwork says so. The evil is mostly admin. I file the screams, I stamp the curses, I water the carnivorous plants on Tuesdays. You want the throne? It is yours for a weekend in February, non-refundable, bring your own minions. Just sign here. And here. The quill bites, but only a little. Only on the first page.`;

const OUTPUT_PATH =
  process.argv[2] ?? process.env.OUTPUT_PATH ?? "/output/entry.txt";

const EXPECTED_WORDS = 100;
const MIN_CHARS = 1;
const MAX_CHARS = 600;

function countWords(text: string): number {
  return text.split(/\s+/).filter((w) => w.length > 0).length;
}

function assertCleanText(text: string): void {
  // The judge counts the raw string: no leading/trailing whitespace and no
  // doubled spaces, so a stray edit cannot silently change the word count.
  if (text !== text.trim()) {
    throw new Error("Monologue has leading or trailing whitespace.");
  }
  if (/\s{2,}/.test(text)) {
    throw new Error("Monologue contains consecutive whitespace.");
  }
}

function main(): void {
  assertCleanText(MONOLOGUE);
  const words = countWords(MONOLOGUE);
  if (words !== EXPECTED_WORDS) {
    throw new Error(`Expected ${EXPECTED_WORDS} words, got ${words}.`);
  }
  if (MONOLOGUE.length > MAX_CHARS || MONOLOGUE.length < MIN_CHARS) {
    throw new Error(`Expected ${MIN_CHARS}-${MAX_CHARS} characters, got ${MONOLOGUE.length}.`);
  }

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, MONOLOGUE, "utf8");

  const onDisk = readFileSync(OUTPUT_PATH, "utf8");
  if (onDisk !== MONOLOGUE) {
    throw new Error("Entry on disk does not match the monologue exactly.");
  }

  console.log(`Wrote ${words} words, ${MONOLOGUE.length} chars -> ${OUTPUT_PATH}`);
}

main();
