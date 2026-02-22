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
      "Usage: gh_issue_safe.mjs <validate|render|create|edit> --spec <file.json> [--repo owner/repo] [--issue 123] [--out /path/body.md] [--dry-run]"
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
    if (!value || value.startsWith("--")) {
      fail(`Missing value for --${key}`);
    }
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

function parseIssueNumber(raw) {
  const value = Number.parseInt(String(raw), 10);
  if (!Number.isFinite(value) || value <= 0) fail("--issue must be a positive integer");
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

function validateIssueSpec(spec) {
  const title = ensureString(spec.title, "title", true);
  if (title.length > 256) fail("title must be 256 chars or less");
  const repo = ensureString(spec.repo, "repo", false);
  if (repo && !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo)) {
    fail("repo must be in owner/name format");
  }
  const labels = ensureStringArray(spec.labels, "labels", false);

  let parentIssue;
  if (spec.parentIssue != null) {
    parentIssue = parseIssueNumber(spec.parentIssue);
  }

  const sections = spec.sections;
  if (!sections || typeof sections !== "object" || Array.isArray(sections)) {
    fail("sections must be an object");
  }

  let background;
  if (typeof sections.background === "string") {
    background = sections.background.trim();
  } else if (Array.isArray(sections.background)) {
    background = ensureStringArray(sections.background, "sections.background", false);
  }

  const purpose = ensureStringArray(sections.purpose, "sections.purpose", false);
  const scope = ensureStringArray(sections.scope, "sections.scope", true);
  const dependenciesRaw = sections.dependencies ?? [];
  if (!Array.isArray(dependenciesRaw)) fail("sections.dependencies must be an array");
  const dependencies = dependenciesRaw
    .map((v) => normalizeIssueRef(v))
    .filter((v) => Boolean(v));
  const rules = ensureStringArray(sections.rules, "sections.rules", false);
  const acceptance = ensureStringArray(sections.acceptance, "sections.acceptance", true);
  const notes = ensureStringArray(sections.notes, "sections.notes", false);

  let tdd;
  if (sections.tdd != null) {
    if (typeof sections.tdd !== "object" || Array.isArray(sections.tdd)) {
      fail("sections.tdd must be an object");
    }
    tdd = {
      red: ensureStringArray(sections.tdd.red, "sections.tdd.red", false),
      green: ensureStringArray(sections.tdd.green, "sections.tdd.green", false),
      refactor: ensureStringArray(sections.tdd.refactor, "sections.tdd.refactor", false),
    };
  }

  let wavePlan = [];
  if (sections.wavePlan != null) {
    if (!Array.isArray(sections.wavePlan)) fail("sections.wavePlan must be an array");
    wavePlan = sections.wavePlan.map((wave, index) => {
      if (typeof wave !== "object" || !wave || Array.isArray(wave)) {
        fail(`sections.wavePlan[${index}] must be an object`);
      }
      const name = ensureString(wave.name, `sections.wavePlan[${index}].name`, true);
      const items = ensureStringArray(wave.items, `sections.wavePlan[${index}].items`, true);
      return { name, items };
    });
  }

  return {
    title,
    repo,
    labels,
    parentIssue,
    sections: {
      background,
      purpose,
      scope,
      dependencies,
      rules,
      tdd,
      wavePlan,
      acceptance,
      notes,
    },
  };
}

function renderBulletList(items) {
  return items.map((item) => `- ${item}`);
}

function pushSection(lines, title, value) {
  if (value == null) return;
  if (Array.isArray(value) && value.length === 0) return;
  lines.push(`## ${title}`);
  if (Array.isArray(value)) {
    lines.push(...renderBulletList(value));
  } else {
    lines.push(value);
  }
  lines.push("");
}

function renderIssueBody(spec) {
  const lines = [];
  if (spec.parentIssue) {
    lines.push(`親Issue: #${spec.parentIssue}`);
    lines.push("");
  }

  const { sections } = spec;
  pushSection(lines, "背景", sections.background);
  pushSection(lines, "目的", sections.purpose);
  pushSection(lines, "スコープ", sections.scope);
  pushSection(lines, "依存関係", sections.dependencies);
  pushSection(lines, "重要ルール", sections.rules);

  if (sections.tdd) {
    const { red, green, refactor } = sections.tdd;
    if (red.length || green.length || refactor.length) {
      lines.push("## TDD");
      if (red.length) {
        lines.push("### Red");
        lines.push(...renderBulletList(red));
        lines.push("");
      }
      if (green.length) {
        lines.push("### Green");
        lines.push(...renderBulletList(green));
        lines.push("");
      }
      if (refactor.length) {
        lines.push("### Refactor");
        lines.push(...renderBulletList(refactor));
        lines.push("");
      }
    }
  }

  if (sections.wavePlan.length > 0) {
    lines.push("## 初期Wave案");
    lines.push("");
    for (const wave of sections.wavePlan) {
      lines.push(`### ${wave.name}`);
      lines.push(...renderBulletList(wave.items));
      lines.push("");
    }
  }

  pushSection(lines, "完了条件", sections.acceptance);
  pushSection(lines, "備考", sections.notes);

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
  const tempDir = mkdtempSync(path.join(tmpdir(), "gh-issue-safe-"));
  const bodyPath = path.join(tempDir, "issue-body.md");
  writeFileSync(bodyPath, body, "utf8");
  return { bodyPath, tempDir };
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const specRaw = loadSpec(options.spec);
  const spec = validateIssueSpec(specRaw);
  const body = renderIssueBody(spec);

  if (options.command === "validate") {
    console.log("OK: issue spec is valid.");
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
      const args = ["issue", "create", "--repo", repo, "--title", spec.title, "--body-file", bodyPath];
      for (const label of spec.labels) {
        args.push("--label", label);
      }
      runGhCommand(args);
      return;
    }

    const issueNumber = parseIssueNumber(options.issue);
    const args = [
      "issue",
      "edit",
      String(issueNumber),
      "--repo",
      repo,
      "--title",
      spec.title,
      "--body-file",
      bodyPath,
    ];
    for (const label of spec.labels) {
      args.push("--add-label", label);
    }
    runGhCommand(args);
  } finally {
    if (!options.out && tempDir) {
      rmSync(tempDir, { recursive: true, force: true });
    }
  }
}

main();
