import assert from "node:assert/strict";
import { test } from "node:test";

import {
  buildNewsListHref,
  getTotalPages,
  parseNewsListSearchParams,
} from "./news-list-query";

test("parseNewsListSearchParams normalizes category and page", () => {
  const result = parseNewsListSearchParams({
    category: "  イベント  ",
    page: "3",
  });

  assert.deepEqual(result, { category: "イベント", page: 3 });
});

test("parseNewsListSearchParams falls back to first page for invalid values", () => {
  const result = parseNewsListSearchParams({
    category: "all",
    page: "-5",
  });

  assert.deepEqual(result, { category: undefined, page: 1 });
});

test("parseNewsListSearchParams accepts array search params", () => {
  const result = parseNewsListSearchParams({
    category: ["季節の便り", "お料理"],
    page: ["2", "9"],
  });

  assert.deepEqual(result, { category: "季節の便り", page: 2 });
});

test("buildNewsListHref includes only non-default params", () => {
  assert.equal(buildNewsListHref({ category: undefined, page: 1 }), "/news");
  assert.equal(buildNewsListHref({ category: "イベント", page: 1 }), "/news?category=%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88");
  assert.equal(
    buildNewsListHref({ category: "季節の便り", page: 4 }),
    "/news?category=%E5%AD%A3%E7%AF%80%E3%81%AE%E4%BE%BF%E3%82%8A&page=4",
  );
});

test("getTotalPages computes page count with lower bound", () => {
  assert.equal(getTotalPages(0, 5), 1);
  assert.equal(getTotalPages(1, 5), 1);
  assert.equal(getTotalPages(12, 5), 3);
});

