import type { FaqItem } from "./microcms";

type FaqIcon = "calendar" | "waves" | "utensils" | "map-pin";
type FaqVariant = "light" | "alt";

type FaqCategoryKey =
  | "reservation"
  | "onsen_room"
  | "cuisine"
  | "access_other";

type FaqCategorySection = {
  key: FaqCategoryKey | "other";
  title: string;
  icon: FaqIcon;
  variant: FaqVariant;
  items: Array<{ question: string; answer?: string }>;
};

const CATEGORY_ALIASES: Record<string, FaqCategoryKey> = {
  reservation: "reservation",
  "ご予約について": "reservation",
  onsen_room: "onsen_room",
  onsenRoom: "onsen_room",
  "温泉・お部屋について": "onsen_room",
  cuisine: "cuisine",
  "お食事について": "cuisine",
  access_other: "access_other",
  accessOther: "access_other",
  "アクセス・その他": "access_other",
};

const CATEGORY_META: Record<
  FaqCategoryKey | "other",
  { title: string; icon: FaqIcon; variant: FaqVariant }
> = {
  reservation: {
    title: "ご予約について",
    icon: "calendar",
    variant: "light",
  },
  onsen_room: {
    title: "温泉・お部屋について",
    icon: "waves",
    variant: "alt",
  },
  cuisine: {
    title: "お食事について",
    icon: "utensils",
    variant: "light",
  },
  access_other: {
    title: "アクセス・その他",
    icon: "map-pin",
    variant: "alt",
  },
  other: {
    title: "その他のご質問",
    icon: "map-pin",
    variant: "alt",
  },
};

const CATEGORY_ORDER: Array<FaqCategoryKey | "other"> = [
  "reservation",
  "onsen_room",
  "cuisine",
  "access_other",
  "other",
];

const stripHtml = (value: string): string =>
  value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const normalizeCategory = (value: string): FaqCategoryKey | "other" => {
  const key = value.trim();
  return CATEGORY_ALIASES[key] ?? "other";
};

export const groupFaqByCategory = (
  items: FaqItem[],
): FaqCategorySection[] => {
  const grouped = new Map<FaqCategoryKey | "other", FaqCategorySection>();

  for (const item of items) {
    const key = normalizeCategory(item.category);
    const meta = CATEGORY_META[key];
    const existing = grouped.get(key) ?? {
      key,
      title: meta.title,
      icon: meta.icon,
      variant: meta.variant,
      items: [],
    };

    existing.items.push({
      question: item.question.trim(),
      answer: stripHtml(item.answer),
    });

    grouped.set(key, existing);
  }

  const orderedSections = CATEGORY_ORDER.map((key) => grouped.get(key)).filter(
    (section): section is FaqCategorySection => section !== undefined,
  );

  return orderedSections.filter((section) => section.items.length > 0);
};
