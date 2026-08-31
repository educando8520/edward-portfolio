# Edward Benavides — Network & Telecom Engineer

Personal portfolio of **Edward Antonio Benavides Trujillo**, Network & Telecommunications Engineer.
A premium, interactive experience themed around Cloud Computing, Network Engineering,
RF & Wireless Systems and Telecommunications.

## Tech

- React + Vite (JavaScript)
- Framer Motion (animations)
- React Three Fiber + Three.js (3D hero network sphere, lazy-loaded)
- Lucide Icons
- Modern CSS (custom design system, glassmorphism, grid, glow)

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173/

## Build

```bash
npm run build
npm run preview
```

## Deploy

Deployment is automatic via GitHub Actions (`.github/workflows/deploy.yml`).
Every push to `main` builds and publishes to GitHub Pages at
`https://<user>.github.io/edward-portfolio/`.

## Project structure

```
src/
  components/   reusable UI + NetworkSphere (R3F)
  sections/     Hero, About, Cloud, Networking, FeaturedProject, TechStack, Projects, Timeline, Terminal, Contact
  animations/   shared Framer Motion variants
  data/         all content (edit here to personalize)
  hooks/        scroll reveal / progress
  styles/       design tokens + global CSS
```

Personalize content (links, copy) in `src/data/content.js`.
