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
  lastName: "",
  firstName: "",
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
      {/* Row 1: お名前（姓）+ お名前（名）*/}
      <div className={styles.row}>
        <label>
          お名前（姓）<span>*</span>
          <input
            type="text"
            placeholder="月瀬"
            value={form.lastName}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, lastName: event.target.value }))
            }
            required
          />
        </label>
        <label>
          お名前（名）<span>*</span>
          <input
            type="text"
            placeholder="太郎"
            value={form.firstName}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, firstName: event.target.value }))
            }
            required
          />
        </label>
      </div>

      {/* Row 2: メールアドレス + お電話番号 */}
      <div className={styles.row}>
        <label>
          メールアドレス <span>*</span>
          <input
            type="email"
            placeholder="example@email.com"
            value={form.email}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, email: event.target.value }))
            }
            required
          />
        </label>
        <label>
          お電話番号
          <input
            type="tel"
            placeholder="090-1234-5678"
            value={form.phone}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, phone: event.target.value }))
            }
          />
        </label>
      </div>

      {/* Row 3: お問い合わせ種別 (full width) */}
      <label>
        お問い合わせ種別 <span>*</span>
        <select
          value={form.subject}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, subject: event.target.value }))
          }
          required
        >
          {SUBJECT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      {/* Row 4: お問い合わせ内容 (full width) */}
      <label>
        お問い合わせ内容 <span>*</span>
        <textarea
          placeholder="ご質問やご要望をご記入ください"
          value={form.message}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, message: event.target.value }))
          }
          rows={7}
          required
        />
      </label>

      {/* Privacy checkbox */}
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={form.agreeToPrivacy}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, agreeToPrivacy: event.target.checked }))
          }
        />
        <span>プライバシーポリシーに同意する *</span>
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

      {/* Submit button — centered per .pen */}
      <div className={styles.submitWrap}>
        <button
          className={styles.submit}
          type="submit"
          disabled={status === "sending" || keyMissing}
        >
          {status === "sending" ? "送信中..." : "送信する"}
        </button>
      </div>
    </form>
  );
}
