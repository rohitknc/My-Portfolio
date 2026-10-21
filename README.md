# KNC Portfolio — Project Spotlights, Refined Header Sound Control (v12)

Responsive React portfolio for Kanjarla Narasimha Charyulu. The downloadable resume in `public/Kanjarla-Narasimha-Charyulu-Resume.pdf` is the exact PDF supplied by the owner.

## Stack

- React 19 and Vite 8
- Material UI 7
- Motion for React for case-study interactions and restrained reveal motion
- CSS-only water-light caustics, flowing rays, drifting particles, bubbles and pointer-following glow
- Locally bundled 54-second single-note ambient track, with no chords, percussion or water noise

## What's new in v12

- Replaced the oversized header sound control and boxed status badge with a compact circular waveform button, aligned to the Resume button. Sound state is conveyed by a small dot and accessible tooltip, not a floating label below the icon.
- Reduced the visual pulse and glow so the header looks calm and professional.
- Improved header spacing and responsive sizing for narrow screens to avoid cramped navigation.
- Increased the visibility and balance of the KNC monogram.

## Earlier changes in v11

- Moved music control into the top navigation as a compact circular waveform icon with a small `SOUND ON/OFF` label, inspired by the supplied reference screenshot.
- Removed the fixed bottom-right sound panel.
- Replaced the old `K.` avatar with a custom `KNC` monogram mark using a cyan-to-violet gradient and restrained highlight.
- Replaced the track with a quieter 54-second sequence of soft, isolated notes. No chord stacks, drum sounds or ocean noise are used.
- Playback starts after the visitor's first meaningful interaction because browsers generally block unsolicited autoplay. The sound icon lets the visitor toggle ambience at any time.
- Kept the water layers CSS-driven to avoid reintroducing full-screen canvas redraws and flicker.
- Preserved the project-specific case-study visuals, complete skill catalog, portrait and downloadable resume.

## Run on Windows PowerShell

```powershell
npm install
npm start
```

Open the local URL printed by Vite (normally `http://localhost:5173`). For production verification:

```powershell
npm run build
npm run preview
```

Use Node.js 20.19+ or 22.12+ for Vite 8.

## Included

- Dark navy/cyan portfolio UI, complete portrait, exact supplied resume PDF, four resume-based project case studies, experience, skills, education and contact sections.
- Responsive navigation, header sound control, downloadable resume, accessible case-study dialog and reduced-motion support.

## Content integrity

Project details and reported metrics come from the supplied resume versions. Verify metric accuracy and project confidentiality before public deployment. A complete LinkedIn URL was not present in the supplied resume, so no LinkedIn URL has been invented.

## Verification

The JSX source was checked with TypeScript's JSX transpiler, CSS braces were validated, the supplied resume was copied byte-for-byte to `public`, the ambient MP3 was probed as a 54-second stereo track, and the ZIP archive was integrity-tested. A full dependency build still requires a working npm registry; run `npm install` and `npm run build` locally before deployment.


## V13 responsive alignment update

- Normalized project cards into a consistent vertical layout with matching visual-panel heights and aligned project detail / technology sections on desktop.
- Updated cards and diagrams to use min-width-safe grids, text wrapping, and mobile-specific layouts.
- Improved alignment and wrapping across capability cards, experience timeline, education, contact actions, proof metrics, and modal.
- Adjusted spacing for small phones (including <=370px viewports) and reduced hover transforms on touch devices.
- Added class hooks for project title, summary, contribution copy, and technology-tag stack to coordinate card baselines.

Run locally with `npm install` then `npm start`. The production build should be checked locally because package registry access was unavailable during this editing session.
