# Paper / Studio

A separate React sample at `/resume-studio`, inspired by the user's supplied desk-scene reference. It lives in the Next.js project without replacing Narasimha's portfolio. The original portfolio's content belongs to Narasimha; the sample résumé and cover letter use the fictional Alex Morgan identity.

## Run

```sh
npm install
npm run dev
```

Open `http://127.0.0.1:3000/resume-studio`.

```sh
npm run build
npm start
```

Node.js 22.13+ is required by React-PDF 11. The postinstall and prebuild steps prepare matching PDF.js character maps, standard fonts, and WebAssembly codecs from the installed package. These generated dependency assets are ignored in Git and recreated automatically.

## What is real

- `public/resume-studio/alex-morgan-resume.pdf` is the actual two-page A4 PDF displayed and downloaded by the viewer, not a background screenshot.
- React-PDF 11 uses its matching PDF.js worker, bundled locally. Canvas, text, and annotation layers are rendered directly from the PDF. The text can be selected.
- The pencil, headphones, cable, surfaces, shadows, and typography are React SVG/CSS/HTML. The entire reference screenshot is never used as the page background.
- Page navigation, keyboard navigation, zoom, fit/reset, scene/reading modes, surface swatches, fullscreen where supported, drag-and-drop, local file selection, PDF validation, and original-file downloads are implemented.
- Files selected with the chooser are read via a browser object URL, not uploaded to a server. Only the filename and PDF bytes are used locally. This project adds no upload API or external document service. Object URLs, observers, and listeners are cleaned up.
- Local file size limit: 30 MB. Invalid, damaged, or password-protected PDFs produce a visible error. Password entry and document editing are outside this sample's scope.
- Reduced-motion support disables decorative tilt and animation. Mobile uses an uncluttered document-first layout.

## Implementation

- `app/resume-studio/page.jsx`: route-specific metadata. The fictional sample is intentionally noindex and is not added to the professional portfolio sitemap.
- `components/resume-studio/studio.jsx`: responsive scene, controls, error boundary, dynamic PDF import, Suspense, transition-based paging, ResizeObserver-based canvas sizing, local file handling, object-URL lifecycle and keyboard controls.
- `components/resume-studio/pdf-document.jsx`: the real PDF viewer and matching worker configuration.
- `components/resume-studio/desk-objects.jsx`: original scalable desk objects, including layered gradients, leather texture, cable paths and cast shadows.
- `components/site-frame.jsx`: route-aware portfolio chrome; the standalone sample does not display portfolio navigation or footer.
- `scripts/create-studio-pdf.py`: reproducible ReportLab PDF generator. Uses Arial fonts from macOS. Regeneration requires Python with ReportLab; normal Node builds use the already committed PDF and require no Python.
- `scripts/prepare-pdf-assets.mjs`: selects assets from React-PDF's resolved PDF.js package to prevent worker-version mismatches.

## Original portrait asset

Saved in this project at `public/resume-studio/sample-portrait.png`. Generated with the built-in ImageGen tool; not an image of Narasimha or a claim about a real person. Original prompt:

> Generate one square photographic headshot asset for a fictional sample resume, not a real identifiable person. A fictional male graphic designer in his early 30s, short styled dark brown hair, light stubble, navy textured shirt, neutral dark charcoal studio background, head and shoulders in frame, face turned slightly to the right, soft natural studio lighting, editorial professional portrait, realistic fine detail. No text, logos, borders, documents or layout. This image will be small and circular on a resume.

## Technical reference

Official React-PDF documentation: https://github.com/wojtekmaj/react-pdf — worker configuration, Next.js client-only import, Suspense, text/annotation layers and matching PDF.js versions.

## Verification completed

- Production build passed with the new route pre-rendered.
- `npm run verify:studio` passed: route, independent title/noindex metadata, omitted portfolio chrome, byte-identical PDF download, matching local worker, character maps, fonts and codecs.
- Existing `npm run verify` passed for all six portfolio pages and their SEO/public assets.
- PDF checked with Poppler and pypdf: two A4 pages; résumé and cover-letter content; generated output identical to the public viewer file. Rendered pages visually inspected; text-spacing overflow corrected.
- Browser checked real canvas rendering and 101 selectable text spans. The cover letter rendered on page two. Zoom re-rendered at a new canvas width; final canvas uses 2x resolution.
- Reading mode, scene mode, desk surface swatches, local file selection, invalid-file rejection, and restoring the sample passed.
- Mobile checked at 390px and 320px. The outer page did not overflow; zoomed PDF content scrolls within the viewer.
- Fullscreen is unavailable in the test browser; its visible reading-mode fallback was verified. A successful native fullscreen transition is not claimed.
- Client runtime error log was empty in the final production review. The existing development preview on port 3000 also rendered the actual PDF successfully.
- No public deployment or Git push was performed. The temporary production preview on port 3001 was stopped; the existing development server was preserved.

Preview artifact: `/Users/bharath/.codex/visualizations/2026/11/18/01a1ed72-4b7d-7d03-a902-2c6bfebf9e33/paper-studio-desktop.jpg`.

## Compact desktop layout refinement

The desktop scene now uses a viewport-aware landscape composition instead of a fixed 4:3 stage. Its width is capped by available window height, the paper remains proportional, and the pencil, headphones, and title are positioned higher. Supporting type scales with the scene container. Reading mode keeps its larger document view, and the existing mobile document-first layout remains fluid.

Browser checks at 1280x720 measured a 540px scene and 748px document height, with the complete résumé, headphones, title, and controls visible together. A taller 1440x1000 composition was also inspected, and the 390px mobile paper retained its 335px width without outer horizontal overflow. The production build passed after the CSS update.
