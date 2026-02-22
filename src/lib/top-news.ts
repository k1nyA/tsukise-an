import { getNewsList, type MicroCMSReadClient, type NewsContent } from "./microcms";

export const TOP_NEWS_LIMIT = 5;

export type TopNewsItem = {
  slug: string;
  date: string;
  title: string;
};

type TopNewsSource = Pick<NewsContent, "slug" | "title"> & {
  createdAt: string;
  publishedAt?: string;
};

const toDisplayDate = (isoDate: string): string => {
  const datePart = isoDate.slice(0, 10);
  return datePart.replaceAll("-", ".");
};

export const mapTopNewsItems = (items: TopNewsSource[]): TopNewsItem[] => {
  return items.map((item) => ({
    slug: item.slug,
    date: toDisplayDate(item.publishedAt ?? item.createdAt),
    title: item.title,
  }));
};

export const getTopNewsItems = async (
  client?: MicroCMSReadClient,
): Promise<TopNewsItem[]> => {
  const response = await getNewsList({ page: 1, limit: TOP_NEWS_LIMIT }, client);
  return mapTopNewsItems(response.contents as TopNewsSource[]);
};
