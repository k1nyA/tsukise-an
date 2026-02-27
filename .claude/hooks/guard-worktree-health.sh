#!/usr/bin/env bash
# Guard: Block high-risk commands when worktree metadata is unhealthy.
# PreToolUse hook for Bash commands.
set -euo pipefail

INPUT="$(cat)"
COMMAND="$(
  printf '%s' "$INPUT" | python3 -c '
import json
import sys

try:
    payload = json.load(sys.stdin)
except Exception:
    print("")
    raise SystemExit(0)

print(payload.get("tool_input", {}).get("command", ""))
' 2>/dev/null || echo ""
)"

if [[ -z "$COMMAND" ]]; then
  exit 0
fi

is_high_risk=false
if printf '%s' "$COMMAND" | grep -qE '(^|[;&|()[:space:]])gh[[:space:]]+pr[[:space:]]+(create|merge)([[:space:]]|$)'; then
  is_high_risk=true
fi
if printf '%s' "$COMMAND" | grep -qE '(^|[;&|()[:space:]])git[[:space:]]+push([[:space:]]|$)'; then
  is_high_risk=true
fi
if printf '%s' "$COMMAND" | grep -qE '(^|[;&|()[:space:]])git[[:space:]]+(merge|rebase|cherry-pick)([[:space:]]|$)'; then
  is_high_risk=true
fi
if printf '%s' "$COMMAND" | grep -qE '(^|[;&|()[:space:]])git[[:space:]]+reset[[:space:]]+--hard([[:space:]]|$)'; then
  is_high_risk=true
fi
if printf '%s' "$COMMAND" | grep -qE '(^|[;&|()[:space:]])git[[:space:]]+clean([[:space:]]|$)'; then
  is_high_risk=true
fi

if [[ "$is_high_risk" != true ]]; then
  exit 0
fi

PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
WORKTREES_DIR="$PROJECT_ROOT/.claude/worktrees"

# Detect recursive/nested checked-out repos under .claude/worktrees.
nested_worktrees=""
if [[ -d "$WORKTREES_DIR" ]]; then
  nested_worktrees="$(
    find "$WORKTREES_DIR" -mindepth 3 -type d -path '*/.claude/worktrees' -print -quit 2>/dev/null || true
  )"
fi

if [[ -n "$nested_worktrees" ]]; then
  echo "BLOCKED: nested .claude/worktrees detected." >&2
  echo "  Nested path: $nested_worktrees" >&2
  echo "  Command: $COMMAND" >&2
  echo "  Resolve recursive worktrees before running high-risk commands." >&2
  exit 2
fi

if ! WORKTREE_LIST="$(git -C "$PROJECT_ROOT" worktree list --porcelain 2>/dev/null)"; then
  echo "BLOCKED: could not read 'git worktree list'." >&2
  echo "  Command: $COMMAND" >&2
  echo "  Verify repository health, then retry." >&2
  exit 2
fi

declare -a missing_paths=()
while IFS= read -r line; do
  case "$line" in
    worktree\ *)
      path="${line#worktree }"
      if [[ ! -d "$path" ]]; then
        missing_paths+=("$path")
      fi
      ;;
  esac
done <<<"$WORKTREE_LIST"

if [[ "${#missing_paths[@]}" -gt 0 ]]; then
  echo "BLOCKED: git worktree list contains missing paths." >&2
  echo "  Command: $COMMAND" >&2
  for missing in "${missing_paths[@]}"; do
    echo "  Missing: $missing" >&2
  done
  echo "  Run 'git worktree prune' (and cleanup) before high-risk commands." >&2
  exit 2
fi

exit 0
