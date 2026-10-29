# Software Studio - landing page (Paper & Ink, burgundy accent)

Single-page marketing site: plain HTML / CSS / JS. No build step, no dependencies.

- Tagline: Software Studio: responsive, beautiful mobile apps and websites
- Hero: we design, build, and host your mobile apps and websites for you.
- Sections: hero + keyword strip, case studies (reserved), 5-step process, contact form, footer

## Files
```
index.html      page structure
styles.css      design tokens + mobile-first styles (breakpoints 576px / 768px)
main.js         nav toggle, scroll reveal, form -> mailto handoff
assets/         favicon
```

## Known interim choices
- Placeholders removed on purpose: case studies row is an empty reserved slot; real client work to be added.
- Contact form composes a `mailto:` draft (no backend yet). Swap to Web3Forms / Netlify Forms when the receiver decision is made.
- `software.studio` wordmark and `hello@software.studio` email are placeholders pending final brand + domain.

## Local preview
Open `index.html` directly, or:
```
python -m http.server 8080
# http://localhost:8080
```

## Deploy
GitHub Pages serves this repo from the `main` branch root:
```
https://<owner>.github.io/software-studio/
```
Pushes to `main` publish automatically.
