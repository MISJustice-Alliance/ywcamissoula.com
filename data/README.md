# MPD complaint data — methodology and column definitions

> These files are in the repository only. GitBook does not publish `data/`.
> The published analysis is [MPD Civilian Complaint Scorecard & Accountability Analysis (2016–2022)](https://www.ywcaofmissoula.com/research-reports-legal-advocacy-and-analysis/missoula-police-department/mpd-civilian-complaint-scorecard-analysis).
> Open questions about these numbers are in [`../DATA_ISSUES.md`](../DATA_ISSUES.md).

## Value status labels

| Label | Meaning |
| --- | --- |
| `reported` | The number appears in the cited source. |
| `derived` | The number is calculated from other numbers. It does not appear in any source. |
| `unconfirmed` | Not checked against a primary record (for example, a disposition record from MPD). |
| blank cell | Not reported by any source in this repository. Not zero. |

## Units

| Unit | Meaning |
| --- | --- |
| **complaint** | One civilian complaint, as counted by Police Scorecard or NBC Montana. |
| **allegation** | One alleged policy violation. One complaint or incident can contain several allegations. MPD's 2021 and 2022 annual reports count allegations. |
| **incident** | One event that produced one or more allegations (MPD 2021: 40 incidents; MPD 2022: 35 incidents, per the scorecard analysis). |
| **sustained** | A disposition that found the conduct occurred and violated policy. |

Do not add or subtract allegation counts and complaint counts. They are different units.

## Files

### `mpd_annual_complaints_2016_2022.csv`

| Column | Definition |
| --- | --- |
| `year` | Calendar year. |
| `complaints_filed` | A count. **Its unit is in `measure`.** The column name is historical: for 2021 and 2022 the value is an allegation count, not a complaint count. |
| `sustained_count` | Number of sustained dispositions, where a source reports it. |
| `data_confirmed` | `True` = taken from the cited source. `False` = derived, or a different unit. |
| `source` | The source, or how the value was derived. |
| `sustain_rate_pct` | `sustained_count ÷ complaints_filed × 100`, rounded. Derived. |
| `measure` | `complaints` or `allegations`. |
| `value_status` | `reported` or `derived` (see above). |

Rows 2016 and 2020 are **derived** and **not reliable**. See issues D1 and D2 in `DATA_ISSUES.md`.

### `mpd_complaint_categories.csv`

Totals by category across 2016–2022 from Police Scorecard. `Other/General Misconduct` sustained = 56 is **derived** (16% × 349 ≈ 56). It is valid only if "16%" is a rate. See issue D3.

### `Interpretation-SustainedCount-SustainRate-Narrativ.csv`

The two readings of the Police Scorecard "16%" figure. Neither is confirmed. See issue D3.

### `mpd_vs_national_benchmark.csv`

Sustain rates for comparison. `MPD Overall` = 16.0 depends on the same "rate" reading (issue D3). The DOJ BJS 8% figure applies to large departments (1,000+ officers); MPD has about 114 sworn officers, per the scorecard analysis.

### `mpd_uof_incidents.csv`

Use-of-force incidents and calls for service from MPD's 2021 and 2022 annual reports. `uof_pct_of_calls` is derived.

### `complaint_disposition_definitions.csv`

Plain-language definitions of disposition labels used in the analysis.
