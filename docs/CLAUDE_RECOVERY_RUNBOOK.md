# Claude Local Recovery Runbook

Last updated: 2026-02-26

Related issue: `#226`

## 1. Goal
- Recover quickly from local Claude execution failures.
- Keep Phase execution traceable and restartable.

## 2. Normal state definition
All items below should be true:
- `npm run preflight:claude` passes
- `git status --short --branch` is clean on the intended branch
- GitHub has no stale Open PRs for completed tasks
- `claude` starts without file descriptor errors

## 3. Preflight before starting work
Run this from repo root:

```bash
npm run preflight:claude
```

If it fails, fix the reported item first.

## 4. Incident A: working directory missing
Symptom example:

```text
Working directory \".../tsukise-an\" no longer exists
```

Recovery:

```bash
cd ~/Desktop/claude/TestPlayground/PencilTest

# If repo directory exists, use clean worktree
git -C tsukise-an fetch origin
git -C tsukise-an worktree add tsukise-an-clean-main origin/main
cd tsukise-an-clean-main

# If repo directory does not exist, re-clone
git clone git@github.com:k1nyA/tsukise-an.git
cd tsukise-an
```

Then:

```bash
npm run preflight:claude
```

## 5. Incident B: low max file descriptors
Symptom example:

```text
error: An unknown error occurred, possibly due to low max file descriptors (Unexpected)
Current limit: 256
```

Recovery (current shell):

```bash
ulimit -n 65536
ulimit -n
```

Persist for zsh:

```bash
echo 'ulimit -n 65536' >> ~/.zshrc
exec zsh
ulimit -n
```

If still blocked:

```bash
sudo launchctl limit maxfiles 65536 200000
```

Then retry:

```bash
npm run preflight:claude
claude --dangerously-skip-permissions
```

## 6. Incident C: stale/missing worktree metadata
Symptom:
- preflight reports missing worktree paths

Recovery:

```bash
git worktree prune
git worktree list
npm run preflight:claude
```

## 7. Safety checklist before destructive git ops
Before `reset --hard`, branch cleanup, or worktree removal:
- Save diff patch for WIP files
- `git stash push -u -m "<message>"`
- Confirm target repo with `gh repo view --json nameWithOwner -q .nameWithOwner`
- Prefer explicit `-R k1nyA/tsukise-an` in `gh` write commands

## 8. Handover note template
When stopping mid-phase, record:
- Current branch and cleanliness (`git status --short --branch`)
- Open PR numbers and merge status
- Next issue to start
- Incident links (`#226`) and recovery status
