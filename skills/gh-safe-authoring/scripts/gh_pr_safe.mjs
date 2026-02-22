#!/usr/bin/env node

import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

function parseArgs(argv) {
  const [command, ...rest] = argv;
  if (!command || !["validate", "render", "create", "edit"].includes(command)) {
    fail(
      "Usage: gh_pr_safe.mjs <validate|render|create|edit> --spec <file.json> [--repo owner/repo] [--pr 123] [--out /path/body.md] [--dry-run]"
    );
  }
  const options = { command, dryRun: false };
  for (let i = 0; i < rest.length; i += 1) {
    const token = rest[i];
    if (token === "--dry-run") {
      options.dryRun = true;
      continue;
    }
    if (!token.startsWith("--")) fail(`Unknown argument: ${token}`);
    const key = token.slice(2);
    const value = rest[i + 1];
    if (!value || value.startsWith("--")) fail(`Missing value for --${key}`);
    options[key] = value;
    i += 1;
  }
  if (!options.spec) fail("--spec is required");
  return options;
}

function ensureString(value, fieldName, required = false) {
  if (value == null || value === "") {
    if (required) fail(`${fieldName} is required`);
    return undefined;
  }
  if (typeof value !== "string") fail(`${fieldName} must be a string`);
  return value.trim();
}

function ensureStringArray(value, fieldName, required = false) {
  if (value == null) {
    if (required) fail(`${fieldName} is required`);
    return [];
  }
  if (!Array.isArray(value)) fail(`${fieldName} must be an array`);
  const normalized = [];
  const seen = new Set();
  for (const raw of value) {
    if (typeof raw !== "string") fail(`${fieldName} must contain only strings`);
    const item = raw.trim();
    if (!item) continue;
    if (!seen.has(item)) {
      seen.add(item);
      normalized.push(item);
    }
  }
  if (required && normalized.length === 0) fail(`${fieldName} must not be empty`);
  return normalized;
}

function normalizeIssueRef(raw) {
  if (typeof raw === "number") return `#${raw}`;
  const value = String(raw).trim();
  if (!value) return value;
  const compact = value.replace(/\s+/g, "");
  if (/^#?\d+$/.test(compact)) {
    return `#${compact.replace(/^#/, "")}`;
  }
  return value;
}

function parsePrNumber(raw) {
  const value = Number.parseInt(String(raw), 10);
  if (!Number.isFinite(value) || value <= 0) fail("--pr must be a positive integer");
  return value;
}

function loadSpec(specPath) {
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(specPath, "utf8"));
  } catch (error) {
    fail(`Invalid JSON in spec file ${specPath}: ${error.message}`);
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    fail("Spec root must be an object");
  }
  return parsed;
}

function validatePrSpec(spec) {
  const title = ensureString(spec.title, "title", true);
  if (title.length > 256) fail("title must be 256 chars or less");

  const repo = ensureString(spec.repo, "repo", false);
  if (repo && !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo)) {
    fail("repo must be in owner/name format");
  }

  const base = ensureString(spec.base, "base", true);
  const head = ensureString(spec.head, "head", true);

  const labels = ensureStringArray(spec.labels, "labels", false);
  const reviewers = ensureStringArray(spec.reviewers, "reviewers", false);
  const assignees = ensureStringArray(spec.assignees, "assignees", false);

  const sections = spec.sections;
  if (!sections || typeof sections !== "object" || Array.isArray(sections)) {
    fail("sections must be an object");
  }

  const summary = ensureStringArray(sections.summary, "sections.summary", true);
  const changes = ensureStringArray(sections.changes, "sections.changes", true);
  const testing = ensureStringArray(sections.testing, "sections.testing", true);
  const reviewFocus = ensureStringArray(sections.reviewFocus, "sections.reviewFocus", true);
  const risks = ensureStringArray(sections.risks, "sections.risks", false);

  const relatedRaw = sections.relatedIssues ?? [];
  if (!Array.isArray(relatedRaw)) fail("sections.relatedIssues must be an array");
  const relatedIssues = relatedRaw
    .map((v) => normalizeIssueRef(v))
    .filter((v) => Boolean(v));

  const notes = ensureStringArray(sections.notes, "sections.notes", false);

  return {
    title,
    repo,
    base,
    head,
    labels,
    reviewers,
    assignees,
    sections: {
      summary,
      changes,
      testing,
      reviewFocus,
      risks,
      relatedIssues,
      notes,
    },
  };
}

function renderBulletList(items) {
  return items.map((item) => `- ${item}`);
}

function pushSection(lines, title, items) {
  if (!items || items.length === 0) return;
  lines.push(`## ${title}`);
  lines.push(...renderBulletList(items));
  lines.push("");
}

function renderPrBody(spec) {
  const lines = [];
  const { sections } = spec;

  pushSection(lines, "Summary", sections.summary);
  pushSection(lines, "Changes", sections.changes);
  pushSection(lines, "Testing", sections.testing);
  pushSection(lines, "Review Focus", sections.reviewFocus);
  pushSection(lines, "Risks", sections.risks);
  pushSection(lines, "Related Issues", sections.relatedIssues);
  pushSection(lines, "Notes", sections.notes);

  const body = lines.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd();
  return `${body}\n`;
}

function runGhCommand(args) {
  const result = spawnSync("gh", args, { encoding: "utf8" });
  if (result.stdout?.trim()) process.stdout.write(`${result.stdout.trim()}\n`);
  if (result.stderr?.trim()) process.stderr.write(`${result.stderr.trim()}\n`);
  if (result.status !== 0) {
    fail(`gh command failed: gh ${args.join(" ")}`);
  }
}

function writeBody(body, outPath) {
  if (outPath) {
    writeFileSync(outPath, body, "utf8");
    return { bodyPath: outPath, tempDir: null };
  }
  const tempDir = mkdtempSync(path.join(tmpdir(), "gh-pr-safe-"));
  const bodyPath = path.join(tempDir, "pr-body.md");
  writeFileSync(bodyPath, body, "utf8");
  return { bodyPath, tempDir };
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const specRaw = loadSpec(options.spec);
  const spec = validatePrSpec(specRaw);
  const body = renderPrBody(spec);

  if (options.command === "validate") {
    console.log("OK: pr spec is valid.");
    return;
  }

  if (options.command === "render") {
    if (options.out) {
      writeFileSync(options.out, body, "utf8");
      console.log(`Rendered to ${options.out}`);
      return;
    }
    process.stdout.write(body);
    return;
  }

  const repo = ensureString(options.repo, "repo", false) ?? spec.repo;
  if (!repo) fail("repo is required (set --repo or spec.repo)");

  const { bodyPath, tempDir } = writeBody(body, options.out);
  try {
    if (options.dryRun) {
      console.log(`DRY RUN: body file => ${bodyPath}`);
      process.stdout.write(body);
      return;
    }

    if (options.command === "create") {
      const args = [
        "pr",
        "create",
        "--repo",
        repo,
        "--title",
        spec.title,
        "--base",
        spec.base,
        "--head",
        spec.head,
        "--body-file",
        bodyPath,
      ];
      for (const label of spec.labels) {
        args.push("--label", label);
      }
      for (const reviewer of spec.reviewers) {
        args.push("--reviewer", reviewer);
      }
      for (const assignee of spec.assignees) {
        args.push("--assignee", assignee);
      }
      runGhCommand(args);
      return;
    }

    const prNumber = parsePrNumber(options.pr);
    const args = [
      "pr",
      "edit",
      String(prNumber),
      "--repo",
      repo,
      "--title",
      spec.title,
      "--base",
      spec.base,
      "--body-file",
      bodyPath,
    ];
    for (const label of spec.labels) {
      args.push("--add-label", label);
    }
    for (const assignee of spec.assignees) {
      args.push("--add-assignee", assignee);
    }
    runGhCommand(args);
  } finally {
    if (!options.out && tempDir) {
      rmSync(tempDir, { recursive: true, force: true });
    }
  }
}

main();
