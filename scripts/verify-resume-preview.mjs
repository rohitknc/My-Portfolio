import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { resume, resumePreview } from "../lib/content.js";
const base = process.env.TEST_URL || "http://127.0.0.1:3000";
const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");
const expectedPreview =
  "42d05c941c28f07a0bc154c393f6449ceadca30518e7ae189e30ebbdd8b3ffc2";
const expectedDownload =
  "e3f08d6371699fc22b60524925570d154d512ef64a27edef97882d6939ae503b";
assert.equal(resume, "/Kanjarla-Narasimha-Charyulu-Resume.pdf");
assert.notEqual(resumePreview, resume);
const previewBytes = await readFile(`public${resumePreview}`);
const downloadBytes = await readFile(`public${resume}`);
assert.equal(
  digest(previewBytes),
  expectedPreview,
  "Display PDF matches the supplied Downloads file",
);
assert.equal(
  digest(downloadBytes),
  expectedDownload,
  "Original downloadable PDF is unchanged",
);
const response = await fetch(base + "/");
assert.equal(response.status, 200);
const html = await response.text();
const about = html.indexOf('id="about"');
const preview = html.indexOf('id="resume"');
const contact = html.indexOf('id="contact"');
assert.ok(
  about >= 0 && about < preview && preview < contact,
  "Resume appears between approach and contact",
);
assert.ok(!html.includes('id="experience"'), "No duplicate experience section");
assert.ok(!html.includes('id="capabilities"'), "No duplicate capabilities section");
assert.ok(!html.includes('href="/#experience"'), "No stale experience navigation");
assert.ok(!html.includes('href="/#capabilities"'), "No stale capabilities navigation");
assert.ok(html.includes('id="resume-section-title"'));
assert.ok(
  html.includes(encodeURIComponent("/resume-preview/narasimha-preview.jpg")),
  "Real-PDF poster is server-rendered",
);
assert.ok(
  !html.includes('class="studio-controls"'),
  "No studio mode/zoom toolbar on portfolio",
);
assert.ok(
  !html.includes("Desk surface color"),
  "No studio color switch on portfolio",
);
const downloads = html.match(/<a\b[^>]*\bdownload(?:="[^"]*")?[^>]*>/g) || [];
assert.ok(
  downloads.length >= 3,
  "Existing and integrated download actions present",
);
for (const anchor of downloads)
  assert.equal(
    anchor.match(/href="([^"]+)"/)?.[1],
    resume,
    "Download actions retain the existing PDF",
  );
for (const [url, bytes] of [
  [resumePreview, previewBytes],
  [resume, downloadBytes],
]) {
  const r = await fetch(base + url);
  assert.equal(r.status, 200, url);
  assert.match(r.headers.get("content-type"), /pdf/);
  assert.deepEqual(
    Buffer.from(await r.arrayBuffer()),
    bytes,
    "Served PDF is byte-identical",
  );
}
const poster = await fetch(base + "/resume-preview/narasimha-preview.jpg");
assert.equal(poster.status, 200);
assert.match(poster.headers.get("content-type"), /image\/jpeg/);
assert.ok(
  !html.includes('class="resume-aside"'),
  "No duplicate résumé summary column",
);
assert.ok(
  !html.includes('class="resume-document-details"'),
  "No repeated résumé metadata",
);
assert.ok(
  !html.includes('class="resume-paper-open"'),
  "Inline PDF is not covered by a click overlay",
);
console.log(
  "PASS integrated placement, server-rendered preview, clean controls, exact preview PDF, and unchanged download bytes/links.",
);
