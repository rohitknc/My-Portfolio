# Narasimha Charyulu — Portfolio

A Next.js App Router portfolio for **Kanjarla Narasimha Charyulu**, the original portfolio owner and the user's friend. All biographical information, portraits, résumé files, project descriptions, and reported metrics belong to Narasimha, not the person requesting these changes.

## Run

Use Node.js 22.13 or later.

```sh
npm install
npm run dev
```

Production:

```sh
npm run build
npm start
npm run verify # while the production server is running
```

## Architecture

- Next.js 16, React 19, stable React Compiler.
- Server Components for page content and metadata; small client components for filtering, navigation, search, clipboard, and audio.
- Project data and complete skill catalog: `lib/content.js`.
- Four statically generated case-study URLs under `/work`.
- Locally hosted, preloaded DM Sans and Instrument Serif fonts via next/font, with adjusted fallbacks; optimized `next/image` portrait.
- Native accessible dialog, Cmd/Ctrl+K search, keyboard result navigation, mobile navigation, a single ivory/forest/copper theme, project filters with React transitions, native skills disclosures, opt-in audio, clipboard feedback, reduced-motion and print styles.
- Interactive four-system architecture walkthrough with stage selection, local playback, and example payload views.
- Featured/reversed project layouts, grid/list switch, accessible quick-view dialogs with focus return, section navigation and scroll progress, Hyderabad local clock, portrait hover depth, and email topic selection.
- No external contact-form service or fabricated project screenshots. Architecture illustrations are labeled conceptual.

## SEO and deployment

Deploy as a Next.js project (for example, on Vercel). Set `NEXT_PUBLIC_SITE_URL` to the final canonical HTTPS domain **before building**. Its default preserves the domain from the original sitemap. This value controls canonical URLs, sitemap entries, structured data and social metadata.

The site includes pre-rendered meaningful HTML, route-specific titles/descriptions and canonical links, Person JSON-LD, an automatically generated social preview, sitemap and robots routes, descriptive image alternatives, and a custom 404. SEO foundations do not guarantee search ranking.

Both original PDFs are retained; all active résumé buttons consistently use `/Kanjarla-Narasimha-Charyulu-Resume.pdf`. The old Vite source is archived in `docs/legacy-vite-src` with the former stylesheet and entry files in `docs/`; it is not used by Next.js.

See `docs/design-research.md` for references and design decisions. No public deployment or Git push is performed by the migration itself.

Production builds use Next.js’s supported Webpack backend because Turbopack stalled on this local filesystem. The default dev server continues to use Turbopack.

## Standalone PDF preview sample

Open `/resume-studio` for Paper / Studio: a reference-inspired desk scene with a real two-page PDF, selectable text, page controls, zoom, local PDF selection and downloads. See `docs/resume-studio.md` for architecture, generation and privacy details. The fictional sample is separate from Narasimha’s professional content.
