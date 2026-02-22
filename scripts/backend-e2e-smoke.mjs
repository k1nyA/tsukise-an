#!/usr/bin/env node

const BASE_URL = process.env.BACKEND_E2E_BASE_URL || "http://127.0.0.1:3000";
const TIMEOUT_MS = Number(process.env.BACKEND_E2E_TIMEOUT_MS || 12000);

const withTimeout = async (promiseFactory) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await promiseFactory(controller.signal);
  } finally {
    clearTimeout(timeout);
  }
};

const fetchPage = async (path) => {
  const url = new URL(path, BASE_URL);
  const response = await withTimeout((signal) =>
    fetch(url.toString(), { signal, redirect: "follow" }),
  );
  const body = await response.text();

  if (!response.ok) {
    const responseSnippet = body.trim().slice(0, 200) || "(empty body)";
    throw new Error(
      `${path} returned HTTP ${response.status}. Response: ${responseSnippet}`,
    );
  }

  return body;
};

const assertIncludes = (html, text, path) => {
  if (!html.includes(text)) {
    throw new Error(`${path} is missing expected text: ${text}`);
  }
};

const assertIncludesAny = (html, texts, path) => {
  if (texts.some((text) => html.includes(text))) return;
  throw new Error(`${path} is missing all expected texts: ${texts.join(" / ")}`);
};

const extractFirstNewsSlug = (html) => {
  const matches = html.matchAll(/href="\/news\/([a-zA-Z0-9_-]+)"/g);
  for (const match of matches) {
    const slug = match[1];
    if (slug && slug !== "news") {
      return slug;
    }
  }
  return null;
};

const ensureBaseUrlReachable = async () => {
  try {
    await fetchPage("/");
  } catch (error) {
    throw new Error(
      `Base URL ${BASE_URL} is not reachable. ` +
        "Ensure the app is running (e.g. npm run start -- --port 3000). " +
        `Original error: ${error.message}`,
    );
  }
};

const run = async () => {
  await ensureBaseUrlReachable();

  const reservationHtml = await fetchPage("/reservation");
  assertIncludes(reservationHtml, "ご宿泊日を選択", "/reservation");
  assertIncludesAny(
    reservationHtml,
    ["オンライン予約の準備中です", "予約カレンダーを読み込んでいます"],
    "/reservation",
  );
  console.log("OK: /reservation");

  const contactHtml = await fetchPage("/contact");
  assertIncludes(contactHtml, "Powered by Web3Forms", "/contact");
  assertIncludes(contactHtml, "送信する", "/contact");
  console.log("OK: /contact");

  const newsHtml = await fetchPage("/news");
  assertIncludes(newsHtml, "お知らせ", "/news");
  assertIncludesAny(
    newsHtml,
    ["現在お知らせを取得できません", "一覧を見る", "news-item"],
    "/news",
  );
  console.log("OK: /news");

  const firstSlug = extractFirstNewsSlug(newsHtml);
  if (firstSlug) {
    const detailPath = `/news/${firstSlug}`;
    const detailHtml = await fetchPage(detailPath);
    assertIncludesAny(
      detailHtml,
      ["関連記事", "記事を表示できません", "お知らせ"],
      detailPath,
    );
    console.log(`OK: ${detailPath}`);
  } else {
    console.log("SKIP: /news/[slug] (no article link found in /news response)");
  }

  const faqHtml = await fetchPage("/faq");
  assertIncludes(faqHtml, "よくあるご質問", "/faq");
  assertIncludesAny(
    faqHtml,
    ["現在FAQを取得できません", "現在FAQを準備中です", "お問い合わせはこちら"],
    "/faq",
  );
  console.log("OK: /faq");

  console.log("OK: backend integration smoke scenarios passed");
};

run().catch((error) => {
  console.error(`Backend smoke E2E failed: ${error.message}`);
  process.exit(1);
});
