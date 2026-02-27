import { SectionLabel } from '@/components/shared/SectionLabel/SectionLabel'

export function ContactIntroSection() {
  return (
    <section
      className="flex w-full flex-col items-center"
      style={{
        backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
        padding: 'var(--r-contact-intro-py) var(--r-contact-intro-px)',
        gap: 'var(--r-contact-intro-gap)',
      }}
    >
      {/* Section label */}
      <SectionLabel english="INQUIRY" />

      {/* Section title */}
      <h2
        className="text-center"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--r-contact-intro-title)',
          fontWeight: 600,
          color: 'var(--ryokan-dark, #2C2418)',
          letterSpacing: 'var(--r-contact-intro-title-ls)',
        }}
      >
        お気軽にご相談ください
      </h2>

      {/* Introductory body text */}
      <p
        className="text-center"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--r-contact-intro-body)',
          fontWeight: 300,
          color: 'var(--ryokan-secondary, #6B5D4F)',
          letterSpacing: 1.5,
          lineHeight: 2.2,
          maxWidth: 'var(--r-contact-intro-body-max-w)',
        }}
      >
        ご宿泊のご相談、お部屋の空き状況、
        <br />
        お祝い事やご接待のご要望など、
        <br />
        どのようなことでもお気軽にお問い合わせくださいませ。
        <br />
        <br />
        通常2営業日以内にご返信いたします。
        <br />
        お急ぎの場合はお電話（0460-83-XXXX）にてご連絡ください。
      </p>

      {/* Decorative vertical line */}
      <span
        data-testid="intro-deco-line"
        className="block"
        style={{
          width: 1,
          height: 40,
          backgroundColor: 'var(--ryokan-light-gold, #D4C5A0)',
        }}
      />
    </section>
  )
}
