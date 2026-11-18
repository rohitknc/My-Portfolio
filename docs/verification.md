# Verification — 18 November 2026

Content owner: Kanjarla Narasimha Charyulu, the user's friend.

## Production checks

- `npm run build`: Next.js production build with the supported Webpack backend. Homepage, work archive, four case studies, sitemap, robots, icon, and social images pre-rendered.
- `npm run verify`: six pages checked for server-rendered headings/content, unique titles, descriptions, canonical URLs, homepage Person JSON-LD, updated portrait reference and architecture content. Also checks sitemap, robots, generic/case-study 404s, résumé PDF, Open Graph image and Twitter image.
- `git diff --check`.
- The supplied profile image and active portrait asset were compared byte-for-byte.

## Browser checks

- Desktop and 390px/320px phone compositions inspected; no horizontal page overflow in measured phone views.
- Four-stage AI/MCP walkthrough completed; completion status and replay control verified. Switching system and viewing example payload JSON verified.
- Grid/list switch and category filter verified together.
- Project quick view opened with close-button focus; Escape closed it and returned focus to its trigger.
- Mobile menu opened; selecting Experience closed it and navigated to the section.
- Contact topic selection changed the prepared email subject to AI integrations. No email was sent. Launching the external email app was not tested; browser policy blocked that navigation.
- Client runtime error log was empty during the tested flows.

The theme toggle was intentionally removed. Reduced-motion and print styles remain. Fonts use Next.js local font preloading with adjusted fallbacks; no third-party font requests are needed. No Lighthouse score, full assistive-technology audit, or search ranking is claimed. Clipboard copying is implemented but was not exercised to avoid replacing the user's clipboard during the review.

Set NEXT_PUBLIC_SITE_URL to the final canonical domain before deployment. This work is local; no Git push or public deployment was performed. The existing development server on port 3000 was preserved; a separate owned production preview was used on port 3001.
