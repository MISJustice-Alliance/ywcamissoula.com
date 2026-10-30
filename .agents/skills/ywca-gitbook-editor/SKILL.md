---
name: ywca-gitbook-editor
description: Use when editing YWCA Missoula GitBook pages or navigation.
version: 0.1.0
author: Elvis Nuno, Hermes Agent
license: MIT
metadata:
  hermes:
    tags: [ywca-missoula, gitbook, editing]
---

# YWCA GitBook editorial workflow

## When to use
Use for new/revised public pages, open letters, evidence indexes, metadata, and navigation in `~/projects/ywcamissoula.com/gitbook-export/`. Pair with `ywca-gitbook-evidence` for substantive legal or personal claims.

## Procedure
1. Inspect `git status --short` in the repo; leave unrelated work intact. Read the target, neighboring pages, `gitbook-export/SUMMARY.md`, `gitbook-export/.gitbook.yaml`, `DEPLOYMENT.md`, and relevant `~/wiki/ywca-missoula/` pages (orient under wiki `AGENTS.md` first). The root `AGENTS.md` and `CLAUDE.md` describe the historical Notion migration; do not follow their destructive reset or old publication assumptions for ongoing edits.
2. Make the smallest scoped change. Keep a record-first structure: what is established, what is alleged or inferred, primary artifact links, unresolved questions, corrections path, and appropriate disclaimer. For research reports, legal advocacy, and analysis reports, use the opening masthead in `templates/research-report-opening.md`: **About this article:**, **Related analysis:**, **Published by:**, **Intended audience:**, **Scope:**, **Research reviewed through:**, and **Disclaimer:**. Keep those labels and order; adapt every value and link to the particular report's evidence, audience, publisher, and review cutoff rather than copying another article's claims. This masthead is distinct from the body's Executive Summary and Part I/II headings. Do not invent an author, review date, or companion link; if a date is unknown, say so rather than imply freshness. GitBook displays `description` frontmatter beneath the live H1. Keep that top description, but do not repeat the same sentence as a bold paragraph directly below it; check the first lines of the source and the live `.md` page for duplication before publication. If a duplicate is reported, inspect both sources and remove only the body copy, never the frontmatter description merely to hide the duplicate. A GitBook sync lag can leave an older duplicate live even after the source is corrected; verify fresh HTML and `.md` responses before editing again. Do not equate the advocacy site with YWCA of Missoula; read `gitbook-export/overview/about-this-site-publisher-and-corrections.md` for publisher identification. Before copying a research manuscript into the public tree, strip private editorial-review instructions while preserving reader-relevant limitations. Convert Markdown `[^n]` footnotes into visible numbered notes with linked in-text references: GitBook does not publish Markdown footnotes. When deleting a paragraph with a numbered note, remove its source entry and renumber remaining note headings, anchors, in-text links, and source-guide citations together; check for orphan references and adjacent privacy-sensitive source descriptions.
3. If adding/moving a public page, update `SUMMARY.md` and inbound hub links. For old paths, inspect `.gitbook.yaml` redirects. Use source-relative Markdown links for in-tree targets, not guessed public slugs. GitBook URL paths follow navigation hierarchy, not filesystem paths.
4. For search metadata, edit `SUMMARY.md` label for the published title/H1 and page `description` frontmatter for the meta description. Page frontmatter `title` alone does not change the live title. Never put secrets, private wiki notes, unredacted health or victim information in the published tree.
5. From repo root run `/usr/bin/python3 tools/validate_site.py gitbook-export` (system Python has dependencies from `tools/requirements.txt`; the Hermes venv's `python3` does not) and `git diff --check`. Compare against preexisting issues; report newly introduced errors and warnings. Do not push, deploy, or announce publication as part of an edit-only request. For an authorized commit, stage only the named page and related hubs, leaving unrelated untracked files alone. Before pushing, fetch the upstream and compare `git rev-list --left-right --count origin/main...HEAD` and `git log origin/main..HEAD`: a push of main includes every earlier local commit, so obtain an explicit scope decision if those commits were not part of the current request.

## Pitfalls
`DEPLOYMENT.md` owns the current deployment map. Repo-root `robots.txt`, `sitemap.xml`, `llms.txt` and `data/*.csv` are not GitBook publication sources; GitBook generates discovery files. Fenced JSON-LD in Markdown is visible code, not structured data. Never bulk-copy `~/wiki` pages into GitBook: restricted materials may be intermixed.

## Verification
Read back changed page, nav entry, and each local link target. Cite validator exit status and remaining issues; if publication was requested, separately verify the exact live URL after Git Sync and distinguish staged content from served content. For a reported missing masthead, compare the repository source and a fresh direct request to the live page's `.md` variant (plus HTML status): a successful push or CI does not establish that GitBook has synced, while cached extraction can still show an older revision. Check the specific opening labels and body in the live response before changing the content again.
