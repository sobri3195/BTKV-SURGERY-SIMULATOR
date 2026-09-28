# BTKV Surgery Simulator

Frontend-only educational MVP for a fictional CABG learning exercise. Built with React, TypeScript, Vite, Tailwind CSS, and Lucide React.

## Run locally

```bash
npm install
npm run dev
```

Production check: `npm run build`. Preview with `npm run preview`.

## Deploy to Vercel

Import this repository in Vercel. The framework is detected as Vite; build command is `npm run build` and output directory is `dist`. `vercel.json` includes the SPA rewrite.

## Structure

- `src/data`: cases, anatomy content, steps, and scoring rules
- `src/hooks`: reducer-based procedure engine
- `src/components`: reusable simulator panels and interactive SVG
- `src/pages`: landing, selection, briefing, simulation, assessment, and review flows
- `src/types`: shared extensible simulation types

This application is educational only and does not provide instructions for real-world surgery.
