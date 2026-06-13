---
title: Deployment lint root cause for commit e838dd8
description: >-
  Evidence note for the first markdownlint failure introduced by commit
  e838dd87520b76a46ca85c6880474ca948b61c99.
---

# Deployment lint root cause for commit e838dd8

This note documents the first markdownlint failure introduced by commit
`e838dd87520b76a46ca85c6880474ca948b61c99` before the repo-local `.mdlrc`
override was added.

## First failing file

- `gitbook-export/2015-2016-seattle-case-related-civil-rights-violations.md`

## First rule reported in a clean default `mdl` run

- `MD012 Multiple consecutive blank lines` at line 15

## Other failures in the same file

- `MD032 Lists should be surrounded by blank lines` at lines 8 and 12
- `MD013 Line length` at lines 18 and 29
- `MD047 File should end with a single newline character` at line 33

## Why this is the first deployment failure

That file is the first Markdown file in the commit’s changed-file order.
With the default markdownlint ruleset, it is the first file that emits a
failure, and the first reported rule in that file is `MD012`.

## Commit context

The commit also rewrote the same file’s frontmatter, moving `description`
after `tags` and leaving the YAML list in a position that trips markdownlint
when front matter is not ignored.
