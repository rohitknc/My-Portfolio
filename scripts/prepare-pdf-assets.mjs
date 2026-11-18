import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { cpSync, mkdirSync } from "node:fs";
const require = createRequire(import.meta.url);
const pdfRequire = createRequire(require.resolve("react-pdf"));
const root = dirname(pdfRequire.resolve("pdfjs-dist/package.json"));
const dest = resolve("public/resume-studio");
mkdirSync(dest, { recursive: true });
for (const name of ["cmaps", "standard_fonts", "wasm"])
  cpSync(join(root, name), join(dest, name), { recursive: true });
console.log("Prepared matching PDF.js character maps, fonts, and codecs.");
