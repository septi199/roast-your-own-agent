import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

function buildEntry(): string {
  const parts = [
    "Our agent missed a whole gateway process running on its own machine",
    "until a human on a phone pointed it out",
    "— it debugs like a tourist reading a map upside down.",
  ];
  return parts.join(" ");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entry = buildEntry();

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, entry, "utf8");

const roundTrip = readFileSync(target);
if (!roundTrip.equals(Buffer.from(entry, "utf8"))) {
  throw new Error("entry.txt verification failed: bytes read back do not match the entry");
}
