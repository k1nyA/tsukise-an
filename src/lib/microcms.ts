import {
  createClient,
  type MicroCMSDate,
  type MicroCMSImage,
  type MicroCMSListResponse,
} from "microcms-js-sdk";

import { getEnv } from "./env";

const NEWS_ENDPOINT = "news";
const FAQ_ENDPOINT = "faq";

const DEFAULT_NEWS_LIMIT = 10;
const DEFAULT_RELATED_NEWS_LIMIT = 3;
const DEFAULT_FAQ_LIMIT = 100;

export type MicroCMSReadClient = Pick<
  ReturnType<typeof createClient>,
  "getList"
>;

type MicroCMSListMeta = {
  id: string;
} & MicroCMSDate;

export type NewsContent = {
  title: string;
  slug: string;
  category: string;
  eyecatch?: MicroCMSImage;
  description?: string;
  body: string;
};

export type NewsItem = NewsContent & MicroCMSListMeta;

export type FaqContent = {
  question: string;
  answer: string;
  category: string;
  order: number;
};

export type FaqItem = FaqContent & MicroCMSListMeta;

export type NewsListParams = {
  page?: number;
  category?: string;
  limit?: number;
};

const toPositiveInt = (value: number | undefined, fallback: number): number => {
  if (!Number.isFinite(value)) return fallback;
  return Math.max(1, Math.floor(value as number));
};

const normalizeFilterValue = (value: string): string => value.trim();

const buildNewsCategoryFilter = (category: string | undefined): string | undefined => {
  if (!category) return undefined;
  const normalized = normalizeFilterValue(category);
  return normalized.length > 0 ? `category[equals]${normalized}` : undefined;
};

const buildNewsSlugFilter = (slug: string): string => {
  const normalized = normalizeFilterValue(slug);
  if (!normalized) {
    throw new Error("slug must not be empty.");
  }
  return `slug[equals]${normalized}`;
};

const buildRelatedNewsFilter = (category: string, excludeId: string): string => {
  const normalizedCategory = normalizeFilterValue(category);
  const normalizedExcludeId = normalizeFilterValue(excludeId);

  if (!normalizedCategory) {
    throw new Error("category must not be empty.");
  }
  if (!normalizedExcludeId) {
    throw new Error("excludeId must not be empty.");
  }

  return `category[equals]${normalizedCategory}[and]id[not_equals]${normalizedExcludeId}`;
};

let cachedClient: MicroCMSReadClient | undefined;

export const getMicroCMSClient = (): MicroCMSReadClient => {
  if (!cachedClient) {
    const env = getEnv();
    cachedClient = createClient({
      serviceDomain: env.MICROCMS_SERVICE_DOMAIN,
      apiKey: env.MICROCMS_API_KEY,
    });
  }
  return cachedClient;
};

export const getNewsList = async (
  params: NewsListParams = {},
  client: MicroCMSReadClient = getMicroCMSClient(),
): Promise<MicroCMSListResponse<NewsContent>> => {
  const limit = toPositiveInt(params.limit, DEFAULT_NEWS_LIMIT);
  const page = toPositiveInt(params.page, 1);
  const offset = (page - 1) * limit;
  const filters = buildNewsCategoryFilter(params.category);

  return client.getList<NewsContent>({
    endpoint: NEWS_ENDPOINT,
    queries: {
      limit,
      offset,
      orders: "-publishedAt",
      ...(filters ? { filters } : {}),
    },
  });
};

export const getNewsDetail = async (
  slug: string,
  client: MicroCMSReadClient = getMicroCMSClient(),
): Promise<NewsItem | null> => {
  const response = await client.getList<NewsContent>({
    endpoint: NEWS_ENDPOINT,
    queries: {
      limit: 1,
      offset: 0,
      orders: "-publishedAt",
      filters: buildNewsSlugFilter(slug),
    },
  });

  return response.contents[0] ?? null;
};

export const getRelatedNews = async (
  category: string,
  excludeId: string,
  limit = DEFAULT_RELATED_NEWS_LIMIT,
  client: MicroCMSReadClient = getMicroCMSClient(),
): Promise<MicroCMSListResponse<NewsContent>> => {
  const safeLimit = toPositiveInt(limit, DEFAULT_RELATED_NEWS_LIMIT);

  return client.getList<NewsContent>({
    endpoint: NEWS_ENDPOINT,
    queries: {
      limit: safeLimit,
      offset: 0,
      orders: "-publishedAt",
      filters: buildRelatedNewsFilter(category, excludeId),
    },
  });
};

export const getFaqList = async (
  client: MicroCMSReadClient = getMicroCMSClient(),
): Promise<MicroCMSListResponse<FaqContent>> => {
  return client.getList<FaqContent>({
    endpoint: FAQ_ENDPOINT,
    queries: {
      limit: DEFAULT_FAQ_LIMIT,
      orders: "order",
    },
  });
};
