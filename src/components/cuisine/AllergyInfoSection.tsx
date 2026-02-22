type AllergyItem = {
  title: string
  description: string
  iconLabel: string
}

const allergyItems: AllergyItem[] = [
  {
    title: 'アレルギー対応',
    description: '事前にお知らせいただければ\n代替食材でご用意いたします',
    iconLabel: 'アレルギー対応のアイコン',
  },
  {
    title: 'ベジタリアン対応',
    description: '精進料理をベースとした\n特別懐石をご用意いたします',
    iconLabel: 'ベジタリアン対応のアイコン',
  },
  {
    title: 'お子様メニュー',
    description: 'お子様向けの特別メニューを\nご用意しております',
    iconLabel: 'お子様メニューのアイコン',
  },
]

export function AllergyInfoSection() {
  return (
    <section
      className="flex w-full flex-col items-center"
      style={{
        backgroundColor: 'var(--ryokan-light-bg-alt, #F0EBE0)',
        padding: '80px 120px',
        gap: 48,
      }}
    >
      {/* Title */}
      <h2
        className="text-center"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 24,
          fontWeight: 600,
          color: 'var(--ryokan-dark, #2C2418)',
          letterSpacing: 4,
        }}
      >
        アレルギー・特別対応
      </h2>

      {/* Allergy items grid */}
      <div className="flex w-full" style={{ gap: 40 }}>
        {allergyItems.map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-center"
            style={{ flex: '1 1 0', gap: 12 }}
          >
            {/* Icon placeholder */}
            <div
              aria-label={item.iconLabel}
              style={{
                width: 28,
                height: 28,
                color: 'var(--ryokan-gold, #8B6914)',
              }}
            />

            {/* Title */}
            <h3
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--ryokan-dark, #2C2418)',
                letterSpacing: 1,
              }}
            >
              {item.title}
            </h3>

            {/* Description */}
            <p
              className="text-center"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                fontWeight: 300,
                color: 'var(--ryokan-secondary, #6B5D4F)',
                lineHeight: 1.8,
                whiteSpace: 'pre-line',
              }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
