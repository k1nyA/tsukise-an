export type ContactFormInput = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  agreeToPrivacy: boolean;
};

export type Web3FormsPayload = {
  access_key: string;
  from_name: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

export type Web3FormsResult = {
  success: boolean;
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const trim = (value: string | undefined): string => (value ?? "").trim();

export const validateContactInput = (input: ContactFormInput): string[] => {
  const errors: string[] = [];

  if (!trim(input.name)) {
    errors.push("お名前を入力してください。");
  }

  const email = trim(input.email);
  if (!email || !EMAIL_PATTERN.test(email)) {
    errors.push("メールアドレスを正しく入力してください。");
  }

  if (!trim(input.subject)) {
    errors.push("お問い合わせ種別を選択してください。");
  }

  if (!trim(input.message)) {
    errors.push("お問い合わせ内容を入力してください。");
  }

  if (!input.agreeToPrivacy) {
    errors.push("プライバシーポリシーへの同意が必要です。");
  }

  return errors;
};

export const buildWeb3FormsPayload = (
  input: ContactFormInput,
  accessKey: string,
): Web3FormsPayload => {
  const key = trim(accessKey);
  if (!key) {
    throw new Error("Web3Forms access key is missing.");
  }

  return {
    access_key: key,
    from_name: "月瀬庵ウェブサイト",
    name: trim(input.name),
    email: trim(input.email),
    phone: trim(input.phone) || undefined,
    subject: `【月瀬庵】${trim(input.subject)}`,
    message: trim(input.message),
  };
};

export const submitContactForm = async (
  input: ContactFormInput,
  accessKey: string,
  fetchImpl: typeof fetch = fetch,
): Promise<Web3FormsResult> => {
  const errors = validateContactInput(input);
  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }

  const payload = buildWeb3FormsPayload(input, accessKey);
  const response = await fetchImpl("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as Partial<Web3FormsResult>;
  if (!response.ok || !data.success) {
    return {
      success: false,
      message:
        data.message ??
        "送信に失敗しました。お手数ですがお電話にてお問い合わせください。",
    };
  }

  return {
    success: true,
    message: data.message ?? "送信が完了しました。",
  };
};
