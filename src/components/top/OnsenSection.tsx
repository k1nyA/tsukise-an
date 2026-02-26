import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function OnsenSection() {
  return (
    <section className="r-textimg-layout w-full overflow-hidden">
      <div
        className="flex flex-col justify-center"
        style={{
          flex: 1,
          backgroundColor: 'var(--ryokan-light-bg)',
          padding: 'var(--r-imgtext-padding)',
          gap: 'var(--r-imgtext-gap)',
        }}
      >
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
            ONSEN
          </span>
        </div>

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

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--r-body-md)',
            fontWeight: 300,
            color: 'var(--ryokan-muted)',
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

        <Link
          href="/onsen"
          className="inline-flex items-center"
          style={{
            gap: 12,
            textDecoration: 'none',
            width: 'fit-content',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--r-body-sm)',
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
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 450px, 58.6vw"
        />
      </div>
    </section>
  )
}
