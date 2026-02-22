const accessMethods = [
  {
    title: 'お車でお越しの方',
    description: '東名高速 御殿場ICより約40分\n無料駐車場あり（8台）',
  },
  {
    title: '電車でお越しの方',
    description:
      '箱根湯本駅よりバス30分「元箱根港」下車、送迎車5分\n※送迎要予約',
  },
  {
    title: 'バスでお越しの方',
    description: '小田原駅より箱根登山バス「元箱根港」行き約50分',
  },
  {
    title: '送迎サービス',
    description:
      '元箱根港・箱根湯本駅より送迎あり（要予約）\nお電話にてお申し付けください',
  },
]

export function AccessMethodsSection() {
  return (
    <section
      className="flex w-full flex-col items-center"
      style={{
        backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
        padding: '60px 80px',
        gap: 40,
      }}
    >
      {/* Section title */}
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 28,
          fontWeight: 600,
          color: 'var(--ryokan-dark, #2C2418)',
          letterSpacing: 4,
        }}
      >
        アクセス方法
      </h2>

      {/* Access method cards row */}
      <div
        className="grid w-full"
        style={{
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 32,
        }}
      >
        {accessMethods.map((method) => (
          <div
            key={method.title}
            data-testid="access-method-card"
            className="flex flex-col"
            style={{
              backgroundColor: 'var(--ryokan-light-bg-alt, #F0EBE0)',
              borderRadius: 4,
              padding: '32px 24px',
              gap: 16,
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 16,
                fontWeight: 500,
                color: 'var(--ryokan-dark, #2C2418)',
                letterSpacing: 1,
              }}
            >
              {method.title}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                fontWeight: 300,
                color: 'var(--ryokan-secondary, #6B5D4F)',
                letterSpacing: 1,
                lineHeight: 2.0,
                whiteSpace: 'pre-line',
              }}
            >
              {method.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
