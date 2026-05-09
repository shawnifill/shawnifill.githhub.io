# shawnifill.github.io

Personal site for Shawn Ifill — single-page resume. Static HTML/CSS/JS, no build step, no dependencies. Deploys to GitHub Pages from the `shawnifill/shawnifill` remote.

## Stack

| File | Role |
|------|------|
| `index.html` | Content, structure, copy, hero stat values (`data-count`) |
| `styles.css` | Theme tokens via CSS custom properties; job-card accents keyed by `data-accent` (`violet`, `amber`, `cyan`, `emerald`) |
| `script.js` | IIFE — theme toggle (localStorage `theme`), animated stat counters, `IntersectionObserver` reveals, footer year |

## Local Development

Open `index.html` directly, or serve the directory:

```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

No linter, formatter, or test runner. Verify changes by exercising:

1. Theme toggle (top-right) — persistence across reloads
2. Hero stat counters — animate on first scroll into view
3. Section reveals — `.reveal` → `.visible` on scroll
4. Anchor nav (`#about`, `#experience`, `#skills`, `#contact`) — smooth-scroll with 80px scroll-padding

## Deployment

Pushes to `main` on the `shawnifill/shawnifill` GitHub remote publish via GitHub Pages.
