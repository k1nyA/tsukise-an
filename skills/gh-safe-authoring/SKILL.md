---
name: gh-safe-authoring
description: Safely create or edit GitHub Issues and Pull Requests from structured spec files while preventing markdown corruption. Use when Codex must open or update issues/PRs, enforce consistent notation, avoid shell-expansion bugs from inline --body usage, or standardize Japanese/English GitHub text formatting.
---

# Gh Safe Authoring

Use this skill to publish GitHub Issue and PR bodies without formatting collapse.

## Quick Start

1. Choose a spec type:
- Issue: `references/issue-spec.schema.json`
- PR: `references/pr-spec.schema.json`
2. Validate the spec:
- `node skills/gh-safe-authoring/scripts/gh_issue_safe.mjs validate --spec <file.json>`
- `node skills/gh-safe-authoring/scripts/gh_pr_safe.mjs validate --spec <file.json>`
3. Preview markdown:
- `node skills/gh-safe-authoring/scripts/gh_issue_safe.mjs render --spec <file.json>`
- `node skills/gh-safe-authoring/scripts/gh_pr_safe.mjs render --spec <file.json>`
4. Publish safely with `--body-file` (never inline `--body`):
- `node skills/gh-safe-authoring/scripts/gh_issue_safe.mjs create --spec <file.json> --repo <owner/repo>`
- `node skills/gh-safe-authoring/scripts/gh_pr_safe.mjs create --spec <file.json> --repo <owner/repo>`

## Guardrails

- Always pass body content via file (`--body-file`).
- Keep heading order fixed to reduce review noise.
- Use one bullet style (`-`) and one issue reference style (`#123`).
- Wrap paths/commands/code identifiers in backticks.
- Keep markdown source in UTF-8 + LF.
- Normalize before publish; do not handcraft multiline shell strings.

## Canonical Section Order

### Issue

1. `親Issue` (optional)
2. `## 背景`
3. `## 目的`
4. `## スコープ`
5. `## 依存関係` (optional)
6. `## 重要ルール` (optional)
7. `## TDD` (`### Red` / `### Green` / `### Refactor`)
8. `## 初期Wave案` (optional)
9. `## 完了条件`
10. `## 備考` (optional)

### Pull Request

1. `## Summary`
2. `## Changes`
3. `## Testing`
4. `## Review Focus`
5. `## Risks` (optional)
6. `## Related Issues` (optional)
7. `## Notes` (optional)

## Manual Fallback

Use single-quoted heredoc and `--body-file`:

```bash
cat > /tmp/body.md <<'EOF'
## Summary
- Safe markdown
EOF
gh pr edit 123 --body-file /tmp/body.md
rm -f /tmp/body.md
```

## Resources

- Script (Issue): `scripts/gh_issue_safe.mjs`
- Script (PR): `scripts/gh_pr_safe.mjs`
- Rules: `references/notation-rules.md`
- Failure cases: `references/failure-cases.md`
- Schemas: `references/issue-spec.schema.json`, `references/pr-spec.schema.json`
- Examples: `assets/examples/*.json`
