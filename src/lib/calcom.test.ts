import assert from "node:assert/strict";
import { test } from "node:test";

import { buildCalLink } from "./calcom";

test("buildCalLink joins username and event slug", () => {
  const link = buildCalLink({
    NEXT_PUBLIC_CALCOM_USERNAME: "tsukise-an",
    NEXT_PUBLIC_CALCOM_EVENT_SLUG: "stay",
  });

  assert.equal(link, "tsukise-an/stay");
});

test("buildCalLink trims extra slashes", () => {
  const link = buildCalLink({
    NEXT_PUBLIC_CALCOM_USERNAME: "/tsukise-an/",
    NEXT_PUBLIC_CALCOM_EVENT_SLUG: "/stay/",
  });

  assert.equal(link, "tsukise-an/stay");
});

test("buildCalLink throws when username or event slug is empty", () => {
  assert.throws(
    () =>
      buildCalLink({
        NEXT_PUBLIC_CALCOM_USERNAME: "/",
        NEXT_PUBLIC_CALCOM_EVENT_SLUG: "stay",
      }),
    /must not be empty/,
  );
});
