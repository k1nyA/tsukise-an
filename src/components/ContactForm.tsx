"use client";

import { FormEvent, useMemo, useState } from "react";

import {
  submitContactForm,
  validateContactInput,
  type ContactFormInput,
} from "@/lib/web3forms";
import styles from "./ContactForm.module.css";

type ContactFormProps = {
  accessKey?: string;
};

const SUBJECT_OPTIONS = [
  "ご予約について",
  "施設について",
  "アクセスについて",
  "その他",
];

const INITIAL_FORM: ContactFormInput = {
  name: "",
  email: "",
  phone: "",
  subject: SUBJECT_OPTIONS[0],
  message: "",
  agreeToPrivacy: false,
};

export default function ContactForm({ accessKey = "" }: ContactFormProps) {
  const [form, setForm] = useState<ContactFormInput>(INITIAL_FORM);
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [resultMessage, setResultMessage] = useState("");

  const keyMissing = useMemo(() => accessKey.trim().length === 0, [accessKey]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateContactInput(form);
    setErrors(validationErrors);
    if (validationErrors.length > 0 || keyMissing) {
      setStatus("error");
      setResultMessage(
        keyMissing
          ? "現在フォーム送信設定が未完了です。お電話にてお問い合わせください。"
          : "入力内容をご確認ください。",
      );
      return;
    }

    setStatus("sending");
    setResultMessage("");
    try {
      const result = await submitContactForm(form, accessKey);
      if (result.success) {
        setStatus("success");
        setResultMessage(result.message);
        setForm(INITIAL_FORM);
        setErrors([]);
        return;
      }
      setStatus("error");
      setResultMessage(result.message);
    } catch (error) {
      setStatus("error");
      setResultMessage(
        error instanceof Error
          ? error.message
          : "送信に失敗しました。お電話にてお問い合わせください。",
      );
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.row}>
        <label>
          お名前<span>*</span>
          <input
            type="text"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            required
          />
        </label>
        <label>
          メールアドレス<span>*</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            required
          />
        </label>
      </div>

      <div className={styles.row}>
        <label>
          お電話番号
          <input
            type="tel"
            value={form.phone}
            onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
          />
        </label>
        <label>
          お問い合わせ種別<span>*</span>
          <select
            value={form.subject}
            onChange={(event) => setForm((prev) => ({ ...prev, subject: event.target.value }))}
            required
          >
            {SUBJECT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className={styles.textAreaLabel}>
        お問い合わせ内容<span>*</span>
        <textarea
          value={form.message}
          onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
          rows={7}
          required
        />
      </label>

      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={form.agreeToPrivacy}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, agreeToPrivacy: event.target.checked }))
          }
        />
        <span>プライバシーポリシーに同意する</span>
      </label>

      {errors.length > 0 && (
        <ul className={styles.errorList}>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      {resultMessage && (
        <p className={status === "success" ? styles.success : styles.errorMessage}>
          {resultMessage}
        </p>
      )}

      <button
        className={styles.submit}
        type="submit"
        disabled={status === "sending" || keyMissing}
      >
        {status === "sending" ? "送信中..." : "送信する"}
      </button>
    </form>
  );
}
