#!/usr/bin/env bash
set -euo pipefail

MIN_FD="${CLAUDE_MIN_FD:-65536}"
EXPECTED_REPO="${CLAUDE_EXPECTED_REPO:-k1nyA/tsukise-an}"

errors=0
warnings=0

ok() {
  printf '[OK] %s\n' "$1"
}

warn() {
  printf '[WARN] %s\n' "$1"
  warnings=$((warnings + 1))
}

fail() {
  printf '[FAIL] %s\n' "$1"
  errors=$((errors + 1))
}

printf '== Claude Preflight ==\n'

if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  ok "git worktree detected"
else
  fail "current directory is not inside a git worktree: $PWD"
fi

if [ -d "$PWD" ]; then
  ok "current directory exists: $PWD"
else
  fail "current directory does not exist: $PWD"
fi

if command -v gh >/dev/null 2>&1; then
  current_repo="$(gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || true)"
  if [ -z "$current_repo" ]; then
    warn "gh repo context could not be detected. Use -R for write operations."
  elif [ "$current_repo" = "$EXPECTED_REPO" ]; then
    ok "gh repo context is $current_repo"
  else
    fail "gh repo context is $current_repo (expected: $EXPECTED_REPO). Use -R."
  fi
else
  warn "gh command not found"
fi

fd_limit="$(ulimit -n 2>/dev/null || echo unknown)"
if [ "$fd_limit" = "unlimited" ]; then
  ok "ulimit -n is unlimited"
elif [ "$fd_limit" = "unknown" ]; then
  warn "ulimit -n could not be read"
elif [ "$fd_limit" -ge "$MIN_FD" ]; then
  ok "ulimit -n is $fd_limit (>= $MIN_FD)"
else
  fail "ulimit -n is $fd_limit (< $MIN_FD). Run: ulimit -n $MIN_FD"
fi

if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  missing_count=0
  while IFS= read -r wt_path; do
    if [ ! -d "$wt_path" ]; then
      warn "missing worktree path in metadata: $wt_path"
      missing_count=$((missing_count + 1))
    fi
  done < <(git worktree list --porcelain | awk '/^worktree /{print substr($0,10)}')

  if [ "$missing_count" -eq 0 ]; then
    ok "all worktree paths exist"
  else
    fail "worktree metadata includes missing path(s). Run: git worktree prune"
  fi
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  warn "working tree has uncommitted changes"
else
  ok "working tree is clean"
fi

if [ "$errors" -gt 0 ]; then
  printf '\nPreflight failed: %s error(s), %s warning(s)\n' "$errors" "$warnings"
  exit 1
fi

printf '\nPreflight passed: 0 error(s), %s warning(s)\n' "$warnings"
