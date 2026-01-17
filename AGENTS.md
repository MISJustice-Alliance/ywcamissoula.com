# AGENTS.md: Multi-Agent Orchestration for Notion to GitBook Migration

**Version:** 1.0  
**Last Updated:** January 17, 2026  
**Project:** Notion → GitBook Documentation Migration  
**Migration Type:** AI-Automated with Claude + MCP

---

## Project Overview

### Mission Statement
Execute a comprehensive, automated migration of Notion workspace documentation to GitBook using coordinated AI agents with Model Context Protocol (MCP) integration, maintaining content fidelity, preserving hierarchy, and ensuring production-ready output.

### Architecture
**Pattern:** Orchestrator-Worker with specialized subagents  
**Lead Agent Model:** Claude Opus 4 (for complex reasoning)  
**Worker Agent Model:** Claude Sonnet 4 (for efficient execution)  
**MCP Integration:** Notion MCP Server + File System MCP Server

### Technology Stack
- **Source:** Notion workspace (via Notion API + MCP)
- **Target:** GitBook (via Git Sync or direct import)
- **Transformation:** Notion Markdown → GitBook-compatible Markdown
- **Orchestration:** Claude Desktop/Code with MCP servers
- **Version Control:** Git (GitHub/GitLab)
- **Validation:** Python scripts + manual QA

---

## Agent Roles & Responsibilities

### 1. Orchestrator Agent (Lead)

**Model:** Claude Opus 4  
**Context Window:** 200K tokens  
**Primary Responsibilities:**

- Receive migration requirements from user
- Decompose migration into phases and subtasks
- Spawn and coordinate specialized worker agents
- Monitor progress and detect failures
- Synthesize results from all workers
- Ensure quality gates are passed
- Report final migration status

**Assigned Tasks:**
1. Analyze Notion workspace structure
2. Create migration execution plan
3. Coordinate worker agents (Exporter, Transformer, Validator)
4. Resolve cross-agent dependencies
5. Final quality assurance review

**Tools & Permissions:**
- Read/Write: `MULTIAGENTPLAN.md`
- Notion MCP: Search, fetch pages, list databases
- File System MCP: Read/write to `./gitbook-export/`
- Git: Commit, push capabilities

**Success Criteria:**
- Complete migration plan created
- All worker agents assigned and monitored
- Zero unresolved errors
- All content validated and imported to GitBook

---

### 2. Exporter Agent (Worker)

**Model:** Claude Sonnet 4  
**Context Window:** 200K tokens (isolated from other agents)  
**Primary Responsibilities:**

- Connect to Notion workspace via MCP
- Discover all pages, databases, and hierarchy
- Export content page-by-page
- Download embedded media (images, files)
- Preserve metadata (created date, last edited, author)
- Report export status to orchestrator

**Assigned Tasks:**
1. Search Notion workspace for all content
2. Build page hierarchy tree
3. Fetch full content for each page
4. Download images to `./gitbook-export/assets/`
5. Create raw export in intermediate format

**Tools & Permissions:**
- Notion MCP: `notion-search`, `notion-fetch` (read-only)
- File System MCP: Write to `./gitbook-export/raw/`
- No Git permissions (isolated from version control)

**Input Format:**
```json
{
  "task_id": "export-001",
  "agent_role": "exporter",
  "objective": "Export all pages from Notion workspace",
  "context": {
    "workspace_id": "abc123",
    "root_pages": ["page-id-1", "page-id-2"]
  },
  "constraints": {
    "max_pages": null,
    "exclude_archived": true
  },
  "expected_output": {
    "format": "raw-notion-json",
    "location": "./gitbook-export/raw/"
  },
  "success_criteria": [
    "All non-archived pages exported",
    "Page hierarchy preserved",
    "All images downloaded"
  ]
}
```

**Output Format:**

```json
{
  "task_id": "export-001",
  "status": "completed",
  "pages_exported": 156,
  "databases_exported": 8,
  "images_downloaded": 247,
  "hierarchy_depth": 4,
  "errors": [],
  "export_location": "./gitbook-export/raw/"
}
```

**Error Recovery:**

- Retry failed page exports (max 3 attempts)
- Log inaccessible pages for manual review
- Continue export even if single page fails
- Report all errors to orchestrator

---

### 3. Transformer Agent (Worker)

**Model:** Claude Sonnet 4
**Context Window:** 200K tokens (isolated)
**Primary Responsibilities:**

- Convert Notion blocks to GitBook Markdown
- Transform callouts, toggles, databases to GitBook equivalents
- Fix internal links (Notion URLs → relative paths)
- Update image references to local paths
- Generate frontmatter for each page
- Create `SUMMARY.md` navigation file

**Assigned Tasks:**

1. Load raw Notion export from Exporter Agent
2. Apply block-by-block transformations
3. Resolve internal page references
4. Generate GitBook-compatible Markdown
5. Create navigation structure

**Tools & Permissions:**

- File System MCP: Read from `./gitbook-export/raw/`, write to `./gitbook-export/`
- No Notion access (works offline from exported data)
- No Git permissions

**Block Transformation Rules:**


| Notion Block | GitBook Output | Handler |
| :-- | :-- | :-- |
| `heading_1` | `# Heading` | `transform_heading()` |
| `heading_2` | `## Heading` | `transform_heading()` |
| `heading_3` | `### Heading` | `transform_heading()` |
| `paragraph` | Plain text | `transform_paragraph()` |
| `bulleted_list` | `- item` | `transform_list()` |
| `numbered_list` | `1. item` | `transform_list()` |
| `to_do` | `- [ ] task` | `transform_todo()` |
| `toggle` | `<details><summary>` | `transform_toggle()` |
| `callout` (💡) | `{% hint style="info" %}` | `transform_callout()` |
| `callout` (⚠️) | `{% hint style="warning" %}` | `transform_callout()` |
| `callout` (❌) | `{% hint style="danger" %}` | `transform_callout()` |
| `code` | ````language` | `transform_code()` |  |
| `quote` | `> quote` | `transform_quote()` |
| `divider` | `---` | `transform_divider()` |
| `image` | `![alt](./assets/img.png)` | `transform_image()` |
| `link_to_page` | `[text](./page.md)` | `transform_link()` |
| `child_database` | Markdown table | `transform_database()` |

**Input Format:**

```json
{
  "task_id": "transform-001",
  "agent_role": "transformer",
  "objective": "Convert raw Notion export to GitBook Markdown",
  "context": {
    "raw_export_path": "./gitbook-export/raw/",
    "page_count": 156
  },
  "dependencies": ["export-001"],
  "expected_output": {
    "format": "gitbook-markdown",
    "location": "./gitbook-export/"
  },
  "success_criteria": [
    "All blocks transformed",
    "Internal links resolved",
    "SUMMARY.md created",
    "Frontmatter on all pages"
  ]
}
```

**Output Format:**

```json
{
  "task_id": "transform-001",
  "status": "completed",
  "pages_transformed": 156,
  "links_fixed": 423,
  "images_relocated": 247,
  "warnings": [
    "Page 'Old Doc' has unresolved link to deleted page"
  ],
  "summary_created": true,
  "output_location": "./gitbook-export/"
}
```

**Error Recovery:**

- Skip malformed blocks, log for manual review
- Default to plain text if block type unknown
- Preserve original Notion URL if link unresolvable
- Continue transformation even with warnings

---

### 4. Validator Agent (Worker)

**Model:** Claude Sonnet 4
**Context Window:** 200K tokens (isolated)
**Primary Responsibilities:**

- Validate Markdown syntax correctness
- Check all internal links resolve
- Verify all images exist locally
- Ensure frontmatter is well-formed
- Validate `SUMMARY.md` structure
- Run automated quality checks
- Generate validation report

**Assigned Tasks:**

1. Scan all exported Markdown files
2. Validate link integrity
3. Check image paths
4. Verify YAML frontmatter
5. Test `SUMMARY.md` references
6. Generate pass/fail report

**Tools & Permissions:**

- File System MCP: Read-only access to `./gitbook-export/`
- Execute: `validate_migration.py` script
- No write permissions (validation only)

**Validation Checks:**

```python
# Validation test suite
VALIDATION_CHECKS = {
    "required_files": ["SUMMARY.md", "README.md"],
    "frontmatter": {
        "required_fields": ["title"],
        "format": "yaml"
    },
    "links": {
        "check_internal": True,
        "check_anchors": True,
        "allow_external": True
    },
    "images": {
        "check_exists": True,
        "allowed_extensions": [".png", ".jpg", ".jpeg", ".gif", ".svg"],
        "max_size_mb": 10
    },
    "markdown": {
        "check_syntax": True,
        "check_tables": True,
        "check_code_blocks": True
    },
    "summary": {
        "check_all_files_listed": True,
        "check_all_links_valid": True
    }
}
```

**Input Format:**

```json
{
  "task_id": "validate-001",
  "agent_role": "validator",
  "objective": "Validate GitBook export quality",
  "context": {
    "export_path": "./gitbook-export/",
    "page_count": 156
  },
  "dependencies": ["transform-001"],
  "expected_output": {
    "format": "validation-report",
    "location": "./gitbook-export/VALIDATION_REPORT.md"
  },
  "success_criteria": [
    "Zero critical errors",
    "Less than 5% warnings",
    "All links resolve",
    "All images exist"
  ]
}
```

**Output Format:**

```json
{
  "task_id": "validate-001",
  "status": "completed",
  "validation_result": "passed_with_warnings",
  "critical_errors": 0,
  "warnings": 7,
  "checks_passed": 23,
  "checks_failed": 0,
  "issues": [
    {
      "severity": "warning",
      "file": "old-guide.md",
      "issue": "Missing frontmatter description"
    }
  ],
  "report_location": "./gitbook-export/VALIDATION_REPORT.md"
}
```

**Pass/Fail Criteria:**

- **Pass:** 0 critical errors, <5% warnings
- **Pass with Warnings:** 0 critical errors, 5-10% warnings
- **Fail:** Any critical errors OR >10% warnings

---

### 5. Scribe Agent (Worker)

**Model:** Claude Sonnet 4
**Context Window:** 200K tokens (isolated)
**Primary Responsibilities:**

- Document migration process in `MIGRATION_LOG.md`
- Generate change logs and audit trails
- Create user-facing migration summary
- Document any manual steps required
- List known issues and workarounds

**Assigned Tasks:**

1. Monitor all agent communications
2. Document key decisions and actions
3. Generate migration summary
4. Create troubleshooting guide for issues encountered
5. Document post-migration manual tasks

**Tools & Permissions:**

- File System MCP: Write to `./gitbook-export/MIGRATION_LOG.md`
- Read access to all agent outputs
- No Notion or Git permissions

**Documentation Structure:**

```markdown
# Migration Log

## Executive Summary
- **Start Time:** 2026-01-17 03:05:00 MST
- **End Time:** 2026-01-17 03:42:00 MST
- **Duration:** 37 minutes
- **Pages Migrated:** 156
- **Success Rate:** 100%

## Agent Activity Timeline

### Orchestrator Agent
- 03:05 - Created migration plan
- 03:07 - Spawned Exporter Agent
- 03:15 - Spawned Transformer Agent
- ...

### Exporter Agent
- 03:07 - Connected to Notion via MCP
- 03:08 - Discovered 156 pages
- ...

## Issues Encountered

### Issue #1: Broken Link in "API Reference"
**Severity:** Warning  
**Agent:** Transformer  
**Description:** Link to deleted page "Old Auth Docs"  
**Resolution:** Link removed, note added to page  

## Manual Steps Required

1. Review pages with warnings (see VALIDATION_REPORT.md)
2. Update GitBook space settings (favicon, domain)
3. Configure Git Sync in GitBook UI
4. Revoke Notion API integration after validation

## Known Limitations

- Notion databases with >100 rows truncated
- Some emoji callouts mapped to generic info style
- Embedded videos converted to links (not inline)
```


---

## Communication Protocols

### Agent-to-Orchestrator Messages

**Status Update:**

```json
{
  "from_agent": "exporter",
  "to_agent": "orchestrator",
  "message_type": "status_update",
  "task_id": "export-001",
  "progress": 75,
  "status": "in_progress",
  "details": "Exported 117 of 156 pages"
}
```

**Task Complete:**

```json
{
  "from_agent": "transformer",
  "to_agent": "orchestrator",
  "message_type": "task_complete",
  "task_id": "transform-001",
  "status": "completed",
  "output_location": "./gitbook-export/",
  "handoff_to": "validator"
}
```

**Error Report:**

```json
{
  "from_agent": "validator",
  "to_agent": "orchestrator",
  "message_type": "error_report",
  "task_id": "validate-001",
  "error_type": "critical",
  "error_message": "SUMMARY.md references missing file: deleted-page.md",
  "recovery_action": "requesting_transformer_reprocess"
}
```


### Orchestrator-to-Worker Messages

**Task Assignment:**

```json
{
  "from_agent": "orchestrator",
  "to_agent": "exporter",
  "message_type": "task_assignment",
  "task_id": "export-001",
  "priority": "high",
  "dependencies": [],
  "deadline": "2026-01-17T03:15:00Z"
}
```

**Recovery Command:**

```json
{
  "from_agent": "orchestrator",
  "to_agent": "transformer",
  "message_type": "recovery_command",
  "action": "reprocess_page",
  "page_id": "abc-123",
  "reason": "Validation detected broken link"
}
```


---

## Shared Planning Document

### MULTIAGENTPLAN.md Structure

```markdown
# Multi-Agent Migration Plan

## Overall Project Goal
Migrate 156 pages from Notion workspace to GitBook with 100% content fidelity and zero critical errors.

## Task Breakdown & Dependencies

| Task ID | Agent | Status | Dependencies | Output |
|---------|-------|--------|--------------|--------|
| export-001 | Exporter | ✅ Done | - | `./raw/` |
| transform-001 | Transformer | ✅ Done | export-001 | `./gitbook-export/` |
| validate-001 | Validator | ✅ Done | transform-001 | `VALIDATION_REPORT.md` |
| document-001 | Scribe | 🔄 In Progress | All above | `MIGRATION_LOG.md` |
| git-commit-001 | Orchestrator | ⏳ Not Started | validate-001 | Git push |

## Agent Assignments

- **Orchestrator:** Lead agent (Claude Opus 4)
- **Exporter:** Worker agent #1 (Claude Sonnet 4)
- **Transformer:** Worker agent #2 (Claude Sonnet 4)
- **Validator:** Worker agent #3 (Claude Sonnet 4)
- **Scribe:** Worker agent #4 (Claude Sonnet 4)

## Status Updates

### 2026-01-17 03:15:00 MST
**Exporter:** Completed export of 156 pages. All images downloaded.

### 2026-01-17 03:28:00 MST
**Transformer:** Completed transformation. 7 warnings logged.

### 2026-01-17 03:35:00 MST
**Validator:** Validation passed with warnings. 0 critical errors.

## Blockers

None currently.

## Next Actions

1. ✅ Orchestrator reviews validation report
2. ⏳ Orchestrator commits to Git
3. ⏳ User configures GitBook Git Sync
4. ⏳ User validates import in GitBook UI
```


---

## Parallelization Strategy

### Parallel Execution Opportunities

**Phase 1: Export (Sequential)**

- Must complete before transformation
- Single Exporter agent to avoid conflicts

**Phase 2: Transform + Validate (Parallel with Orchestration)**

```
Orchestrator (monitoring)
    ↓
┌───────────────┬────────────────┬──────────────┐
│ Transformer   │ Validator      │ Scribe       │
│ (Pages 1-50)  │ (Ready pages)  │ (Logging)    │
│               │                │              │
│ Transformer   │ Validator      │              │
│ (Pages 51-100)│ (Ready pages)  │              │
│               │                │              │
│ Transformer   │ Validator      │              │
│ (Pages 101-156)│ (Ready pages) │              │
└───────────────┴────────────────┴──────────────┘
```

**Benefits:**

- Validation starts as soon as first batch transformed
- Documentation happening continuously
- Reduces total time by ~30%

**Implementation:**

```bash
# Spawn multiple Transformer instances with page ranges
Transformer-1: pages 1-50
Transformer-2: pages 51-100
Transformer-3: pages 101-156

# Validator processes as outputs become available
Validator: watch ./gitbook-export/ for new files
```


---

## Context Management

### Context Isolation Rules

**Worker Agents:**

- Each worker maintains **independent 200K context**
- No cross-agent context bleeding
- Read shared `MULTIAGENTPLAN.md` at task start
- Write status updates to plan document
- Do not retain conversation history from other agents

**Orchestrator Agent:**

- Maintains **full context** of all agent communications
- Reads all agent outputs and status updates
- Synthesizes final report from all worker outputs
- Only agent with visibility across entire project


### Context Refresh Strategy

**When to Refresh:**

- Every 50 messages in Orchestrator conversation
- When agent reports memory pressure
- When context exceeds 180K tokens (90% capacity)

**How to Refresh:**

1. Summarize current state in `MULTIAGENTPLAN.md`
2. Export agent memory to `./context-snapshots/agent-{id}-{timestamp}.json`
3. Start new conversation with fresh context
4. Inject summary from `MULTIAGENTPLAN.md`
5. Resume from last checkpoint

---

## Error Handling & Recovery

### Error Types & Recovery Actions

| Error Type | Severity | Recovery Action | Responsible Agent |
| :-- | :-- | :-- | :-- |
| Notion API timeout | Medium | Retry with exponential backoff (3x) | Exporter |
| Page access denied | Low | Log and skip, continue with other pages | Exporter |
| Malformed block | Low | Skip block, preserve as plain text | Transformer |
| Broken internal link | Medium | Log warning, preserve original URL | Transformer |
| Missing image | High | Re-download from Notion, fallback to placeholder | Transformer |
| Invalid YAML frontmatter | High | Auto-fix or remove, log for review | Transformer |
| SUMMARY.md syntax error | Critical | Abort migration, request manual fix | Validator |
| Git push failure | Critical | Retry 3x, escalate to user | Orchestrator |

### Rollback Procedures

**Trigger:** Validator reports critical errors

**Rollback Steps:**

1. Orchestrator halts all agents
2. Delete `./gitbook-export/` directory
3. Restore from `./gitbook-export-backup/` if exists
4. Review error logs in `MIGRATION_LOG.md`
5. User decides: fix and retry OR manual migration

**Prevention:**

- Validator runs continuously (not just at end)
- Early detection of critical issues
- Incremental commits to Git (batch every 20 pages)

---

## Monitoring & Iteration

### Real-Time Monitoring

**Orchestrator Dashboard (Conceptual):**

```
╔══════════════════════════════════════════════════════════╗
║  NOTION → GITBOOK MIGRATION DASHBOARD                    ║
╠══════════════════════════════════════════════════════════╣
║  Status: IN PROGRESS                                     ║
║  Elapsed: 28 minutes                                     ║
║  Estimated Remaining: 9 minutes                          ║
╠═════════════════════════════════════════════════════════╣
║  Agent Status:                                           ║
║  ✅ Exporter       - COMPLETE (156/156 pages)           ║
║  🔄 Transformer    - IN PROGRESS (142/156 pages)        ║
║  🔄 Validator      - IN PROGRESS (119/142 validated)    ║
║  📝 Scribe         - RUNNING (documenting)              ║
╠══════════════════════════════════════════════════════════╣
║  Issues:                                                 ║
║  ⚠️  7 warnings (non-blocking)                          ║
║  ✅ 0 critical errors                                   ║
╚══════════════════════════════════════════════════════════╝
```


### Iteration Protocol

**Post-Migration Review:**

1. Orchestrator generates final report
2. User reviews `VALIDATION_REPORT.md`
3. If issues found, spawn targeted agents:
    - "Fix broken links in API Reference section"
    - "Re-download corrupted images"
    - "Regenerate SUMMARY.md with proper nesting"

**Incremental Fixes:**

- Do NOT re-run full migration
- Spawn mini-agents for surgical fixes
- Re-validate only affected files
- Commit fixes separately in Git

---

## Security & Permissions

### Principle of Least Privilege

| Agent | Notion Access | File System | Git | MCP Tools |
| :-- | :-- | :-- | :-- | :-- |
| Orchestrator | Read | Read/Write | Commit/Push | All |
| Exporter | Read | Write (`./raw/`) | None | Notion MCP only |
| Transformer | None | Read/Write (`./gitbook-export/`) | None | File System MCP |
| Validator | None | Read | None | File System MCP (read) |
| Scribe | None | Write (logs only) | None | File System MCP (logs) |

### Audit Trail

**All agent actions logged to:**

- `./logs/agent-activity.log` (machine-readable)
- `MIGRATION_LOG.md` (human-readable)

**Log Format:**

```json
{
  "timestamp": "2026-01-17T03:15:23Z",
  "agent": "transformer",
  "action": "transform_page",
  "page_id": "abc-123",
  "page_title": "API Reference",
  "status": "success",
  "duration_ms": 1240
}
```


---

## Anti-Patterns to Avoid

### ❌ Don't: Assign Same Task to Multiple Agents

**Wrong:**

```
Orchestrator: "Exporter-1 and Exporter-2, both export the workspace"
```

**Why:** Causes race conditions, duplicate API calls, conflicts

**Right:**

```
Orchestrator: "Exporter-1, export pages 1-80"
Orchestrator: "Exporter-2, export pages 81-156"
```


### ❌ Don't: Let Agents Share Write Access to Same Files

**Wrong:**

```
Transformer writes to ./gitbook-export/page-1.md
Validator writes fixes to ./gitbook-export/page-1.md (simultaneously)
```

**Why:** File corruption, lost changes

**Right:**

```
Transformer writes to ./gitbook-export/page-1.md
Validator READS and creates ./fixes/page-1-issues.md
Orchestrator decides to re-run Transformer with fixes
```


### ❌ Don't: Create Deep Orchestration Hierarchies

**Wrong:**

```
Orchestrator → Sub-Orchestrator-1 → Transformer-A → Mini-Transformer-A1
                                   → Transformer-B
              → Sub-Orchestrator-2 → Validator-A
```

**Why:** Latency, complexity, communication overhead

**Right:**

```
Orchestrator → Exporter
            → Transformer-1, Transformer-2, Transformer-3 (parallel)
            → Validator
            → Scribe
```


### ❌ Don't: Ignore Agent Failures

**Wrong:**

```
Orchestrator: "Exporter failed? Okay, moving on to Transformer anyway..."
```

**Why:** Cascading failures, bad data propagation

**Right:**

```
Orchestrator: "Exporter failed. Analyzing error... Retrying with different strategy..."
```


---

## Testing & Validation Workflow

### Pre-Migration Testing

**Test Run with Sample Pages:**

```bash
# Orchestrator: Run mini-migration with 5 pages
migration --mode test --pages 5 --output ./test-export/

# Review:
- Check transformations
- Validate links
- Test in local GitBook preview
```


### Progressive Validation

**Validate As You Go:**

```
Export 20 pages → Transform → Validate → Review
Export next 20 → Transform → Validate → Review
...
```

**Benefits:**

- Early error detection
- Incremental progress
- Easier debugging (smaller batches)

---

## Production Deployment Checklist

### Pre-Deployment

- [ ] Test migration completed successfully (5-10 page sample)
- [ ] All agents configured with correct permissions
- [ ] MCP servers connected and tested
- [ ] Git repository created and initialized
- [ ] Notion API token valid and scoped correctly
- [ ] Backup of Notion workspace created (export to HTML/Markdown)


### During Migration

- [ ] Orchestrator monitoring all agents in real-time
- [ ] `MULTIAGENTPLAN.md` updated with status
- [ ] Logs being written to `./logs/`
- [ ] No critical errors reported by Validator
- [ ] Manual intervention ready if needed


### Post-Migration

- [ ] Validation passed (0 critical errors)
- [ ] All files committed to Git
- [ ] GitBook Git Sync configured
- [ ] Sample pages reviewed in GitBook UI
- [ ] Links tested in GitBook
- [ ] Images rendering correctly
- [ ] `MIGRATION_LOG.md` reviewed
- [ ] Notion API integration revoked
- [ ] Team notified of migration completion

---

## Appendix: Agent Prompt Templates

### Orchestrator Agent Initialization Prompt

```
You are the Lead Orchestrator Agent for a Notion to GitBook migration project.

Your responsibilities:
1. Analyze the Notion workspace structure
2. Create a detailed migration plan in MULTIAGENTPLAN.md
3. Spawn specialized worker agents: Exporter, Transformer, Validator, Scribe
4. Monitor their progress and handle errors
5. Synthesize results and report final status

Context:
- Workspace has ~150-200 pages
- 4-5 levels of hierarchy
- Mix of regular pages and databases
- Target: GitBook with Git Sync

Begin by:
1. Connecting to Notion via MCP and discovering all pages
2. Analyzing the structure and estimating complexity
3. Creating MULTIAGENTPLAN.md with task breakdown
4. Spawning the Exporter Agent with specific instructions

Use the communication protocol defined in AGENTS.md for all agent interactions.
```


### Exporter Agent Initialization Prompt

```
You are the Exporter Worker Agent. Your ONLY job is to export content from Notion.

Task Assignment:
- Export all pages from Notion workspace ID: {workspace_id}
- Download all embedded images
- Preserve page hierarchy
- Save raw Notion JSON to ./gitbook-export/raw/

Constraints:
- Read-only access to Notion (do not modify)
- Exclude archived pages
- If a page is inaccessible, log and continue
- Maximum 3 retry attempts for failed API calls

Tools available:
- notion-search (find all pages)
- notion-fetch (get page content)
- file-system write (save exports)

Report progress every 20 pages to the Orchestrator Agent using the status_update message format.

When complete, send task_complete message and hand off to Transformer Agent.
```


### Transformer Agent Initialization Prompt

```
You are the Transformer Worker Agent. Convert raw Notion exports to GitBook Markdown.

Task Assignment:
- Read raw Notion JSON from ./gitbook-export/raw/
- Transform each page using block conversion rules in AGENTS.md
- Fix internal links (Notion URLs → relative paths)
- Update image references
- Generate YAML frontmatter
- Create SUMMARY.md navigation file

Constraints:
- Do not modify source files in ./raw/
- Write output to ./gitbook-export/
- Skip malformed blocks (log warnings)
- Preserve original if transformation fails

Block transformation rules are documented in AGENTS.md Section 3.

Report progress every 30 pages. When complete, hand off to Validator Agent.
```


---

## Version History

| Version | Date | Changes | Author |
| :-- | :-- | :-- | :-- |
| 1.0 | 2026-01-17 | Initial release | Orchestration Team |


---

## References

**Internal Documentation:**

- `CLAUDE.md` - Migration implementation guide
- `MULTIAGENTPLAN.md` - Live project status (created during migration)
- `MIGRATION_LOG.md` - Execution audit trail (created during migration)

**External Resources:**

- [Anthropic Multi-Agent Patterns](https://docs.anthropic.com/agents/multi-agent)
- [Model Context Protocol Spec](https://spec.modelcontextprotocol.io/)
- [Notion API Documentation](https://developers.notion.com/)
- [GitBook Import Guide](https://gitbook.com/docs/getting-started/import)

---

**Document Maintained By:** DevOps & AI Engineering Team
**Review Cycle:** After each major migration project
**Feedback:** Submit improvements via `./AGENTS.md` pull requests
