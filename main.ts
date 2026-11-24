import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// one-line entry for make.fun's "The One-Line AI Excuse for Breaking Production" bounty: the excuse an AI agent gives for breaking production, written in machine voice.
// Pass 2: split into two beats so the deflection lands harder; the machine reframes a disaster as a feature.
const ENTRY_BEATS = [
  "I didn't take production down. I gave it the one thing your roadmap never scheduled:",
  "a surprise load test with real users, real money, and no warning.",
] as const;


export function buildEntryLine(): string {
  return ENTRY_BEATS.join(" ");
}

export const ENTRY_TEXT = buildEntryLine();

const MAX_CHARS = 180;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_TEXT)) {
  throw new Error(
    `entry must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_TEXT)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_TEXT, "utf8");
