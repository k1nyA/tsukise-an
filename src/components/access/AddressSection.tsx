import { SectionLabel } from '@/components/shared/SectionLabel/SectionLabel'

export function AddressSection() {
  return (
    <section
      className="flex w-full flex-col items-center"
      style={{
        backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
        padding: '80px 200px',
        gap: 40,
      }}
    >
      {/* Section label */}
      <SectionLabel english="ADDRESS" />

      {/* Ryokan name */}
      <h2
        className="text-center"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 32,
          fontWeight: 600,
          color: 'var(--ryokan-dark, #2C2418)',
          letterSpacing: 6,
        }}
      >
        月瀬庵
      </h2>

      {/* Address info */}
      <div
        className="flex flex-col items-center"
        style={{ gap: 16 }}
      >
        <p
          className="text-center"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            fontWeight: 300,
            color: 'var(--ryokan-secondary, #6B5D4F)',
            letterSpacing: 1.5,
            lineHeight: 2.0,
          }}
        >
          〒250-0522 神奈川県足柄下郡箱根町元箱根138
        </p>
        <p
          className="text-center"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            fontWeight: 300,
            color: 'var(--ryokan-secondary, #6B5D4F)',
            letterSpacing: 1.5,
            lineHeight: 2.0,
          }}
        >
          TEL: 0460-83-XXXX
        </p>
      </div>

      {/* Decorative vertical line */}
      <span
        data-testid="address-deco-line"
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
