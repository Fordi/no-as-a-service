import { writeFile } from "node:fs/promises";
import normalize from "../lib/normalize.js";
import { reasons, reasonsFile } from "../lib/reasons.js";

await writeFile(reasonsFile, JSON.stringify(normalize(reasons), null, 2), "utf8");
