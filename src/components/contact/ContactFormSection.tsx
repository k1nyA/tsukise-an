import Link from 'next/link'

const inputStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: 14,
  fontWeight: 300,
  color: 'var(--ryokan-dark, #2C2418)',
  backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
  border: '1px solid var(--ryokan-light-gold, #D4C5A0)',
  borderRadius: 2,
  height: 48,
  padding: '0 16px',
  width: '100%',
  outline: 'none',
} as const

const labelStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: 13,
  fontWeight: 500,
  color: 'var(--ryokan-dark, #2C2418)',
  letterSpacing: 1,
} as const

export function ContactFormSection() {
  return (
    <section
      className="flex w-full flex-col items-center"
      style={{
        backgroundColor: 'var(--ryokan-form-bg, #F0EBE0)',
        padding: '80px 120px',
        gap: 40,
      }}
    >
      {/* Form container */}
      <form
        className="flex w-full flex-col"
        style={{
          backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
          padding: '60px 80px',
          gap: 32,
          borderRadius: 4,
          border: '1px solid #D4C5A033',
        }}
      >
        {/* Web3Forms badge */}
        <div
          className="flex items-center"
          style={{
            backgroundColor: 'var(--ryokan-light-bg, #EEEBE3)',
            padding: '6px 16px',
            borderRadius: 2,
            alignSelf: 'flex-start',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 11,
              fontWeight: 500,
              color: 'var(--ryokan-subtle, #8B7D6B)',
              letterSpacing: 2,
            }}
          >
            Powered by Web3Forms
          </span>
        </div>

        {/* Name row */}
        <div className="flex w-full gap-6">
          {/* Last name */}
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="contact-last-name" style={labelStyle}>
              お名前（姓）<span aria-hidden="true">*</span>
            </label>
            <input
              id="contact-last-name"
              name="lastName"
              type="text"
              required
              placeholder="月瀬"
              style={inputStyle}
            />
          </div>

          {/* First name */}
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="contact-first-name" style={labelStyle}>
              お名前（名）<span aria-hidden="true">*</span>
            </label>
            <input
              id="contact-first-name"
              name="firstName"
              type="text"
              required
              placeholder="太郎"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Email and Phone row */}
        <div className="flex w-full gap-6">
          {/* Email */}
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="contact-email" style={labelStyle}>
              メールアドレス <span aria-hidden="true">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              placeholder="example@email.com"
              style={inputStyle}
            />
          </div>

          {/* Phone */}
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="contact-phone" style={labelStyle}>
              お電話番号
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              placeholder="090-1234-5678"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Subject select */}
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="contact-subject" style={labelStyle}>
            お問い合わせ種別 <span aria-hidden="true">*</span>
          </label>
          <select
            id="contact-subject"
            name="subject"
            required
            defaultValue=""
            style={{
              ...inputStyle,
              appearance: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="" disabled>
              お問い合わせ種別を選択
            </option>
            <option value="accommodation">ご宿泊について</option>
            <option value="celebration">お祝い・ご接待について</option>
            <option value="dining">お食事について</option>
            <option value="other">その他のお問い合わせ</option>
          </select>
        </div>

        {/* Message textarea */}
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="contact-message" style={labelStyle}>
            お問い合わせ内容 <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            placeholder="ご質問やご要望をご記入ください"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 300,
              color: 'var(--ryokan-dark, #2C2418)',
              backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
              border: '1px solid var(--ryokan-light-gold, #D4C5A0)',
              borderRadius: 2,
              height: 200,
              padding: 16,
              width: '100%',
              outline: 'none',
              resize: 'vertical',
            }}
          />
        </div>

        {/* Privacy checkbox */}
        <div className="flex items-center gap-3">
          <input
            id="contact-privacy"
            name="privacy"
            type="checkbox"
            required
            aria-label="プライバシーポリシーに同意する"
            style={{
              width: 20,
              height: 20,
              accentColor: 'var(--ryokan-gold, #8B6914)',
              cursor: 'pointer',
            }}
          />
          <label
            htmlFor="contact-privacy"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              fontWeight: 300,
              color: 'var(--ryokan-text, #4A4035)',
              letterSpacing: 1,
              cursor: 'pointer',
            }}
          >
            <Link
              href="/privacy"
              style={{
                color: 'var(--ryokan-text, #4A4035)',
                textDecoration: 'underline',
              }}
            >
              プライバシーポリシー
            </Link>
            に同意する <span aria-hidden="true">*</span>
          </label>
        </div>

        {/* Submit button */}
        <div className="flex w-full justify-center">
          <button
            type="submit"
            style={{
              backgroundColor: 'var(--ryokan-gold, #8B6914)',
              padding: '18px 80px',
              borderRadius: 2,
              fontFamily: 'var(--font-body)',
              fontSize: 15,
              fontWeight: 600,
              color: 'var(--ryokan-bg, #FAF8F3)',
              letterSpacing: 4,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            送信する
          </button>
        </div>
      </form>
    </section>
  )
}
