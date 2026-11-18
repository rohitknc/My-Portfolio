import assert from "node:assert/strict";
import { projects, siteUrl, resume } from "../lib/content.js";
const base = process.env.TEST_URL || "http://127.0.0.1:3000";
const paths = ["/", "/work", ...projects.map((p) => `/work/${p.slug}`)];
const titles = new Set();
for (const path of paths) {
  const response = await fetch(`${base}${path}`);
  assert.equal(response.status, 200, path);
  const html = await response.text();
  assert.match(html, /<h1[ >]/, `${path}: server-rendered h1`);
  assert.match(
    html,
    /<meta name="description" content="[^"]+"/,
    `${path}: description`,
  );
  assert.ok(
    html.includes(
      `rel="canonical" href="${siteUrl}${path === "/" ? "" : path}`,
    ),
    `${path}: canonical`,
  );
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert.ok(title, `${path}: title`);
  titles.add(title);
  if (path === "/") {
    assert.ok(html.includes("application/ld+json"), "Person structured data");
    assert.ok(
      html.includes("PiSquare Technologies"),
      "experience without executing JS",
    );
    assert.ok(
      html.includes("C# Plugins"),
      "project content without executing JS",
    );
    assert.ok(html.includes("Narasaraopeta Engineering College"), "education in Person structured data");
    assert.ok(html.includes("INTERACTIVE WALKTHROUGH"), "server-rendered architecture content");
    assert.ok(html.includes("narasimha-profile.png"), "updated profile portrait");
  }
  console.log(`PASS ${path}: rendered content and SEO metadata`);
}
assert.equal(titles.size, paths.length, "Unique page titles");
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
for (const path of paths)
  assert.ok(
    sitemap.includes(`${siteUrl}${path === "/" ? "" : path}`),
    `Sitemap ${path}`,
  );
const robots = await (await fetch(`${base}/robots.txt`)).text();
assert.ok(robots.includes(`${siteUrl}/sitemap.xml`), "Robots sitemap");
assert.equal(
  (await fetch(`${base}/not-a-real-project-page`)).status,
  404,
  "Unknown page returns 404",
);
assert.equal(
  (await fetch(`${base}/work/not-a-real-project`)).status,
  404,
  "Unknown case study returns 404",
);
const pdf = await fetch(`${base}${resume}`);
assert.equal(pdf.status, 200);
assert.match(pdf.headers.get("content-type"), /pdf/);
for (const image of ["/opengraph-image", "/twitter-image"]) {
  const response = await fetch(base + image);
  assert.equal(response.status, 200, image);
  assert.match(response.headers.get("content-type"), /image\/png/);
}
console.log("PASS sitemap, robots, 404, résumé, Open Graph and Twitter images");
