import assert from "node:assert/strict";
import { test } from "node:test";
import type { MicroCMSListResponse, MicroCMSQueries } from "microcms-js-sdk";

import {
  getTopNewsItems,
  mapTopNewsItems,
  TOP_NEWS_LIMIT,
} from "./top-news";
import type {
  MicroCMSReadClient,
  NewsContent,
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

test("mapTopNewsItems converts published date to top news display format", () => {
  const items = mapTopNewsItems([
    {
      slug: "spring-news",
      title: "春のお知らせ",
      createdAt: "2026-02-01T10:00:00.000Z",
      publishedAt: "2026-02-20T12:00:00.000Z",
    },
  ]);

  assert.deepEqual(items, [
    {
      slug: "spring-news",
      date: "2026.02.20",
      title: "春のお知らせ",
    },
  ]);
});

test("mapTopNewsItems falls back to created date when published date is missing", () => {
  const items = mapTopNewsItems([
    {
      slug: "draft-news",
      title: "下書き記事",
      createdAt: "2026-02-10T10:00:00.000Z",
    },
  ]);

  assert.equal(items[0]?.date, "2026.02.10");
});

test("getTopNewsItems fetches latest news with top limit", async () => {
  const recorder = createRecorder<NewsContent>({
    contents: [
      {
        id: "news-1",
        createdAt: "2026-02-10T00:00:00.000Z",
        updatedAt: "2026-02-10T00:00:00.000Z",
        publishedAt: "2026-02-12T00:00:00.000Z",
        revisedAt: "2026-02-12T00:00:00.000Z",
        title: "最新記事",
        slug: "latest-news",
        category: "イベント",
        body: "<p>本文</p>",
      },
    ],
    totalCount: 1,
    limit: TOP_NEWS_LIMIT,
    offset: 0,
  });

  const items = await getTopNewsItems(recorder.client);

  assert.deepEqual(recorder.calls[0], {
    endpoint: "news",
    queries: {
      limit: TOP_NEWS_LIMIT,
      offset: 0,
      orders: "-publishedAt",
    },
  });
  assert.deepEqual(items, [
    {
      slug: "latest-news",
      date: "2026.02.12",
      title: "最新記事",
    },
  ]);
});
