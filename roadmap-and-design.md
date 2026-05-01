# The Lorebrary - Roadmap and Design

## 🎨 Design System
A full visual identity overhaul was applied on top of the existing SSG architecture. **No routing, data pipeline, or content logic was altered.**

**Tech decisions:**
*   **Fonts:** Google Fonts — `Cinzel` (display/headers, classical codex feel) + `Lora` (body/reading, premium book readability). Loaded via preconnect in `Layout.astro`.
*   **Color palette:** Custom `@theme` tokens in Tailwind v4 — `ink-*` (deep navy-black for dark mode), `cream-*` (warm parchment for light mode), `gold-*` (amber accent replacing all blue). Defined in `src/styles/global.css`.
*   **Prose:** `@tailwindcss/typography` overrides for Cinzel headings in gold, Lora body text, 1.95 line-height, decorative gradient HR rule.
*   **Interactive components:** `ReaderControls.tsx` FAB and `SearchBar.tsx` updated to match the ink/gold palette using hardcoded hex values (preserves existing `px`-based sizing that prevents layout scaling issues).

**Reader QoL features added:**
*   **Read-state tracking:** Visiting any `[range].astro` page auto-saves that chunk to `localStorage` (`distiller_read_*` key) and writes a progress record (`distiller_progress_*` key with timestamp, nextUrl, book/series metadata).
*   **Chunk grid checkmarks:** `[series]/[book]/index.astro` reads localStorage on load and adds gold checkmark badges to completed chapter range cards.
*   **Book progress bar:** Gold fill bar above the chunk grid showing "X of Y read." Hidden for first-time visitors; appears after reading the first section.
*   **Continue Reading strip:** `ContinueReading.tsx` React island on `/archive` reads all progress keys, sorts by recency, and surfaces up to 3 in-progress books above the series grid. Hidden for first-time visitors.
*   **Reading progress bar:** 3px gold bar fixed at top of viewport on reading pages, driven by scroll position. Pure vanilla JS.
*   **Keyboard navigation:** `←` / `→` arrow keys navigate prev/next chunk on reading pages. Ignored when focus is in an input element.
*   **Breadcrumb trail:** Reusable `Breadcrumb.astro` component renders the full path (`Archive → Series → Book → Ch. X`) on all sub-pages.
*   **Share / Copy Link button:** Inline button on reading pages copies the current URL to clipboard; flashes "Copied!" with a checkmark for 2 seconds.
*   **Sepia mode:** Third theme option (warm sepia) in `ReaderControls.tsx`. Implemented via CSS custom property overrides on `html.sepia` — no HTML changes needed. Cascades through all Tailwind utilities automatically.
*   **"Next Book" card:** Final chunk of each book displays a gold-bordered card linking to the next book in the series. Built from `bookOrder` data in frontmatter.
*   **Mega-Catchup (`/full` route):** Static route at `/{series}/{book}/full` renders all chunks in a single continuous scroll at build time. Includes floating chapter-jump nav (xl screens), reading progress bar, and chapter dividers. Added ~29 new static pages.
*   **Custom 404 page:** `404.astro` with large gold "404" display and "Return to Archive" CTA.
*   **Series blurbs:** 5-sentence editorial paragraphs for all 6 series displayed on series index pages, sourced from `series-metadata.ts`.

## 🚧 Current Status
The platform is live on Vercel (auto-deployed from GitHub `main`). Full design system, reader QoL features, series metadata with blurbs, Mega-Catchup pages, and legal disclaimers are all in place.

**Decisions Made:**
*   **CSS Strategy:** Keeping Tailwind CSS v4.
*   **Audio TTS Strategy:** The native Web Speech API voices are too robotic/inaccurate for sci-fi jargon. Any future audio integration will require pre-generated MP3s using a premium AI API (like Google Cloud Journey or ElevenLabs).
*   **Series metadata:** Intentionally a manual file (`series-metadata.ts`) — author names and blurbs are authored content that cannot be auto-derived. The workflow is documented above. This is the correct architectural decision.

## 🚀 Next Steps & Ideas for Future Enhancements

**Next Series to Add (Priority Order):**

### Tier 1 — Drop Everything, Read These Now

*   **A Court of Thorns and Roses (ACOTAR)** — Sarah J. Maas
    5 books. Book 6 drops October 2026, Hulu adaptation in development. SJM is arguably the biggest name in fantasy right now — the ACOTAR/Throne of Glass/Crescent City fandom is enormous. Highest-traffic series by far.
*   **Wheel of Time** — Robert Jordan (+ Brandon Sanderson)
    14 books. Amazon Prime Season 3 is either out or imminent. The longest series on this list — readers are desperate for recaps. The chunk format is made for this.
*   **Mistborn (Era 1)** — Brandon Sanderson
    3 books (The Final Empire, The Well of Ascension, The Hero of Ages). Apple TV+ adaptation announced. Sanderson is wildly popular and Era 1 is approachable — a perfect gateway to the broader Cosmere.
*   **Inheritance Cycle (Eragon)** — Christopher Paolini
    4 books. Disney+ adaptation reportedly in production. Massive nostalgia play — people who loved it as kids are adults now and want to reread before watching.

### Tier 2 — Strong Additions

*   **The First Law** — Joe Abercrombie
    3 main books + standalone novels. The Devils (a follow-up) released in 2025. Grimdark, beloved, and the three-book structure maps nicely to the format.
*   **The Witcher** — Andrzej Sapkowski
    ~8 books. Netflix final season (S5) coming. The books are a mess to navigate chronologically — a clean recap site would be genuinely useful here.
*   **The Locked Tomb** — Tamsyn Muir
    4 books. Extremely trendy in literary fantasy circles right now. Wild, bizarre, beloved.
*   **The Atlas Six** — Olivie Blake
    3 books. Completed trilogy, very popular in the dark academia fantasy lane that overlaps with the ACOTAR crowd.

### Tier 3 — Big but Long-Term

*   **Malazan Book of the Fallen** — Steven Erikson
    10 massive books. The hardest series to summarize — but also the one readers most desperately need help with. A long-term project.
*   **Throne of Glass** — Sarah J. Maas
    8 books. Same fandom as ACOTAR. If ACOTAR gets added, add this next.
*   **The Poppy War** — R.F. Kuang
    3 books. Completed trilogy, critically acclaimed, dark/serious tone.

**Future Phases (Prioritized):**
1.  **Contact email** — add a real email address to the "Affiliation & Content Removal" disclaimer section on `index.astro`.
2.  **Dramatis Personae (Character Directory)** — `/characters` section per series with brief allegiance descriptions.
3.  **Spoiler Protection Profiles** — global setting to blur/hide content beyond the user's current reading progress.
4.  **Text-to-Speech** — pre-generated MP3s via ElevenLabs or Google Cloud TTS, embedded HTML `<audio>` player.
5.  **Maps & Appendices** — `/appendix` page per series with high-res official maps and magic system summaries.

**Buy Links — Future Upgrade (ISBN-based deep links):**
Currently buy buttons use dynamic title search URLs (e.g. `bookshop.org/search?keywords=Iron+Flame`). A future upgrade would store the trade paperback ISBN-13 per book in `series-metadata.ts` and use it to construct direct product page links instead of search results. Structure would be an optional `books` map inside each series entry:
```typescript
'The Empyrean Series': {
  author: 'Rebecca Yarros',
  genre: 'Fantasy',
  blurb: '...',
  books: {
    'Fourth Wing': { isbn: '9781649374172' },
    'Iron Flame':  { isbn: '9781649374189' },
  }
}
```
Logic: if ISBN present → use `bookshop.org/p/books/ISBN` (exact product page); else → fall back to search URL. Graceful degradation means new books always work immediately, ISBNs are purely optional enrichment.
