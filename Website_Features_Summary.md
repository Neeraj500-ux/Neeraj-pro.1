# Website Features Summary

## Sections
Hero (full-screen), About, Skills & Tools, Selected Work (8 React, 14 WordPress, 4 practice projects plus 4 extra React links), Services, Experience, Education, Contact, Footer. Every item comes from the supplied resume; nothing was invented.

## Design
- Red-and-black theme: ink black, oxblood, crimson and ember glow.
- Hero follows the supplied screenshots: glowing red arc, glass pill navigation, status badge, serif headline.
- Typography: Fraunces (serif display) with Manrope (body).
- Portrait in an arched frame with red glow; placeholder until you add `public/images/profile.jpg`.

## Features
- Sticky glass navigation with active-section highlighting and a full-screen mobile menu (Esc closes it).
- Project filter tabs (React / WordPress / Practice / All) with animated transitions and a show-all toggle.
- Project cards with technologies and live-site links (including the Team Lead panel link).
- Contact details with working mailto, tel, GitHub and LinkedIn links; contact form opens the visitor's email app (no backend configured).
- Accessibility: skip link, keyboard focus rings, labelled form fields, ARIA tabs, reduced-motion support.
- SEO: title, meta description, Open Graph tags, robots.txt, semantic HTML.
- Responsive from phones to desktops.

## Technology
React 18, TypeScript, Vite 5, Tailwind CSS 3, Framer Motion, lucide-react. shadcn-style structure (`@/components/ui`, `components.json`).

## Notes
- The two supplied hero components (tunnel hero, scroll-locked video hero) were not used: the video one locks page scrolling for good, and both depend on unrelated stock media.
- Project cards use designed visuals instead of screenshots because none were supplied.
