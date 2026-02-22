type GuideItem = {
  title: string
  description: string
}

const guideItems: GuideItem[] = [
  {
    title: '利用時間',
    description: '15:00〜翌10:00までご利用いただけます。深夜帯も常時ご入浴可能です。',
  },
  {
    title: '貸切予約',
    description: 'フロントにてご希望の時間帯をお申し付けください。1回45分のご利用となります。',
  },
  {
    title: 'タオル',
    description: 'バスタオル・フェイスタオルはお部屋にご用意しております。脱衣所にも予備をご用意しています。',
  },
  {
    title: 'お子様',
    description: '保護者の方とご一緒にご入浴ください。ベビーバスのご用意もございます。',
  },
]

export function MannerSection() {
  return (
    <section
      className="w-full"
      style={{
        backgroundColor: 'var(--ryokan-light-bg-alt, #F0EBE0)',
        padding: '80px 120px',
      }}
    >
      <div className="mx-auto flex flex-col items-center gap-12" style={{ maxWidth: 'var(--content-max-width, 1000px)' }}>
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
          入浴のご案内
        </h2>

        {/* Guide items grid */}
        <div className="grid w-full grid-cols-2 gap-8">
          {guideItems.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-3"
              style={{
                padding: 32,
                backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
              }}
            >
              {/* Item title */}
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 18,
                  fontWeight: 600,
                  color: 'var(--ryokan-dark, #2C2418)',
                  letterSpacing: 2,
                }}
              >
                {item.title}
              </h3>

              {/* Item description */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  fontWeight: 300,
                  color: 'var(--ryokan-secondary, #6B5D4F)',
                  letterSpacing: 1,
                  lineHeight: 2.0,
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
