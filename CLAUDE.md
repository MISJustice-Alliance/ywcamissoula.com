# CLAUDE.md: Notion to GitBook Migration Guide

## Tool Selection

**Primary Tools:**
- **Claude Desktop** or **Claude Code** with Notion MCP Server
- **GitBook CLI** or Git Sync for import
- **Notion MCP Server** (Official remote server or open-source alternatives)

**Why MCP-Based Approach:**
The Model Context Protocol enables AI to programmatically access Notion content, transform it to GitBook-compatible Markdown, and automate the entire migration workflow—reducing a multi-day manual process to under 30 minutes.

---

## Prerequisites

### 1. Notion Integration Setup
Create a Notion integration to obtain API credentials:
```bash
# Navigate to: https://www.notion.so/my-integrations
# 1. Click "New Integration"
# 2. Name: "GitBook Migration"
# 3. Associated workspace: Select your workspace
# 4. Type: Internal
# 5. Capabilities: Read content, Read user information
# 6. Copy the "Internal Integration Token"
```


### 2. Connect Integration to Content

Grant the integration access to pages you want to migrate:

- Open each Notion page/database
- Click "•••" (top-right) → **Add connections**
- Select your "GitBook Migration" integration


### 3. Install Notion MCP Server

**Option A: Official Notion MCP (Recommended)**

```bash
# Uses OAuth, no manual configuration
# Connect via Claude Desktop settings → Integrations → Add Notion
```

**Option B: Open Source MCP Server**

```bash
npm install -g @makenotion/notion-mcp-server

# Configure Claude Desktop
# Location: ~/.config/claude/claude_desktop_config.json (Linux/macOS)
# or %APPDATA%\Claude\claude_desktop_config.json (Windows)
```

```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@makenotion/notion-mcp-server"],
      "env": {
        "NOTION_API_KEY": "your_integration_token_here"
      }
    }
  }
}
```


### 4. GitBook Setup

```bash
# Install GitBook CLI (optional, for local testing)
npm install -g gitbook-cli

# Or prepare Git repository for Git Sync
git init notion-to-gitbook-migration
cd notion-to-gitbook-migration
```


---

## Implementation

### Phase 1: Export from Notion (AI-Automated)

**Using Claude Desktop/Code with MCP:**

Start a conversation with Claude after MCP server is configured:

```
Please help me migrate my Notion workspace to GitBook format:

1. Search all pages in my Notion workspace
2. For each page:
   - Retrieve the full content using the Notion MCP tools
   - Convert Notion blocks to GitBook-compatible Markdown
   - Preserve page hierarchy and relationships
   - Save to ./gitbook-export/{page-path}.md
3. Create a SUMMARY.md file for GitBook navigation
4. Handle special Notion blocks:
   - Callouts → GitBook hints
   - Toggle lists → Details/Summary
   - Databases → Markdown tables
   - Code blocks → Syntax-highlighted code
```

**Example AI Workflow**:

```python
# This is the logic Claude will execute via MCP tools

# Step 1: Discover all pages
pages = await mcp.tools['notion:search']({
    filter: { property: 'object', value: 'page' },
    sort: { direction: 'ascending', timestamp: 'last_edited_time' }
})

# Step 2: Process each page
for page in pages:
    content = await mcp.tools['notion:get-page-content']({
        page_id: page.id
    })
    
    # Step 3: Transform to GitBook Markdown
    gitbook_markdown = transform_notion_to_gitbook(content)
    
    # Step 4: Write to file system
    write_file(f"./gitbook-export/{page.slug}.md", gitbook_markdown)

# Step 5: Generate navigation
generate_summary_file(pages)
```


### Phase 2: Markdown Transformation

**Key Conversion Rules:**


| Notion Block Type | GitBook Equivalent | Transformation |
| :-- | :-- | :-- |
| Callout (info) | `{% hint style="info" %}` | Wrap content with hint tag |
| Toggle | `<details><summary>` | Convert to collapsible HTML |
| Database | Markdown table | Extract visible properties |
| Code block | Fenced code block | Preserve language tag |
| Image | `![alt](url)` | Download and update path |
| Link to page | Relative link | Map to new file structure |

**AI Prompt for Transformation:**

```
For each Notion page, apply these transformations:

1. Convert Notion callouts:
   - 💡 Info → {% hint style="info" %}
   - ⚠️ Warning → {% hint style="warning" %}
   - ❌ Danger → {% hint style="danger" %}

2. Preserve frontmatter:
   ---
   title: {page.title}
   description: {page.description}
   ---

3. Fix internal links:
   - Convert Notion page IDs to relative paths
   - Update format: [text](notion://page-id) → [text](./page-name.md)

4. Download embedded media:
   - Save images to ./assets/
   - Update references

5. Clean up special characters in filenames
```


### Phase 3: Import to GitBook

**Option A: Git Sync (Recommended for Large Migrations)**

```bash
# Commit exported Markdown to Git
cd gitbook-export
git add .
git commit -m "Initial Notion migration"
git push origin main

# In GitBook UI:
# 1. Create new space
# 2. Click "Set up Git Sync" (top-right)
# 3. Install GitHub/GitLab integration
# 4. Select repository: notion-to-gitbook-migration
# 5. Sync direction: GitHub/GitLab → GitBook
# 6. Run initial sync
```

**Option B: Direct Import**

```bash
# In GitBook:
# 1. Create new space
# 2. Go to Settings → Import
# 3. Select "Upload files"
# 4. Upload exported Markdown folder
```


---

## Quality Validation

### 1. Pre-Migration Checklist

```bash
# Run these validations before import
python validate_migration.py
```

```python
# validate_migration.py
import os
import re

def validate_export():
    issues = []
    
    # Check all internal links are valid
    for md_file in glob('**/*.md', recursive=True):
        content = read_file(md_file)
        links = re.findall(r'\[.*?\]\((.*?)\)', content)
        for link in links:
            if link.startswith('./') and not os.path.exists(link):
                issues.append(f"Broken link in {md_file}: {link}")
    
    # Verify all images exist
    for img in re.findall(r'!\[.*?\]\((.*?)\)', content):
        if not img.startswith('http') and not os.path.exists(img):
            issues.append(f"Missing image: {img}")
    
    # Check frontmatter
    if not content.startswith('---'):
        issues.append(f"Missing frontmatter in {md_file}")
    
    return issues

# Run validation
issues = validate_export()
if issues:
    print(f"❌ Found {len(issues)} issues:")
    for issue in issues:
        print(f"  - {issue}")
else:
    print("✅ Validation passed!")
```


### 2. Post-Import Testing

- [ ] Verify all pages imported successfully [web:1]
- [ ] Test internal navigation links
- [ ] Check image rendering
- [ ] Validate code block syntax highlighting
- [ ] Review converted callouts/hints
- [ ] Test search functionality in GitBook
- [ ] Confirm page hierarchy matches Notion structure


### 3. Iterative Refinement

```
Ask Claude to:
1. Identify pages with formatting issues
2. Regenerate specific pages with corrections
3. Update broken cross-references
4. Optimize SUMMARY.md structure
```


---

## Source Hierarchy

1. **[Official Notion MCP Documentation](https://developers.notion.com/docs/mcp)** - Notion's hosted MCP server
2. **[GitBook Import Guide](https://gitbook.com/docs/getting-started/import)** - Official migration methods
3. **[makenotion/notion-mcp-server](https://github.com/makenotion/notion-mcp-server)** - Open source MCP implementation
4. **[GitBook Git Sync Documentation](https://gitbook.com/docs/guides/editing-and-publishing-documentation/import-or-migrate-your-content-to-gitbook-with-git-sync)** - Large-scale migration

---

## Security Considerations

⚠️ **Critical Security Practices:**

1. **API Token Management** 

```bash
# NEVER commit tokens to version control
echo "NOTION_API_KEY=secret_*****" > .env
echo ".env" >> .gitignore
```

2. **Scope Limitation**
    - Grant MCP integration access ONLY to pages being migrated
    - Revoke integration access after migration completes
    - Use read-only permissions when possible
3. **Data Sanitization**
    - Review exported content for sensitive information
    - Remove internal comments/drafts before GitBook import
    - Validate no API keys or credentials in code blocks

---

## Troubleshooting

### Issue: MCP Server Not Connecting

```bash
# Verify configuration
cat ~/.config/claude/claude_desktop_config.json

# Check Notion API key validity
curl -H "Authorization: Bearer $NOTION_API_KEY" \
     -H "Notion-Version: 2022-06-28" \
     https://api.notion.com/v1/users/me

# Restart Claude Desktop after config changes
```


### Issue: Broken Internal Links

```python
# AI prompt to fix:
"Scan all exported Markdown files and create a mapping of Notion page IDs 
to new GitBook file paths. Then update all internal links to use relative 
paths instead of Notion URLs."
```


### Issue: Database Tables Not Rendering

```
"For Notion database {database_id}, export all visible properties as a 
Markdown table. Include: Name, Status, Assignee, Due Date. Sort by 
Priority descending."
```


---

## Estimated Timeline

| Phase | Manual Approach | AI-Automated (MCP) |
| :-- | :-- | :-- |
| Export from Notion | 2-4 hours | 5 minutes |
| Markdown transformation | 8-16 hours | 10 minutes |
| Fix links/images | 4-8 hours | 5 minutes |
| Import to GitBook | 1-2 hours | 10 minutes |
| Validation/fixes | 4-8 hours | 10 minutes |
| **Total** | **19-38 hours** | **40 minutes** |

*Based on ~100-200 pages*

---

## Advanced: Custom MCP Server

For specialized migration logic, create a custom MCP server:

```typescript
// notion-gitbook-mcp-server.ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { NotionClient } from '@notionhq/client';

const notion = new NotionClient({ auth: process.env.NOTION_API_KEY });

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "migrate_page_to_gitbook",
        description: "Export Notion page with GitBook-specific transformations",
        inputSchema: {
          type: "object",
          properties: {
            page_id: { type: "string" },
            output_path: { type: "string" }
          }
        }
      }
    ]
  };
});

// Implement custom transformation logic...
```


---

## Maintenance

**Post-Migration Sync Strategy:**

If continuing to use Notion as source of truth:

1. Set up bidirectional Git Sync between Notion and GitBook
2. Use automation tools (n8n, Zapier) for selective page updates 
3. Implement CI/CD workflow to validate changes before GitBook deployment

**One-Time Migration:**

- Archive Notion workspace after validation
- Update team to use GitBook as new documentation platform
- Revoke all integration API access [web:43]

---

## Citations

All implementation details sourced from:

- Notion MCP Official Documentation
- GitBook Migration Guides 
- Open Source MCP Implementations 
- AI Agent Automation Case Studies 

**Last Updated:** January 17, 2026

