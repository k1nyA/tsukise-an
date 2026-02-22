import assert from "node:assert/strict";
import { test } from "node:test";

import { validateEnv } from "./env";

test("throws a clear error when required env keys are missing", () => {
  assert.throws(
    () => validateEnv({}),
    (error: unknown) => {
      assert.ok(error instanceof Error);
      assert.match(error.message, /Missing required environment variables/);
      assert.match(error.message, /MICROCMS_SERVICE_DOMAIN/);
      return true;
    },
  );
});

test("returns validated env values when all required keys exist", () => {
  const env = validateEnv({
    MICROCMS_SERVICE_DOMAIN: "tsukise-an",
    MICROCMS_API_KEY: "microcms-api-key",
    NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: "web3forms-key",
    NEXT_PUBLIC_CALCOM_USERNAME: "tsukise-an",
    NEXT_PUBLIC_CALCOM_EVENT_SLUG: "stay",
  });

  assert.equal(env.MICROCMS_SERVICE_DOMAIN, "tsukise-an");
  assert.equal(env.NEXT_PUBLIC_CALCOM_EVENT_SLUG, "stay");
});
