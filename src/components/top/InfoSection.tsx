import Link from 'next/link'

const newsItems = [
  { date: '2025.02.15', title: '春の特別懐石「桜花」のご案内' },
  { date: '2025.01.28', title: 'ミシュランガイド2025 二つ星を獲得いたしました' },
  { date: '2025.01.10', title: '年末年始の営業について' },
  { date: '2024.12.20', title: '冬の特別プラン「雪月花」のご案内' },
  { date: '2024.11.15', title: '客室「月影」リニューアルのお知らせ' },
]

export function InfoSection() {
  return (
    <section
      className="flex w-full"
      style={{
        backgroundColor: 'var(--ryokan-light-bg-alt)',
        padding: 80,
        gap: 60,
      }}
    >
      {/* News Column */}
      <div className="flex flex-1 flex-col" style={{ gap: 32 }}>
        {/* Label row */}
        <div className="flex items-center gap-3">
          <span
            className="block"
            style={{
              width: 40,
              height: 1,
              backgroundColor: 'var(--ryokan-light-gold)',
            }}
            aria-hidden="true"
          />
          <span
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--ryokan-subtle)',
              letterSpacing: 5,
            }}
          >
            NEWS
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 24,
            fontWeight: 600,
            color: 'var(--ryokan-dark)',
            letterSpacing: 4,
            margin: 0,
          }}
        >
          お知らせ
        </h2>

        {/* News list */}
        <ul className="flex flex-col" style={{ gap: 16, listStyle: 'none', padding: 0, margin: 0 }}>
          {newsItems.map((item) => (
            <li
              key={item.date + item.title}
              className="flex items-baseline"
              style={{
                gap: 16,
                paddingBottom: 16,
                borderBottom: '1px solid var(--ryokan-soft-line)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: 13,
                  fontWeight: 400,
                  color: 'var(--ryokan-subtle)',
                  letterSpacing: 1,
                  flexShrink: 0,
                }}
              >
                {item.date}
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  fontWeight: 300,
                  color: 'var(--ryokan-dark)',
                  letterSpacing: 1,
                  margin: 0,
                }}
              >
                {item.title}
              </p>
            </li>
          ))}
        </ul>

        {/* Link to all news */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--ryokan-gold)',
            letterSpacing: 2,
            textDecoration: 'none',
          }}
        >
          一覧を見る
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      {/* Access Column */}
      <div className="flex flex-col" style={{ width: 560, gap: 24 }}>
        {/* Label row */}
        <div className="flex items-center gap-3">
          <span
            className="block"
            style={{
              width: 40,
              height: 1,
              backgroundColor: 'var(--ryokan-light-gold)',
            }}
            aria-hidden="true"
          />
          <span
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--ryokan-subtle)',
              letterSpacing: 5,
            }}
          >
            ACCESS
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 24,
            fontWeight: 600,
            color: 'var(--ryokan-dark)',
            letterSpacing: 4,
            margin: 0,
          }}
        >
          アクセス
        </h2>

        {/* Address */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            fontWeight: 300,
            color: 'var(--ryokan-muted)',
            letterSpacing: 1,
            lineHeight: 2,
            margin: 0,
          }}
        >
          〒250-0522
          <br />
          神奈川県足柄下郡箱根町元箱根138
          <br />
          <br />
          TEL 0460-83-XXXX
          <br />
          FAX 0460-83-XXXX
        </p>

        {/* Transport methods */}
        <div className="flex flex-col" style={{ gap: 12 }}>
          <div
            className="flex items-center gap-3"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              fontWeight: 300,
              color: 'var(--ryokan-muted)',
              letterSpacing: 1,
            }}
          >
            <span>お車で：東名高速 御殿場ICより約40分</span>
          </div>
          <div
            className="flex items-center gap-3"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              fontWeight: 300,
              color: 'var(--ryokan-muted)',
              letterSpacing: 1,
            }}
          >
            <span>電車で：箱根湯本駅より送迎車にて約30分</span>
          </div>
        </div>

        {/* Map placeholder */}
        <div
          className="w-full overflow-hidden"
          style={{
            aspectRatio: '16/9',
            backgroundColor: 'var(--ryokan-light-bg)',
          }}
        />
      </div>
    </section>
  )
}
