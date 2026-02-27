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

const etiquetteItems = [
  {
    title: 'かけ湯',
    description: '入浴前に必ずかけ湯をお願いいたします。',
  },
  {
    title: 'タオル',
    description: '浴槽内にタオルを入れないようお願いいたします。',
  },
  {
    title: '飲食',
    description: '浴室内での飲食はご遠慮ください。水分補給は脱衣所にてお願いいたします。',
  },
  {
    title: '静粛',
    description: '他のお客様のご迷惑にならないよう、大きな声での会話はお控えください。',
  },
]

export function MannerSection() {
  return (
    <>
      {/* Onsen Guide Section */}
      <section
        className="w-full"
        style={{
          backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
        }}
      >
        <div
          className="r-onsen-guide-layout"
          style={{
            padding: 'var(--r-onsen-guide-py) var(--r-onsen-guide-px)',
            gap: 'var(--r-onsen-guide-gap)',
          }}
        >
          {/* Left: Title area */}
          <div
            className="flex flex-col gap-4"
            style={{
              width: 'var(--r-onsen-guide-title-w)',
              flexShrink: 0,
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--r-onsen-eti-title-size)',
                fontWeight: 600,
                color: 'var(--ryokan-dark, #2C2418)',
                letterSpacing: 'var(--r-onsen-eti-title-ls)',
                margin: 0,
              }}
            >
              ご利用案内
            </h2>
            <span
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: 12,
                fontWeight: 400,
                color: 'var(--ryokan-subtle, #8B7D6B)',
                letterSpacing: 3,
                textTransform: 'uppercase' as const,
              }}
            >
              ONSEN GUIDE
            </span>
          </div>

          {/* Right: Guide items */}
          <div
            className="flex flex-col"
            style={{
              flex: 1,
              gap: 'var(--r-onsen-guide-content-gap)',
            }}
          >
            {guideItems.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-2"
                style={{
                  borderBottom: '1px solid var(--ryokan-soft-line, #D4C5A055)',
                  paddingBottom: 'var(--r-onsen-guide-content-gap)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 16,
                    fontWeight: 600,
                    color: 'var(--ryokan-dark, #2C2418)',
                    letterSpacing: 2,
                    margin: 0,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--r-onsen-eti-item-body-size)',
                    fontWeight: 300,
                    color: 'var(--ryokan-secondary, #6B5D4F)',
                    letterSpacing: 1,
                    lineHeight: 2.0,
                    margin: 0,
                  }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bathing Etiquette Section */}
      <section
        className="w-full"
        style={{
          backgroundColor: 'var(--ryokan-light-bg-alt, #F0EBE0)',
        }}
      >
        <div
          className="flex flex-col items-center"
          style={{
            padding: 'var(--r-onsen-eti-py) var(--r-onsen-eti-px)',
            gap: 'var(--r-onsen-eti-gap)',
          }}
        >
          {/* Title */}
          <h2
            className="text-center"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--r-onsen-eti-title-size)',
              fontWeight: 600,
              color: 'var(--ryokan-dark, #2C2418)',
              letterSpacing: 'var(--r-onsen-eti-title-ls)',
              margin: 0,
            }}
          >
            入浴のご案内
          </h2>

          {/* Etiquette items grid */}
          <div className="r-onsen-eti-grid">
            {etiquetteItems.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-3"
                style={{
                  padding: 'var(--r-onsen-eti-card-p)',
                  backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--r-onsen-eti-item-title-size)',
                    fontWeight: 600,
                    color: 'var(--ryokan-dark, #2C2418)',
                    letterSpacing: 2,
                    margin: 0,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--r-onsen-eti-item-body-size)',
                    fontWeight: 300,
                    color: 'var(--ryokan-secondary, #6B5D4F)',
                    letterSpacing: 1,
                    lineHeight: 2.0,
                    margin: 0,
                  }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
