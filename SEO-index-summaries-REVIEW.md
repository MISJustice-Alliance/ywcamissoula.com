# Index-page summaries and hub links: review checklist

> **Human Review Required:** This draft contains factual allegations and legal advocacy analysis. Before publication or submission, verify every citation and quotation, remove unnecessary identifying information, distinguish allegations from established facts, assess privacy/defamation/retaliation risk, and obtain authorized editorial approval.

This file is outside `gitbook-export/`, so GitBook does not publish it.

## What changed
- **25 pages** in `gitbook-export/` got a `> **About this page:**` summary directly under the H1. The evidence README's generic opening sentence was replaced by the summary. Nothing else on those pages was edited.
- **`overview/nuno-case-system-overview-and-full-article-index.md`** and **`overview/sources-and-record-index.md`** each got an "Analysis and index pages" section linking the pages that were missing from them. The master index already linked most of them; the sources index linked few.
- Not changed: the two section roots that redirect (`/odc-lowney-grievance-2026`, `/additional-evidence-and-documentation`). See "Open items".

## Verify before publishing
1. Each summary matches its page. Summaries use "alleges", "the complainant states", and "the page characterizes", and do not state allegations as findings. Confirm this in each one.
2. **Synthesis page:** the summary says it was produced with an AI research pipeline and that citations need verification. Check every § 1983 citation and quotation against the primary source before any reliance.
3. **FBI referral:** the summary says it "requests a federal investigation" and that its contents are allegations. Confirm the request wording against the page's final section.
4. **Supplemental Submission #3:** the summary refers to "an alleged password-coercion incident." Confirm the page's own wording.
5. **Evidence README:** the new opening sentence lists the topic pages and folders it links. Confirm each link still resolves.
6. Confirm each hub link resolves after GitBook sync (both hubs, 25 pages).

## Flagged for human review (not changed here)
- **Criminal investigation referral:** names individuals and organizations in an investigative framing. Review privacy, defamation, and retaliation risk before the page is promoted in hubs or indexed.
- **"Generally disinclined" page** (`legal-malpractice-evidence-bryan-tipp/generally-disinclined-…md`): the frontmatter `description` states as fact that "How Bryan Tipp's refusal to act on known First Amendment retaliation and harassment cost Mr Nuno his reputation, career, company, and civil rights claims." Causation is alleged, not established. Reword before it is indexed or shared.
- **Mt-bar and Lowney pages:** these carry sensitive allegations about named attorneys and prosecutors. Confirm the names and attributions match the record.

## Open items
- `/odc-lowney-grievance-2026` and `/additional-evidence-and-documentation` return HTTP 307 to nested duplicate pages from the original Notion export. The fix is to move the nested page's content up to the section root in GitBook, or to point navigation at the final URL.
