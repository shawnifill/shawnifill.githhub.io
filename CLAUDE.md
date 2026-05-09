# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Static personal site for Shawn Ifill — a single-page resume rendered from `index.html`, `styles.css`, `script.js`. No build step, no package manager, no test suite, zero runtime dependencies. Deploys to GitHub Pages from the `shawnifill/shawnifill` remote.

The content here mirrors `../resume.md` in the parent `Resume/` workspace — that file is the source of truth for resume copy. The framing rules in `../CLAUDE.md` (Shardeum = contributor, Game of Silks = key contributor, MightyText omits election app, PodClips omits NLP, AI tooling unnamed, no port numbers) apply to this site too.

## Local Development

Open `index.html` directly in a browser, or serve the directory:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

No linter, formatter, or test runner is configured. Verify changes by loading the page and exercising:

1. Theme toggle (top-right) — confirm persistence across reloads.
2. Hero stat counters — animate on first scroll into view.
3. Section reveal animations — `.reveal` → `.visible` transitions as you scroll.
4. Anchor nav (`#about`, `#experience`, `#skills`, `#contact`) — smooth-scroll with 80px scroll-padding.

## Architecture

Three files, tightly coupled by convention:

| File | Role |
|------|------|
| `index.html` | All content. Structure, copy, and the stat values themselves live here. |
| `styles.css` | Theme tokens via CSS custom properties on `:root` and `[data-theme="light"]`. Job-card accent colors are keyed off `data-accent` attributes (`violet`, `amber`, `cyan`, `emerald`). |
| `script.js` | Single IIFE. Theme toggle (localStorage `theme` key), scroll-triggered counter animation, IntersectionObserver-driven reveals, footer year stamp. |

Hooks the JS depends on — do not rename without updating `script.js`:

- `#themeToggle`, `#year` IDs
- `[data-count]` on hero stat numbers (the integer in this attribute is the count target)
- `.nav`, `.hero-stats` classes
- The reveal target list: `.section, .job-card, .skill-card, .contact-link, .hero-stats, .about-points li`

Theme defaults to dark. The `data-theme` attribute on `<html>` is set inline in markup and overwritten by `script.js` based on stored preference or `prefers-color-scheme`.

## Updating Resume Content

When `../resume.md` changes, update `index.html` here to match — copy in the job bullets, chips, and the four hero stat values (`data-count` attributes). Keep the same framing rules from `../CLAUDE.md`.
