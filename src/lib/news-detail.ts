import type { NewsArticleDetail } from "@/components/news/NewsDetailSection";

import type { NewsItem } from "./microcms";

const FALLBACK_BODY_MESSAGE = "本文は準備中です。";

const decodeHtmlEntities = (value: string): string =>
  value
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");

const stripHtml = (value: string): string =>
  decodeHtmlEntities(value)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const toDisplayDate = (value: string): string => {
  const datePart = value.slice(0, 10);
  return datePart.replaceAll("-", ".");
};

export const parseNewsBodyToBlocks = (
  body: string,
): NewsArticleDetail["body"] => {
  const trimmed = body.trim();
  if (!trimmed) {
    return [{ type: "paragraph", content: FALLBACK_BODY_MESSAGE }];
  }

  const blocks: NewsArticleDetail["body"] = [];
  const regex = /<(h[1-6]|p|li)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(trimmed)) !== null) {
    const tag = match[1];
    const raw = match[2];
    const content = stripHtml(raw);
    if (!content) continue;
    if (tag.startsWith("h")) {
      blocks.push({ type: "heading", content });
    } else {
      blocks.push({ type: "paragraph", content });
    }
  }

  if (blocks.length > 0) {
    return blocks;
  }

  const plainText = decodeHtmlEntities(trimmed);
  const paragraphs = plainText
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .map(stripHtml)
    .filter(Boolean)
    .map((content) => ({ type: "paragraph" as const, content }));

  if (paragraphs.length > 0) {
    return paragraphs;
  }

  return [{ type: "paragraph", content: FALLBACK_BODY_MESSAGE }];
};

export const mapNewsItemToDetailArticle = (
  article: NewsItem,
  relatedArticles: NewsItem[],
): NewsArticleDetail => {
  return {
    id: article.slug,
    date: toDisplayDate(article.publishedAt ?? article.createdAt),
    category: article.category,
    title: article.title,
    body: parseNewsBodyToBlocks(article.body),
    relatedArticles: relatedArticles.map((item) => ({
      id: item.slug,
      date: toDisplayDate(item.publishedAt ?? item.createdAt),
      category: item.category,
      title: item.title,
    })),
  };
};

