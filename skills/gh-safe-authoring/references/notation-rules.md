# Notation Rules

## Markdown formatting

- Use ATX headings (`##`, `###`) only.
- Use `-` for unordered bullets (do not mix `*` or `+`).
- Insert one blank line between sections.
- Keep heading text fixed by template; do not rename ad hoc.

## Text normalization

- Trim leading and trailing spaces for each list item.
- Deduplicate repeated bullet lines inside the same section.
- Normalize issue references to `#<number>`.
- Keep one sentence per bullet when possible.

## Code/style tokens

- Wrap paths (`src/app/page.tsx`), commands (`npm run build`), and identifiers (`metadata`) in backticks.
- Do not wrap full Japanese sentences in backticks.

## Safety rules for `gh`

- Forbidden: `gh issue create --body "..."`
- Forbidden: `gh pr create --body "..."`
- Required: `--body-file <path>`
- Fallback must use single-quoted heredoc: `<<'EOF'`
