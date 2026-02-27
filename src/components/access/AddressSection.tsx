export function AddressSection() {
  return (
    <section
      className="r-access-addr flex w-full flex-col items-center"
      style={{
        backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
        padding: 'var(--r-access-addr-py) var(--r-access-addr-px)',
        gap: 40,
      }}
    >
      {/* Section label — LOCATION */}
      <div className="flex items-center" style={{ gap: 'var(--r-access-label-gap)' }}>
        <span
          className="block"
          style={{
            width: 'var(--r-access-label-line-w)',
            height: 1,
            backgroundColor: 'var(--ryokan-light-gold, #D4C5A0)',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--ryokan-subtle, #8B7D6B)',
            letterSpacing: 5,
          }}
        >
          LOCATION
        </span>
        <span
          className="block"
          style={{
            width: 'var(--r-access-label-line-w)',
            height: 1,
            backgroundColor: 'var(--ryokan-light-gold, #D4C5A0)',
          }}
        />
      </div>

      {/* Ryokan name */}
      <h2
        className="text-center"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--r-access-addr-title-size)',
          fontWeight: 600,
          color: 'var(--ryokan-dark, #2C2418)',
          letterSpacing: 'var(--r-access-addr-title-ls)',
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
          className="r-access-addr-line1 text-center"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--r-access-addr-line1-size)',
            fontWeight: 300,
            color: 'var(--ryokan-secondary, #6B5D4F)',
            letterSpacing: 'var(--r-access-addr-line1-ls)',
            lineHeight: 2.0,
          }}
        >
          〒250-0522 神奈川県足柄下郡箱根町元箱根138
        </p>
        <p
          className="text-center"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            fontWeight: 300,
            color: 'var(--ryokan-subtle, #8B7D6B)',
            letterSpacing: 1,
            lineHeight: 2.0,
          }}
        >
          TEL  0460-83-XXXX ｜ FAX  0460-83-XXXX
        </p>
        <p
          className="text-center"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            fontWeight: 300,
            color: 'var(--ryokan-subtle, #8B7D6B)',
            letterSpacing: 1,
            lineHeight: 2.0,
          }}
        >
          チェックイン 15:00 ｜ チェックアウト 11:00
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
