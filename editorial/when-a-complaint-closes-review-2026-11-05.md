# When a Complaint Closes: editorial review and change report

Review cutoff: November 5, 2026. This is an internal editorial memo in the repository root, not a GitBook page. The published article is `gitbook-export/when-a-complaint-closes.md`; the public source record for the November 4–5 exchange is the address-redacted PDF in `gitbook-export/.gitbook/assets/`, linked from the [ODC evidence ledger](../gitbook-export/montana-bar-complaints/odc-review-evidence-ledger-2026.md). The unredacted source correspondence and this memo's working notes stay outside the publication tree; the memo carries no private addresses or file paths.

## Scope decision

The refined draft was a named-case analysis of three separate matters: ODC File No. 26-145 (Lowney), ODC File No. 25-147 (Tipp), and a distinct POST certification complaint. The repository already publishes an anonymized report, [When a Disciplinary Complaint Closes](../gitbook-export/transparency-and-public-understanding-attorney-discipline.md), dated September 22, 2026. That report was not overwritten: its canonical URL, navigation entry, and publication history are preserved, and it remains live. The new analysis was published as a separate page because it makes named-case findings that the anonymized report deliberately avoids. The two cross-link each other.

Canonical URL of the new page: `https://www.ywcaofmissoula.com/research-reports-legal-advocacy-and-analysis/montana-state-institutional-failures/when-a-complaint-closes`.

## What the record supports

ODC dismissed the Lowney grievance on June 9, 2026 on a limitations rationale, stating that "your charges happened in 2019" beyond the six-year period and that no facts supporting tolling or an exception were alleged. That is a genuine threshold ground and not a merits determination. The Commission on Practice affirmed on October 23, 2026, stating that the facts did not demonstrate clear and convincing evidence of ethical violations. The two letters state different rationales, and neither explains allegation by allegation how the grounds were applied to the grievance's asserted later conduct. See the [June 9 notice](../gitbook-export/montana-bar-complaints/odc-26-145-rejection-brian-lowney-june-9-2026.md) and the [evidence ledger](../gitbook-export/montana-bar-complaints/odc-review-evidence-ledger-2026.md).

Nuno's November 4, 2026, 1:34 p.m. request asked ODC to identify the document and passage stating the facts and reasons, to send a copy if the explanation was separate, and, if the existing notice sufficed, to identify the language addressing his allegation that prosecutorial leniency was conditioned on removing or refraining from protected speech. He disclaimed an automatic entitlement to every internal document, every investigative step, or a separate answer to every legal question. Chief Disciplinary Counsel Pamela D. Bucy responded on November 5, 2026, at 8:14 a.m.: "Our dismissal correspondence explained our reasoning for dismissal. You will not be receiving any additional information from us regarding our work." She directed Nuno to Supreme Court review and added, "Please refrain from further correspondence with us." The reply **answered** the request by asserting that the prior correspondence was sufficient; it did not identify the requested passage or address the application of the 2019 premise to the pleaded later conduct. Nothing in the exchange establishes that no reasons were given, that no investigation occurred, or that no further analysis exists inside the confidential file.

ODC's June notice cites Rule 11(D) for an exception; in the court-adopted 2021 text, Rule 11(D) concerns repose and Rule 11(E) contains the exceptions, and Rule 11(A) addresses the time limit for filing a formal disciplinary Complaint rather than lodging a grievance. The article reports the citation discrepancy and states that it does not by itself invalidate the disposition. The Commission's review instructions also differ from court-adopted Rule 14(A) as to addressee and timing trigger; the article reports the difference and declines to calculate any deadline.

The Tipp file is separate. ODC's November 3, 2025 determination contained substantive Rule 1.1–1.4 analysis, accepted the defense account of limitations advice and encouragement to seek outside counsel, and found no violation within the criminal engagement. Its July 2026 letters said supplemental submissions did not change the earlier analysis and described them as additional examples of "strategy"; they do not name the two exhibits or explain how each fit that category. The Supreme Court affirmed the Commission disposition on procedural grounds, treating the request as untimely and seeking clarification rather than merits review. The article preserves the distinction between a stated ground that is traceable and one that is not, without treating unread exhibits or absent merits findings as findings.

POST is a separate administrative track. Its August 13, 2025 response said the director reviewed the complaint information, that most issues were outside its purview, and that allegations more than five years old generally would not be investigated except in limited circumstances; its August 27 message expressly closed the matter. The published allegation policy lists an ongoing pattern beginning more than five years before receipt as a possible exception to the general five-year limit. May 2026 correspondence pointed to the rules and policy and maintained that reasons had been given, without allocating each alleged act to a ground. On June 2, staff identified a Case Status Committee route to review the director's determination upon a non-anonymous request. The reviewed chain does not show a request, an outcome, or the operative August 2025 rule and policy editions.

## What the article deliberately does not claim

- It does not claim ODC gave no reasons, conducted no investigation, withheld reasons, or concealed anything.
- It does not treat the November 5 email as a new disposition, or as anything concerning the separate Tipp matter.
- It does not allege intent, concealment, coordination, or deliberate protection of misconduct; the criticism is directed at documented action and its practical effect.
- It does not declare a proven rule violation. No controlling interpretation of the required specificity of dismissal reasons was verified, and the recommendations are labeled editorial, not legal duties.
- It does not apply later rule amendments retroactively: the 2021 court-adopted rules govern the 2025–26 notices, and the July 2026 amendments are generally effective January 1, 2027.

## Files changed and publication scope

- `gitbook-export/when-a-complaint-closes.md`: the new analysis, with frontmatter, report masthead, timeline, source-linked sections, and limits.
- `gitbook-export/SUMMARY.md`: one navigation entry under Montana State Institutional Failures.
- `gitbook-export/research-reports-legal-advocacy-and-analysis/montana-state-institutional-failures.md`: one hub link with a scope descriptor.
- `editorial/when-a-complaint-closes-review-2026-11-05.md`: this memo.

The refined draft is also retained outside the publication tree at the owner-requested working location, and its body was verified byte-identical to the published body at commit time. The unredacted November 4–5 source PDF, the prior editorial drafts, and the verification appendix were deliberately not copied into `gitbook-export/`; the verification appendix was removed from reader-facing copy and its content is summarized here.

## Verification performed

Site validator reported 0 errors; the validator test suite reported 16 passed; `git diff --check` and the staged-diff check were clean. All 24 external links in the published article returned HTTP 200, including the three raw PDF assets. The final staged diff contained only the three publication-tree files. After the push, the remote `refs/heads/main` matched the local HEAD, the "Validate site content" workflow run for that commit succeeded, the new URL was present in the live sitemap and returned HTTP 200, the live `.md` variant carried the masthead and both Bucy quotations with no drafting or approval language, and the live HTML rendered a single H1 with the frontmatter description appearing once in the body.
