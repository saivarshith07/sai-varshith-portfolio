# Sai Varshith, Portfolio

A React + Vite single-page portfolio. Dark/light themes, scroll-linked motion,
content driven from one data file.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the built output
```

## Where things live

```
src/data/content.ts      <- ALL copy, projects, stats and links. Edit this first.
src/components/          <- one file per section
src/index.css            <- design tokens (colours, fonts) for both themes
public/                  <- resume PDF, and profile.jpg if you add one
                            (then set `photo: 'profile.jpg'` in content.ts)
```

To change anything on the page (a project, a number, a link), edit
`src/data/content.ts`. The components read from it and nothing is hardcoded
in the markup.

### Adding a project

Append to the `projects` array in `src/data/content.ts`:

- `kind: 'product'` shows under **Work at Vyapar**
- `kind: 'open-source'` shows under **Personal projects**, with a source link
- `featured: true` renders as a wide hero card (use sparingly, two is plenty)
- `metric` is the big number that counts up when it scrolls into view

## Deploy

The build uses a relative base path, so `dist/` works on any static host
without configuration.

- **Netlify / Vercel**: build command `npm run build`, publish directory `dist`
- **GitHub Pages**: push `dist/` to the `gh-pages` branch, or add an Actions
  workflow that runs the build and uploads `dist` as the Pages artifact

The resume PDF is served from `public/`, so it stays available at
`<your-site>/Sai_Varshith_Pachipulusu_Resume.pdf` for application forms.
