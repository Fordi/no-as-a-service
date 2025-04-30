import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const reasonsFile = resolve(dirname(fileURLToPath(import.meta.url)), '../assets/reasons.json');
export const reasons = JSON.parse(await readFile(reasonsFile, 'utf-8'));
