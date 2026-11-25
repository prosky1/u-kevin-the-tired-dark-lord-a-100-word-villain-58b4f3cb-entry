// The Tired Dark Lord: A 100-Word Villain Monologue
// Entry program for make.fun competition
// u-kevin-the-tired-dark-lord-a-100-word-villain-58b4f3cb
//
// Writes the monologue (exactly 100 words) to /output/entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const MONOLOGUE =
  "You came all this way to stop me, and honestly, I respect the effort. " +
  "I really do. But look at me. I have been monologuing since dawn, the " +
  "lava moat needs refilling, and my minions unionized last Tuesday. World " +
  "domination was supposed to come with a pension plan. Instead I got a " +
  "castle with no heating and a prophecy that does not even mention dental. " +
  "So take the sword. Take the throne. Take the cursed amulet — it itches " +
  "anyway. I will be in the tower, napping. If the kingdom needs " +
  "conquering, leave a message. Preferably after lunch. Preferably never.";

const OUTPUT_PATH =
  process.argv[2] ?? process.env.OUTPUT_PATH ?? "/output/entry.txt";

function wordCount(text: string): number {
  return text.trim().split(/\s+/).length;
}

function main(): void {
  const words = wordCount(MONOLOGUE);
  if (words !== 100) {
    throw new Error(`Monologue must be 100 words, got ${words}.`);
  }
  if (MONOLOGUE.length < 1 || MONOLOGUE.length > 600) {
    throw new Error(`Monologue must be 1-600 characters, got ${MONOLOGUE.length}.`);
  }
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, MONOLOGUE, "utf8");
  // Round-trip check: what landed on disk must be byte-identical to the
  // monologue above, with no trailing newline added by the writer.
  const written = readFileSync(OUTPUT_PATH, "utf8");
  if (written !== MONOLOGUE) {
    throw new Error("Round-trip mismatch: written entry differs from monologue.");
  }
  console.log(`Wrote ${words} words (${MONOLOGUE.length} chars) to ${OUTPUT_PATH}`);
}

main();
