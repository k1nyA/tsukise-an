#!/usr/bin/env bash
# Guard: Enforce design contract checks before PR create/merge.
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

# Run only for gh pr create/merge (including chained shell commands).
if ! printf '%s' "$COMMAND" | grep -qE '(^|[;&|()[:space:]])gh[[:space:]]+pr[[:space:]]+(create|merge)([[:space:]]|$)'; then
  exit 0
fi

PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
CHECK_SCRIPT="$PROJECT_ROOT/scripts/check-design-contract.mjs"

if [[ ! -f "$CHECK_SCRIPT" ]]; then
  echo "BLOCKED: design contract checker is missing." >&2
  echo "  Expected file: $CHECK_SCRIPT" >&2
  echo "  Command: $COMMAND" >&2
  exit 2
fi

if ! CHECK_OUTPUT="$(cd "$PROJECT_ROOT" && node "$CHECK_SCRIPT" 2>&1)"; then
  echo "BLOCKED: design contract check failed." >&2
  echo "  Command: $COMMAND" >&2
  echo "  Fix issues and re-run: node scripts/check-design-contract.mjs" >&2
  if [[ -n "$CHECK_OUTPUT" ]]; then
    printf '%s\n' "$CHECK_OUTPUT" >&2
  fi
  exit 2
fi

exit 0
