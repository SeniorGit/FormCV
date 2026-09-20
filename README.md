# CV Generator

A frontend-only CV builder. Fill in a form, watch a real A4 preview update, then print or save it as a PDF with selectable text. There is no backend, no account and no network request: your data stays in your browser (`localStorage`).

Built with Vite + React. The only runtime dependencies are `react`, `react-dom` and two self-hosted font packages.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # static site in dist/ (relative paths, host it anywhere)
npm run preview   # serve the production build
npm run lint
```

## Using it

1. Edit **Personal Information** (name and email are the only required fields).
2. Turn optional sections on or off with **Include in CV**, reorder them with the arrows, and add or remove entries.
3. Pick a **Density** (10 / 10.5 / 11 pt) and an **Accent** colour above the preview.
4. **Print / Save as PDF**, then choose *Save as PDF* as the destination and leave headers/footers off.

The **Data** menu can load a sample, export the CV as a JSON file, import one back, or clear everything.

## What makes the CV ATS-friendly

- One column, normal document flow, real text. No tables, icons, images, canvas, SVG, sidebars, skill bars or ratings.
- Standard headings: Professional Summary, Work Experience, Education, Skills, Projects, Certifications, Awards, Organizations.
- Semantic HTML: `h1` name, `h2` sections, `h3` entries, `ul/li` bullets, `time` for dates, real `mailto:`/`tel:`/`https:` links.
- No letter-spaced headings (extractors turn them into `P R O F E S S I O N A L`) and bullets are text markers, not vector shapes. Both were verified by extracting text from the generated PDF.
- Ligatures are disabled so `fi`/`fl` stay separate letters.

## How the A4 pages work

Pages are real `210 × 297 mm` boxes with `@page { size: A4; margin: 0 }`.

Browsers only apply `@page` margins at the sides of the paper, so a single long element would have no top margin on page 2. Instead the CV is split into unbreakable blocks (header, section heading, each entry), measured once in a hidden copy, and assigned to pages by `src/utils/paginate.js`. Each page is then an ordinary `div` with its own padding. The DOM you see in the preview is exactly the DOM the browser prints. A section heading never ends a page on its own, and an entry never splits across pages.

## Project structure

```text
index.html
vite.config.js
public/favicon.svg
src/
  main.jsx                     entry point, fonts, stylesheets
  App.jsx                      layout, print/import/reset actions, validation gate
  data/
    sections.js                schema: every section, field, label and hint (single source of truth)
    defaultResume.js           blank + sample resume factories
  hooks/useResume.js           reducer + debounced localStorage autosave
  utils/
    format.js                  dates, URLs, text → bullets, small helpers
    validation.js              email / URL / phone / date-order rules
    sanitize.js                makes imported or stored data safe and complete
    storage.js  export.js      localStorage, print, JSON download/upload
    paginate.js                pure page-assignment function
  components/
    Toolbar.jsx  Editor.jsx  SectionCard.jsx  RepeatableSection.jsx  Field.jsx  formContext.js
    PreviewPane.jsx            appearance controls + scaled A4 viewport
    ResumePreview.jsx          measures blocks, renders pages
    resumeBlocks.jsx           resume data → blocks   resumeParts.jsx  presentational pieces
  styles/  base.css (tokens)  editor.css (workspace)  resume.css (the document + print rules)
```

The editor form, validation, storage sanitising and blank-entry factory are all generated from `src/data/sections.js`. To add a field, add it there and render it in `resumeBlocks.jsx`.

## Notes

- Validation blocks printing only for things that are objectively wrong: missing name or email, malformed email/URL/phone/dates, an end date before its start date, or an entry with content but no title. Everything else stays optional.
- Dates use `YYYY-MM` (native month picker; browsers without one show a text box) and are shown as `Mar 2024`.
- The preview is scaled to fit its pane with a CSS transform; the pages keep their real size, and the scale never affects pagination.
- Body text is never below 10 pt. Use *Compact* density rather than shrinking type to save space.
