# The Lorebrary - Overview

## 1. The Core Mission
The Lorebrary is a static web application that hosts high-density, plot-only chapter summaries of massive fantasy and sci-fi book series. It serves as a dedicated reference tool for returning readers who need to refresh their memories—whether they are doing a "panic catchup" right before a new sequel drops, or simply returning to a massive 10-book series after a long break.

**Crucial Stance:** This project is strictly a memory aid, *not* a replacement for reading the actual novels. To respect authors and publishers, the summaries are intentionally brief and "soulless" (focusing only on concrete plot points rather than prose or thematic depth). The goal is to reactivate the journey the reader has already taken, while actively encouraging users to support the authors by buying the books and supporting local libraries.

## 2. The Core Philosophy
The immutable rules of the project. Any content generated or UI designed must adhere to these:
*   **Strict Brevity:** Summaries are exactly 15 sentences per chunk. No fluff, no thematic analysis.
*   **Aesthetic:** "Archive-like." Minimalist, typographic-heavy (Cinzel/Lora fonts), supporting dark/sepia/light modes.
*   **Performance:** Zero-JS by default. Fast, lightweight loading is critical for both SEO and user experience.

## 3. The High-Level Stack
*   **Frontend:** Astro (Static Site Generation), Tailwind CSS v4, React (for isolated interactive components only).
*   **Data Structure:** Markdown files ingested via Astro Content Collections.
*   **Backend/Data Prep:** Python (PyMuPDF) and the Gemini API (for generating the raw summaries offline).
*   **Hosting:** Vercel (Auto-deploy from GitHub `main`).

## 4. Related Documentation & AI Context Routing
This file (`thelorebrary-overview.md`) is the primary entry point. **Do NOT use it as a junk drawer.** If you need to update project documentation at the end of a session, route your updates to the specific files below:

*   **[system-architecture.md](./system-architecture.md):** The frontend documentation. Read this to understand the Astro framework, Tailwind configuration, React Island implementations, and directory structure.
*   **[changelog.md](./changelog.md):** The session log. **ALWAYS update this file at the end of a session** if meaningful work was completed. Add a dated entry detailing the specific accomplishments, features added, or bug fixes achieved.
*   **[roadmap-and-design.md](./roadmap-and-design.md):** The vision document. Update this file to add new series ideas to the tiered priority list, to log new UI/UX design decisions, or to record future planned enhancements (e.g., adding text-to-speech).
*   **[workflow.md](./workflow.md):** The runbook. Update this file ONLY if the procedural steps for adding a new series, running the SEO checks, or deploying the site change.
*   **[the-distiller-engineering.md](./the-distiller-engineering.md):** The backend documentation. Update this ONLY if the architectural logic for the Python PDF-parsing pipeline (`smart_pdf_splitter` or `distiller_auto`) changes.
*   **[thelorebrary-disclaimer.md](./thelorebrary-disclaimer.md):** The legal document. Do not modify unless explicit changes to the site's mission statement or copyright disclaimer are requested.
*   **[chapter-summary-expectations.md](./chapter-summary-expectations.md):** The "Constitution" for the Distiller AI. It contains the strict rules for processing new book chunks. Modify only if the prompt engineering strategy changes.
*   **[chapter-summary-initial-instructions.md](./chapter-summary-initial-instructions.md):** The initial prompt template used to kick off a new summarization task.