# од понеделник. — Мајстор за секоја мака.

A Macedonian home-services directory inspired by 1960s–1970s Macedonian/Yugoslav print: warm paper, vermilion, ultramarine, mustard, original illustrated artwork, Roboto Slab and Golos Text. The reference covers informed the art direction; their images are not redistributed.

**Live website:** https://alekspasseo.github.io/odponedelnik/

## Scope

- Скопски and Кривопаланечки service areas.
- 10 services, 2 subservices each: **20 distinct subservices** available in both regions.
- **100 fictional personas**, five for each region/service pair. Every service and subservice page displays five personas by default. The two subservices share their category's five specialists; prices adapt to the selected subservice.
- 65 fully rendered HTML pages, plus a custom 404. Of these, 60 are service/subservice listing pages.
- Search in Macedonian Cyrillic or Latin transliteration, region switching, price/rating/name sorting, profile dialogs with shareable links, browser-local saved profiles, mobile navigation and FAQs.
- No runtime packages, backend, account, analytics, booking or external font requests.

All names, ratings, experience and prices are explicitly marked as fictional demo data. Prices are illustrative labor-only ranges per labeled unit, not market quotations. No fake phone numbers, endorsements, reviews, verification claims or LocalBusiness/AggregateRating structured data are published. The demo has `noindex,follow` on every page.

## Run and build

Requires Node.js 20 or newer. No dependency installation is necessary.

```sh
npm run build
npm test
npm start
```

Local preview: http://127.0.0.1:4188/odponedelnik/

The build writes `docs/`, which is committed for GitHub Pages. After editing, rerun the build and tests, then commit both source and `docs/`.

## Files

- `src/data.mjs`: regions, services, subservices and deterministic fictional personas.
- `src/templates.mjs`: fully rendered Macedonian pages and metadata.
- `src/ui.mjs`: shared cards and tool icons.
- `public/app.mjs`: search, sorting, favorites and profile dialogs.
- `public/styles.css`: responsive visual system.
- `public/assets/`: local fonts, font licenses, favicon and original artwork.
- `scripts/build.mjs`: static HTML generation, sitemap and route manifest.
- `tests/catalog.test.mjs`: launch scope, five-person coverage, transliteration and route/asset integrity.

## GitHub Pages

Repository Settings → Pages → Deploy from a branch → `main` → `/docs`.

Default URLs:

```text
/odponedelnik/skopski/vodovod/
/odponedelnik/skopski/vodovod/odzatnuvanje-odvodi/
/odponedelnik/krivopalanecki/moleraj/bojadisuvanje-dzidovi/
```

For a future confirmed custom domain `odponedelnik.com`, rebuild with `BASE_PATH` empty and `SITE_ORIGIN=https://odponedelnik.com`. The resulting paths are `/skopski/vodovod/odzatnuvanje-odvodi/`, etc. Configure GitHub Pages custom domain and DNS only after confirming domain ownership. No CNAME or DNS changes are included in this demo.

PowerShell custom-domain build example:

```powershell
$env:BASE_PATH = ''
$env:SITE_ORIGIN = 'https://odponedelnik.com'
node scripts/build.mjs
```

Before admitting real providers, replace the demo personas with consented, verified records; establish review and ranking rules; confirm contact details and pricing units; then review indexing and add appropriate structured data. Do not remove demo labels while fictional records remain.

## Privacy

Favorites use only the `odponedelnik.saved.v1` localStorage key. They stay in the visitor's browser and do not sync to a server. Storage-disabled browsers receive an explicit temporary-session notice. GitHub Pages may process normal hosting request logs under GitHub's privacy policy.

## Typography and artwork

Roboto Slab (Apache 2.0) and Golos Text (SIL OFL) are self-hosted. License files are in `public/assets/fonts/`. Sources: [Roboto Slab](https://github.com/google/fonts/tree/main/apache/robotoslab), [Golos Text](https://github.com/googlefonts/golos-text).

Original hero artwork was created for this project using the built-in image generation tool. The production asset is `public/assets/majstori.webp`; the original is `public/assets/majstori.png`. Generation prompt: see `ARTWORK.md`. No blanket license is asserted over third-party font assets.
