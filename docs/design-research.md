# Design research and implementation

Reviewed 18 November 2026. Content owner: Kanjarla Narasimha Charyulu.

## References

- https://maahir-garg.vercel.app/ — inspected live on desktop/mobile in this chat: editorial serif hierarchy, warm paper colors, physical photo composition, command navigation, content-first project archive. Adapted the editorial approach; did not reuse text, photography, or the teaching/red-pen persona.
- https://brittanychiang.com/ — reviewed live document: role-first introduction, accessible content structure, focused professional experience and project summaries. Applied clear hierarchy and a readable experience timeline.
- https://rauno.me/ — reviewed live document: concise presentation and deliberate interaction details. Applied small utility actions and clear feedback.
- https://www.awwwards.com/websites/portfolio/ — web fetch timed out; successfully reviewed the live browser gallery instead.
- https://www.awwwards.com/sites/preymaker — reviewed the live Awwwards entry, listed as Site of the Day on 14 November 2026. The entry highlights a works archive, case-study pages, menu interactions and transitions. Applied the separation of work browsing and deep project reading, and restrained interactive feedback. Did not copy the studio’s media or WebGL implementation.
- https://www.awwwards.com/sites/long-hoang-portfolio — reviewed the live nominee entry dated 17 November 2026. It highlights object interactions and microinteractions. Used this as a reminder to make interactive controls legible and responsive rather than introduce an unrelated 3D game.
- https://assets.awwwards.com/assets/files/live-presentation.pdf — typography, font pairing and layout as portfolio design considerations.

## Technical primary sources

- https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
- https://nextjs.org/docs/app/glossary
- https://react.dev/blog/2025/10/01/react-19-2
- https://react.dev/blog — stable React Compiler release.

Registry versions were verified before installation. Use server rendering, static generation, metadata APIs, compiler optimization, useEffectEvent for the global keyboard subscription, useDeferredValue for command filtering, and useTransition for project filtering. Avoid experimental routing/animation APIs and full-screen rendering effects that add complexity without helping visitors.

## Visual direction

Warm ivory, forest ink, rust accents, oversized Instrument Serif, practical DM Sans. An asymmetric hero pairs the owner's portrait with an explicit professional proposition. Original CSS system diagrams give enterprise projects visual specificity without pretending to be production screenshots. Project colors separate automation, people workflows, migration, and AI integration.

The complete skill inventory is preserved in native disclosures. Contact, navigation, PDF downloads and primary content work without client-side JavaScript. Search, filtering, audio, theme and copy-email progressively enhance the experience. Audio begins only with its explicit play control.

## Craft refinement

The second design pass uses one ivory/forest/copper theme. The visual system adds technical drawing corners, an original monogram, an arched portrait treatment using the newly supplied photo, compact metadata, a section rail and reading progress, and a rhythm of large/small/reversed project presentations.

Interactions now explain the work: four selectable project architecture walkthroughs with stage descriptions, locally simulated playback, and example JSON payloads. Project quick views offer contribution notes before navigating to a case study. Grid/list views support different reading preferences. Contact topic buttons prepare an email subject without submitting a form or connecting to a service. Header search, ambient audio, native disclosures, and progressive server-rendered content remain.

The decorative portrait tilt runs only for a fine pointer without reduced motion. It never changes the cursor or blocks navigation. Reduced-motion styles disable decorative animation. All project metrics remain attributed to the original résumé.
