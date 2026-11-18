# Integrated résumé preview

The portfolio homepage includes section 04, Résumé, between Approach and Contact. Contact is section 05. The separate Experience and Capabilities sections were removed to reduce repetition of the document's content. Header, mobile menu, side navigation, and command search link directly to the résumé.

## Exact file mapping

- **Display only:** the supplied `/Users/bharath/Downloads/Narasimha_Charyulu_K_P_.pdf` was copied byte-for-byte into `public/resume-preview/narasimha-preview.pdf`.
- **Download:** all download actions retain `/Kanjarla-Narasimha-Charyulu-Resume.pdf`. That existing file was not modified.
- The thumbnail is rendered from the actual display PDF with Poppler. It provides an immediate image while the PDF renderer is being loaded, and a graceful fallback when JavaScript is unavailable.

The source PDF is one A4 page and was visually inspected before integration. Its content was not edited.

## Experience

The PDF is the central content of the section, displayed at up to 720px wide on desktop (29% wider than the previous 560px preview), preserving its A4 proportions and selectable text directly in the inline preview. A pencil on the left and smaller headphones on the right provide a restrained physical desk composition, using the portfolio's ivory/forest palette. At tablet widths the headphones disappear to give the page more space. The previous summary column, descriptive metadata, extra caption copy, and click overlay were removed to avoid competing with the document itself.

Only Read full-size and Download résumé appear beneath the page. Read full-size opens a native dialog with a larger live PDF, a full-size reading link, and the same existing download action. Escape closes the dialog and returns focus without scrolling away from the section. Background scrolling is locked while reading. The floating utility dock is hidden while this section is active so it does not obscure the enlarged document.

Mobile gives almost the entire panel width to the PDF, hides the headphones and retains only a subtle pencil. No studio mode switch, color controls, upload control, or zoom toolbar is added to the homepage.

The PDF engine is dynamically imported only as the section approaches the viewport. The thumbnail has a reserved aspect ratio and is rendered in the server HTML. The homepage's professional content, metadata, and existing résumé downloads remain available without JavaScript. The standalone `/resume-studio` sample is retained.

## Implementation

- `components/resume-preview.jsx`: near-viewport loading, shared PDF renderer, native reader dialog, focus handling and fallback poster.
- `app/resume-preview.css`: scoped showcase, responsive composition and reading-dialog styling.
- `lib/content.js`: separate `resumePreview` and `resume` constants prevent accidental replacement of the download.
- `components/resume-studio/pdf-document.jsx`: reusable rendering options; the studio's existing defaults are preserved.
- `scripts/verify-resume-preview.mjs`: exact file fingerprints, server-rendered placement, original download actions, public PDF bytes and poster response checks.

## Checks

The source and copied preview matched byte-for-byte. The original download SHA-256 remained `e3f08d6371699fc22b60524925570d154d512ef64a27edef97882d6939ae503b`. The preview SHA-256 is `42d05c941c28f07a0bc154c393f6449ceadca30518e7ae189e30ebbdd8b3ffc2`.

Browser review covered the approach-to-résumé and résumé-to-contact scrolling transitions, 720px desktop document, 850px tablet viewport, 390px and 320px phone viewports without horizontal overflow, live PDF rendering, readable dialog, selectable text layer, close-button focus, Escape/focus return, body-scroll restoration and original download targets. A fresh top-of-page visit had no résumé PDF canvas until approaching the section.
