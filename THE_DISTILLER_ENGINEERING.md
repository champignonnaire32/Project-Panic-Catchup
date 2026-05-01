# THE DISTILLER: Engineering Manifest & Technical Manual

This document details the architecture of the "Distiller" project—a system designed to convert complex book PDFs into high-density, narrative-only summaries for returning readers.

## 1. THE SPLITTER ENGINES (Python Logic)
The project uses three distinct "Signature Styles" to handle different PDF structures while conserving tokens.

### A. The Metadata Mapper (`smart_pdf_splitter.py`)
*   **Target:** Modern PDFs with a healthy internal Table of Contents (TOC).
*   **Logic:** Uses `PyMuPDF (fitz)` to extract the "Hidden Map" of the PDF.
*   **Best For:** *Sun Eater*, *Red Rising*, and most standard commercial exports.
*   **Key Feature:** Uses Level 1 headers to define chapter boundaries.

### B. The Nested Hierarchy Engine (`smart_pdf_splitter-stormlight.py`)
*   **Target:** Books with complex, nested structures (Books inside Parts inside Volumes).
*   **Logic:** Scans multiple levels of metadata (Level 1, 2, and 3). 
*   **Best For:** Brandon Sanderson (*Stormlight Archive*), where chapters are often nested under "Part" or "Interlude" headers.
*   **Key Feature:** Specifically recognizes "Prelude," "Prologue," "Interlude," and "Epilogue" as distinct narrative entries.

### C. The Signature Detection Engine (`smart_pdf_splitter-dune.py`)
*   **Target:** "Noisy" or older PDFs with no internal metadata/TOC.
*   **Logic:** Scans the raw text of every page for specific "Signatures" (e.g., Irulan epigraphs, specific attribution names like "Hadi Benotto").
*   **Best For:** *Dune* series, where chapters start with a quote rather than a number.
*   **Fallback:** If signatures are too far apart (25+ pages), it forces a break at page intervals to prevent AI context overflow.

---

## 2. THE "CHAPTER STAMP" BREAKTHROUGH
To prevent the AI from being "blind" to chapter headers (especially when titles are images), all splitters now use **Metadata Stamping**:
*   **Logic:** The script pulls the Title from the metadata map and manually inserts an explicit text marker: `--- [[ CHAPTER START: Title ]] ---` at the exact start page.
*   **Result:** This bridges the gap between a non-OCR PDF and the AI's reading ability.

---

## 3. THE AUTOMATION PIPELINE (`distiller_auto.py`)
*   **Lean Prompt Architecture:** Prompts no longer contain raw book text (prevents 429/503 errors). The script injects the Rules (Constitution) into the prompt but provides only the **Filename** for the chunk. Gemini uses its internal `read_file` tool to ingest the chapters locally.
*   **Security & Workspace Logic:** The script forces the `cwd` (Current Working Directory) to the chunk folder to satisfy Gemini's workspace security constraints.
*   **Resiliency Engine:** Includes a 3-attempt retry loop with a 30s backoff for server capacity issues.
*   **Anti-Throttling:** Implements a 5s "cooldown" between chunks to maintain API stability.
*   **Pre-Scan Protocol:** Performs a folder-wide check before execution to explicitly list skipped vs. queued chunks.

## 4. TROUBLESHOOTING & MODIFICATION TIPS

### A. Narrative Detection (Series Specific)
*   **Dune (Structural):** *Heretics of Dune* requires `get_text("blocks")` analysis. Chapters are detected by identifying **indented epigraphs** followed by **centered attributions** (e.g., `—Source`).
*   **Red Rising (Metadata):** Uses a nested TOC (Level 1 Parts, Level 2 Chapters). Logic includes "Merge-on-Proximity" to link Part headers with their first chapters.

### B. Error Handling
*   **429/503 (Capacity):** Usually solved by the Lean Prompting architecture. If persistence continues, the script automatically retries.
*   **Path Not in Workspace:** Occurs if Gemini tries to `read_file` outside the `cwd`. Ensure the script provides local filenames, not absolute paths, for the chunks.

---
**Status:** Operational (v2.0) | **Project:** The Distiller | **Date:** April 2026

---
**Status:** Operational | **Project:** The Distiller | **Date:** April 2026
