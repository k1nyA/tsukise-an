import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function OnsenSection() {
  return (
    <section className="flex w-full overflow-hidden" style={{ flexDirection: 'row' }}>
      <div
        className="flex flex-col justify-center"
        style={{
          flex: 1,
          backgroundColor: 'var(--ryokan-light-bg)',
          padding: 80,
          gap: 32,
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
            fontSize: 38,
            fontWeight: 600,
            color: 'var(--ryokan-dark)',
            letterSpacing: 4,
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
            fontSize: 15,
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

      <div
        className="relative overflow-hidden"
        style={{ width: '58.6%', flexShrink: 0, minHeight: 400 }}
      >
        <Image
          src="/images/onsen.png"
          alt="月瀬庵の温泉"
          fill
          className="object-cover"
          sizes="58.6vw"
        />
      </div>
    </section>
  )
}
