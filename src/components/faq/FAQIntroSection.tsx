import { SectionLabel } from '@/components/shared/SectionLabel/SectionLabel'

export function FAQIntroSection() {
  return (
    <section
      className="flex w-full flex-col items-center"
      style={{
        backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
        padding: '60px 200px 32px 200px',
        gap: 32,
      }}
    >
      <SectionLabel english="Q & A" />

      <h2
        className="text-center"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 24,
          fontWeight: 600,
          color: 'var(--ryokan-dark, #2C2418)',
          letterSpacing: 3,
          lineHeight: 1.8,
        }}
      >
        <span className="block">ご不明な点がございましたら</span>
        <span className="block">お気軽にお問い合わせください</span>
      </h2>

      <span
        data-testid="faq-intro-deco"
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
