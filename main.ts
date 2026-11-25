// Loading Screen Gold: A Tip in 200 Characters — entry program.
//
// Writes one short text to /output/entry.txt: a loading-screen tip aimed
// at stressed developers and AI coding agents. Deterministic, no network,
// no randomness.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry text. The laugh comes from the universal mid-build lie —
// "almost done" — called out in the exact moment the reader is staring
// at it, which is the fit to this audience: every stressed developer has
// watched that bar stall. The tip itself is real advice (drink water),
// and the kicker ("the error log will still be there") is both the joke
// and the truth: the work waits, the human shouldn't.
// Revision: an earlier draft said the loading bar "is giving you time to
// reconsider the 47 tabs you have open" — dropped, because the tab joke
// is about the reader, not the build; the 40-minute line lands in the
// exact moment the reader is staring at the bar.
const ENTRY =
  "Tip: if the build has been 'almost done' for 40 minutes, it is not almost done. Go drink water. The error log will still be there.";

// Competition rules: at most 200 characters, counted as Unicode code
// points, and not only white space. Enforce it here so a bad edit fails
// loudly.
const codePoints = [...ENTRY].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`entry must be 1-200 code points, got ${codePoints}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
// The rules require a single line: reject any line break outright, so a
// bad edit that introduces one fails loudly instead of shipping a
// two-line entry to a one-line judge.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line, got a line break");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${codePoints} code points to ${outPath}`);
