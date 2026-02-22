type AmenityItem = {
  title: string
  description: string
}

const amenities: AmenityItem[] = [
  {
    title: '源泉掛け流し露天風呂',
    description:
      '全室に専用の露天風呂を完備。\n姥子温泉の源泉を\nそのままお愉しみいただけます。',
  },
  {
    title: 'こだわりの調度品',
    description:
      '地元・箱根寄木細工の家具や\n有田焼の茶器など、\n日本の伝統工芸に触れる滞在を。',
  },
  {
    title: '月見テラス',
    description:
      '各離れに設えた専用テラスから\n芦ノ湖に浮かぶ月を独占。\n季節の移ろいを五感で感じて。',
  },
]

type FacilityColumn = {
  title: string
  items: string
}

const facilities: FacilityColumn[] = [
  {
    title: 'お風呂',
    items:
      '源泉掛け流し専用露天風呂\n内湯（檜または石造り）\nバスアメニティ（THANN）\nバスローブ・湯上がりセット',
  },
  {
    title: '客室設備',
    items:
      '月見テラス\n加湿空気清浄機\nWi-Fi完備\n冷蔵庫（フリードリンク）\n金庫・ナイトウェア',
  },
]

export function AmenitiesSection() {
  return (
    <>
      {/* Amenities grid section */}
      <section
        className="flex w-full flex-col items-center"
        style={{ padding: 80, gap: 48 }}
      >
        {/* Section heading */}
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 28,
            fontWeight: 600,
            color: 'var(--ryokan-dark, #2C2418)',
            letterSpacing: 4,
          }}
        >
          客室の設えとおもてなし
        </h2>

        {/* Amenity cards grid */}
        <div className="flex w-full" style={{ gap: 40 }}>
          {amenities.map((amenity) => (
            <div
              key={amenity.title}
              className="flex flex-col items-center"
              style={{ flex: '1 1 0', gap: 16 }}
            >
              {/* Icon placeholder */}
              <div
                aria-label={amenity.title}
                style={{
                  width: 32,
                  height: 32,
                  color: 'var(--ryokan-gold, #8B6914)',
                }}
              />

              {/* Amenity title */}
              <h3
                className="text-center"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 16,
                  fontWeight: 600,
                  color: 'var(--ryokan-dark, #2C2418)',
                  letterSpacing: 2,
                }}
              >
                {amenity.title}
              </h3>

              {/* Amenity description */}
              <p
                className="text-center"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  fontWeight: 300,
                  color: 'var(--ryokan-secondary, #6B5D4F)',
                  lineHeight: 2,
                  whiteSpace: 'pre-line',
                }}
              >
                {amenity.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Facilities section - dark background with image */}
      <section className="flex w-full overflow-hidden" style={{ height: 480 }}>
        {/* Image placeholder */}
        <div
          aria-label="客室設備のイメージ"
          style={{
            width: 640,
            height: 480,
            backgroundColor: 'var(--ryokan-darkest, #1A150E)',
            flexShrink: 0,
          }}
        />

        {/* Facilities content */}
        <div
          className="flex flex-1 flex-col justify-center"
          style={{
            backgroundColor: 'var(--ryokan-dark, #2C2418)',
            padding: 60,
            gap: 32,
          }}
        >
          {/* Label */}
          <div className="flex items-center" style={{ gap: 16 }}>
            <span
              className="block"
              style={{
                width: 30,
                height: 1,
                backgroundColor: 'var(--ryokan-gold, #8B6914)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: 12,
                fontWeight: 500,
                color: 'var(--ryokan-gold, #8B6914)',
                letterSpacing: 5,
              }}
            >
              FACILITIES
            </span>
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 28,
              fontWeight: 600,
              color: 'var(--ryokan-text-on-dark, #FAF8F3)',
              letterSpacing: 4,
            }}
          >
            全室共通の設え
          </h3>

          {/* Facility columns */}
          <div className="flex w-full" style={{ gap: 40 }}>
            {facilities.map((col) => (
              <div
                key={col.title}
                className="flex flex-1 flex-col"
                style={{ gap: 12 }}
              >
                <h4
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'var(--ryokan-gold, #8B6914)',
                    letterSpacing: 2,
                  }}
                >
                  {col.title}
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 13,
                    fontWeight: 300,
                    color: 'var(--ryokan-text-subtle, #C4B89A)',
                    letterSpacing: 0.5,
                    lineHeight: 2.2,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {col.items}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
