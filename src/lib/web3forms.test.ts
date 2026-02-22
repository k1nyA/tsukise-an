import assert from "node:assert/strict";
import { test } from "node:test";

import {
  buildWeb3FormsPayload,
  validateContactInput,
  submitContactForm,
  type ContactFormInput,
} from "./web3forms";

const validInput: ContactFormInput = {
  name: "山田 太郎",
  email: "guest@example.com",
  phone: "090-0000-0000",
  subject: "ご予約について",
  message: "空室状況を確認したいです。",
  agreeToPrivacy: true,
};

test("validateContactInput returns no errors for valid input", () => {
  const errors = validateContactInput(validInput);
  assert.equal(errors.length, 0);
});

test("validateContactInput returns errors for missing required fields", () => {
  const errors = validateContactInput({
    ...validInput,
    name: "",
    email: "bad-address",
    message: "",
    agreeToPrivacy: false,
  });

  assert.ok(errors.some((err) => err.includes("お名前")));
  assert.ok(errors.some((err) => err.includes("メールアドレス")));
  assert.ok(errors.some((err) => err.includes("お問い合わせ内容")));
  assert.ok(errors.some((err) => err.includes("プライバシーポリシー")));
});

test("buildWeb3FormsPayload builds expected payload", () => {
  const payload = buildWeb3FormsPayload(validInput, "test-access-key");

  assert.equal(payload.access_key, "test-access-key");
  assert.equal(payload.from_name, "月瀬庵ウェブサイト");
  assert.equal(payload.subject, "【月瀬庵】ご予約について");
});

test("submitContactForm returns success result from Web3Forms", async () => {
  const fakeFetch: typeof fetch = (async () =>
    new Response(JSON.stringify({ success: true, message: "OK" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })) as typeof fetch;

  const result = await submitContactForm(validInput, "test-access-key", fakeFetch);

  assert.equal(result.success, true);
  assert.equal(result.message, "OK");
});
