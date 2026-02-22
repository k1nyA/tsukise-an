import assert from "node:assert/strict";
import { test } from "node:test";
import type { MicroCMSListResponse, MicroCMSQueries } from "microcms-js-sdk";

import {
  getFaqList,
  getNewsDetail,
  getNewsList,
  getRelatedNews,
  type FaqContent,
  type MicroCMSReadClient,
  type NewsContent,
} from "./microcms";

type GetListRequest = {
  endpoint: string;
  queries?: MicroCMSQueries;
};

type CallRecorder = {
  calls: GetListRequest[];
  client: MicroCMSReadClient;
};

const createRecorder = <T>(response: MicroCMSListResponse<T>): CallRecorder => {
  const calls: GetListRequest[] = [];
  const client: MicroCMSReadClient = {
    getList: async <U = unknown>(request: GetListRequest) => {
      calls.push(request);
      return response as unknown as MicroCMSListResponse<U>;
    },
  };
  return { calls, client };
};

test("getNewsList builds category/pagination queries", async () => {
  const recorder = createRecorder<NewsContent>({
    contents: [],
    totalCount: 0,
    limit: 6,
    offset: 6,
  });

  await getNewsList(
    { page: 2, limit: 6, category: "イベント" },
    recorder.client,
  );

  assert.deepEqual(recorder.calls[0], {
    endpoint: "news",
    queries: {
      limit: 6,
      offset: 6,
      orders: "-publishedAt",
      filters: "category[equals]イベント",
    },
  });
});

test("getNewsDetail fetches by slug and returns first content", async () => {
  const news = {
    id: "n1",
    createdAt: "2026-02-22T00:00:00.000Z",
    updatedAt: "2026-02-22T00:00:00.000Z",
    title: "記事",
    slug: "sample",
    category: "お知らせ",
    body: "body",
    description: "desc",
  };
  const recorder = createRecorder<NewsContent>({
    contents: [news],
    totalCount: 1,
    limit: 1,
    offset: 0,
  });

  const result = await getNewsDetail("sample", recorder.client);

  assert.equal(result?.id, "n1");
  assert.deepEqual(recorder.calls[0], {
    endpoint: "news",
    queries: {
      limit: 1,
      offset: 0,
      orders: "-publishedAt",
      filters: "slug[equals]sample",
    },
  });
});

test("getNewsDetail returns null when no content matches", async () => {
  const recorder = createRecorder<NewsContent>({
    contents: [],
    totalCount: 0,
    limit: 1,
    offset: 0,
  });

  const result = await getNewsDetail("missing", recorder.client);

  assert.equal(result, null);
});

test("getRelatedNews excludes current article id", async () => {
  const recorder = createRecorder<NewsContent>({
    contents: [],
    totalCount: 0,
    limit: 3,
    offset: 0,
  });

  await getRelatedNews("イベント", "news-1", 3, recorder.client);

  assert.deepEqual(recorder.calls[0], {
    endpoint: "news",
    queries: {
      limit: 3,
      offset: 0,
      orders: "-publishedAt",
      filters: "category[equals]イベント[and]id[not_equals]news-1",
    },
  });
});

test("getFaqList fetches ordered FAQ items", async () => {
  const recorder = createRecorder<FaqContent>({
    contents: [],
    totalCount: 0,
    limit: 100,
    offset: 0,
  });

  await getFaqList(recorder.client);

  assert.deepEqual(recorder.calls[0], {
    endpoint: "faq",
    queries: {
      limit: 100,
      orders: "order",
    },
  });
});
