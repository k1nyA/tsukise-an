import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function OnsenSection() {
  return (
    <section className="r-textimg-layout w-full overflow-hidden">
      {/* Text Content (left on PC/Tablet, bottom on Mobile via column-reverse) */}
      <div
        className="flex flex-col justify-center"
        style={{
          flex: 1,
          backgroundColor: 'var(--ryokan-light-bg)',
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
            ONSEN
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--r-title-lg)',
            fontWeight: 600,
            color: 'var(--ryokan-dark)',
            letterSpacing: 'var(--r-title-spacing-lg)',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          湖を望む
          <br />
          湯処
        </h2>

        {/* Description */}
        <p
          className="r-onsen-desc"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--r-body-md)',
            fontWeight: 300,
            letterSpacing: 1,
            lineHeight: 2,
            margin: 0,
          }}
        >
          箱根十七湯のひとつ、
          <br />
          姥子温泉の源泉を引き入れた
          <br />
          露天風呂からは、
          <br />
          四季折々の芦ノ湖が広がります。
          <br />
          <br />
          泉質は単純硫黄泉。
          <br />
          美肌の湯として古くから知られ、
          <br />
          身体の芯から温まります。
        </p>

        {/* Link */}
        <Link
          href="/onsen"
          className="r-onsen-link inline-flex items-center"
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
              color: 'var(--ryokan-gold)',
              letterSpacing: 3,
            }}
          >
            温泉を見る
          </span>
          <ArrowRight size={14} color="var(--ryokan-gold)" />
        </Link>
      </div>

      {/* Image (right on PC/Tablet, top on Mobile via column-reverse) */}
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
          src="/images/top-onsen-main.png"
          alt="月瀬庵の温泉"
          fill
          className="object-cover"
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 450px, 800px"
        />
      </div>
    </section>
  )
}
