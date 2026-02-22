import { getEnv } from "./env";

export type CalcomLinkEnv = {
  NEXT_PUBLIC_CALCOM_USERNAME: string;
  NEXT_PUBLIC_CALCOM_EVENT_SLUG: string;
};

const normalizeSegment = (value: string): string => value.replace(/^\/+|\/+$/g, "");

export const buildCalLink = (env: CalcomLinkEnv): string => {
  const username = normalizeSegment(env.NEXT_PUBLIC_CALCOM_USERNAME);
  const eventSlug = normalizeSegment(env.NEXT_PUBLIC_CALCOM_EVENT_SLUG);

  if (!username || !eventSlug) {
    throw new Error("Cal.com username/event slug must not be empty.");
  }

  return `${username}/${eventSlug}`;
};

export const buildCalLinkFromProcessEnv = (): string => {
  const env = getEnv();
  return buildCalLink({
    NEXT_PUBLIC_CALCOM_USERNAME: env.NEXT_PUBLIC_CALCOM_USERNAME,
    NEXT_PUBLIC_CALCOM_EVENT_SLUG: env.NEXT_PUBLIC_CALCOM_EVENT_SLUG,
  });
};
