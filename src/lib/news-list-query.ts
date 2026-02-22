export const NEWS_PAGE_SIZE = 5;

export const NEWS_CATEGORY_TABS = [
  "イベント",
  "季節の便り",
  "お料理",
  "メディア掲載",
  "施設情報",
] as const;

type SearchParamValue = string | string[] | undefined;

export type NewsSearchParams = Record<string, SearchParamValue>;

export type NewsListQuery = {
  category?: string;
  page: number;
};

const firstParamValue = (value: SearchParamValue): string | undefined => {
  if (Array.isArray(value)) return value[0];
  return value;
};

const parsePositiveInt = (value: string | undefined, fallback: number): number => {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 1) return fallback;
  return parsed;
};

const normalizeCategory = (value: string | undefined): string | undefined => {
  if (!value) return undefined;
  const normalized = value.trim();
  if (!normalized || normalized === "all") return undefined;
  return normalized;
};

export const parseNewsListSearchParams = (
  searchParams: NewsSearchParams,
): NewsListQuery => {
  const category = normalizeCategory(firstParamValue(searchParams.category));
  const page = parsePositiveInt(firstParamValue(searchParams.page), 1);
  return { category, page };
};

export const buildNewsListHref = (query: NewsListQuery): string => {
  const params = new URLSearchParams();
  if (query.category) {
    params.set("category", query.category);
  }
  if (query.page > 1) {
    params.set("page", String(query.page));
  }
  const qs = params.toString();
  return qs ? `/news?${qs}` : "/news";
};

export const getTotalPages = (totalCount: number, limit: number): number => {
  if (limit < 1) return 1;
  return Math.max(1, Math.ceil(totalCount / limit));
};

