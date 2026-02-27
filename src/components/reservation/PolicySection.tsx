const policies = [
  {
    title: 'チェックイン・アウト',
    content:
      'チェックイン 15:00\nチェックアウト 11:00\n\nレイトチェックアウトをご希望の場合は\nフロントまでご相談ください。',
  },
  {
    title: 'キャンセルポリシー',
    content:
      '7日前まで：無料\n3日前まで：宿泊料の30%\n前日：宿泊料の50%\n当日・不泊：宿泊料の100%',
  },
  {
    title: 'お支払い方法',
    content:
      '現金・クレジットカード\n（VISA / Mastercard / JCB / AMEX）\n\n事前決済・現地決済\nどちらもお選びいただけます。',
  },
]

export function PolicySection() {
  return (
    <section
      className="flex w-full flex-col"
      style={{
        backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
        padding: 'var(--r-resv-policy-py) var(--r-resv-policy-px)',
        gap: 32,
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 20,
          fontWeight: 600,
          color: 'var(--ryokan-dark, #2C2418)',
          letterSpacing: 3,
        }}
      >
        ご予約に関するご注意
      </h2>

      <div className="r-resv-policy-grid">
        {policies.map((policy) => (
          <div
            key={policy.title}
            data-testid="policy-column"
            className="flex flex-col"
            style={{ gap: 16 }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--ryokan-dark, #2C2418)',
                letterSpacing: 1,
              }}
            >
              {policy.title}
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                fontWeight: 300,
                color: 'var(--ryokan-secondary, #6B5D4F)',
                lineHeight: 2,
                whiteSpace: 'pre-line',
              }}
            >
              {policy.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
