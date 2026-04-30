# Soluna 2.0 Prototype

Low-fidelity Apple-like case-study demo for the Soluna 2.0 redesign.

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## What This Demo Contains

- Three case-study chapters: Trust, Community Engagement, and Design Accessibility.
- Manual Before / After toggle outside the phone frame.
- Before mode uses replacement video slots at `/videos/trust-before.mp4`, `/videos/community-before.mp4`, and `/videos/accessibility-before.mp4`.
- After mode runs an interactive front-end-only phone prototype.
- All images are visible replacement slots labeled `Replace with actual image`.
- All state is mocked in the browser.

## Verification

```bash
npm test
npm run build
npm run e2e
```

## Content Replacement

Edit `src/data/features.ts` for case-study narrative copy and before video paths.
Edit `src/data/mockContent.ts` for coaches, posts, poll content, articles, resources, sessions, and profile rows.
