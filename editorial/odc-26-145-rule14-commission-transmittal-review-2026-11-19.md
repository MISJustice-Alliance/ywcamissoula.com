# ODC 26-145 Rule 14 Commission transmittal: editorial review

Review cutoff: November 19, 2026. This is an internal editorial memo in the repository root, not a GitBook page. The published article is `gitbook-export/montana-bar-complaints/request-for-discretionary-review-montana-supreme-court-odc-26-145-brian-lowney.md`. The public submission record is the privacy-and-scope-redacted two-page PDF in `gitbook-export/.gitbook/assets/odc-26-145-rule14-request-submission-email-november-19-2026-public-copy-privacy-and-scope-redactions.pdf`. The unredacted source email and working notes stay outside the publication tree; this memo carries no private addresses or file paths.

Canonical URL: `https://www.ywcaofmissoula.com/odc-lowney-grievance-2026/request-for-discretionary-review-montana-supreme-court-odc-26-145-brian-lowney`.

## Scope decision

The article records a November 19, 2026 sent-email copy addressed to Dia Lang, Office Administrator, Commission on Practice of the Supreme Court of the State of Montana. Nuno asks the Commission to transmit a Rule 14 request and file to the Montana Supreme Court. A Supreme Court Clerk-return account that appeared in earlier unpublished drafts is not in this publication. The sent copy is treated as a primary record of the sender's message and listed filenames only. It does not establish Commission receipt, forwarding, docketing, discretionary review, or a Court ruling.

The listed attachments (signed request, memorandum, transmittal letter, proposed exhibit index, and an archive named Exhibits A–H) are not in Git. Their filenames do not prove contents or that they were opened.

## What the record supports

- The public PDF is a two-page raster rebuild of the sent-email printout. SHA-256 `7b4d7fea38e9981dac11105a0c1c264538497f89201cea10eae23bfae7973b51`. It has no searchable text layer, DocInfo, XMP, Producer/Creator/Author dates, annotations, or embedded files.
- Opaque blocks cover the Gmail account header, sender-account header, a Clerk-response paragraph outside this article's scope, and the signature/contact block. Dia Lang, the Commission addressee, the November 19, 2026 date, the official COP@mt.gov address, and the enclosure list remain.
- ODC dismissed File No. 26-145 on June 9, 2026 on a Rule 11 limitations rationale. The Commission Review Panel affirmed on October 23, 2026 on a different, clear-and-convincing-evidence rationale. Those existing public pages are unchanged except for the index/navigation pointers.
- Court-adopted MRLDE Rule 14(A) (Oct. 12, 2021) says a request in writing to the Supreme Court within thirty days of the notice being sent. The Panel notice and ODC FAQ describe a Commission addressee and, in the FAQ, a 35-day period. The article reports the discrepancy and does not calculate timeliness.

## What the article deliberately does not claim

- It does not treat the sent email as a Supreme Court filing, an accepted transmittal, or a ruling.
- It does not republish the request, memorandum, exhibit index, Exhibits A–H, or a signed January 2021 dismissal order.
- It does not present grievance allegations as findings.

## Files changed and publication scope

- `gitbook-export/montana-bar-complaints/request-for-discretionary-review-montana-supreme-court-odc-26-145-brian-lowney.md`
- `gitbook-export/montana-bar-complaints/odc-lowney-grievance-index.md`
- `gitbook-export/SUMMARY.md` — one navigation entry: "Rule 14 review request emailed to Commission — ODC File No. 26-145 (Brian C. Lowney)"
- `gitbook-export/.gitbook/assets/odc-26-145-rule14-request-submission-email-november-19-2026-public-copy-privacy-and-scope-redactions.pdf`
- `editorial/odc-26-145-rule14-commission-transmittal-review-2026-11-19.md` — this memo

## Verification performed

- `/usr/bin/python3 tools/validate_site.py gitbook-export` — 0 errors
- `/usr/bin/python3 -m pytest tools/tests/test_validate_site.py -q` — 16 passed
- PDF container, OCR, and visual review of the exact public bytes before staging
