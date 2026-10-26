# Local Setup Guide (Beginner Friendly)

1. **Install Node.js** (version 18 or newer): download the LTS version from https://nodejs.org and run the installer. Check with `node -v` and `npm -v` in a terminal.
2. **Extract the ZIP:** right-click `Neeraj_Portfolio_React.zip` → Extract All. You get a folder `Neeraj_Portfolio_React`.
3. **Open in VS Code:** File → Open Folder → choose `Neeraj_Portfolio_React`. Open the terminal with Ctrl+` .
4. **Install dependencies:** `npm install`
5. **Run the dev server:** `npm run dev`, then open http://localhost:5173
6. **Build for production:** `npm run build` (output in `dist/`). Preview it with `npm run preview`.
7. **Add your photo:** save it as `public/images/profile.jpg`.
8. **Edit content:** `src/data/portfolio.ts`.

**Troubleshooting**
- `npm` not found: reinstall Node.js and restart VS Code.
- Port in use: run `npm run dev -- --port 3000`.
- Fonts look different offline: fonts load from Google Fonts; fallbacks (Georgia, system-ui) are used offline.
