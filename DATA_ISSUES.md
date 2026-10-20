# Open data issues — MPD complaint statistics

> This file is outside `gitbook-export/`, so GitBook does not publish it.
> Status: all open. No values were changed. Each issue needs a primary source or an editorial decision.
> Found during the 2026-10-20 SEO/GEO/AEO audit (`SEO_GEO_AEO_FINDINGS.md` §5).

## D1 — 2016 and 2020 complaint counts are underdetermined

- **Where:** `data/mpd_annual_complaints_2016_2022.csv` rows 2016 (46) and 2020 (53); `mpd-civilian-complaint-scorecard-analysis.md` "Cleaning Steps" step 1.
- **Problem:** one total (349 − 250 = 99) is split into two years. The page says the split is "estimated proportionally" but does not say proportional to what. One equation cannot set two unknowns.
- **Needed:** per-year counts from MPD or Police Scorecard, or a stated split method.
- **Interim rule:** show 2016 and 2020 only as a combined "2016 + 2020" value, or mark them as estimates wherever they appear.

## D2 — The 99 residual mixes units

- **Where:** same step 1.
- **Problem:** the residual subtracts the 2021 (78) and 2022 (90) **allegation** counts from a total of 349 **complaints**. Step 3 on the same page says these allegation counts are "not directly added to the confirmed complaint totals." The two steps conflict. The page also reports 40 incidents (2021) and 35 incidents (2022). If incidents were the right unit, the residual would be 349 − (24 + 32 + 26 + 40 + 35) = 192.
- **Needed:** confirm what Police Scorecard counts as a "complaint," and whether the 349 total includes 2021 and 2022.
- **Interim rule:** do not publish per-year values for 2016 and 2020 as complaint counts.

## D3 — "16%": rate or count

- **Where:** `data/Interpretation-SustainedCount-SustainRate-Narrativ.csv`; `data/mpd_complaint_categories.csv` (56 derived); `data/mpd_vs_national_benchmark.csv` (16.0).
- **Problem:** Police Scorecard text says "16% were ruled in favor of civilians." Read as a rate, that is about 56 sustained findings of 349. A separate brief reads it as 16 findings (4.6%). The two readings put MPD above or below the 8% DOJ benchmark.
- **Needed:** the Police Scorecard source data or MPD disposition records (public-records request).
- **Pages that state "16%" without the qualifier** (editorial review, not changed):
  - `Structural_Failure_of_Police_Accountability_in_Montana_From_MPD_to_POST.md`
  - `policy-analysis-memorandum-addressing-opacity-problem-missoula-police-record-keeping.md`
  - `institutional-willful-blindness-pattern-analysis.md`
  - `additional-evidence-and-documentation/missoula-1983-misconduct-mpd-prosecutors-ywca-of-missoula-expanded-history/README.md`
- **Pages that already state both readings:** `mpd-civilian-complaint-scorecard-analysis.md`, `oversight-evaluation-report-…-2016-2022.md`, `missoula-police-oversight-students-guide-…md`.

## D4 — Dataset landing pages are not tabular datasets

- **Where:** `gitbook-export/datasets/dataset-*.md`.
- **Problem:** the pages are indexes of allegations and records. They do not have a downloadable machine-readable file, a license, or an update date. Schema.org `Dataset` markup would not match the visible content.
- **Decision needed:** keep them as indexes (no Dataset markup), or publish a real CSV for the MPD statistics with a landing page, license, and update date.
