import ContactForm from '@/components/ContactForm'

type ContactFormSectionProps = {
  accessKey?: string
}

export function ContactFormSection({ accessKey = '' }: ContactFormSectionProps) {
  const keyMissing = accessKey.trim().length === 0

  return (
    <section
      className="flex w-full flex-col items-center"
      style={{
        backgroundColor: 'var(--ryokan-form-bg, #F0EBE0)',
        padding: 'var(--r-contact-form-py) var(--r-contact-form-px)',
        gap: 'var(--r-contact-form-gap)',
      }}
    >
      <div
        className="flex w-full flex-col"
        style={{
          backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
          padding: 'var(--r-contact-form-inner-py) var(--r-contact-form-inner-px)',
          gap: 24,
          borderRadius: 4,
          border: '1px solid #D4C5A033',
        }}
      >
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

        {keyMissing && (
          <p
            role="alert"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              fontWeight: 300,
              color: '#9E2A2B',
              lineHeight: 1.7,
            }}
          >
            フォーム送信設定が未完了です。`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` を設定してください。
          </p>
        )}

        <ContactForm accessKey={accessKey} />
      </div>
    </section>
  )
}
