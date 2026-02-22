#!/usr/bin/env node

const BASE_URL = process.env.CHECK_LINK_BASE_URL || "http://localhost:3000";
const MAX_PAGES = Number(process.env.CHECK_LINK_MAX_PAGES || 200);
const TIMEOUT_MS = Number(process.env.CHECK_LINK_TIMEOUT_MS || 12000);
const SEEDS = (process.env.CHECK_LINK_PATHS || "/")
  .split(",")
  .map((v) => v.trim())
  .filter(Boolean);

const visited = new Set();
const queue = [];
const htmlByPath = new Map();
const broken = [];
const anchorChecks = [];

for (const seed of SEEDS) {
  queue.push(seed);
}

function normalizePathAndSearch(url) {
  let key = `${url.pathname}${url.search}`;
  if (key.length > 1 && key.endsWith("/")) {
    key = key.slice(0, -1);
  }
  return key || "/";
}

function parseHrefs(html) {
  const hrefs = [];
  const regex = /<a\b[^>]*\bhref=(["'])(.*?)\1/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    hrefs.push(match[2]);
  }
  return hrefs;
}

function parseIds(html) {
  const ids = new Set();
  const regex = /\sid=(["'])([^"']+)\1/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    ids.add(match[2]);
  }
  return ids;
}

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { signal: controller.signal, redirect: "follow" });
  } finally {
    clearTimeout(timeout);
  }
}

function shouldIgnoreHref(href) {
  return (
    !href ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("javascript:") ||
    href.startsWith("data:")
  );
}

while (queue.length > 0 && visited.size < MAX_PAGES) {
  const next = queue.shift();
  const pageUrl = new URL(next, BASE_URL);
  const pageKey = normalizePathAndSearch(pageUrl);

  if (visited.has(pageKey)) continue;
  visited.add(pageKey);

  let response;
  try {
    response = await fetchWithTimeout(pageUrl.toString());
  } catch (error) {
    broken.push({
      type: "page",
      url: pageUrl.toString(),
      reason: `Fetch failed: ${error.message}`,
    });
    continue;
  }

  if (!response.ok) {
    broken.push({
      type: "page",
      url: pageUrl.toString(),
      reason: `HTTP ${response.status}`,
    });
    continue;
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) {
    continue;
  }

  const html = await response.text();
  htmlByPath.set(pageKey, html);

  for (const href of parseHrefs(html)) {
    if (shouldIgnoreHref(href)) continue;

    if (href.startsWith("#")) {
      anchorChecks.push({
        source: pageKey,
        target: pageKey,
        hash: href.slice(1),
      });
      continue;
    }

    const linkUrl = new URL(href, pageUrl.toString());
    if (linkUrl.origin !== new URL(BASE_URL).origin) continue;

    const targetKey = normalizePathAndSearch(linkUrl);
    if (!visited.has(targetKey)) {
      queue.push(targetKey);
    }

    if (linkUrl.hash) {
      anchorChecks.push({
        source: pageKey,
        target: targetKey,
        hash: linkUrl.hash.slice(1),
      });
    }
  }
}

for (const check of anchorChecks) {
  if (!check.hash) continue;
  const targetHtml = htmlByPath.get(check.target);
  if (!targetHtml) {
    broken.push({
      type: "anchor",
      url: `${check.target}#${check.hash}`,
      reason: `Target page not crawled from source ${check.source}`,
    });
    continue;
  }
  const ids = parseIds(targetHtml);
  if (!ids.has(check.hash)) {
    broken.push({
      type: "anchor",
      url: `${check.target}#${check.hash}`,
      reason: `Missing id on target page (linked from ${check.source})`,
    });
  }
}

if (broken.length > 0) {
  console.error("Broken links found:");
  for (const item of broken) {
    console.error(`- [${item.type}] ${item.url} :: ${item.reason}`);
  }
  process.exit(1);
}

console.log(`OK: ${visited.size} page(s) checked from ${BASE_URL}`);
