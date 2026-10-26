# Neeraj Kumar – Portfolio (React + Vite + TypeScript + Tailwind)

Premium red-and-black portfolio for a frontend web developer (React.js & WordPress).

## Quick start
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
npm run preview  # preview the build
```

## Customize
- **Your photo:** save it as `public/images/profile.jpg` (portrait, about 4:5, under 300 KB). It replaces the placeholder automatically.
- **All text, links and projects:** `src/data/portfolio.ts`
- **Colors and fonts:** `tailwind.config.js` (`crimson`, `ink`, `oxblood`) and `index.html` (Google Fonts)
- **Project screenshots:** none were supplied, so cards use a designed browser-frame visual.

## Contact form
No backend is configured. The form opens the visitor's email app with the message pre-filled (`mailto:`). To send directly from the site, add Formspree, EmailJS or Web3Forms and call it from `src/sections/Contact.tsx`.

## Structure
```
src/components/   Navbar, Footer, ProjectCard, SectionHeading
src/components/ui Button, Reveal (shadcn-style folder, @/components/ui)
src/sections/     Hero, About, Skills, Projects, Services, Experience, Contact
src/data/         portfolio.ts (all content)
src/styles/       index.css (Tailwind + global styles)
```

## Deploy
Push to GitHub and import the repo in Vercel (framework: Vite, build `npm run build`, output `dist`).
