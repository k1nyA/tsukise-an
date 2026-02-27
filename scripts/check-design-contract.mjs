#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const profilePath = path.join(repoRoot, "docs/design-data/project-profile.json");

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`Failed to read JSON: ${filePath}\n${error.message}`);
  }
}

function normalizeText(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeNullableText(value) {
  if (value === null || value === undefined) {
    return null;
  }
  const text = String(value).trim();
  return text === "" ? null : text;
}

function getPrimarySections(pageData) {
  const viewports = pageData?.viewports;
  if (!viewports || typeof viewports !== "object") {
    return null;
  }

  if (Array.isArray(viewports.pc?.sections)) {
    return viewports.pc.sections;
  }

  for (const viewport of Object.values(viewports)) {
    if (Array.isArray(viewport?.sections)) {
      return viewport.sections;
    }
  }

  return null;
}

function sectionSignature(section) {
  return normalizeText(
    [
      `id:${section?.id ?? ""}`,
      `name:${section?.name ?? ""}`,
      `type:${section?.type ?? ""}`,
      `label:${section?.label ?? ""}`,
      `description:${section?.description ?? ""}`,
      `content:${section?.content ?? ""}`,
    ].join(" | "),
  );
}

function sectionMatches(section, matchAny = []) {
  const signature = sectionSignature(section);
  return matchAny.some((needle) => signature.includes(normalizeText(needle)));
}

function findMatchingSections(sections, matchAny = []) {
  if (!Array.isArray(sections) || matchAny.length === 0) {
    return [];
  }
  return sections.filter((section) => sectionMatches(section, matchAny));
}

function extractHeroTitleSubtitle(heroSection) {
  let title = null;
  let subtitle = null;

  const parseTitleSubtitlePair = (text) => {
    const match = text.match(/title\s*:\s*([^,]+?)\s*,\s*subtitle\s*:\s*(.+)$/i);
    if (!match) {
      return;
    }

    if (title === null) {
      title = normalizeNullableText(match[1]);
    }
    if (subtitle === null) {
      subtitle = normalizeNullableText(match[2]);
    }
  };

  const walk = (value) => {
    if (value === null || value === undefined) {
      return;
    }

    if (typeof value === "string") {
      parseTitleSubtitlePair(value);
      return;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        walk(item);
      }
      return;
    }

    if (typeof value === "object") {
      const nodeName = normalizeText(value.name ?? "");
      const nodeContent = normalizeNullableText(value.content);

      if (nodeContent !== null) {
        if (title === null && nodeName.includes("herotitle")) {
          title = nodeContent;
        }
        if (
          subtitle === null &&
          (nodeName.includes("herosub") || nodeName.includes("herosubtitle"))
        ) {
          subtitle = nodeContent;
        }
      }

      if (typeof value.title === "string") {
        title = title ?? normalizeNullableText(value.title);
      }
      if (typeof value.subtitle === "string") {
        subtitle = subtitle ?? normalizeNullableText(value.subtitle);
      }

      for (const childValue of Object.values(value)) {
        walk(childValue);
      }
    }
  };

  walk(heroSection);

  return {
    title: normalizeNullableText(title),
    subtitle: normalizeNullableText(subtitle),
  };
}

function normalizeRoute(route) {
  if (typeof route !== "string") {
    return null;
  }

  const raw = route.trim();
  if (!raw) {
    return null;
  }

  let pathname = raw;

  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    try {
      pathname = new URL(raw).pathname;
    } catch {
      return null;
    }
  }

  pathname = pathname.split("#")[0].split("?")[0];

  if (!pathname.startsWith("/")) {
    return null;
  }

  if (pathname.length > 1 && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }

  return pathname;
}

function collectRoutes(value, parentKey = "", routes = new Set()) {
  if (value === null || value === undefined) {
    return routes;
  }

  if (typeof value === "string") {
    if (parentKey === "href") {
      const normalized = normalizeRoute(value);
      if (normalized) {
        routes.add(normalized);
      }
    }

    if (parentKey === "context") {
      const hrefMatch = value.match(/href\s*:\s*([^\s,)]+)/i);
      if (hrefMatch) {
        const normalized = normalizeRoute(hrefMatch[1]);
        if (normalized) {
          routes.add(normalized);
        }
      }
    }

    return routes;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      collectRoutes(item, parentKey, routes);
    }
    return routes;
  }

  if (typeof value === "object") {
    for (const [key, childValue] of Object.entries(value)) {
      collectRoutes(childValue, key, routes);
    }
  }

  return routes;
}

function formatSection(section) {
  return [section?.id ?? "(no-id)", section?.name ?? "(no-name)", section?.type ?? "(no-type)"]
    .map((part) => String(part).trim())
    .join(" | ");
}

const profile = readJson(profilePath);
const designDataDir = profile.designDataDir || "docs/design-data";
const pageEntries = Object.entries(profile.pages || {});
const failures = [];

for (const [pageKey, pageContract] of pageEntries) {
  const fileName = pageContract.file;
  const pageFilePath = path.join(repoRoot, designDataDir, fileName);
  const pageData = readJson(pageFilePath);
  const sections = getPrimarySections(pageData);

  const pageFailure = {
    page: pageKey,
    file: fileName,
    issues: [],
  };

  if (!Array.isArray(sections)) {
    pageFailure.issues.push({
      type: "invalid_structure",
      message: "Could not find viewport sections (expected viewports.pc.sections).",
    });
    failures.push(pageFailure);
    continue;
  }

  const missingSections = [];
  for (const requiredSection of pageContract.requiredSections || []) {
    const matches = findMatchingSections(sections, requiredSection.matchAny || []);
    if (matches.length === 0) {
      missingSections.push(requiredSection);
    }
  }

  if (missingSections.length > 0) {
    pageFailure.issues.push({
      type: "missing_sections",
      missingSections,
      actualSections: sections.map(formatSection),
    });
  }

  if (pageContract.hero) {
    const heroSections = findMatchingSections(sections, pageContract.hero.sectionMatchAny || ["hero"]);
    const heroSection = heroSections[0] || null;
    const actualHero = heroSection
      ? extractHeroTitleSubtitle(heroSection)
      : { title: null, subtitle: null };

    const expectedTitle = normalizeNullableText(pageContract.hero.title);
    const expectedSubtitle = normalizeNullableText(pageContract.hero.subtitle);

    const titleMismatch = expectedTitle !== actualHero.title;
    const subtitleMismatch = expectedSubtitle !== actualHero.subtitle;

    if (heroSection === null) {
      pageFailure.issues.push({
        type: "hero_section_missing",
        sectionMatchAny: pageContract.hero.sectionMatchAny || ["hero"],
      });
    } else if (titleMismatch || subtitleMismatch) {
      pageFailure.issues.push({
        type: "hero_mismatch",
        expected: {
          title: expectedTitle,
          subtitle: expectedSubtitle,
        },
        actual: actualHero,
      });
    }
  }

  if (pageContract.relatedLinks) {
    const relatedSections = findMatchingSections(
      sections,
      pageContract.relatedLinks.sectionMatchAny || ["related", "links"],
    );

    if (pageContract.relatedLinks.required && relatedSections.length === 0) {
      pageFailure.issues.push({
        type: "related_section_missing",
        sectionMatchAny: pageContract.relatedLinks.sectionMatchAny || ["related", "links"],
      });
    }

    const actualRoutes = Array.from(
      relatedSections.reduce((set, section) => collectRoutes(section, "", set), new Set()),
    ).sort();
    const expectedRoutes = Array.from(
      new Set((pageContract.relatedLinks.routes || []).map(normalizeRoute).filter(Boolean)),
    ).sort();

    const missingRoutes = expectedRoutes.filter((route) => !actualRoutes.includes(route));
    const extraRoutes = actualRoutes.filter((route) => !expectedRoutes.includes(route));

    if (missingRoutes.length > 0 || extraRoutes.length > 0) {
      pageFailure.issues.push({
        type: "related_routes_mismatch",
        expectedRoutes,
        actualRoutes,
        missingRoutes,
        extraRoutes,
      });
    }
  }

  if (pageFailure.issues.length > 0) {
    failures.push(pageFailure);
  }
}

if (failures.length > 0) {
  console.error("Design contract check failed.");

  for (const failure of failures) {
    console.error(`\n[${failure.page}] (${failure.file})`);

    for (const issue of failure.issues) {
      if (issue.type === "invalid_structure") {
        console.error(`- Invalid structure: ${issue.message}`);
      }

      if (issue.type === "missing_sections") {
        console.error("- Required sections mismatch");
        console.error("  Missing:");
        for (const section of issue.missingSections) {
          console.error(`  - ${section.id} (matchAny: ${section.matchAny.join(" | ")})`);
        }
        console.error("  Actual sections:");
        for (const actualSection of issue.actualSections) {
          console.error(`  - ${actualSection}`);
        }
      }

      if (issue.type === "hero_section_missing") {
        console.error(
          `- Hero section missing (matchAny: ${issue.sectionMatchAny.join(" | ")})`,
        );
      }

      if (issue.type === "hero_mismatch") {
        console.error("- Hero title/subtitle mismatch");
        console.error(`  title    expected: ${JSON.stringify(issue.expected.title)}`);
        console.error(`  title    actual:   ${JSON.stringify(issue.actual.title)}`);
        console.error(`  subtitle expected: ${JSON.stringify(issue.expected.subtitle)}`);
        console.error(`  subtitle actual:   ${JSON.stringify(issue.actual.subtitle)}`);
      }

      if (issue.type === "related_section_missing") {
        console.error(
          `- Related links section missing (matchAny: ${issue.sectionMatchAny.join(" | ")})`,
        );
      }

      if (issue.type === "related_routes_mismatch") {
        console.error("- Related link routes mismatch");
        console.error(`  expected routes: ${issue.expectedRoutes.join(", ") || "(none)"}`);
        console.error(`  actual routes:   ${issue.actualRoutes.join(", ") || "(none)"}`);
        if (issue.missingRoutes.length > 0) {
          console.error(`  missing routes:  ${issue.missingRoutes.join(", ")}`);
        }
        if (issue.extraRoutes.length > 0) {
          console.error(`  extra routes:    ${issue.extraRoutes.join(", ")}`);
        }
      }
    }
  }

  process.exit(1);
}

console.log(`OK: design contract matched for ${pageEntries.length} page(s).`);
