import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Car, TrainFront } from 'lucide-react'
import type { TopNewsItem } from '@/lib/top-news'

type InfoSectionProps = {
  newsItems: TopNewsItem[]
}

export function InfoSection({ newsItems }: InfoSectionProps) {
  return (
    <section
      className="r-info-layout w-full"
      style={{
        backgroundColor: 'var(--ryokan-info-bg)',
        padding: 'var(--r-info-padding)',
        gap: 'var(--r-info-gap)',
      }}
    >
      {/* News Column */}
      <div className="flex flex-1 flex-col" style={{ gap: 32 }}>
        {/* Section Label */}
        <div className="flex items-center" style={{ gap: 16 }}>
          <span
            style={{ width: 30, height: 1, backgroundColor: 'var(--ryokan-gold)' }}
            aria-hidden="true"
          />
          <span
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 12,
              fontWeight: 500,
              color: 'var(--ryokan-gold)',
              letterSpacing: 5,
            }}
          >
            NEWS
          </span>
        </div>

        {/* Section Title */}
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--r-title-xs)',
            fontWeight: 600,
            color: 'var(--ryokan-dark)',
            letterSpacing: 3,
            margin: 0,
          }}
        >
          お知らせ
        </h2>

        {/* News list */}
        <ul
          className="flex flex-col w-full"
          style={{ listStyle: 'none', padding: 0, margin: 0 }}
        >
          {newsItems.length > 0 ? (
            newsItems.map((item) => (
              <li
                key={item.slug}
                className="flex items-center w-full"
                style={{
                  gap: 24,
                  padding: '16px 0',
                  borderBottom: '1px solid var(--ryokan-light-gold)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-accent)',
                    fontSize: 'var(--r-body-xs)',
                    fontWeight: 500,
                    color: 'var(--ryokan-subtle)',
                    flexShrink: 0,
                  }}
                >
                  {item.date}
                </span>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--r-body-sm)',
                    fontWeight: 300,
                    color: 'var(--ryokan-muted)',
                    margin: 0,
                  }}
                >
                  {item.title}
                </p>
              </li>
            ))
          ) : (
            <li
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--r-body-sm)',
                fontWeight: 300,
                color: 'var(--ryokan-subtle)',
                letterSpacing: 1,
                paddingBottom: 8,
              }}
            >
              お知らせは現在準備中です。
            </li>
          )}
        </ul>

        {/* View All Link */}
        <Link
          href="/news"
          className="inline-flex items-center"
          style={{
            gap: 8,
            textDecoration: 'none',
            width: 'fit-content',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--r-body-xs)',
              fontWeight: 'normal',
              color: 'var(--ryokan-gold)',
              letterSpacing: 2,
            }}
          >
            一覧を見る
          </span>
          <ArrowRight size={14} color="var(--ryokan-gold)" />
        </Link>
      </div>

      {/* Access Column */}
      <div className="r-info-access-col flex flex-col" style={{ gap: 24 }}>
        {/* Section Label */}
        <div className="flex items-center" style={{ gap: 16 }}>
          <span
            style={{ width: 30, height: 1, backgroundColor: 'var(--ryokan-gold)' }}
            aria-hidden="true"
          />
          <span
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 12,
              fontWeight: 500,
              color: 'var(--ryokan-gold)',
              letterSpacing: 5,
            }}
          >
            ACCESS
          </span>
        </div>

        {/* Section Title */}
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--r-title-xs)',
            fontWeight: 600,
            color: 'var(--ryokan-dark)',
            letterSpacing: 3,
            margin: 0,
          }}
        >
          アクセス
        </h2>

        {/* Address & Transport Info */}
        <div className="flex flex-col w-full" style={{ gap: 24 }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--r-body-sm)',
              fontWeight: 300,
              color: 'var(--ryokan-secondary)',
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
            TEL&nbsp;&nbsp;0460-83-XXXX
            <br />
            FAX&nbsp;&nbsp;0460-83-XXXX
          </p>

          {/* Access Methods */}
          <div className="flex flex-col" style={{ gap: 12 }}>
            <div className="flex items-center" style={{ gap: 12 }}>
              <Car size={16} color="var(--ryokan-gold)" aria-hidden="true" />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--r-body-xs)',
                  fontWeight: 300,
                  color: 'var(--ryokan-secondary)',
                  letterSpacing: 1,
                }}
              >
                お車で：東名高速 御殿場ICより約40分
              </span>
            </div>
            <div className="flex items-center" style={{ gap: 12 }}>
              <TrainFront size={16} color="var(--ryokan-gold)" aria-hidden="true" />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--r-body-xs)',
                  fontWeight: 300,
                  color: 'var(--ryokan-secondary)',
                  letterSpacing: 1,
                }}
              >
                電車で：箱根湯本駅より送迎車にて約30分
              </span>
            </div>
          </div>
        </div>

        {/* Map */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            height: 'var(--r-map-h)',
            borderRadius: 4,
            border: '1px solid #D4C5A022',
          }}
        >
          <Image
            src="/images/top-info-map.png"
            alt="月瀬庵へのアクセスマップ"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 560px, 100vw"
          />
        </div>
      </div>
    </section>
  )
}
