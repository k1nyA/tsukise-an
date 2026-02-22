import assert from "node:assert/strict";
import { test } from "node:test";

import type { NewsItem } from "./microcms";
import {
  mapNewsItemToDetailArticle,
  parseNewsBodyToBlocks,
} from "./news-detail";

test("parseNewsBodyToBlocks parses heading and paragraph blocks from HTML", () => {
  const blocks = parseNewsBodyToBlocks(`
    <h2>見出し</h2>
    <p>本文A</p>
    <p>本文B</p>
  `);

  assert.deepEqual(blocks, [
    { type: "heading", content: "見出し" },
    { type: "paragraph", content: "本文A" },
    { type: "paragraph", content: "本文B" },
  ]);
});

test("parseNewsBodyToBlocks falls back for empty body", () => {
  const blocks = parseNewsBodyToBlocks("  ");
  assert.deepEqual(blocks, [{ type: "paragraph", content: "本文は準備中です。" }]);
});

test("mapNewsItemToDetailArticle maps slug and related links", () => {
  const base: NewsItem = {
    id: "news-content-id",
    createdAt: "2026-02-01T00:00:00.000Z",
    updatedAt: "2026-02-01T00:00:00.000Z",
    publishedAt: "2026-02-02T00:00:00.000Z",
    title: "お知らせ本文",
    slug: "news-slug",
    category: "イベント",
    body: "<p>本文</p>",
    description: "概要",
  };
  const related: NewsItem = {
    id: "news-related-id",
    createdAt: "2026-02-03T00:00:00.000Z",
    updatedAt: "2026-02-03T00:00:00.000Z",
    publishedAt: "2026-02-04T00:00:00.000Z",
    title: "関連記事",
    slug: "related-slug",
    category: "イベント",
    body: "<p>本文</p>",
    description: "概要",
  };

  const detail = mapNewsItemToDetailArticle(base, [related]);

  assert.equal(detail.id, "news-slug");
  assert.equal(detail.date, "2026.02.02");
  assert.equal(detail.relatedArticles[0]?.id, "related-slug");
  assert.equal(detail.relatedArticles[0]?.date, "2026.02.04");
});

