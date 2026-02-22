import assert from "node:assert/strict";
import { test } from "node:test";

import type { FaqItem } from "./microcms";
import { groupFaqByCategory } from "./faq";

const makeFaq = (overrides: Partial<FaqItem>): FaqItem => ({
  id: "faq-id",
  createdAt: "2026-02-01T00:00:00.000Z",
  updatedAt: "2026-02-01T00:00:00.000Z",
  question: "質問",
  answer: "<p>回答</p>",
  category: "reservation",
  order: 1,
  ...overrides,
});

test("groupFaqByCategory orders sections by predefined category sequence", () => {
  const result = groupFaqByCategory([
    makeFaq({ id: "1", category: "access_other", question: "Q4", order: 4 }),
    makeFaq({ id: "2", category: "reservation", question: "Q1", order: 1 }),
    makeFaq({ id: "3", category: "cuisine", question: "Q3", order: 3 }),
    makeFaq({ id: "4", category: "onsen_room", question: "Q2", order: 2 }),
  ]);

  assert.deepEqual(
    result.map((section) => section.key),
    ["reservation", "onsen_room", "cuisine", "access_other"],
  );
});

test("groupFaqByCategory maps unknown category into 'other' section", () => {
  const result = groupFaqByCategory([
    makeFaq({ category: "unknown-category", question: "未知カテゴリの質問" }),
  ]);

  assert.equal(result.length, 1);
  assert.equal(result[0]?.key, "other");
  assert.equal(result[0]?.title, "その他のご質問");
  assert.equal(result[0]?.items[0]?.question, "未知カテゴリの質問");
});

test("groupFaqByCategory strips HTML from answer text", () => {
  const result = groupFaqByCategory([
    makeFaq({ answer: "<p>回答<strong>テキスト</strong></p>" }),
  ]);

  assert.equal(result[0]?.items[0]?.answer, "回答 テキスト");
});

