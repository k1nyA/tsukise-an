const REQUIRED_ENV_KEYS = [
  "MICROCMS_SERVICE_DOMAIN",
  "MICROCMS_API_KEY",
  "NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY",
  "NEXT_PUBLIC_CALCOM_USERNAME",
  "NEXT_PUBLIC_CALCOM_EVENT_SLUG",
] as const;

export type AppEnv = {
  [K in (typeof REQUIRED_ENV_KEYS)[number]]: string;
};

type EnvSource = Record<string, string | undefined>;

const isEmpty = (value: string | undefined): boolean =>
  value === undefined || value.trim().length === 0;

export const validateEnv = (
  source: EnvSource = process.env,
): AppEnv => {
  const missingKeys = REQUIRED_ENV_KEYS.filter((key) => isEmpty(source[key]));

  if (missingKeys.length > 0) {
    const details = missingKeys.map((key) => `- ${key}`).join("\n");
    throw new Error(
      [
        "Missing required environment variables:",
        details,
        "Define them in `.env.local` (see `.env.example`).",
      ].join("\n"),
    );
  }

  return {
    MICROCMS_SERVICE_DOMAIN: source.MICROCMS_SERVICE_DOMAIN!,
    MICROCMS_API_KEY: source.MICROCMS_API_KEY!,
    NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: source.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY!,
    NEXT_PUBLIC_CALCOM_USERNAME: source.NEXT_PUBLIC_CALCOM_USERNAME!,
    NEXT_PUBLIC_CALCOM_EVENT_SLUG: source.NEXT_PUBLIC_CALCOM_EVENT_SLUG!,
  };
};

let cachedEnv: AppEnv | undefined;

export const getEnv = (): AppEnv => {
  if (!cachedEnv) {
    cachedEnv = validateEnv(process.env);
  }

  return cachedEnv;
};
