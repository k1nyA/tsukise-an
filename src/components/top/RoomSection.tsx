import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function RoomSection() {
  return (
    <section className="r-imgtext-layout w-full overflow-hidden">
      <div
        className="relative overflow-hidden"
        style={{
          width: 'var(--r-imgtext-img-width)',
          height: 'var(--r-imgtext-img-h)',
          flexShrink: 0,
          minHeight: 280,
        }}
      >
        <Image
          src="/images/top-room-main.png"
          alt="月瀬庵の客室"
          fill
          className="object-cover"
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 450px, 800px"
        />
      </div>

      <div
        className="flex flex-col justify-center"
        style={{
          flex: 1,
          backgroundColor: 'var(--ryokan-dark)',
          padding: 'var(--r-imgtext-padding)',
          gap: 'var(--r-imgtext-gap)',
        }}
      >
        {/* Section Label */}
        <div
          className="flex items-center"
          style={{ gap: 'var(--r-imgtext-label-gap)' }}
        >
          <span
            style={{
              width: 'var(--r-imgtext-label-line-w)',
              height: 1,
              backgroundColor: 'var(--ryokan-gold)',
            }}
            aria-hidden="true"
          />
          <span
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 12,
              fontWeight: 500,
              color: 'var(--ryokan-gold)',
              letterSpacing: 'var(--r-imgtext-label-ls)',
            }}
          >
            ROOMS
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--r-title-lg)',
            fontWeight: 600,
            color: 'var(--ryokan-text-on-dark)',
            letterSpacing: 'var(--r-title-spacing-lg)',
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          全八室の
          <br />
          離れ
        </h2>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--r-body-md)',
            fontWeight: 300,
            color: 'var(--ryokan-light-gold)',
            letterSpacing: 1,
            lineHeight: 2.2,
            margin: 0,
          }}
        >
          一棟独立の離れ形式で、
          <br />
          芦ノ湖を望む自然の中、
          <br />
          お二人だけの静寂な時間を
          <br />
          お過ごしいただけます。
          <br />
          <br />
          全室に源泉掛け流しの
          <br />
          専用露天風呂を備えております。
        </p>

        {/* Link */}
        <Link
          href="/rooms"
          className="inline-flex items-center"
          style={{
            gap: 'var(--r-imgtext-link-gap)',
            textDecoration: 'none',
            width: 'fit-content',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 'normal',
              color: 'var(--ryokan-light-gold)',
              letterSpacing: 3,
            }}
          >
            客室を見る
          </span>
          <ArrowRight
            style={{
              width: 'var(--r-imgtext-link-arrow)',
              height: 'var(--r-imgtext-link-arrow)',
            }}
            color="var(--ryokan-light-gold)"
          />
        </Link>
      </div>
    </section>
  )
}
