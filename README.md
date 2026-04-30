# Soluna 2.0 Prototype

Low-fidelity Apple-like case-study demo for the Soluna 2.0 redesign.

## Run Locally

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite.

Use Node `20.19.0` or newer. Dependencies are pinned in `package.json` and `package-lock.json` so local, CI, and Vercel builds stay reproducible.

## What This Demo Contains

- Three case-study chapters: Trust, Community Engagement, and Design Accessibility.
- Manual Before / After toggle outside the phone frame.
- Before mode uses replacement video slots at `/videos/trust-before.mp4`, `/videos/community-before.mp4`, and `/videos/accessibility-before.mp4`.
- After mode runs an interactive front-end-only phone prototype.
- All images are visible replacement slots labeled `Replace with actual image`.
- All state is mocked in the browser.

## Verification

```bash
npm run verify
```

`npm run verify` runs unit tests, the production build, and Playwright e2e coverage. GitHub Actions runs the same command on pushes and pull requests to `main`.

## Deployment

- GitHub repo: `bulujamJudy/soluna-prototype`
- Production branch: `main`
- Vercel project slug: `soluna-prototype`
- Production URL: `https://soluna-prototype.vercel.app`

Vercel is deployed manually for now. To enable automatic deploys, add a GitHub Login Connection in Vercel, then link this repository to the existing `soluna-prototype` project.

## Content Replacement

Edit `src/data/features.ts` for case-study narrative copy and before video paths.
Edit `src/data/mockContent.ts` for coaches, posts, poll content, articles, resources, sessions, and profile rows.
