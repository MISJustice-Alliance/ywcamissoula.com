# Multi-Agent Migration Plan

**Project:** Notion to GitBook Migration
**Source:** Systemic Failure: Pattern of Endemic Institutional Corruption, Civil Rights Violations, Malicious Harassment (2015-2025)
**Database ID:** `02fa6619-8904-4840-8af4-02796e5a1f63`
**Data Source ID:** `238ca07d-b849-80ab-a9ff-000b6f037487`
**Started:** 2026-01-17
**Status:** ✅ Complete

---

## Overall Project Goal

Migrate all pages from the "Systemic Failure" legal documentation wiki to GitBook with 100% content fidelity, preserved hierarchy, and zero critical errors.

## Source Analysis

**Content Type:** Notion Wiki/Database
**Estimated Pages:** 50+
**Content Categories:**
- Legal Analysis Documents
- Civil Rights Violations Documentation
- Evidence Collections
- Official Complaints (State/Federal)
- Timeline Documents
- Source Citations

**Database Schema:**
| Property | Type | Description |
|----------|------|-------------|
| Page | title | Page title |
| Tags | multi_select | 65+ tag options (Civil Rights, Evidence, etc.) |
| Owner | person | Document owner |
| Verification | verification | Verification status |
| Last edited time | timestamp | Auto-updated |

---

## Task Breakdown & Dependencies

| Task ID | Agent | Status | Dependencies | Output |
|---------|-------|--------|--------------|--------|
| export-001 | Exporter | ✅ Done | - | `./gitbook-export/raw/` (63 pages, 75 files) |
| transform-001 | Transformer | ✅ Done | export-001 | `./gitbook-export/` (62 pages, SUMMARY.md, README.md) |
| validate-001 | Validator | ✅ Done | transform-001 | `VALIDATION_REPORT.md` - PASSED (0 errors, 2 warnings) |
| document-001 | Scribe | ✅ Done | All above | `MIGRATION_LOG.md` |
| git-commit-001 | Orchestrator | ✅ Done | validate-001 | Committed & pushed to remote |

---

## Agent Assignments

- **Orchestrator:** Lead agent (Claude Opus 4) - Coordination & QA
- **Exporter:** Worker agent (Claude Sonnet 4) - Notion MCP extraction
- **Transformer:** Worker agent (Claude Sonnet 4) - Markdown conversion
- **Validator:** Worker agent (Claude Sonnet 4) - Quality validation
- **Scribe:** Worker agent (Claude Sonnet 4) - Documentation

---

## Exporter Agent Instructions

**Objective:** Export all pages from data source `collection://238ca07d-b849-80ab-a9ff-000b6f037487`

**Tasks:**
1. Search and enumerate all pages in the wiki database
2. Fetch full content for each page using `notion-fetch`
3. Download embedded images to `./gitbook-export/assets/`
4. Preserve page metadata (tags, owner, verification status)
5. Save raw content to `./gitbook-export/raw/{page-slug}.json`

**Constraints:**
- Read-only access to Notion
- Skip inaccessible pages, log for review
- Retry failed fetches up to 3 times

---

## Transformer Agent Instructions

**Objective:** Convert raw Notion exports to GitBook-compatible Markdown

**Block Transformations:**
| Notion Block | GitBook Output |
|--------------|----------------|
| heading_1/2/3 | # / ## / ### |
| paragraph | Plain text |
| bulleted_list | - item |
| numbered_list | 1. item |
| to_do | - [ ] / - [x] |
| toggle | `<details><summary>` |
| callout (info) | `{% hint style="info" %}` |
| callout (warning) | `{% hint style="warning" %}` |
| callout (danger) | `{% hint style="danger" %}` |
| code | Fenced code block |
| quote | > blockquote |
| image | `![alt](./assets/img.png)` |
| link_to_page | `[text](./page.md)` |
| table/database | Markdown table |

**Output Requirements:**
- Generate YAML frontmatter with title, description, tags
- Create `SUMMARY.md` navigation file
- Fix internal links to relative paths
- Organize by logical sections

---

## Validator Agent Instructions

**Objective:** Validate GitBook export quality

**Validation Checks:**
- [ ] All Markdown files have valid frontmatter
- [ ] All internal links resolve correctly
- [ ] All images exist in `./assets/`
- [ ] `SUMMARY.md` references all pages
- [ ] No broken external links (warning only)
- [ ] Code blocks have proper syntax highlighting tags

**Pass Criteria:**
- 0 critical errors
- <5% warning rate

---

## Status Updates

### 2026-01-17 10:30:00 MST
**Orchestrator:** Analyzed source database. Found wiki with 50+ legal documentation pages across multiple categories. Created migration plan.

### 2026-01-17 10:35:00 MST
**Exporter:** Completed export - 63 unique pages, 75 JSON files, 616 KB total.

### 2026-01-17 10:40:00 MST
**Scribe:** Created MIGRATION_LOG.md with full documentation structure.

### 2026-01-17 10:45:00 MST
**Transformer:** Completed transformation - 62 pages to GitBook Markdown, SUMMARY.md and README.md created.

### 2026-01-17 10:50:00 MST
**Validator:** Validation PASSED - 0 critical errors, 2 warnings (3.1%), ready for GitBook import.

### 2026-01-17 10:55:00 MST
**Orchestrator:** Git commit completed - 145 files, 5393 insertions. Pushed to `github.com:MISJustice-Alliance/ywcamissoula.com.git` (cca0422..01f5ad7).

### 2026-01-17 11:00:00 MST
**Orchestrator:** GitBook Git Sync configured manually. Migration COMPLETE.

---

## Blockers

None.

---

## Migration Complete - Recommended Next Steps

### Immediate (Optional):
1. **Verify GitBook Import** - Browse all pages in GitBook to confirm rendering
2. **Test Search** - Ensure GitBook search indexes all content
3. **Check Links** - Spot-check internal links navigate correctly

### Cleanup (Optional):
1. **Archive Raw Exports** - The `gitbook-export/raw/` folder (616 KB) can be deleted if no longer needed
2. **Revoke Notion Integration** - Remove "GitBook Migration" integration access from Notion workspace
3. **Update Team** - Notify stakeholders of new documentation location

### Ongoing Maintenance:
- **One-Time Migration:** Archive Notion workspace, use GitBook as single source of truth
- **OR Bidirectional Sync:** Keep both systems updated via Git Sync triggers

---

## Next Actions

1. ✅ Spawn Exporter Agent to enumerate and fetch all pages
2. ✅ Spawn Transformer Agent (after export completes)
3. ✅ Spawn Validator Agent (after transformation completes)
4. ✅ Spawn Scribe Agent (parallel with validation)
5. ✅ Final review and Git commit
6. ✅ Configure GitBook Git Sync (completed manually)

---

## GitBook Git Sync Configuration

**Repository:** `github.com:MISJustice-Alliance/ywcamissoula.com.git`
**Branch:** `main`
**Content Path:** `/gitbook-export`

### Setup Instructions:

1. **Open GitBook** → Navigate to your space (or create new)
2. **Settings** → Click gear icon (top-right)
3. **Git Sync** → Enable Git Sync feature
4. **Connect Repository:**
   - Platform: GitHub
   - Repository: `MISJustice-Alliance/ywcamissoula.com`
   - Branch: `main`
   - Content directory: `gitbook-export`
5. **Sync Direction:** GitHub → GitBook (one-way import)
6. **Run Initial Sync** → Click "Sync Now"

### Verification Checklist:
- [ ] All 62 pages imported successfully
- [ ] SUMMARY.md navigation structure preserved
- [ ] Internal links working correctly
- [ ] Tags/frontmatter visible in GitBook
